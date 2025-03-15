import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, Users, Globe, Award } from "lucide-react";
import Logo from "../../components/layout/Logo";
import { Button } from "../../components/ui/button";
import Footer from "../../components/layout/Footer";

const InvestorsPage = () => {
  const navigate = useNavigate();

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
            <h1 className="text-xl font-bold">Investors</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Investing in the Future of Food Delivery
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Join us in revolutionizing the food delivery industry through
                technology and innovation.
              </p>
              <Button
                className="bg-white text-orange-500 hover:bg-gray-100"
                onClick={() => window.open("mailto:investors@bizibyte.com")}
              >
                Contact Investor Relations
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">1M+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">50K+</div>
                <div className="text-gray-600">Restaurant Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">100+</div>
                <div className="text-gray-600">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">500K+</div>
                <div className="text-gray-600">Monthly Orders</div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Strategy */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Growth Strategy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <TrendingUp className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Market Expansion</h3>
                <p className="text-gray-600">
                  Aggressive expansion into new markets and cities, with a focus
                  on high-growth regions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Partner Network</h3>
                <p className="text-gray-600">
                  Growing our network of restaurant partners and delivery fleet
                  to improve service coverage.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Globe className="h-10 w-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Technology Innovation</h3>
                <p className="text-gray-600">
                  Continuous investment in technology to enhance user experience
                  and operational efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Financial Highlights</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Q4 2023 Highlights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Award className="h-5 w-5 text-orange-500 mr-3" />
                      <span>Revenue growth of 85% year-over-year</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-5 w-5 text-orange-500 mr-3" />
                      <span>Monthly active users increased by 65%</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-5 w-5 text-orange-500 mr-3" />
                      <span>Restaurant partner network expanded by 40%</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">2024 Outlook</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Award className="h-5 w-5 text-orange-500 mr-3" />
                      <span>Projected revenue growth of 100%</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-5 w-5 text-orange-500 mr-3" />
                      <span>Expansion to 50 new cities planned</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-5 w-5 text-orange-500 mr-3" />
                      <span>Launch of new technology initiatives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Investor Relations</h2>
              <p className="text-gray-600 mb-8">
                For investor relations inquiries, please contact our team at:
              </p>
              <a
                href="mailto:investors@bizibyte.com"
                className="text-orange-500 hover:text-orange-600 text-lg font-medium"
              >
                investors@bizibyte.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InvestorsPage; 