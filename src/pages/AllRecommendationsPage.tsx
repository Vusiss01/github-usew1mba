import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Sparkles } from "lucide-react";
import NavigationTabs from "../components/layout/NavigationTabs";
import RecommendationCard from "../components/ai/RecommendationCard";
import { motion } from "framer-motion";
import Logo from "../components/layout/Logo";

const AllRecommendationsPage = () => {
  const navigate = useNavigate();

  // Sample recommendations data (expanded version)
  const recommendations = [
    {
      id: "burger-combo",
      name: "Classic Burger Combo",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      deliveryTime: "20-30 min",
      tags: ["Popular", "Trending"],
      reason: "Based on your previous orders",
      isNew: false,
    },
    {
      id: "pizza-special",
      name: "Margherita Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      deliveryTime: "25-35 min",
      tags: ["Vegetarian", "Chef's Choice"],
      reason: "Popular in your area",
      isNew: true,
    },
    {
      id: "sushi-platter",
      name: "Premium Sushi Platter",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      deliveryTime: "30-40 min",
      tags: ["Premium", "Healthy"],
      reason: "Matches your preferences",
      isNew: false,
    },
    {
      id: "taco-tuesday",
      name: "Street Tacos Set",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      deliveryTime: "15-25 min",
      tags: ["Quick Delivery", "Value"],
      reason: "Trending now",
      isNew: true,
    },
    {
      id: "curry-special",
      name: "Butter Chicken Curry",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      deliveryTime: "30-40 min",
      tags: ["Spicy", "Popular"],
      reason: "You might like this",
      isNew: false,
    },
    {
      id: "noodles-special",
      name: "Signature Noodles",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      deliveryTime: "20-30 min",
      tags: ["Best Seller", "Authentic"],
      reason: "Based on your cuisine preferences",
      isNew: false,
    },
    // Add more recommendations
  ];

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
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Recommended for You</h1>
              <Sparkles className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <RecommendationCard
                id={item.id}
                name={item.name}
                image={item.image}
                rating={item.rating}
                deliveryTime={item.deliveryTime}
                tags={item.tags}
                isNew={item.isNew}
                reason={item.reason}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllRecommendationsPage; 