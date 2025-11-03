"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Sidebar } from "@/components/sidebar"
import { ChatArea } from "@/components/chat-area"
import { InputBar } from "@/components/input-bar"
import { Header } from "@/components/header"
import { ModelSelector } from "@/components/model-selector"
import { ThemeProvider } from "@/components/theme-provider"

export type AIModel = "gemini"
export type ThemeMode = "dawn" | "day" | "sunset" | "night" | "midnight"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  model?: AIModel
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  currentModel: AIModel
}

export default function Home() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "New chat",
      messages: [],
      currentModel: "gemini",
    },
  ])
  const [activeConversationId, setActiveConversationId] = useState("1")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [themeMode, setThemeMode] = useState<ThemeMode>("night")

  const activeConversation = conversations.find((c) => c.id === activeConversationId)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router, supabase])

  useEffect(() => {
    const hour = new Date().getHours()
    let mode: ThemeMode = "night"

    if (hour >= 5 && hour < 8) mode = "dawn"
    else if (hour >= 8 && hour < 16) mode = "day"
    else if (hour >= 16 && hour < 19) mode = "sunset"
    else if (hour >= 19 && hour < 22) mode = "night"
    else mode = "midnight"

    setThemeMode(mode)
    document.documentElement.setAttribute("data-theme", mode)
  }, [])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, userMessage],
          }
        }
        return conv
      }),
    )

    setIsLoading(true)

    try {
      const model = activeConversation?.currentModel || "gemini"
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || `Server error: ${response.status}`
        throw new Error(errorMessage)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response body")

      const decoder = new TextDecoder()
      let fullContent = ""
      const assistantMessageId = Math.random().toString()

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === activeConversationId) {
            return {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: assistantMessageId,
                  role: "assistant",
                  content: "",
                  timestamp: new Date(),
                  model,
                },
              ],
            }
          }
          return conv
        }),
      )

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        console.log("Received chunk:", chunk.substring(0, 200))
        const lines = chunk.split("\n").filter((line) => line.trim())

        for (const line of lines) {
          console.log("Processing line:", line.substring(0, 100))
          
          // Handle Vercel AI SDK stream format (SSE)
          if (line.startsWith("data: ")) {
            const data = line.substring(6) // Remove "data: " prefix
            
            if (data === "[DONE]") {
              console.log("Stream finished")
              break
            }

            try {
              const parsed = JSON.parse(data)
              
              // Handle text-delta messages
              if (parsed.type === "text-delta" && parsed.delta) {
                fullContent += parsed.delta
                console.log("Added delta:", parsed.delta.substring(0, 50))
                
                // Update UI with accumulated content
                setConversations((prev) =>
                  prev.map((conv) => {
                    if (conv.id === activeConversationId) {
                      return {
                        ...conv,
                        messages: conv.messages.map((msg) =>
                          msg.id === assistantMessageId ? { ...msg, content: fullContent } : msg
                        ),
                      }
                    }
                    return conv
                  })
                )
              }
            } catch (e) {
              console.error("Failed to parse JSON:", e)
            }
          }
        }
      }
      
      console.log("Stream complete. Final content length:", fullContent.length)
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === activeConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, errorMessage],
            }
          }
          return conv
        }),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Math.random().toString(),
      title: "New chat",
      messages: [],
      currentModel: "gemini",
    }
    setConversations((prev) => [newConversation, ...prev])
    setActiveConversationId(newConversation.id)
  }

  const handleChangeModel = (model: AIModel) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversationId) {
          return { ...conv, currentModel: model }
        }
        return conv
      }),
    )
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider mode={themeMode} onModeChange={setThemeMode}>
      <div className="flex h-screen bg-gradient-to-br from-background via-background to-accent/5 text-foreground overflow-hidden">
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          onNewConversation={createNewConversation}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            themeMode={themeMode}
            onThemeChange={setThemeMode}
          />
          <ChatArea messages={activeConversation?.messages || []} isLoading={isLoading} />
          <InputBar onSendMessage={handleSendMessage} />
        </div>
      </div>
    </ThemeProvider>
  )
}
