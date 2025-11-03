"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { ThemeMode } from "@/app/page"

const ThemeContext = createContext<{
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
} | null>(null)

export function ThemeProvider({
  mode,
  onModeChange,
  children,
}: {
  mode: ThemeMode
  onModeChange: (mode: ThemeMode) => void
  children: ReactNode
}) {
  return <ThemeContext.Provider value={{ mode, setMode: onModeChange }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
