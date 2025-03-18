import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import RecommendationCard from "./RecommendationCard";

interface RecommendedItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  tags: string[];
  isNew?: boolean;
  recommendation?: string;
}

const recommendedItems: RecommendedItem[] = [
  {
    id: "burgers-and-co",
    name: "Burgers & Co.",
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.7,
    deliveryTime: "15-25 min",
    tags: ["Burgers", "American"],
    recommendation: "Based on your recent orders"
  },
  {
    id: "green-bowl",
    name: "Green Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.6,
    deliveryTime: "15-25 min",
    tags: ["Healthy", "Salads"],
    isNew: true,
    recommendation: "Matches your dietary preferences"
  },
  {
    id: "sushi-express",
    name: "Sushi Express",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.8,
    deliveryTime: "25-40 min",
    tags: ["Japanese", "Sushi"],
    recommendation: "You might like this"
  },
  {
    id: "pizza-palace",
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.5,
    deliveryTime: "20-35 min",
    tags: ["Pizza", "Italian"],
    recommendation: "Popular in your area"
  }
];

const RecommendationsSection: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <section className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recommended for You</h2>
        <button 
          className="text-sm text-orange-500 font-medium flex items-center"
          onClick={() => navigate('/recommendations')}
        >
          See All <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendedItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-100"
            onClick={() => navigate(`/recommended/${item.id}`)}
          >
            <div className="relative h-40">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.isNew && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  New
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-sm font-medium">{item.rating}</span>
                <span className="mx-2 text-gray-300">•</span>
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500 ml-1">{item.deliveryTime}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {item.recommendation && (
                <div className="text-xs text-gray-500 mt-2 italic">
                  {item.recommendation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendationsSection;
