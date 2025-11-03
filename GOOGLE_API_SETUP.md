# Google AI API Key Setup

## Quick Setup (2 minutes)

### Step 1: Get Your API Key

1. Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**
2. Click **"Get API Key"** or **"Create API Key"**
3. Select **"Create API key in new project"** (or use existing project)
4. Copy the generated API key (starts with `AIza...`)

### Step 2: Add to Environment Variables

1. Open `.env.local` in your project root
2. Find the line:
   ```
   GOOGLE_API_KEY=your-google-api-key-here
   ```
3. Replace `your-google-api-key-here` with your actual API key:
   ```
   GOOGLE_API_KEY=AIzaSyC_your_actual_key_here
   ```

### Step 3: Restart the Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

### Step 4: Test Your Chat

1. Visit http://localhost:3000
2. Log in with your credentials
3. Try sending a message in the chat
4. You should get a response from Gemini AI!

## Troubleshooting

### Error: "Google API key not configured"
- Make sure you added the key to `.env.local`
- Restart your dev server after adding the key
- Check there are no extra spaces or quotes around the key

### Error: "Failed to get response"
- Verify your API key is valid
- Check you have an active internet connection
- Make sure you're not exceeding the free tier limits

### Error: "API key not valid"
- Double-check you copied the entire key
- Try generating a new API key
- Make sure the API key hasn't been restricted

## Free Tier Limits

Google AI (Gemini) free tier includes:
- ✅ 15 requests per minute
- ✅ 1 million tokens per minute
- ✅ 1,500 requests per day

This is more than enough for development and personal use!

## API Key Security

⚠️ **Important Security Notes:**

1. **Never commit** `.env.local` to Git (it's already in `.gitignore`)
2. **Never share** your API key publicly
3. **Never hardcode** the key in your source code
4. If exposed, **delete it immediately** and create a new one

## Alternative: Use Mock Response (Testing)

If you want to test without an API key temporarily, you can modify `app/api/chat/route.ts` to return a mock response. However, I recommend getting the free API key - it only takes 2 minutes!

## Need Help?

- [Google AI Documentation](https://ai.google.dev/docs)
- [API Key Management](https://aistudio.google.com/app/apikey)
- [Gemini API Quickstart](https://ai.google.dev/tutorials/get_started_web)
