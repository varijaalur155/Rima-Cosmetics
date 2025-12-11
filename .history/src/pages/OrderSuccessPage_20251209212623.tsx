import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card.tsx';
import { Button } from '../components/ui/button';
import { CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';

export function OrderSuccessPage() {
  const location = useLocation();
  const { orderId, order, customerDetails } = location.state || {};

  useEffect(() => {
    if (orderId && order && customerDetails) {
     //const serviceId = 'YOUR_SERVICE_ID';Replace with your EmailJS Service ID
     const serviceId = 'service_rwdmsil';
      //const templateId = 'YOUR_TEMPLATE_ID'; Replace with your EmailJS Template ID
      const templateId = 'template_wfp6m6e';
      //const publicKey = 'YOUR_PUBLIC_KEY';  Replace with your EmailJS Public Key
      const publicKey = 'n0p45DGXlDXE_Ns25';

      const sendOrderConfirmationEmail = async () => {
        try {
          const templateParams = {
            order_id: order.id,
            customer_name: customerDetails.fullName,
            customer_email: 'rimaorganiccosmetics@gmail.com', // Hardcoded business owner email for alert
            customer_phone: customerDetails.phone,
            customer_address: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.pincode}`,
            order_total: order.total,
            payment_method: order.paymentMethod,
            order_status: order.status,
            // You might need to format items into a string or HTML for the email template
            // For simplicity, let's just send a summary or list them out.
            items_html: order.items.map((item: any) => `<li>${item.name} x ${item.quantity} (₹${item.price * item.quantity})</li>`).join(''),
          };

          await emailjs.send(serviceId, templateId, templateParams, publicKey);
          console.log('Order confirmation email sent successfully!');
        } catch (error) {
          console.error('Error sending order confirmation email:', error);
        }
      };

      sendOrderConfirmationEmail();
    }
  }, [orderId, order, customerDetails]);

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
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <p className="text-green-800 font-medium">
                Next Step: WhatsApp Payment
              </p>
            </div>
            <p className="text-green-700">
              We will contact you shortly via WhatsApp to complete your payment and confirm delivery details.
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