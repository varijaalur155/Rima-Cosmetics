import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// Import and register your functions here
import { app as sendOrderEmailApp } from './send-order-email'
app.route('/send-order-email', sendOrderEmailApp)

serve(app)
