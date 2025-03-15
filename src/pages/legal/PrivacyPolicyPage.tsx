import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Logo from "../../components/layout/Logo";
import Footer from "../../components/layout/Footer";

const PrivacyPolicyPage = () => {
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
            <h1 className="text-xl font-bold">Privacy Policy</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
            <div className="space-y-6 text-gray-600">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Information We Collect</h3>
                <p>We collect information that you provide directly to us, including:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Name and contact information</li>
                  <li>Delivery address and preferences</li>
                  <li>Payment information</li>
                  <li>Order history and preferences</li>
                  <li>Device and usage information</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Process and deliver your orders</li>
                  <li>Send you order updates and notifications</li>
                  <li>Improve our services and user experience</li>
                  <li>Personalize your recommendations</li>
                  <li>Protect against fraud and unauthorized activity</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Information Sharing</h3>
                <p>We may share your information with:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Restaurants to fulfill your orders</li>
                  <li>Delivery partners to complete deliveries</li>
                  <li>Payment processors for transactions</li>
                  <li>Service providers who assist our operations</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h3>
                <p>You have the right to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Control cookie preferences</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  <a href="mailto:privacy@bizibyte.com" className="text-orange-600 hover:text-orange-700">
                    privacy@bizibyte.com
                  </a>
                </p>
              </section>

              <section>
                <p className="text-sm">
                  Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage; 