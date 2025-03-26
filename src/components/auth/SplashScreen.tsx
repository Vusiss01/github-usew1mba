import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import Footer from "../layout/Footer";
import { Input } from "../ui/input";
import Logo from "../layout/Logo";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/auth");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Logo />
        <div className="space-x-2">
          <Button
            variant="ghost"
            className="text-gray-700 hover:text-orange-500"
            onClick={() => navigate("/auth")}
          >
            Log in
          </Button>
          <Button
            className="bg-gray-900 hover:bg-gray-800 text-white"
            onClick={() => navigate("/auth")}
          >
            Sign up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Order on <span className="text-orange-500">Bizibyte</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Get food, drinks, groceries, and more delivered.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Enter delivery address"
                  className="w-full pl-10 py-6 rounded-lg border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <Button
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white py-6 px-8 rounded-lg"
                onClick={handleGetStarted}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Search Here"
                )}
              </Button>
            </div>

            <div className="text-gray-600">
              Or{" "}
              <button
                className="text-orange-500 font-medium hover:text-orange-600"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </button>{" "}
              to continue
            </div>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="hidden md:block relative flex-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/90 to-orange-500/90"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay"></div>

          {/* Food Images */}
          <div className="absolute bottom-0 right-0 w-full h-full flex items-end justify-center">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Burger"
              className="w-64 h-64 object-contain relative z-10 transform translate-y-8 translate-x-16"
            />
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Pizza"
              className="w-64 h-64 object-contain relative z-10 transform -translate-y-4 -translate-x-16"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SplashScreen;
