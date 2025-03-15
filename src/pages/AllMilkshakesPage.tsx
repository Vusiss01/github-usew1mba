import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Coffee, Star } from "lucide-react";
import NavigationTabs from "../components/layout/NavigationTabs";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import Logo from "../components/layout/Logo";

const AllMilkshakesPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  // Sample milkshakes data
  const milkshakes = [
    {
      id: "chocolate-supreme",
      name: "Chocolate Supreme",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 6.99,
      rating: 4.8,
      category: "classic",
      description: "Rich chocolate milkshake topped with whipped cream",
      toppings: ["Whipped Cream", "Chocolate Chips", "Cherry"],
      isPopular: true,
    },
    {
      id: "strawberry-dream",
      name: "Strawberry Dream",
      image: "https://images.unsplash.com/photo-1586917079593-0722c1d4237d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 7.49,
      rating: 4.7,
      category: "fruity",
      description: "Fresh strawberries blended with vanilla ice cream",
      toppings: ["Fresh Strawberries", "Whipped Cream"],
      isPopular: true,
    },
    {
      id: "oreo-blast",
      name: "Oreo Blast",
      image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 7.99,
      rating: 4.9,
      category: "premium",
      description: "Cookies and cream milkshake with Oreo chunks",
      toppings: ["Oreo Crumbs", "Whipped Cream", "Chocolate Sauce"],
      isPopular: true,
    },
    {
      id: "vanilla-bean",
      name: "Vanilla Bean",
      image: "https://images.unsplash.com/photo-1568901839119-631418a3910d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 5.99,
      rating: 4.5,
      category: "classic",
      description: "Classic vanilla bean milkshake",
      toppings: ["Whipped Cream", "Vanilla Bean"],
      isPopular: false,
    },
    {
      id: "caramel-pretzel",
      name: "Caramel Pretzel",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 8.49,
      rating: 4.8,
      category: "premium",
      description: "Sweet and salty pretzel milkshake with caramel",
      toppings: ["Pretzel Pieces", "Caramel Sauce", "Whipped Cream"],
      isPopular: true,
    },
    {
      id: "mint-chip",
      name: "Mint Chocolate Chip",
      image: "https://images.unsplash.com/photo-1579954115563-9172ed3c3db4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 7.49,
      rating: 4.6,
      category: "classic",
      description: "Refreshing mint milkshake with chocolate chips",
      toppings: ["Chocolate Chips", "Mint Leaves", "Whipped Cream"],
      isPopular: false,
    },
  ];

  const filters = [
    { id: "all", label: "All" },
    { id: "classic", label: "Classic" },
    { id: "premium", label: "Premium" },
    { id: "fruity", label: "Fruity" },
  ];

  const filteredMilkshakes = activeFilter === "all" 
    ? milkshakes 
    : milkshakes.filter(shake => shake.category === activeFilter);

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
              <h1 className="text-xl font-bold">Delicious Milkshakes</h1>
              <Coffee className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map(filter => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`rounded-full ${
                  activeFilter === filter.id 
                    ? "bg-orange-500 text-white hover:bg-orange-600" 
                    : "text-gray-600 hover:text-orange-500"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMilkshakes.map((shake, index) => (
            <motion.div
              key={shake.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={shake.image}
                  alt={shake.name}
                  className="w-full h-48 object-cover"
                />
                {shake.isPopular && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{shake.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{shake.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{shake.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {shake.toppings.map((topping, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {topping}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-orange-500">
                    ${shake.price.toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => navigate(`/item/${shake.id}`)}
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllMilkshakesPage; 