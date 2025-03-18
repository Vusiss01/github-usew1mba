import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock, MapPin, Phone, DollarSign } from 'lucide-react';
import Header from '../../components/layout/Header';
import { Button } from '../../components/ui/button';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface VendorData {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  cuisine: string[];
  address: string;
  phone: string;
  menu: MenuItem[];
}

const vendorData: { [key: string]: VendorData } = {
  'burgers-and-co': {
    id: 'burgers-and-co',
    name: 'Burgers & Co.',
    description: 'Serving the juiciest burgers in town with premium ingredients and homemade sauces.',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    deliveryTime: '15-25 min',
    priceRange: '$$',
    cuisine: ['American', 'Burgers', 'Fast Food'],
    address: '123 Burger Street, Foodville, FL 12345',
    phone: '(555) 123-4567',
    menu: [
      {
        id: 'classic-burger',
        name: 'Classic Cheeseburger',
        description: 'Angus beef patty, cheddar cheese, lettuce, tomato, onion, pickles, and our special sauce',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Burgers'
      },
      {
        id: 'bacon-burger',
        name: 'Bacon Deluxe',
        description: 'Angus beef patty, crispy bacon, swiss cheese, caramelized onions, and garlic aioli',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Burgers'
      }
    ]
  },
  'pizza-palace': {
    id: 'pizza-palace',
    name: 'Pizza Palace',
    description: 'Authentic Italian pizzas made with fresh ingredients and traditional recipes.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    deliveryTime: '20-35 min',
    priceRange: '$$',
    cuisine: ['Italian', 'Pizza', 'Pasta'],
    address: '456 Pizza Avenue, Foodville, FL 12345',
    phone: '(555) 234-5678',
    menu: [
      {
        id: 'margherita',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomatoes, basil, olive oil',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Pizzas'
      }
    ]
  },
  'sushi-express': {
    id: 'sushi-express',
    name: 'Sushi Express',
    description: 'Fresh and delicious sushi made by experienced chefs.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    deliveryTime: '25-40 min',
    priceRange: '$$',
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    address: '789 Sushi Lane, Foodville, FL 12345',
    phone: '(555) 345-6789',
    menu: [
      {
        id: 'california-roll',
        name: 'California Roll',
        description: 'Crab meat, avocado, cucumber, and tobiko',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Rolls'
      }
    ]
  }
};

const VendorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const vendor = id ? vendorData[id] : null;

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Store not found</h1>
          <p className="text-gray-600 mb-4">The store you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const categories = ['all', ...new Set(vendor.menu.map(item => item.category))];
  const filteredMenu = selectedCategory === 'all' 
    ? vendor.menu 
    : vendor.menu.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        showSearch={false}
        showLocation={true}
        showCart={true}
        showFilters={false}
      />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Store Info */}
      <div className="relative -mt-20 bg-white rounded-t-3xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{vendor.name}</h1>
          
          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{vendor.rating}</span>
            <span className="mx-2 text-gray-300">•</span>
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="ml-1 text-gray-600">{vendor.deliveryTime}</span>
            <span className="mx-2 text-gray-300">•</span>
            <DollarSign className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">{vendor.priceRange}</span>
          </div>

          <p className="text-gray-600 mb-4">{vendor.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {vendor.cuisine.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{vendor.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-2" />
              <span>{vendor.phone}</span>
            </div>
          </div>

          {/* Menu Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white rounded-lg p-4 border border-gray-100"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <p className="font-medium text-orange-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPage; 