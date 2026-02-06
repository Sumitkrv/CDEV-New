# 🚀 Quick Deployment Steps - TL;DR

## The Problem
Frontend deployed on Vercel → Can't connect to backend → Shows "Loading..." forever
Error: `localhost:1337` connection refused

## The Solution (3 Steps)

### 1️⃣ Deploy Backend (Railway - 5 minutes)

1. **Generate secrets** (copy the output):
```bash
node -e "console.log('APP_KEYS=' + require('crypto').randomBytes(16).toString('base64') + ',' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('API_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('ADMIN_JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('TRANSFER_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('ENCRYPTION_KEY=' + require('crypto').randomBytes(16).toString('base64'))"
```

2. **Deploy to Railway**:
   - Go to https://railway.app
   - New Project → Deploy from GitHub
   - Select your backend folder
   - Add environment variables (paste secrets from step 1):
     ```
     NODE_ENV=production
     HOST=0.0.0.0
     PORT=3000
     APP_KEYS=<your-generated-keys>
     API_TOKEN_SALT=<your-generated-salt>
     ADMIN_JWT_SECRET=<your-generated-secret>
     TRANSFER_TOKEN_SALT=<your-generated-salt>
     JWT_SECRET=<your-generated-secret>
     ENCRYPTION_KEY=<your-generated-key>
     DATABASE_CLIENT=sqlite
     DATABASE_FILENAME=.tmp/data.db
     ```
   - Copy your Railway URL: `https://xxxxx.up.railway.app`

3. **Setup admin & content**:
   - Visit: `https://xxxxx.up.railway.app/admin`
   - Create admin account
   - Add your content (home page, products, etc.)

### 2️⃣ Configure Vercel (2 minutes)

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   ```
   VITE_STRAPI_URL = https://xxxxx.up.railway.app
   ```
   (Replace with your Railway URL, NO trailing slash)
4. Save

### 3️⃣ Redeploy (30 seconds)

**Option A**: Git push
```bash
git add .
git commit -m "Connect to production backend"
git push
```

**Option B**: Manual
- Vercel Dashboard → Deployments → Redeploy

## ✅ Verify It Works

1. Visit your Vercel URL
2. Open browser console (F12)
3. Should see NO errors
4. Content should load

## 🚨 Still Not Working?

### Check 1: Backend is accessible
Visit: `https://your-backend.railway.app/api/home?populate=*`
- ✅ Should return JSON
- ❌ Error? Backend not deployed correctly

### Check 2: Environment variable is set
In Vercel → Settings → Environment Variables
- ✅ `VITE_STRAPI_URL` exists
- ❌ Missing? Add it and redeploy

### Check 3: CORS errors in console
- Update `backend/config/middlewares.ts` (already done ✅)
- Push changes to GitHub
- Railway will auto-redeploy

### Check 4: Content is published
In Strapi admin:
- Content Manager → Home → Click entry → "Publish"
- Settings → Users & Permissions → Public → Enable "find" & "findOne"

## 📱 Where Everything Lives

- **Frontend**: https://your-site.vercel.app
- **Backend API**: https://your-backend.railway.app
- **Admin Panel**: https://your-backend.railway.app/admin

## 💰 Cost

**FREE** (Railway gives $5/month credit)

## ⏱️ Total Time

5-10 minutes if you follow the steps

---

**Need detailed guide?** See [COMPLETE_DEPLOYMENT_GUIDE.md](COMPLETE_DEPLOYMENT_GUIDE.md)
