import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, MapPin, Clock, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

const OrderConfirmationScreen = () => {
  const navigate = useNavigate();

  // Sample order data - in a real app, this would come from a context or state
  const orderData = {
    orderId: "ORD-12345678",
    restaurant: "Burgers & Co.",
    items: [
      { name: "Classic Cheeseburger", quantity: 2, price: 8.99 },
      { name: "French Fries", quantity: 1, price: 3.99 },
      { name: "Chocolate Milkshake", quantity: 1, price: 4.99 },
    ],
    subtotal: 26.96,
    tax: 2.16,
    deliveryFee: 2.99,
    total: 32.11,
    estimatedDeliveryTime: "25-35 min",
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    paymentMethod: "Visa •••• 4242",
  };

  // Track order
  const trackOrder = () => {
    navigate(`/order-tracking/${orderData.orderId}`);
  };

  // Go to home
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-md mx-auto">
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600">
                Your order has been placed successfully.
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">
                  Order #{orderData.orderId.slice(-4)}
                </h2>
                <span className="text-sm text-gray-500">Just now</span>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80"
                    alt="Restaurant logo"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{orderData.restaurant}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      Estimated delivery: {orderData.estimatedDeliveryTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Delivery Address</h4>
                    <p className="text-gray-600 text-sm">
                      {orderData.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-sm mb-2">Payment</h4>
                <p className="text-gray-600 text-sm">
                  {orderData.paymentMethod}
                </p>
                <p className="font-medium mt-2">
                  Total: ${orderData.total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={trackOrder}
              >
                Track Order
              </Button>

              <Button variant="outline" className="w-full" onClick={goToHome}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="md:hidden">
        <BottomNavBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OrderConfirmationScreen;
