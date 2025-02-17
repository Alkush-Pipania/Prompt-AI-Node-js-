'use client'
import { useEffect, useRef } from 'react';
import { ChatInput } from '@/components/chat/chat-input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/lib/store';

// export function generateStaticParams() {
//   return [{ id: '1' }, { id: '2' }];
// }

export default function ChatPage({ params }: { params: { id: string } }) {
  const { messages, addMessage } = useChatStore();
  const chatMessages = messages[params.id] || [];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSendMessage = async (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      role: 'user' as const,
      timestamp: new Date(),
    };

    addMessage(params.id, newMessage);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content, chatId: params.id }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      
      // Add typing indicator
      const typingId = 'typing-' + Date.now();
      addMessage(params.id, {
        id: typingId,
        content: '...',
        role: 'assistant',
        timestamp: new Date(),
        isTyping: true,
      });

      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Remove typing indicator and add actual response
      addMessage(params.id, {
        id: Date.now().toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl h-full">
      <ScrollArea className="h-[calc(100vh-8rem)] px-4">
        <div className="space-y-4 py-4">
          {chatMessages.map((message : any) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start space-x-4 animate-in fade-in-0 slide-in-from-bottom-3',
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="shrink-0">
                  <AvatarFallback className="bg-primary/10">
                    <MessageSquare className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'rounded-lg px-4 py-2 max-w-[80%] shadow-sm',
                  message.role === 'assistant'
                    ? 'bg-muted'
                    : 'bg-primary text-primary-foreground',
                  message.isTyping && 'animate-pulse'
                )}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <span className="text-xs text-muted-foreground mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {message.role === 'user' && (
                <Avatar className="shrink-0">
                  <AvatarFallback className="bg-primary/10">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <div className="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-sm border-t md:left-72">
        <div className="container mx-auto max-w-4xl">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}