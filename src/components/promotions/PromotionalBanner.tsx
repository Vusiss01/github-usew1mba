import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PromotionalItem {
  id: string;
  name: string;
  image: string;
  discount: number;
  daysRemaining: number;
}

interface PromotionalBannerProps {
  className?: string;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const promotionalItems: PromotionalItem[] = [
    {
      id: '1',
      name: 'Greys Vage',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      discount: 15,
      daysRemaining: 6
    },
    {
      id: '2',
      name: 'Greys Vage',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      discount: 10,
      daysRemaining: 6
    },
    {
      id: '3',
      name: 'Greys Vage',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      discount: 25,
      daysRemaining: 7
    },
    {
      id: '4',
      name: 'Greys Vage',
      image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      discount: 20,
      daysRemaining: 8
    }
  ];

  return (
    <section className={`mb-8 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Special Offers</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {promotionalItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/vendor/${item.id}`)}
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-amber-400 text-white text-lg font-bold px-3 py-1 rounded-full">
                {item.discount}% Off
              </div>
            </div>
            <div className="p-4 text-left">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <div className="mt-2 text-sm text-orange-500">
                {item.daysRemaining} Days Remaining
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionalBanner; 