import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "./layout/SidebarContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Search,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  SlidersHorizontal,
  Menu,
  ShoppingBag,
} from "lucide-react";
import CartSidebar from "./cart/CartSidebar";
import NavigationTabs from "./layout/NavigationTabs";
import Footer from "./layout/Footer";
import BottomNavBar from "./layout/BottomNavBar";
import StoreCard from "./layout/StoreCard";
import FoodCategoryCard from "./layout/FoodCategoryCard";
import SortFilterBar from "./layout/SortFilterBar";
import FilterSidebar from "./layout/FilterSidebar";
import { motion } from "framer-motion";
import Logo from "./layout/Logo";

// AI Components
import VoiceOrderButton from "./ai/VoiceOrderButton";
import MapView from "./ai/MapView";
import RecommendationsSection from "./ai/RecommendationsSection";
import TrendingSection from "./ai/TrendingSection";
import QuickLinks from "./ai/QuickLinks";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  deliveryTime: string;
  rating: number;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showVoiceTooltip, setShowVoiceTooltip] = useState(false);
  const [activeSort, setActiveSort] = useState("recommended");
  const [location, setLocation] = useState("12 Roncroft Dr");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { isOpen, toggleSidebar } = useSidebar();

  // Open sidebar by default on home page
  useEffect(() => {
    if (!isOpen) {
      toggleSidebar();
    }
  }, []);
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredStores, setFilteredStores] = useState([]);

  // Show voice tooltip on first render
  useEffect(() => {
    // In a real app, this would check if it's the user's first time
    const isFirstTime = !localStorage.getItem("hasSeenVoiceTooltip");
    setShowVoiceTooltip(isFirstTime);

    if (isFirstTime) {
      localStorage.setItem("hasSeenVoiceTooltip", "true");
    }
  }, []);

  // Sort options
  const sortOptions = [
    { id: "recommended", label: "Recommended" },
    { id: "popular", label: "Most popular" },
    { id: "rating", label: "Rating" },
    { id: "earliest", label: "Earliest arrival" },
  ];

  // Nearby stores data
  const nearbyStores = [
    {
      id: "burgers",
      name: "Burgers & Co.",
      image:
        "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      deliveryTime: "20 min",
    },
    {
      id: "pizza",
      name: "Pizza Palace",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      deliveryTime: "25 min",
    },
    {
      id: "sushi",
      name: "Sushi Express",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      deliveryTime: "30 min",
    },
    {
      id: "tacos",
      name: "Taco Fiesta",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      deliveryTime: "15 min",
    },
    {
      id: "indian",
      name: "Spice Garden",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      deliveryTime: "35 min",
    },
    {
      id: "chinese",
      name: "Golden Dragon",
      image:
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      deliveryTime: "25 min",
    },
  ];

  // Food categories
  const foodCategories = [
    {
      id: "burgers",
      name: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "pizza",
      name: "Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "sushi",
      name: "Sushi",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "mexican",
      name: "Mexican",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ];

  // Navigate to restaurant detail page
  const handleStoreClick = (storeId) => {
    navigate(`/vendor/${storeId}`);
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);

    // Filter stores based on the selected filters
    let filtered = [...nearbyStores];

    // Apply sorting
    if (filters.sortBy) {
      filtered = filtered.sort((a, b) => {
        if (filters.sortBy === "earliest") {
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        } else if (filters.sortBy === "rating") {
          return (b.rating || 4.5) - (a.rating || 4.5);
        }
        // Default to recommended or popular
        return 0;
      });
    }

    // Apply delivery fee filter
    if (filters.maxDeliveryFee) {
      filtered = filtered.filter((store) => {
        // Simulate delivery fee (in a real app this would come from the data)
        const deliveryFee = parseFloat((Math.random() * 6 + 2).toFixed(2));
        return deliveryFee <= filters.maxDeliveryFee;
      });
    }

    // Apply dietary filters (in a real app, this would be based on restaurant attributes)
    if (filters.vegetarian || filters.vegan) {
      filtered = filtered.filter((store) => {
        // Simulate vegetarian/vegan options
        const hasVegetarian = Math.random() > 0.3;
        const hasVegan = Math.random() > 0.6;

        if (filters.vegetarian && filters.vegan) {
          return hasVegetarian && hasVegan;
        } else if (filters.vegetarian) {
          return hasVegetarian;
        } else if (filters.vegan) {
          return hasVegan;
        }
        return true;
      });
    }

    setFilteredStores(filtered);
  };

  // Initialize filtered stores
  useEffect(() => {
    setFilteredStores(nearbyStores);
  }, []);

  // Sample cart items for demo
  useEffect(() => {
    // In a real app, this would come from a context or state management
    const sampleCartItems = [
      {
        id: "burger-1",
        name: "Classic Cheeseburger",
        price: 8.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        options: ["No pickles", "Extra cheese"],
      },
      {
        id: "fries-1",
        name: "French Fries",
        price: 3.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      },
    ];

    setCartItems(sampleCartItems);
    updateCartCount(sampleCartItems);
  }, []);

  // Update cart item quantity
  const updateCartItemQuantity = (id, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
    setCartItems(updatedItems);
    updateCartCount(updatedItems);
  };

  // Remove item from cart
  const removeCartItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    updateCartCount(updatedItems);
  };

  // Update cart count
  const updateCartCount = (items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  return (
    <div className={`min-h-screen bg-white flex flex-col ${isOpen ? 'md:ml-64' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          {/* Logo */}
          <Logo />

          {/* Delivery/Pickup Toggle */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full p-1">
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${deliveryMode === "delivery" ? "bg-white shadow-sm" : "text-gray-700"}`}
              onClick={() => setDeliveryMode("delivery")}
            >
              Delivery
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${deliveryMode === "pickup" ? "bg-white shadow-sm" : "text-gray-700"}`}
              onClick={() => setDeliveryMode("pickup")}
            >
              Pickup
            </button>
          </div>

          {/* Location Selector */}
          <div className="hidden md:flex items-center relative group">
            <button className="flex items-center text-sm font-medium">
              <MapPin className="h-4 w-4 mr-1 text-gray-600" />
              <span className="mr-1">{location}</span>
              <span className="text-gray-500 mx-1">•</span>
              <span className="text-gray-500">Now</span>
              <ChevronDown className="h-4 w-4 ml-1 text-gray-600" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md py-2 z-50 hidden group-hover:block">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-500 mb-1">DELIVERY ADDRESSES</p>
              </div>
              {[
                "12 Roncroft Dr",
                "456 Park Ave, Floor 8",
                "789 Main St, Apt 3B",
                "123 Broadway, Suite 500",
              ].map((addr, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${addr === location ? "text-orange-500 font-medium" : "text-gray-700"}`}
                  onClick={() => setLocation(addr)}
                >
                  {addr}
                </button>
              ))}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-orange-500 hover:bg-gray-50 flex items-center"
                  onClick={() => navigate("/splash")}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Add new address
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search Bizibyte"
                className="w-full pl-10 pr-12 py-2 rounded-full border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // Filter stores based on search query
                  const query = e.target.value.toLowerCase();
                  if (query) {
                    const filtered = nearbyStores.filter(
                      (store) =>
                        store.name.toLowerCase().includes(query) ||
                        store.id.toLowerCase().includes(query),
                    );
                    setFilteredStores(filtered);
                  } else {
                    setFilteredStores(nearbyStores);
                  }
                }}
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                <VoiceOrderButton
                  showTooltip={showVoiceTooltip}
                  onTranscript={(text) => {
                    console.log("Received transcript in HomePage:", text);
                    setSearchQuery(text);
                    // Filter stores based on voice transcript
                    const query = text.toLowerCase();
                    if (query) {
                      const filtered = nearbyStores.filter(
                        (store) =>
                          store.name.toLowerCase().includes(query) ||
                          store.id.toLowerCase().includes(query),
                      );
                      setFilteredStores(filtered);
                    } else {
                      setFilteredStores(nearbyStores);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Cart, Filter and User */}
          <div className="flex items-center">
            <button
              className="relative mr-2"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <button
                className="text-sm font-medium hover:text-orange-500"
                onClick={() => navigate("/auth")}
              >
                Log in
              </button>
              <button
                className="text-sm font-medium hover:text-orange-500"
                onClick={() => navigate("/auth")}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        onFilterChange={handleFilterChange}
      />

      {/* Overlay when sidebar is open */}
      {isFilterSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsFilterSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className="px-4 py-6">
          {/* Mobile Location Bar */}
          <div className="md:hidden flex items-center justify-between mb-4 bg-gray-100 rounded-lg p-3">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium">{location}</span>
            </div>
            <button className="text-sm text-orange-500 font-medium">
              Change
            </button>
          </div>

          {/* Stores Near You */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Stores near you</h2>
              <button 
                className="text-sm text-orange-500 font-medium flex items-center"
                onClick={() => navigate("/all-stores")}
              >
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {filteredStores.map((store) => (
                <StoreCard
                  key={store.id}
                  id={store.id}
                  name={store.name}
                  image={store.image}
                  deliveryTime={store.deliveryTime}
                />
              ))}
            </div>
          </section>

          {/* AI-Powered Recommendations */}
          <RecommendationsSection className="mb-8" />

          {/* Map View */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Nearby Vendors</h2>
              <Button
                variant="ghost"
                className="text-orange-500 flex items-center gap-1 text-sm"
                onClick={() => navigate("/full-map")}
              >
                View Full Map <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <MapView height="h-[180px]" />
          </section>

          {/* Quick Links */}
          <QuickLinks className="mb-8" />

          {/* Trending Now Section */}
          <TrendingSection className="mb-8" />

          {/* Food Categories */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Food Categories</h2>
              <button 
                className="text-sm text-orange-500 font-medium flex items-center"
                onClick={() => navigate("/categories")}
              >
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  id: "burgers",
                  name: "Burgers",
                  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                },
                {
                  id: "pizza",
                  name: "Pizza",
                  image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                },
                {
                  id: "sushi",
                  name: "Sushi",
                  image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                },
                {
                  id: "mexican",
                  name: "Mexican",
                  image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                },
              ].map((category) => (
                <FoodCategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  image={category.image}
                />
              ))}
            </div>
          </section>

          {/* All Stores */}
          <section>
            <SortFilterBar
              activeSort={activeSort}
              options={sortOptions}
              onSortChange={setActiveSort}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredStores.length === 0 ? (
                <div className="col-span-3 py-12 text-center">
                  <h3 className="text-xl font-medium text-gray-700">
                    No stores match your filters
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your filters to see more options
                  </p>
                  <Button
                    className="mt-4 bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      setActiveFilters({});
                      setFilteredStores(nearbyStores);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-100"
                    onClick={() => handleStoreClick(store.id)}
                  >
                    <div className="relative h-40">
                      <img
                        src={store.image.replace("w=200", "w=500")}
                        alt={store.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800">{store.name}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{store.deliveryTime}</span>
                        <span className="mx-2">•</span>
                        <span>$0.99 Delivery Fee</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Navigation Bar removed - using sidebar for navigation */}

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeCartItem}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
