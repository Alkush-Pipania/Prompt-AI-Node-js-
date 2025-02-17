'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare, Menu, User, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/lib/store';
import logo from '@/../public/logo/gethint.png'
import Image from 'next/image';
import { Avatar, AvatarFallback } from '../ui/avatar';

export function ChatHeader() {
  const { sidebarOpen, toggleSidebar } = useChatStore();

  return (
    <header
      className={cn(
        'fixed top-0 z-30  left-0 border-b bg-brand/main-bg/50 transition-all ease-in-out duration-200 w-full',
        'lg:ml-64 lg:w-[calc(100%-256px)] w-full'
      )}
    >
      <main className='flex flex-row justify-between px-2 items-center'>
        <div className="flex h-16 items-center px-4">
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden md:flex mr-2 `}
              onClick={toggleSidebar}
            >
              <PanelLeft className="h-6 w-6" />
            </Button>
          )}
          <div className='flex items-center space-x-2'>
            <Image src={logo} alt='opex' />
            <span className="font-semibold text-white">Opex o12</span>
          </div>
        </div>

        <div>
          <h1 className="text-text-shady font-medium">{"Chat Name"}</h1>
        </div>

        <div>
          <Avatar className="h-8 w-8 border border-white/20">
            <AvatarFallback className="bg-transparent">
              <User className="h-4 w-4 text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
      </main>
    </header>
  );
}