import { Hono } from 'https://deno.land/x/hono/mod.ts'

console.log('Imports completed.');

interface Env {
  MAILING_LIST_EMAIL: string;
  RENDER_API_KEY: string;
}

const app = new Hono()

app.options('/*', (c) => {
  return c.text('', 204, {
    'Access-Control-Allow-Origin': '*'
  });
})

app.post('/', async (c) => {
  console.log('Edge Function Invoked');
  const { MAILING_LIST_EMAIL, RENDER_API_KEY } = c.env as Env;
  console.log('Environment Variables Loaded:', { MAILING_LIST_EMAIL: !!MAILING_LIST_EMAIL, RENDER_API_KEY: !!RENDER_API_KEY });
  
  if (!MAILING_LIST_EMAIL || !RENDER_API_KEY) {
    return c.json({ error: 'Missing Mailjet or Business Owner email environment variables' }, 500);
  }

  try {
    console.log('Attempting to parse request body...');
    const { order, customerDetails } = await c.req.json();
    console.log('Request body parsed successfully.');

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

    const renderEndpoint = `https://api.render.com/v1/emails/send`;

    console.log('Attempting to send email via fetch to Render API...');
    const response = await fetch(renderEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RENDER_API_KEY}`,
      },
      body: JSON.stringify({
        from: MAILING_LIST_EMAIL,
        to: MAILING_LIST_EMAIL, // Send to business owner
        subject: `New Order Received: #${order.id}`,
        html: emailHtml,
      }),
    });

    console.log('Render API raw response status:', response.status);
    const responseBody = await response.json();
    console.log('Render API raw response body:', responseBody);

    if (!response.ok) {
      throw new Error(`Render API error: ${response.status} - ${JSON.stringify(responseBody)}`);
    }

    return c.json({ message: 'Email sent successfully!', renderResponse: responseBody });
  } catch (error: any) {
    console.error('Error sending email:', error.message);
    return c.json({ error: 'Failed to send email', details: error.message }, 500);
  }
});

