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

  const emailBody = `New Order Received!\n\nOrder ID: ${order_id}\nName: ${customer_name}\nPhone: ${customer_phone}\nEmail: ${customer_email}\nAddress: ${customer_address}, ${customer_city}, ${customer_state}, ${customer_pincode}, ${customer_country}\n\nOrder Items:\n${order_items}\n\nTotal Amount: ₹${total_amount}\nOrder Date: ${order_date}`;

  try {
    await axios.post('https://api.resend.com/emails', {
      from: 'Order Alerts <noreply@rimaorganiccosmetics.com>',
      to: [BUSINESS_OWNER_EMAIL],
      subject: `New Order Alert - ${order_id}`,
      text: emailBody,
    }, {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}
