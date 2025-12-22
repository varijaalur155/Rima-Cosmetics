// resend-email.ts
// Utility to send order alert emails using Resend API
import axios from 'axios';

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
const BUSINESS_OWNER_EMAIL = 'rimaorganiccosmetics@gmail.com';

export interface OrderAlertParams {
  order_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_pincode: string;
  customer_country: string;
  order_items: string;
  total_amount: number;
  order_date: string;
}

export async function sendOrderAlertEmail(params: OrderAlertParams) {
  if (!RESEND_API_KEY) {
    throw new Error('Resend API key is not set');
  }

  const emailBody = `New Order Received!\n\nOrder ID: ${params.order_id}\nName: ${params.customer_name}\nPhone: ${params.customer_phone}\nEmail: ${params.customer_email}\nAddress: ${params.customer_address}, ${params.customer_city}, ${params.customer_state}, ${params.customer_pincode}, ${params.customer_country}\n\nOrder Items:\n${params.order_items}\n\nTotal Amount: ₹${params.total_amount}\nOrder Date: ${params.order_date}`;

  await axios.post('https://api.resend.com/emails', {
    from: 'Order Alerts <noreply@rimaorganiccosmetics.com>',
    to: [BUSINESS_OWNER_EMAIL],
    subject: `New Order Alert - ${params.order_id}`,
    text: emailBody,
  }, {
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
}
