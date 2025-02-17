


'use client';

// import { ChatSidebar } from '@/components/chat/chat-sidebar';
import { ChatHeader } from '@/components/chat/chat-header';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/lib/store';
import { ChatSidebar } from '@/components/dashboard/Sidebar';
import { ChatDialog } from '@/components/dashboard/SearchDialog';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useChatStore();
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <ChatHeader />
      <main
        className={cn(
          ' flex-1 duration-200 transition-all ease-in-out',
          sidebarOpen ? 'lg:ml-72' : 'ml-0'
        )}
      >
         <ChatDialog/>
        <div className="absolute -z-10 sm:left-1/3 left-1/2  -translate-x-1/2 -translate-y-1/2 transform blur-[120px] rounded-full bg-primary-blue-400 w-52 h-32 sm:w-48 sm:h-96" />
        {children}
      </main>
    </div>
  )
}