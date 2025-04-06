import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Search, ShoppingBag, ChevronRight, Filter, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import RatingModal from '../components/orders/RatingModal';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  restaurantName: string;
  date: Date;
  status: 'delivered' | 'cancelled' | 'processing';
  total: number;
  items: OrderItem[];
  deliveryAddress: string;
  rating?: {
    score: number;
    review: string;
    date: Date;
  };
}

// Sample orders data (in a real app, this would come from an API)
const sampleOrders: Order[] = [
  {
    id: '1234',
    restaurantName: 'Restaurant ABC',
    date: new Date(2024, 3, 15, 19, 30),
    status: 'delivered',
    total: 45.99,
    items: [
      { name: 'Burger Deluxe', quantity: 2, price: 15.99 },
      { name: 'French Fries', quantity: 1, price: 4.99 },
      { name: 'Soft Drink', quantity: 2, price: 2.99 }
    ],
    deliveryAddress: '12 Roncroft Dr, Toronto',
    rating: {
      score: 4,
      review: 'Great food and quick delivery!',
      date: new Date(2024, 3, 15, 20, 30)
    }
  },
  {
    id: '1233',
    restaurantName: 'Pizza Palace',
    date: new Date(2024, 3, 14, 20, 15),
    status: 'delivered',
    total: 32.99,
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 24.99 },
      { name: 'Garlic Bread', quantity: 1, price: 5.99 }
    ],
    deliveryAddress: '12 Roncroft Dr, Toronto'
  },
  {
    id: '1232',
    restaurantName: 'Sushi Express',
    date: new Date(2024, 3, 13, 18, 45),
    status: 'cancelled',
    total: 55.99,
    items: [
      { name: 'California Roll', quantity: 2, price: 12.99 },
      { name: 'Salmon Nigiri', quantity: 3, price: 8.99 }
    ],
    deliveryAddress: '12 Roncroft Dr, Toronto'
  },
  {
    id: '1231',
    restaurantName: 'Thai Delight',
    date: new Date(),
    status: 'processing',
    total: 28.99,
    items: [
      { name: 'Pad Thai', quantity: 1, price: 16.99 },
      { name: 'Spring Rolls', quantity: 2, price: 5.99 }
    ],
    deliveryAddress: '12 Roncroft Dr, Toronto'
  }
];

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'processing':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRateOrder = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOrder(order);
    setIsRatingModalOpen(true);
  };

  const handleSubmitRating = (rating: number, review: string) => {
    if (selectedOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === selectedOrder.id) {
          return {
            ...order,
            rating: {
              score: rating,
              review,
              date: new Date()
            }
          };
        }
        return order;
      });
      setOrders(updatedOrders);
    }
  };

  const filteredOrders = orders
    .filter(order => 
      (statusFilter === 'all' || order.status === statusFilter) &&
      (searchQuery === '' || 
        order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.includes(searchQuery))
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Clock className="h-8 w-8 text-gray-700 mr-3" />
          <h1 className="text-3xl font-semibold">Order History</h1>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search orders by restaurant or order ID"
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('all')}
            className="flex-1 md:flex-none"
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'processing' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('processing')}
            className="flex-1 md:flex-none"
          >
            Processing
          </Button>
          <Button
            variant={statusFilter === 'delivered' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('delivered')}
            className="flex-1 md:flex-none"
          >
            Delivered
          </Button>
          <Button
            variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('cancelled')}
            className="flex-1 md:flex-none"
          >
            Cancelled
          </Button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-orange-500 transition-colors cursor-pointer"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{order.restaurantName}</h3>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.quantity}x {item.name}
                      {index < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                {order.rating && (
                  <div className="mt-3 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < order.rating!.score
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="ml-2 text-sm text-gray-600">{order.rating.review}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0">
                <div className="text-right">
                  <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                  {order.status === 'delivered' && !order.rating && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={(e) => handleRateOrder(order, e)}
                    >
                      Rate Order
                    </Button>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {selectedOrder && (
        <RatingModal
          isOpen={isRatingModalOpen}
          onClose={() => {
            setIsRatingModalOpen(false);
            setSelectedOrder(null);
          }}
          onSubmit={handleSubmitRating}
          orderDetails={selectedOrder}
        />
      )}
    </div>
  );
} 