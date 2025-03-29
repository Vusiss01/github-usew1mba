import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star, Tag, Gift, Percent, Trophy, Timer } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { getOptimizedImageUrl } from '../../utils/imageLoader';
import AppInstallSection from './AppInstallSection';
import SandwichDealsSection from './SandwichDealsSection';

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

interface Promotion {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
}

interface FeaturedRestaurantsProps {
  className?: string;
}

const FeaturedRestaurants: React.FC<FeaturedRestaurantsProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  const restaurants: Restaurant[] = useMemo(() => [
    {
      id: '1',
      name: 'Foodworld',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1619683548293-c74defe8d5d2'), // Noodle bowl with egg and vegetables
      logo: '#4361EE',
      rating: 46,
      discount: 20,
      isFast: true,
      status: 'Opens tomorrow'
    },
    {
      id: '2',
      name: 'Pizzahub',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b'), // Red cocktail drinks
      logo: '#FFE600',
      rating: 40,
      discount: 15,
      isFast: true,
      status: 'Opens tomorrow'
    },
    {
      id: '3',
      name: 'Donuts hut',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b'), // Person working out in gym
      logo: '#00B6FF',
      rating: 20,
      discount: 10,
      isFast: true,
      status: 'Open Now'
    },
    {
      id: '4',
      name: 'Donuts hut',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1603532648955-039310d9ed75'), // Pink and white cupcakes
      logo: '#00B300',
      rating: 50,
      discount: 15,
      isFast: true,
      status: 'Open Now'
    },
    {
      id: '5',
      name: 'Ruby Tuesday',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1558030006-450675393462'), // Grilled steak with tomatoes
      logo: '#1C1C1C',
      rating: 26,
      discount: 10,
      isFast: true,
      status: 'Opens tomorrow'
    },
    {
      id: '6',
      name: 'Kuakata Fried Chicken',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1562967914-608f82629710'), // Fried chicken with sauce
      logo: '#4CAF50',
      rating: 53,
      discount: 25,
      isFast: true,
      status: 'Open Now'
    },
    {
      id: '7',
      name: 'Red Square',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd'), // Red curry soup
      logo: '#FF0000',
      rating: 45,
      discount: 10,
      isFast: true,
      status: 'Open Now'
    },
    {
      id: '8',
      name: 'Taco Bell',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1606851094291-6efae152bb87'), // Bacon and eggs in a pan
      logo: '#FF9800',
      rating: 35,
      discount: 10,
      isFast: true,
      status: 'Opens tomorrow'
    }
  ], []);

  const promotions: Promotion[] = useMemo(() => [
    {
      id: 'daily',
      title: 'Daily Discounts',
      description: 'Get up to 50% off on selected restaurants every day',
      icon: <Percent className="w-6 h-6" />,
      bgColor: 'bg-amber-50'
    },
    {
      id: 'tracking',
      title: 'Live Tracing',
      description: 'Track your order in real-time with live updates',
      icon: <Timer className="w-6 h-6" />,
      bgColor: 'bg-amber-50'
    },
    {
      id: 'delivery',
      title: 'Quick Delivery',
      description: 'Fast delivery to your doorstep within 30 minutes',
      icon: <Clock className="w-6 h-6" />,
      bgColor: 'bg-amber-50'
    }
  ], []);

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <>
      <section className={`mb-8 ${className}`}>
        <h2 className="text-2xl font-bold mb-6">Featured Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            >
              <div className="relative w-full h-44">
                {!imageLoaded[restaurant.id] && (
                  <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                )}
                <LazyLoadImage
                  src={restaurant.image}
                  alt={restaurant.name}
                  effect="blur"
                  className="absolute inset-0 w-full h-full object-cover"
                  afterLoad={() => setImageLoaded(prev => ({ ...prev, [restaurant.id]: true }))}
                  placeholderSrc={`${restaurant.image}&w=60&blur=50`}
                  threshold={300}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
                    <Tag size={12} className="mr-1" />
                    {restaurant.discount}% off
                  </span>
                  <span className="bg-amber-400 text-white px-2 py-1 rounded-md text-xs flex items-center">
                    <Clock size={12} className="mr-1" />
                    Fast
                  </span>
                </div>
              </div>
              <div className="p-3 flex flex-row items-start gap-2">
                <div 
                  className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-medium"
                  style={{ backgroundColor: restaurant.logo }}
                >
                  {getInitials(restaurant.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800 text-sm truncate">{restaurant.name}</h3>
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      <Star size={12} className="text-amber-400 fill-current" />
                      <span className="text-xs text-gray-600">{restaurant.rating}</span>
                    </div>
                  </div>
                  <div className={`text-xs ${
                    restaurant.status === 'Open Now' ? 'text-green-500' : 'text-orange-500'
                  }`}>
                    {restaurant.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className={`${promo.bgColor} rounded-xl p-4 cursor-pointer transition-transform hover:scale-[1.02] group`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-orange-500">
                      {promo.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-orange-500 font-semibold text-lg group-hover:text-orange-600">
                        {promo.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {promo.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 bg-orange-50/50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-orange-500">
                <Gift className="w-5 h-5" />
                <span className="text-sm font-medium">Available Rewards</span>
              </div>
              <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                View All Offers →
              </button>
            </div>
          </div>
        </div>
      </section>

      <AppInstallSection />
      <SandwichDealsSection />
    </>
  );
};

export default FeaturedRestaurants; 