import {  Role } from '@prisma/client';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  chats?: Chat[];
  settings?: UserSettings;
}

export interface Chat {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
  conversations?: Conversation[];
}

export interface Conversation {
  id: string;
  content: string;
  role: Role;  // Using Prisma's Role enum
  timestamp: Date;
  chatId: string;
  chat?: Chat;
}

export interface UserSettings {
  userId: string;
  user: User;
}