import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Star,
  Clock,
  MapPin,
  Heart,
  Phone,
  Globe,
  Share2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface VendorDetails {
  id: string;
  name: string;
  image: string;
  logo: string;
  cuisine: string;
  description: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  distance: string;
  address: string;
  phone: string;
  website: string;
  hours: {
    day: string;
    hours: string;
  }[];
  isFavorite: boolean;
}

const VendorDetailScreen = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample vendor data - in a real app, this would be fetched based on vendorId
  const vendorDetails: VendorDetails = {
    id: vendorId || "burgers",
    name: "Burgers & Co.",
    image:
      "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    cuisine: "American",
    description:
      "Delicious handcrafted burgers made with premium ingredients. From classic cheeseburgers to gourmet creations, we have something for everyone.",
    rating: 4.7,
    reviewCount: 523,
    deliveryTime: "15-25 min",
    distance: "1.2 mi",
    address: "123 Burger St, Foodville, CA 90210",
    phone: "+1 (555) 123-4567",
    website: "www.burgers-and-co.com",
    hours: [
      { day: "Monday", hours: "11:00 AM - 10:00 PM" },
      { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
      { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
      { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
      { day: "Friday", hours: "11:00 AM - 11:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
      { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
    ],
    isFavorite: false,
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const goToMenu = () => {
    navigate(`/vendor/${vendorId}/menu`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Image */}
        <div className="w-full h-[220px] relative overflow-hidden">
          <img
            src={vendorDetails.image}
            alt={vendorDetails.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-white"}`}
              />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Vendor Logo and Basic Info */}
          <div className="flex items-start mb-6">
            <div className="w-20 h-20 rounded-lg overflow-hidden border-4 border-white shadow-md mr-4 -mt-10 bg-white">
              <img
                src={vendorDetails.logo}
                alt={`${vendorDetails.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {vendorDetails.name}
              </h1>
              <p className="text-gray-600">{vendorDetails.cuisine}</p>

              <div className="flex items-center mt-2 text-sm text-gray-600 flex-wrap gap-y-2">
                <div className="flex items-center mr-4">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-medium">{vendorDetails.rating}</span>
                  <span className="text-gray-400 ml-1">
                    ({vendorDetails.reviewCount}+)
                  </span>
                </div>

                <div className="flex items-center mr-4">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span>{vendorDetails.deliveryTime}</span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span>{vendorDetails.distance}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{vendorDetails.description}</p>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              onClick={goToMenu}
            >
              View Menu
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center"
              onClick={() => window.open(`tel:${vendorDetails.phone}`)}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center"
              onClick={() =>
                window.open(`https://${vendorDetails.website}`, "_blank")
              }
            >
              <Globe className="h-4 w-4 mr-2" />
              Website
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center"
              onClick={() =>
                navigator.share({
                  title: vendorDetails.name,
                  url: window.location.href,
                })
              }
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs for Info, Reviews, etc. */}
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4">
              <TabsTrigger
                value="info"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Info
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="photos"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Photos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-3">Address</h3>
                <p className="text-gray-600 mb-4">{vendorDetails.address}</p>

                <h3 className="font-semibold mb-3">Hours</h3>
                <div className="space-y-2 mb-4">
                  {vendorDetails.hours.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold mb-3">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <a
                      href={`tel:${vendorDetails.phone}`}
                      className="text-blue-500"
                    >
                      {vendorDetails.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-gray-400 mr-2" />
                    <a
                      href={`https://${vendorDetails.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {vendorDetails.website}
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-xl font-bold">
                        {vendorDetails.rating}
                      </span>
                      <span className="text-gray-500 ml-2">
                        ({vendorDetails.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Write a Review
                  </Button>
                </div>

                {/* Sample reviews - in a real app, these would be fetched from an API */}
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div
                      key={review}
                      className="border-b border-gray-200 pb-4 last:border-0"
                    >
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${review}`}
                            alt="User avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">User {review}</h4>
                            <span className="text-gray-500 text-sm">
                              2 days ago
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 5 - (review % 2) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aenean euismod bibendum laoreet.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Reviews
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((photo) => (
                    <div
                      key={photo}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-${1550317138 + photo * 1000}-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80`}
                        alt={`Restaurant photo ${photo}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Photos
                </Button>
              </div>
            </TabsContent>
          </Tabs>
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

export default VendorDetailScreen;
