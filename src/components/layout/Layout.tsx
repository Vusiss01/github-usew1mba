import Header from "./Header"
import Footer from "./Footer"
import { useSidebar } from "./SidebarContext"
import Logo from "./Logo"
import { Home, Store, Clock, User, Settings } from "lucide-react"
import { motion } from "framer-motion"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { isOpen } = useSidebar();

  const menuItems = [
    { icon: Home, label: 'Home', href: '#' },
    { icon: Store, label: 'Restaurants', href: '#' },
    { icon: Clock, label: 'Orders', href: '#' },
    { icon: User, label: 'Account', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
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

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out z-30 md:translate-x-0 md:static md:h-screen`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b bg-gradient-to-r from-orange-500 to-orange-600">
            <Logo variant="white" />
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 group relative"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="relative"
                  >
                    <Icon className="h-5 w-5 mr-3" />
                  </motion.div>
                  <span className="relative">
                    {item.label}
                  </span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-600"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-6">
          {children}
        </main>
        <Footer />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => useSidebar().toggleSidebar()}
        />
      )}
    </div>
  )
} 