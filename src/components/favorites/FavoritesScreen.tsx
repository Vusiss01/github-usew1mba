import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationTabs from "../layout/NavigationTabs";
import { ChevronLeft, Heart, Trash2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface FavoriteItem {
  id: string;
  name: string;
  image: string;
  type: "restaurant" | "item";
  cuisine?: string;
  restaurant?: string;
  price?: number;
  rating?: number;
  deliveryTime?: string;
}

const FavoritesScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample favorites data
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: "burgers",
      name: "Burgers & Co.",
      image:
        "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      type: "restaurant",
      cuisine: "American",
      rating: 4.7,
      deliveryTime: "15-25 min",
    },
    {
      id: "classic-burger",
      name: "Classic Cheeseburger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      type: "item",
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
    },
    {
      id: "pepperoni-pizza",
      name: "Pepperoni Pizza",
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      type: "item",
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
    },
  ]);

  // Filter favorites based on search query
  const filteredFavorites = searchQuery
    ? favorites.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.type === "restaurant" &&
            item.cuisine?.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.type === "item" &&
            item.restaurant?.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : favorites;

  // Remove from favorites
  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  // Navigate to item or restaurant
  const navigateToItem = (item: FavoriteItem) => {
    if (item.type === "restaurant") {
      navigate(`/category/${item.id}`);
    } else {
      // For food items, navigate to the item detail page
      navigate(`/vendor/burgers/menu/${item.id}`);
    }
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
            <h1 className="text-2xl font-bold">Favorites</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search favorites"
              className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Favorites List */}
          <div className="space-y-4">
            {filteredFavorites.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700">
                  No favorites yet
                </h3>
                <p className="text-gray-500 mt-2">
                  {searchQuery
                    ? "No favorites match your search criteria"
                    : "Save your favorite restaurants and dishes for quick access"}
                </p>
                {searchQuery && (
                  <Button
                    className="mt-4 bg-orange-500 hover:bg-orange-600"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                )}
                {!searchQuery && (
                  <Button
                    className="mt-4 bg-orange-500 hover:bg-orange-600"
                    onClick={() => navigate("/")}
                  >
                    Browse Restaurants
                  </Button>
                )}
              </div>
            ) : (
              filteredFavorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="flex">
                    <div
                      className="w-24 h-24 md:w-32 md:h-32 cursor-pointer"
                      onClick={() => navigateToItem(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between">
                        <div
                          className="cursor-pointer"
                          onClick={() => navigateToItem(item)}
                        >
                          <h3 className="font-bold text-gray-800">
                            {item.name}
                          </h3>
                          {item.type === "restaurant" ? (
                            <p className="text-sm text-gray-500">
                              {item.cuisine} • {item.deliveryTime}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500">
                              From {item.restaurant} • ${item.price?.toFixed(2)}
                            </p>
                          )}
                        </div>
                        <button
                          className="text-red-500 hover:text-red-600 p-1"
                          onClick={() => removeFromFavorites(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <Button
                          className="bg-orange-500 hover:bg-orange-600 text-sm"
                          onClick={() => navigateToItem(item)}
                        >
                          {item.type === "restaurant"
                            ? "Order Now"
                            : "Add to Cart"}
                        </Button>
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

export default FavoritesScreen;
