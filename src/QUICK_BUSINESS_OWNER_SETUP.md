# Quick Business Owner Setup

## 🔑 Login Credentials

**Business Owner Account:**
```
Email: rimaorganiccosmetics@gmail.com
Password: rima2015
```

---

## ⚡ Quick Setup (2 Steps)

### Step 1: Create Account in Supabase

1. Open **Supabase Dashboard** → **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - Email: `rimaorganiccosmetics@gmail.com`
   - Password: `rima2015`
   - ✅ Auto Confirm User
4. Click **Create User**
5. Click on the created user → **Edit User Metadata**
6. Add this JSON:
   ```json
   {
     "name": "Rima Cosmetics Owner",
     "role": "admin"
   }
   ```
7. Click **Save**

### Step 2: Login & Test

1. Go to your website `/login`
2. Enter email and password
3. You should see the **Business Dashboard** at `/admin`

---

## 📊 What You Get

### Dashboard Stats:
- 📦 **Orders Received** - Total orders
- ⏳ **Orders Pending** - Not yet delivered
- ✅ **Orders Completed** - Delivered
- 💰 **Total Revenue** - Total earnings

### Order Management:
- View all customer orders
- Update order status (Pending → Confirmed → Shipped → Delivered)
- See customer details (name, phone, address)
- Track order history

### Status Updates:
- **Pending** - Just placed
- **Confirmed** - Order confirmed
- **Shipped** - On the way
- **Delivered** - Completed

---

## 📧 Email Alerts

Every time a customer places an order, you'll receive an email at `rimaorganiccosmetics@gmail.com` with:
- Customer details
- Order details
- Products ordered

*(Requires Resend API setup - see `/EMAIL_INTEGRATION_GUIDE.md`)*

---

## ✅ Verify Setup

- [ ] Account created in Supabase
- [ ] User metadata has `role: "admin"`
- [ ] Can login with credentials
- [ ] Dashboard loads at `/admin`
- [ ] Stats display correctly
- [ ] Can update order status
- [ ] Email notifications work

---

## 🆘 Troubleshooting

**Can't login?**
- Check if email/password are correct
- Verify user exists in Supabase → Authentication → Users
- Ensure `role: "admin"` is in user metadata

**Dashboard not showing?**
- Clear browser cache
- Check browser console for errors
- Verify Edge Functions are deployed

**No orders showing?**
- Place a test order first
- Check Edge Function logs in Supabase

---

**For detailed instructions, see `/BUSINESS_OWNER_SETUP.md`**
