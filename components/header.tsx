"use client"

import { Menu, Sun, Moon, Sunset, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { ThemeMode } from "@/app/page"
import type { LucideIcon } from "lucide-react"

interface HeaderProps {
  onToggleSidebar: () => void
  themeMode: ThemeMode
  onThemeChange: (mode: ThemeMode) => void
}

const THEME_ICONS: Record<ThemeMode, { icon: LucideIcon; label: string; color: string }> = {
  dawn: { icon: Sun, label: "Dawn", color: "from-orange-400 to-yellow-300" },
  day: { icon: Sun, label: "Day", color: "from-blue-400 to-cyan-400" },
  sunset: { icon: Sunset, label: "Sunset", color: "from-red-500 to-orange-400" },
  night: { icon: Moon, label: "Night", color: "from-indigo-600 to-purple-600" },
  midnight: { icon: Moon, label: "Midnight", color: "from-slate-900 to-slate-800" },
}

export function Header({ onToggleSidebar, themeMode, onThemeChange }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const themes: ThemeMode[] = ["dawn", "day", "sunset", "night", "midnight"]

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-border/20 px-4 md:px-6 py-4 flex items-center justify-between bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-xl shadow-sm"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleSidebar}
        className="md:hidden p-2 hover:bg-secondary/50 rounded-lg transition-all"
      >
        <Menu size={20} />
      </motion.button>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-bold hidden md:block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent"
      >
        CodeHelper
      </motion.h1>

      <div className="flex items-center gap-3">
        <motion.div className="hidden sm:flex items-center gap-1 bg-secondary/30 backdrop-blur-sm rounded-full p-1 border border-border/20">
          {themes.map((theme) => {
            const icon = THEME_ICONS[theme].icon
            const Icon = icon
            const isActive = theme === themeMode
            return (
              <motion.button
                key={theme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onThemeChange(theme)
                  document.documentElement.setAttribute("data-theme", theme)
                }}
                className={`p-2 rounded-full transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${THEME_ICONS[theme].color} text-white shadow-lg`
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={THEME_ICONS[theme].label}
              >
                <Icon size={16} />
              </motion.button>
            )
          })}
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="p-2 hover:bg-destructive/10 rounded-lg transition-all text-destructive"
          title="Logout"
        >
          <LogOut size={18} />
        </motion.button>
      </div>
    </motion.header>
  )
}
