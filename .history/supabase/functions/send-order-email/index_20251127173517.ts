import { serve } from 'npm:@hono/node-server'
import { Hono } from 'npm:hono'
// Use direct fetch to Mailjet API (avoid node-only `node-mailjet` package)

interface Env {
  MAILING_LIST_EMAIL: string;
  MAILJET_API_KEY: string;
  MAILJET_SECRET_KEY: string;
}

const app = new Hono()

app.options('/', (c) => {
  return c.text('', 204, {
    'Access-Control-Allow-Origin': '*'
  });
})

app.post('/', async (c) => {
  console.log('Edge Function Invoked');
  const { MAILING_LIST_EMAIL, MAILJET_API_KEY, MAILJET_SECRET_KEY } = c.env as Env;
  console.log('Environment Variables Loaded:', { MAILING_LIST_EMAIL: !!MAILING_LIST_EMAIL, MAILJET_API_KEY: !!MAILJET_API_KEY, MAILJET_SECRET_KEY: !!MAILJET_SECRET_KEY });

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (!MAILING_LIST_EMAIL || !MAILJET_API_KEY || !MAILJET_SECRET_KEY) {
    return c.json({ error: 'Missing Mailjet or Business Owner email environment variables' }, 500, corsHeaders);
  }

  let payloadBody: any;
  try {
    payloadBody = await c.req.json();
  } catch (err: any) {
    console.error('Invalid JSON body:', err?.message || err);
    return c.json({ error: 'Invalid JSON body' }, 400, corsHeaders);
  }

  try {
    const { order, customerDetails } = payloadBody;

    const emailHtml = `
      <h1>New Order Confirmation</h1>
      <p>A new order has been placed on Rima Cosmetics.</p>
      <h2>Customer Details:</h2>
      <ul>
        <li><strong>Full Name:</strong> ${customerDetails?.fullName || 'N/A'}</li>
        <li><strong>Phone Number:</strong> ${customerDetails?.phone || 'N/A'}</li>
        <li><strong>Address:</strong> ${customerDetails?.address || ''} ${customerDetails?.city || ''} ${customerDetails?.state || ''} - ${customerDetails?.pincode || ''}</li>
      </ul>
      <h2>Order Details:</h2>
      <p><strong>Order ID:</strong> ${order?.id || 'N/A'}</p>
      <p><strong>Total:</strong> ₹${order?.total || '0'}</p>
      <h3>Items:</h3>
      <ul>
        ${Array.isArray(order?.items) ? order.items.map((item: any) => `
          <li>${item.product?.name || 'Item'} x ${item.quantity || 0} (₹${(item.product?.price || 0) * (item.quantity || 0)})</li>
        `).join('') : ''}
      </ul>
      <p><strong>Payment Method:</strong> ${order?.paymentMethod || 'N/A'}</p>
      <p><strong>Status:</strong> ${order?.status || 'N/A'}</p>
      <p>Thank you for your business!</p>
    `;

    const mailjetPayload = {
      Messages: [
        {
          From: { Email: MAILING_LIST_EMAIL, Name: 'Rima Cosmetics' },
          To: [{ Email: MAILING_LIST_EMAIL, Name: 'Business Owner' }],
          Subject: `New Order Received: #${order?.id || 'N/A'}`,
          HTMLPart: emailHtml
        }
      ]
    };

    const auth = 'Basic ' + btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`);
    const resp = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify(mailjetPayload)
    });

    const respJson = await resp.json().catch(() => null);
    console.log('Mailjet response status:', resp.status, 'body:', respJson);

    if (!resp.ok) {
      return c.json({ error: 'Mailjet API error', details: respJson }, resp.status || 500, corsHeaders);
    }

    return c.json({ message: 'Email sent successfully!', details: respJson }, 200, corsHeaders);
  } catch (error: any) {
    console.error('Error sending email:', error?.message || error);
    return c.json({ error: 'Failed to send email' }, 500, corsHeaders);
  }
});

serve(app)
