# Quick Email Setup Guide

## 🎯 What's Done
✅ Email notification system fully implemented
✅ Authentication error fixed (was showing "Unauthorized")
✅ Professional email template with customer details
✅ Automatic sending on order placement

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Get Resend API Key
1. Go to **https://resend.com** and create a free account
2. Navigate to **API Keys** → **Create API Key**
3. Copy your API key

### Step 2: Add API Key to Supabase
1. Open your **Supabase Dashboard**
2. Go to **Settings** → **Edge Functions** → **Secrets**
3. The `RESEND_API_KEY` variable already exists
4. Paste your API key and click **Save**

### Step 3: Deploy Edge Function
```bash
# Make sure you're in your project directory
cd /path/to/your/project

# Deploy the server function
supabase functions deploy server
```

---

## 🧪 Test It

1. **Place a test order** on your website
2. **Check email** at rimaorganiccosmetics@gmail.com
3. **Check spam folder** if not received
4. **View logs** in Supabase Dashboard → Edge Functions → server → Logs

---

## 📧 What the Email Contains

**Customer Info:**
- Name, Email, Mobile Number
- Full Address with City, State, Pincode, Country

**Order Details:**
- Order ID and Date
- Product list with quantities and prices
- Total amount
- Payment method (WhatsApp Pay)

**Next Steps:**
- Reminder to contact customer via WhatsApp

---

## 🔧 Already Configured

✅ Business email: `rimaorganiccosmetics@gmail.com`
✅ Email template with green branding
✅ Indian timezone for order dates
✅ Professional HTML layout

---

## ⚠️ Troubleshooting

**Email not received?**
- Check spam/junk folder
- Verify RESEND_API_KEY is set correctly
- Check Resend dashboard at resend.com for delivery status
- View Edge Function logs in Supabase

**"Unauthorized" error?**
- This has been fixed! Make sure you're logged in before placing order

**Other errors?**
- Check Supabase Edge Function logs for detailed error messages
- Ensure Edge Function is deployed and active

---

## 📝 Files Modified

1. `/supabase/functions/server/index.tsx` - Added email sending function
2. `/pages/CheckoutPage.tsx` - Fixed authentication + added country field
3. `/types/index.ts` - Added country to ShippingAddress interface

---

## 🎁 Free Plan Limits

Resend Free Plan:
- ✅ 100 emails/day
- ✅ 3,000 emails/month
- ✅ Perfect for starting out!

---

For detailed instructions, see `/EMAIL_INTEGRATION_GUIDE.md`
