# 📊 EmailJS Flow Diagram

## 🔄 Complete Order Flow with EmailJS

```
┌─────────────────────────────────────────────────────────────────┐
│                         CUSTOMER JOURNEY                         │
└─────────────────────────────────────────────────────────────────┘

1. Customer Browses Website
   │
   ├──> Views Products Page
   │
   ├──> Selects Product
   │
   ├──> Clicks "Add to Cart"
   │
   └──> Cart Updated ✓

                    ↓

2. Customer Goes to Cart
   │
   ├──> Reviews Items
   │
   ├──> Clicks "Proceed to Checkout"
   │
   └──> Redirected to Checkout Page

                    ↓

3. Customer Fills Checkout Form
   │
   ├──> Full Name
   ├──> Phone Number
   ├──> Email Address
   ├──> Street Address
   ├──> City, State, PIN Code
   └──> Country

                    ↓

4. Customer Clicks "Place Order"

┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND PROCESSING STARTS                     │
└─────────────────────────────────────────────────────────────────┘

5. Frontend Validates Form
   │
   ├──> Check required fields
   ├──> Validate phone format
   └──> Validate email format

                    ↓

6. EmailJS Sends Email Notification
   │
   ├──> Prepare order data
   ├──> Format template parameters
   ├──> Call EmailJS API
   └──> Email sent to: rimaorganiccosmetics@gmail.com
   │
   │    ┌──────────────────────────────────────┐
   │    │  EMAIL SENT VIA EMAILJS              │
   │    │  ✉️  To: rimaorganiccosmetics@...    │
   │    │  📋 Subject: New Order - ORD-xxx     │
   │    │  📄 Contains: Customer details       │
   │    │              Order items             │
   │    │              Total amount            │
   │    └──────────────────────────────────────┘
   │
   └──> Email delivered to Gmail inbox ✓

                    ↓
            (Parallel Process)

7. Order Saved to Database
   │
   ├──> Generate Order ID
   ├──> Save to Supabase KV Store
   ├──> Link to user account
   └──> Set status: "pending"

                    ↓

8. Success Response
   │
   ├──> Clear cart
   ├──> Show success message
   └──> Redirect to success page

┌─────────────────────────────────────────────────────────────────┐
│                      BUSINESS OWNER SIDE                         │
└─────────────────────────────────────────────────────────────────┘

9. Business Owner Receives Email
   │
   ├──> Check rimaorganiccosmetics@gmail.com
   │
   └──> See new order notification ✉️

                    ↓

10. Review Order Details
    │
    ├──> Customer: [Name]
    ├──> Phone: [Number]
    ├──> Address: [Full Address]
    ├──> Products: [List]
    └──> Total: ₹[Amount]

                    ↓

11. Contact Customer via WhatsApp
    │
    ├──> Click on phone number
    ├──> Open WhatsApp
    └──> Send message to customer

                    ↓

12. Confirm Payment & Delivery
    │
    ├──> Discuss WhatsApp Pay
    ├──> Confirm delivery address
    ├──> Set delivery date
    └──> Answer customer questions

                    ↓

13. Process Order
    │
    ├──> Prepare products
    ├──> Pack order
    ├──> Update status in admin panel
    └──> Ship to customer

                    ↓

14. Complete! ✅
```

---

## 🔧 EmailJS Technical Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    EMAILJS SENDING PROCESS                       │
└─────────────────────────────────────────────────────────────────┘

Frontend (CheckoutPage.tsx)
         │
         │  1. Order submitted
         ↓
┌─────────────────────────┐
│  Prepare Template Params │
│  ├─ order_id            │
│  ├─ customer_name       │
│  ├─ customer_phone      │
│  ├─ customer_email      │
│  ├─ customer_address    │
│  ├─ order_items         │
│  └─ total_amount        │
└─────────────────────────┘
         │
         │  2. Call EmailJS API
         ↓
┌─────────────────────────┐
│    emailjs.send()       │
│  ├─ SERVICE_ID          │
│  ├─ TEMPLATE_ID         │
│  ├─ templateParams      │
│  └─ PUBLIC_KEY          │
└─────────────────────────┘
         │
         │  3. EmailJS processes
         ↓
┌─────────────────────────┐
│  EmailJS Cloud Service  │
│  ├─ Authenticate        │
│  ├─ Load template       │
│  ├─ Merge data          │
│  └─ Send via Gmail      │
└─────────────────────────┘
         │
         │  4. Delivered
         ↓
┌─────────────────────────┐
│     Gmail Inbox         │
│  rimaorganiccosmetics   │
│  @gmail.com             │
│  ✉️  New Order Email    │
└─────────────────────────┘
```

---

## 🎯 Data Flow Diagram

```
┌──────────────┐
│   Customer   │
│   Browser    │
└──────┬───────┘
       │
       │ Fills Form
       │
       ↓
┌──────────────┐
│  Checkout    │
│    Page      │
└──────┬───────┘
       │
       ├──────────────────────┐
       │                      │
       ↓                      ↓
┌──────────────┐      ┌──────────────┐
│   EmailJS    │      │  Supabase    │
│    API       │      │  Database    │
└──────┬───────┘      └──────┬───────┘
       │                      │
       │                      │
       ↓                      ↓
┌──────────────┐      ┌──────────────┐
│    Gmail     │      │  Order       │
│   Inbox      │      │  Stored      │
└──────────────┘      └──────────────┘
       │
       │ Business Owner
       │ Checks Email
       ↓
┌──────────────┐
│  Contact     │
│  Customer    │
│  (WhatsApp)  │
└──────────────┘
```

---

## 🔄 Setup Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       SETUP PROCESS                              │
└─────────────────────────────────────────────────────────────────┘

Step 1: EmailJS Account
   │
   ├──> Go to emailjs.com
   ├──> Sign up
   └──> Verify email
         │
         ↓
Step 2: Connect Gmail
   │
   ├──> Add Email Service
   ├──> Choose Gmail
   ├──> Authenticate
   └──> Get SERVICE_ID ✓
         │
         ↓
Step 3: Create Template
   │
   ├──> Add Email Template
   ├──> Design template
   ├──> Add variables
   └──> Get TEMPLATE_ID ✓
         │
         ↓
Step 4: Get Public Key
   │
   ├──> Go to Account
   ├──> Find API Keys
   └──> Get PUBLIC_KEY ✓
         │
         ↓
Step 5: Update Config
   │
   ├──> Open /utils/emailjs-config.ts
   ├──> Replace SERVICE_ID
   ├──> Replace TEMPLATE_ID
   ├──> Replace PUBLIC_KEY
   └──> Save file ✓
         │
         ↓
Step 6: Test
   │
   ├──> Place test order
   ├──> Check email
   └──> Success! ✅
```

---

## 📧 Email Template Processing

```
┌─────────────────────────────────────────────────────────────────┐
│              HOW TEMPLATE VARIABLES ARE REPLACED                 │
└─────────────────────────────────────────────────────────────────┘

Template Content:
┌─────────────────────────┐
│ Order ID: {{order_id}}  │
│ Customer: {{customer_   │
│           name}}        │
│ Phone: {{customer_      │
│        phone}}          │
└─────────────────────────┘
         │
         │ EmailJS merges data
         ↓
Actual Email:
┌─────────────────────────┐
│ Order ID: ORD-17024567  │
│ Customer: Priya Sharma  │
│ Phone: 9876543210       │
└─────────────────────────┘
```

---

## 🔒 Security Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                             │
└─────────────────────────────────────────────────────────────────┘

Frontend
    │
    ├──> PUBLIC_KEY (Safe to expose)
    │    ✓ Designed for client-side
    │
    └──> No sensitive credentials
             │
             ↓
EmailJS Cloud
    │
    ├──> Authenticates request
    ├──> Validates PUBLIC_KEY
    ├──> Checks rate limits
    │
    └──> Uses OAuth for Gmail
             │
             ↓
Gmail
    │
    ├──> Encrypted connection
    ├──> OAuth token (not password)
    └──> Secure delivery
             │
             ↓
Email Inbox ✅
```

---

## 📊 Error Handling Flow

```
Order Submission
    │
    ├──> Try to send email
    │    │
    │    ├──> Success ✅
    │    │    │
    │    │    └──> Log success
    │    │
    │    └──> Failure ❌
    │         │
    │         ├──> Log error
    │         ├──> Continue order process
    │         └──> Don't block checkout
    │
    └──> Save order to database
         │
         ├──> Success ✅
         │    │
         │    └──> Redirect to success page
         │
         └──> Failure ❌
              │
              └──> Show error message
```

---

## 🎯 Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FULL SYSTEM OVERVIEW                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   Frontend   │
│   React +    │
│   Vite       │
└──────┬───────┘
       │
       ├─────────────────────────┬────────────────────────┐
       │                         │                        │
       │                         │                        │
       ↓                         ↓                        ↓
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│   EmailJS    │        │  Supabase    │        │  WhatsApp    │
│   Email      │        │  Database    │        │  Business    │
│   Service    │        │  + Auth      │        │  Contact     │
└──────┬───────┘        └──────┬───────┘        └──────────────┘
       │                       │
       │                       │
       ↓                       ↓
┌──────────────┐        ┌──────────────┐
│    Gmail     │        │   Orders     │
│   Inbox      │        │   Stored     │
│              │        │              │
│ Business     │        │ Admin can    │
│ Owner sees   │        │ manage       │
└──────────────┘        └──────────────┘
```

---

## 📱 User Experience Flow

```
Customer Journey:
├─ 1. Browse Products (Homepage)
├─ 2. View Product Details
├─ 3. Add to Cart
├─ 4. Review Cart
├─ 5. Go to Checkout
├─ 6. Fill Shipping Details
├─ 7. Place Order
├─ 8. See Success Message
└─ 9. Receive WhatsApp from Business Owner

Business Owner Journey:
├─ 1. Receive Email Notification
├─ 2. Review Order Details
├─ 3. Contact Customer on WhatsApp
├─ 4. Confirm Payment
├─ 5. Verify Address
├─ 6. Process Order
├─ 7. Update Status in Admin
└─ 8. Ship Products
```

---

## 🎯 Quick Reference

### What Triggers Email?
- Customer clicks "Place Order"
- Form is valid
- EmailJS is configured

### What's in the Email?
- Order ID
- Customer details (name, phone, email, address)
- Product list with quantities
- Total amount

### Where Does Email Go?
- **To**: rimaorganiccosmetics@gmail.com
- **Delivery**: Within 1-2 seconds
- **Check**: Inbox or Spam folder

### What Happens After?
1. Business owner sees email
2. Contacts customer via WhatsApp
3. Confirms payment and delivery
4. Processes order

---

**This diagram shows the complete flow from customer order to business owner action!**

For implementation details, see: `/EMAILJS_IMPLEMENTATION_SUMMARY.md`
