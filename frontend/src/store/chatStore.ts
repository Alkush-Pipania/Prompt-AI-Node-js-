import { set } from 'date-fns';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface ChatStore{
  chats : Chat[];
  setChats: (chats: Chat[]) => void;
  addchat: (chat: Chat) => void;  
  deleteChat: (id: string) => void;
}

export const useMetaChatStore = create<ChatStore>()(
  devtools((set) => ({
    chats: [],

    setChats: (chats) => set(() => ({ chats })), // Set all chats at once

    addChat: (chat : Chat) =>
      set((state) => ({
        chats: [...state.chats, chat],
      })),

    deleteChat: (id) =>
      set((state) => ({
        chats: state.chats.filter((chat) => chat.id !== id),
      })),
  }))
);