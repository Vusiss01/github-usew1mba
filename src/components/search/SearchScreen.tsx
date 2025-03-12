import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Search as SearchIcon,
  X,
  Clock,
  Star,
  MapPin,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface SearchResult {
  id: string;
  name: string;
  image: string;
  type: "restaurant" | "dish";
  restaurant?: string;
  cuisine?: string;
  price?: number;
  rating?: number;
  deliveryTime?: string;
  distance?: string;
}

const SearchScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "burger",
    "pizza",
    "sushi",
    "mexican",
  ]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Sample search results data
  const allResults: SearchResult[] = [
    {
      id: "burgers",
      name: "Burgers & Co.",
      image:
        "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      type: "restaurant",
      cuisine: "American",
      rating: 4.7,
      deliveryTime: "15-25 min",
      distance: "1.2 mi",
    },
    {
      id: "classic-burger",
      name: "Classic Cheeseburger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      type: "dish",
      restaurant: "Burgers & Co.",
      price: 8.99,
      rating: 4.5,
    },
    {
      id: "pizza",
      name: "Pizza Palace",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      type: "restaurant",
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "20-30 min",
      distance: "0.8 mi",
    },
    {
      id: "pepperoni-pizza",
      name: "Pepperoni Pizza",
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      type: "dish",
      restaurant: "Pizza Palace",
      price: 12.99,
      rating: 4.8,
    },
    {
      id: "sushi",
      name: "Sushi Express",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      type: "restaurant",
      cuisine: "Japanese",
      rating: 4.8,
      deliveryTime: "25-35 min",
      distance: "1.5 mi",
    },
    {
      id: "california-roll",
      name: "California Roll",
      image:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      type: "dish",
      restaurant: "Sushi Express",
      price: 9.99,
      rating: 4.6,
    },
  ];

  // Perform search when query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      let results = allResults.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.cuisine && item.cuisine.toLowerCase().includes(query)) ||
          (item.restaurant && item.restaurant.toLowerCase().includes(query)),
      );

      // Filter by tab
      if (activeTab !== "all") {
        results = results.filter((item) => item.type === activeTab);
      }

      setSearchResults(results);
      setIsSearching(false);

      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery) && searchQuery.trim() !== "") {
        setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, activeTab, recentSearches]);

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  // Use recent search
  const useRecentSearch = (term: string) => {
    setSearchQuery(term);
  };

  // Remove recent search
  const removeRecentSearch = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((item) => item !== term));
  };

  // Navigate to result
  const navigateToResult = (result: SearchResult) => {
    if (result.type === "restaurant") {
      navigate(`/vendor/${result.id}`);
    } else {
      // For dishes, navigate to the item detail page
      const restaurantId =
        allResults.find(
          (r) => r.type === "restaurant" && r.name === result.restaurant,
        )?.id || "unknown";
      navigate(`/vendor/${restaurantId}/menu/${result.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          {/* Back button and search bar */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for food, restaurants..."
                className="w-full pl-10 pr-10 py-2 rounded-lg border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {searchQuery ? (
            <>
              {/* Search Results */}
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="restaurant"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
                  >
                    Restaurants
                  </TabsTrigger>
                  <TabsTrigger
                    value="dish"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
                  >
                    Dishes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  {isSearching ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">Searching...</p>
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <h3 className="text-xl font-medium text-gray-700">
                        No results found
                      </h3>
                      <p className="text-gray-500 mt-2">
                        Try a different search term or browse categories
                      </p>
                      <Button
                        className="mt-4 bg-orange-500 hover:bg-orange-600"
                        onClick={() => navigate("/vendors")}
                      >
                        Browse Restaurants
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {searchResults.map((result) => (
                        <div
                          key={result.id}
                          className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
                          onClick={() => navigateToResult(result)}
                        >
                          <div className="flex p-3">
                            <div className="w-20 h-20 rounded-lg overflow-hidden mr-3">
                              <img
                                src={result.image}
                                alt={result.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{result.name}</h3>
                              {result.type === "restaurant" ? (
                                <div className="text-sm text-gray-500">
                                  {result.cuisine}
                                </div>
                              ) : (
                                <div className="text-sm text-gray-500">
                                  from {result.restaurant}
                                </div>
                              )}

                              <div className="flex items-center mt-1">
                                {result.rating && (
                                  <div className="flex items-center mr-3">
                                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                                    <span className="text-xs">
                                      {result.rating}
                                    </span>
                                  </div>
                                )}

                                {result.type === "restaurant" &&
                                  result.deliveryTime && (
                                    <div className="flex items-center mr-3">
                                      <Clock className="h-3 w-3 text-gray-400 mr-1" />
                                      <span className="text-xs">
                                        {result.deliveryTime}
                                      </span>
                                    </div>
                                  )}

                                {result.type === "restaurant" &&
                                  result.distance && (
                                    <div className="flex items-center">
                                      <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                                      <span className="text-xs">
                                        {result.distance}
                                      </span>
                                    </div>
                                  )}

                                {result.type === "dish" && result.price && (
                                  <div className="text-xs font-medium text-green-600">
                                    ${result.price.toFixed(2)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-3">
                    Recent Searches
                  </h2>
                  <div className="space-y-2">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        className="flex items-center justify-between bg-white rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => useRecentSearch(term)}
                      >
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-3" />
                          <span>{term}</span>
                        </div>
                        <button
                          className="p-1 rounded-full hover:bg-gray-200"
                          onClick={(e) => removeRecentSearch(term, e)}
                        >
                          <X className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Popular Searches</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Burger",
                    "Pizza",
                    "Sushi",
                    "Chinese",
                    "Italian",
                    "Mexican",
                    "Vegetarian",
                    "Dessert",
                    "Coffee",
                  ].map((term) => (
                    <button
                      key={term}
                      className="bg-white rounded-full px-4 py-2 text-sm border border-gray-200 hover:border-orange-500 hover:text-orange-500"
                      onClick={() => setSearchQuery(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse Categories */}
              <div>
                <h2 className="text-lg font-semibold mb-3">
                  Browse Categories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      name: "Fast Food",
                      image:
                        "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
                    },
                    {
                      name: "Healthy",
                      image:
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
                    },
                    {
                      name: "Breakfast",
                      image:
                        "https://images.unsplash.com/photo-1533089860892-a9b969df67e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
                    },
                    {
                      name: "Lunch",
                      image:
                        "https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
                    },
                    {
                      name: "Dinner",
                      image:
                        "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
                    },
                    {
                      name: "Dessert",
                      image:
                        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
                    },
                    {
                      name: "Drinks",
                      image:
                        "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
                    },
                    {
                      name: "Snacks",
                      image:
                        "https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
                    },
                  ].map((category) => (
                    <div
                      key={category.name}
                      className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-300"
                      onClick={() => setSearchQuery(category.name)}
                    >
                      <div className="h-32 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 text-center font-medium">
                        {category.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
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

export default SearchScreen;
