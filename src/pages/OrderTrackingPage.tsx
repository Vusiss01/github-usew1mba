import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, Clock, ChefHat, Bike, Package, MapPin } from 'lucide-react';

interface OrderStatus {
  step: number;
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
}

export default function OrderTrackingPage() {
  const { orderId } = useParams();

  // This would come from an API in a real application
  const orderStatuses: OrderStatus[] = [
    {
      step: 1,
      title: 'Order Confirmed',
      description: 'Your order has been received',
      timestamp: '12:30 PM',
      icon: <CheckCircle2 className="w-6 h-6" />
    },
    {
      step: 2,
      title: 'Order Preparing',
      description: 'Restaurant is preparing your food',
      timestamp: '12:35 PM',
      icon: <ChefHat className="w-6 h-6" />
    },
    {
      step: 3,
      title: 'Ready for Pickup',
      description: 'Order is ready for delivery',
      timestamp: '12:45 PM',
      icon: <Package className="w-6 h-6" />
    },
    {
      step: 4,
      title: 'On the Way',
      description: 'Your order is on the way',
      timestamp: '12:50 PM',
      icon: <Bike className="w-6 h-6" />
    },
    {
      step: 5,
      title: 'Delivered',
      description: 'Enjoy your meal!',
      timestamp: '1:15 PM',
      icon: <MapPin className="w-6 h-6" />
    }
  ];

  // In a real app, this would be determined by the actual order status
  const currentStep = 2; // Order is being prepared

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Order Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-semibold mb-2">Order #{orderId}</h1>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>Estimated Delivery: 1:15 PM</span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="p-6">
          <div className="space-y-8">
            {orderStatuses.map((status, index) => (
              <div key={status.step} className="flex items-start">
                {/* Status Icon */}
                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                  index < currentStep ? 'bg-green-500' :
                  index === currentStep ? 'bg-orange-500' :
                  'bg-gray-200'
                }`}>
                  <div className="text-white">
                    {status.icon}
                  </div>
                </div>

                {/* Status Content */}
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium ${
                      index < currentStep ? 'text-green-600' :
                      index === currentStep ? 'text-orange-600' :
                      'text-gray-500'
                    }`}>
                      {status.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {index <= currentStep ? status.timestamp : '-'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {status.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < orderStatuses.length - 1 && (
                  <div className="absolute ml-4 mt-8 w-0.5 h-12 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Address</span>
              <span className="text-gray-900">12 Roncroft Dr, Toronto</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Restaurant</span>
              <span className="text-gray-900">Restaurant ABC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order Total</span>
              <span className="text-gray-900">$45.99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 