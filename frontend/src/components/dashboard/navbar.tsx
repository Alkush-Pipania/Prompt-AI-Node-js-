import { Bot, User } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from 'next/image'
import logo from '@/../public/logo/gethint.png'
interface ChatNavbarProps {
  chatName?: string
}

export default function ChatNavbar({ chatName = "New Chat" }: ChatNavbarProps) {
  return (
    <nav className="flex  bg-black/40 items-center justify-between w-full  px-4 py-2 left-0 fixed top-0">
        <div className='flex items-center space-x-2'>
          <Image src={logo} alt='opex' />
          <span className="font-semibold text-white">Assistant</span>
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
    </nav>
  )
}