import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check } from "lucide-react";
import Logo from "../../components/layout/Logo";
import { Button } from "../../components/ui/button";
import Footer from "../../components/layout/Footer";

const PricingPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "For occasional food delivery",
      features: [
        "Standard delivery fees",
        "Regular delivery times",
        "Email support",
        "Basic restaurant selection",
      ],
    },
    {
      name: "Bizibyte+",
      price: "$9.99/month",
      description: "For frequent food lovers",
      features: [
        "Reduced delivery fees",
        "Priority delivery",
        "24/7 priority support",
        "Exclusive restaurant access",
        "Special member discounts",
        "Birthday rewards",
      ],
      recommended: true,
    },
    {
      name: "Business",
      price: "Custom",
      description: "For teams and companies",
      features: [
        "Volume discounts",
        "Dedicated account manager",
        "Expense management",
        "Team ordering",
        "Catering services",
        "Custom solutions",
      ],
    },
  ];

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
            <h1 className="text-xl font-bold">Pricing</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-gray-600">
              Select the perfect plan for your food delivery needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg shadow-sm p-6 ${
                  plan.recommended
                    ? "ring-2 ring-orange-500 relative"
                    : "border border-gray-200"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                      Recommended
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-2">{plan.price}</div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.recommended
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  {plan.name === "Business" ? "Contact Sales" : "Get Started"}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">What's included in the delivery fee?</h4>
                <p className="text-gray-600">
                  Delivery fees cover the cost of getting your food from the restaurant to your door,
                  including driver compensation and operational costs.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I cancel my subscription?</h4>
                <p className="text-gray-600">
                  Yes, you can cancel your Bizibyte+ subscription at any time. Your benefits will
                  continue until the end of your billing period.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How do member discounts work?</h4>
                <p className="text-gray-600">
                  Bizibyte+ members receive exclusive discounts on eligible orders, automatically
                  applied at checkout.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What are volume discounts?</h4>
                <p className="text-gray-600">
                  Business plan customers receive special pricing based on order volume. Contact our
                  sales team for details.
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

export default PricingPage; 