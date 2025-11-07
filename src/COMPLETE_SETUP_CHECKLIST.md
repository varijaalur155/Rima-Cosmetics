# Complete Setup Checklist for Rima Cosmetics

This is your master checklist for setting up the complete e-commerce platform. Follow these steps in order.

---

## ✅ Phase 1: Supabase Setup (10-15 minutes)

### 1.1 Create Supabase Project
- [ ] Go to [supabase.com](https://supabase.com) and sign up/login
- [ ] Create new project named "Rima Cosmetics"
- [ ] Set region to `ap-south-1` (Mumbai)
- [ ] Create and **SAVE** database password
- [ ] Wait for project initialization (2-3 minutes)

### 1.2 Get Credentials
- [ ] Go to Settings → API
- [ ] Copy **Project URL**: `https://xxxxx.supabase.co`
- [ ] Copy **Anon Key** (public key)
- [ ] Copy **Service Role Key** (secret key)
- [ ] Extract **Project ID** from URL (the `xxxxx` part)

### 1.3 Create Database Table
- [ ] Go to SQL Editor
- [ ] Create new query
- [ ] Paste SQL from `DATABASE_QUICK_SETUP.md` (Step 4)
- [ ] Click Run
- [ ] Verify table `kv_store_35cd97c6` exists in Table Editor

---

## ✅ Phase 2: Code Configuration (5 minutes)

### 2.1 Update Frontend Configuration
- [ ] Open `/utils/supabase/info.tsx`
- [ ] Replace `projectId` with your actual project ID
- [ ] Replace `publicAnonKey` with your actual anon key
- [ ] Save file

### 2.2 Configure Edge Functions (Optional - for full backend)
- [ ] Install Supabase CLI: `npm install -g supabase`
- [ ] Login: `supabase login`
- [ ] Link project: `supabase link --project-ref YOUR-PROJECT-ID`
- [ ] Set secrets in Supabase Dashboard → Edge Functions → Secrets:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Deploy: `supabase functions deploy make-server-35cd97c6`

---

## ✅ Phase 3: Admin Account Setup (3 minutes)

### 3.1 Create Admin User
**Choose ONE method:**

**Method A: Supabase Dashboard (Recommended)**
- [ ] Go to Authentication → Users
- [ ] Click "Add user" → "Create new user"
- [ ] Email: `admin@rimacosmetics.com`
- [ ] Password: `admin123`
- [ ] **IMPORTANT**: Check "Auto Confirm User" ✅
- [ ] Click "Create user"

**Method B: SQL Editor**
- [ ] Run SQL from `DATABASE_QUICK_SETUP.md` (Step 5)

### 3.2 Verify Admin Access
- [ ] Start app: `npm run dev`
- [ ] Go to Login page
- [ ] Login with:
  - Email: admin@rimacosmetics.com
  - Password: admin123
- [ ] Verify you see Admin Dashboard

---

## ✅ Phase 4: Seed Products (5 minutes)

### Option A: Use SQL Seed Script (Fast)
- [ ] Go to Supabase → SQL Editor
- [ ] Create new query
- [ ] Copy SQL from `/supabase/functions/server/seed-products.ts`
- [ ] Run the query
- [ ] Verify products in Table Editor

### Option B: Use Admin Dashboard (Manual)
- [ ] Login as admin
- [ ] Click "Add Product" for each product
- [ ] Fill in details from `/data/products.ts`

### 4.1 Verify Products
- [ ] Go to Products page on frontend
- [ ] Verify all 22 products are displayed
- [ ] Check that images load correctly

---

## ✅ Phase 5: Test Core Features (10 minutes)

### 5.1 Customer Flow
- [ ] Browse products page
- [ ] Filter by category
- [ ] Add product to cart
- [ ] View cart
- [ ] Update quantities in cart
- [ ] Proceed to checkout
- [ ] Fill shipping information
- [ ] Place order (test)
- [ ] Verify order success page shows
- [ ] Check order tracking on "My Orders" page

### 5.2 Admin Flow
- [ ] Login as admin
- [ ] View dashboard statistics
- [ ] Create a new product
- [ ] Edit existing product
- [ ] Delete test product
- [ ] View all orders
- [ ] Update order status
- [ ] Verify customer sees updated status

### 5.3 WhatsApp Integration
- [ ] Click WhatsApp button (bottom right)
- [ ] Verify it opens WhatsApp with pre-filled message
- [ ] Verify phone number is correct: `918939996640`

---

## ✅ Phase 6: Customization (Optional)

### 6.1 Update Business Information
- [ ] Update phone number in `/components/WhatsAppButton.tsx`
- [ ] Update business name/logo if needed
- [ ] Update About Us page content
- [ ] Update Contact page information

### 6.2 Product Customization
- [ ] Replace product images if you have actual product photos
- [ ] Update product descriptions
- [ ] Adjust prices
- [ ] Update stock status

### 6.3 Styling Adjustments
- [ ] Customize colors in `/styles/globals.css` if desired
- [ ] Adjust hero images on home page
- [ ] Update banner content

---

## ✅ Phase 7: Deployment (15-20 minutes)

### 7.1 Deploy Edge Functions
- [ ] Verify all environment variables are set in Supabase
- [ ] Deploy: `supabase functions deploy make-server-35cd97c6`
- [ ] Test endpoints using Supabase function URL

### 7.2 Deploy Frontend
**Choose your platform:**

**Vercel (Recommended)**
- [ ] Push code to GitHub
- [ ] Connect GitHub repo to Vercel
- [ ] Deploy
- [ ] Add environment variables (if any)
- [ ] Verify deployment

**Netlify**
- [ ] Push code to GitHub
- [ ] Connect GitHub repo to Netlify
- [ ] Configure build settings
- [ ] Deploy

### 7.3 Post-Deployment Testing
- [ ] Test production URL
- [ ] Verify all pages load
- [ ] Test complete purchase flow
- [ ] Test admin dashboard
- [ ] Test on mobile devices

---

## ✅ Phase 8: Production Checklist

### 8.1 Security
- [ ] Verify service role key is NOT exposed in frontend code
- [ ] Check Row Level Security policies are enabled
- [ ] Ensure admin endpoints require authentication
- [ ] Review CORS settings

### 8.2 Performance
- [ ] Test page load times
- [ ] Verify images are optimized
- [ ] Check mobile responsiveness
- [ ] Test with slow network connection

### 8.3 User Experience
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Verify WhatsApp integration works
- [ ] Check email confirmation (if email provider configured)

---

## 🎯 Feature Checklist

### Core Features Implemented ✅
- [x] Product catalog with images
- [x] Shopping cart functionality
- [x] Order placement
- [x] Order tracking with visual timeline
- [x] WhatsApp button with icon
- [x] WhatsApp Pay integration
- [x] Admin dashboard
- [x] Product management (CRUD)
- [x] Order management
- [x] User authentication
- [x] Mobile responsive design
- [x] Category filtering
- [x] Estimated delivery dates

### What's Included
- **22 Products** with relevant images
- **4 Categories**: Hair Care, Skin Care, Soap, Lip Care
- **Order Statuses**: Pending, Confirmed, Shipped, Delivered
- **Admin Features**: Full product and order management
- **Customer Features**: Browse, cart, checkout, track orders

---

## 📋 Quick Reference

### Admin Login
- Email: admin@rimacosmetics.com
- Password: admin123

### Database Table
- Name: `kv_store_35cd97c6`
- Structure: Key-value pairs stored as JSONB

### API Endpoints
- Products: `GET /make-server-35cd97c6/products`
- Orders: `GET/POST /make-server-35cd97c6/orders`
- Admin Orders: `GET /make-server-35cd97c6/admin/orders`
- Admin Products: `POST/PUT/DELETE /make-server-35cd97c6/admin/products`

### Product Categories
- `hair-care`: Hair Oil, Shampoos, Conditioners
- `skin-care`: Face Wash, Body Wash, Creams, Gels
- `soap`: All soap varieties
- `lip-care`: Lipstick, Lip Balm

---

## 🚨 Common Issues & Solutions

### Issue: Can't login as admin
**Solution:**
1. Go to Supabase → Authentication → Users
2. Find admin user
3. Ensure "Email Confirmed" is ON
4. Reset password if needed

### Issue: Products not loading
**Solution:**
1. Check browser console for errors
2. Verify `/utils/supabase/info.tsx` has correct credentials
3. Ensure database is seeded with products
4. Check if Edge Functions are deployed

### Issue: Orders not saving
**Solution:**
1. Verify user is logged in
2. Check Edge Function logs in Supabase
3. Ensure KV store table exists
4. Verify authentication token is being sent

### Issue: WhatsApp button not working
**Solution:**
1. Check phone number format in component
2. Ensure it starts with country code (91 for India)
3. Test on mobile device (works better than desktop)

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com

---

## 🎉 You're Done!

Congratulations! Your Rima Cosmetics e-commerce platform is fully set up and ready to use.

### Next Steps:
1. Add your actual product catalog
2. Configure email notifications (optional)
3. Set up payment gateway (future enhancement)
4. Monitor orders and manage inventory
5. Promote your website!

---

**Last Updated**: November 4, 2025
**Version**: 11
