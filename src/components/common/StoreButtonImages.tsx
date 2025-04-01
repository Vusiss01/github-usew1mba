import React from 'react';

export const AppStoreSVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="180" height="53.333" viewBox="0 0 180 53.333">
    <g fill="none" fillRule="evenodd">
      <rect width="180" height="53.333" fill="#000" rx="6"/>
      <g transform="translate(19 14)" fill="#FFF">
        <path d="M15.383 13.01c-.047-4.12 3.365-6.106 3.52-6.195-1.92-2.8-4.9-3.185-5.96-3.228-2.533-.257-4.95 1.493-6.235 1.493-1.285 0-3.267-1.457-5.37-1.42-2.763.043-5.307 1.608-6.728 4.083C-8.985 13.01-5.87 20.52-2.385 24.52c1.734 2.503 3.8 5.314 6.507 5.314 2.613-.043 3.6-1.687 6.757-1.687 3.157 0 4.05 1.687 6.813 1.63 2.813-.043 4.593-2.553 6.313-5.07 1.987-2.9 2.8-5.713 2.853-5.856-.063-.028-5.475-2.102-5.475-8.34zM11.257 3.91c1.44-1.743 2.413-4.167 2.147-6.577-2.073.085-4.583 1.38-6.067 3.123-1.333 1.544-2.5 4.01-2.187 6.38 2.32.18 4.687-1.183 6.107-2.926z"/>
      </g>
      <g fill="#FFF" fontFamily="system-ui, -apple-system, sans-serif">
        <text x="55" y="26" fontSize="12" letterSpacing=".5">Download on the</text>
        <text x="55" y="43" fontSize="21" fontWeight="500" letterSpacing="-.3">App Store</text>
      </g>
    </g>
  </svg>
);

export const GooglePlaySVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="180" height="53.333" viewBox="0 0 180 53.333">
    <g fill="none" fillRule="evenodd">
      <rect width="180" height="53.333" fill="#000" rx="6"/>
      <g transform="translate(19 14)">
        <path d="M15.874 14.663L4.737 25.8l-.004-.004L15.87 14.66" fill="#EA4335"/>
        <path d="M4.737 3.526L15.874 14.663 4.733 25.796l-.004-.004L4.737 3.526" fill="#4285F4"/>
        <path d="M4.737 3.526L15.874 14.663 4.733 25.796l-.004-.004L4.737 3.526" fill="#FBBC04"/>
        <path d="M4.737 25.8l11.137-11.137L4.737 3.526v22.274" fill="#34A853"/>
      </g>
      <g fill="#FFF" fontFamily="system-ui, -apple-system, sans-serif">
        <text x="55" y="26" fontSize="12" letterSpacing=".4">GET IT ON</text>
        <text x="55" y="43" fontSize="20" fontWeight="500" letterSpacing="-.2">Google Play</text>
      </g>
    </g>
  </svg>
); 