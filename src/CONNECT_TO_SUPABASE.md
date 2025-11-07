# 🚀 Connect Your Project to Supabase - Step by Step

Follow these exact steps to connect your Rima Cosmetics project to Supabase database.

---

## ⏱️ Time Required: 15 minutes

---

## 📋 Step 1: Create Supabase Account & Project (5 minutes)

### 1.1 Sign Up
1. Open your browser and go to: **https://supabase.com**
2. Click **"Start your project"** (green button)
3. Sign up using:
   - GitHub (recommended)
   - Google
   - Or Email

### 1.2 Create New Project
1. After logging in, click **"New Project"**
2. Fill in these details:
   
   ```
   Name: Rima Cosmetics
   Database Password: [Create a strong password]
   Region: ap-south-1 (Asia Pacific - Mumbai)
   Pricing Plan: Free
   ```

3. **IMPORTANT**: Write down your database password! You'll need it later.

4. Click **"Create new project"**

5. ⏳ Wait 2-3 minutes while Supabase sets up your project
   - You'll see a loading screen
   - Don't close this page!

---

## 📝 Step 2: Get Your Project Credentials (2 minutes)

Once your project is ready, you'll see the dashboard.

### 2.1 Navigate to Settings
1. Look at the left sidebar
2. Click the **⚙️ Settings** icon (gear icon at the bottom)
3. In the Settings menu, click **"API"**

### 2.2 Copy Your Credentials
You'll see a page with several important values. Copy these THREE items:

**A. Project URL**
```
Example: https://abcdefghijklmnop.supabase.co
```
- This is at the top of the API settings page
- It's labeled "Project URL"

**B. Project API Keys - anon/public**
```
Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
```
- Look for "Project API keys" section
- Find the key labeled **"anon" "public"**
- Click the copy icon next to it

**C. Project API Keys - service_role/secret**
```
Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
```
- In the same "Project API keys" section
- Find the key labeled **"service_role" "secret"**
- Click the copy icon
- **⚠️ KEEP THIS SECRET! Never share it publicly**

**D. Extract Project ID**
From your Project URL, extract the project ID:
- If your URL is: `https://abcdefghijklmnop.supabase.co`
- Your Project ID is: `abcdefghijklmnop`

---

## 🔧 Step 3: Update Your Project Code (1 minute)

### 3.1 Open the Configuration File
In your project, open this file:
```
/utils/supabase/info.tsx
```

### 3.2 Replace the Values
You'll see this code:
```tsx
export const projectId = 'your-project-id';
export const publicAnonKey = 'your-anon-key';
```

**Replace with YOUR actual values:**
```tsx
export const projectId = 'abcdefghijklmnop';  // Your actual Project ID
export const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // Your actual anon key
```

### 3.3 Save the File
- Press `Ctrl+S` (Windows/Linux) or `Cmd+S` (Mac)
- Make sure the file is saved!

---

## 🗄️ Step 4: Create Database Table (2 minutes)

### 4.1 Open SQL Editor
1. In Supabase dashboard (left sidebar)
2. Click **"SQL Editor"** icon (it looks like `</>`)
3. Click **"New query"** button (top right)

### 4.2 Copy and Paste This SQL
Copy this ENTIRE SQL script:

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

### 4.3 Run the SQL
1. Paste the SQL into the editor
2. Click **"Run"** button (or press `F5`)
3. You should see: ✅ **"Success. No rows returned"**

### 4.4 Verify Table Creation
1. Click **"Table Editor"** in left sidebar
2. You should see a table named **`kv_store_35cd97c6`**
3. It should have 4 columns: `key`, `value`, `created_at`, `updated_at`

---

## 👤 Step 5: Create Admin Account (2 minutes)

### 5.1 Go to Authentication
1. In Supabase dashboard (left sidebar)
2. Click **"Authentication"** (icon looks like a person)
3. Click **"Users"** in the submenu

### 5.2 Add Admin User
1. Click **"Add user"** button (top right)
2. Select **"Create new user"** (first option)
3. Fill in the form:

```
Email address: admin@rimacosmetics.com
Password: admin123
Auto Confirm User: ✅ CHECK THIS BOX (very important!)
```

4. Click **"Create user"** button

### 5.3 Verify User Created
- You should see the user in the list
- Email: admin@rimacosmetics.com
- Email Confirmed: Yes (green checkmark)

---

## 📦 Step 6: Seed Products into Database (2 minutes)

### 6.1 Go Back to SQL Editor
1. Click **"SQL Editor"** in left sidebar
2. Click **"New query"**

### 6.2 Get the Seed SQL
Open this file in your project:
```
/supabase/functions/server/seed-products.ts
```

### 6.3 Copy the SQL
1. Look for the large SQL script that starts with:
```sql
-- Seed all products for Rima Cosmetics
```
2. Copy EVERYTHING from that comment to the end of the file
3. **ONLY copy the SQL part, not the TypeScript code**

### 6.4 Paste and Run
1. Paste into the SQL Editor in Supabase
2. Click **"Run"** (or press `F5`)
3. You should see: ✅ **Success messages** (22 products inserted)

### 6.5 Verify Products
1. Go to **"Table Editor"**
2. Select **`kv_store_35cd97c6`** table
3. You should see 22 rows, each starting with `product:`

---

## ✅ Step 7: Test Your Connection (1 minute)

### 7.1 Start Your Application
In your terminal, run:
```bash
npm run dev
```

### 7.2 Open in Browser
Navigate to:
```
http://localhost:5173
```
(or whatever port your app is running on)

### 7.3 Test These Features

**✅ Test 1: View Products**
1. Click "Products" in the navigation
2. You should see all 22 products with images
3. Images should load correctly

**✅ Test 2: Admin Login**
1. Click "Login" in the navigation
2. Enter:
   - Email: `admin@rimacosmetics.com`
   - Password: `admin123`
3. Click "Sign In"
4. You should be redirected to the Admin Dashboard

**✅ Test 3: Browse as Customer**
1. Logout (if logged in as admin)
2. Browse products
3. Add item to cart
4. View cart
5. Items should persist even if you refresh the page

---

## 🎉 SUCCESS! You're Connected!

If all tests passed, your project is now fully connected to Supabase!

---

## 🚨 Troubleshooting

### Problem: Can't see products on Products page

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Verify `/utils/supabase/info.tsx` has correct values
4. Make sure you ran the seed SQL script
5. Check if products exist in Table Editor

---

### Problem: Can't login as admin

**Solution:**
1. Go to Supabase → Authentication → Users
2. Find `admin@rimacosmetics.com`
3. Click on it
4. Make sure **"Email Confirmed"** shows as **Yes**
5. If No, click the toggle to confirm it
6. Try logging in again

---

### Problem: Products in database but not showing on website

**Solution:**
1. Check browser console for errors
2. Verify the API endpoint is correct in your code
3. Make sure Supabase credentials are updated
4. Try clearing browser cache (Ctrl+Shift+R)
5. Restart your development server

---

### Problem: "Failed to fetch" errors

**Solution:**
1. Verify your internet connection
2. Check if Supabase project is active (not paused)
3. Verify `projectId` and `publicAnonKey` in `/utils/supabase/info.tsx`
4. Make sure CORS is not blocking requests (should be fine by default)

---

## 📞 Need Help?

If you're stuck:

1. **Check Browser Console**: Press F12 and look at Console tab for errors
2. **Check Supabase Logs**: Dashboard → Logs (look for errors)
3. **Verify Credentials**: Double-check all copied values
4. **Review Setup Guides**: Read `DATABASE_QUICK_SETUP.md` for more details

---

## 🎯 What's Next?

Now that you're connected:

1. **Test the Full Flow**
   - Browse products
   - Add to cart
   - Place an order
   - Track order status

2. **Customize Products**
   - Use Admin Dashboard to edit products
   - Update prices, descriptions, stock status
   - Add new products

3. **Configure WhatsApp**
   - Update phone number in `/components/WhatsAppButton.tsx`
   - Test the WhatsApp button

4. **Deploy Your Website**
   - When ready, deploy to Vercel or Netlify
   - Your Supabase database is already cloud-hosted!

---

## ✅ Connection Checklist

Use this to verify everything is set up:

- [ ] Supabase project created
- [ ] Project URL copied
- [ ] Anon key copied
- [ ] Service role key copied (kept secret)
- [ ] Project ID extracted from URL
- [ ] `/utils/supabase/info.tsx` updated with credentials
- [ ] SQL table `kv_store_35cd97c6` created
- [ ] Admin user created (admin@rimacosmetics.com)
- [ ] Admin user email confirmed
- [ ] Products seeded (22 products)
- [ ] Products visible in Table Editor
- [ ] Website loads without errors
- [ ] Products page shows all items
- [ ] Admin can login successfully
- [ ] Admin dashboard accessible

---

**Congratulations! 🎊 Your Rima Cosmetics e-commerce platform is live with Supabase!**
