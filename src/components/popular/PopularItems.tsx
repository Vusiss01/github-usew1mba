import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { getOptimizedImageUrl } from '../../utils/imageLoader';

interface PopularItem {
  id: string;
  name: string;
  image: string;
  restaurant: string;
  price: number;
}

interface PopularItemsProps {
  className?: string;
}

const PopularItems: React.FC<PopularItemsProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  const popularItems: PopularItem[] = [
    {
      id: '1',
      name: 'Cheese Burger',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1568901346375-23c9450c58cd'),
      restaurant: 'Burger Arena',
      price: 3.88
    },
    {
      id: '2',
      name: "Toffe's Cake",
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1587314168485-3236d6710814'),
      restaurant: 'Top Sticks',
      price: 4.00
    },
    {
      id: '3',
      name: 'Dancake',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1575312027309-11b6c99f341b'),
      restaurant: 'Cake World',
      price: 1.99
    },
    {
      id: '4',
      name: 'Crispy Sandwich',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1528735602780-2552fd46c7af'),
      restaurant: 'Fastfood Dine',
      price: 3.00
    },
    {
      id: '5',
      name: 'Thai Soup',
      image: getOptimizedImageUrl('https://images.unsplash.com/photo-1547928576-a4a33237cbc3'),
      restaurant: 'Foody man',
      price: 2.79
    }
  ];

  const handleAddToCart = (e: React.MouseEvent, item: PopularItem) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    // In a real app, this would dispatch to a cart context/store
    console.log('Added to cart:', item);
    // You can add a toast notification here
  };

  return (
    <section className={`mb-8 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Popular items</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600">
            <ChevronLeft size={24} />
          </button>
          <button className="p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/item/${item.id}`)}
            >
              <div className="relative h-48">
                {!imageLoaded[item.id] && (
                  <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                )}
                <LazyLoadImage
                  src={item.image}
                  alt={item.name}
                  effect="blur"
                  className="w-full h-full object-cover"
                  afterLoad={() => setImageLoaded(prev => ({ ...prev, [item.id]: true }))}
                  placeholderSrc={`${item.image}&w=60&blur=50`}
                  threshold={300}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </span>
                  <span className="ml-1 text-sm text-orange-500">{item.restaurant}</span>
                </div>
                <div className="mt-2 text-lg font-bold">${item.price.toFixed(2)}</div>
                <button 
                  className="mt-3 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                  onClick={(e) => handleAddToCart(e, item)}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularItems; 