import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serve } from 'npm:@hono/node-server'
import { Hono } from 'npm:hono'

interface Env {
  MAILING_LIST_EMAIL: string;
  MAILJET_API_KEY: string;
  MAILJET_SECRET_KEY: string;
}

const app = new Hono()

app.post('/', async (c) => {
  const { MAILING_LIST_EMAIL, MAILJET_API_KEY, MAILJET_SECRET_KEY } = c.env as Env;

  if (!MAILING_LIST_EMAIL || !MAILJET_API_KEY || !MAILJET_SECRET_KEY) {
    return c.json({ error: 'Missing Mailjet or Business Owner email environment variables' }, 500);
  }

  try {
    const { order, customerDetails } = await c.req.json();

    const emailHtml = `
      <h1>New Order Confirmation</h1>
      <p>A new order has been placed on Rima Cosmetics.</p>
      <h2>Customer Details:</h2>
      <ul>
        <li><strong>Full Name:</strong> ${customerDetails.fullName}</li>
        <li><strong>Phone Number:</strong> ${customerDetails.phone}</li>
        <li><strong>Address:</strong> ${customerDetails.address}, ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.pincode}</li>
      </ul>
      <h2>Order Details:</h2>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <h3>Items:</h3>
      <ul>
        ${order.items.map((item: any) => `
          <li>${item.product.name} x ${item.quantity} (₹${item.product.price * item.quantity})</li>
        `).join('')}
      </ul>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <p>Thank you for your business!</p>
    `;

    const mjBody = {
      Messages: [
        {
          From: { Email: MAILING_LIST_EMAIL, Name: 'Rima Cosmetics' },
          To: [{ Email: MAILING_LIST_EMAIL, Name: 'Business Owner' }],
          Subject: `New Order Received: #${order.id}`,
          HTMLPart: emailHtml,
        },
      ],
    };

    const auth = 'Basic ' + btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`);

    const res = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body: JSON.stringify(mjBody),
    });

    const result = await res.json();
    if (!res.ok) {
      console.error('Mailjet API error', result);
      return c.json({ error: 'Mailjet API error', detail: result }, 500);
    }

    console.log('Mailjet response', result);
    return c.json({ message: 'Email sent successfully!', detail: result });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return c.json({ error: 'Failed to send email', detail: String(error) }, 500);
  }
});

serve(app)
