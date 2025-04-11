import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, MessageSquare, Clock, Grid, List, Volume2, VolumeX, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Mock restaurant data matching the cards from the image
const mockRestaurants = [
  {
    id: "1",
    name: "Foodworld",
    rating: 46,
    status: "Opens tomorrow",
    description: "Experience the world of flavors at Foodworld. We serve a diverse range of international cuisines made with fresh ingredients.",
    coverImage: "https://images.unsplash.com/photo-1619683548293-c74defe8d5d2",
    accentColor: "#FF6B35",
    workingHours: {
      weekdays: {
        days: "Mon–Fri",
        hours: "10:00 AM – 10:00 PM"
      },
      weekends: {
        days: "Sat–Sun",
        hours: "9:00 AM – 11:00 PM"
      }
    },
    address: "123 Foodie Street, Culinary District",
    phone: "+1 234-567-8900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
        caption: "Our signature dishes"
      },
      {
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
        caption: "Fresh ingredients"
      },
      {
        url: "https://images.unsplash.com/photo-1603532648955-039310d9ed75",
        caption: "Cozy atmosphere"
      },
      {
        url: "https://images.unsplash.com/photo-1558030006-450675393462",
        caption: "Special events"
      }
    ],
    ambientSound: "/sounds/restaurant-ambience.mp3"
  },
  {
    id: "2",
    name: "Pizzahub",
    rating: 40,
    status: "Opens tomorrow",
    description: "Your go-to destination for authentic Italian pizzas and more. Fresh ingredients, traditional recipes.",
    coverImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
    hours: "Mon-Sun: 10:00 AM - 11:00 PM",
    address: "456 Pizza Avenue, Italian Quarter",
    phone: "+1 234-567-8901",
    gallery: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      "https://images.unsplash.com/photo-1558030006-450675393462",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
      "https://images.unsplash.com/photo-1603532648955-039310d9ed75"
    ]
  }
];

// Mock menu data with enhanced details
const mockMenu = [
  {
    id: "1",
    name: "Margherita Pizza",
    price: 12.99,
    category: "Pizza",
    thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    tags: ["Best Seller", "Vegetarian"],
    description: "Fresh mozzarella, tomatoes, and basil"
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    price: 14.99,
    category: "Pizza",
    thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    tags: ["Popular", "Spicy"],
    description: "Classic pepperoni with our signature sauce"
  },
  {
    id: "3",
    name: "Classic Burger",
    price: 10.99,
    category: "Burgers",
    thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    tags: ["New", "Chef's Special"],
    description: "100% Angus beef with fresh vegetables"
  },
  {
    id: "4",
    name: "Chicken Wings",
    price: 8.99,
    category: "Appetizers",
    thumbnail: "https://images.unsplash.com/photo-1562967914-608f82629710",
    tags: ["Spicy", "Shareable"],
    description: "Choose from 6 different sauces"
  }
];

const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [menuSearch, setMenuSearch] = useState("");
  const [activeMenuCategory, setActiveMenuCategory] = useState("");
  const [menuViewMode, setMenuViewMode] = useState<"grid" | "list">("grid");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadRestaurant = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const found = mockRestaurants.find(r => r.id === id);
      setRestaurant(found);
      if (found) {
        const categories = Array.from(new Set(mockMenu.map(item => item.category)));
        setActiveMenuCategory(categories[0]);
      }
      setLoading(false);
    };

    loadRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-24 h-24 text-gray-400">
          <MapPin className="w-full h-full" />
        </div>
        <h2 className="text-2xl font-semibold">Oops! Restaurant not found</h2>
        <p className="text-gray-600">The restaurant you're looking for doesn't exist.</p>
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
      </div>
    );
  }

  const filteredMenu = mockMenu.filter(item => 
    item.name.toLowerCase().includes(menuSearch.toLowerCase()) &&
    (activeMenuCategory === "" || item.category === activeMenuCategory)
  );

  const menuCategories = Array.from(new Set(mockMenu.map(item => item.category)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open Now":
        return "text-green-500 bg-green-50";
      case "Closing Soon":
        return "text-yellow-500 bg-yellow-50";
      default:
        return "text-orange-500 bg-orange-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with parallax cover image */}
      <div 
        className="relative h-[300px] md:h-[400px] overflow-hidden"
        style={{
          "--translate-y": `${scrollY * 0.5}px`,
        } as React.CSSProperties}
      >
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover transform translate-y-[var(--translate-y)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
          <div 
            className="absolute bottom-0 left-0 p-6 md:p-8 animate-fade-in-up"
            style={{ "--accent-color": restaurant.accentColor }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {restaurant.name}
            </h1>
            <div className="flex items-center space-x-3 text-white">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className={cn(
                "px-2 py-1 rounded-full text-sm font-medium",
                getStatusColor(restaurant.status)
              )}>
                {restaurant.status}
              </span>
              <button
                onClick={() => setIsAmbientPlaying(!isAmbientPlaying)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title={isAmbientPlaying ? "Mute ambient sound" : "Play ambient sound"}
              >
                {isAmbientPlaying ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Info Tabs */}
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">{restaurant.description}</p>
              
              {/* Working Hours */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <h3 className="font-medium text-lg">Working Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">{restaurant.workingHours.weekdays.days}</span>
                    <span className="text-gray-900">{restaurant.workingHours.weekdays.hours}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">{restaurant.workingHours.weekends.days}</span>
                    <span className="text-gray-900">{restaurant.workingHours.weekends.hours}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-medium text-lg mb-4">Rating</h3>
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-2xl font-medium">{restaurant.rating}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {restaurant.gallery.map((image: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image.url)}
                  className="relative group overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm">{image.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">{restaurant.address}</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    style={{ 
                      "--accent-color": restaurant.accentColor,
                      borderColor: "var(--accent-color)",
                      color: "var(--accent-color)"
                    } as React.CSSProperties}
                  >
                    Get Directions
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <a 
                    href={`tel:${restaurant.phone}`}
                    className="text-orange-500 hover:text-orange-600"
                    style={{ color: restaurant.accentColor }}
                  >
                    {restaurant.phone}
                  </a>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Chat with {restaurant.name}</h3>
              <p className="text-gray-600 mb-4">
                Get in touch with the restaurant directly
              </p>
              <Button
                style={{ 
                  backgroundColor: restaurant.accentColor,
                  "--hover-color": `${restaurant.accentColor}dd`
                } as React.CSSProperties}
                className="hover:bg-[var(--hover-color)]"
              >
                Start Chat
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Menu Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Menu</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuViewMode("grid")}
                className={cn(
                  "p-2",
                  menuViewMode === "grid" && "bg-gray-100"
                )}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuViewMode("list")}
                className={cn(
                  "p-2",
                  menuViewMode === "list" && "bg-gray-100"
                )}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Search Input */}
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search menu items..."
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Menu Categories */}
          <Tabs 
            defaultValue={menuCategories[0]}
            value={activeMenuCategory}
            onValueChange={setActiveMenuCategory}
          >
            <TabsList className="w-full justify-start overflow-x-auto">
              {menuCategories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {menuCategories.map(category => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className={cn(
                  menuViewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                )}>
                  {filteredMenu
                    .filter(item => item.category === category)
                    .map(item => (
                      <div 
                        key={item.id}
                        className={cn(
                          "bg-white rounded-lg shadow-sm transition-shadow hover:shadow-md",
                          menuViewMode === "grid" ? "p-4" : "p-4 flex items-center space-x-4"
                        )}
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className={cn(
                            "rounded-lg object-cover",
                            menuViewMode === "grid" 
                              ? "w-full h-48 mb-4"
                              : "w-24 h-24"
                          )}
                        />
                        <div className={cn(
                          menuViewMode === "grid" ? "space-y-2" : "flex-1"
                        )}>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.tags.map((tag: string) => (
                              <span 
                                key={tag}
                                className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-orange-500 font-medium mt-2" style={{ color: restaurant.accentColor }}>
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Gallery Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-hidden">
          <div className="relative w-full h-full">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Gallery"
                className="w-full h-full object-contain"
              />
            )}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              ×
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ambient Sound (hidden) */}
      {isAmbientPlaying && restaurant.ambientSound && (
        <audio
          src={restaurant.ambientSound}
          autoPlay
          loop
          className="hidden"
        />
      )}
    </div>
  );
};

export default RestaurantDetailPage; 