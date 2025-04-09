import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Star, Clock } from 'lucide-react';
import { Layout } from '../components/layout/Layout';

interface ItemDetails {
  id: string;
  name: string;
  restaurant: string;
  image: string;
  price: number;
  description: string;
  rating: number;
  deliveryTime: string;
}

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In a real app, this would come from an API or context
  const itemDetails: Record<string, ItemDetails> = {
    '1': {
      id: '1',
      name: 'Cheese Burger',
      restaurant: 'Burger Arena',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      price: 3.88,
      description: 'A juicy cheese burger with fresh lettuce, tomatoes, and our special sauce.',
      rating: 4.5,
      deliveryTime: '20-25 min'
    },
    '2': {
      id: '2',
      name: "Toffe's Cake",
      restaurant: 'Top Sticks',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814',
      price: 4.00,
      description: 'Delicious toffee cake with whipped cream and fresh strawberries.',
      rating: 4.8,
      deliveryTime: '15-20 min'
    },
    '3': {
      id: '3',
      name: 'Dancake',
      restaurant: 'Cake World',
      image: 'https://images.unsplash.com/photo-1575312027309-11b6c99f341b',
      price: 1.99,
      description: 'Light and fluffy pancakes served with maple syrup.',
      rating: 4.3,
      deliveryTime: '15-20 min'
    },
    '4': {
      id: '4',
      name: 'Crispy Sandwich',
      restaurant: 'Fastfood Dine',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
      price: 3.00,
      description: 'Crispy grilled sandwich with cheese, vegetables, and our signature sauce.',
      rating: 4.6,
      deliveryTime: '15-20 min'
    }
  };

  const item = id ? itemDetails[id] : null;

  if (!item) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Item not found</p>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    // In a real app, this would dispatch to a cart context/store
    console.log('Added to cart:', item);
    // You can add a toast notification here
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Image */}
            <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Details */}
            <div className="flex flex-col">
              <h1 className="text-orange-500 font-medium mb-1">{item.restaurant}</h1>
              <h2 className="text-3xl font-bold mb-4">{item.name}</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{item.rating}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{item.deliveryTime}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-8">{item.description}</p>

              <div className="mt-auto">
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium">Price</span>
                    <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-full font-medium hover:bg-orange-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetailPage; 