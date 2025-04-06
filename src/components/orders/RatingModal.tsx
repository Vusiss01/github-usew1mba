import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
  orderDetails: {
    id: string;
    restaurantName: string;
    items: { name: string; quantity: number }[];
  };
}

export default function RatingModal({
  isOpen,
  onClose,
  onSubmit,
  orderDetails
}: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, review);
    setRating(0);
    setReview('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Rate Your Order</h2>
        <p className="text-gray-600 mb-2">{orderDetails.restaurantName}</p>
        <p className="text-sm text-gray-500 mb-6">Order #{orderDetails.id}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="flex flex-col items-center">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {rating === 0 ? 'Select a rating' : `${rating} out of 5 stars`}
            </p>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Write your review
            </label>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full h-32"
            />
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Order Items:</h3>
            <ul className="text-sm text-gray-600">
              {orderDetails.items.map((item, index) => (
                <li key={index}>
                  {item.quantity}x {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={rating === 0}
          >
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  );
} 