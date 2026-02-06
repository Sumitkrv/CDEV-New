# 🚀 DEPLOYMENT GUIDE - Fix "Loading hero content..." Error

## 🔍 Problem
Your frontend is deployed but showing "Loading hero content..." because it's trying to connect to `http://localhost:1337` which doesn't work in production.

## ✅ Solution

### Step 1: Deploy Your Strapi Backend

Choose one of these platforms to deploy your Strapi backend:

#### Option A: Railway (Recommended - Free Tier)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your backend folder
5. Railway will auto-detect Strapi and deploy
6. Copy your deployment URL (e.g., `https://your-app.up.railway.app`)

#### Option B: Render (Free Tier)
1. Go to [render.com](https://render.com)
2. Sign up and create "New Web Service"
3. Connect your GitHub repo
4. Set Root Directory: `backend`
5. Build Command: `npm install && npm run build`
6. Start Command: `npm run start`
7. Copy your deployment URL

#### Option C: Heroku
1. Install Heroku CLI
2. Run in backend folder:
```bash
cd backend
heroku create your-strapi-app
git push heroku main
```

### Step 2: Configure Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `VITE_STRAPI_URL`
   - **Value**: `https://your-deployed-strapi-url.com` (your Railway/Render/Heroku URL)
   - **Environments**: Check all (Production, Preview, Development)
4. Click **Save**

### Step 3: Redeploy Frontend

Option A - Auto Redeploy:
1. Go to **Deployments** tab in Vercel
2. Click ⋯ on latest deployment
3. Click **Redeploy**

Option B - Git Push:
```bash
git add .
git commit -m "Configure production Strapi URL"
git push
```

### Step 4: Configure CORS in Strapi Backend

In your backend, edit `backend/config/middlewares.ts`:

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
      origin: [
        'http://localhost:5173',
        'http://localhost:4173',
        'https://your-vercel-domain.vercel.app', // ADD YOUR VERCEL URL
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
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

### Step 5: Set Strapi API Permissions

1. Login to deployed Strapi admin panel: `https://your-strapi-url.com/admin`
2. Go to **Settings** → **Roles** → **Public**
3. Enable these permissions:
   - ✅ Home → find
   - ✅ About → find  
   - ✅ Contact → find
4. Click **Save**

## 🧪 Testing

After deployment, check:
1. Frontend loads without "Loading hero content..." error
2. Hero slides appear
3. Products section loads
4. Features section loads
5. FAQ section loads
6. Contact page loads

## 🔧 Local Development

For local development, you can still use `http://localhost:1337`:

```bash
# In .env file
VITE_STRAPI_URL=http://localhost:1337
```

## 📝 Quick Checklist

- [ ] Strapi backend deployed (Railway/Render/Heroku)
- [ ] `VITE_STRAPI_URL` added to Vercel environment variables
- [ ] Frontend redeployed
- [ ] CORS configured in Strapi
- [ ] API permissions enabled in Strapi admin
- [ ] Website tested and working

## ❓ Still Having Issues?

Check browser console (F12) for errors:
- CORS errors → Check Step 4
- 404 errors → Check Strapi URL is correct
- 403 errors → Check Step 5 (API permissions)
