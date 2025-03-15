import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationTabs from "../layout/NavigationTabs";
import {
  ChevronLeft,
  Search,
  ChevronRight,
  Clock,
  Star,
  RefreshCw,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";
import Logo from "../layout/Logo";

interface Order {
  id: string;
  restaurant: {
    id: string;
    name: string;
    image: string;
  };
  date: string;
  status: "completed" | "active" | "cancelled";
  items: {
    name: string;
    quantity: number;
  }[];
  total: number;
}

const OrderHistoryScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Sample orders data
  const orders: Order[] = [
    {
      id: "ORD-12345678",
      restaurant: {
        id: "burgers",
        name: "Burgers & Co.",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80",
      },
      date: "Today, 12:30 PM",
      status: "active",
      items: [
        { name: "Classic Cheeseburger", quantity: 2 },
        { name: "French Fries", quantity: 1 },
        { name: "Chocolate Milkshake", quantity: 1 },
      ],
      total: 32.11,
    },
    {
      id: "ORD-23456789",
      restaurant: {
        id: "pizza",
        name: "Pizza Palace",
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80",
      },
      date: "Yesterday, 7:15 PM",
      status: "completed",
      items: [
        { name: "Pepperoni Pizza (Large)", quantity: 1 },
        { name: "Garlic Bread", quantity: 1 },
        { name: "Coke", quantity: 2 },
      ],
      total: 28.45,
    },
    {
      id: "ORD-34567890",
      restaurant: {
        id: "sushi",
        name: "Sushi Express",
        image:
          "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80",
      },
      date: "May 15, 1:20 PM",
      status: "completed",
      items: [
        { name: "California Roll", quantity: 2 },
        { name: "Salmon Nigiri", quantity: 4 },
        { name: "Miso Soup", quantity: 1 },
      ],
      total: 42.75,
    },
    {
      id: "ORD-45678901",
      restaurant: {
        id: "tacos",
        name: "Taco Fiesta",
        image:
          "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80",
      },
      date: "May 10, 8:30 PM",
      status: "cancelled",
      items: [
        { name: "Beef Tacos", quantity: 3 },
        { name: "Guacamole & Chips", quantity: 1 },
        { name: "Mexican Rice", quantity: 1 },
      ],
      total: 24.99,
    },
  ];

  // Filter orders based on active tab and search query
  const getFilteredOrders = () => {
    let filtered = [...orders];

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((order) => order.status === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.restaurant.name.toLowerCase().includes(query) ||
          order.id.toLowerCase().includes(query) ||
          order.items.some((item) => item.name.toLowerCase().includes(query)),
      );
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  // View order details
  const viewOrderDetails = (orderId: string, status: string) => {
    if (status === "active") {
      navigate(`/order-tracking/${orderId}`);
    } else {
      // For completed or cancelled orders, you might want to show a different screen
      navigate(`/order-details/${orderId}`);
    }
  };

  // Reorder
  const reorder = (orderId: string) => {
    // In a real app, this would add all items from the order to the cart
    navigate("/cart");
  };

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
            <h1 className="text-xl font-bold">Orders</h1>
          </div>
        </div>
      </div>

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
            <h1 className="text-2xl font-bold">Order History</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search orders"
              className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full mb-6"
          >
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4">
              <TabsTrigger
                value="all"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                All Orders
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Cancelled
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium text-gray-700">
                    No orders found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    {searchQuery
                      ? "Try adjusting your search criteria"
                      : "You haven't placed any orders yet"}
                  </p>
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
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                              <img
                                src={order.restaurant.image}
                                alt={order.restaurant.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {order.restaurant.name}
                              </h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{order.date}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full ${order.status === "active" ? "bg-blue-100 text-blue-800" : order.status === "completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="space-y-1 mb-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              {item.quantity}x {item.name}
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            ${order.total.toFixed(2)}
                          </span>
                          <div className="flex space-x-2">
                            {order.status === "completed" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center"
                                onClick={() => reorder(order.id)}
                              >
                                <RefreshCw className="h-3 w-3 mr-1" />
                                Reorder
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                              onClick={() =>
                                viewOrderDetails(order.id, order.status)
                              }
                            >
                              Details
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

export default OrderHistoryScreen;
