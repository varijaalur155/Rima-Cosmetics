# Business Owner Account - Step-by-Step Setup

## 📋 Quick Setup Guide (5 Minutes)

Follow these steps exactly to set up the business owner account.

---

## Step 1️⃣: Open Supabase Dashboard

1. Go to your Supabase project: `https://supabase.com/dashboard`
2. Select your Rima Cosmetics project
3. You should see the project dashboard

---

## Step 2️⃣: Navigate to Authentication

1. Click on **Authentication** in the left sidebar (🔑 icon)
2. Click on **Users** tab at the top
3. You'll see a list of existing users (if any)

---

## Step 3️⃣: Add New User

1. Click the **"Add User"** button (usually green, top right)
2. Select **"Create new user"** from the dropdown
3. A form will appear

---

## Step 4️⃣: Fill in User Details

In the form, enter:

```
Email: rimaorganiccosmetics@gmail.com
Password: rima2015
```

**Important:** Make sure to check the box that says:
```
☑️ Auto Confirm User
```

Then click **"Create User"** button.

---

## Step 5️⃣: Add Admin Role Metadata

1. After user is created, find it in the users list
2. Click on the user row to open details
3. Look for **"User Metadata"** section
4. Click **"Edit"** or **"Add Metadata"** button
5. In the JSON editor, add:

```json
{
  "name": "Rima Cosmetics Owner",
  "role": "admin"
}
```

6. Click **"Save"** button

---

## Step 6️⃣: Verify the Account

1. Open your Rima Cosmetics website
2. Click **"Login"** in the navigation menu
3. Enter:
   - Email: `rimaorganiccosmetics@gmail.com`
   - Password: `rima2015`
4. Click **"Sign In"**

---

## Step 7️⃣: Check Dashboard Access

After login, you should:
1. Be automatically redirected to `/admin`
2. See **"Business Dashboard"** heading
3. See four statistics cards:
   - Orders Received
   - Orders Pending
   - Orders Completed
   - Total Revenue
4. See "Welcome, Rima Cosmetics Owner" message

---

## ✅ Success Indicators

If everything is working correctly, you should see:

```
✅ Successfully logged in
✅ Redirected to /admin page
✅ Dashboard loads without errors
✅ Statistics show (0, 0, 0, ₹0 initially)
✅ "Manage Orders" section visible
✅ No error messages in browser console
```

---

## 🧪 Test the System

### Test 1: Place a Test Order

1. **Open website in incognito/private window**
2. Click "Login" → "Sign Up"
3. Create a customer account:
   ```
   Name: Test Customer
   Email: test@example.com
   Password: test123
   ```
4. Browse products and add to cart
5. Click "Checkout"
6. Fill in shipping address:
   ```
   Name: Test Customer
   Phone: +91 9876543210
   Address: 123 Test Street
   City: Chennai
   State: Tamil Nadu
   Pincode: 600001
   Country: India
   ```
7. Click "Place Order"
8. You should see success message

### Test 2: View Order in Dashboard

1. **Go back to your business owner browser window**
2. Refresh the dashboard page
3. You should now see:
   ```
   Orders Received: 1
   Orders Pending: 1
   Orders Completed: 0
   Total Revenue: ₹[order amount]
   ```
4. Scroll down to see the order details

### Test 3: Update Order Status

1. Find the test order in the dashboard
2. Click the status dropdown (currently shows "Pending")
3. Select "Confirmed"
4. You should see: ✅ "Order status updated successfully"
5. Badge should change to blue with "Confirmed"

### Test 4: Verify Customer View

1. **In the incognito window (as customer)**
2. Click "My Orders" in navigation
3. You should see the order with "Confirmed" status
4. Progress bar should be at 50%
5. Timeline should show "Confirmed" step completed

---

## 🎯 Visual Confirmation

### Dashboard Should Look Like This:

```
┌─────────────────────────────────────────────────────┐
│  BUSINESS DASHBOARD                                 │
│  Welcome, Rima Cosmetics Owner                     │
└─────────────────────────────────────────────────────┘

┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Orders       │ │ Orders       │ │ Orders       │ │ Total        │
│ Received     │ │ Pending      │ │ Completed    │ │ Revenue      │
│              │ │              │ │              │ │              │
│    1         │ │    1         │ │    0         │ │   ₹850       │
│ 📦          │ │ ⏳          │ │ ✅          │ │ 💰          │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

┌─────────────────────────────────────────────────────┐
│  MANAGE ORDERS                                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Order #ORD-1733052845123    [Confirmed ▼]        │
│  Dec 1, 2025, 10:30 AM                             │
│                                                     │
│  Items:                                             │
│  Aloe Vera Shampoo x 2 - ₹500                      │
│  Total: ₹850                                        │
│                                                     │
│  Shipping Address:                                  │
│  Test Customer                                      │
│  +91 9876543210                                     │
│  123 Test Street                                    │
│  Chennai, Tamil Nadu 600001                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🚨 Troubleshooting

### Problem: Can't find "Add User" button
**Solution:** Make sure you're in Authentication → Users tab

### Problem: Auto Confirm checkbox not visible
**Solution:** Look for "Confirm email" or similar option

### Problem: Can't edit user metadata
**Solution:** Click on the user row first to open details

### Problem: Login fails with "Invalid credentials"
**Solution:** 
- Double-check email: rimaorganiccosmetics@gmail.com
- Double-check password: rima2015
- Verify user exists in Supabase

### Problem: Redirected to home page instead of dashboard
**Solution:** 
- Check if user metadata has `"role": "admin"`
- Clear browser cache and try again
- Check browser console for errors

### Problem: Dashboard shows 0 for all statistics
**Solution:** This is normal! Place a test order to see numbers update

### Problem: Can't update order status
**Solution:**
- Verify you're logged in as business owner
- Check if accessToken is valid (login again)
- Look for error messages in browser console

---

## 📧 Optional: Set Up Email Notifications

To receive email alerts for new orders:

1. Create Resend account at https://resend.com
2. Get your API key
3. Go to Supabase Dashboard → Settings → Edge Functions → Secrets
4. Add `RESEND_API_KEY` with your key
5. Deploy Edge Functions:
   ```bash
   supabase functions deploy server
   ```

See `/EMAIL_INTEGRATION_GUIDE.md` for detailed instructions.

---

## ✅ Final Checklist

After completing all steps, verify:

- [ ] User created in Supabase with email rimaorganiccosmetics@gmail.com
- [ ] User has metadata: `{ "name": "...", "role": "admin" }`
- [ ] Can login successfully with password rima2015
- [ ] Redirected to /admin after login
- [ ] Dashboard displays properly
- [ ] Can see all four statistics cards
- [ ] Test order created successfully
- [ ] Order appears in dashboard
- [ ] Statistics updated correctly
- [ ] Can change order status
- [ ] Status change shows success message
- [ ] Customer can see updated status

---

## 🎉 You're Done!

Your business owner account is now fully set up and ready to use!

**Next Steps:**
1. 📱 Contact customers via WhatsApp
2. ✅ Update order statuses as you fulfill them
3. 📊 Monitor your business statistics
4. 📧 Receive email alerts for new orders

**Happy Selling! 🌿✨**

---

## 📚 Need More Help?

- **Detailed Guide:** `/COMPLETE_BUSINESS_OWNER_GUIDE.md`
- **Email Setup:** `/EMAIL_INTEGRATION_GUIDE.md`
- **Workflow Diagram:** `/ORDER_STATUS_FLOW.md`
- **Quick Reference:** `/QUICK_BUSINESS_OWNER_SETUP.md`
