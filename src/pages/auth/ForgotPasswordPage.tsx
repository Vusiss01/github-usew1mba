import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Logo from '../../components/layout/Logo';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    // TODO: Implement actual password reset logic
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full md:w-[480px] bg-white p-8 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <Logo />
            <h1 className="mt-6 text-2xl font-bold">Reset your password</h1>
            <p className="mt-2 text-gray-600">
              {!isSubmitted 
                ? "Enter your email address and we'll send you instructions to reset your password."
                : "Check your email for instructions to reset your password."}
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={error ? 'border-red-500' : ''}
                />
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Send Reset Instructions
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link to="/login" className="font-medium text-orange-500 hover:text-orange-600">
                    Back to login
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  If an account exists with this email address, you will receive password reset instructions.
                </p>
              </div>
              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Return to Login
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-orange-500 hover:text-orange-600">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-orange-500 hover:text-orange-600">Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* Right side - Image and Content */}
      <div className="hidden md:block flex-1 bg-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/90 to-orange-500/90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="relative h-full flex flex-col justify-between p-8 text-white">
          <div>
            <h2 className="text-3xl font-bold mb-4">Reset your password</h2>
            <p className="text-lg opacity-90">
              We'll help you get back to enjoying delicious food delivered right to your door.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Available in major cities across the country</span>
            </div>
            <div className="flex space-x-4">
              <img src="/images/app-store.png" alt="Download on App Store" className="h-10" />
              <img src="/images/google-play.png" alt="Get it on Google Play" className="h-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 