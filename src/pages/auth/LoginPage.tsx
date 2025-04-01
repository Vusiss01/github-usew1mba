import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, MapPin } from 'lucide-react';
import Logo from '../../components/layout/Logo';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import AppStoreButtons from '../../components/common/AppStoreButtons';
import SocialSignIn from '../../components/auth/SocialSignIn';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSocialSignIn = (provider: string) => {
    // Implement social sign-in logic here
    console.log(`Signing in with ${provider}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement actual login logic
      console.log('Form submitted:', formData);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full md:w-[480px] bg-white p-8 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <Logo />
            <h1 className="mt-6 text-2xl font-bold">Welcome back</h1>
            <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
          </div>

          <SocialSignIn 
            onSignIn={handleSocialSignIn}
            className="mb-6"
          />

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
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm font-medium text-orange-500 hover:text-orange-600">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Sign in
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-orange-500 hover:text-orange-600">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="relative h-full flex flex-col justify-between p-8 text-white">
          <div>
            <h2 className="text-3xl font-bold mb-4">Delicious food delivered to your door</h2>
            <p className="text-lg opacity-90">
              Order from your favorite restaurants and track your delivery in real-time
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Available in major cities across the country</span>
            </div>
            <AppStoreButtons buttonClassName="h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 