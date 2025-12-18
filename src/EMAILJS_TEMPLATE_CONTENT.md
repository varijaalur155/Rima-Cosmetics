# EmailJS Template Content - Copy & Paste Ready

Use this content when creating your EmailJS email template.

---

## 📧 Template Configuration

### Basic Settings:
- **Template Name**: `order_notification`
- **To Email**: `rimaorganiccosmetics@gmail.com`
- **From Name**: `Rima Cosmetics Website`
- **Reply To**: `{{customer_email}}`

---

## 📝 Subject Line

Copy this exactly:

```
🛍️ New Order Received - {{order_id}}
```

---

## 📄 Email Content (Plain Text Version)

If you prefer plain text email, copy this:

```
═══════════════════════════════════════════════
🛍️ NEW ORDER RECEIVED - RIMA COSMETICS
═══════════════════════════════════════════════

ORDER DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order ID: {{order_id}}
Order Date: {{order_date}}
Payment Method: WhatsApp Pay
Status: PENDING

CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name: {{customer_name}}
Email: {{customer_email}}
Phone Number: {{customer_phone}}

SHIPPING ADDRESS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Address: {{customer_address}}
City: {{customer_city}}
State: {{customer_state}}
PIN Code: {{customer_pincode}}
Country: {{customer_country}}

ORDERED PRODUCTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{order_items}}

TOTAL AMOUNT: ₹{{total_amount}}

═══════════════════════════════════════════════
📞 ACTION REQUIRED
═══════════════════════════════════════════════

Please contact the customer via WhatsApp:
Phone: {{customer_phone}}

Next Steps:
1. Contact customer on WhatsApp
2. Confirm payment via WhatsApp Pay
3. Confirm delivery address
4. Process the order
5. Update order status in admin panel

═══════════════════════════════════════════════
Thank you for using Rima Cosmetics!
100% Organic Handmade Cosmetics 🌿
═══════════════════════════════════════════════
```

---

## 🎨 Email Content (HTML Version - RECOMMENDED)

For better formatting and professional look, copy this HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order - {{order_id}}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f3f4f6;
      color: #1f2937;
    }
    .email-container {
      max-width: 650px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 30px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 14px;
      opacity: 0.95;
    }
    .content-section {
      padding: 25px;
      background-color: #ffffff;
    }
    .section-title {
      color: #059669;
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 15px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #d1fae5;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .info-table td {
      padding: 10px 5px;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-table td:first-child {
      font-weight: 600;
      color: #4b5563;
      width: 35%;
    }
    .info-table td:last-child {
      color: #1f2937;
    }
    .products-box {
      background-color: #f9fafb;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #10b981;
      margin: 15px 0;
    }
    .products-box pre {
      margin: 0;
      white-space: pre-wrap;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.8;
      color: #1f2937;
    }
    .total-amount {
      text-align: right;
      font-size: 24px;
      font-weight: bold;
      color: #059669;
      margin: 15px 0;
      padding: 15px;
      background-color: #ecfdf5;
      border-radius: 8px;
    }
    .action-box {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border: 2px solid #fbbf24;
    }
    .action-box h3 {
      margin: 0 0 12px 0;
      color: #92400e;
      font-size: 18px;
    }
    .action-box p {
      margin: 8px 0;
      color: #78350f;
      line-height: 1.6;
    }
    .whatsapp-button {
      display: inline-block;
      background-color: #25D366;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin-top: 10px;
    }
    .footer {
      background-color: #1f2937;
      color: #d1d5db;
      padding: 20px;
      text-align: center;
      font-size: 13px;
    }
    .footer p {
      margin: 5px 0;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
      background-color: #fbbf24;
      color: #78350f;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <h1>🛍️ New Order Received!</h1>
      <p>Rima Cosmetics - 100% Organic Handmade Products</p>
    </div>

    <!-- Order Details Section -->
    <div class="content-section">
      <h2 class="section-title">📋 Order Information</h2>
      <table class="info-table">
        <tr>
          <td>Order ID:</td>
          <td><strong>{{order_id}}</strong></td>
        </tr>
        <tr>
          <td>Order Date:</td>
          <td>{{order_date}}</td>
        </tr>
        <tr>
          <td>Payment Method:</td>
          <td>WhatsApp Pay</td>
        </tr>
        <tr>
          <td>Status:</td>
          <td><span class="badge">PENDING</span></td>
        </tr>
      </table>
    </div>

    <!-- Customer Details Section -->
    <div class="content-section" style="background-color: #f9fafb;">
      <h2 class="section-title">👤 Customer Details</h2>
      <table class="info-table">
        <tr>
          <td>Full Name:</td>
          <td><strong>{{customer_name}}</strong></td>
        </tr>
        <tr>
          <td>Email Address:</td>
          <td>{{customer_email}}</td>
        </tr>
        <tr>
          <td>Phone Number:</td>
          <td><strong>{{customer_phone}}</strong></td>
        </tr>
        <tr>
          <td>Address:</td>
          <td>{{customer_address}}</td>
        </tr>
        <tr>
          <td>City:</td>
          <td>{{customer_city}}</td>
        </tr>
        <tr>
          <td>State:</td>
          <td>{{customer_state}}</td>
        </tr>
        <tr>
          <td>PIN Code:</td>
          <td>{{customer_pincode}}</td>
        </tr>
        <tr>
          <td>Country:</td>
          <td>{{customer_country}}</td>
        </tr>
      </table>
    </div>

    <!-- Products Section -->
    <div class="content-section">
      <h2 class="section-title">📦 Ordered Products</h2>
      <div class="products-box">
        <pre>{{order_items}}</pre>
      </div>
      <div class="total-amount">
        Total Amount: ₹{{total_amount}}
      </div>
    </div>

    <!-- Action Required Section -->
    <div class="content-section">
      <div class="action-box">
        <h3>📞 Action Required</h3>
        <p><strong>Please contact the customer immediately:</strong></p>
        <p>WhatsApp Number: <strong>{{customer_phone}}</strong></p>
        <p><strong>Next Steps:</strong></p>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Contact customer on WhatsApp</li>
          <li>Confirm payment via WhatsApp Pay</li>
          <li>Verify delivery address</li>
          <li>Process and pack the order</li>
          <li>Update order status in admin panel</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>Rima Cosmetics</strong></p>
      <p>100% Organic Handmade Cosmetics 🌿</p>
      <p>Chennai, Tamil Nadu, India</p>
      <p style="margin-top: 12px; opacity: 0.8;">
        This is an automated notification from your Rima Cosmetics website.
      </p>
    </div>
  </div>
</body>
</html>
```

---

## 🎯 How to Use This Template

### Option 1: Plain Text (Simple)
1. In EmailJS template editor, select **"Plain Text"** format
2. Copy the Plain Text Version above
3. Paste into the content area
4. Save

### Option 2: HTML (Recommended - Professional Look)
1. In EmailJS template editor, select **"HTML"** format
2. Copy the HTML Version above
3. Paste into the content area
4. Click "Preview" to see how it looks
5. Save

---

## ✅ Template Variables Used

Make sure these variables are available in your template:

- `{{order_id}}` - Unique order identifier
- `{{order_date}}` - Date and time of order
- `{{customer_name}}` - Customer's full name
- `{{customer_email}}` - Customer's email address
- `{{customer_phone}}` - Customer's phone number
- `{{customer_address}}` - Street address
- `{{customer_city}}` - City name
- `{{customer_state}}` - State name
- `{{customer_pincode}}` - PIN code
- `{{customer_country}}` - Country name
- `{{order_items}}` - List of products with quantities
- `{{total_amount}}` - Total order amount

All these variables are automatically populated from the checkout page!

---

## 💡 Customization Tips

You can customize:
- Colors (change `#10b981` to your brand color)
- Logo (add an image URL in the header)
- Footer text
- Company information
- Action items list
- Font styles

---

## 📧 Email Preview

When a customer places an order, you'll receive:

**Subject**: 🛍️ New Order Received - ORD-1702456789000

**Content will show**:
- Order ID and date
- Customer's complete details
- All products ordered
- Total amount
- Action required section with WhatsApp contact info

---

## 🔄 Testing Your Template

After creating the template:
1. Go to EmailJS dashboard
2. Find your template
3. Click "Test It" button
4. Fill in test values
5. Send test email to verify formatting

---

**Ready to use!** Just copy the content you prefer and paste it into your EmailJS template! 🎉
