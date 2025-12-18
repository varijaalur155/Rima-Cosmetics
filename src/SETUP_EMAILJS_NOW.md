# 🚀 Setup EmailJS Right Now - 5 Minutes!

Follow these steps to get order notification emails working:

---

## Step 1: Create Account (1 minute)

1. Go to: **https://www.emailjs.com/**
2. Click **"Sign Up"**
3. Use email: **rimaorganiccosmetics@gmail.com**
4. Verify your email

---

## Step 2: Connect Gmail (1 minute)

1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with: **rimaorganiccosmetics@gmail.com**
6. ✅ **COPY THE SERVICE ID** (looks like: `service_abc1234`)

---

## Step 3: Create Template (2 minutes)

1. Click **"Email Templates"**
2. Click **"Create New Template"**
3. Set **To email**: `rimaorganiccosmetics@gmail.com`
4. Set **Subject**: `🛍️ New Order - {{order_id}}`
5. Copy this **Content**:

```
New Order Received!

Order ID: {{order_id}}
Date: {{order_date}}

CUSTOMER DETAILS:
Name: {{customer_name}}
Phone: {{customer_phone}}
Email: {{customer_email}}
Address: {{customer_address}}
City: {{customer_city}}
State: {{customer_state}}
Pin Code: {{customer_pincode}}
Country: {{customer_country}}

PRODUCTS:
{{order_items}}

Total: ₹{{total_amount}}

Action: Contact customer at {{customer_phone}} via WhatsApp!
```

6. Click **"Save"**
7. ✅ **COPY THE TEMPLATE ID** (looks like: `template_xyz5678`)

---

## Step 4: Get Public Key (30 seconds)

1. Click **"Account"** in sidebar
2. Find **"API Keys"** section
3. ✅ **COPY THE PUBLIC KEY** (looks like: `AbC1234XyZ`)

---

## Step 5: Update Your Project (30 seconds)

1. Open file: **`/utils/emailjs-config.ts`**
2. Replace these three lines:

```typescript
SERVICE_ID: 'YOUR_SERVICE_ID',    // Replace with your Service ID
TEMPLATE_ID: 'YOUR_TEMPLATE_ID',  // Replace with your Template ID
PUBLIC_KEY: 'YOUR_PUBLIC_KEY',    // Replace with your Public Key
```

**Example after replacement:**

```typescript
SERVICE_ID: 'service_abc1234',
TEMPLATE_ID: 'template_xyz5678',
PUBLIC_KEY: 'AbC1234XyZ',
```

3. Save the file ✅

---

## Step 6: Test! (1 minute)

1. Go to your website
2. Add a product to cart
3. Go to checkout
4. Fill shipping details
5. Click **"Place Order"**
6. Check email: **rimaorganiccosmetics@gmail.com**
7. You should receive the order notification! 🎉

---

## ✅ Done!

You'll now receive an email at **rimaorganiccosmetics@gmail.com** for every order with:
- Customer name, phone, email, address
- Products ordered
- Total amount
- All details needed to contact via WhatsApp

---

## 🆘 Not Working?

1. **Check spam folder** in your Gmail
2. **Verify all 3 values** are correctly copied in `/utils/emailjs-config.ts`
3. **Check browser console** (Press F12) for error messages
4. **Make sure Gmail is connected** in EmailJS dashboard

---

## 📚 Need More Help?

- **Full Guide**: See `/EMAILJS_SETUP_GUIDE.md`
- **Quick Reference**: See `/EMAILJS_QUICK_REFERENCE.md`
- **EmailJS Docs**: https://www.emailjs.com/docs/

---

## 💡 Important Notes

- **Free plan**: 200 emails/month (enough for most small businesses)
- **Safe to use**: Your Gmail password is never exposed
- **No backend needed**: Works directly from frontend
- **Real-time**: Emails sent instantly when orders are placed

---

**Questions?** Check the detailed guide or EmailJS documentation!

Good luck! 🌿💚
