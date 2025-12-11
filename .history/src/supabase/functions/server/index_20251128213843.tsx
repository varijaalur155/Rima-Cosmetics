import { Hono } from 'https://deno.land/x/hono/mod.ts';
import { cors } from 'https://deno.land/x/hono/middleware.ts';
import { logger } from 'https://deno.land/x/hono/middleware.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
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