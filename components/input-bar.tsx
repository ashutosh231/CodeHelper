"use client"

import type React from "react"
import { useState } from "react"
import { Send, Plus, Mic } from "lucide-react"
import { motion } from "framer-motion"

interface InputBarProps {
  onSendMessage: (content: string) => void
}

export function InputBar({ onSendMessage }: InputBarProps) {
  const [input, setInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as React.FormEvent)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-t border-border/20 p-4 md:p-6 bg-gradient-to-t from-background via-background/80 to-transparent backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <motion.div
          animate={{
            boxShadow: isFocused ? "0 0 30px rgba(139, 92, 246, 0.3)" : "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
          className="flex gap-2 backdrop-blur-sm bg-secondary/40 border border-border/40 rounded-2xl p-1 transition-all"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="p-3 hover:bg-secondary/50 rounded-xl transition-all text-muted-foreground hover:text-accent"
          >
            <Plus size={20} />
          </motion.button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Message CodeHelper..."
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground/60 focus:outline-none text-sm md:text-base px-2"
          />
          <div className="flex gap-1 pr-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="p-3 hover:bg-secondary/50 rounded-xl transition-all text-muted-foreground hover:text-accent"
            >
              <Mic size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!input.trim()}
              className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-xl p-3 disabled:opacity-50 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              <Send size={20} />
            </motion.button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  )
}
