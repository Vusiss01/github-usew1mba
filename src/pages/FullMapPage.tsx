import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Clock, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import NavigationTabs from "../components/layout/NavigationTabs";
import MapView from "../components/ai/MapView";
import { motion } from "framer-motion";
import Logo from "../components/layout/Logo";

const FullMapPage = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample store data
  const nearbyStores = [
    {
      id: "burgers",
      name: "Burgers & Co.",
      image: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      deliveryTime: "20 min",
      distance: "0.8 mi",
      address: "123 Main St",
      rating: 4.8,
      lat: 40.7128,
      lng: -74.0060,
    },
    {
      id: "pizza",
      name: "Pizza Palace",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      deliveryTime: "25 min",
      distance: "1.2 mi",
      address: "456 Market St",
      rating: 4.6,
      lat: 40.7112,
      lng: -74.0055,
    },
    // Add more stores with coordinates
  ];

  const handleStoreClick = (storeId: string) => {
    navigate(`/category/${storeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search nearby"
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Map Section */}
        <div className="flex-1 relative">
          <MapView height="h-[calc(100vh-8rem)]" />
        </div>

        {/* Store List Section */}
        <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Nearby Vendors</h2>
            <div className="space-y-4">
              {nearbyStores.map((store) => (
                <motion.div
                  key={store.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedStore === store.id
                      ? "bg-orange-50 border-orange-500"
                      : "bg-white hover:bg-gray-50 border-gray-200"
                  } border`}
                  onClick={() => setSelectedStore(store.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900">{store.name}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{store.deliveryTime}</span>
                        <span className="mx-2">•</span>
                        <span>{store.distance}</span>
                      </div>
                      <div className="mt-2">
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleStoreClick(store.id)}
                        >
                          View Menu
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMapPage; 