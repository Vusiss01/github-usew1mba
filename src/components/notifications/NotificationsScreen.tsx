import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationTabs from "../layout/NavigationTabs";
import {
  ChevronLeft,
  Bell,
  ShoppingBag,
  Tag,
  Star,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: "order" | "promo" | "system" | "review";
  read: boolean;
  actionUrl?: string;
}

const NotificationsScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif1",
      title: "Order Delivered",
      message:
        "Your order from Burgers & Co. has been delivered. Enjoy your meal!",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      type: "order",
      read: false,
      actionUrl: "/orders",
    },
    {
      id: "notif2",
      title: "Weekend Special: 25% OFF",
      message: "Use code WEEKEND25 for 25% off your orders this weekend!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      type: "promo",
      read: false,
      actionUrl: "/promotions",
    },
    {
      id: "notif3",
      title: "Rate Your Experience",
      message: "How was your order from Pizza Palace? Tap to leave a review.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      type: "review",
      read: true,
      actionUrl: "/reviews/pizza",
    },
    {
      id: "notif4",
      title: "New Restaurant Added",
      message:
        "Thai Delight is now available on Bizibyte! Try their authentic Thai cuisine.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      type: "system",
      read: true,
      actionUrl: "/vendor/thai",
    },
    {
      id: "notif5",
      title: "Order Confirmed",
      message:
        "Your order from Sushi Express has been confirmed and is being prepared.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      type: "order",
      read: true,
      actionUrl: "/orders",
    },
  ]);

  // Get filtered notifications based on active tab
  const getFilteredNotifications = () => {
    if (activeTab === "all") {
      return notifications;
    } else if (activeTab === "unread") {
      return notifications.filter((notif) => !notif.read);
    } else {
      return notifications.filter((notif) => notif.type === activeTab);
    }
  };

  const filteredNotifications = getFilteredNotifications();

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case "promo":
        return <Tag className="h-5 w-5 text-orange-500" />;
      case "review":
        return <Star className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-purple-500" />;
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold">Notifications</h1>
            </div>
            <div className="flex space-x-2">
              {notifications.some((notif) => !notif.read) && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50"
                  onClick={clearAllNotifications}
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>

          {/* Notification Tabs */}
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full mb-6"
          >
            <TabsList className="w-full justify-start overflow-x-auto flex-nowrap border-b rounded-none h-auto p-0 bg-transparent mb-4">
              <TabsTrigger
                value="all"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base whitespace-nowrap"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base whitespace-nowrap"
              >
                Unread
              </TabsTrigger>
              <TabsTrigger
                value="order"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base whitespace-nowrap"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="promo"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base whitespace-nowrap"
              >
                Promotions
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base whitespace-nowrap"
              >
                System
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700">
                    No notifications
                  </h3>
                  <p className="text-gray-500 mt-2">
                    {activeTab === "all"
                      ? "You don't have any notifications yet"
                      : activeTab === "unread"
                        ? "You don't have any unread notifications"
                        : `You don't have any ${activeTab} notifications`}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`bg-white rounded-lg shadow-sm overflow-hidden border-l-4 ${notification.read ? "border-gray-200" : "border-orange-500"}`}
                    >
                      <div className="flex p-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex justify-between">
                            <h3
                              className={`font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}
                            >
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                          <p
                            className={`text-sm mt-1 ${notification.read ? "text-gray-500" : "text-gray-700"}`}
                          >
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-2 ml-2">
                          {!notification.read && (
                            <button
                              className="p-1 rounded-full hover:bg-gray-100"
                              onClick={() => markAsRead(notification.id)}
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4 text-green-500" />
                            </button>
                          )}
                          <button
                            className="p-1 rounded-full hover:bg-gray-100"
                            onClick={() => deleteNotification(notification.id)}
                            title="Delete notification"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
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

export default NotificationsScreen;
