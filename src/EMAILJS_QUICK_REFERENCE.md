# EmailJS Quick Reference Card

## 🎯 Quick Setup Checklist

- [ ] Create EmailJS account at [https://www.emailjs.com/](https://www.emailjs.com/)
- [ ] Connect Gmail service (`rimaorganiccosmetics@gmail.com`)
- [ ] Create email template for order notifications
- [ ] Get Service ID, Template ID, and Public Key
- [ ] Update `/pages/CheckoutPage.tsx` with your credentials
- [ ] Test by placing an order

---

## 📋 Three Values You Need

After EmailJS setup, you'll have:

```javascript
Service ID:   'service_xxxxxxx'    // From Email Services
Template ID:  'template_xxxxxxx'   // From Email Templates  
Public Key:   'xxxxxxxxxx'         // From Account → API Keys
```

---

## 🔧 Where to Update in Your Project

**File**: `/pages/CheckoutPage.tsx`

**Find this code** (around line 86-91):

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',  // Replace with your EmailJS Service ID
  'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
  templateParams,
  'YOUR_PUBLIC_KEY'   // Replace with your EmailJS Public Key
);
```

**Replace with your actual values**:

```javascript
await emailjs.send(
  'service_abc1234',  // Your actual Service ID
  'template_xyz5678', // Your actual Template ID
  templateParams,
  'AbC1234XyZ'        // Your actual Public Key
);
```

---

## 📧 Email Recipient

All order notifications will be sent to:
**rimaorganiccosmetics@gmail.com**

---

## 📊 What Data is Sent

### Customer Details:
- Full Name
- Phone Number  
- Email Address
- Complete Address (Street, City, State, Pin Code, Country)

### Order Details:
- Order ID
- Order Date & Time
- List of Products with Quantities
- Total Amount
- Payment Method (WhatsApp Pay)

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Email not received | Check spam folder first |
| Invalid public key | Copy Public Key again from EmailJS Account |
| Template not found | Verify Template ID is correct |
| Service not found | Check if Gmail is still connected |
| Console errors | Open browser console (F12) to see error details |

---

## ✅ Testing Steps

1. Add product to cart
2. Go to checkout page
3. Fill in shipping details
4. Click "Place Order"
5. Check email: `rimaorganiccosmetics@gmail.com`

---

## 📱 Template Variables Available

Use these in your EmailJS template:

```
{{order_id}}           - Order ID (e.g., ORD-1234567890)
{{order_date}}         - Order date and time
{{customer_name}}      - Customer's full name
{{customer_phone}}     - Customer's phone number
{{customer_email}}     - Customer's email
{{customer_address}}   - Street address
{{customer_city}}      - City
{{customer_state}}     - State
{{customer_pincode}}   - Pin code
{{customer_country}}   - Country
{{order_items}}        - List of ordered products
{{total_amount}}       - Total order amount in ₹
```

---

## 🎨 Email Template Location

**EmailJS Dashboard** → **Email Templates** → **order_notification**

You can edit:
- Subject line
- HTML content
- Styling
- Recipient email
- Reply-to settings

---

## 📊 Free Plan Limits

- **200 emails per month**
- Sufficient for small to medium businesses
- Upgrade available if needed

---

## 🔗 Useful Links

- EmailJS Dashboard: [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
- Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Pricing: [https://www.emailjs.com/pricing/](https://www.emailjs.com/pricing/)

---

## 💡 Pro Tips

✅ Add EmailJS to your browser bookmarks  
✅ Save your Service ID, Template ID, and Public Key in a secure note  
✅ Test template changes before deploying  
✅ Keep spam folder checked for first few orders  
✅ Mark emails as "Not Spam" to ensure future delivery to inbox  

---

## 🎯 Need Full Guide?

See: **EMAILJS_SETUP_GUIDE.md** for detailed step-by-step instructions with screenshots descriptions.

---

**Quick Support**: If stuck, check browser console (F12) for error messages!
