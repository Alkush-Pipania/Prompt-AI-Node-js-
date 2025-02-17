import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import authMiddleware from './middleware';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatService } from './services/chat.service';
import { systemPrompts } from './config/environment';
import { ChatController } from './controller/chat.controller';
import { createChatRouter } from './routes/generation';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import session from "express-session";

const app = express();

app.use(cors());
app.use(express.json());
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.7,
  maxRetries: 2,
});

// app.use(session({ secret: "your-secret", resave: false, saveUninitialized: true }));
const chatService = new ChatService(model, systemPrompts);
const chatController = new ChatController(chatService);
const chatRouter = createChatRouter(chatController);

app.use('/api/v1/auth',authRouter)



app.use('/api/v1/chat',authMiddleware,chatRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});