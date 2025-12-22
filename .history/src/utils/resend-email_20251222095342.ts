// resend-email.ts
// Utility to send order alert emails using Resend API
import axios from 'axios';

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

// Calls the Vercel serverless function to send the order alert email
export async function sendOrderAlertEmail(params: OrderAlertParams) {
  await axios.post('/api/send-order-alert', params);
}
