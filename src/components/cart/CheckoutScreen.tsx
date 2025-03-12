import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  CreditCard,
  Clock,
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface Address {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryDate: string;
  isDefault: boolean;
}

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );
  const [deliveryTime, setDeliveryTime] = useState("asap");

  // Sample addresses
  const addresses: Address[] = [
    {
      id: "home",
      name: "Home",
      address: "123 Main St, Apt 4B, New York, NY 10001",
      isDefault: true,
    },
    {
      id: "work",
      name: "Work",
      address: "456 Park Ave, Floor 8, New York, NY 10022",
      isDefault: false,
    },
  ];

  // Sample payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "visa",
      type: "Visa",
      last4: "4242",
      expiryDate: "12/24",
      isDefault: true,
    },
    {
      id: "mastercard",
      type: "Mastercard",
      last4: "5555",
      expiryDate: "10/25",
      isDefault: false,
    },
  ];

  // Set default selections
  React.useEffect(() => {
    const defaultAddress = addresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    } else if (addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }

    const defaultPayment = paymentMethods.find((pm) => pm.isDefault);
    if (defaultPayment) {
      setSelectedPaymentId(defaultPayment.id);
    } else if (paymentMethods.length > 0) {
      setSelectedPaymentId(paymentMethods[0].id);
    }
  }, []);

  // Order summary data
  const subtotal = 22.96;
  const tax = 1.84;
  const deliveryFee = 2.99;
  const discount = 2.3;
  const total = subtotal + tax + deliveryFee - discount;

  // Place order
  const placeOrder = () => {
    navigate("/order-confirmation");
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
              onClick={() => navigate("/cart")}
              className="mr-3 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Checkout Form */}
            <div className="md:w-2/3 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                    Delivery Address
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 p-0 h-auto"
                    onClick={() => navigate("/addresses")}
                  >
                    Add New
                  </Button>
                </div>

                <RadioGroup
                  value={selectedAddressId || ""}
                  onValueChange={setSelectedAddressId}
                >
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`flex items-start p-3 rounded-md border ${selectedAddressId === address.id ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}
                      >
                        <RadioGroupItem
                          value={address.id}
                          id={address.id}
                          className="mt-1 mr-3"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={address.id}
                            className="flex justify-between cursor-pointer"
                          >
                            <div>
                              <span className="font-medium">
                                {address.name}
                              </span>
                              <p className="text-gray-600 text-sm mt-1">
                                {address.address}
                              </p>
                            </div>
                            {address.isDefault && (
                              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-orange-500" />
                    Payment Method
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 p-0 h-auto"
                    onClick={() => navigate("/profile/payment-methods")}
                  >
                    Add New
                  </Button>
                </div>

                <RadioGroup
                  value={selectedPaymentId || ""}
                  onValueChange={setSelectedPaymentId}
                >
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex items-start p-3 rounded-md border ${selectedPaymentId === method.id ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}
                      >
                        <RadioGroupItem
                          value={method.id}
                          id={method.id}
                          className="mt-1 mr-3"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={method.id}
                            className="flex justify-between cursor-pointer"
                          >
                            <div>
                              <span className="font-medium">
                                {method.type} •••• {method.last4}
                              </span>
                              <p className="text-gray-600 text-sm mt-1">
                                Expires {method.expiryDate}
                              </p>
                            </div>
                            {method.isDefault && (
                              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Delivery Time */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 mr-2 text-orange-500" />
                  <h3 className="font-semibold">Delivery Time</h3>
                </div>

                <RadioGroup
                  value={deliveryTime}
                  onValueChange={setDeliveryTime}
                >
                  <div className="space-y-3">
                    <div
                      className={`flex items-start p-3 rounded-md border ${deliveryTime === "asap" ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}
                    >
                      <RadioGroupItem
                        value="asap"
                        id="asap"
                        className="mt-1 mr-3"
                      />
                      <Label htmlFor="asap" className="cursor-pointer">
                        <span className="font-medium">As soon as possible</span>
                        <p className="text-gray-600 text-sm mt-1">
                          Estimated delivery: 25-35 min
                        </p>
                      </Label>
                    </div>

                    <div
                      className={`flex items-start p-3 rounded-md border ${deliveryTime === "scheduled" ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}
                    >
                      <RadioGroupItem
                        value="scheduled"
                        id="scheduled"
                        className="mt-1 mr-3"
                      />
                      <Label htmlFor="scheduled" className="cursor-pointer">
                        <span className="font-medium">Schedule for later</span>
                        <p className="text-gray-600 text-sm mt-1">
                          Choose a specific time
                        </p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {deliveryTime === "scheduled" && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label
                          htmlFor="deliveryDate"
                          className="text-sm font-medium mb-1 block"
                        >
                          Date
                        </Label>
                        <input
                          type="date"
                          id="deliveryDate"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="deliveryTime"
                          className="text-sm font-medium mb-1 block"
                        >
                          Time
                        </Label>
                        <input
                          type="time"
                          id="deliveryTime"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                <h3 className="font-semibold mb-4">Order Summary</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
                  onClick={placeOrder}
                  disabled={!selectedAddressId || !selectedPaymentId}
                >
                  Place Order
                </Button>

                <div className="mt-4">
                  <button
                    className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-orange-500"
                    onClick={() => navigate("/cart")}
                  >
                    <span>Back to cart</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 text-xs text-gray-500">
                  <p>
                    By placing your order, you agree to our Terms of Service and
                    Privacy Policy.
                  </p>
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

export default CheckoutScreen;
