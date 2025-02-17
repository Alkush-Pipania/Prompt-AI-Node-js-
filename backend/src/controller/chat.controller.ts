import { Request, Response } from 'express';
import { ChatService } from '../services/chat.service';
import { prisma } from '../services/db.service';

export class ChatController {
  private chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  handleChat = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userInput, promptType = "normal", userId, chatId } = req.body;

      if (!userInput || !userId) {
        res.status(400).json({ message: "Missing required fields." });
        return;
      }

      const result = await this.chatService.processUserInput({
        userInput,
        promptType,
        userId,
        chatId
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("Error in chat controller:", error);
      res.status(500).json({
        error: "An error occurred while processing the chat.",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  }

  getChatHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { chatId } = req.params;
      const conversations = await prisma.conversation.findMany({
        where: { chatId },
        orderBy: { timestamp: 'asc' }
      });
      res.status(200).json(conversations);
    } catch (error) {
      res.status(500).json({
        error: "Error fetching chat history",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  }

  getUserChats = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const chats = await prisma.chat.findMany({
        where: { userId },
        include: {
        },
        orderBy: { updatedAt: 'desc' }
      });
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({
        error: "Error fetching user chats",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  }
}