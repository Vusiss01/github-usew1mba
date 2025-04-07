import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Percent } from 'lucide-react';
import { Badge } from '../ui/badge';

interface SpecialOffer {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPercentage: number;
  image: string;
  restaurant: {
    id: string;
    name: string;
  };
  daysRemaining: number;
}

const SpecialOffers = () => {
  const navigate = useNavigate();

  // Sample data - in a real app, this would be fetched from an API
  const specialOffers: SpecialOffer[] = [
    {
      id: '1',
      name: 'Healthy Bowl Special',
      description: 'Fresh and nutritious bowl with mixed vegetables and protein',
      originalPrice: 15.99,
      discountPercentage: 15,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      restaurant: {
        id: 'greys-vage',
        name: 'Greys Vage'
      },
      daysRemaining: 6
    },
    {
      id: '2',
      name: 'Vegetarian Delight',
      description: 'Colorful bowl with avocado, chickpeas, and fresh vegetables',
      originalPrice: 14.99,
      discountPercentage: 10,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      restaurant: {
        id: 'greys-vage',
        name: 'Greys Vage'
      },
      daysRemaining: 6
    },
    {
      id: '3',
      name: 'Garden Fresh Salad',
      description: 'Mixed greens with seasonal vegetables and house dressing',
      originalPrice: 12.99,
      discountPercentage: 25,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
      restaurant: {
        id: 'greys-vage',
        name: 'Greys Vage'
      },
      daysRemaining: 7
    },
    {
      id: '4',
      name: 'Pumpkin Soup',
      description: 'Creamy pumpkin soup with coconut milk and spices',
      originalPrice: 9.99,
      discountPercentage: 20,
      image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a',
      restaurant: {
        id: 'greys-vage',
        name: 'Greys Vage'
      },
      daysRemaining: 8
    }
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialOffers.map((offer) => (
            <div
              key={offer.id}
              onClick={() => navigate(`/special-offer/${offer.id}`)}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className="absolute top-2 left-2 bg-orange-100 text-orange-800 border-orange-200"
                >
                  <Percent className="w-4 h-4 mr-1" />
                  {offer.discountPercentage}% OFF
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{offer.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{offer.restaurant.name}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 line-through text-sm">
                      ${offer.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-orange-500 font-bold ml-2">
                      ${(offer.originalPrice * (1 - offer.discountPercentage / 100)).toFixed(2)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {offer.daysRemaining} Days Remaining
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers; 