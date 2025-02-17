'use client';

import { useRouter } from 'next/navigation';
import { ChatInput } from '@/components/chat/chat-input';

export default function NewChatPage() {
  const router = useRouter();

  const handleSendMessage = async (message: string) => {
    try {
      const response = await fetch('/api/chat/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error('Failed to create chat');

      const data = await response.json();
      router.push(`/chat/${data.chatId}`);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl h-full">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text-shady mb-2">Start a New Chat</h2>
          <p className="text-white">
            Ask me anything and I'll help you find the answers.
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4  md:left-72">
        <div className="container mx-auto max-w-4xl">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}