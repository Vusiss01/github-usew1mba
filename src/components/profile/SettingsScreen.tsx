import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Moon, Globe, Bell, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

const SettingsScreen = () => {
  const navigate = useNavigate();

  // Settings state
  const [settings, setSettings] = useState({
    darkMode: false,
    language: "english",
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  // Handle toggle change
  const handleToggleChange = (setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      language: value,
    }));
  };

  // Sign out
  const signOut = () => {
    navigate("/splash");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

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
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Appearance */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Appearance</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Dark Mode</span>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={() => handleToggleChange("darkMode")}
                />
              </div>
            </div>

            {/* Language */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Language</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Language</span>
                </div>
                <Select
                  value={settings.language}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <span>Push Notifications</span>
                      <p className="text-xs text-gray-500">
                        Receive notifications on your device
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={() =>
                      handleToggleChange("pushNotifications")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-gray-500 mr-3 opacity-0" />
                    <div>
                      <span>Email Notifications</span>
                      <p className="text-xs text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={() =>
                      handleToggleChange("emailNotifications")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-gray-500 mr-3 opacity-0" />
                    <div>
                      <span>SMS Notifications</span>
                      <p className="text-xs text-gray-500">
                        Receive notifications via text message
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={() =>
                      handleToggleChange("smsNotifications")
                    }
                  />
                </div>
              </div>
            </div>

            {/* Account */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Account</h2>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center text-red-500 border-red-200 hover:bg-red-50"
                onClick={signOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            {/* App Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">About</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Version</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Terms of Service</span>
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => window.open("#", "_blank")}
                  >
                    View
                  </Button>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Privacy Policy</span>
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => window.open("#", "_blank")}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
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

export default SettingsScreen;
