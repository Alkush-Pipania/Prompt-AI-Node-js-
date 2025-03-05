import { ChatAnthropic } from "@langchain/anthropic";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';
import { prisma } from './db.service';
import { Chat, Conversation } from '../types/index';
import { Role } from '@prisma/client';
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";
import { Index } from "@upstash/vector";
export class ChatService {
  private outputParser = StructuredOutputParser.fromZodSchema(
    z.object({
      heading: z.string().describe("The heading of the prompt"),
      steps: z.array(z.string()).describe("include the step of prompt for other ai to get context of the overall prompt in array"),
      prompt: z.string().describe("A flowing, natural paragraph-style prompt without numbered points or bullets"),
      followUpQuestions: z.array(z.string()).optional().describe("Any follow-up questions for the user")
    })
  );

  private formatInstructions: string;
  private model: ChatGoogleGenerativeAI;
  private systemPrompts: Record<string, string>;
  private embeddings: GoogleGenerativeAIEmbeddings;
  private vectorStore: UpstashVectorStore;

  constructor(model: ChatGoogleGenerativeAI, systemPrompts: Record<string, string>) {
    this.model = model;
    this.systemPrompts = systemPrompts;
    this.formatInstructions = this.outputParser.getFormatInstructions();
    this.embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001",
      apiKey: process.env.GOOGLE_API_KEY,
    });
    const indexWithCredentials = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL!,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
    });
    this.vectorStore = new UpstashVectorStore(this.embeddings, {
      index: indexWithCredentials,
    });
  }

  private cleanPromptText(text: string): string {
    return text
      .replace(/^\d+\.\s+/gm, '')
      .replace(/\n+/g, '\n\n')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  private getUpdatedSystemPrompts() {
    return {
      detailed: `${this.systemPrompts.detailed}\n\n${this.formatInstructions}`,
      normal: `${this.systemPrompts.normal}\n\n${this.formatInstructions}`
    };
  }

  private async saveConversation(chatId: string, content: string, role: Role) {
    await prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() }
    })

    const conversation = await prisma.conversation.create({
      data: {
        content,
        role,
        chatId
      }
    });
    return this.vectorStore.addDocuments([
      {
        pageContent: content,
        metadata: {
          chatId,
          role,
          messageId: conversation.id,
          timestamp: conversation.timestamp.toISOString(),
        },
      },
    ]);
  }

  private async getRelevantChatHistory(chatId: string, userInput: string, limit: number = 3): Promise<string> {
    try {
      const filterString = `chatId = "${chatId}"`;
      const vectorSearchResults = await this.vectorStore.similaritySearch(userInput, limit, filterString);
      let formattedContext = "";
      for (const doc of vectorSearchResults) {
        const role = doc.metadata.role;
        formattedContext += `${role.toUpperCase()}: ${doc.pageContent}\n\n`;
      }
      return formattedContext;
    } catch (error) {
      console.error("Error retrieving chat history:", error);
      return "";
    }
  }


  async processUserInput(params: {
    userInput: string;
    promptType: 'normal' | 'detailed';
    userId: string;
    chatId?: string;
  }) {
    const { userInput, promptType, userId, chatId } = params;

    // Create or get chat
    const chat = chatId ? await prisma.chat.findUnique({ where: { id: chatId } }) :
      await prisma.chat.create({
        data: {
          title: userInput.substring(0, 50) + '...',
          userId
        }
      });

    if (!chat) {
      throw new Error('Chat not found');
    }

    // Use chatId as sessionId for Redis history
    const upstashMessageHistory = new UpstashRedisChatMessageHistory({
      sessionId: chat.id,
      config: {
        url: process.env.UPSTASH_REDIS_URL!,
        token: process.env.UPSTASH_REST_TOKEN!,
      },
    });

    const relevantHistory = await this.getRelevantChatHistory(chat.id, userInput);

    // Save user message
    await this.saveConversation(chat.id, userInput, 'user');

    const memory = new BufferMemory({
      memoryKey: "history",
      chatHistory: upstashMessageHistory,
      returnMessages: true,
      outputKey: "response",
      inputKey: "input"
    });

    // Combine system prompt and vector content into a single system message
    const systemMessage = `${this.getUpdatedSystemPrompts()[promptType]}\n\nRelevant Content: ${relevantHistory}`;

    const recentMessages = await upstashMessageHistory.getMessages();
    const trimmedHistory = recentMessages.slice(-3); // Take the last 3 messages
    await upstashMessageHistory.clear(); 
    for (const msg of trimmedHistory) {
      await upstashMessageHistory.addMessage(msg); 
    }


    const escapedSystemContent = systemMessage.replace(/\{/g, "{{").replace(/\}/g, "}}");

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", escapedSystemContent], // Single system message first
      new MessagesPlaceholder("history"), // History comes after system message
      ["human", "{input}"], // User input last
    ]);

    const chain = new ConversationChain({
      llm: this.model,
      prompt,
      memory,
      verbose: true,
    });

    const response = await chain.call({
      input: userInput, // Only pass the input, as systemPrompt and vectorContent are in the template
    });

    if (!response.response) {
      throw new Error("Empty response received from AI model");
    }

    // Save assistant response
    await this.saveConversation(chat.id, response.response, 'assistant');

    try {
      const parsedResponse = await this.outputParser.parse(response.response);
      parsedResponse.prompt = this.cleanPromptText(parsedResponse.prompt);

      return {
        result: parsedResponse,
        chatId: chat.id
      };
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      return {
        result: {
          heading: "Response Format Error",
          steps: [],
          prompt: this.cleanPromptText(response.response),
          followUpQuestions: []
        },
        parsingError: true,
        chatId: chat.id
      };
    }
  }
}