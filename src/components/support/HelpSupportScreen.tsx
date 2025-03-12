import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  HelpCircle,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpSupportScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Sample FAQ data
  const faqs: FAQItem[] = [
    {
      id: "faq1",
      question: "How do I place an order?",
      answer:
        "To place an order, browse restaurants, select items, add them to your cart, and proceed to checkout. You can pay with various payment methods including credit cards and cash on delivery.",
      category: "ordering",
    },
    {
      id: "faq2",
      question: "What if my order is late?",
      answer:
        "If your order is taking longer than the estimated delivery time, you can check its status in the 'Orders' section. If there's a significant delay, please contact our customer support or the restaurant directly through the app.",
      category: "delivery",
    },
    {
      id: "faq3",
      question: "How do I apply a promo code?",
      answer:
        "You can apply a promo code during checkout. Simply enter the code in the designated field and click 'Apply'. The discount will be automatically applied to your order if the code is valid and meets all requirements.",
      category: "payment",
    },
    {
      id: "faq4",
      question: "Can I cancel my order?",
      answer:
        "You can cancel your order if it hasn't been accepted by the restaurant yet. Go to 'Orders', select the order you want to cancel, and click the 'Cancel Order' button. If the restaurant has already started preparing your food, cancellation may not be possible.",
      category: "ordering",
    },
    {
      id: "faq5",
      question: "How do I add or change my delivery address?",
      answer:
        "You can add or edit your delivery addresses in your profile settings. During checkout, you can select from your saved addresses or add a new one for that specific order.",
      category: "account",
    },
    {
      id: "faq6",
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods including credit/debit cards, digital wallets, and cash on delivery. Available payment options may vary depending on your location and the restaurant.",
      category: "payment",
    },
    {
      id: "faq7",
      question: "How do I report an issue with my order?",
      answer:
        "If you have an issue with your order, go to 'Orders', select the problematic order, and click 'Report an Issue'. You can also contact our customer support directly through the app or website.",
      category: "delivery",
    },
    {
      id: "faq8",
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login screen and click 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password.",
      category: "account",
    },
  ];

  // FAQ categories
  const categories = [
    { id: "all", name: "All FAQs" },
    { id: "ordering", name: "Ordering" },
    { id: "delivery", name: "Delivery" },
    { id: "payment", name: "Payment" },
    { id: "account", name: "Account" },
  ];

  // Filter FAQs based on search query and active category
  const getFilteredFAQs = () => {
    let filtered = [...faqs];

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query),
      );
    }

    return filtered;
  };

  const filteredFAQs = getFilteredFAQs();

  // Toggle FAQ expansion
  const toggleFAQ = (id: string) => {
    setExpandedFAQs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id],
    );
  };

  // Handle contact form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit contact form
  const submitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    alert("Your message has been sent. We'll get back to you soon!");
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
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
            <h1 className="text-2xl font-bold">Help & Support</h1>
          </div>

          {/* Quick Support Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button
              className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-300"
              onClick={() => navigate("/chat/support")}
            >
              <MessageSquare className="h-8 w-8 text-orange-500 mb-3" />
              <span className="font-medium">Live Chat</span>
              <span className="text-xs text-gray-500 mt-1">Available 24/7</span>
            </button>
            <a
              href="tel:+18001234567"
              className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-300"
            >
              <Phone className="h-8 w-8 text-green-500 mb-3" />
              <span className="font-medium">Call Us</span>
              <span className="text-xs text-gray-500 mt-1">1-800-123-4567</span>
            </a>
            <a
              href="mailto:support@bizibyte.com"
              className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-300"
            >
              <Mail className="h-8 w-8 text-blue-500 mb-3" />
              <span className="font-medium">Email</span>
              <span className="text-xs text-gray-500 mt-1">
                support@bizibyte.com
              </span>
            </a>
            <button
              className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-300"
              onClick={() => window.open("/terms", "_blank")}
            >
              <FileText className="h-8 w-8 text-purple-500 mb-3" />
              <span className="font-medium">Policies</span>
              <span className="text-xs text-gray-500 mt-1">
                Terms & Privacy
              </span>
            </button>
          </div>

          {/* FAQs Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-orange-500" />
              Frequently Asked Questions
            </h2>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search FAQs"
                className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Tabs */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeCategory === category.id ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No FAQs found matching your search criteria.
                  </p>
                </div>
              ) : (
                filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-gray-50"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span>{faq.question}</span>
                      {expandedFAQs.includes(faq.id) ? (
                        <Minus className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Plus className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQs.includes(faq.id) && (
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Contact Us</h2>
            <form onSubmit={submitContactForm}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Send Message
                </Button>
              </div>
            </form>
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

export default HelpSupportScreen;
