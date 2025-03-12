import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationTabs from "../layout/NavigationTabs";
import { ChevronLeft, Search, Star, MapPin, Clock, Filter } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";
import FilterSidebar from "../layout/FilterSidebar";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  priceRange: string;
  featured?: boolean;
}

const TopRatedScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    [],
  );

  // Sample top-rated restaurants data
  const topRatedRestaurants: Restaurant[] = [
    {
      id: "sushi",
      name: "Sushi Express",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      cuisine: "Japanese",
      rating: 4.8,
      deliveryTime: "25-35 min",
      distance: "1.5 mi",
      priceRange: "$$$",
      featured: true,
    },
    {
      id: "burgers",
      name: "Burgers & Co.",
      image:
        "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      cuisine: "American",
      rating: 4.7,
      deliveryTime: "15-25 min",
      distance: "1.2 mi",
      priceRange: "$$",
    },
    {
      id: "mediterranean",
      name: "Mediterranean Grill",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      cuisine: "Mediterranean",
      rating: 4.6,
      deliveryTime: "20-35 min",
      distance: "1.3 mi",
      priceRange: "$$$",
      featured: true,
    },
    {
      id: "tacos",
      name: "Taco Fiesta",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      cuisine: "Mexican",
      rating: 4.6,
      deliveryTime: "15-25 min",
      distance: "0.7 mi",
      priceRange: "$",
    },
    {
      id: "pizza",
      name: "Pizza Palace",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "20-30 min",
      distance: "0.8 mi",
      priceRange: "$$",
    },
    {
      id: "thai",
      name: "Thai Delight",
      image:
        "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      cuisine: "Thai",
      rating: 4.5,
      deliveryTime: "25-35 min",
      distance: "1.4 mi",
      priceRange: "$$",
    },
  ];

  // Initialize filtered restaurants
  React.useEffect(() => {
    setFilteredRestaurants(topRatedRestaurants);
  }, []);

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);

    let filtered = [...topRatedRestaurants];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.cuisine.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered = filtered.sort((a, b) => {
        if (filters.sortBy === "distance") {
          return parseFloat(a.distance) - parseFloat(b.distance);
        } else if (filters.sortBy === "rating") {
          return b.rating - a.rating;
        } else if (filters.sortBy === "deliveryTime") {
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        }
        // Default to recommended
        return 0;
      });
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(
        (restaurant) => restaurant.priceRange === filters.priceRange,
      );
    }

    setFilteredRestaurants(filtered);
  };

  // Navigate to restaurant detail
  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/category/${restaurantId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

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
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          {/* Back button and title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold">Top Rated Restaurants</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setIsFilterSidebarOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search top rated restaurants"
              className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFilterChange(activeFilters);
              }}
            />
          </div>

          {/* Featured Restaurants */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Featured Top Rated</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRestaurants
                .filter((restaurant) => restaurant.featured)
                .map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
                    onClick={() => handleRestaurantClick(restaurant.id)}
                  >
                    <div className="relative h-40">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                        Top Rated
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold">{restaurant.name}</h2>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {restaurant.priceRange}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {restaurant.cuisine}
                      </p>

                      <div className="flex items-center mt-2">
                        <div className="flex items-center mr-4">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm font-medium">
                            {restaurant.rating}
                          </span>
                        </div>
                        <div className="flex items-center mr-4">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">
                            {restaurant.deliveryTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{restaurant.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* All Top Rated Restaurants */}
          <div>
            <h2 className="text-xl font-bold mb-4">All Top Rated</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
                  onClick={() => handleRestaurantClick(restaurant.id)}
                >
                  <div className="relative h-40">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex items-center text-white">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-bold">{restaurant.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {restaurant.cuisine}
                    </p>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <span>{restaurant.deliveryTime}</span>
                      <span>{restaurant.priceRange}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default TopRatedScreen;
