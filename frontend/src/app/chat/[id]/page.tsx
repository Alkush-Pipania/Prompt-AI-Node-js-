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
  const scrollRef = useRef<HTMLDivElement>(null);


  
  return (
    <div className="container mx-auto max-w-4xl h-full">
      <ScrollArea className="h-[calc(100vh-8rem)] px-4">
        
      </ScrollArea>
      <div className="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-sm border-t md:left-72">
        <div className="container mx-auto max-w-4xl">
          <ChatInput onSendMessage={()=> console.log("hello")} />
        </div>
      </div>
    </div>
  );
}