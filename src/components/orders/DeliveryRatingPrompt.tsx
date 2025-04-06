import React, { useState, useEffect } from 'react';
import { Star, X, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

interface DeliveryRatingPromptProps {
  order: {
    id: string;
    restaurantName: string;
    items: { name: string; quantity: number }[];
  };
  onSubmit: (orderId: string, rating: number, review: string) => void;
  onClose: () => void;
}

export default function DeliveryRatingPrompt({
  order,
  onSubmit,
  onClose
}: DeliveryRatingPromptProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Auto-close the prompt after submission and thank you message
    if (isSubmitted) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(order.id, rating, review);
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg w-96 p-6 border border-gray-200"
      >
        {!isSubmitted ? (
          <>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-semibold">How was your order?</h3>
              <p className="text-sm text-gray-600">
                Rate your experience with {order.restaurantName}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating */}
              <div className="flex flex-col items-center">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none transform transition-transform hover:scale-110"
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
                  {rating === 0 ? 'Tap to rate' : `${rating} out of 5 stars`}
                </p>
              </div>

              {/* Quick Review */}
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Add a comment (optional)"
                className="w-full h-20 resize-none"
              />

              {/* Submit Button */}
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="px-4"
                >
                  Later
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4"
                  disabled={rating === 0}
                >
                  Submit Review
                </Button>
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-4"
          >
            <ThumbsUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-green-600">Thank you!</h3>
            <p className="text-sm text-gray-600">Your feedback helps us improve</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
} 