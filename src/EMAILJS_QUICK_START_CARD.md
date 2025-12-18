# 🚀 EmailJS Quick Start Card

**Print this or keep it open while setting up!**

---

## ⚡ 5-Minute Setup

### Step 1: Create Account (1 min)
```
→ Go to: emailjs.com
→ Sign up with: rimaorganiccosmetics@gmail.com
→ Verify email
```

### Step 2: Connect Gmail (1 min)
```
→ Dashboard → Email Services → Add New Service
→ Choose Gmail
→ Connect account
→ COPY SERVICE ID: ___________________
```

### Step 3: Create Template (2 min)
```
→ Dashboard → Email Templates → Create New Template
→ Name: order_notification
→ To: rimaorganiccosmetics@gmail.com
→ Subject: 🛍️ New Order - {{order_id}}
→ Content: Use template from docs
→ COPY TEMPLATE ID: ___________________
```

### Step 4: Get Public Key (30 sec)
```
→ Dashboard → Account → API Keys
→ COPY PUBLIC KEY: ___________________
```

### Step 5: Update Config (30 sec)
```
→ Open: /utils/emailjs-config.ts
→ Replace:
   SERVICE_ID: 'service_abc1234'
   TEMPLATE_ID: 'template_xyz5678'
   PUBLIC_KEY: 'AbC1234XyZ'
→ Save file
```

---

## ✅ Quick Test

```
1. Add product to cart
2. Go to checkout
3. Fill details
4. Place order
5. Check: rimaorganiccosmetics@gmail.com
6. Success! ✓
```

---

## 📝 Your Credentials

Fill this in as you go:

```
Service ID:   _______________________________

Template ID:  _______________________________

Public Key:   _______________________________
```

---

## 🎯 File to Edit

**One file only:**
```
/utils/emailjs-config.ts
```

Replace these three lines:
```typescript
SERVICE_ID: 'YOUR_SERVICE_ID',    // ← Your Service ID
TEMPLATE_ID: 'YOUR_TEMPLATE_ID',  // ← Your Template ID
PUBLIC_KEY: 'YOUR_PUBLIC_KEY',    // ← Your Public Key
```

---

## 📧 What You'll Receive

Every order triggers an email with:
- ✅ Order ID
- ✅ Customer name
- ✅ Phone number
- ✅ Email address
- ✅ Complete address
- ✅ Order items
- ✅ Total amount

Delivered to: **rimaorganiccosmetics@gmail.com**

---

## 🆘 Quick Fixes

| Problem | Solution |
|---------|----------|
| Email not received | Check spam folder |
| Invalid key | Re-copy from EmailJS |
| Template not found | Check Template ID |
| Service error | Verify Gmail connected |

---

## 🔗 Quick Links

- **EmailJS Dashboard**: dashboard.emailjs.com
- **Full Guide**: /EMAILJS_SETUP_GUIDE.md
- **Template Content**: /EMAILJS_TEMPLATE_CONTENT.md

---

## 📱 Mobile Setup Tip

If setting up on mobile:
1. Use desktop/laptop (easier)
2. Or use desktop mode in mobile browser
3. EmailJS dashboard works best on desktop

---

## ⏱️ Time Breakdown

```
Account Creation    1 min
Gmail Connection    1 min
Template Creation   2 min
Get Public Key      30 sec
Update Config       30 sec
─────────────────────────
Total              5 min
```

---

## ✨ Benefits

- No backend required
- 200 free emails/month
- Instant delivery
- Professional templates
- Secure Gmail connection

---

## 🎯 Next Steps

After setup:
1. ✅ Test immediately
2. ✅ Save credentials
3. ✅ Mark emails "Not Spam"
4. ✅ Bookmark EmailJS dashboard

---

## 💡 Remember

- Public Key is SAFE to use in frontend
- Gmail password is NEVER exposed
- Order still works if email fails
- Check spam folder first time

---

## 🎊 You're Done When...

- [x] Can place order successfully
- [x] Email arrives at business email
- [x] Email contains all customer details
- [x] No errors in browser console

---

**Need detailed help?**  
See: `/SETUP_EMAILJS_NOW.md`

**Ready? Let's go!** 🚀
