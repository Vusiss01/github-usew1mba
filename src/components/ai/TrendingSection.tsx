import React from "react";
import { TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import RecommendationCard from "./RecommendationCard";

interface TrendingItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime?: string;
  tags?: string[];
  isNew?: boolean;
}

interface TrendingSectionProps {
  items?: TrendingItem[];
  className?: string;
}

const TrendingSection = ({
  items = [
    {
      id: "trend1",
      name: "Spicy Ramen Bowl",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      deliveryTime: "20-30 min",
      tags: ["Japanese", "Spicy"],
      isNew: true,
    },
    {
      id: "trend2",
      name: "Avocado Toast",
      image:
        "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      deliveryTime: "15-25 min",
      tags: ["Breakfast", "Healthy"],
      isNew: false,
    },
    {
      id: "trend3",
      name: "Acai Bowl",
      image:
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      deliveryTime: "15-20 min",
      tags: ["Healthy", "Breakfast"],
      isNew: true,
    },
    {
      id: "trend4",
      name: "Truffle Pasta",
      image:
        "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      deliveryTime: "25-35 min",
      tags: ["Italian", "Gourmet"],
      isNew: false,
    },
  ],
  className = "",
}: TrendingSectionProps) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Trending Now</h2>
          <TrendingUp className="h-5 w-5 text-orange-500" />
        </div>
        <Button
          variant="ghost"
          className="text-orange-500 flex items-center gap-1"
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
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
