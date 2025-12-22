import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle } from 'lucide-react';

export function OrderSuccessPage() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-lg w-full">
        <CardContent className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mb-4 text-gray-900">Order Placed Successfully!</h1>
          {orderId && (
            <p className="text-gray-700 mb-6">
              Your order ID is: <strong>{orderId}</strong>
            </p>
          )}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-400">
            <p className="font-semibold text-md mb-1">Next Step: Payment & Confirmation</p>
            <p className="text-yellow-900 text-sm">
              Please make your payment using <b>WhatsApp, PhonePe, or Google Pay</b> to the business owner's account:<br/>
              <b>WhatsApp:</b> <a href="https://wa.me/+918076045877" target="_blank" rel="noopener noreferrer" className="underline">+91 80760 45877</a><br/>
              <b>PhonePe UPI ID:</b> 8076045877@ybl<br/>
              <b>Google Pay UPI ID:</b> 8076045877@okbiz<br/>
              <br/>
              <b>After payment, contact the business owner on WhatsApp and send a screenshot of your payment for order confirmation.</b>
            </p>
          </div>
          <p className="text-gray-700 mb-8">
            Thank you for your order! We will process it soon and deliver it to your address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders">
              <Button variant="outline">View My Orders</Button>
            </Link>
            <Link to="/products">
              <Button className="bg-green-600 hover:bg-green-700">Continue Shopping</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}