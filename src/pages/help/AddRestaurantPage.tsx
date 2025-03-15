import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Logo from "../../components/layout/Logo";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Footer from "../../components/layout/Footer";

const AddRestaurantPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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
            <h1 className="text-xl font-bold">Add Your Restaurant</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Partner with Bizibyte</h1>
          <p className="text-gray-600 mb-8">
            Join thousands of restaurants who have grown their business with Bizibyte.
            Reach more customers and increase your revenue.
          </p>

          {/* Restaurant Information Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Restaurant Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Name*
                </label>
                <Input
                  type="text"
                  placeholder="Enter restaurant name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Address*
                </label>
                <Input
                  type="text"
                  placeholder="Enter full address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name*
                  </label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number*
                  </label>
                  <Input
                    type="tel"
                    placeholder="(123) 456-7890"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address*
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Type*
                </label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="">Select restaurant type</option>
                  <option value="casual">Casual Dining</option>
                  <option value="fastfood">Fast Food</option>
                  <option value="finedining">Fine Dining</option>
                  <option value="cafe">Café</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Submit Application
              </Button>
            </div>
          </form>

          {/* Benefits Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Why Partner with Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Reach More Customers</h3>
                <p className="text-gray-600">
                  Connect with thousands of hungry customers in your area looking for great food.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Boost Your Revenue</h3>
                <p className="text-gray-600">
                  Increase your sales with our platform's wide reach and marketing tools.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Easy Management</h3>
                <p className="text-gray-600">
                  Use our intuitive dashboard to manage orders, menu, and analytics.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Dedicated Support</h3>
                <p className="text-gray-600">
                  Get 24/7 support from our team to help you succeed.
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

export default AddRestaurantPage; 