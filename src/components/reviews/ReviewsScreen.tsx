import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Star, Camera, X } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  date: string;
  photos?: string[];
}

const ReviewsScreen = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewPhotos, setReviewPhotos] = useState<string[]>([]);

  // Sample vendor data
  const vendorData = {
    id: vendorId || "burgers",
    name: "Burgers & Co.",
    rating: 4.7,
    reviewCount: 523,
  };

  // Sample reviews
  const reviews: Review[] = [
    {
      id: "rev1",
      userName: "John D.",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      rating: 5,
      text: "Amazing burgers! The Classic Cheeseburger was juicy and flavorful. Definitely coming back for more.",
      date: "2 days ago",
      photos: [
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      ],
    },
    {
      id: "rev2",
      userName: "Sarah M.",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 4,
      text: "Great food and quick delivery. The fries were a bit cold, but the burger was perfect.",
      date: "1 week ago",
    },
    {
      id: "rev3",
      userName: "Michael R.",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      text: "Best burger joint in town! The Double Bacon Burger is to die for. Highly recommend!",
      date: "2 weeks ago",
      photos: [
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      ],
    },
    {
      id: "rev4",
      userName: "Emily L.",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 3,
      text: "The food was good, but delivery took longer than expected. Would give another chance.",
      date: "3 weeks ago",
    },
  ];

  // Submit review
  const submitReview = () => {
    // In a real app, this would send the review to a backend
    setIsWritingReview(false);
    setRating(0);
    setReviewText("");
    setReviewPhotos([]);
  };

  // Add photo to review
  const addPhoto = () => {
    // In a real app, this would open a file picker
    // For demo purposes, we'll add a random image
    const randomImage = `https://images.unsplash.com/photo-${1550317138 + Math.floor(Math.random() * 10000)}-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80`;
    setReviewPhotos([...reviewPhotos, randomImage]);
  };

  // Remove photo from review
  const removePhoto = (index: number) => {
    setReviewPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          {/* Back button and title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold">Reviews</h1>
            </div>
            {!isWritingReview && (
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => setIsWritingReview(true)}
              >
                Write a Review
              </Button>
            )}
          </div>

          {isWritingReview ? (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="font-semibold mb-4">
                Write a Review for {vendorData.name}
              </h2>

              {/* Rating Selection */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">Your Rating</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="p-1"
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`h-8 w-8 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">Your Review</p>
                <Textarea
                  placeholder="Share your experience with this restaurant..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full h-32"
                />
              </div>

              {/* Photo Upload */}
              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  Add Photos (Optional)
                </p>
                <div className="flex flex-wrap gap-2">
                  {reviewPhotos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 rounded-md overflow-hidden"
                    >
                      <img
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                  {reviewPhotos.length < 3 && (
                    <button
                      className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center hover:border-gray-400"
                      onClick={addPhoto}
                    >
                      <Camera className="h-6 w-6 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsWritingReview(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={submitReview}
                  disabled={rating === 0 || reviewText.trim() === ""}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Rating Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">{vendorData.name}</h2>
                    <div className="flex items-center mt-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium">{vendorData.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({vendorData.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{review.userName}</h3>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mt-2">{review.text}</p>
                        {review.photos && review.photos.length > 0 && (
                          <div className="flex mt-3 space-x-2">
                            {review.photos.map((photo, index) => (
                              <div
                                key={index}
                                className="w-16 h-16 rounded-md overflow-hidden"
                              >
                                <img
                                  src={photo}
                                  alt={`Review photo ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="md:hidden">
        <BottomNavBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReviewsScreen;
