import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  LogOut,
  Home,
  ClipboardList,
  Heart,
  X,
  Bell,
  Tag,
  HelpCircle,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "./SidebarContext";

interface HeaderProps {
  userName?: string;
  avatarUrl?: string;
  cartItemCount?: number;
}

function Header({
  userName = "John Doe",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  cartItemCount = 3,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  // Close sidebar on route change
  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  const handleSignOut = () => {
    navigate("/splash");
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ClipboardList, label: "Orders", path: "/orders" },
    { icon: Heart, label: "Favorites", path: "/favorites" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Tag, label: "Promotions", path: "/promotions" },
    { icon: HelpCircle, label: "Help & Support", path: "/help-support" },
    { icon: Settings, label: "Settings", path: "/profile/settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-orange-500">Menu</h2>
          <Button variant="ghost" size="icon" onClick={closeSidebar}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center px-3 py-3 rounded-md group transition-colors ${isActive ? "bg-orange-50 text-orange-500" : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"}`}
                  onClick={closeSidebar}
                >
                  <IconComponent
                    className={`h-5 w-5 mr-3 ${isActive ? "text-orange-500" : "group-hover:text-orange-500"}`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between h-20 px-4 mx-auto">
          {/* Menu Button and Logo */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:flex"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1
              className="text-2xl font-bold text-orange-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Bizibyte
            </h1>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for food..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/search?q=${searchQuery}`)
                }
              />
            </div>
          </div>

          {/* User Profile and Cart */}
          <div className="flex items-center space-x-4">
            {/* Sign Out Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-1 text-gray-600 hover:text-orange-500"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>

            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/cart")}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full p-0"
                  aria-label="User menu"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={avatarUrl} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/favorites")}>
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                toggleSidebar(); // Also toggle the sidebar on mobile
              }}
              aria-label="Mobile menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Search - Visible only on mobile when menu is open */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for food..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/search?q=${searchQuery}`)
                }
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex items-center justify-start gap-2"
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 w-full flex items-center justify-center gap-1 text-gray-600 hover:text-orange-500"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        )}
      </header>

      {/* Overlay for sidebar on all devices */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}

export default Header;
