import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CreditCard } from 'lucide-react';

interface PaymentMethodFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (paymentMethod: any) => void;
}

export default function PaymentMethodForm({
  open,
  onClose,
  onSave,
}: PaymentMethodFormProps) {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to process and tokenize the card
    const paymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      last4: cardDetails.cardNumber.slice(-4),
      brand: 'New Card',
      expiryMonth: cardDetails.expiryMonth,
      expiryYear: cardDetails.expiryYear,
    };
    onSave(paymentMethod);
    setCardDetails({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <Input
              required
              value={cardDetails.cardholderName}
              onChange={(e) =>
                setCardDetails((prev) => ({ ...prev, cardholderName: e.target.value }))
              }
              placeholder="Enter cardholder name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <Input
                required
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails((prev) => ({ ...prev, cardNumber: e.target.value }))
                }
                placeholder="1234 5678 9012 3456"
                maxLength={16}
                pattern="[0-9]*"
              />
              <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <Input
                required
                value={cardDetails.expiryMonth}
                onChange={(e) =>
                  setCardDetails((prev) => ({ ...prev, expiryMonth: e.target.value }))
                }
                placeholder="MM"
                maxLength={2}
                pattern="[0-9]*"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <Input
                required
                value={cardDetails.expiryYear}
                onChange={(e) =>
                  setCardDetails((prev) => ({ ...prev, expiryYear: e.target.value }))
                }
                placeholder="YY"
                maxLength={2}
                pattern="[0-9]*"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <Input
                required
                type="password"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))
                }
                placeholder="123"
                maxLength={4}
                pattern="[0-9]*"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
              Save Card
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 