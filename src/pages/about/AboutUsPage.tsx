import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Users, Globe, Clock, Award } from "lucide-react";
import Logo from "../../components/layout/Logo";
import Footer from "../../components/layout/Footer";

const AboutUsPage = () => {
  const navigate = useNavigate();

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
            <h1 className="text-xl font-bold">About Us</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Connecting People with Great Food
              </h1>
              <p className="text-xl opacity-90">
                We're on a mission to transform the way people think about food
                delivery, making it faster, better, and more convenient than ever before.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">1M+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">50K+</div>
                <div className="text-gray-600">Restaurant Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">100+</div>
                <div className="text-gray-600">Cities Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">10K+</div>
                <div className="text-gray-600">Delivery Partners</div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Customer First</h3>
                <p className="text-gray-600">
                  Everything we do is aimed at providing the best possible
                  experience for our customers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Globe className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Local Impact</h3>
                <p className="text-gray-600">
                  We support local businesses and help them reach more customers
                  in their community.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Clock className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Fast & Reliable</h3>
                <p className="text-gray-600">
                  We ensure quick delivery times while maintaining the quality
                  of food and service.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Award className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Quality Assured</h3>
                <p className="text-gray-600">
                  We partner with the best restaurants to ensure high-quality
                  food and service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
              <div className="prose prose-lg mx-auto">
                <p className="text-gray-600 mb-6">
                  Founded in 2023, Bizibyte started with a simple idea: make it
                  easier for people to enjoy their favorite food from local
                  restaurants. What began as a small startup has grown into a
                  platform that connects millions of customers with their favorite
                  local restaurants.
                </p>
                <p className="text-gray-600 mb-6">
                  Today, we're proud to be a leading food delivery platform,
                  serving customers across hundreds of cities. Our technology
                  platform connects local restaurants, hungry customers, and
                  reliable delivery partners, creating opportunities for
                  restaurants to grow their business and for delivery partners
                  to earn flexible income.
                </p>
                <p className="text-gray-600">
                  We're constantly innovating and improving our platform to make
                  food delivery more convenient, reliable, and enjoyable for
                  everyone involved. Whether you're craving your favorite comfort
                  food or wanting to try something new, Bizibyte is here to
                  deliver it to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage; 