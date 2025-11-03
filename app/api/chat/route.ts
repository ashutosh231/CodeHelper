import { streamText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import type { NextRequest } from "next/server"

// Initialize Google Gemini provider
const googleProvider = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    console.log("Received request:", { message: message?.substring(0, 50) })

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      })
    }

    if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === 'your-google-api-key-here') {
      return new Response(JSON.stringify({ 
        error: "⚠️ Google API key not configured. Please add your GOOGLE_API_KEY to .env.local file. See GOOGLE_API_SETUP.md for instructions." 
      }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      })
    }

    console.log("Using Google Gemini model")

    const result = streamText({
      model: googleProvider("gemini-2.0-flash-exp"),
      system:
        "You are CodeHelper, an expert programming assistant. Help users with coding questions, debugging, and development guidance. Be concise but thorough.",
      prompt: message,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Error in chat route:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to process request"
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
