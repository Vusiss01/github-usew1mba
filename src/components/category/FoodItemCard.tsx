import React from "react";
import { Plus, Star, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface FoodItemCardProps {
  id?: string;
  name?: string;
  image?: string;
  price?: number;
  rating?: number;
  points?: number;
  category?: string;
  description?: string;
  prepTime?: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  calories?: number;
  onClick?: () => void;
}

const FoodItemCard = ({
  id = "1",
  name = "Classic Cheeseburger",
  image = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  price = 8.99,
  rating = 4.5,
  points = 25,
  category = "Burger",
  description = "Juicy beef patty with melted cheese, lettuce, tomato, and special sauce",
  prepTime = "15-20 min",
  isPopular = false,
  isVegetarian = false,
  isSpicy = false,
  calories = 650,
  onClick = () => {},
}: FoodItemCardProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
      onClick={onClick}
    >
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />

        {/* Points badge */}
        <div className="absolute top-2 right-2 bg-amber-400 text-xs font-bold px-2 py-1 rounded-full text-white">
          {points} pts
        </div>

        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-xs font-bold px-3 py-1 rounded-full text-white">
            Popular
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {name}
          </h3>
          <span className="text-green-600 font-bold">${price.toFixed(2)}</span>
        </div>

        <div className="flex items-center mt-1 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-700 ml-1">{rating}</span>
          </div>
          <div className="mx-2 text-gray-300">•</div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-3 h-3 mr-1" />
            {prepTime}
          </div>
        </div>

        {description && (
          <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2 flex-grow">
            {description}
          </p>
        )}

        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="flex gap-1">
            {isVegetarian && (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 text-xs"
              >
                Veg
              </Badge>
            )}
            {isSpicy && (
              <Badge
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200 text-xs"
              >
                Spicy
              </Badge>
            )}
            {calories > 0 && (
              <span className="text-xs text-gray-500">{calories} cal</span>
            )}
          </div>

          <Button
            size="sm"
            className="rounded-full h-8 w-8 p-0 bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
