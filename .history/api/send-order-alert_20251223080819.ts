import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const BUSINESS_OWNER_EMAIL = 'rimaorganiccosmetics@gmail.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Resend API key not set' });
  }

  const {
    order_id,
    customer_name,
    customer_phone,
    customer_email,
    customer_address,
    customer_city,
    customer_state,
    customer_pincode,
    customer_country,
    order_items,
    total_amount,
    order_date,
  } = req.body;

  if (!order_id || !customer_name || !total_amount) {
    return res.status(400).json({ error: 'Missing required order data' });
  }

  const formattedItems = Array.isArray(order_items)
    ? order_items.map(
        (item: any) => `• ${item.name} x ${item.quantity}`
      ).join('\n')
    : order_items;

  try {
    await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'Rima Organic Cosmetics <onboarding@resend.dev>', // ✅ REQUIRED
        to: [BUSINESS_OWNER_EMAIL],
        subject: `🛒 New Order Alert - ${order_id}`,
        html: `
          <h2>New Order Received</h2>
          <p><strong>Order ID:</strong> ${order_id}</p>
          <p><strong>Name:</strong> ${customer_name}</p>
          <p><strong>Phone:</strong> ${customer_phone}</p>
          <p><strong>Email:</strong> ${customer_email}</p>
          <p><strong>Address:</strong><br/>
             ${customer_address},<br/>
             ${customer_city}, ${customer_state},<br/>
             ${customer_pincode}, ${customer_country}
          </p>
          <h3>Order Items</h3>
          <pre>${formattedItems}</pre>
          <h3>Total Amount: ₹${total_amount}</h3>
          <p>Order Date: ${order_date}</p>
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Resend error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

