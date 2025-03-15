import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, Users } from "lucide-react";
import NavigationTabs from "../components/layout/NavigationTabs";
import RecommendationCard from "../components/ai/RecommendationCard";
import { motion } from "framer-motion";
import Logo from "../components/layout/Logo";

const AllTrendingPage = () => {
  const navigate = useNavigate();

  // Sample trending items data
  const trendingItems = [
    {
      id: "spicy-ramen",
      name: "Spicy Miso Ramen",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      deliveryTime: "20-30 min",
      tags: ["Trending", "Spicy"],
      activeUsers: 342,
      isNew: true,
    },
    {
      id: "poke-bowl",
      name: "Fresh Poke Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      deliveryTime: "15-25 min",
      tags: ["Healthy", "Popular"],
      activeUsers: 289,
      isNew: false,
    },
    {
      id: "korean-bbq",
      name: "Korean BBQ Set",
      image: "https://images.unsplash.com/photo-1632558610168-8377854fcf6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      deliveryTime: "25-35 min",
      tags: ["Hot Deal", "Group Meal"],
      activeUsers: 256,
      isNew: false,
    },
    {
      id: "acai-bowl",
      name: "Super Acai Bowl",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      deliveryTime: "15-20 min",
      tags: ["Breakfast", "Healthy"],
      activeUsers: 198,
      isNew: true,
    },
    {
      id: "birria-tacos",
      name: "Birria Tacos",
      image: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      deliveryTime: "20-30 min",
      tags: ["Trending", "Authentic"],
      activeUsers: 423,
      isNew: true,
    },
    {
      id: "truffle-pasta",
      name: "Truffle Pasta",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      deliveryTime: "25-35 min",
      tags: ["Premium", "Popular"],
      activeUsers: 167,
      isNew: false,
    },
    // Add more trending items
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
              <h1 className="text-xl font-bold">Trending Now</h1>
              <TrendingUp className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-75 rounded-full px-3 py-1 flex items-center">
                <Users className="h-4 w-4 text-white mr-1" />
                <span className="text-white text-sm">{item.activeUsers}</span>
              </div>
              <RecommendationCard
                id={item.id}
                name={item.name}
                image={item.image}
                rating={item.rating}
                deliveryTime={item.deliveryTime}
                tags={item.tags}
                isNew={item.isNew}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllTrendingPage; 