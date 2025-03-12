import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Search, Plus, Info, ShoppingBag } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  vegetarian: boolean;
  spicy: boolean;
  calories: number;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

const MenuScreen = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // Sample menu data - in a real app, this would be fetched based on vendorId
  const categories: Category[] = [
    {
      id: "popular",
      name: "Most Popular",
      items: [
        {
          id: "classic-burger",
          name: "Classic Cheeseburger",
          description:
            "Juicy beef patty with melted cheese, lettuce, tomato, and special sauce",
          price: 8.99,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          category: "popular",
          popular: true,
          vegetarian: false,
          spicy: false,
          calories: 650,
        },
        {
          id: "double-bacon",
          name: "Double Bacon Burger",
          description:
            "Two beef patties with crispy bacon, cheese, and all the fixings",
          price: 12.99,
          image:
            "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          category: "popular",
          popular: true,
          vegetarian: false,
          spicy: true,
          calories: 950,
        },
      ],
    },
    {
      id: "burgers",
      name: "Burgers",
      items: [
        {
          id: "classic-burger",
          name: "Classic Cheeseburger",
          description:
            "Juicy beef patty with melted cheese, lettuce, tomato, and special sauce",
          price: 8.99,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          category: "burgers",
          popular: true,
          vegetarian: false,
          spicy: false,
          calories: 650,
        },
        {
          id: "double-bacon",
          name: "Double Bacon Burger",
          description:
            "Two beef patties with crispy bacon, cheese, and all the fixings",
          price: 12.99,
          image:
            "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          category: "burgers",
          popular: true,
          vegetarian: false,
          spicy: true,
          calories: 950,
        },
        {
          id: "veggie-burger",
          name: "Veggie Burger",
          description:
            "Plant-based patty with fresh vegetables and vegan sauce",
          price: 9.99,
          image:
            "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          category: "burgers",
          popular: false,
          vegetarian: true,
          spicy: false,
          calories: 450,
        },
        {
          id: "chicken-burger",
          name: "Chicken Burger",
          description:
            "Grilled chicken breast with avocado, lettuce, and spicy mayo",
          price: 10.99,
          image:
            "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          category: "burgers",
          popular: false,
          vegetarian: false,
          spicy: true,
          calories: 550,
        },
      ],
    },
    {
      id: "sides",
      name: "Sides",
      items: [
        {
          id: "fries",
          name: "French Fries",
          description: "Crispy golden fries with sea salt",
          price: 3.99,
          image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          category: "sides",
          popular: true,
          vegetarian: true,
          spicy: false,
          calories: 380,
        },
        {
          id: "onion-rings",
          name: "Onion Rings",
          description: "Crispy battered onion rings with special dipping sauce",
          price: 4.99,
          image:
            "https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          category: "sides",
          popular: false,
          vegetarian: true,
          spicy: false,
          calories: 320,
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      items: [
        {
          id: "milkshake",
          name: "Chocolate Milkshake",
          description: "Rich chocolate milkshake topped with whipped cream",
          price: 4.99,
          image:
            "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          category: "drinks",
          popular: true,
          vegetarian: true,
          spicy: false,
          calories: 550,
        },
        {
          id: "lemonade",
          name: "Strawberry Lemonade",
          description: "Fresh strawberry lemonade with mint garnish",
          price: 3.99,
          image:
            "https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          category: "drinks",
          popular: false,
          vegetarian: true,
          spicy: false,
          calories: 180,
        },
      ],
    },
  ];

  // Filter menu items based on search query and active category
  const getFilteredItems = () => {
    let filteredItems: MenuItem[] = [];

    // Collect all items if no category is selected, or only items from the selected category
    if (!activeCategory) {
      categories.forEach((category) => {
        filteredItems = [...filteredItems, ...category.items];
      });
    } else {
      const category = categories.find((c) => c.id === activeCategory);
      if (category) {
        filteredItems = [...category.items];
      }
    }

    // Apply search filter if there's a query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query),
      );
    }

    return filteredItems;
  };

  const filteredItems = getFilteredItems();

  // Add item to cart
  const addToCart = (item: MenuItem) => {
    setCartCount(cartCount + 1);
    // In a real app, this would add the item to a cart state or context
  };

  // Navigate to item detail
  const viewItemDetail = (itemId: string) => {
    navigate(`/vendor/${vendorId}/menu/${itemId}`);
  };

  // Go to cart
  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          {/* Back button and title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate(`/vendor/${vendorId}`)}
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold">Menu</h1>
            </div>

            {cartCount > 0 && (
              <Button
                className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
                onClick={goToCart}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{cartCount}</span>
              </Button>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search menu items"
              className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              <button
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${!activeCategory ? "bg-orange-500 text-white" : "bg-white border border-gray-300 text-gray-700"}`}
                onClick={() => setActiveCategory(null)}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeCategory === category.id ? "bg-orange-500 text-white" : "bg-white border border-gray-300 text-gray-700"}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-6">
            {!searchQuery &&
              !activeCategory &&
              // Show categories when no search or filter is active
              categories.map((category) => (
                <div key={category.id} className="mb-8">
                  <h2 className="text-xl font-bold mb-4">{category.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden flex cursor-pointer hover:shadow-md transition-shadow duration-300"
                      >
                        <div
                          className="flex-1 p-4"
                          onClick={() => viewItemDetail(item.id)}
                        >
                          <h3 className="font-bold text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex gap-1">
                              {item.vegetarian && (
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200 text-xs"
                                >
                                  Veg
                                </Badge>
                              )}
                              {item.spicy && (
                                <Badge
                                  variant="outline"
                                  className="bg-red-50 text-red-700 border-red-200 text-xs"
                                >
                                  Spicy
                                </Badge>
                              )}
                              {item.popular && (
                                <Badge
                                  variant="outline"
                                  className="bg-orange-50 text-orange-700 border-orange-200 text-xs"
                                >
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <span className="font-bold text-green-600">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="relative w-1/3 min-w-[100px]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onClick={() => viewItemDetail(item.id)}
                          />
                          <button
                            className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-5 w-5 text-orange-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {/* Show filtered items when search or category filter is active */}
            {(searchQuery || activeCategory) && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  {searchQuery
                    ? `Search Results: ${filteredItems.length} items found`
                    : activeCategory
                      ? categories.find((c) => c.id === activeCategory)?.name
                      : "All Items"}
                </h2>

                {filteredItems.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <h3 className="text-xl font-medium text-gray-700">
                      No items found
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Try adjusting your search criteria
                    </p>
                    <Button
                      className="mt-4 bg-orange-500 hover:bg-orange-600"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory(null);
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden flex cursor-pointer hover:shadow-md transition-shadow duration-300"
                      >
                        <div
                          className="flex-1 p-4"
                          onClick={() => viewItemDetail(item.id)}
                        >
                          <h3 className="font-bold text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex gap-1">
                              {item.vegetarian && (
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200 text-xs"
                                >
                                  Veg
                                </Badge>
                              )}
                              {item.spicy && (
                                <Badge
                                  variant="outline"
                                  className="bg-red-50 text-red-700 border-red-200 text-xs"
                                >
                                  Spicy
                                </Badge>
                              )}
                              {item.popular && (
                                <Badge
                                  variant="outline"
                                  className="bg-orange-50 text-orange-700 border-orange-200 text-xs"
                                >
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <span className="font-bold text-green-600">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="relative w-1/3 min-w-[100px]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onClick={() => viewItemDetail(item.id)}
                          />
                          <button
                            className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-5 w-5 text-orange-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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

export default MenuScreen;
