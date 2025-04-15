import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
  Filter,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const BrowseRestaurantsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Burger Palace",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
      rating: 4.8,
      deliveryTime: "15-25",
      cuisine: "American",
      priceRange: "$$",
      distance: "0.8 mi",
    },
    {
      id: 2,
      name: "Pizza Heaven",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
      rating: 4.6,
      deliveryTime: "20-30",
      cuisine: "Italian",
      priceRange: "$$",
      distance: "1.2 mi",
    },
    {
      id: 3,
      name: "Sushi Express",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
      rating: 4.9,
      deliveryTime: "25-35",
      cuisine: "Japanese",
      priceRange: "$$$",
      distance: "1.5 mi",
    },
    {
      id: 4,
      name: "Taco Fiesta",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
      rating: 4.7,
      deliveryTime: "15-25",
      cuisine: "Mexican",
      priceRange: "$",
      distance: "0.5 mi",
    },
    {
      id: 5,
      name: "Noodle House",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
      rating: 4.5,
      deliveryTime: "20-30",
      cuisine: "Asian",
      priceRange: "$$",
      distance: "1.8 mi",
    },
    {
      id: 6,
      name: "Sandwich Spot",
      image:
        "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&q=80",
      rating: 4.4,
      deliveryTime: "10-20",
      cuisine: "American",
      priceRange: "$",
      distance: "0.3 mi",
    },
  ];

  const cuisineFilters = [
    "All",
    "American",
    "Italian",
    "Japanese",
    "Mexican",
    "Asian",
    "Indian",
    "Thai",
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Browse Restaurants</h1>
        <Button
          onClick={() => navigate("/restaurants/add-restaurant")}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Add Your Restaurant
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for restaurants or cuisines"
            className="pl-10 pr-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Near Me</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* Cuisine Filters */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 mb-6">
        <div className="flex gap-2">
          {cuisineFilters.map((cuisine, index) => (
            <Button
              key={index}
              variant={cuisine === "All" ? "default" : "outline"}
              className={
                cuisine === "All" ? "bg-orange-500 hover:bg-orange-600" : ""
              }
            >
              {cuisine}
            </Button>
          ))}
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{restaurant.name}</h3>
                <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  <span>{restaurant.rating}</span>
                  <span className="ml-1">★</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{restaurant.cuisine}</span>
                <span className="mx-2">•</span>
                <span>{restaurant.priceRange}</span>
                <span className="mx-2">•</span>
                <span>{restaurant.distance}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-orange-500">
                  ⚡ {restaurant.deliveryTime} min
                </span>
                <span className="mx-2">•</span>
                <span>Free Delivery</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="default"
            className="bg-orange-500 hover:bg-orange-600"
          >
            1
          </Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline" size="icon">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrowseRestaurantsPage;
