# 🚀 Complete Deployment Guide - EV Website

## 📋 Current Situation

**Problem:** Your frontend (Vercel) is deployed but can't connect to Strapi backend because it's trying to reach `localhost:1337` which doesn't exist in production.

**Your Setup:**
- ✅ Frontend: React + Vite (deployed on Vercel)
- ✅ Backend: Strapi CMS (needs to be deployed)
- ✅ Database: SQLite (currently local, needs production setup)

---

## 🎯 Complete Deployment Steps

### PART 1: Deploy Strapi Backend (Choose One Platform)

---

## 🚂 Option A: Railway.app (RECOMMENDED - Easiest)

### Step 1: Prepare Backend for Deployment

1. **Generate Secret Keys** (run in terminal):
```bash
node -e "console.log('APP_KEYS=' + require('crypto').randomBytes(16).toString('base64') + ',' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('API_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('ADMIN_JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('TRANSFER_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('ENCRYPTION_KEY=' + require('crypto').randomBytes(16).toString('base64'))"
```

**Save these values!** You'll need them for environment variables.

### Step 2: Push Backend to GitHub

If your backend isn't in a separate repo:
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
# Create a new repo on GitHub called "ev-website-backend"
git remote add origin https://github.com/YOUR_USERNAME/ev-website-backend.git
git push -u origin main
```

### Step 3: Deploy to Railway

1. **Go to [Railway.app](https://railway.app)**
2. Click **"Login"** → Sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your backend repository
6. Railway will automatically detect Strapi

### Step 4: Add Environment Variables in Railway

Click on your deployed service → **Variables** tab → Add these:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=3000

# Paste the values you generated in Step 1
APP_KEYS=your-generated-key1,your-generated-key2
API_TOKEN_SALT=your-generated-salt
ADMIN_JWT_SECRET=your-generated-secret
TRANSFER_TOKEN_SALT=your-generated-salt
JWT_SECRET=your-generated-secret
ENCRYPTION_KEY=your-generated-key

# Database (use SQLite for simplicity)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### Step 5: Get Your Railway URL

After deployment completes:
- Click **"Settings"** → **"Networking"**
- Copy your public URL (e.g., `https://your-app.up.railway.app`)
- **Test it**: Go to `https://your-app.up.railway.app/admin`
- Create your admin account

### Step 6: Upload Your Data to Railway

Your local Strapi has data. To upload it:

**Option 1: Manual Data Entry**
- Go to your Railway Strapi admin panel
- Manually enter your home page content, products, etc.

**Option 2: Copy Database File** (if using SQLite)
```bash
# 1. Download Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Link to your project
cd backend
railway link

# 4. Copy local database to Railway
railway run --service backend cp .tmp/data.db /app/.tmp/data.db
```

---

## 🎨 Option B: Render.com (Alternative)

### Step 1: Prepare Backend

Same as Railway Step 1 (generate secrets)

### Step 2: Deploy to Render

1. **Go to [Render.com](https://render.com)**
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub backend repo
4. Configure:
   - **Name**: `ev-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: Free

### Step 3: Add Environment Variables

In Render dashboard → **Environment** tab:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=10000

# Paste your generated secrets
APP_KEYS=your-generated-keys
API_TOKEN_SALT=your-generated-salt
ADMIN_JWT_SECRET=your-generated-secret
TRANSFER_TOKEN_SALT=your-generated-salt
JWT_SECRET=your-generated-secret
ENCRYPTION_KEY=your-generated-key

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### Step 4: Get Your Render URL

- After deployment: Copy your URL (e.g., `https://ev-backend.onrender.com`)
- **Note**: Render free tier sleeps after inactivity (slow first load)

---

## 🔗 PART 2: Connect Frontend to Backend

### Step 1: Update Strapi CORS Settings

In your `backend/config/middlewares.ts`, update to allow your Vercel domain:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'https:',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'https:',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://your-vercel-domain.vercel.app', // ⚠️ UPDATE THIS
        'https://*.vercel.app', // Allow all Vercel preview deployments
      ],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

**Commit and push this change** so it deploys to Railway/Render.

### Step 2: Add Environment Variable in Vercel

1. **Go to [Vercel Dashboard](https://vercel.com)**
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**

Add this variable:

```
Name: VITE_STRAPI_URL
Value: https://your-railway-or-render-url.com
```

**Important:** 
- ✅ Correct: `https://your-app.up.railway.app`
- ❌ Wrong: `https://your-app.up.railway.app/` (no trailing slash)

5. Click **"Save"**

### Step 3: Redeploy Frontend

**Option 1: Automatic (recommended)**
```bash
git add .
git commit -m "Update backend URL"
git push
```
Vercel will auto-deploy.

**Option 2: Manual**
- In Vercel dashboard → **Deployments** → click **"Redeploy"**

---

## ✅ Verification Checklist

### Test Backend

1. **Visit**: `https://your-backend-url.com/admin`
   - ✅ Should show Strapi login page
   
2. **Test API**: `https://your-backend-url.com/api/home?populate=*`
   - ✅ Should return JSON data

3. **Check CORS**: 
   - Open your deployed frontend
   - Open browser console (F12)
   - ❌ If you see CORS errors → Update `middlewares.ts`
   - ✅ No CORS errors → Good to go!

### Test Frontend

1. **Visit your Vercel URL**
2. **Open Console** (F12)
3. **Check for errors**:
   - ❌ `ERR_CONNECTION_REFUSED` → Backend not deployed
   - ❌ `CORS error` → Update middlewares.ts
   - ❌ `404 errors` → Check API endpoints
   - ✅ No errors → Success!

4. **Verify data loads**:
   - Hero section shows
   - Products display
   - FAQ loads
   - Gallery images appear

---

## 🔧 Environment Variables Reference

### Frontend (.env) - For Local Development

Create `.env` in project root:

```env
VITE_STRAPI_URL=http://localhost:1337
# Or use production backend while developing:
# VITE_STRAPI_URL=https://your-backend-url.com
```

### Frontend (Vercel) - For Production

In Vercel dashboard:
```
VITE_STRAPI_URL=https://your-backend-url.com
```

### Backend (.env) - For Local Development

Already exists in `backend/.env`:
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-local-keys
API_TOKEN_SALT=your-local-salt
ADMIN_JWT_SECRET=your-local-secret
TRANSFER_TOKEN_SALT=your-local-salt
JWT_SECRET=your-local-secret
ENCRYPTION_KEY=your-local-key
```

### Backend (Railway/Render) - For Production

Set in platform dashboard (see above sections)

---

## 🚨 Common Issues & Solutions

### Issue 1: "Loading hero content..." Forever

**Cause**: Frontend can't reach backend

**Solution**:
1. Check Vercel environment variable is set correctly
2. Test backend URL in browser
3. Check browser console for specific error

### Issue 2: CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Update `backend/config/middlewares.ts` with your Vercel domain
2. Redeploy backend (git push or manual redeploy)
3. Clear browser cache and refresh

### Issue 3: 404 API Errors

**Error**: `Cannot GET /api/home`

**Solution**:
1. Ensure Strapi has published content
2. In Strapi admin → Content Manager → Make sure content is published (not draft)
3. Check API permissions: Settings → Users & Permissions → Public → Enable find/findOne

### Issue 4: Images Not Loading

**Cause**: Image URLs pointing to localhost

**Solution**:
1. Re-upload images in production Strapi
2. Or use external image hosting (Cloudinary, AWS S3)

### Issue 5: Backend Sleeps (Render Free Tier)

**Symptom**: First load is very slow (30+ seconds)

**Solution**:
1. Upgrade to paid tier ($7/month)
2. Or use Railway (doesn't sleep)
3. Or implement a ping service to keep it awake

### Issue 6: Database Resets

**Symptom**: Data disappears after backend redeploy

**Solution**:
1. Switch from SQLite to PostgreSQL:
   - Railway: Add PostgreSQL plugin
   - Update `backend/config/database.ts` to use `DATABASE_URL`
2. Or backup SQLite file regularly

---

## 📊 Cost Breakdown

### Free Tier (Total: $0/month)

- **Frontend**: Vercel (Free)
  - ✅ Unlimited bandwidth
  - ✅ Auto SSL
  - ✅ Edge network

- **Backend**: Railway (Free)
  - ✅ 512 MB RAM
  - ✅ $5 free credit/month
  - ✅ No sleep
  
  **OR** Render (Free)
  - ✅ 512 MB RAM
  - ❌ Sleeps after 15 min inactivity

- **Database**: SQLite (Free)
  - ⚠️ Data may not persist between deployments

### Production Ready ($12-15/month)

- **Frontend**: Vercel Pro ($20/month) - Optional
- **Backend**: Railway ($5-10/month) or Render ($7/month)
- **Database**: PostgreSQL (Free on Railway/Render)

---

## 🎯 Quick Start Commands

### Generate all secrets at once:
```bash
cat << 'EOF' > backend/.env.production
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
APP_KEYS=$(node -p "require('crypto').randomBytes(16).toString('base64') + ',' + require('crypto').randomBytes(16).toString('base64')")
API_TOKEN_SALT=$(node -p "require('crypto').randomBytes(16).toString('base64')")
ADMIN_JWT_SECRET=$(node -p "require('crypto').randomBytes(16).toString('base64')")
TRANSFER_TOKEN_SALT=$(node -p "require('crypto').randomBytes(16).toString('base64')")
JWT_SECRET=$(node -p "require('crypto').randomBytes(16).toString('base64')")
ENCRYPTION_KEY=$(node -p "require('crypto').randomBytes(16).toString('base64')")
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
EOF

cat backend/.env.production
```

Copy these values to Railway/Render.

---

## 📞 Need Help?

If you're still stuck:

1. **Check Logs**:
   - Railway: Click service → Logs tab
   - Render: Build & Deploy → View logs
   - Vercel: Deployments → Click deployment → View function logs

2. **Test Each Part**:
   - Backend API directly in browser
   - Frontend console errors
   - Network tab in browser DevTools

3. **Verify Setup**:
   - ✅ Backend deployed and accessible
   - ✅ Environment variable set in Vercel
   - ✅ CORS configured correctly
   - ✅ Content published in Strapi
   - ✅ API permissions enabled

---

## 🎉 Success!

Once everything is deployed:

- **Frontend**: `https://your-site.vercel.app`
- **Backend**: `https://your-backend.railway.app`
- **Admin Panel**: `https://your-backend.railway.app/admin`

Your site should now work perfectly in production! 🚀
