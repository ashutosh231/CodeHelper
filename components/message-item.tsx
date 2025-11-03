"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  model?: string
}

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      {message.role === "assistant" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/60 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-lg"
        >
          A
        </motion.div>
      )}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`max-w-2xl rounded-xl p-4 transition-all backdrop-blur-sm ${
          message.role === "user"
            ? "bg-gradient-to-br from-accent to-accent/80 text-white shadow-lg"
            : "bg-secondary/50 text-foreground border border-border/40"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        {message.role === "assistant" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="mt-2 text-xs opacity-60 hover:opacity-100 flex items-center gap-1 transition-opacity"
          >
            {copied ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1">
                <Check size={14} /> Copied
              </motion.div>
            ) : (
              <>
                <Copy size={14} /> Copy
              </>
            )}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}
