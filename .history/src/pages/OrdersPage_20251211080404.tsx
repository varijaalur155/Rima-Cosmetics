import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.tsx';
import { Badge } from '../components/ui/badge.tsx';
import { Order } from '../types/index.ts';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { projectId } from '../utils/supabase/info.tsx';

export function OrdersPage() {
  const { user, accessToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-35cd97c6/orders`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const data = await response.json();

        if (data.orders) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
    }
  };

  const getStatusProgress = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'confirmed':
        return 50;
      case 'shipped':
        return 75;
      case 'delivered':
        return 100;
    }
  };

  const trackingSteps = [
    { status: 'pending', label: 'Order Placed', icon: Clock },
    { status: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { status: 'shipped', label: 'Shipped', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: Package }
  ];

  const isStepCompleted = (stepStatus: string, currentStatus: string) => {
    const statusOrder = ['pending', 'confirmed', 'shipped', 'delivered'];
    return statusOrder.indexOf(stepStatus) <= statusOrder.indexOf(currentStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-gray-900">My Orders</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-600">Loading your orders...</p>
            </CardContent>
          </Card>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="mb-2">No orders yet</h2>
              <p className="text-gray-600">Your order history will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Order #{order.id}</CardTitle>
                      <p className="text-gray-600 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between">
                        <span className="text-gray-700">
                          {item.product.name} x {item.quantity}
                        </span>
                        <span>₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="mb-1">Shipping Address:</p>
                    <p className="text-gray-700">
                      {order.shippingAddress.fullName}<br />
                      {order.shippingAddress.address}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
                      Phone: {order.shippingAddress.phone}
                    </p>
                  </div>

                  {/* Order Tracking Timeline */}
                  <div className="mt-6 border-t pt-6">
                    <h3 className="mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      Order Tracking
                    </h3>
                    
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getStatusProgress(order.status)}%` }}
                        />
                      </div>
                    </div>

                    {/* Tracking Steps */}
                    <div className="space-y-4">
                      {trackingSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = isStepCompleted(step.status, order.status);
                        const isActive = step.status === order.status;
                        
                        return (
                          <div key={step.status} className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                              isCompleted 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-200 text-gray-400'
                            }`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className={`${isActive ? 'text-green-700' : isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                                {step.label}
                              </p>
                              {isActive && (
                                <p className="text-green-600">Current Status</p>
                              )}
                              {isCompleted && !isActive && (
                                <p className="text-gray-500">Completed</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Estimated Delivery */}
                    {order.status !== 'delivered' && (
                      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-green-800">
                          {order.status === 'pending' && '⏰ Your order will be confirmed shortly'}
                          {order.status === 'confirmed' && '📦 Your order is being prepared for shipment'}
                          {order.status === 'shipped' && '🚚 Your order is on the way!'}
                        </p>
                        {order.estimatedDelivery && (
                          <p className="text-green-700 mt-1">
                            Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}