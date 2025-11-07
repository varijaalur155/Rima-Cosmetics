# Complete Supabase Setup Guide for Rima Cosmetics

This guide will walk you through setting up Supabase for your e-commerce application, connecting the database, and configuring authentication.

## Table of Contents
1. [Creating a Supabase Project](#1-creating-a-supabase-project)
2. [Database Setup](#2-database-setup)
3. [Connecting Your Project](#3-connecting-your-project)
4. [Testing the Connection](#4-testing-the-connection)
5. [Setting Up Admin Account](#5-setting-up-admin-account)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Creating a Supabase Project

### Step 1.1: Sign Up/Login
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign In"
3. Sign in with GitHub, Google, or email

### Step 1.2: Create New Project
1. Click "New Project" button
2. Fill in the project details:
   - **Name**: Rima Cosmetics (or any name you prefer)
   - **Database Password**: Create a strong password (SAVE THIS - you'll need it!)
   - **Region**: Choose the closest region to Chennai (e.g., `ap-south-1` for Mumbai)
   - **Pricing Plan**: Start with the Free tier
3. Click "Create new project"
4. Wait 2-3 minutes for the project to initialize

### Step 1.3: Get Your Project Credentials
Once your project is ready:
1. Go to **Project Settings** (gear icon in the left sidebar)
2. Click on **API** in the settings menu
3. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Project API keys**:
     - `anon` `public` key
     - `service_role` `secret` key

**IMPORTANT**: Copy these values - you'll need them in the next steps!

---

## 2. Database Setup

The application uses a Key-Value store table that's already configured. However, you need to verify it exists.

### Step 2.1: Check the KV Store Table
1. In your Supabase dashboard, click on **Table Editor** (database icon)
2. Look for a table named `kv_store_35cd97c6`
3. If it doesn't exist, create it using the SQL Editor

### Step 2.2: Create KV Store Table (If Needed)
1. Click on **SQL Editor** in the left sidebar
2. Click "New query"
3. Paste the following SQL:

```sql
-- Create the key-value store table
CREATE TABLE IF NOT EXISTS kv_store_35cd97c6 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_kv_store_key ON kv_store_35cd97c6(key);

-- Enable Row Level Security
ALTER TABLE kv_store_35cd97c6 ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access
CREATE POLICY "Service role can do everything" ON kv_store_35cd97c6
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to read
CREATE POLICY "Authenticated users can read" ON kv_store_35cd97c6
  FOR SELECT
  TO authenticated
  USING (true);
```

4. Click "Run" to execute the query
5. You should see "Success. No rows returned" message

### Step 2.3: Verify Table Creation
1. Go back to **Table Editor**
2. You should now see `kv_store_35cd97c6` table
3. The table should have columns: `key`, `value`, `created_at`, `updated_at`

---

## 3. Connecting Your Project

### Step 3.1: Update Supabase Info File
1. Open `/utils/supabase/info.tsx` in your project
2. You'll see placeholder values:

```tsx
export const projectId = 'your-project-id';
export const publicAnonKey = 'your-anon-key';
```

3. Replace with your actual values:
   - **projectId**: Extract from your Project URL
     - If URL is `https://abcdefgh.supabase.co`, then projectId is `abcdefgh`
   - **publicAnonKey**: Copy the `anon` `public` key from Supabase dashboard

**Example:**
```tsx
export const projectId = 'abcdefgh';
export const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### Step 3.2: Configure Environment Variables for Server
The server (Edge Functions) needs access to secure credentials.

1. In Supabase dashboard, go to **Edge Functions** in the left sidebar
2. Click on **Settings** or **Secrets**
3. Add these environment variables:
   - `SUPABASE_URL`: Your full project URL (e.g., `https://abcdefgh.supabase.co`)
   - `SUPABASE_ANON_KEY`: Your `anon` `public` key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your `service_role` `secret` key
   - `SUPABASE_DB_URL`: Your database connection string

**To get the Database URL:**
1. Go to **Project Settings** > **Database**
2. Scroll down to "Connection string"
3. Select "URI" tab
4. Copy the connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
5. Replace `[YOUR-PASSWORD]` with the database password you created earlier

---

## 4. Testing the Connection

### Step 4.1: Deploy Edge Functions
Before testing, you need to deploy the server functions:

1. Install Supabase CLI if you haven't:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref YOUR-PROJECT-ID
```

4. Deploy the Edge Functions:
```bash
supabase functions deploy make-server-35cd97c6
```

### Step 4.2: Test the Application
1. Start your React application:
```bash
npm run dev
```

2. Open your browser and navigate to the app
3. Try these tests:
   - **Browse Products**: Go to the Products page - images should load
   - **Add to Cart**: Add items to cart and check if it persists
   - **Sign Up/Login**: Try logging in (we'll set up admin next)

### Step 4.3: Check Server Logs
If something doesn't work:
1. Go to Supabase dashboard > **Edge Functions**
2. Click on `make-server-35cd97c6`
3. Click on **Logs** tab
4. Look for error messages

---

## 5. Setting Up Admin Account

The admin account allows you to manage products and view orders.

### Step 5.1: Create Admin User
1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query with this SQL:

```sql
-- First, ensure authentication is set up
-- This creates an admin user with email and password

-- You'll need to use the Auth Admin API to create users
-- This is done through the server endpoint

-- For now, let's set up the user data structure
INSERT INTO kv_store_35cd97c6 (key, value)
VALUES (
  'user:admin@rimacosmetics.com',
  jsonb_build_object(
    'email', 'admin@rimacosmetics.com',
    'name', 'Admin',
    'role', 'admin',
    'created_at', NOW()
  )
)
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value,
    updated_at = NOW();
```

3. Click "Run"

### Step 5.2: Create Admin Authentication
To create the actual login credentials, you need to use the signup endpoint:

1. Open your browser's developer console
2. Navigate to your application
3. Run this code in the console (replace the URL with your actual project URL):

```javascript
fetch('https://YOUR-PROJECT-ID.supabase.co/functions/v1/make-server-35cd97c6/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR-ANON-KEY'
  },
  body: JSON.stringify({
    email: 'admin@rimacosmetics.com',
    password: 'admin123',
    name: 'Admin',
    role: 'admin'
  })
})
.then(r => r.json())
.then(console.log);
```

**OR** you can create the admin user through the Supabase Auth UI:

1. Go to **Authentication** > **Users** in Supabase dashboard
2. Click "Add user" > "Create new user"
3. Fill in:
   - **Email**: admin@rimacosmetics.com
   - **Password**: admin123
   - **Auto Confirm User**: YES (check this box)
4. Click "Create user"

### Step 5.3: Verify Admin Access
1. Go to your application
2. Click "Login"
3. Enter:
   - **Email**: admin@rimacosmetics.com
   - **Password**: admin123
4. You should be redirected to the admin dashboard

---

## 6. Troubleshooting

### Issue: "Failed to fetch products"
**Solution:**
- Check if `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correctly set in `/utils/supabase/info.tsx`
- Verify the Edge Function is deployed: `supabase functions list`
- Check Edge Function logs in Supabase dashboard

### Issue: "Authentication error"
**Solution:**
- Verify the user was created in **Authentication** > **Users**
- Check if the user's email is confirmed (toggle "Email Confirmed" in user details)
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set in Edge Function secrets

### Issue: "Database connection failed"
**Solution:**
- Verify `SUPABASE_DB_URL` is correctly formatted
- Check if the password in the connection string is correct
- Ensure the `kv_store_35cd97c6` table exists

### Issue: "Products not loading"
**Solution:**
- Check browser console for errors
- Verify the products are seeded in the database
- Run the seed script: Check `/supabase/functions/server/index.tsx` for seed endpoint

### Issue: "CORS errors"
**Solution:**
- Edge Functions should have CORS enabled by default
- Check the server code has `cors()` middleware
- Verify you're making requests to the correct URL

### Issue: "Orders not saving"
**Solution:**
- Check if user is authenticated (check browser console)
- Verify the order endpoint in Edge Function
- Check Edge Function logs for errors

---

## Next Steps After Setup

Once everything is connected:

1. **Test all features:**
   - Browse products
   - Add to cart
   - Place an order
   - Track order status
   - Admin dashboard access

2. **Seed initial products:**
   - Use the admin dashboard to add products
   - Or run a seed script to populate the database

3. **Configure WhatsApp:**
   - Update phone number in WhatsAppButton component
   - Test WhatsApp integration

4. **Deploy your app:**
   - Deploy the frontend (Vercel, Netlify, etc.)
   - Edge Functions are already deployed on Supabase

---

## Database Schema Reference

Your application uses the following data structures in the KV store:

### Products
Key format: `product:{id}`
```json
{
  "id": "1",
  "name": "Hair Oil",
  "price": 175,
  "category": "hair-care",
  "description": "100% organic hair oil...",
  "image": "https://...",
  "inStock": true,
  "volume": "100ml"
}
```

### Orders
Key format: `order:{orderId}`
```json
{
  "id": "order_123",
  "userId": "user_456",
  "items": [...],
  "total": 500,
  "status": "pending",
  "paymentMethod": "whatsapp",
  "shippingAddress": {...},
  "createdAt": "2025-11-04T10:00:00Z",
  "estimatedDelivery": "2025-11-08T10:00:00Z"
}
```

### User Orders Index
Key format: `user_orders:{userId}`
```json
{
  "orderIds": ["order_123", "order_456"]
}
```

---

## Support & Resources

- **Supabase Documentation**: https://supabase.com/docs
- **Supabase Auth Guide**: https://supabase.com/docs/guides/auth
- **Edge Functions Guide**: https://supabase.com/docs/guides/functions

---

**Congratulations!** 🎉 Your Rima Cosmetics e-commerce platform is now connected to Supabase and ready to use!
