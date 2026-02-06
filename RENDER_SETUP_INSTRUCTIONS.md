# 🎯 Render Backend Setup - Step by Step

Your Render URL: **https://ev-panel-1.onrender.com**

## ✅ Step 1: Check Your Render Backend

1. Go to: https://ev-panel-1.onrender.com/admin
2. If it loads → ✅ Backend is running!
3. If it shows error → Render is still deploying (wait 2-3 minutes)

## ✅ Step 2: Create Admin Account

1. Visit: https://ev-panel-1.onrender.com/admin
2. **First time only**: Create your admin account
   - Name: Your Name
   - Email: your-email@example.com
   - Password: (choose a strong password)
3. Click "Let's Start"

## ✅ Step 3: Add Your Content

Since Render has a fresh database, you need to add content:

### Add Home Page Content:

1. In Strapi admin, click **"Content Manager"** (left sidebar)
2. Click **"Home"** under "Single Types"
3. Click **"Create new entry"** or edit existing
4. Add:
   - Hero Slides (images and text)
   - Products
   - Gallery Images
   - Features
   - FAQs
5. **IMPORTANT**: Click **"Publish"** (top right, not just "Save")

## ✅ Step 4: Enable Public API Access

Your content needs to be publicly accessible:

1. Click **"Settings"** (bottom left)
2. Click **"Users & Permissions"** → **"Roles"**
3. Click **"Public"**
4. **Expand each section** and check these boxes:

**For Home:**
- ✅ find
- ✅ findOne

**For Contact:**
- ✅ find
- ✅ create (for contact form submissions)

**For About:**
- ✅ find
- ✅ findOne

**For Any other content types** (products, articles, etc.):
- ✅ find
- ✅ findOne

5. Scroll to top and click **"Save"**

## ✅ Step 5: Test Backend API

Open these URLs in your browser:

1. **Test Home API**: https://ev-panel-1.onrender.com/api/home?populate=*
   - ✅ Should show JSON data
   - ❌ Empty or error? → Content not published or permissions not set

2. **Test Contact API**: https://ev-panel-1.onrender.com/api/contact?populate=*
   - ✅ Should show JSON data

## ✅ Step 6: Update CORS (Allow Vercel)

**Important**: Render needs to allow requests from your Vercel domain.

### If you can access Render Shell:

1. Go to Render Dashboard → Your Service → **"Shell"** tab
2. Paste this command:

\`\`\`bash
cat > config/middlewares.ts << 'EOF'
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
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:5173', 'https://*.vercel.app'],
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
EOF
\`\`\`

3. Click **"Manual Deploy"** → **"Clear build cache & deploy"**

### If you deployed from GitHub:

Update the file in your GitHub repo and Render will auto-deploy.

---

## ✅ Step 7: Configure Vercel Frontend

Now connect your Vercel frontend to Render backend:

1. **Go to**: https://vercel.com/dashboard
2. **Click your project**
3. **Settings** → **Environment Variables**
4. **Add New**:
   - Name: `VITE_STRAPI_URL`
   - Value: `https://ev-panel-1.onrender.com`
   - ⚠️ **NO trailing slash!**
5. Click **"Save"**

---

## ✅ Step 8: Redeploy Vercel

### Option A: Push to GitHub (if connected)
\`\`\`bash
git commit --allow-empty -m "Trigger redeploy"
git push
\`\`\`

### Option B: Manual Redeploy
1. Go to Vercel → **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**

---

## ✅ Step 9: Test Your Live Site!

1. **Visit your Vercel URL**
2. **Open browser console** (F12)
3. **Look for**:
   - ✅ No errors → SUCCESS! 🎉
   - ❌ CORS errors → Go back to Step 6
   - ❌ 404 errors → Content not published (Step 3)
   - ❌ Connection refused → Backend sleeping (visit admin panel to wake it)

---

## 🚨 Important: Render Free Tier

⚠️ **Render free tier sleeps after 15 minutes of inactivity**

- First visit will be SLOW (30-60 seconds)
- To wake it up: Visit https://ev-panel-1.onrender.com/admin
- Consider upgrading to paid tier ($7/month) for instant response

---

## ✅ Quick Verification Checklist

- [ ] Backend accessible: https://ev-panel-1.onrender.com/admin
- [ ] Admin account created
- [ ] Content added and **PUBLISHED**
- [ ] API permissions enabled (Public role)
- [ ] API returns data: https://ev-panel-1.onrender.com/api/home?populate=*
- [ ] CORS configured for Vercel
- [ ] Environment variable added in Vercel
- [ ] Frontend redeployed
- [ ] Site loads without errors

---

## 💡 Pro Tips

1. **Keep Render awake**: Use a service like cron-job.org to ping your backend every 10 minutes
2. **Backup data**: Export content regularly (Settings → Transfer Tokens)
3. **Monitor**: Check Render logs if something breaks (Dashboard → Logs tab)

---

## 🆘 Still Having Issues?

Tell me:
1. What's your Vercel URL?
2. What error do you see in browser console?
3. Does https://ev-panel-1.onrender.com/admin load?

I'll help you fix it! 🚀
