import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { CartItem, ShippingAddress } from '../types/index';
import { projectId } from '../utils/supabase/info';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isEmailJSConfigured, getEmailJSConfigWarnings } from '../utils/emailjs-config';

export function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState<'google-pay' | 'phonepe' | 'whatsapp-pay'>('whatsapp-pay');

  const [loading, setLoading] = useState(false);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      // Send email notification to business owner using EmailJS
      const orderId = `ORD-${Date.now()}`;
      
      // Prepare order items text
      const itemsText = cart.map((item: CartItem) => 
        `${item.product.name} x ${item.quantity} = ₹${item.product.price * item.quantity}`
      ).join('\n');

      // EmailJS template parameters
      const templateParams = {
        order_id: orderId,
        customer_name: shippingAddress.fullName,
        customer_phone: shippingAddress.phone,
        customer_email: user?.email || 'Not provided',
        customer_address: shippingAddress.address,
        customer_city: shippingAddress.city || 'N/A',
        customer_state: shippingAddress.state || 'N/A',
        customer_pincode: shippingAddress.pincode || 'N/A',
        customer_country: shippingAddress.country || 'India',
        order_items: itemsText,
        total_amount: totalPrice,
        payment_method: paymentMethod.replace('-', ' ').toUpperCase(),
        order_date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      };

      // Send email using EmailJS
      if (isEmailJSConfigured()) {
        try {
          await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,  // Replace with your EmailJS Service ID
            EMAILJS_CONFIG.TEMPLATE_ID, // Replace with your EmailJS Template ID
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY   // Replace with your EmailJS Public Key
          );
          console.log('Order notification email sent successfully');
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
          // Don't stop the order process if email fails
        }
      } else {
        console.warn('EmailJS is not configured:', getEmailJSConfigWarnings());
      }

      // Create order on server
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-35cd97c6/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            items: cart,
            total: totalPrice,
            shippingAddress,
            paymentMethod,
            userEmail: user?.email
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Clear cart
      clearCart();

      toast.success('Order placed successfully! Business owner will contact you via WhatsApp.');
      navigate('/order-success', { state: { orderId: data.order.id } });
    } catch (error: unknown) {
      console.error('Order creation error:', error);
      const message = error instanceof Error ? error.message : 'Failed to place order. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Don't render the form if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={shippingAddress.pincode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {cart.map((item: CartItem) => (
                      <div key={item.product.id} className="flex justify-between">
                        <span className="text-gray-700">
                          {item.product.name} x {item.quantity}
                        </span>
                        <span>₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-green-800 font-medium mb-3">Select Payment Method</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="google-pay"
                          name="payment"
                          value="google-pay"
                          checked={paymentMethod === 'google-pay'}
                          onChange={(e) => setPaymentMethod(e.target.value as 'google-pay')}
                          className="text-green-600"
                        />
                        <label htmlFor="google-pay" className="text-gray-700">Google Pay</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="phonepe"
                          name="payment"
                          value="phonepe"
                          checked={paymentMethod === 'phonepe'}
                          onChange={(e) => setPaymentMethod(e.target.value as 'phonepe')}
                          className="text-green-600"
                        />
                        <label htmlFor="phonepe" className="text-gray-700">PhonePe</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="whatsapp-pay"
                          name="payment"
                          value="whatsapp-pay"
                          checked={paymentMethod === 'whatsapp-pay'}
                          onChange={(e) => setPaymentMethod(e.target.value as 'whatsapp-pay')}
                          className="text-green-600"
                        />
                        <label htmlFor="whatsapp-pay" className="text-gray-700">WhatsApp Pay</label>
                      </div>
                    </div>
                    <div className="mt-4">
                      {paymentMethod === 'google-pay' && (
                        <p className="text-green-700 text-sm">
                          Pay using Google Pay UPI ID: <strong>mkmounica4@oksbi</strong>. After payment, contact us on WhatsApp to confirm your order.
                        </p>
                      )}
                      {paymentMethod === 'phonepe' && (
                        <p className="text-green-700 text-sm">
                          Pay using PhonePe UPI ID: <strong>8939996640@ybl</strong>. After payment, contact us on WhatsApp to confirm your order.
                        </p>
                      )}
                      {paymentMethod === 'whatsapp-pay' && (
                        <p className="text-green-700 text-sm">
                          After placing your order, you'll be contacted via WhatsApp to complete the payment and confirm delivery details.
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6 bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}