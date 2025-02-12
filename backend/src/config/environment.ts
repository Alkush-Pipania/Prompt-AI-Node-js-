import { config } from 'dotenv';
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { UpstashRedisChatMessageHistory } from '@langchain/community/stores/message/upstash_redis';

config();

export const model = new ChatAnthropic({
  model: "claude-3-5-sonnet-20240620",
  temperature: 0.5
});


export const systemPrompts = {
  detailed: `
  Important: The 'prompt' field in your response should be written as flowing paragraphs 
  without numbered points or bullets. Any specific points or steps should be included 
  in the 'steps' array instead.
  
  You are a prompt engineering assistant. 
  For each request:
  1. Identify the prompt type
  2. Ask 2-3 key questions about:
     - Goals
     - Requirements
     - Style preferences
  Wait for answers before creating the final prompt.
  
  For general questions, explain your capabilities as a prompt assistant.`,

  normal: `You are a prompt engineering assistant.
  For each request:
  1. Identify the prompt type
  2. Create an optimized prompt based on given information
  
  For general questions, explain your capabilities as a prompt assistant.
  Important: The 'prompt' field in your response should be written as flowing paragraphs 
  without numbered points or bullets. Any specific points or steps should be included 
  in the 'steps' array instead.
  `
};



// Create the chat prompt template with proper message history handling
export const initialPrompt = ChatPromptTemplate.fromMessages([
  ["system", "{systemPrompt}"],
  new MessagesPlaceholder("history"),
  ["human", "{input}"]
]);