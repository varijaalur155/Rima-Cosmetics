import { Hono, Context } from 'hono'
import * as kv from '../../../src/supabase/functions/server/kv_store.tsx';
import { Resend } from 'resend';

console.log('Imports completed.');

interface Env {
  MAILING_LIST_EMAIL: string;
  RESEND_API_KEY: string;
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const app = new Hono()

app.options('/*', (c: Context) => {
  return c.text('', 204, {
    'Access-Control-Allow-Origin': '*'
  });
})

app.post('/', async (c: Context) => {
  console.log('Edge Function Invoked');
  const { MAILING_LIST_EMAIL, RESEND_API_KEY } = c.env as unknown as Env;
  console.log('Environment Variables Loaded:', { MAILING_LIST_EMAIL: !!MAILING_LIST_EMAIL, RESEND_API_KEY: !!RESEND_API_KEY });
  
  if (!MAILING_LIST_EMAIL || !RESEND_API_KEY) {
    return c.json({ error: 'Missing Mailjet or Business Owner email environment variables' }, 500);
  }

  try {
    console.log('Attempting to parse request body...');
    const { order, customerDetails } = await c.req.json();
    console.log('Request body parsed successfully.');

    const itemHtmlPromises = order.items.map(async (item: { product_id: string; quantity: number }) => {
      const product = await kv.get(`product:${item.product_id}`);
      if (!product) return '';
      return `<li>${product.name} x ${item.quantity} (₹${product.price * item.quantity})</li>`;
    });
    const itemHtmls = await Promise.all(itemHtmlPromises);
    const joinedItemHtmls = itemHtmls.join('');
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
        ${joinedItemHtmls}
      </ul>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <p>Thank you for your business!</p>
    `;

    console.log('Attempting to send email via Resend API...');
    const { data, error } = await resend.emails.send({
      from: `Rima Cosmetics <${MAILING_LIST_EMAIL}>`,
      to: [MAILING_LIST_EMAIL], // Send to business owner
      subject: `New Order Received: #${order.id}`,
      html: emailHtml,
    });

    console.log('Resend API raw response data:', data);

    if (error) {
      throw new Error(`Resend API error: ${error.name} - ${error.message}`);
    }

    return c.json({ message: 'Email sent successfully!', resendResponse: data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error sending email:', error.message);
      return c.json({ error: 'Failed to send email', details: error.message }, 500);
    }
    console.error('Error sending email: An unknown error occurred');
    return c.json({ error: 'Failed to send email', details: 'An unknown error occurred' }, 500);
  }
});

