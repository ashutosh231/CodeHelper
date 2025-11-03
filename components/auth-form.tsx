"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User, Lock, Mail } from "lucide-react"

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage({ type: "error", text: error.message })
    } else {
      setMessage({ type: "success", text: "Check your email for the confirmation link!" })
    }
    setLoading(false)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage({ type: "error", text: error.message })
    } else {
      router.push("/")
      router.refresh()
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage({ type: "error", text: error.message })
      setLoading(false)
    }
  }

  return (
    <div 
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage: "url('https://i.postimg.cc/RFqSM2rc/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        .glass-card {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      
      <div className="glass-card w-full max-w-md bg-transparent border-2 border-white/20 backdrop-blur-[13px] rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-8">
        <form onSubmit={isLogin ? handleSignIn : handleSignUp}>
          <h2 className="text-[38px] font-bold text-center text-white mb-8">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          
          <div className="relative w-full h-[55px] mb-7">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full h-full bg-transparent border-2 border-white/20 rounded-[30px] px-5 pr-12 text-white text-base placeholder:text-white placeholder:text-base focus:border-white/40 transition-colors"
            />
            <Mail className="absolute top-1/2 right-[18px] -translate-y-1/2 text-white w-[18px] h-[18px]" />
          </div>

          <div className="relative w-full h-[55px] mb-7">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
              autoComplete="new-password"
              className="w-full h-full bg-transparent border-2 border-white/20 rounded-[30px] px-5 pr-12 text-white text-base placeholder:text-white placeholder:text-base focus:border-white/40 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-[18px] -translate-y-1/2 text-white cursor-pointer"
            >
              {showPassword ? (
                <Eye className="w-[18px] h-[18px]" />
              ) : (
                <EyeOff className="w-[18px] h-[18px]" />
              )}
            </button>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between mb-4 text-white">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-[15px] h-[15px] mr-1 accent-white cursor-pointer"
                />
                <span className="text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#0a2862] rounded-[30px] h-[45px] text-base font-semibold shadow-[0_0_5px_rgba(0,0,0,0.1)] cursor-pointer mb-7 mt-4 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (isLogin ? "Signing in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-5 text-center mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="text-white text-base font-medium hover:opacity-80 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <span className="text-white">--</span>
            <button
              type="button"
              disabled={loading}
              className="text-white text-base font-medium hover:opacity-80 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-center text-sm ${
              message.type === "error" 
                ? "bg-red-500/20 border border-red-500/50 text-red-100" 
                : "bg-green-500/20 border border-green-500/50 text-green-100"
            }`}>
              {message.text}
            </div>
          )}

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setMessage(null)
              }}
              className="text-white text-sm hover:underline"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
