import React, { useState } from 'react';
import { Share2, Copy, X } from 'lucide-react';
import { Button } from './ui/button';
import { QRCodeSVG } from 'qrcode.react';

interface ShareProfileProps {
  username: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareProfile({ username, isOpen, onClose }: ShareProfileProps) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `${window.location.origin}/profile/${username}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = profileUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: '📱',
      onClick: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Check out my profile: ${profileUrl}`)}`;
        window.open(whatsappUrl, '_blank');
      },
    },
    {
      name: 'Facebook',
      icon: '📘',
      onClick: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        window.open(facebookUrl, '_blank');
      },
    },
    {
      name: 'Twitter',
      icon: '🐦',
      onClick: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my profile on Bizibyte: ${profileUrl}`)}`;
        window.open(twitterUrl, '_blank');
      },
    },
    {
      name: 'Email',
      icon: '📧',
      onClick: () => {
        const emailUrl = `mailto:?subject=${encodeURIComponent('Check out my Bizibyte profile')}&body=${encodeURIComponent(`Hi,\n\nCheck out my profile on Bizibyte: ${profileUrl}\n\nBest regards,\n${username}`)}`;
        window.location.href = emailUrl;
      },
    },
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Share Profile</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <QRCodeSVG 
                value={profileUrl} 
                size={200} 
                level="H"
                includeMargin={true}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Profile Link */}
          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              value={profileUrl}
              readOnly
              className="flex-1 p-2 border rounded-lg bg-gray-50"
              onClick={(e) => e.currentTarget.select()}
            />
            <Button
              onClick={handleCopyLink}
              className={`flex items-center gap-2 ${
                copied 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-orange-500 hover:bg-orange-600'
              } text-white transition-colors`}
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-4 gap-4">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.onClick}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl mb-1">{option.icon}</span>
                <span className="text-sm">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 