import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Tag, Clock, Utensils, DollarSign } from "lucide-react";
import Logo from "../../components/layout/Logo";
import { Button } from "../../components/ui/button";
import Footer from "../../components/layout/Footer";

const FirstOrderPage = () => {
  const navigate = useNavigate();

  const handleStartOrdering = () => {
    navigate("/");
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
            <h1 className="text-xl font-bold">First Order Discount</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 mb-8 text-white text-center">
            <Tag className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Save 50% on Your First Order</h2>
            <p className="text-xl text-white/90 mb-6">
              New to Bizibyte? Get 50% off your first order up to $20!
            </p>
            <div className="text-4xl font-bold mb-6">
              Use code: WELCOME50
            </div>
            <Button
              onClick={handleStartOrdering}
              className="bg-white text-orange-600 hover:bg-gray-100"
              size="lg"
            >
              Start Ordering
            </Button>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h3 className="text-xl font-semibold mb-6">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-4 text-orange-500" />
                <h4 className="font-semibold mb-2">Limited Time</h4>
                <p className="text-gray-600">
                  Offer valid for 7 days after signing up
                </p>
              </div>
              <div className="text-center">
                <Utensils className="h-8 w-8 mx-auto mb-4 text-orange-500" />
                <h4 className="font-semibold mb-2">Any Restaurant</h4>
                <p className="text-gray-600">
                  Valid at all participating restaurants
                </p>
              </div>
              <div className="text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-4 text-orange-500" />
                <h4 className="font-semibold mb-2">Maximum Savings</h4>
                <p className="text-gray-600">
                  Save up to $20 on your first order
                </p>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-semibold mb-4">Terms & Conditions</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Offer valid for first-time customers only
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                50% off your first order up to a maximum discount of $20
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Valid for 7 days from the date of account creation
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Cannot be combined with other offers or promotions
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Delivery fees and service charges may apply
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Bizibyte reserves the right to modify or cancel this promotion at any time
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FirstOrderPage; 