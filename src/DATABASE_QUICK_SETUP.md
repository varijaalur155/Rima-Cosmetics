# Quick Database Setup Guide

Follow these steps to get your Rima Cosmetics database up and running in 10 minutes!

## Prerequisites
- A Supabase account (free tier is fine)
- Your project running locally

---

## Step 1: Create Supabase Project (3 minutes)

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: Rima Cosmetics
   - **Password**: (create a strong password and SAVE IT!)
   - **Region**: ap-south-1 (Mumbai - closest to Chennai)
4. Click "Create new project"
5. Wait 2-3 minutes for initialization

---

## Step 2: Get Your Credentials (1 minute)

1. Click **Settings** (gear icon) in sidebar
2. Click **API**
3. Copy these three values:

```
Project URL: https://xxxxx.supabase.co
Anon Key: eyJhbGci... (long string)
Service Role Key: eyJhbGci... (different long string)
```

**Extract Project ID** from the URL:
- If URL is `https://abcdefgh.supabase.co`
- Then Project ID is `abcdefgh`

---

## Step 3: Update Your Code (2 minutes)

### 3.1 Update `/utils/supabase/info.tsx`

Replace the placeholder values:

```tsx
export const projectId = 'abcdefgh';  // Your actual project ID
export const publicAnonKey = 'eyJhbGci...';  // Your actual Anon Key
```

---

## Step 4: Create Database Table (2 minutes)

1. In Supabase dashboard, click **SQL Editor**
2. Click "New query"
3. Paste this SQL:

```sql
-- Create the key-value store table
CREATE TABLE IF NOT EXISTS kv_store_35cd97c6 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_kv_store_key ON kv_store_35cd97c6(key);

-- Enable Row Level Security
ALTER TABLE kv_store_35cd97c6 ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role can do everything" ON kv_store_35cd97c6
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read
CREATE POLICY "Authenticated users can read" ON kv_store_35cd97c6
  FOR SELECT
  TO authenticated
  USING (true);
```

4. Click **Run** (or press F5)
5. You should see "Success. No rows returned"

---

## Step 5: Create Admin User (2 minutes)

### Option A: Using Supabase Dashboard (Recommended)

1. Click **Authentication** in sidebar
2. Click **Users**
3. Click "Add user" → "Create new user"
4. Fill in:
   - **Email**: admin@rimacosmetics.com
   - **Password**: admin123
   - **Auto Confirm User**: ✅ CHECK THIS BOX
5. Click "Create user"

### Option B: Using SQL

In SQL Editor, run:

```sql
-- This creates user metadata
INSERT INTO kv_store_35cd97c6 (key, value)
VALUES (
  'user:admin@rimacosmetics.com',
  jsonb_build_object(
    'email', 'admin@rimacosmetics.com',
    'name', 'Admin',
    'role', 'admin',
    'created_at', NOW()
  )
);
```

Then use Option A to create the actual auth account.

---

## Step 6: Test Your Setup

### 6.1 Test Admin Login

1. Run your app: `npm run dev`
2. Click "Login"
3. Enter:
   - Email: admin@rimacosmetics.com
   - Password: admin123
4. ✅ You should see the Admin Dashboard!

### 6.2 Check Database Connection

In your browser console, run:

```javascript
// Test fetching products
fetch('https://YOUR-PROJECT-ID.supabase.co/functions/v1/make-server-35cd97c6/products', {
  headers: {
    'Authorization': 'Bearer YOUR-ANON-KEY'
  }
})
.then(r => r.json())
.then(console.log);
```

---

## Step 7: Seed Initial Products (Optional)

To populate your database with the default products, you can either:

### Option 1: Use Admin Dashboard
1. Login as admin
2. Navigate to Admin Dashboard
3. Click "Add Product"
4. Fill in product details and save

### Option 2: Seed via SQL

Run this in SQL Editor to add all products at once:

```sql
-- Hair Oil
INSERT INTO kv_store_35cd97c6 (key, value)
VALUES (
  'product:1',
  '{"id":"1","name":"Hair Oil","price":175,"category":"hair-care","description":"100% organic hair oil for nourishment and hair growth. Made with natural herbs.","image":"https://images.unsplash.com/photo-1669281393403-e1f3248dce2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true,"volume":"100ml"}'::jsonb
);

-- Herbal Shampoo
INSERT INTO kv_store_35cd97c6 (key, value)
VALUES (
  'product:2',
  '{"id":"2","name":"Herbal Shampoo","price":175,"category":"hair-care","description":"Natural herbal shampoo for healthy, shiny hair. SLS and paraben free.","image":"https://images.unsplash.com/photo-1608571899793-a1c0c27a7555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true,"volume":"100ml"}'::jsonb
);

-- Add more products following the same pattern...
```

---

## Troubleshooting

### ❌ Can't login with admin credentials
**Fix:** 
1. Go to Authentication → Users
2. Find admin@rimacosmetics.com
3. Click on it
4. Ensure "Email Confirmed" is ON
5. Try logging in again

### ❌ "Failed to fetch products"
**Fix:**
1. Check if you updated `/utils/supabase/info.tsx` correctly
2. Verify Project ID and Anon Key are correct
3. Make sure table `kv_store_35cd97c6` exists (check Table Editor)

### ❌ Edge Functions not working
**Note:** Edge Functions need to be deployed separately. For local development, you may need to:

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login and link:
```bash
supabase login
supabase link --project-ref YOUR-PROJECT-ID
```

3. Set environment variables in Supabase:
   - Go to Edge Functions → Settings
   - Add secrets:
     - `SUPABASE_URL`: Your project URL
     - `SUPABASE_ANON_KEY`: Your anon key
     - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key

4. Deploy:
```bash
supabase functions deploy make-server-35cd97c6
```

---

## Verification Checklist

Before proceeding, verify:

- ✅ Supabase project created
- ✅ `kv_store_35cd97c6` table exists
- ✅ `/utils/supabase/info.tsx` updated with credentials
- ✅ Admin user created and can login
- ✅ Products loading on frontend

---

## What's Next?

After setup is complete:

1. **Customize Products**: Add your actual product catalog
2. **Test Orders**: Place a test order to verify the flow
3. **Configure WhatsApp**: Update phone number in WhatsAppButton.tsx
4. **Deploy**: Deploy your frontend to Vercel/Netlify

---

## Support

If you encounter issues:

1. Check browser console for errors (F12)
2. Check Supabase Edge Function logs
3. Review the complete setup guide: `SUPABASE_SETUP_GUIDE.md`
4. Supabase Discord: https://discord.supabase.com

---

**You're all set!** 🎉 Your e-commerce platform is now connected to the database!
