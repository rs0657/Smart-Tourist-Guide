# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account (you already have: https://github.com/rs0657/Smart-Tourist-Guide)
- Vercel account (free) - Sign up at https://vercel.com
- Supabase project with credentials

## Step-by-Step Deployment

### 1. Sign Up / Login to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub repositories

### 2. Import Your Project
1. On Vercel Dashboard, click "**Add New...**" → "**Project**"
2. Find and select "**Smart-Tourist-Guide**" repository
3. Click "**Import**"

### 3. Configure Project Settings

#### Framework Preset
- Vercel should auto-detect: **Next.js**
- Root Directory: `./` (leave as default)
- Build Command: `npm run build` (auto-filled)
- Output Directory: `.next` (auto-filled)

#### Environment Variables
Click "**Environment Variables**" and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

**To get these values:**
1. Go to your Supabase project dashboard
2. Click on "**Project Settings**" (gear icon)
3. Go to "**API**" section
4. Copy:
   - **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Deploy
1. Click "**Deploy**" button
2. Wait for build to complete (2-3 minutes)
3. You'll get a URL like: `https://smart-tourist-guide-xxxxx.vercel.app`

### 5. Configure Custom Domain (Optional)
1. Go to Project Settings → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

## Post-Deployment Checklist

### ✅ Verify Deployment
- [ ] Visit your Vercel URL
- [ ] Check home page loads with destinations
- [ ] Test filter functionality (search, category, state)
- [ ] Test authentication (sign up/sign in)
- [ ] Add favorites and verify they save
- [ ] Check all navigation links work

### ✅ Update Supabase Settings
1. Go to Supabase → Authentication → URL Configuration
2. Add your Vercel URL to "**Site URL**":
   ```
   https://your-app-name.vercel.app
   ```
3. Add to "**Redirect URLs**":
   ```
   https://your-app-name.vercel.app/**
   https://your-app-name.vercel.app/auth
   https://your-app-name.vercel.app/favorites
   ```

### ✅ Enable Email Confirmations (Optional)
If you want to disable email verification for easier testing:
1. Supabase → Authentication → Settings
2. Toggle OFF "**Enable email confirmations**"

## Continuous Deployment

Every time you push to GitHub, Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy the new version
4. Keep previous deployments for rollback

### To Deploy Updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

## Troubleshooting

### Build Fails
- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Images Not Loading
- Vercel automatically optimizes images
- Ensure images are in `public/` directory
- Check `next.config.js` for image configuration

### Database Connection Issues
- Verify environment variables are correct
- Check Supabase project is not paused
- Ensure RLS policies allow public read access

### Authentication Not Working
- Add Vercel URL to Supabase redirect URLs
- Clear browser cache and cookies
- Check browser console for errors

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN distribution
- ✅ Automatic HTTPS/SSL
- ✅ Image optimization
- ✅ Edge caching
- ✅ Serverless functions for API routes

## Monitoring

### View Analytics
1. Go to your project on Vercel
2. Click "Analytics" tab
3. View:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### View Logs
1. Go to "Deployments" tab
2. Click on any deployment
3. View build and runtime logs

## Environment Management

### Production vs Preview
- **Production**: Deployments from `main` branch
- **Preview**: Deployments from other branches/PRs

### Add Development Environment
Create `.env.development` for local development:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_dev_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_supabase_key
```

## Support Resources

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
- Your GitHub Repo: https://github.com/rs0657/Smart-Tourist-Guide

## Quick Commands

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from terminal
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

---

**🎉 Congratulations!** Your Smart Tourism Guide is now live on Vercel!

Share your app: `https://your-app-name.vercel.app`
