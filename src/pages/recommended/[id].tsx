import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Header from '../../components/layout/Header';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  spicyLevel?: number;
  dietaryInfo?: string[];
}

interface RecommendedVendor {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  tags: string[];
  priceRange: string;
  cuisine: string[];
  address: string;
  phone: string;
  openingHours: string;
  menu: MenuItem[];
  recommendation?: string;
  isNew?: boolean;
}

const recommendedVendors: { [key: string]: RecommendedVendor } = {
  'burgers-and-co': {
    id: 'burgers-and-co',
    name: 'Burgers & Co.',
    description: 'Premium burgers made with high-quality ingredients and unique flavor combinations. Our signature beef patties are made fresh daily.',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    deliveryTime: '15-25 min',
    tags: ['Burgers', 'American'],
    priceRange: '$$',
    cuisine: ['American', 'Burgers', 'Fast Food'],
    address: '123 Burger Street, Foodville, FL 12345',
    phone: '(555) 123-4567',
    openingHours: '11:00 AM - 10:00 PM',
    recommendation: 'Based on your recent orders',
    menu: [
      {
        id: 'classic-burger',
        name: 'Classic Cheeseburger',
        description: 'Angus beef patty, cheddar cheese, lettuce, tomato, onion, pickles, and our special sauce',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Burgers',
        popular: true
      },
      {
        id: 'bacon-burger',
        name: 'Bacon Deluxe',
        description: 'Angus beef patty, crispy bacon, swiss cheese, caramelized onions, and garlic aioli',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Burgers',
        popular: true
      }
    ]
  },
  'green-bowl': {
    id: 'green-bowl',
    name: 'Green Bowl',
    description: 'Fresh and healthy bowls packed with nutrients. Choose from our signature bowls or create your own combination.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    deliveryTime: '15-25 min',
    tags: ['Healthy', 'Salads'],
    priceRange: '$$',
    cuisine: ['Healthy', 'Salads', 'Vegetarian'],
    address: '456 Health Avenue, Foodville, FL 12345',
    phone: '(555) 234-5678',
    openingHours: '10:00 AM - 9:00 PM',
    isNew: true,
    recommendation: 'Matches your dietary preferences',
    menu: [
      {
        id: 'quinoa-bowl',
        name: 'Quinoa Power Bowl',
        description: 'Quinoa, mixed greens, roasted chickpeas, avocado, cherry tomatoes, and tahini dressing',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Bowls',
        dietaryInfo: ['Vegan', 'Gluten-Free']
      },
      {
        id: 'buddha-bowl',
        name: 'Buddha Bowl',
        description: 'Brown rice, sweet potato, kale, edamame, carrots, and miso dressing',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Bowls',
        dietaryInfo: ['Vegan', 'Gluten-Free']
      }
    ]
  },
  'sushi-express': {
    id: 'sushi-express',
    name: 'Sushi Express',
    description: 'Fresh and authentic Japanese sushi made by experienced chefs. Featuring both traditional and modern rolls.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    deliveryTime: '25-40 min',
    tags: ['Japanese', 'Sushi'],
    priceRange: '$$$',
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    address: '789 Sushi Lane, Foodville, FL 12345',
    phone: '(555) 345-6789',
    openingHours: '11:30 AM - 10:00 PM',
    recommendation: 'You might like this',
    menu: [
      {
        id: 'dragon-roll',
        name: 'Dragon Roll',
        description: 'Eel, cucumber, avocado, and tobiko with unagi sauce',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Special Rolls',
        popular: true
      },
      {
        id: 'rainbow-roll',
        name: 'Rainbow Roll',
        description: 'California roll topped with assorted sashimi',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Special Rolls',
        popular: true
      }
    ]
  },
  'pizza-palace': {
    id: 'pizza-palace',
    name: 'Pizza Palace',
    description: 'Authentic Italian pizzas made with fresh ingredients and traditional recipes. Wood-fired to perfection.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    deliveryTime: '20-35 min',
    tags: ['Pizza', 'Italian'],
    priceRange: '$$',
    cuisine: ['Italian', 'Pizza', 'Pasta'],
    address: '101 Pizza Street, Foodville, FL 12345',
    phone: '(555) 456-7890',
    openingHours: '11:00 AM - 11:00 PM',
    recommendation: 'Popular in your area',
    menu: [
      {
        id: 'margherita',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomatoes, basil, and olive oil',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Pizzas',
        popular: true
      },
      {
        id: 'pepperoni',
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni, mozzarella, and our signature tomato sauce',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Pizzas',
        popular: true
      }
    ]
  }
};

const RecommendedItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const vendor = id ? recommendedVendors[id] : null;

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h1>
          <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

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

      {/* Content */}
      <div className="relative -mt-20 bg-white rounded-t-3xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
            {vendor.isNew && (
              <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded">
                New
              </span>
            )}
          </div>

          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{vendor.rating}</span>
            <span className="mx-2 text-gray-300">•</span>
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="ml-1 text-gray-600">{vendor.deliveryTime}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-600">{vendor.priceRange}</span>
          </div>

          {vendor.recommendation && (
            <div className="text-sm text-gray-500 italic mb-4">
              {vendor.recommendation}
            </div>
          )}

          <p className="text-gray-600 mb-6">{vendor.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {vendor.cuisine.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{vendor.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-2" />
              <span>{vendor.phone}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>{vendor.openingHours}</span>
            </div>
          </div>

          {/* Popular Menu Items */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Popular Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vendor.menu.map((item) => (
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
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-orange-500">${item.price.toFixed(2)}</p>
                      {item.dietaryInfo && (
                        <div className="flex gap-1">
                          {item.dietaryInfo.map((info, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full"
                            >
                              {info}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 md:static md:border-0 md:p-0 md:mt-8">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-medium rounded-xl"
              onClick={() => navigate(`/vendor/${vendor.id}/menu`)}
            >
              View Full Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedItemPage; 