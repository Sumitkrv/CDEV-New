# 📞 CONTACT PAGE STRAPI SETUP

## ✅ What's Ready

Your Contact page now fetches content from Strapi CMS including:
- Hero section (title, subtitle, description)
- Contact methods (Email, Phone, Chat with icons)
- Form section (title and description)
- FAQ preview section

---

## 🔐 STEP 1: Set API Permissions

1. Go to **http://localhost:1337/admin**
2. **Settings** → **Roles** → **Public**
3. Scroll to **Contact** section
4. Check ☑️ **find** permission
5. Click **Save**

---

## 📋 STEP 2: Add Content

### Go to "Contact Page" in Strapi Admin

---

### 📌 Hero Section

- **Hero Title**: `Get in Touch`
- **Hero Subtitle**: `We're Here to Help`
- **Hero Description**: `Have questions about our vehicles? Need support? Our team is ready to assist you.`

---

### 📧 Contact Methods

Click **"+ Add an entry"** under **Contact Methods** (Add 3 methods)

#### Method 1: Email
- **Icon**: Select `Mail` from dropdown
- **Title**: `Email Us`
- **Detail**: `support@considerdone.ev`
- **Action**: `Send Email`
- **Href**: `mailto:support@considerdone.ev`

#### Method 2: Phone
- **Icon**: Select `Phone` from dropdown
- **Title**: `Call Us`
- **Detail**: `+1 (800) 555-0100`
- **Action**: `Call Now`
- **Href**: `tel:+18005550100`

#### Method 3: Live Chat
- **Icon**: Select `MessageCircle` from dropdown
- **Title**: `Live Chat`
- **Detail**: `Available 24/7`
- **Action**: `Start Chat`
- **Href**: `#chat`

---

### 📝 Form Section

- **Form Title**: `Send Us a Message`
- **Form Description**: `Fill out the form below and we'll get back to you within 24 hours`

---

### ❓ FAQ Preview Section

- **FAQ Section Title**: `Quick Answers`
- **FAQ Section Description**: `Looking for immediate answers? Check out our FAQ section`

---

## 💾 STEP 3: Save & Publish

Click **Save** then **Publish** (top right)

---

## ✅ Done!

Refresh your Contact page - all content is now managed from Strapi! 🎉
