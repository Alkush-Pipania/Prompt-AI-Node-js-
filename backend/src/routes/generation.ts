import { Router } from 'express';
import { ChatController } from '../controller/chat.controller';

export function createChatRouter(chatController: ChatController): Router {
  const router = Router();

  router.post("/", chatController.handleChat);
  router.get("/history/:chatId", chatController.getChatHistory);
  router.get("/user/:userId", chatController.getUserChats);

  return router;
}