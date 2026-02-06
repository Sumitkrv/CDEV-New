# Backend Deployment Guide

## Problem
Your deployed frontend is trying to connect to `localhost:1337`, which doesn't exist in production.

## Solution

### Option 1: Deploy to Railway (Recommended - Easiest)

1. **Sign up at [Railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Choose the `backend` folder

3. **Configure Environment Variables**
   Railway will auto-detect Strapi. Add these variables:
   ```
   NODE_ENV=production
   DATABASE_CLIENT=sqlite
   APP_KEYS=your-app-keys-here
   API_TOKEN_SALT=your-api-token-salt
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   JWT_SECRET=your-jwt-secret
   ```
   
   Generate secrets with: `openssl rand -base64 32`

4. **Configure Strapi for Production**
   Railway will assign a URL like: `https://your-app.up.railway.app`

5. **Update Strapi CORS Settings**
   In `backend/config/middlewares.ts`, ensure CORS allows your Vercel domain.

### Option 2: Deploy to Render

1. **Sign up at [Render.com](https://render.com)**

2. **Create New Web Service**
   - Connect your GitHub repository
   - Select the `backend` folder
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`

3. **Add Environment Variables** (same as above)

4. Render will provide a URL like: `https://your-app.onrender.com`

---

## Step 2: Configure Frontend (Vercel)

Once your backend is deployed:

1. **Go to Vercel Dashboard**
   - Select your project
   - Go to Settings → Environment Variables

2. **Add Environment Variable**
   ```
   VITE_STRAPI_URL = https://your-backend-url.com
   ```
   (No trailing slash)

3. **Redeploy**
   - Go to Deployments
   - Click "Redeploy" or push a new commit

---

## Quick Fix: Use Existing Backend (If Available)

If you already have a Strapi backend deployed somewhere, just add the environment variable in Vercel:

```bash
# In Vercel dashboard, add:
VITE_STRAPI_URL = https://your-existing-backend.com
```

Then redeploy.

---

## Testing Locally with Production Backend

Create a `.env` file in your project root:

```env
VITE_STRAPI_URL=https://your-production-backend.com
```

Run: `npm run dev`

---

## Backend Configuration Checklist

Ensure your `backend/config/middlewares.ts` has proper CORS:

```typescript
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:5173', 'https://your-vercel-domain.vercel.app'],
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

Replace `your-vercel-domain.vercel.app` with your actual Vercel domain.

---

## Verify Deployment

After deploying:

1. Visit: `https://your-backend-url.com/api/home?populate=*`
2. You should see JSON data
3. If you see data, your backend is working!
4. Now configure the frontend environment variable and redeploy

---

## Need Help?

Common issues:
- **CORS errors**: Update `backend/config/middlewares.ts`
- **Database errors**: Ensure environment variables are set correctly
- **Build errors**: Check Node version compatibility (use Node 18+)
