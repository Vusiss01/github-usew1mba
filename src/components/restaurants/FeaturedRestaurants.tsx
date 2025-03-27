import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star, Tag } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  logo: string;
  rating: number;
  discount: number;
  isFast: boolean;
  status: 'Opens tomorrow' | 'Open Now';
}

interface FeaturedRestaurantsProps {
  className?: string;
}

const FeaturedRestaurants: React.FC<FeaturedRestaurantsProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Foodworld',
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
      logo: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%234CAF50"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">FW</text></svg>',
      rating: 46,
      discount: 20,
      isFast: true,
      status: 'Opens tomorrow'
    },
    {
      id: '2',
      name: 'Pizzahub',
      image: 'https://images.unsplash.com/photo-1540914124281-342587941389',
      logo: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=100&h=100&fit=crop',
      rating: 40,
      discount: 15,
      isFast: true,
      status: 'Opens tomorrow'
    },
    {
      id: '3',
      name: 'Donuts hut',
      image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e',
      logo: 'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?w=100&h=100&fit=crop',
      rating: 20,
      discount: 10,
      isFast: true,
      status: 'Open Now'
    },
    {
      id: '4',
      name: 'Donuts hut',
      image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75',
      logo: 'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?w=100&h=100&fit=crop',
      rating: 50,
      discount: 15,
      isFast: true,
      status: 'Open Now'
    },
    {
      id: '5',
      name: 'Ruby Tuesday',
      image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02',
      logo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop',
      rating: 26,
      discount: 10,
      isFast: true,
      status: 'Opens tomorrow'
    },
    {
      id: '6',
      name: 'Kuakata Fried Chicken',
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58',
      logo: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23e4002b"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">KFC</text></svg>',
      rating: 53,
      discount: 25,
      isFast: true,
      status: 'Open Now'
    },
    {
      id: '7',
      name: 'Red Square',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
      rating: 45,
      discount: 10,
      isFast: true,
      status: 'Open Now'
    },
    {
      id: '8',
      name: 'Taco Bell',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
      logo: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=100&h=100&fit=crop',
      rating: 35,
      discount: 10,
      isFast: true,
      status: 'Opens tomorrow'
    }
  ];

  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          >
            <div className="relative h-48">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm flex items-center">
                  <Tag size={14} className="mr-1" />
                  {restaurant.discount}% off
                </span>
                <span className="bg-amber-400 text-white px-2 py-1 rounded-md text-sm flex items-center">
                  <Clock size={14} className="mr-1" />
                  Fast
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={restaurant.logo}
                    alt={`${restaurant.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{restaurant.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-current" />
                    <span className="text-sm text-gray-600">{restaurant.rating}</span>
                  </div>
                </div>
              </div>
              <div className={`mt-3 text-sm ${
                restaurant.status === 'Open Now' ? 'text-green-500' : 'text-orange-500'
              }`}>
                {restaurant.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRestaurants; 