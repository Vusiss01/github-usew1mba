import React from 'react';
import AppStoreButtons from './AppStoreButtons';

const AppInstallSection = () => {
  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500" />
      
      {/* Wave shape at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-[60px]"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
        </svg>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 py-16 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Text content */}
          <div className="flex-1 text-white mb-12 lg:mb-0">
            <h2 className="text-5xl font-bold mb-6">Install the app</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the best food delivery experience with our mobile app. Order food from your favorite restaurants, track your delivery in real-time, and enjoy exclusive offers.
            </p>
            <AppStoreButtons />
          </div>

          {/* Phone mockups */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-[600px] mx-auto">
              {/* Main phone */}
              <div className="relative z-20 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d"
                  alt="Food delivery app interface"
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Secondary phone */}
              <div className="absolute top-24 -right-6 z-10 w-[80%] rounded-[2.5rem] overflow-hidden shadow-2xl opacity-90 transform rotate-6">
                <img
                  src="https://images.unsplash.com/photo-1576867757603-05b134ebc379"
                  alt="Food delivery app interface"
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Third phone */}
              <div className="absolute top-48 -right-12 z-0 w-[60%] rounded-[2.5rem] overflow-hidden shadow-2xl opacity-80 transform rotate-12">
                <img
                  src="https://images.unsplash.com/photo-1576867757603-05b134ebc379"
                  alt="Food delivery app interface"
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppInstallSection; 