import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CreditCard, Plus, Trash2, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex" | "discover";
  last4: string;
  expiryDate: string;
  isDefault: boolean;
}

const PaymentMethodsScreen = () => {
  const navigate = useNavigate();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );

  // Sample payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "visa",
      last4: "4242",
      expiryDate: "12/24",
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "mastercard",
      last4: "5555",
      expiryDate: "10/25",
      isDefault: false,
    },
  ]);

  // New card form state
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    setAsDefault: false,
  });

  // Handle input change for new card form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add new payment method
  const addPaymentMethod = () => {
    // In a real app, this would validate and process the card details
    const newPaymentMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: "visa", // Simplified for demo
      last4: newCard.cardNumber.slice(-4),
      expiryDate: newCard.expiryDate,
      isDefault: newCard.setAsDefault,
    };

    // If setting as default, update other cards
    let updatedMethods = [...paymentMethods];
    if (newCard.setAsDefault) {
      updatedMethods = updatedMethods.map((method) => ({
        ...method,
        isDefault: false,
      }));
    }

    setPaymentMethods([...updatedMethods, newPaymentMethod]);
    setIsAddingNew(false);
    setNewCard({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: "",
      setAsDefault: false,
    });
  };

  // Set default payment method
  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  // Delete payment method
  const deletePaymentMethod = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  // Get card icon based on type
  const getCardIcon = (type: string) => {
    // In a real app, you would use actual card brand logos
    return <CreditCard className="h-5 w-5" />;
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
            <h1 className="text-2xl font-bold">Payment Methods</h1>
          </div>

          {!isAddingNew ? (
            <>
              {/* Existing Payment Methods */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <RadioGroup
                  value={selectedPaymentId || ""}
                  onValueChange={setSelectedPaymentId}
                >
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="p-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <RadioGroupItem
                            value={method.id}
                            id={method.id}
                            className="mr-3"
                          />
                          <div className="mr-3">{getCardIcon(method.type)}</div>
                          <div>
                            <Label htmlFor={method.id} className="font-medium">
                              {method.type.charAt(0).toUpperCase() +
                                method.type.slice(1)}{" "}
                              •••• {method.last4}
                            </Label>
                            <p className="text-sm text-gray-500">
                              Expires {method.expiryDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {method.isDefault ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2">
                              Default
                            </span>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs mr-2"
                              onClick={() => setDefaultPaymentMethod(method.id)}
                            >
                              Set as default
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => deletePaymentMethod(method.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Add New Payment Method Button */}
              <Button
                className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600"
                onClick={() => setIsAddingNew(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </>
          ) : (
            <>
              {/* Add New Payment Method Form */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="font-semibold mb-4">Add New Card</h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Card Number
                    </label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.cardNumber}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Expiry Date
                      </label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={newCard.expiryDate}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        CVV
                      </label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={newCard.cvv}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name on Card
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={newCard.name}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="setAsDefault"
                      name="setAsDefault"
                      type="checkbox"
                      checked={newCard.setAsDefault}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="setAsDefault"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Set as default payment method
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsAddingNew(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={addPaymentMethod}
                >
                  Add Card
                </Button>
              </div>
            </>
          )}
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

export default PaymentMethodsScreen;
