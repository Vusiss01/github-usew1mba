import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  options: string[];
  specialInstructions?: string;
}

const CartScreen = () => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Sample cart data - in a real app, this would come from a cart context or state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "classic-burger",
      name: "Classic Cheeseburger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      price: 8.99,
      quantity: 2,
      options: ["Cheddar Cheese", "Medium Well", "Bacon (+$1.50)"],
    },
    {
      id: "fries",
      name: "French Fries",
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      price: 3.99,
      quantity: 1,
      options: ["Large Size (+$1.00)"],
    },
    {
      id: "milkshake",
      name: "Chocolate Milkshake",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      price: 4.99,
      quantity: 1,
      options: ["Whipped Cream", "Extra Chocolate"],
    },
  ]);

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  // Calculate tax
  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  // Calculate delivery fee
  const deliveryFee = 2.99;

  // Calculate discount
  const calculateDiscount = () => {
    return promoApplied ? calculateSubtotal() * 0.1 : 0; // 10% discount
  };

  // Calculate total
  const calculateTotal = () => {
    return (
      calculateSubtotal() + calculateTax() + deliveryFee - calculateDiscount()
    );
  };

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    navigate("/checkout");
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
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-700">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mt-2">
                Add some delicious items to your cart
              </p>
              <Button
                className="mt-4 bg-orange-500 hover:bg-orange-600"
                onClick={() => navigate("/")}
              >
                Browse Restaurants
              </Button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Cart Items */}
              <div className="md:w-2/3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="font-semibold">Items from Burgers & Co.</h2>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex">
                        <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <span className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>

                          <div className="text-sm text-gray-500 mt-1">
                            {item.options.map((option, index) => (
                              <div key={index}>{option}</div>
                            ))}
                            {item.specialInstructions && (
                              <div className="italic mt-1">
                                Note: {item.specialInstructions}
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center">
                              <button
                                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="mx-2 text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              className="text-red-500 hover:text-red-600"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <h3 className="font-semibold mb-3">Promo Code</h3>
                  <div className="flex">
                    <Input
                      type="text"
                      placeholder="Enter promo code"
                      className="rounded-r-none"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button
                      className="rounded-l-none bg-orange-500 hover:bg-orange-600"
                      onClick={applyPromoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <div className="text-green-600 text-sm mt-2">
                      Promo code applied successfully!
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
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${calculateDiscount().toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 my-4 pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
                    onClick={proceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="mt-4">
                    <button
                      className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-orange-500"
                      onClick={() => navigate(-1)}
                    >
                      <span>Add more items</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
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

export default CartScreen;
