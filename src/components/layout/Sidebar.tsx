import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  ClipboardList,
  User,
  Heart,
  Bell,
  Tag,
  MapPin,
  Gift,
  HelpCircle,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useSidebar } from './SidebarContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, toggleSidebar } = useSidebar();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ClipboardList, label: 'Orders', path: '/orders' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Tag, label: 'Promotions', path: '/promotions' },
    { icon: MapPin, label: 'Pickup Near Me', path: '/pickup' },
    { icon: Gift, label: 'Gift Cards', path: '/gift-cards' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help-support' },
    { icon: Settings, label: 'Settings', path: '/profile/settings' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={(e) => {
            e.preventDefault();
            toggleSidebar();
          }}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseLeave={(e) => {
          e.preventDefault();
          toggleSidebar();
        }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={(e) => {
            e.preventDefault();
            toggleSidebar();
          }}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    toggleSidebar();
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-500'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <button
              onClick={() => {
                navigate('/auth');
                toggleSidebar();
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 