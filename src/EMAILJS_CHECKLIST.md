# ✅ EmailJS Setup Checklist

Print this or keep it open while setting up EmailJS!

---

## 📋 Pre-Setup
- [ ] Have access to: **rimaorganiccosmetics@gmail.com**
- [ ] Open: https://www.emailjs.com/
- [ ] Open your project folder

---

## 🔑 Step 1: Create EmailJS Account
- [ ] Go to EmailJS website
- [ ] Sign up with: rimaorganiccosmetics@gmail.com
- [ ] Verify email address
- [ ] Login to dashboard

---

## 📧 Step 2: Connect Gmail Service
- [ ] Click "Email Services" in sidebar
- [ ] Click "Add New Service"
- [ ] Choose "Gmail"
- [ ] Name it: "Rima Gmail Service"
- [ ] Click "Connect Account"
- [ ] Sign in with Gmail
- [ ] Grant permissions
- [ ] **SAVE SERVICE ID**: ________________

---

## 📝 Step 3: Create Email Template
- [ ] Click "Email Templates" in sidebar
- [ ] Click "Create New Template"
- [ ] Set template name: "order_notification"
- [ ] Set "To" email: rimaorganiccosmetics@gmail.com
- [ ] Set subject: 🛍️ New Order - {{order_id}}
- [ ] Copy content from setup guide
- [ ] Add all template variables
- [ ] Click "Save"
- [ ] **SAVE TEMPLATE ID**: ________________

---

## 🔐 Step 4: Get Public Key
- [ ] Click "Account" in sidebar
- [ ] Scroll to "API Keys" section
- [ ] Find Public Key
- [ ] **SAVE PUBLIC KEY**: ________________

---

## 💻 Step 5: Update Project
- [ ] Open file: `/utils/emailjs-config.ts`
- [ ] Replace SERVICE_ID with your value
- [ ] Replace TEMPLATE_ID with your value
- [ ] Replace PUBLIC_KEY with your value
- [ ] Save the file
- [ ] Refresh your website

---

## 🧪 Step 6: Test
- [ ] Go to your website
- [ ] Add product to cart
- [ ] Go to checkout page
- [ ] Fill in test shipping details:
  - Name: Test Customer
  - Phone: 9876543210
  - Address: 123 Test Street
  - City: Chennai
  - State: Tamil Nadu
  - Pincode: 600001
- [ ] Click "Place Order"
- [ ] Check email: rimaorganiccosmetics@gmail.com
- [ ] Email received? ✅ Success!
- [ ] Check spam folder if not in inbox
- [ ] Mark as "Not Spam" if in spam

---

## ✅ Verification
- [ ] Order placed successfully
- [ ] Email received at business email
- [ ] Email contains customer name
- [ ] Email contains customer phone
- [ ] Email contains customer address
- [ ] Email contains order items
- [ ] Email contains total amount
- [ ] Email contains order ID
- [ ] Email is properly formatted

---

## 🚨 Troubleshooting Checklist
If email not received:
- [ ] Check spam folder
- [ ] Verify Service ID is correct
- [ ] Verify Template ID is correct
- [ ] Verify Public Key is correct
- [ ] Check browser console for errors (F12)
- [ ] Verify Gmail is still connected in EmailJS
- [ ] Try sending test email from EmailJS dashboard
- [ ] Check EmailJS dashboard for delivery status

---

## 📊 Information You Need

| Item | Value | Where to Find |
|------|-------|---------------|
| Service ID | service_____  | Email Services |
| Template ID | template_____ | Email Templates |
| Public Key | _____________ | Account → API Keys |

---

## 🎯 Quick Access Links

- EmailJS Dashboard: https://dashboard.emailjs.com/
- Email Services: https://dashboard.emailjs.com/admin
- Email Templates: https://dashboard.emailjs.com/admin/templates
- Account Settings: https://dashboard.emailjs.com/admin/account

---

## 📱 Template Variables Reference

Use these in your email template:

```
{{order_id}}           - Order ID
{{order_date}}         - Date and time
{{customer_name}}      - Full name
{{customer_phone}}     - Phone number
{{customer_email}}     - Email address
{{customer_address}}   - Street address
{{customer_city}}      - City
{{customer_state}}     - State
{{customer_pincode}}   - PIN code
{{customer_country}}   - Country
{{order_items}}        - List of products
{{total_amount}}       - Total in ₹
```

---

## 💡 Pro Tips

✅ **Test immediately** after setup  
✅ **Save your credentials** in a secure place  
✅ **Bookmark EmailJS dashboard**  
✅ **Check spam folder** for first few emails  
✅ **Mark as "Not Spam"** to ensure inbox delivery  
✅ **Monitor email limit** (200/month on free plan)  

---

## 🎉 Completion

When all items are checked:
- [ ] EmailJS is fully configured
- [ ] Test order email received
- [ ] Credentials saved securely
- [ ] Ready for production use!

---

**Need Help?** 
- See: `/EMAILJS_SETUP_GUIDE.md` for detailed instructions
- See: `/SETUP_EMAILJS_NOW.md` for quick 5-minute guide
- Visit: https://www.emailjs.com/docs/

---

**Congratulations! Your email notifications are working!** 🎊
