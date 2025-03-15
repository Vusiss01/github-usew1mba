import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationTabs from "../layout/NavigationTabs";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  Heart,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Camera,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";
import Logo from "../layout/Logo";

const UserProfileScreen = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Sample user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  });

  // Form state
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profile changes
  const saveChanges = () => {
    setUserData((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }));
    setIsEditing(false);
  };

  // Navigation items
  const navigationItems = [
    {
      icon: <CreditCard className="h-5 w-5 text-blue-500" />,
      label: "Payment Methods",
      path: "/profile/payment-methods",
      info: "Visa •••• 4242",
    },
    {
      icon: <MapPin className="h-5 w-5 text-green-500" />,
      label: "Saved Addresses",
      path: "/addresses",
      info: "2 addresses",
    },
    {
      icon: <Heart className="h-5 w-5 text-red-500" />,
      label: "Favorites",
      path: "/favorites",
      info: "5 restaurants",
    },
    {
      icon: <Bell className="h-5 w-5 text-purple-500" />,
      label: "Notifications",
      path: "/notifications",
      info: "On",
    },
    {
      icon: <Settings className="h-5 w-5 text-gray-500" />,
      label: "Settings",
      path: "/profile/settings",
      info: "",
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-orange-500" />,
      label: "Help & Support",
      path: "/help-support",
      info: "",
    },
  ];

  // Sign out
  const signOut = () => {
    navigate("/splash");
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
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
        </div>
      </div>

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
              <h1 className="text-2xl font-bold">Profile</h1>
            </div>
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  setFormData({
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                  });
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="text-center">
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-gray-600">{userData.phone}</p>
                </div>
              ) : (
                <div className="w-full max-w-md space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={saveChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center">
                  {item.info && (
                    <span className="text-sm text-gray-500 mr-2">
                      {item.info}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>

          {/* Sign Out Button */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center text-red-500 border-red-200 hover:bg-red-50"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
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

export default UserProfileScreen;
