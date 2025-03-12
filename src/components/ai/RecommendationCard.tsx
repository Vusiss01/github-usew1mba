import React from "react";
import { Star, Clock, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime?: string;
  tags?: string[];
  isNew?: boolean;
  reason?: string;
  onClick?: () => void;
  className?: string;
}

const RecommendationCard = ({
  id,
  name,
  image,
  rating,
  deliveryTime,
  tags = [],
  isNew = false,
  reason = "",
  onClick,
  className = "",
}: RecommendationCardProps) => {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-[220px] bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300",
        className,
      )}
      onClick={onClick}
    >
      <div className="relative h-32">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        {isNew && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            <span>New</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 line-clamp-1">{name}</h3>

        <div className="flex items-center mt-1">
          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-xs font-medium">{rating}</span>
          {deliveryTime && (
            <>
              <span className="mx-1 text-gray-300">•</span>
              <Clock className="h-3 w-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{deliveryTime}</span>
            </>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-gray-50 text-xs px-1.5 py-0"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {reason && (
          <p className="mt-2 text-xs text-gray-500 italic line-clamp-2">
            {reason}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
