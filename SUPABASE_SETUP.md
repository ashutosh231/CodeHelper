# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for your app.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details:
   - Project name
   - Database password (save this!)
   - Region (choose the closest to your users)
5. Wait for the project to be created (takes ~2 minutes)

## 2. Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## 3. Update Your Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Enable Email Authentication (Required)

1. In your Supabase dashboard, go to **Authentication** > **Providers**
2. Enable **Email** provider (it should be enabled by default)
3. Configure email settings:
   - Go to **Authentication** > **Email Templates**
   - Customize confirmation email if needed

## 5. (Optional) Enable Google OAuth

If you want to enable Google sign-in:

1. Go to **Authentication** > **Providers**
2. Enable **Google** provider
3. You'll need to create a Google OAuth app:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://your-project-id.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret to Supabase

## 6. Configure Authentication Settings

1. Go to **Authentication** > **Settings**
2. Configure these settings:
   - **Site URL**: Your production URL (e.g., `https://yourdomain.com`)
   - **Redirect URLs**: Add your development URL (e.g., `http://localhost:3000/**`)
   
   For development, add:
   ```
   http://localhost:3000/**
   ```

## 7. Run Your Application

```bash
npm run dev
```

Visit `http://localhost:3000` - you should be redirected to `/login` if not authenticated.

## Features Implemented

✅ Email/Password Sign Up
✅ Email/Password Sign In
✅ Google OAuth (optional)
✅ Protected Routes
✅ Session Management
✅ Logout Functionality

## Authentication Flow

1. **Unauthenticated users** are redirected to `/login`
2. **Sign up** - Users receive a confirmation email
3. **Sign in** - Users are redirected to the main chat page
4. **Logout** - Click the logout button in the header

## Troubleshooting

### Issue: "Invalid API key"
- Make sure you copied the correct Anon/Public key (not the Service Role key)
- Check that there are no extra spaces in your `.env.local` file

### Issue: "Email not confirmed"
- Check your spam folder for the confirmation email
- Go to Supabase dashboard > Authentication > Users to manually confirm the user

### Issue: "Redirect not allowed"
- Add your URL to the redirect URLs in Supabase dashboard
- Make sure to include the wildcard pattern (e.g., `http://localhost:3000/**`)

### Issue: Can't sign in with Google
- Verify OAuth credentials are correct
- Check that redirect URIs are properly configured in Google Cloud Console
- Ensure Google provider is enabled in Supabase

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Helpers for Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Authentication Best Practices](https://supabase.com/docs/guides/auth)
