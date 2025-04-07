import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Star, Clock, MapPin, Phone, Percent, Heart, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
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
    rating: number;
    reviewCount: number;
    deliveryTime: string;
    address: string;
    phone: string;
  };
}

const SpecialOfferDetail = () => {
  const navigate = useNavigate();
  const { offerId } = useParams<{ offerId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample data - in a real app, this would be fetched based on offerId
  const offer: SpecialOffer = {
    id: offerId || '1',
    name: 'Greys Vage Special Bowl',
    description: 'Fresh and healthy bowl with mixed vegetables, grilled protein, and our special sauce. Perfect for a nutritious meal that will keep you energized throughout the day.',
    originalPrice: 15.99,
    discountPercentage: 15,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    restaurant: {
      id: 'greys-vage',
      name: 'Greys Vage',
      rating: 4.8,
      reviewCount: 1250,
      deliveryTime: '20-30 min',
      address: '123 Healthy St, Food District',
      phone: '+1 (555) 123-4567'
    }
  };

  const discountedPrice = offer.originalPrice * (1 - offer.discountPercentage / 100);

  const handleAddToCart = () => {
    // Add to cart logic here
    navigate('/cart');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          <button
            onClick={() => {/* Share logic */}}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
            {/* Left Side - Content */}
            <div className="flex-1 p-8 lg:p-16 flex flex-col">
              <div className="max-w-xl">
                {/* Restaurant Name */}
                <button
                  onClick={() => navigate(`/vendor/${offer.restaurant.id}`)}
                  className="text-sm text-orange-500 font-medium hover:underline mb-2"
                >
                  {offer.restaurant.name}
                </button>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {offer.name}
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-lg mb-8">
                  {offer.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-12">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium">{offer.restaurant.rating}</span>
                    <span className="text-gray-500 ml-1">
                      ({offer.restaurant.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-1" />
                    <span>{offer.restaurant.deliveryTime}</span>
                  </div>
                  <Badge
                    className="bg-orange-100 text-orange-800 border-orange-200"
                  >
                    <Percent className="w-4 h-4 mr-1" />
                    {offer.discountPercentage}% OFF
                  </Badge>
                </div>

                {/* Price and Add to Cart */}
                <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-gray-500 line-through">
                        ${offer.originalPrice.toFixed(2)}
                      </p>
                      <p className="text-3xl font-bold text-orange-500">
                        ${discountedPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 bg-gray-50 rounded-full px-6 py-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-lg font-medium"
                      >
                        -
                      </button>
                      <span className="font-medium w-8 text-center text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-lg font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-7 text-lg font-medium"
                  >
                    Add to Cart - ${(discountedPrice * quantity).toFixed(2)}
                  </Button>
                </div>

                {/* Restaurant Details */}
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>{offer.restaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>{offer.restaurant.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="lg:w-[45%] bg-orange-50">
              <div className="sticky top-20 h-[calc(100vh-5rem)] w-full">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferDetail; 