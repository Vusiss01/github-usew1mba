import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, MapPin, Star, Clock } from "lucide-react";
import Logo from "../../components/layout/Logo";
import { Input } from "../../components/ui/input";
import Footer from "../../components/layout/Footer";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
}

const NearbyRestaurantsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - in a real app, this would come from an API
  const restaurants: Restaurant[] = [
    {
      id: "1",
      name: "Burger King",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      cuisine: "American • Burgers • Fast Food",
      rating: 4.5,
      deliveryTime: "20-30 min",
      deliveryFee: "$2.99",
      distance: "0.8 miles"
    },
    {
      id: "2",
      name: "Pizza Hut",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      cuisine: "Italian • Pizza • Wings",
      rating: 4.3,
      deliveryTime: "25-35 min",
      deliveryFee: "$3.99",
      distance: "1.2 miles"
    },
    {
      id: "3",
      name: "Subway",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      cuisine: "Sandwiches • Salads • Healthy",
      rating: 4.2,
      deliveryTime: "15-25 min",
      deliveryFee: "$1.99",
      distance: "0.5 miles"
    },
    {
      id: "4",
      name: "Taco Bell",
      image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      cuisine: "Mexican • Fast Food • Late Night",
      rating: 4.1,
      deliveryTime: "20-30 min",
      deliveryFee: "$2.99",
      distance: "1.5 miles"
    },
  ];

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-xl font-bold">Nearby Restaurants</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search restaurants or cuisines"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="flex items-center mb-6">
            <MapPin className="h-5 w-5 text-orange-500 mr-2" />
            <span className="font-medium">Delivering to:</span>
            <button className="ml-2 text-orange-500 hover:text-orange-600">
              123 Main St, New York, NY 10001
            </button>
          </div>

          {/* Restaurant List */}
          <div className="space-y-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              >
                <div className="flex">
                  <div className="w-32 h-32">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                        <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                      </div>
                      <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                        <Star className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-green-600 font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div>•</div>
                      <div>{restaurant.deliveryFee} delivery</div>
                      <div>•</div>
                      <div>{restaurant.distance}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NearbyRestaurantsPage; 