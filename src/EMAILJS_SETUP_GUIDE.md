# EmailJS Setup Guide for Rima Cosmetics

This guide will help you set up EmailJS to send order notification emails directly from your frontend to `rimaorganiccosmetics@gmail.com` when customers place orders.

## 📧 What is EmailJS?

EmailJS is a service that allows you to send emails directly from client-side JavaScript without needing a backend server. It's perfect for sending order notifications, contact forms, and other transactional emails.

---

## 🚀 Step-by-Step Setup Instructions

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click on **"Sign Up"** (or "Get Started")
3. Create a free account using:
   - Your email: `rimaorganiccosmetics@gmail.com` (recommended)
   - Or any email you prefer
4. Verify your email address

---

### Step 2: Add Email Service

Once logged in to your EmailJS dashboard:

1. Click on **"Email Services"** in the left sidebar
2. Click **"Add New Service"** button
3. Choose **"Gmail"** as your email provider
4. You'll see a configuration page:
   - **Service Name**: Enter something like "Rima Gmail Service"
   - Click **"Connect Account"**
   - Sign in with your Gmail account: `rimaorganiccosmetics@gmail.com`
   - Grant the necessary permissions
5. After connecting, you'll see a **Service ID** (e.g., `service_abc1234`)
6. **IMPORTANT**: Copy and save this **Service ID** - you'll need it later!

---

### Step 3: Create Email Template

1. Click on **"Email Templates"** in the left sidebar
2. Click **"Create New Template"** button
3. You'll see a template editor. Configure it as follows:

#### Template Settings:

**Template Name**: `order_notification`

**Subject**: 
```
🛍️ New Order Received - {{order_id}}
```

**Content** (HTML Format):
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(to right, #10b981, #059669);
      padding: 20px;
      border-radius: 8px 8px 0 0;
      color: white;
    }
    .content {
      background: #f9fafb;
      padding: 20px;
      border: 1px solid #e5e7eb;
    }
    .section {
      background: white;
      padding: 20px;
      border: 1px solid #e5e7eb;
      border-top: none;
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table td {
      padding: 8px 0;
    }
    .footer {
      background: #ecfdf5;
      padding: 15px;
      border-radius: 0 0 8px 8px;
      margin-top: 20px;
      border: 1px solid #a7f3d0;
      color: #065f46;
    }
    .highlight {
      color: #059669;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🛍️ New Order Received!</h1>
    </div>
    
    <div class="content">
      <h2 class="highlight">Order Details</h2>
      <p><strong>Order ID:</strong> {{order_id}}</p>
      <p><strong>Order Date:</strong> {{order_date}}</p>
      <p><strong>Payment Method:</strong> WhatsApp Pay</p>
      <p><strong>Status:</strong> PENDING</p>
    </div>

    <div class="section">
      <h2 class="highlight">Customer Details</h2>
      <table>
        <tr>
          <td><strong>Full Name:</strong></td>
          <td>{{customer_name}}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>{{customer_email}}</td>
        </tr>
        <tr>
          <td><strong>Phone Number:</strong></td>
          <td>{{customer_phone}}</td>
        </tr>
        <tr>
          <td><strong>Address:</strong></td>
          <td>{{customer_address}}</td>
        </tr>
        <tr>
          <td><strong>City:</strong></td>
          <td>{{customer_city}}</td>
        </tr>
        <tr>
          <td><strong>State:</strong></td>
          <td>{{customer_state}}</td>
        </tr>
        <tr>
          <td><strong>Pin Code:</strong></td>
          <td>{{customer_pincode}}</td>
        </tr>
        <tr>
          <td><strong>Country:</strong></td>
          <td>{{customer_country}}</td>
        </tr>
      </table>
    </div>

    <div class="section">
      <h2 class="highlight">Ordered Products</h2>
      <pre style="background: #f3f4f6; padding: 15px; border-radius: 4px; white-space: pre-wrap;">{{order_items}}</pre>
      <p style="margin-top: 15px;"><strong>Total Amount: <span class="highlight">₹{{total_amount}}</span></strong></p>
    </div>

    <div class="footer">
      <p style="margin: 0;">
        <strong>📞 Action Required:</strong> Please contact the customer via WhatsApp on <strong>{{customer_phone}}</strong> to confirm payment and delivery details.
      </p>
    </div>
  </div>
</body>
</html>
```

4. **To (Recipient Email)**: Set this to `rimaorganiccosmetics@gmail.com`
5. **From Name**: `Rima Cosmetics Website`
6. **From Email**: This will use your connected Gmail
7. **Reply To**: `{{customer_email}}` (so you can reply directly to customer)

8. Click **"Save"** at the top
9. You'll see a **Template ID** (e.g., `template_xyz5678`)
10. **IMPORTANT**: Copy and save this **Template ID** - you'll need it later!

---

### Step 4: Get Your Public Key

1. Click on **"Account"** in the left sidebar
2. Scroll down to find **"API Keys"** section
3. You'll see your **Public Key** (e.g., `AbC1234XyZ`)
4. **IMPORTANT**: Copy and save this **Public Key** - you'll need it later!

---

### Step 5: Update Your Project Code

Now you need to update the EmailJS configuration in your project:

1. Open the file: `/pages/CheckoutPage.tsx`
2. Look for these three lines (around line 86-89):

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',  // Replace with your EmailJS Service ID
  'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
  templateParams,
  'YOUR_PUBLIC_KEY'   // Replace with your EmailJS Public Key
);
```

3. Replace the placeholder values:
   - Replace `'YOUR_SERVICE_ID'` with your actual Service ID (e.g., `'service_abc1234'`)
   - Replace `'YOUR_TEMPLATE_ID'` with your actual Template ID (e.g., `'template_xyz5678'`)
   - Replace `'YOUR_PUBLIC_KEY'` with your actual Public Key (e.g., `'AbC1234XyZ'`)

**Example after replacement:**
```javascript
await emailjs.send(
  'service_abc1234',
  'template_xyz5678',
  templateParams,
  'AbC1234XyZ'
);
```

---

## ✅ Testing Your Setup

1. **Save all your changes** in the project
2. **Run your website** (it should reload automatically)
3. **Place a test order**:
   - Add a product to cart
   - Go to checkout
   - Fill in the shipping details
   - Click "Place Order"
4. **Check your email**: `rimaorganiccosmetics@gmail.com`
   - You should receive an email with the order details
   - Check spam folder if you don't see it in inbox

---

## 📊 What Information is Sent?

When a customer places an order, the following information is sent to your email:

### Order Information:
- Order ID
- Order Date & Time
- Payment Method (WhatsApp Pay)
- Order Status (Pending)

### Customer Details:
- Full Name
- Email Address
- Phone Number
- Complete Address (Street, City, State, Pin Code, Country)

### Product Details:
- List of all ordered products
- Quantity of each product
- Price per item
- Total amount

---

## 🎯 EmailJS Free Plan Limits

- **200 emails per month** (Free plan)
- If you need more, you can upgrade to a paid plan
- Check limits at: [EmailJS Pricing](https://www.emailjs.com/pricing/)

---

## 🔧 Troubleshooting

### Email not received?

1. **Check spam folder** in `rimaorganiccosmetics@gmail.com`
2. **Verify Service ID, Template ID, and Public Key** are correctly entered
3. **Check browser console** for error messages:
   - Press F12 in browser
   - Go to "Console" tab
   - Look for EmailJS errors
4. **Verify Gmail connection**:
   - Go to EmailJS dashboard → Email Services
   - Make sure your Gmail is still connected
5. **Check template variables**:
   - Make sure all variables like `{{order_id}}`, `{{customer_name}}`, etc. are spelled correctly

### Common Errors:

**Error: "Invalid public key"**
- Double-check you copied the Public Key correctly from EmailJS Account settings

**Error: "Template not found"**
- Verify the Template ID is correct
- Make sure the template is saved in EmailJS

**Error: "Service not found"**
- Verify the Service ID is correct
- Check if Gmail is still connected in EmailJS dashboard

---

## 🔒 Security Note

- EmailJS Public Key is safe to use in frontend code
- It's designed to be public and used in client-side applications
- Your Gmail password is NEVER exposed
- EmailJS handles authentication securely

---

## 📞 Support

If you need help:

1. **EmailJS Documentation**: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. **EmailJS Support**: Available in their dashboard
3. **Test Mode**: EmailJS has a test feature in dashboard to verify templates

---

## ✨ Summary of What You Need

After completing the setup, you'll have these three values:

1. **Service ID**: `service_xxxxxxx` (from Email Services)
2. **Template ID**: `template_xxxxxxx` (from Email Templates)  
3. **Public Key**: `xxxxxxxxxx` (from Account → API Keys)

Replace these three values in `/pages/CheckoutPage.tsx` and you're done! 🎉

---

## 🌟 Benefits of Using EmailJS

✅ No backend required - works directly from frontend  
✅ Free plan includes 200 emails/month  
✅ Real-time email notifications  
✅ Easy to set up and maintain  
✅ Secure - Gmail credentials never exposed  
✅ Customizable email templates  
✅ Reliable delivery  

---

**Need help?** Feel free to reach out or check the EmailJS documentation!

Happy selling! 🌿💚
