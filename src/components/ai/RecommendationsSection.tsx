import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import RecommendationCard from "./RecommendationCard";

interface RecommendationItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime?: string;
  tags?: string[];
  isNew?: boolean;
  reason?: string;
}

interface RecommendationsSectionProps {
  items?: RecommendationItem[];
  className?: string;
}

const RecommendationsSection = ({
  items = [
    {
      id: "rec1",
      name: "Burgers & Co.",
      image:
        "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      deliveryTime: "15-25 min",
      tags: ["Burgers", "American"],
      isNew: false,
      reason: "Based on your recent orders",
    },
    {
      id: "rec2",
      name: "Green Bowl",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      deliveryTime: "15-25 min",
      tags: ["Healthy", "Salads"],
      isNew: true,
      reason: "Matches your dietary preferences",
    },
    {
      id: "rec3",
      name: "Sushi Express",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      deliveryTime: "25-40 min",
      tags: ["Japanese", "Sushi"],
      isNew: false,
      reason: "You might like this",
    },
    {
      id: "rec4",
      name: "Pizza Palace",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      deliveryTime: "20-35 min",
      tags: ["Pizza", "Italian"],
      isNew: false,
      reason: "Popular in your area",
    },
  ],
  className = "",
}: RecommendationsSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Recommended for You</h2>
          <Sparkles className="h-5 w-5 text-orange-500" />
        </div>
        <Button
          variant="ghost"
          className="text-orange-500 flex items-center gap-1"
          onClick={() => navigate("/recommendations")}
        >
          See All <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {items.map((item) => (
          <RecommendationCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            rating={item.rating}
            deliveryTime={item.deliveryTime}
            tags={item.tags}
            isNew={item.isNew}
            reason={item.reason}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
