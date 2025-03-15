import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import Logo from "../../components/layout/Logo";
import { Input } from "../../components/ui/input";
import Footer from "../../components/layout/Footer";

interface City {
  name: string;
  state: string;
  restaurantCount: number;
  image: string;
}

const ViewAllCitiesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - in a real app, this would come from an API
  const cities: City[] = [
    {
      name: "New York City",
      state: "NY",
      restaurantCount: 1500,
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Los Angeles",
      state: "CA",
      restaurantCount: 1200,
      image: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Chicago",
      state: "IL",
      restaurantCount: 800,
      image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Houston",
      state: "TX",
      restaurantCount: 600,
      image: "https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Phoenix",
      state: "AZ",
      restaurantCount: 400,
      image: "https://images.unsplash.com/photo-1558059840-5b26a39c9c19?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Philadelphia",
      state: "PA",
      restaurantCount: 350,
      image: "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "San Antonio",
      state: "TX",
      restaurantCount: 300,
      image: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "San Diego",
      state: "CA",
      restaurantCount: 450,
      image: "https://images.unsplash.com/photo-1538397237275-5b5e6a6e9f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-xl font-bold">All Cities</h1>
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
              placeholder="Search cities"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <div
                key={city.name}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/restaurants/${city.name.toLowerCase().replace(" ", "-")}`)}
              >
                <div className="relative h-40">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-semibold">{city.name}</h3>
                    <p className="text-sm opacity-90">{city.state}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">
                    {city.restaurantCount.toLocaleString()} restaurants
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No cities found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewAllCitiesPage; 