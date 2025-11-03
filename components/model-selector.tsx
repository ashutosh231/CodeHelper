"use client"

import { motion } from "framer-motion"
import type { AIModel } from "@/app/page"

interface ModelSelectorProps {
  currentModel: AIModel
  onChangeModel: (model: AIModel) => void
}

const MODELS: Array<{
  id: AIModel
  name: string
  icon: string
  color: string
  bg: string
}> = [
  {
    id: "grok",
    name: "Grok AI",
    icon: "🧠",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-500/10",
  },
  {
    id: "openai",
    name: "GPT-4",
    icon: "✨",
    color: "from-green-500 to-green-600",
    bg: "bg-green-500/10",
  },
  {
    id: "gemini",
    name: "Gemini Pro",
    icon: "🌟",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: "💬",
    color: "from-cyan-500 to-cyan-600",
    bg: "bg-cyan-500/10",
  },
]

export function ModelSelector({ currentModel, onChangeModel }: ModelSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border/20 px-4 md:px-6 py-3 bg-gradient-to-r from-background/50 to-transparent backdrop-blur-sm"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Model</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          {MODELS.map((model) => {
            const isActive = model.id === currentModel
            return (
              <motion.button
                key={model.id}
                onClick={() => onChangeModel(model.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${model.color} text-white shadow-lg`
                    : `${model.bg} text-foreground hover:bg-opacity-20 border border-border/40`
                }`}
              >
                <span className="text-lg">{model.icon}</span>
                <span className="hidden sm:inline">{model.name}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
