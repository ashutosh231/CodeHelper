"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MessageItem } from "./message-item"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  model?: string
}

interface ChatAreaProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatArea({ messages, isLoading }: ChatAreaProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (messages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center p-4"
      >
        <div className="text-center max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent"
          >
            What can I help with?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-8 text-lg"
          >
            Ask me anything or try an example
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {["Explain quantum computing", "Plan a road trip", "Help me code", "Creative writing tips"].map(
              (example, idx) => (
                <motion.button
                  key={example}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + idx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-border/40 rounded-lg hover:bg-secondary/50 hover:border-accent/40 transition-all text-left text-sm font-medium backdrop-blur-sm hover:shadow-lg"
                >
                  {example}
                </motion.button>
              ),
            )}
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message, idx) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <MessageItem message={message} />
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/60 flex-shrink-0 shadow-lg" />
            <div className="flex gap-1 items-end">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.4, y: 0 }}
                  animate={{ opacity: 1, y: -10 }}
                  transition={{
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                  }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>
    </motion.div>
  )
}
