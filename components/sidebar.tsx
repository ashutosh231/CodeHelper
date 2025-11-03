"use client"

import { Plus, Menu, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  currentModel?: string
}

interface SidebarProps {
  conversations: Conversation[]
  activeConversationId: string
  onSelectConversation: (id: string) => void
  onNewConversation: () => void
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  isOpen,
  onToggle,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-40 md:hidden p-2 hover:bg-secondary/50 rounded-lg transition-all"
      >
        <Menu size={20} />
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed md:relative w-64 h-screen bg-gradient-to-b from-sidebar/80 to-sidebar/60 backdrop-blur-xl border-r border-sidebar-border/40 flex flex-col z-30 shadow-2xl`}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 border-b border-sidebar-border/20 backdrop-blur-sm"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNewConversation}
            className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-sidebar-primary-foreground rounded-lg flex items-center justify-center gap-2 py-3 font-medium transition-all shadow-lg hover:shadow-xl"
          >
            <Plus size={18} />
            New Chat
          </motion.button>
        </motion.div>

        {/* Conversation List */}
        <motion.div className="flex-1 overflow-y-auto p-3 space-y-2">
          <AnimatePresence mode="popLayout">
            {conversations.map((conv, idx) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ x: 4 }}
                className={`w-full text-left px-3 py-2 rounded-lg truncate text-sm transition-all group flex items-center justify-between cursor-pointer ${
                  activeConversationId === conv.id
                    ? "bg-gradient-to-r from-accent/40 to-accent/20 text-sidebar-accent-foreground font-medium shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/30"
                }`}
                onClick={() => onSelectConversation(conv.id)}
              >
                <span className="truncate flex-1">{conv.title}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    // Add delete functionality here
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                >
                  <Trash2 size={14} className="text-muted-foreground" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 border-t border-sidebar-border/20 space-y-2 backdrop-blur-sm"
        >
          <motion.button
            whileHover={{ x: 4 }}
            className="w-full text-left px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/30 rounded-lg transition-all"
          >
            Settings
          </motion.button>
          <motion.button
            whileHover={{ x: 4 }}
            className="w-full text-left px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/30 rounded-lg transition-all"
          >
            Help & FAQ
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  )
}
