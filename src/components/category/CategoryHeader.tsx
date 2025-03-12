import React from "react";
import { ChevronLeft, MapPin, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryHeaderProps {
  categoryId?: string;
  categoryName?: string;
  categoryDescription?: string;
  categoryImage?: string;
  averageRating?: number;
  deliveryTime?: string;
  distance?: string;
}

const CategoryHeader = ({
  categoryId = "burgers",
  categoryName = "Burgers & Co.",
  categoryDescription = "Delicious handcrafted burgers made with premium ingredients. From classic cheeseburgers to gourmet creations, we have something for everyone.",
  categoryImage = "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  averageRating = 4.7,
  deliveryTime = "15-25 min",
  distance = "1.2 mi",
}: CategoryHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      {/* Hero Image */}
      <div className="w-full h-[220px] relative overflow-hidden">
        <img
          src={categoryImage}
          alt={categoryName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="px-4 py-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>

        <div className="flex items-center mt-2 text-sm text-gray-600 flex-wrap gap-y-2">
          <div className="flex items-center mr-4">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="font-medium">{averageRating}</span>
            <span className="text-gray-400 ml-1">(500+)</span>
          </div>

          <div className="flex items-center mr-4">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            <span>{deliveryTime}</span>
          </div>

          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
            <span>{distance}</span>
          </div>
        </div>

        <p className="mt-3 text-gray-600 text-sm">{categoryDescription}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {["$$$", "Burgers", "American", "Fast Casual"].map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
