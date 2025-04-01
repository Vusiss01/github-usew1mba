import React from 'react';
import { FaGoogle, FaFacebookF, FaApple, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface SocialSignInProps {
  className?: string;
  onSignIn: (provider: 'google' | 'facebook' | 'apple' | 'whatsapp' | 'twitter') => void;
}

const SocialSignIn: React.FC<SocialSignInProps> = ({ className = '', onSignIn }) => {
  const socialButtons = [
    {
      name: 'google',
      icon: FaGoogle,
      label: 'Continue with Google',
      bgColor: 'bg-white',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-300',
      hoverBg: 'hover:bg-gray-50'
    },
    {
      name: 'facebook',
      icon: FaFacebookF,
      label: 'Continue with Facebook',
      bgColor: 'bg-[#1877F2]',
      textColor: 'text-white',
      borderColor: 'border-transparent',
      hoverBg: 'hover:bg-[#1874E8]'
    },
    {
      name: 'apple',
      icon: FaApple,
      label: 'Continue with Apple',
      bgColor: 'bg-black',
      textColor: 'text-white',
      borderColor: 'border-transparent',
      hoverBg: 'hover:bg-gray-900'
    },
    {
      name: 'whatsapp',
      icon: FaWhatsapp,
      label: 'Continue with WhatsApp',
      bgColor: 'bg-[#25D366]',
      textColor: 'text-white',
      borderColor: 'border-transparent',
      hoverBg: 'hover:bg-[#22C35F]'
    },
    {
      name: 'twitter',
      icon: FaXTwitter,
      label: 'Continue with X',
      bgColor: 'bg-black',
      textColor: 'text-white',
      borderColor: 'border-transparent',
      hoverBg: 'hover:bg-gray-900'
    }
  ];

  return (
    <div className={`space-y-3 w-full ${className}`}>
      {socialButtons.map((button) => {
        const Icon = button.icon;
        return (
          <button
            key={button.name}
            onClick={() => onSignIn(button.name as any)}
            className={`
              flex items-center justify-center w-full px-4 py-3 
              ${button.bgColor} ${button.textColor} ${button.hoverBg}
              border ${button.borderColor} rounded-lg
              transition-all duration-200 font-medium
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
            `}
          >
            <Icon className="w-5 h-5" />
            <span className="ml-3">{button.label}</span>
          </button>
        );
      })}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>
    </div>
  );
};

export default SocialSignIn; 