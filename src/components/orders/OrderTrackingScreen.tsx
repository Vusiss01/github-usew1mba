import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";
import MapView from "../ai/MapView";

const OrderTrackingScreen = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedTime, setEstimatedTime] = useState(25);

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 4) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });

      setEstimatedTime((prev) => {
        if (prev > 5) {
          return prev - 5;
        } else {
          return prev;
        }
      });
    }, 10000); // Update every 10 seconds for demo purposes

    return () => clearInterval(timer);
  }, []);

  // Order steps
  const steps = [
    { id: 1, name: "Order Confirmed", time: "12:05 PM" },
    { id: 2, name: "Preparing Your Food", time: "12:10 PM" },
    { id: 3, name: "Out for Delivery", time: "12:25 PM" },
    { id: 4, name: "Delivered", time: "12:40 PM" },
  ];

  // Sample order data
  const orderData = {
    orderId: orderId || "ORD-12345678",
    restaurant: "Burgers & Co.",
    items: [
      { name: "Classic Cheeseburger", quantity: 2, price: 8.99 },
      { name: "French Fries", quantity: 1, price: 3.99 },
      { name: "Chocolate Milkshake", quantity: 1, price: 4.99 },
    ],
    total: 32.11,
    deliveryPerson: {
      name: "Michael Rodriguez",
      phone: "+1 (555) 987-6543",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          {/* Back button and title */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">Track Order</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              {/* Order Status */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">
                    Order #{orderData.orderId.slice(-4)}
                  </h2>
                  {currentStep < 4 && (
                    <div className="flex items-center text-orange-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">
                        ETA: {estimatedTime} min
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress Steps */}
                <div className="space-y-6 mt-6">
                  {steps.map((step) => {
                    const isActive = step.id <= currentStep;
                    const isCurrent = step.id === currentStep;

                    return (
                      <div key={step.id} className="flex items-start">
                        <div className="relative">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-green-500" : "bg-gray-200"}`}
                          >
                            {isActive && (
                              <CheckCircle className="h-5 w-5 text-white" />
                            )}
                          </div>
                          {step.id !== steps.length && (
                            <div
                              className={`absolute top-8 left-1/2 w-0.5 h-10 -translate-x-1/2 ${isActive ? "bg-green-500" : "bg-gray-200"}`}
                            ></div>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3
                              className={`font-medium ${isCurrent ? "text-green-500" : ""}`}
                            >
                              {step.name}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {isActive ? step.time : ""}
                            </span>
                          </div>
                          {isCurrent && step.id === 3 && (
                            <p className="text-sm text-gray-600 mt-1">
                              Your order is on the way!
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Person */}
              {currentStep >= 3 && currentStep < 4 && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="font-semibold mb-4">Delivery Person</h2>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={orderData.deliveryPerson.image}
                        alt="Delivery person"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">
                        {orderData.deliveryPerson.name}
                      </h3>
                      <p className="text-sm text-gray-500">Delivery Partner</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() =>
                          window.open(`tel:${orderData.deliveryPerson.phone}`)
                        }
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() => navigate(`/chat/delivery-${orderId}`)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map View */}
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-semibold mb-4">Delivery Location</h2>
                <div className="h-[400px]">
                  <MapView height="h-full" />
                </div>
              </div>
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

export default OrderTrackingScreen;
