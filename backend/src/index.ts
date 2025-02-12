import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import authMiddleware from './middleware';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatService } from './services/chat.service';
import { systemPrompts } from './config/environment';
import { ChatController } from './controller/chat.controller';
import { createChatRouter } from './routes/generation';


const app = express();

app.use(cors());
app.use(express.json());
const model = new ChatAnthropic({
  anthropicApiKey: process.env.ANTHROPIC_API_KEY!,
  modelName: "claude-3-5-sonnet-20241022"
});

const chatService = new ChatService(model, systemPrompts);
const chatController = new ChatController(chatService);
const chatRouter = createChatRouter(chatController);

app.use('/api/v1/auth',authRouter)



app.use('/api/v1/chat',authMiddleware,chatRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});