import React from 'react';
import { AppStoreSVG, GooglePlaySVG } from './StoreButtonImages';

interface AppStoreButtonsProps {
  className?: string;
  buttonClassName?: string;
}

const AppStoreButtons: React.FC<AppStoreButtonsProps> = ({ className = '', buttonClassName = 'h-14' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href="#"
        className={`transition-transform hover:scale-105 hover:opacity-90 ${buttonClassName}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
      >
        <AppStoreSVG />
      </a>
      <a
        href="#"
        className={`transition-transform hover:scale-105 hover:opacity-90 ${buttonClassName}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
      >
        <GooglePlaySVG />
      </a>
    </div>
  );
};

export default AppStoreButtons; 