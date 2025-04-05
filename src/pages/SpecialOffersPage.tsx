import React from 'react';
import { Tag, Clock, Copy } from 'lucide-react';
import { Button } from '../components/ui/button';

interface SpecialOffer {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  expiryDate: string;
  terms: string[];
}

// Sample offers data (in a real app, this would come from an API)
const specialOffers: SpecialOffer[] = [
  {
    id: '1',
    code: 'SPECIAL20',
    title: 'Special 20% Off',
    description: 'Get 20% off on your next order',
    discount: '20%',
    expiryDate: '2024-04-30',
    terms: [
      'Valid on orders above $30',
      'Cannot be combined with other offers',
      'Valid for delivery orders only'
    ]
  },
  {
    id: '2',
    code: 'NEWUSER50',
    title: 'New User Special',
    description: 'First-time users get 50% off their order',
    discount: '50%',
    expiryDate: '2024-05-15',
    terms: [
      'Valid for first-time users only',
      'Maximum discount of $25',
      'Valid on all order types'
    ]
  },
  {
    id: '3',
    code: 'WEEKEND25',
    title: 'Weekend Special',
    description: 'Get 25% off on weekend orders',
    discount: '25%',
    expiryDate: '2024-04-28',
    terms: [
      'Valid only on weekends',
      'Valid on orders above $40',
      'Maximum discount of $20'
    ]
  }
];

export default function SpecialOffersPage() {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // In a real app, you would show a toast notification here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-8">
        <Tag className="h-8 w-8 text-orange-500 mr-3" />
        <h1 className="text-3xl font-semibold">Special Offers</h1>
      </div>

      <div className="grid gap-6">
        {specialOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Offer Header */}
            <div className="bg-orange-50 p-6 border-b border-orange-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-orange-600">
                    {offer.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{offer.description}</p>
                </div>
                <div className="text-3xl font-bold text-orange-500">
                  {offer.discount}
                </div>
              </div>
            </div>

            {/* Offer Content */}
            <div className="p-6">
              {/* Promo Code */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-6">
                <div>
                  <p className="text-sm text-gray-500">Promo Code:</p>
                  <p className="text-lg font-mono font-semibold">{offer.code}</p>
                </div>
                <Button
                  onClick={() => copyToClipboard(offer.code)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Code
                </Button>
              </div>

              {/* Expiry Date */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-2" />
                <span>Valid until {formatDate(offer.expiryDate)}</span>
              </div>

              {/* Terms and Conditions */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Terms & Conditions
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {offer.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 