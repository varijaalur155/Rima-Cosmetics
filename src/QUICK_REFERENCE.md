# 📌 Quick Reference Card

Keep this handy for quick access to important information!

---

## 🔑 Credentials

### Supabase Project
```
Project ID: ukmjnhvivrzdtvkhftpq
Dashboard: https://supabase.com/dashboard/project/ukmjnhvivrzdtvkhftpq
```

### Admin Login
```
Email: admin@rimacosmetics.com
Password: admin123
⚠️ Change this password in production!
```

---

## 📂 Database

### Table Name
```
kv_store_35cd97c6
```

### Data Keys
```
Products:     product:1, product:2, ... product:22
Orders:       order:ORD-123456789
User Orders:  user_orders:USER_ID
```

---

## 🚀 Quick Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📄 Important Files

### Configuration
```
/utils/supabase/info.tsx          - Supabase credentials
/components/WhatsAppButton.tsx    - WhatsApp phone number
/data/products.ts                 - Product catalog
```

### Setup Guides
```
SETUP_DATABASE_NOW.md     ⭐ Start here (10 min)
CONNECT_TO_SUPABASE.md       Detailed guide
FINAL_SUMMARY.md             Complete overview
```

---

## 🛠️ Common Tasks

### Update WhatsApp Number
1. Open: `/components/WhatsAppButton.tsx`
2. Find: `const phoneNumber = '918939996640';`
3. Replace with your number

### Add New Product (Admin)
1. Login as admin
2. Dashboard → "Add Product"
3. Fill form and submit

### Update Order Status (Admin)
1. Login as admin
2. Dashboard → View Orders
3. Click order → Update status

### Change Admin Password
1. Supabase Dashboard → Authentication → Users
2. Click on admin user
3. Reset password

---

## 🎨 Product Categories

```
hair-care   → Hair Oil, Shampoos, Conditioners (6 items)
skin-care   → Gels, Wash, Creams, Scrubs (9 items)
soap        → Various handmade soaps (7 items)
lip-care    → Lipstick, Lip Balm (2 items)
```

---

## 📊 Order Statuses

```
pending    → 25%  → Order placed, waiting confirmation
confirmed  → 50%  → Order confirmed, preparing shipment
shipped    → 75%  → Order shipped, in transit
delivered  → 100% → Order delivered to customer
```

---

## 🔗 API Endpoints

### Base URL
```
https://ukmjnhvivrzdtvkhftpq.supabase.co/functions/v1/make-server-35cd97c6
```

### Public Endpoints
```
GET  /products           - Get all products
GET  /products/:id       - Get single product
POST /orders             - Create order (auth required)
GET  /orders             - Get user orders (auth required)
```

### Admin Endpoints (Auth Required)
```
GET    /admin/orders         - Get all orders
PUT    /admin/orders/:id     - Update order status
POST   /admin/products       - Create product
PUT    /admin/products/:id   - Update product
DELETE /admin/products/:id   - Delete product
```

---

## 🧪 Testing Checklist

### Customer Flow
- [ ] Browse products
- [ ] Add to cart
- [ ] Checkout
- [ ] Place order
- [ ] Track order

### Admin Flow
- [ ] Login
- [ ] View dashboard
- [ ] Manage products
- [ ] Update orders

---

## 🚨 Troubleshooting Quick Fixes

### Can't see products
```
1. Check: Table Editor → kv_store_35cd97c6
2. If empty: Run product seed SQL
3. If error: Check browser console (F12)
```

### Can't login
```
1. Check: Authentication → Users
2. Verify: Email Confirmed = Yes
3. If No: Toggle to Yes
```

### App won't start
```
1. Clear cache: Ctrl+Shift+R
2. Restart server: Ctrl+C → npm run dev
3. Check: Node modules installed (npm install)
```

---

## 📱 Contact Information

### WhatsApp
```
Phone: +91 8939996640
Format: 918939996640 (for code)
```

### Business
```
Name: Rima Cosmetics
Owner: Mounica MK
Location: Chennai, Tamil Nadu
Type: 100% Organic Handmade Cosmetics
```

---

## 🎯 Current Status

```
✅ Product Images: Updated (all 22 relevant)
✅ WhatsApp Button: Official icon implemented
✅ Order Tracking: Visual timeline ready
✅ Supabase: Connected (need to setup DB)
✅ Documentation: Complete
✅ Code: Production ready
```

---

## 📋 Setup Status

- [ ] Create database table ← **DO THIS FIRST**
- [ ] Create admin user ← **THEN THIS**
- [ ] Seed products ← **THEN THIS**
- [ ] Test application ← **FINALLY THIS**

**Follow**: `SETUP_DATABASE_NOW.md`

---

## 🔐 Security Notes

```
✅ Service role key: Only in Supabase environment
✅ Anon key: Safe for frontend
✅ Row Level Security: Enabled
✅ Admin endpoints: Auth protected
⚠️ Change admin password in production
```

---

## 🌐 URLs

### Development
```
http://localhost:5173
```

### Supabase Dashboard
```
https://supabase.com/dashboard/project/ukmjnhvivrzdtvkhftpq
```

### API Base
```
https://ukmjnhvivrzdtvkhftpq.supabase.co/functions/v1/make-server-35cd97c6
```

---

## 💾 Backup Important Data

Before making changes, backup:
- Products data (export from Table Editor)
- Orders data
- Admin credentials

---

## 🎉 Launch Checklist

Pre-launch:
- [ ] All products have correct info
- [ ] Prices are accurate
- [ ] WhatsApp number is correct
- [ ] Admin password changed
- [ ] Test full customer flow
- [ ] Test admin features
- [ ] Mobile responsive verified

Ready to Launch:
- [ ] Deploy frontend
- [ ] Test production site
- [ ] Monitor first orders
- [ ] Promote your site!

---

**🌿 Rima Cosmetics - 100% Organic Handmade Products 🌿**

*Quick Reference v1.0 - Keep this handy!*
