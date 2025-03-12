import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Search, ChevronLeft, Star, MapPin, Clock, Filter } from "lucide-react";
import { Input } from "../ui/input";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";
import FilterSidebar from "../layout/FilterSidebar";

interface Vendor {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  priceRange: string;
}

const VendorListScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  // Sample vendors data
  const vendors: Vendor[] = [
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
      id: "sushi",
      name: "Sushi Express",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      cuisine: "Japanese",
      rating: 4.8,
      deliveryTime: "25-35 min",
      distance: "1.5 mi",
      priceRange: "$$$",
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
      id: "indian",
      name: "Spice Garden",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      cuisine: "Indian",
      rating: 4.4,
      deliveryTime: "25-40 min",
      distance: "1.8 mi",
      priceRange: "$$",
    },
    {
      id: "chinese",
      name: "Golden Dragon",
      image:
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      cuisine: "Chinese",
      rating: 4.3,
      deliveryTime: "20-30 min",
      distance: "1.1 mi",
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
    },
  ];

  // Cuisine types for filter
  const cuisineTypes = [
    "All",
    "American",
    "Italian",
    "Japanese",
    "Mexican",
    "Indian",
    "Chinese",
    "Thai",
    "Mediterranean",
  ];

  // Initialize filtered vendors
  useEffect(() => {
    setFilteredVendors(vendors);
  }, []);

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);

    let filtered = [...vendors];

    // Apply cuisine filter
    if (selectedCuisine && selectedCuisine !== "All") {
      filtered = filtered.filter(
        (vendor) => vendor.cuisine === selectedCuisine,
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(query) ||
          vendor.cuisine.toLowerCase().includes(query),
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
        (vendor) => vendor.priceRange === filters.priceRange,
      );
    }

    setFilteredVendors(filtered);
  };

  // Handle cuisine selection
  const handleCuisineSelect = (cuisine: string) => {
    const newCuisine = cuisine === "All" ? null : cuisine;
    setSelectedCuisine(newCuisine);

    let filtered = [...vendors];

    if (newCuisine) {
      filtered = filtered.filter((vendor) => vendor.cuisine === newCuisine);
    }

    setFilteredVendors(filtered);
  };

  // Navigate to vendor detail
  const handleVendorClick = (vendorId: string) => {
    navigate(`/vendor/${vendorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

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
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">Restaurants</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for restaurants or cuisines"
              className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFilterChange(activeFilters);
              }}
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setIsFilterSidebarOpen(true)}
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>

          {/* Cuisine Filter Horizontal Scroll */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {cuisineTypes.map((cuisine) => (
                <button
                  key={cuisine}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedCuisine === cuisine || (cuisine === "All" && !selectedCuisine) ? "bg-orange-500 text-white" : "bg-white border border-gray-300 text-gray-700"}`}
                  onClick={() => handleCuisineSelect(cuisine)}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Vendor List */}
          <div className="space-y-4">
            {filteredVendors.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-gray-700">
                  No restaurants found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  className="mt-4 bg-orange-500 hover:bg-orange-600"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCuisine(null);
                    setActiveFilters({});
                    setFilteredVendors(vendors);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              filteredVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
                  onClick={() => handleVendorClick(vendor.id)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold">{vendor.name}</h2>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {vendor.priceRange}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {vendor.cuisine}
                      </p>

                      <div className="flex items-center mt-2">
                        <div className="flex items-center mr-4">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm font-medium">
                            {vendor.rating}
                          </span>
                        </div>
                        <div className="flex items-center mr-4">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{vendor.deliveryTime}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{vendor.distance}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          Free Delivery
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          20% Off
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
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

export default VendorListScreen;
