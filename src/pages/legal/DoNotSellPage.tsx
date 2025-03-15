import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Logo from "../../components/layout/Logo";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import Footer from "../../components/layout/Footer";

const DoNotSellPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Form submitted:", formData);
    // Show success message or redirect
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
            <h1 className="text-xl font-bold">Do Not Sell My Info</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
            <p className="text-gray-600 mb-4">
              Under the California Consumer Privacy Act (CCPA) and other privacy laws, you have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Request that we do not sell or share your personal information</li>
              <li>Know what personal information we collect about you</li>
              <li>Request deletion of your personal information</li>
              <li>Access your personal information</li>
              <li>Non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="text-gray-600 mb-6">
              To exercise your right to opt out of the sale or sharing of your personal information,
              please complete the form below. We will process your request within 15 business days.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-6">Request Form</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address, city, state, zip code"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Details
              </label>
              <Textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Please provide any additional information that may help us process your request"
                className="h-32"
              />
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Submit Request
            </Button>
          </form>

          <div className="mt-8 bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Note: We are committed to protecting your privacy rights. Your request will be processed
              in accordance with applicable privacy laws. We may need to verify your identity to
              process this request. For more information about how we handle your personal information,
              please review our Privacy Policy.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DoNotSellPage; 