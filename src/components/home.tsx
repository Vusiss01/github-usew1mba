import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationTabs from "./layout/NavigationTabs";
import { useSidebar } from "./layout/SidebarContext";
import { Menu } from "lucide-react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import CategoryHeader from "./category/CategoryHeader";
import FilterBar from "./category/FilterBar";
import FoodItemGrid from "./category/FoodItemGrid";
import FoodItemCard from "./category/FoodItemCard";
import BottomNavBar from "./layout/BottomNavBar";
import PointsInfoCard from "./rewards/PointsInfoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";

interface CategoryDetailProps {
  categoryId?: string;
  categoryName?: string;
  categoryDescription?: string;
  categoryImage?: string;
}

const CategoryDetail = ({
  categoryId = "burgers",
  categoryName = "Burgers & Co.",
  categoryDescription = "Delicious handcrafted burgers made with premium ingredients. From classic cheeseburgers to gourmet creations, we have something for everyone.",
  categoryImage = "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
}: CategoryDetailProps) => {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("featured");
  const { toggleSidebar } = useSidebar();

  // Mock food items data
  const foodItems = [
    {
      id: "1",
      name: "Classic Cheeseburger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 8.99,
      rating: 4.5,
      points: 25,
      category: "Burger",
      description:
        "Juicy beef patty with melted cheese, lettuce, tomato, and special sauce",
      prepTime: "15-20 min",
      isPopular: true,
      isVegetarian: false,
      isSpicy: false,
      calories: 650,
    },
    {
      id: "2",
      name: "Double Bacon Burger",
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 12.99,
      rating: 4.8,
      points: 35,
      category: "Burger",
      description:
        "Two beef patties with crispy bacon, cheese, and all the fixings",
      prepTime: "20-25 min",
      isPopular: true,
      isVegetarian: false,
      isSpicy: true,
      calories: 950,
    },
    {
      id: "3",
      name: "Veggie Burger",
      image:
        "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 9.99,
      rating: 4.2,
      points: 20,
      category: "Burger",
      description: "Plant-based patty with fresh vegetables and vegan sauce",
      prepTime: "15-20 min",
      isPopular: false,
      isVegetarian: true,
      isSpicy: false,
      calories: 450,
    },
    {
      id: "4",
      name: "Chicken Burger",
      image:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 10.99,
      rating: 4.3,
      points: 30,
      category: "Burger",
      description:
        "Grilled chicken breast with avocado, lettuce, and spicy mayo",
      prepTime: "15-20 min",
      isPopular: false,
      isVegetarian: false,
      isSpicy: true,
      calories: 550,
    },
    {
      id: "5",
      name: "BBQ Burger",
      image:
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 11.99,
      rating: 4.6,
      points: 40,
      category: "Burger",
      description: "Beef patty with BBQ sauce, onion rings, and cheddar cheese",
      prepTime: "20-25 min",
      isPopular: true,
      isVegetarian: false,
      isSpicy: false,
      calories: 750,
    },
    {
      id: "6",
      name: "Mushroom Swiss Burger",
      image:
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 10.49,
      rating: 4.4,
      points: 30,
      category: "Burger",
      description: "Beef patty topped with sautéed mushrooms and Swiss cheese",
      prepTime: "15-20 min",
      isPopular: false,
      isVegetarian: false,
      isSpicy: false,
      calories: 680,
    },
    {
      id: "7",
      name: "Truffle Burger",
      image:
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 15.99,
      rating: 4.9,
      points: 50,
      category: "Burger",
      description: "Premium beef with truffle aioli, arugula, and aged cheddar",
      prepTime: "20-30 min",
      isPopular: true,
      isVegetarian: false,
      isSpicy: false,
      calories: 720,
    },
    {
      id: "8",
      name: "Impossible Burger",
      image:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 13.99,
      rating: 4.7,
      points: 35,
      category: "Burger",
      description: "Plant-based Impossible patty with all the classic toppings",
      prepTime: "15-20 min",
      isPopular: false,
      isVegetarian: true,
      isSpicy: false,
      calories: 580,
    },
  ];

  // Sides items
  const sidesItems = [
    {
      id: "s1",
      name: "Loaded Fries",
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 5.99,
      rating: 4.6,
      points: 15,
      category: "Sides",
      description:
        "Crispy fries topped with cheese, bacon bits, and green onions",
      prepTime: "10-15 min",
      isPopular: true,
      isVegetarian: false,
      isSpicy: false,
      calories: 480,
    },
    {
      id: "s2",
      name: "Onion Rings",
      image:
        "https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 4.99,
      rating: 4.3,
      points: 10,
      category: "Sides",
      description: "Crispy battered onion rings with special dipping sauce",
      prepTime: "10-15 min",
      isPopular: false,
      isVegetarian: true,
      isSpicy: false,
      calories: 320,
    },
    {
      id: "s3",
      name: "Sweet Potato Fries",
      image:
        "https://images.unsplash.com/photo-1635779444950-07e5a1ae7694?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 5.49,
      rating: 4.5,
      points: 15,
      category: "Sides",
      description: "Crispy sweet potato fries with chipotle aioli",
      prepTime: "10-15 min",
      isPopular: true,
      isVegetarian: true,
      isSpicy: false,
      calories: 380,
    },
    {
      id: "s4",
      name: "Mac & Cheese",
      image:
        "https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 6.99,
      rating: 4.7,
      points: 20,
      category: "Sides",
      description: "Creamy mac & cheese with a crispy breadcrumb topping",
      prepTime: "15-20 min",
      isPopular: false,
      isVegetarian: true,
      isSpicy: false,
      calories: 450,
    },
  ];

  // Drinks items
  const drinksItems = [
    {
      id: "d1",
      name: "Chocolate Milkshake",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 4.99,
      rating: 4.8,
      points: 15,
      category: "Drinks",
      description: "Rich chocolate milkshake topped with whipped cream",
      prepTime: "5-10 min",
      isPopular: true,
      isVegetarian: true,
      isSpicy: false,
      calories: 550,
    },
    {
      id: "d2",
      name: "Strawberry Lemonade",
      image:
        "https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 3.99,
      rating: 4.5,
      points: 10,
      category: "Drinks",
      description: "Fresh strawberry lemonade with mint garnish",
      prepTime: "5 min",
      isPopular: false,
      isVegetarian: true,
      isSpicy: false,
      calories: 180,
    },
    {
      id: "d3",
      name: "Craft Root Beer",
      image:
        "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 3.49,
      rating: 4.3,
      points: 10,
      category: "Drinks",
      description: "Artisanal root beer made with natural ingredients",
      prepTime: "5 min",
      isPopular: false,
      isVegetarian: true,
      isSpicy: false,
      calories: 220,
    },
  ];

  // Popular items (mix of all categories)
  const popularItems = [
    ...foodItems.filter((item) => item.isPopular),
    ...sidesItems.filter((item) => item.isPopular),
    ...drinksItems.filter((item) => item.isPopular),
  ];

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    // In a real app, this would filter the actual data
    // For now, we'll just update the active filters for display
    const newFilters = [];

    if (filters.sortBy) {
      newFilters.push(`Sort: ${filters.sortBy}`);
    }

    if (filters.priceRange) {
      newFilters.push(
        `Price: $${filters.priceRange[0]}-$${filters.priceRange[1]}`,
      );
    }

    if (filters.dietary && filters.dietary.length > 0) {
      newFilters.push(`Dietary: ${filters.dietary.join(", ")}`);
    }

    if (filters.rating) {
      newFilters.push(`Rating: ${filters.rating}+`);
    }

    setActiveFilters(newFilters);
  };

  // Get items based on active tab
  const getItemsByTab = () => {
    switch (activeTab) {
      case "featured":
        return popularItems;
      case "mains":
        return foodItems;
      case "sides":
        return sidesItems;
      case "drinks":
        return drinksItems;
      default:
        return popularItems;
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
        {/* Category Header with Banner */}
        <CategoryHeader
          categoryId={categoryId}
          categoryName={categoryName}
          categoryDescription={categoryDescription}
          categoryImage={categoryImage}
        />

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content Area */}
            <div className="flex-1">
              {/* Filter Bar */}
              <FilterBar
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
              />

              {/* Menu Tabs */}
              <div className="mt-6">
                <Tabs
                  defaultValue="featured"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4">
                    <TabsTrigger
                      value="featured"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
                    >
                      Featured
                    </TabsTrigger>
                    <TabsTrigger
                      value="mains"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
                    >
                      Mains
                    </TabsTrigger>
                    <TabsTrigger
                      value="sides"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
                    >
                      Sides
                    </TabsTrigger>
                    <TabsTrigger
                      value="drinks"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
                    >
                      Drinks
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getItemsByTab().map((item) => (
                        <FoodItemCard
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          image={item.image}
                          price={item.price}
                          rating={item.rating}
                          points={item.points}
                          category={item.category}
                          description={item.description}
                          prepTime={item.prepTime}
                          isPopular={item.isPopular}
                          isVegetarian={item.isVegetarian}
                          isSpicy={item.isSpicy}
                          calories={item.calories}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sidebar - Points Info Card (hidden on mobile, shown on desktop) */}
            <div className="hidden lg:block w-[350px] sticky top-24 self-start">
              <PointsInfoCard categoryName={categoryName} />

              {/* Order summary card */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-lg mb-3">Your Order</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Double Bacon Burger</span>
                    <span>$12.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sweet Potato Fries</span>
                    <span>$5.49</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Chocolate Milkshake</span>
                    <span>$4.99</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>$23.47</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Delivery Fee</span>
                      <span>$2.99</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Tax</span>
                      <span>$2.35</span>
                    </div>
                    <div className="flex justify-between font-bold mt-3">
                      <span>Total</span>
                      <span>$28.81</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                  Checkout
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  You'll earn 235 points with this order!
                </p>
              </div>
            </div>
          </div>

          {/* Points Info Card for Mobile - Shown at bottom before nav bar */}
          <div className="lg:hidden mt-8 mb-20 flex justify-center">
            <PointsInfoCard categoryName={categoryName} />
          </div>
        </div>
      </main>

      {/* Floating checkout button on mobile */}
      <div className="fixed bottom-[70px] left-0 right-0 bg-white border-t border-gray-200 p-3 md:hidden z-40">
        <Button className="w-full bg-primary hover:bg-primary/90">
          Checkout • $28.81
        </Button>
      </div>

      {/* Bottom Navigation Bar removed - using sidebar for navigation */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CategoryDetail;
