import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ClipboardList, User, Heart, Bell, Tag } from "lucide-react";

const NavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const tabs = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/orders", icon: ClipboardList, label: "Orders" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/favorites", icon: Heart, label: "Favorites" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
    { path: "/promotions", icon: Tag, label: "Promotions" },
  ];

  return (
    <div className="sticky top-16 z-40 w-full bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between overflow-x-auto py-1 gap-2">
          {tabs.map(({ path, icon: Icon, label }) => {
            const active = isActive(path);
            return (
              <motion.button
                key={path}
                className={`relative flex items-center justify-center text-sm font-medium py-3 px-4 min-w-[100px] group ${
                  active ? "text-orange-500" : "text-gray-600"
                }`}
                onClick={() => navigate(path)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center space-y-1">
                  <Icon className={`w-5 h-5 transition-colors duration-200 ${
                    active ? "text-orange-500" : "text-gray-600 group-hover:text-orange-400"
                  }`} />
                  <span className={`transition-colors duration-200 ${
                    active ? "text-orange-500" : "text-gray-600 group-hover:text-orange-400"
                  }`}>
                    {label}
                  </span>
                </div>
                
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0,
                    scaleX: active ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Hover underline */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400 transform origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default NavigationTabs;
