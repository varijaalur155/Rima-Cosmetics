import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Helper function to verify user
async function verifyUser(authHeader: string | null) {
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

// Helper function to send email using Resend
async function sendOrderEmail(order: any) {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const businessEmail = Deno.env.get('MAILING_LIST_EMAIL') || 'rimaorganiccosmetics@gmail.com';
    
    if (!resendApiKey) {
      console.log('Error: RESEND_API_KEY not configured');
      return { success: false, error: 'Email service not configured' };
    }

    // Prepare order items HTML
    const itemsHtml = order.items.map((item: any) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.product.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.product.price}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.product.price * item.quantity}</td>
      </tr>
    `).join('');

    // Create email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Order Received - ${order.id}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">New Order Received!</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
            <h2 style="color: #059669; margin-top: 0;">Order Details</h2>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <p><strong>Payment Method:</strong> WhatsApp Pay</p>
            <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #059669;">Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${order.shippingAddress.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;">${order.userEmail || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Mobile:</strong></td>
                <td style="padding: 8px 0;">${order.shippingAddress.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Address:</strong></td>
                <td style="padding: 8px 0;">${order.shippingAddress.address}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>City:</strong></td>
                <td style="padding: 8px 0;">${order.shippingAddress.city || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>State:</strong></td>
                <td style="padding: 8px 0;">${order.shippingAddress.state || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Pin Code:</strong></td>
                <td style="padding: 8px 0;">${order.shippingAddress.pincode || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Country:</strong></td>
                <td style="padding: 8px 0;">${order.shippingAddress.country || 'India'}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #059669;">Ordered Products</h2>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Product</th>
                  <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Quantity</th>
                  <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Price</th>
                  <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr style="background: #f9fafb; font-weight: bold;">
                  <td colspan="3" style="padding: 8px; border: 1px solid #ddd; text-align: right;">Total Amount:</td>
                  <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: #059669;">₹${order.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style="background: #ecfdf5; padding: 15px; border-radius: 0 0 8px 8px; margin-top: 20px; border: 1px solid #a7f3d0;">
            <p style="margin: 0; color: #065f46;">
              <strong>Note:</strong> Please contact the customer via WhatsApp on <strong>${order.shippingAddress.phone}</strong> to confirm payment and delivery details.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Rima Cosmetics <onboarding@resend.dev>',
        to: [businessEmail],
        subject: `🛍️ New Order Received - ${order.id}`,
        html: emailHtml,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(`Email sending failed: ${JSON.stringify(result)}`);
      return { success: false, error: result };
    }

    console.log(`Order confirmation email sent successfully to ${businessEmail} for order ${order.id}`);
    return { success: true, data: result };
  } catch (error) {
    console.log(`Error sending email: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// ========== AUTH ROUTES ==========

// Sign up new user
app.post('/make-server-35cd97c6/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    // Create user with auto-confirmed email
    // Note: Email confirmation is automatic since email server hasn't been configured
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'customer' },
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true, 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name,
        role: data.user.user_metadata.role || 'customer'
      }
    });
  } catch (error) {
    console.log(`Signup error: ${error.message}`);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// ========== ORDER ROUTES ==========

// Create new order
app.post('/make-server-35cd97c6/orders', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await verifyUser(authHeader);
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const orderData = await c.req.json();
    const orderId = `ORD-${Date.now()}`;
    
    // Calculate estimated delivery (5-7 business days from now)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 6);
    
    const order = {
      id: orderId,
      userId: user.id,
      userEmail: user.email || orderData.userEmail,
      items: orderData.items,
      total: orderData.total,
      status: 'pending',
      paymentMethod: 'whatsapp',
      shippingAddress: orderData.shippingAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: estimatedDelivery.toISOString()
    };

    // Store order in KV store
    await kv.set(`order:${orderId}`, order);
    
    // Add order to user's order list
    const userOrdersKey = `user_orders:${user.id}`;
    const existingOrders = await kv.get(userOrdersKey) || [];
    await kv.set(userOrdersKey, [...existingOrders, orderId]);

    // Send order confirmation email
    const emailResult = await sendOrderEmail(order);
    if (!emailResult.success) {
      console.log(`Email sending failed for order ${orderId}: ${emailResult.error}`);
    }

    console.log(`Order created: ${orderId} for user ${user.id}`);
    return c.json({ success: true, order });
  } catch (error) {
    console.log(`Create order error: ${error.message}`);
    return c.json({ error: 'Failed to create order' }, 500);
  }
});

// Get user's orders
app.get('/make-server-35cd97c6/orders', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await verifyUser(authHeader);
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get user's order IDs
    const userOrdersKey = `user_orders:${user.id}`;
    const orderIds = await kv.get(userOrdersKey) || [];
    
    // Fetch all orders
    const orders = [];
    for (const orderId of orderIds) {
      const order = await kv.get(`order:${orderId}`);
      if (order) {
        orders.push(order);
      }
    }

    // Sort by creation date (newest first)
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ orders });
  } catch (error) {
    console.log(`Get orders error: ${error.message}`);
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
});

// Get single order
app.get('/make-server-35cd97c6/orders/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await verifyUser(authHeader);
    
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const orderId = c.req.param('id');
    const order = await kv.get(`order:${orderId}`);

    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }

    // Check if user owns the order or is admin
    const isAdmin = user.user_metadata?.role === 'admin';
    if (order.userId !== user.id && !isAdmin) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    return c.json({ order });
  } catch (error) {
    console.log(`Get order error: ${error.message}`);
    return c.json({ error: 'Failed to fetch order' }, 500);
  }
});

// ========== ADMIN ROUTES ==========

// Get all orders (admin only)
app.get('/make-server-35cd97c6/admin/orders', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await verifyUser(authHeader);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized - Admin access required' }, 403);
    }

    // Get all orders by prefix
    const allOrders = await kv.getByPrefix('order:');
    
    // Sort by creation date (newest first)
    allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ orders: allOrders });
  } catch (error) {
    console.log(`Admin get all orders error: ${error.message}`);
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
});

// Update order status (admin only)
app.put('/make-server-35cd97c6/admin/orders/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await verifyUser(authHeader);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized - Admin access required' }, 403);
    }

    const orderId = c.req.param('id');
    const { status } = await c.req.json();

    const order = await kv.get(`order:${orderId}`);
    
    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }

    // Update order status
    const updatedOrder = {
      ...order,
      status,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`order:${orderId}`, updatedOrder);

    console.log(`Order ${orderId} status updated to ${status} by admin ${user.id}`);
    return c.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.log(`Update order status error: ${error.message}`);
    return c.json({ error: 'Failed to update order status' }, 500);
  }
});

// ========== PRODUCT ROUTES ==========

// Get all products
app.get('/make-server-35cd97c6/products', async (c) => {
  try {
    const products = await kv.getByPrefix('product:');
    return c.json({ products });
  } catch (error) {
    console.log(`Get products error: ${error.message}`);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

// Get single product
app.get('/make-server-35cd97c6/products/:id', async (c) => {
  try {
    const productId = c.req.param('id');
    const product = await kv.get(`product:${productId}`);
    
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }
    
    return c.json({ product });
  } catch (error) {
    console.log(`Get product error: ${error.message}`);
    return c.json({ error: 'Failed to fetch product' }, 500);
  }
});

// Create product (admin only)
app.post('/make-server-35cd97c6/admin/products', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await verifyUser(authHeader);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized - Admin access required' }, 403);
    }

    const productData = await c.req.json();
    const productId = `${Date.now()}`;
    
    const product = {
      id: productId,
      ...productData,
      createdAt: new Date().toISOString()
    };

    await kv.set(`product:${productId}`, product);

    console.log(`Product created: ${productId} by admin ${user.id}`);
    return c.json({ success: true, product });
  } catch (error) {
    console.log(`Create product error: ${error.message}`);
    return c.json({ error: 'Failed to create product' }, 500);
  }
});

// Update product (admin only)
app.put('/make-server-35cd97c6/admin/products/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await verifyUser(authHeader);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized - Admin access required' }, 403);
    }

    const productId = c.req.param('id');
    const productData = await c.req.json();
    
    const existingProduct = await kv.get(`product:${productId}`);
    
    if (!existingProduct) {
      return c.json({ error: 'Product not found' }, 404);
    }

    const updatedProduct = {
      ...existingProduct,
      ...productData,
      id: productId, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    await kv.set(`product:${productId}`, updatedProduct);

    console.log(`Product updated: ${productId} by admin ${user.id}`);
    return c.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.log(`Update product error: ${error.message}`);
    return c.json({ error: 'Failed to update product' }, 500);
  }
});

// Delete product (admin only)
app.delete('/make-server-35cd97c6/admin/products/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await verifyUser(authHeader);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized - Admin access required' }, 403);
    }

    const productId = c.req.param('id');
    
    const product = await kv.get(`product:${productId}`);
    
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    await kv.del(`product:${productId}`);

    console.log(`Product deleted: ${productId} by admin ${user.id}`);
    return c.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.log(`Delete product error: ${error.message}`);
    return c.json({ error: 'Failed to delete product' }, 500);
  }
});

// Health check
app.get('/make-server-35cd97c6/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);