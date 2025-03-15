import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Gift, CreditCard, Mail, DollarSign } from "lucide-react";
import Logo from "../../components/layout/Logo";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import Footer from "../../components/layout/Footer";

const GiftCardsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    recipientName: "",
    recipientEmail: "",
    message: "",
    senderName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Show success message or redirect to payment
  };

  const giftCardAmounts = [25, 50, 75, 100, 150, 200];

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
            <h1 className="text-xl font-bold">Gift Cards</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Give the Gift of Great Food</h2>
            <p className="text-white/90">
              Share the joy of delicious meals with friends and family.
              Bizibyte gift cards are perfect for any occasion.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Gift Card Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Amount
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {giftCardAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, amount: amount.toString() }))}
                      className={`p-4 border rounded-lg text-center transition-colors ${
                        formData.amount === amount.toString()
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-200 hover:border-orange-500"
                      }`}
                    >
                      <DollarSign className="h-5 w-5 mx-auto mb-2" />
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Enter custom amount"
                      min="10"
                      max="500"
                    />
                  </div>
                </div>
              </div>

              {/* Recipient Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient's Name
                </label>
                <div className="relative">
                  <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Enter recipient's name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient's Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Enter recipient's email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Add a personal message (optional)"
                  className="h-32"
                />
              </div>

              <Button type="submit" className="w-full">
                Continue to Payment
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GiftCardsPage; 