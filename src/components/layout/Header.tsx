import React, { useState } from 'react';
import {
  MapPin,
  ChevronDown,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Menu,
  Mic,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { useSidebar } from './SidebarContext';
import Logo from './Logo';

interface HeaderProps {
  showSearch?: boolean;
  showLocation?: boolean;
  showCart?: boolean;
  showFilters?: boolean;
  cartCount?: number;
  onFilterClick?: () => void;
  onCartClick?: () => void;
}

export default function Header({
  showSearch = true,
  showLocation = true,
  showCart = true,
  showFilters = true,
  cartCount = 0,
  onFilterClick,
  onCartClick,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('12 Roncroft Dr');
  const [isRecording, setIsRecording] = useState(false);
  const { toggleSidebar } = useSidebar();

  const handleVoiceOrder = () => {
    setIsRecording(!isRecording);
    // Voice recognition logic would go here
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center h-16 px-4 mx-auto">
        {/* Left Section: Menu and Logo */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="flex-shrink-0 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Logo variant="default" />
        </div>

        {/* Center Section: Delivery/Pickup Toggle and Location */}
        <div className="flex items-center space-x-4 ml-8">
          {/* Delivery/Pickup Toggle */}
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-white shadow-sm"
            >
              Delivery
            </button>
            <button
              className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-700"
            >
              Pickup
            </button>
          </div>

          {/* Location Selector */}
          {showLocation && (
            <button className="flex items-center text-sm font-medium">
              <MapPin className="h-4 w-4 mr-1 text-gray-600" />
              <span className="mr-1">{location}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500 ml-1">Now</span>
              <ChevronDown className="h-4 w-4 ml-1 text-gray-600" />
            </button>
          )}
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search Bizibyte"
                className="w-full pl-10 pr-12 py-2 rounded-full border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleVoiceOrder}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                  isRecording ? 'bg-red-500 animate-pulse' : 'hover:bg-gray-100'
                }`}
              >
                <Mic className={`h-4 w-4 ${isRecording ? 'text-white' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>
        )}

        {/* Right Section: Cart, Filter, and Auth */}
        <div className="flex items-center space-x-4">
          {showCart && (
            <button
              className="relative"
              onClick={onCartClick}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}
          {showFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onFilterClick}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="h-6 w-6" />
            </Button>
          )}
          <div className="flex items-center space-x-4">
            <button
              className="text-sm font-medium hover:text-orange-500"
            >
              Log in
            </button>
            <button
              className="text-sm font-medium hover:text-orange-500"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
