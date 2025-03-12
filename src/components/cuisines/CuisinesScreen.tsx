import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationTabs from "../layout/NavigationTabs";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "../ui/input";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface Cuisine {
  id: string;
  name: string;
  image: string;
  restaurantCount: number;
}

const CuisinesScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample cuisines data
  const cuisines: Cuisine[] = [
    {
      id: "american",
      name: "American",
      image:
        "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 24,
    },
    {
      id: "italian",
      name: "Italian",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 18,
    },
    {
      id: "japanese",
      name: "Japanese",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 12,
    },
    {
      id: "mexican",
      name: "Mexican",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 15,
    },
    {
      id: "indian",
      name: "Indian",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 10,
    },
    {
      id: "chinese",
      name: "Chinese",
      image:
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 14,
    },
    {
      id: "thai",
      name: "Thai",
      image:
        "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 8,
    },
    {
      id: "mediterranean",
      name: "Mediterranean",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 9,
    },
    {
      id: "french",
      name: "French",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 6,
    },
    {
      id: "korean",
      name: "Korean",
      image:
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 5,
    },
    {
      id: "vietnamese",
      name: "Vietnamese",
      image:
        "https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 7,
    },
    {
      id: "greek",
      name: "Greek",
      image:
        "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      restaurantCount: 4,
    },
  ];

  // Filter cuisines based on search query
  const filteredCuisines = searchQuery
    ? cuisines.filter((cuisine) =>
        cuisine.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : cuisines;

  // Navigate to cuisine restaurants
  const handleCuisineClick = (cuisineId: string) => {
    navigate(`/vendors?cuisine=${cuisineId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          {/* Back button and title */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">Cuisines</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search cuisines"
              className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Cuisines Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCuisines.map((cuisine) => (
              <div
                key={cuisine.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
                onClick={() => handleCuisineClick(cuisine.id)}
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={cuisine.image}
                    alt={cuisine.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-800">{cuisine.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {cuisine.restaurantCount}{" "}
                    {cuisine.restaurantCount === 1
                      ? "Restaurant"
                      : "Restaurants"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCuisines.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-700">
                No cuisines found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="md:hidden">
        <BottomNavBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CuisinesScreen;
