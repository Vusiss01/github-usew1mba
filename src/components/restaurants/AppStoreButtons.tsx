import React from 'react';

const GooglePlayButton = () => (
  <img 
    src="/google-play.svg" 
    alt="Get it on Google Play" 
    className="h-12 w-auto"
  />
);

const AppStoreButton = () => (
  <img 
    src="/app-store.svg" 
    alt="Download on the App Store" 
    className="h-12 w-auto"
  />
);

interface AppStoreButtonsProps {
  className?: string;
}

const AppStoreButtons: React.FC<AppStoreButtonsProps> = ({ className = '' }) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      <a
        href="#"
        className="bg-white rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition-shadow duration-300"
        aria-label="Get it on Google Play"
      >
        <GooglePlayButton />
      </a>
      <a
        href="#"
        className="bg-white rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition-shadow duration-300"
        aria-label="Download on the App Store"
      >
        <AppStoreButton />
      </a>
    </div>
  );
};

export default AppStoreButtons; 