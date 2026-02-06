VITE_STRAPI_URL=http://localhost:1337# 🏠 HOME PAGE STRAPI SETUP GUIDE

## ✅ Backend Setup Complete!

Your Strapi backend now has a **Home Page** content type with:
- Hero Slides (carousel images)
- Products (EV scooter showcase)  
- Gallery Images (product photos)
- Features (USP benefits)
- FAQs (frequently asked questions)

---

## 🔐 STEP 0: Set API Permissions (IMPORTANT!)

### 1. Go to Strapi Admin → http://localhost:1337/admin

### 2. Navigate to **Settings** (gear icon bottom left)

### 3. Click **Roles** under "USERS & PERMISSIONS PLUGIN"

### 4. Click **Public** role

### 5. Scroll down to **Home** section

### 6. Check ☑️ **find** permission

### 7. Click **Save** (top right)

---

## 📋 STEP 1: Add Content in Strapi Admin

### 1. Go to **"Home Page"** in left sidebar (under SINGLE TYPES)

---

## 🎨 HERO SLIDES SECTION

Click **"+ Add an entry"** under **Hero Slides** (Add 6 slides)

### Slide 1:
- **Title**: `Blue Elegance`
- **Subtitle**: `Premium Electric Scooter`
- **Specs**: `["150+ km range", "0-60 in 3.2s", "Fast charging"]`
- **Image**: Upload `/images/blue scooty.jpg`

### Slide 2:
- **Title**: `Urban Rider`
- **Subtitle**: `City Commuting Redefined`
- **Specs**: `["Smart connectivity", "200+ km range", "LED lighting"]`
- **Image**: Upload `/images/CD ev 1.jpg`

### Slide 3:
- **Title**: `Sport Edition`
- **Subtitle**: `Performance Meets Style`
- **Specs**: `["High-speed mode", "Carbon accents", "Sport suspension"]`
- **Image**: Upload your image

### Slide 4:
- **Title**: `Classic Design`
- **Subtitle**: `Timeless Electric Mobility`
- **Specs**: `["Retro styling", "180+ km range", "Comfort seating"]`
- **Image**: Upload your image

### Slide 5:
- **Title**: `Advanced Model`
- **Subtitle**: `Next-Gen Technology`
- **Specs**: `["AI assistance", "250+ km range", "Wireless charging"]`
- **Image**: Upload your image

### Slide 6:
- **Title**: `Future Vision`
- **Subtitle**: `Tomorrow's Ride Today`
- **Specs**: `["Autonomous features", "300+ km range", "Solar charging"]`
- **Image**: Upload your image

---

## 🛵 PRODUCTS SECTION

Click **"+ Add an entry"** under **Products** (Add 3 products)

### Product 1: Eco Rider
- **Name**: `Eco Rider`
- **Tagline**: `Urban Efficiency`
- **Price**: `₹79,999`
- **Range**: `80 km`
- **Acceleration**: `4.5s`
- **Top Speed**: `55 km/h`
- **Slug**: `eco-rider`
- **Gradient**: `from-blue-500/20 to-cyan-500/20`
- **Image**: Upload `/images/CD_EV15533.jpg`

### Product 2: City Pro
- **Name**: `City Pro`
- **Tagline**: `Premium Performance`
- **Price**: `₹99,999`
- **Range**: `120 km`
- **Acceleration**: `3.8s`
- **Top Speed**: `65 km/h`
- **Slug**: `city-pro`
- **Gradient**: `from-purple-500/20 to-pink-500/20`
- **Image**: Upload `/images/CD_EV15750.jpg`

### Product 3: Velocity X
- **Name**: `Velocity X`
- **Tagline**: `Ultimate Power`
- **Price**: `₹1,29,999`
- **Range**: `150 km`
- **Acceleration**: `3.2s`
- **Top Speed**: `75 km/h`
- **Slug**: `velocity-x`
- **Gradient**: `from-orange-500/20 to-red-500/20`
- **Image**: Upload `/images/CD_EV15868.jpg`

---

## 🖼️ GALLERY IMAGES SECTION

Click **"+ Add an entry"** under **Gallery Images** (Add 3 images)

### Gallery Image 1:
- **Title**: `Aerodynamic Excellence`
- **Category**: `Design`
- **Color**: `from-blue-500/20 to-cyan-500/20`
- **Image**: Upload `/images/CD_EV15783.jpg`

### Gallery Image 2:
- **Title**: `Intelligent Dashboard`
- **Category**: `Technology`
- **Color**: `from-purple-500/20 to-pink-500/20`
- **Image**: Upload `/images/CD_EV15757.jpg`

### Gallery Image 3:
- **Title**: `Dynamic Performance`
- **Category**: `Power`
- **Color**: `from-orange-500/20 to-red-500/20`
- **Image**: Upload `/images/CD_EV15705.jpg`

---

## ⚡ FEATURES (USP) SECTION

Click **"+ Add an entry"** under **Features** (Add 6 features)

### Feature 1:
- **Title**: `Saves Your Money`
- **Description**: `No petrol expenses and low service costs. Charging is much cheaper than daily fuel refills.`
- **Stat**: `₹0.5/km`
- **Gradient**: `from-emerald-500/20 to-teal-500/20`

### Feature 2:
- **Title**: `Smooth & Quiet Ride`
- **Description**: `No engine noise or vibration while riding. Enjoy a calm and comfortable city commute.`
- **Stat**: `30 dB`
- **Gradient**: `from-blue-500/20 to-cyan-500/20`

### Feature 3:
- **Title**: `Easy to Maintain`
- **Description**: `Fewer moving parts mean fewer breakdowns. Less servicing, more peace of mind.`
- **Stat**: `Low Cost`
- **Gradient**: `from-purple-500/20 to-pink-500/20`

### Feature 4:
- **Title**: `Eco-Friendly`
- **Description**: `Zero emissions help reduce air pollution. A small choice that makes a big difference.`
- **Stat**: `0 Emission`
- **Gradient**: `from-orange-500/20 to-red-500/20`

### Feature 5:
- **Title**: `Perfect for Daily City Use`
- **Description**: `Ideal for office, college, and short trips. Easy to handle, easy to park anywhere.`
- **Stat**: `City Ready`
- **Gradient**: `from-indigo-500/20 to-violet-500/20`

### Feature 6:
- **Title**: `Simple Charging`
- **Description**: `Charge at home or work without hassle. No fuel queues, no waiting time.`
- **Stat**: `Home Charge`
- **Gradient**: `from-rose-500/20 to-pink-500/20`

---

## ❓ FAQs SECTION

Click **"+ Add an entry"** under **FAQs** (Add 10 FAQs)

### FAQ 1:
- **Question**: `What is the range of the electric scooter on a full charge?`
- **Answer**: `Our electric scooters offer a range of up to 120 km on a single charge, depending on the model and riding conditions. The actual range may vary based on factors like riding style, terrain, payload, and weather conditions.`

### FAQ 2:
- **Question**: `How long does it take to charge the battery?`
- **Answer**: `Charging time varies by method: Standard home charging (5A socket) takes 4-6 hours, fast charging at our stations takes 1-2 hours, and battery swapping takes just 2 minutes for instant power.`

### FAQ 3:
- **Question**: `What subsidies are available for purchasing an EV?`
- **Answer**: `You can avail up to ₹15,000 under the FAME II scheme from the central government, plus additional state subsidies up to ₹10,000 depending on your location. We also offer exchange bonuses and corporate discounts.`

### FAQ 4:
- **Question**: `What is the warranty on the battery?`
- **Answer**: `We provide a comprehensive 3-year warranty on the battery covering manufacturing defects. The battery is designed to retain 70% capacity after 50,000 km or 3 years, whichever comes first.`

### FAQ 5:
- **Question**: `How much can I save compared to a petrol scooter?`
- **Answer**: `You can save up to 80% on fuel costs with our electric scooters. The running cost is approximately ₹0.50 per km compared to ₹2-3 per km for petrol scooters. Over 3 years, you can save over ₹80,000 in fuel costs alone.`

### FAQ 6:
- **Question**: `Where can I charge my electric scooter?`
- **Answer**: `You can charge at home using a regular 5A socket, at our 500+ fast charging stations across 50+ cities, or use battery swapping facilities available at select locations. Our mobile app helps you find the nearest charging point.`

### FAQ 7:
- **Question**: `What is the top speed of the scooter?`
- **Answer**: `Our scooters have a top speed of 60-75 km/h depending on the model, which is perfect for city commuting and complies with Indian traffic regulations.`

### FAQ 8:
- **Question**: `Is maintenance expensive for electric scooters?`
- **Answer**: `No, electric scooters have significantly lower maintenance costs compared to petrol vehicles. There's no engine oil, spark plugs, or complex transmission systems. Regular maintenance includes brake checks, tire rotation, and software updates.`

### FAQ 9:
- **Question**: `Can I test ride before purchasing?`
- **Answer**: `Absolutely! We offer free test rides at all our dealerships. You can book a test ride through our website, mobile app, or by visiting the nearest showroom.`

### FAQ 10:
- **Question**: `What financing options are available?`
- **Answer**: `We offer flexible EMI plans starting from 6 months up to 48 months with interest rates as low as 7% p.a. We've partnered with leading banks and NBFCs to provide hassle-free financing with minimal documentation.`

---

## 💾 SAVE & PUBLISH

After adding all content:
1. Click **"Save"** button (top right)
2. Click **"Publish"** button

---

## 🎯 Next Step

I'll now update your React components to fetch data from Strapi!
