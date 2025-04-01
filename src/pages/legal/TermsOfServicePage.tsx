import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Logo from '../../components/layout/Logo';

const TermsOfServicePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using Bizibyte's services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
            <p className="text-gray-600 leading-relaxed">
              Bizibyte provides an online platform connecting customers with local restaurants for food delivery 
              and takeout services. We facilitate the ordering process but are not responsible for the 
              preparation of food items.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
            <p className="text-gray-600 leading-relaxed">
              Users must provide accurate and complete information when creating an account. You are 
              responsible for maintaining the confidentiality of your account credentials and for all 
              activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Ordering and Payment</h2>
            <p className="text-gray-600 leading-relaxed">
              All payments are processed securely through our platform. Prices and availability of items 
              are subject to change. We reserve the right to refuse service or cancel orders at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Delivery Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              Delivery times are estimates and may vary based on various factors. We strive to ensure 
              timely delivery but cannot guarantee specific delivery times during peak hours or adverse conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Your privacy is important to us. Please review our{' '}
              <Link to="/privacy" className="text-orange-500 hover:text-orange-600">
                Privacy Policy
              </Link>{' '}
              to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfServicePage; 