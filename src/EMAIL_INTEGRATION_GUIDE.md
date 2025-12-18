# Email Notification Integration Guide

## Overview
This guide will help you set up email notifications using Resend API for your Rima Cosmetics e-commerce website. When a customer places an order, the business owner will automatically receive an email containing all customer details and order information.

---

## ✅ Issue Fixed

**Previous Error:** "Unauthorized" error when placing orders

**Fix Applied:** Updated the checkout page to use the correct authentication token from the AuthContext. The app now properly authenticates API requests when creating orders.

---

## What's Been Implemented

### 1. **Email Notification System**
- ✅ Server-side email function using Resend API
- ✅ Professional HTML email template with Rima Cosmetics branding
- ✅ Automatic email sending when orders are placed
- ✅ Customer information included: name, email, mobile, address, state, pincode, country
- ✅ Order details included: products, quantities, prices, total amount
- ✅ Order metadata: Order ID, date, payment method, status

### 2. **Updated Components**
- ✅ `CheckoutPage.tsx` - Now includes country field and sends orders to backend
- ✅ `types/index.ts` - Updated ShippingAddress interface with country field
- ✅ `supabase/functions/server/index.tsx` - Added email sending functionality

---

## Email Configuration

### Environment Variables Required
The following environment variables are already configured in your Supabase project:

1. **RESEND_API_KEY** - Your Resend API key
2. **MAILING_LIST_EMAIL** - Business owner's email (rimaorganiccosmetics@gmail.com)

These are automatically read from your Supabase environment.

---

## Step-by-Step Integration Instructions

### Step 1: Set Up Resend Account

1. **Create a Resend account** (if you haven't already):
   - Go to https://resend.com
   - Sign up for a free account
   - The free plan includes 100 emails/day and 3,000 emails/month

2. **Get your API key**:
   - Log in to your Resend dashboard
   - Navigate to "API Keys" section
   - Click "Create API Key"
   - Copy the generated API key

3. **Add API key to Supabase**:
   - Go to your Supabase project dashboard
   - Navigate to Settings → Edge Functions → Secrets
   - Find the `RESEND_API_KEY` variable
   - Paste your Resend API key as the value
   - Click Save

### Step 2: Verify Email Configuration

The business owner's email `rimaorganiccosmetics@gmail.com` is already configured in the `MAILING_LIST_EMAIL` environment variable.

**Note:** By default, Resend uses a generic sender address `onboarding@resend.dev`. To use a custom domain (like `orders@rimacosmetics.com`), you need to:

1. Verify your domain in Resend dashboard
2. Add DNS records to your domain
3. Update the `from` field in the email function (line 157 in `/supabase/functions/server/index.tsx`)

For now, the default sender will work fine for testing and initial usage.

### Step 3: Deploy the Backend

Your backend needs to be deployed to Supabase for the email notifications to work:

1. **Connect to Supabase** (if not already connected):
   ```bash
   # Install Supabase CLI if you haven't
   npm install -g supabase
   
   # Link your project
   supabase link --project-ref YOUR_PROJECT_ID
   ```

2. **Deploy the Edge Functions**:
   ```bash
   # Navigate to your project directory
   cd /path/to/your/project
   
   # Deploy the server function
   supabase functions deploy server
   ```

3. **Verify deployment**:
   - Check the Supabase dashboard → Edge Functions
   - You should see the "server" function listed and active

### Step 4: Test the Integration

1. **Place a test order**:
   - Go to your website
   - Add products to cart
   - Fill in the checkout form with test data:
     - Full Name: Test Customer
     - Phone: +91 9876543210
     - Address: Test Address
     - City: Chennai
     - State: Tamil Nadu
     - Pincode: 600001
     - Country: India
   - Click "Place Order"

2. **Check email delivery**:
   - The business owner should receive an email at `rimaorganiccosmetics@gmail.com`
   - Email subject: "🛍️ New Order Received - ORD-[timestamp]"
   - Email should contain all customer and order details

3. **Check logs** (if email doesn't arrive):
   - Go to Supabase Dashboard → Edge Functions → server
   - Click on "Logs" tab
   - Look for any error messages related to email sending

### Step 5: Troubleshooting

#### Email not received?

1. **Check Spam folder**: Sometimes emails from new senders go to spam
2. **Verify API key**: Ensure RESEND_API_KEY is correctly set in Supabase
3. **Check Resend dashboard**: Go to Resend → Emails to see delivery status
4. **Check server logs**: Look for error messages in Supabase Edge Function logs

#### Common errors:

- **"Email service not configured"**: RESEND_API_KEY is missing or invalid
- **"Failed to send email"**: Network issue or Resend API error
- **"Unauthorized"**: User is not logged in properly

---

## Email Template Details

### Email Contains:

**Order Information:**
- Order ID
- Order Date (in Indian timezone)
- Payment Method (WhatsApp Pay)
- Order Status

**Customer Details:**
- Name
- Email
- Mobile Number
- Complete Address
- City
- State
- Pin Code
- Country

**Product Details:**
- Product Name
- Quantity
- Price per unit
- Subtotal
- Total Order Amount

**Additional Notes:**
- Reminder to contact customer via WhatsApp for payment confirmation

---

## Customization Options

### Change Email Recipient
To send emails to a different address, update the `MAILING_LIST_EMAIL` environment variable in Supabase.

### Customize Email Template
Edit the HTML template in `/supabase/functions/server/index.tsx` (starting at line 53):
- Change colors to match your branding
- Add logo or header image
- Modify the layout
- Add additional information

### Add Multiple Recipients
Modify line 157 to include multiple email addresses:
```typescript
to: ['rimaorganiccosmetics@gmail.com', 'owner2@example.com'],
```

### Send Customer Confirmation Email
You can add a separate email function to send order confirmation to customers as well.

---

## Production Checklist

Before going live, ensure:

- [ ] Resend API key is configured correctly
- [ ] Business email address is verified
- [ ] Test order emails are being received
- [ ] Spam folder check completed
- [ ] Email template looks good on mobile devices
- [ ] All customer fields are capturing data correctly
- [ ] Edge function is deployed and active
- [ ] Error handling is working properly

---

## Support

If you encounter any issues:

1. Check Supabase Edge Function logs
2. Check Resend dashboard for email delivery status
3. Verify all environment variables are set correctly
4. Ensure the Edge Function is deployed and active

---

## Summary

The email notification system is now fully integrated into your application. When a customer places an order:

1. Order is created in the database
2. Email notification is sent to business owner (rimaorganiccosmetics@gmail.com)
3. Email contains all customer details and order information
4. Customer receives success message and order confirmation number
5. Business owner can contact customer via WhatsApp for payment

The system uses Resend API for reliable email delivery and includes professional HTML templates that look great on all devices.