import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantName: string;
  specialInstructions?: string;
}

export default function CartPage() {
  const navigate = useNavigate();
  // Sample items for demonstration
  const [items, setItems] = React.useState<CartItem[]>([
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 14.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=400&fit=crop',
      restaurantName: 'Pizza Palace',
      specialInstructions: 'Extra cheese please'
    },
    {
      id: '2',
      name: 'Garlic Bread',
      price: 4.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1619531040576-f9416740661f?w=400&h=400&fit=crop',
      restaurantName: 'Pizza Palace'
    },
    {
      id: '3',
      name: 'Chicken Biryani',
      price: 16.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=400&h=400&fit=crop',
      restaurantName: 'Spice Garden',
      specialInstructions: 'Medium spicy'
    },
    {
      id: '4',
      name: 'Naan Bread',
      price: 2.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop',
      restaurantName: 'Spice Garden'
    }
  ]);
  
  const deliveryFee = 4.99;
  const taxRate = 0.13; // 13% tax

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax + deliveryFee;

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    setItems(currentItems => {
      if (newQuantity === 0) {
        return currentItems.filter(item => item.id !== itemId);
      }
      
      return currentItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const updateInstructions = (itemId: string, instructions: string) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, specialInstructions: instructions } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <div className="rounded-full bg-gray-100 p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Add items from restaurants to start your order
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6">Cart ({items.length} items)</h2>
              
              {/* Group items by restaurant */}
              {Object.entries(
                items.reduce((acc, item) => {
                  if (!acc[item.restaurantName]) {
                    acc[item.restaurantName] = [];
                  }
                  acc[item.restaurantName].push(item);
                  return acc;
                }, {} as Record<string, CartItem[]>)
              ).map(([restaurantName, restaurantItems]) => (
                <div key={restaurantName} className="mb-8 last:mb-0">
                  <h3 className="text-lg font-medium mb-4">{restaurantName}</h3>
                  <div className="space-y-4">
                    {restaurantItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
                            <p className="text-base font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
                          <div className="flex items-center space-x-4 mt-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Textarea
                            placeholder="Add special instructions..."
                            className="mt-4 text-sm"
                            value={item.specialInstructions || ''}
                            onChange={(e) => updateInstructions(item.id, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold">Total</span>
                    <span className="text-base font-semibold">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-6"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 