import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Logo from "../../components/layout/Logo";
import Footer from "../../components/layout/Footer";

const TermsPage = () => {
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
            <h1 className="text-xl font-bold">Terms of Service</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">Terms of Service</h2>
            <div className="space-y-6 text-gray-600">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using Bizibyte's services, you agree to be bound by these Terms of Service.
                  If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Use of Services</h3>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>You must be at least 18 years old to use our services</li>
                  <li>You agree to provide accurate and complete information</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You agree not to use the service for any illegal purposes</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Ordering and Delivery</h3>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>All orders are subject to restaurant acceptance</li>
                  <li>Delivery times are estimates and may vary</li>
                  <li>You agree to be present at the delivery location</li>
                  <li>Prices and availability are subject to change</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Payment Terms</h3>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>You agree to pay all charges at the prices in effect</li>
                  <li>All payments must be made through our approved payment methods</li>
                  <li>Fees and taxes may apply to your order</li>
                  <li>Refunds are subject to our refund policy</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Modifications to Service</h3>
                <p>
                  We reserve the right to modify or discontinue our service at any time.
                  We will notify users of any material changes to these terms.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Limitation of Liability</h3>
                <p>
                  Bizibyte is not liable for any indirect, incidental, special, consequential,
                  or punitive damages arising from your use of our services.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h3>
                <p>
                  If you have any questions about these Terms, please contact us at:
                  <br />
                  <a href="mailto:legal@bizibyte.com" className="text-orange-600 hover:text-orange-700">
                    legal@bizibyte.com
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

export default TermsPage; 