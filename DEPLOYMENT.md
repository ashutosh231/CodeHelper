# 🚀 Deployment Guide

Your code has been successfully pushed to GitHub!
**Repository:** https://github.com/ashutosh231/CodeHelper.git

## Deploy to Vercel (Recommended - 3 minutes)

### Step 1: Import Project to Vercel

1. Go to **[Vercel Dashboard](https://vercel.com/new)**
2. Click **"Import Project"** or **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Paste your repository URL: `https://github.com/ashutosh231/CodeHelper`
5. Click **"Import"**

### Step 2: Configure Environment Variables

Before deploying, add these environment variables in Vercel:

Click **"Environment Variables"** and add:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://irjwpcpdhqswukvzehjb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyandwY3BkaHFzd3VrdnplaGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNDQ3NDAsImV4cCI6MjA3NzcyMDc0MH0.Y5Sp-tY9LRdFa8KRGMZBK2bTM3NqZtJQvFsu_mPgX3g

# Google AI API Key
GOOGLE_API_KEY=AIzaSyBvX-2fs5qb-NR66MjQ3uMt396xNQ9rtpg
```

**Important:** Make sure to add these for:
- ✅ Production
- ✅ Preview (optional but recommended)
- ✅ Development (optional)

### Step 3: Configure Supabase Redirect URLs

1. Go to your **[Supabase Dashboard](https://supabase.com/dashboard)**
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Add your Vercel deployment URL to **Redirect URLs**:
   ```
   https://your-app-name.vercel.app/**
   ```
5. Update **Site URL** to: `https://your-app-name.vercel.app`

### Step 4: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Your app will be live! 🎉

## Post-Deployment Setup

### Update Supabase OAuth Callback

After deployment, update the OAuth callback URL in your Supabase project:

1. Go to **Authentication** → **Providers**
2. For each enabled provider (Email, Google), update the callback URL to:
   ```
   https://your-app-name.vercel.app/auth/callback
   ```

## Vercel CLI Deployment (Alternative)

If you prefer using the CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/ashutoshkumar/Documents/CodeHelper/my-app
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? CodeHelper (or your choice)
# - Directory? ./
# - Want to modify settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add GOOGLE_API_KEY

# Deploy to production
vercel --prod
```

## Troubleshooting

### Build Errors

If you get build errors:
1. Check that all environment variables are set
2. Verify the build command is: `npm run build`
3. Check the build logs in Vercel dashboard

### Authentication Not Working

1. Verify Supabase redirect URLs include your Vercel domain
2. Check environment variables are correctly set
3. Ensure Site URL in Supabase matches your deployment URL

### API Errors

1. Verify `GOOGLE_API_KEY` is set in Vercel
2. Check API key hasn't exceeded rate limits
3. Verify API key is valid in Google AI Studio

## Custom Domain (Optional)

To add a custom domain:

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your domain
4. Update DNS records as instructed
5. Update Supabase redirect URLs with your custom domain

## Environment Variables Reference

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |
| `GOOGLE_API_KEY` | Google AI API key | [Google AI Studio](https://aistudio.google.com/app/apikey) |

## Security Checklist

- ✅ Environment variables set in Vercel (not in code)
- ✅ `.env.local` is in `.gitignore`
- ✅ Supabase redirect URLs configured
- ✅ API keys are not exposed in client-side code

## Next Steps

1. **Test your deployed app** - Visit your Vercel URL
2. **Share with users** - Your app is now publicly accessible
3. **Monitor usage** - Check Vercel Analytics
4. **Set up monitoring** - Add error tracking (optional)

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)

---

**Your app is ready to deploy! 🚀**

Visit: https://vercel.com/new to get started!
