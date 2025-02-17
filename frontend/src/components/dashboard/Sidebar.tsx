'use client'

import React, { useEffect, useState } from "react"
import { Grid2X2, Menu, Search, SquarePen, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { chatData } from "@/config/tempDAta"
import { useChatStore } from "@/lib/store"
import axios from "axios"
import { useDialogStore, useMetaChatStore } from "@/store/chatStore"
import Link from "next/link"
import LoadingSpinner from "../LoadingSpinner"

export function ChatSidebar() {
  const { sidebarOpen, toggleSidebar } = useChatStore();
  const { groupedChats, setGroupedChats } = useMetaChatStore();
  const [isloading, setLoading] = useState<boolean>(true)
  const {setOpen} = useDialogStore()

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          setGroupedChats(response.data)
        }
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-brand-main-bg text-slate-200 border-r border-slate-700
          transform transition-transform duration-200 ease-in-out z-50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-0
        `}
      >
        <div className="flex border-b border-slate-700 px-3 py-4 justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-200 hover:bg-slate-700 lg:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
          <div className="flex items-center gap-x-3 justify-center">
            <Button onClick={() => setOpen(true)} 
            variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-500 group">
              <Search className="h-5 w-5 group-hover:text-white" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-500 group">
              <SquarePen className="h-5 w-5 group-hover:text-white" />
            </Button>
          </div>
        </div>
        <nav className="flex-grow flex flex-col gap-y-2 overflow-y-auto">
          <div className="py-2">
            {chatData.staticItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700"
              >
                {item.title === "Opex o12" ? <Menu className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
                <span>{item.title}</span>
              </a>
            ))}
          </div>
          {isloading ? (
            <LoadingSpinner className="self-center" size="medium" />
          ):(
            <div>
            {groupedChats.today.length > 0 && (
              <>
                <h3 className="px-3 text-xs text-slate-400 mb-1">Today</h3>
                {groupedChats.today.map((chat) => (
                  <Link className="flex items-center px-3 py-2  hover:bg-slate-700"
                    href={`/chat/${chat.id}`} key={chat.id}>
                    {chat.title.length > 28 ? `${chat.title.slice(0, 28)}...` : chat.title}
                  </Link>
                ))}
              </>
            )}
            {groupedChats.yesterday.length > 0 && (
              <>
                <h3 className="px-3 text-xs text-slate-400 mb-1">Yesterday</h3>
                {groupedChats.yesterday.map((chat) => (
                  <Link className="flex items-center px-3 py-2  hover:bg-slate-700"
                    href={`/chat/${chat.id}`} key={chat.id}>
                    {chat.title.length > 28 ? `${chat.title.slice(0, 28)}...` : chat.title}
                  </Link>
                ))}
              </>
            )}
            {groupedChats.older.length > 0 && (
              <>
                <h3 className="px-3 text-xs text-slate-400 mb-1">Older</h3>
                {groupedChats.older.map((chat) => (
                  <Link className="flex items-center px-3 py-2  hover:bg-slate-700"
                    href={`/chat/${chat.id}`} key={chat.id}>
                    {chat.title.length > 28 ? `${chat.title.slice(0, 28)}...` : chat.title}
                  </Link>
                ))}
              </>
            )}
          </div>
          )}



        </nav>
      </aside>
    </>
  )
}