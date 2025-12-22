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
import { sendOrderAlertEmail } from '../utils/resend-email';

// Business owner payment details
const BUSINESS_WHATSAPP_NUMBER = '+918076045877'; // Replace with actual WhatsApp number
const BUSINESS_PHONEPE_ID = '8076045877@ybl'; // Replace with actual PhonePe ID
const BUSINESS_GOOGLE_PAY_ID = '8076045877@okbiz'; // Replace with actual Google Pay ID

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

  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'phonepe' | 'googlepay' | null>(null);

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

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setLoading(true);

    try {
      // Send order alert email using Resend API
      const orderId = `ORD-${Date.now()}`;
      const itemsText = cart.map((item: CartItem) => 
        `${item.product.name} x ${item.quantity} = ₹${item.product.price * item.quantity}`
      ).join('\n');
      try {
        await sendOrderAlertEmail({
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
          order_date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        });
        console.log('Order notification email sent successfully (Resend)');
      } catch (emailError) {
        console.error('Failed to send order alert email (Resend):', emailError);
        // Don't stop the order process if email fails
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

      toast.success('Order placed successfully! Please complete the payment using your chosen method and send a screenshot to the business owner on WhatsApp for order confirmation.');

      switch (paymentMethod) {
        case 'whatsapp':
          window.location.href = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=Hi, I have placed an order (ID: ${orderId}) and would like to make the payment.`;
          break;
        case 'phonepe':
          // For PhonePe, you would typically generate a dynamic payment link or intent URL
          // This is a placeholder, as direct deep linking requires more complex setup
          window.location.href = `upi://pay?pa=${BUSINESS_PHONEPE_ID}&pn=BusinessName&mc=1234&tid=${orderId}&tr=${orderId}&am=${totalPrice}&cu=INR&url=https://yourwebsite.com/order-status/${orderId}`;
          break;
        case 'googlepay':
          // For Google Pay, you would typically generate a dynamic payment link or intent URL
          // This is a placeholder, as direct deep linking requires more complex setup
          window.location.href = `upi://pay?pa=${BUSINESS_GOOGLE_PAY_ID}&pn=BusinessName&mc=1234&tid=${orderId}&tr=${orderId}&am=${totalPrice}&cu=INR&url=https://yourwebsite.com/order-status/${orderId}`;
          break;
        default:
          break;
      }
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
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-lg shadow-sm">
            <p className="font-semibold text-md mb-1">Important Payment Instructions</p>
            <p className="text-sm">
              After placing your order, please make the payment using <b>WhatsApp, PhonePe, or Google Pay</b> to the business owner's account.<br/>
              <b>WhatsApp:</b> <a href="https://wa.me/+918076045877" target="_blank" rel="noopener noreferrer" className="underline">+91 80760 45877</a><br/>
              <b>PhonePe UPI ID:</b> 8076045877@ybl<br/>
              <b>Google Pay UPI ID:</b> 8076045877@okbiz<br/>
              <br/>
              <b>After payment, contact the business owner on WhatsApp and send a screenshot of your payment for order confirmation.</b>
            </p>
          </div>
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
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="whatsapp"
                      name="paymentMethod"
                      value="whatsapp"
                      checked={paymentMethod === 'whatsapp'}
                      onChange={() => setPaymentMethod('whatsapp')}
                      className="form-radio"
                    />
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="phonepe"
                      name="paymentMethod"
                      value="phonepe"
                      checked={paymentMethod === 'phonepe'}
                      onChange={() => setPaymentMethod('phonepe')}
                      className="form-radio"
                    />
                    <Label htmlFor="phonepe">PhonePe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="googlepay"
                      name="paymentMethod"
                      value="googlepay"
                      checked={paymentMethod === 'googlepay'}
                      onChange={() => setPaymentMethod('googlepay')}
                      className="form-radio"
                    />
                    <Label htmlFor="googlepay">Google Pay</Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    After placing your order, please make the payment using your chosen method and send a screenshot to the business owner on WhatsApp for order confirmation.
                  </p>
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {cart.map((item: CartItem) => (
                      <div key={item.product.id} className="flex justify-between">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-4" disabled={loading}>
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