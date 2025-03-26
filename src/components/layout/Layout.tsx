import Header from "./Header"
import Footer from "./Footer"
import { useSidebar } from "./SidebarContext"
import Logo from "./Logo"
import { Home, Store, Clock, User, Settings, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { isOpen, toggleSidebar } = useSidebar();
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    // Get current path from window location
    setCurrentPath(window.location.pathname);
  }, []);

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Store, label: 'Restaurants', href: '/restaurants' },
    { icon: Clock, label: 'Orders', href: '/orders' },
    { icon: User, label: 'Account', href: '/account' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const itemVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  // Handle clicking outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const sidebar = document.getElementById('sidebar');
      const logo = document.getElementById('logo');

      // Don't close if clicking inside sidebar or on logo
      if (sidebar && !sidebar.contains(target) && logo && !logo.contains(target)) {
        toggleSidebar(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div className="relative min-h-screen flex">
      {/* Hover trigger area */}
      <div 
        className="fixed left-0 top-0 bottom-0 w-2 z-50 cursor-pointer hidden md:block"
        onMouseEnter={() => toggleSidebar(true)}
      />

      {/* Sidebar */}
      <AnimatePresence>
        <motion.div 
          id="sidebar"
          className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-[60] md:w-72"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 border-b bg-gradient-to-r from-orange-500 to-orange-600">
              <div id="logo">
                <Logo variant="white" />
              </div>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 group relative ${isActive ? 'text-orange-500' : ''}`}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      className="relative"
                    >
                      <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-orange-500' : ''}`} />
                    </motion.div>
                    <span className="relative">
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-600"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isOpen ? 'md:ml-64' : ''}`}>
        <Header />
        <main className="flex-1 container py-4 md:py-6 px-4 md:px-6">
          {children}
        </main>
        <Footer />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => toggleSidebar(false)}
        />
      )}
    </div>
  )
} 