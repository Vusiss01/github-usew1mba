import React from 'react';
import { Bell, ShoppingBag, MessageSquare, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'order' | 'message' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  orderId?: string;
  messageId?: string;
}

// Sample notifications data (in a real app, this would come from an API)
const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Order Status Update',
    description: 'Your order #1234 has been confirmed and is being prepared.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    orderId: '1234'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'You have a new message from Restaurant ABC',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: true,
    messageId: 'm123'
  },
  {
    id: '3',
    type: 'order',
    title: 'Order Delivered',
    description: 'Your order #1233 has been delivered. Enjoy your meal!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: true,
    orderId: '1233'
  },
  {
    id: '4',
    type: 'system',
    title: 'Special Offer',
    description: 'Get 20% off on your next order with code SPECIAL20',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false
  }
];

export default function NotificationsPage() {
  const navigate = useNavigate();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="h-6 w-6 text-orange-500" />;
      case 'message':
        return <MessageSquare className="h-6 w-6 text-blue-500" />;
      default:
        return <Info className="h-6 w-6 text-gray-500" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.type === 'message') {
      navigate('/messages');
    } else if (notification.type === 'order' && notification.orderId) {
      navigate(`/orders/${notification.orderId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Bell className="h-6 w-6 text-gray-700 mr-2" />
        <h1 className="text-2xl font-semibold">Notifications</h1>
      </div>

      <div className="space-y-4">
        {sampleNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start p-4 rounded-lg border ${
              notification.read ? 'bg-white' : 'bg-orange-50'
            } cursor-pointer hover:bg-gray-50 transition-colors duration-200`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-sm font-medium ${
                    notification.read ? 'text-gray-900' : 'text-orange-600'
                  }`}>
                    {notification.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {notification.description}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 