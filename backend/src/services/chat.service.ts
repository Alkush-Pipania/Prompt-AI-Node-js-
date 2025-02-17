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
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

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

  constructor(model: ChatGoogleGenerativeAI, systemPrompts: Record<string, string>) {
    this.model = model;
    this.systemPrompts = systemPrompts;
    this.formatInstructions = this.outputParser.getFormatInstructions();
  }

  private cleanPromptText(text: string): string {
    return text
      .replace(/^\d+\.\s+/gm, '') // Remove leading numbers
      .replace(/\n+/g, '\n\n') // Convert multiple newlines to double newlines for paragraphs
      .replace(/\s{2,}/g, ' ') // Clean up extra spaces
      .trim();
  }

  private getUpdatedSystemPrompts() {
    return {
      detailed: `${this.systemPrompts.detailed}\n\n${this.formatInstructions}`,
      normal: `${this.systemPrompts.normal}\n\n${this.formatInstructions}`
    };
  }

  private async saveConversation(chatId: string, content: string, role: Role): Promise<Conversation> {
    await prisma.chat.update({
      where: { id : chatId},
      data : { updatedAt : new Date()}
    })
    return await prisma.conversation.create({
      data: {
        content,
        role,
        chatId
      }
    });
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
      sessionId: chat.id, // Using chatId as sessionId
      config: {
        url: process.env.UPSTASH_REDIS_URL!,
        token: process.env.UPSTASH_REST_TOKEN!,
      },
    });

    // Save user message
    await this.saveConversation(chat.id, userInput, 'user');

    const memory = new BufferMemory({
      memoryKey: "history",
      chatHistory: upstashMessageHistory,
      returnMessages: true,
      outputKey: "response",
      inputKey: "input"
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "{systemPrompt}"],
      new MessagesPlaceholder("history"),
      ["human", "{input}"],
    ]);

    const chain = new ConversationChain({
      llm: this.model,
      prompt,
      memory,
      verbose: true,
    });

    const response = await chain.call({
      input: userInput,
      systemPrompt: this.getUpdatedSystemPrompts()[promptType]
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