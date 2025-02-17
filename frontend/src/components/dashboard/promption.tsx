"use client"

import * as React from "react"
import { Paperclip, ScrollText, Wand2 } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ChatInput() {
  return (
    <div className="w-full bg-transparent self-center max-w-2xl mx-auto">
      <div className="relative bg-brand/main-bg">
        <Textarea
          placeholder="Ask a follow up..."
          className="min-h-[60px] resize-none text-text-shady  border-muted pr-20"
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add attachment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <ScrollText className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Scroll to bottom</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="mt-2 flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" className="h-7">
                <Wand2 className="h-3 w-3 mr-1" />
                Detailed
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Get detailed prompt</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <p className="text-xs text-muted-foreground mt-2 text-center">
        OpenAI may make mistakes. Please use with discretion.
      </p>
    </div>
  )
}