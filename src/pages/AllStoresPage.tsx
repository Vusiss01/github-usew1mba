import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import NavigationTabs from "../components/layout/NavigationTabs";
import SortFilterBar from "../components/layout/SortFilterBar";
import { motion } from "framer-motion";
import Logo from "../components/layout/Logo";

const AllStoresPage = () => {
  const navigate = useNavigate();
  const [activeSort, setActiveSort] = useState("recommended");

  // Sort options
  const sortOptions = [
    { id: "recommended", label: "Recommended" },
    { id: "popular", label: "Most popular" },
    { id: "rating", label: "Rating" },
    { id: "earliest", label: "Earliest arrival" },
  ];

  // Nearby stores data (expanded version of the data from HomePage)
  const allStores = [
    {
      id: "burgers",
      name: "Burgers & Co.",
      image: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      deliveryTime: "20 min",
      rating: 4.8,
      reviews: 2453,
      priceRange: "$$",
      cuisine: "American",
    },
    {
      id: "pizza",
      name: "Pizza Palace",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      deliveryTime: "25 min",
      rating: 4.6,
      reviews: 1897,
      priceRange: "$$",
      cuisine: "Italian",
    },
    {
      id: "sushi",
      name: "Sushi Express",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      deliveryTime: "30 min",
      rating: 4.9,
      reviews: 3241,
      priceRange: "$$$",
      cuisine: "Japanese",
    },
    {
      id: "tacos",
      name: "Taco Fiesta",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      deliveryTime: "15 min",
      rating: 4.7,
      reviews: 1563,
      priceRange: "$",
      cuisine: "Mexican",
    },
    {
      id: "indian",
      name: "Spice Garden",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      deliveryTime: "35 min",
      rating: 4.5,
      reviews: 892,
      priceRange: "$$",
      cuisine: "Indian",
    },
    {
      id: "chinese",
      name: "Golden Dragon",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      deliveryTime: "25 min",
      rating: 4.4,
      reviews: 1245,
      priceRange: "$$",
      cuisine: "Chinese",
    },
    // Add more stores here
  ];

  const handleStoreClick = (storeId: string) => {
    navigate(`/category/${storeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <Logo />
            </div>
            <h1 className="text-xl font-bold">All Stores</h1>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Sort and Filter Bar */}
        <SortFilterBar
          activeSort={activeSort}
          options={sortOptions}
          onSortChange={setActiveSort}
        />

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {allStores.map((store) => (
            <motion.div
              key={store.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
              onClick={() => handleStoreClick(store.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-48">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
                  {store.priceRange}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg">{store.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{store.cuisine}</p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-orange-500">
                    <span className="font-bold">{store.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({store.reviews})</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{store.deliveryTime}</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-500 text-sm">$0.99 Delivery Fee</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllStoresPage; 