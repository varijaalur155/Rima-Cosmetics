import { Hono } from 'npm:hono'

console.log('Imports completed.');

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
  
  if (!MAILING_LIST_EMAIL || !MAILJET_API_KEY || !MAILJET_SECRET_KEY) {
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

    const mailjetEndpoint = 'https://api.mailjet.com/v3.1/send';
    const auth = btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`);

    console.log('Attempting to send email via fetch to Mailjet API...');
    const response = await fetch(mailjetEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: MAILING_LIST_EMAIL,
              Name: 'Rima Cosmetics',
            },
            To: [
              {
                Email: MAILING_LIST_EMAIL, // Send to business owner
                Name: 'Business Owner',
              },
            ],
            Subject: `New Order Received: #${order.id}`,
            HTMLPart: emailHtml,
          },
        ],
      }),
    });

    console.log('Mailjet API raw response status:', response.status);
    const responseBody = await response.json();
    console.log('Mailjet API raw response body:', responseBody);

    if (!response.ok) {
      throw new Error(`Mailjet API error: ${response.status} - ${JSON.stringify(responseBody)}`);
    }

    return c.json({ message: 'Email sent successfully!', mailjetResponse: responseBody });
  } catch (error: any) {
    console.error('Error sending email:', error.message);
    return c.json({ error: 'Failed to send email', details: error.message }, 500);
  }
});

