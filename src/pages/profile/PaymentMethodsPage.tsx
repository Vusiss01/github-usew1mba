import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, Check } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  isDefault: boolean;
}

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/24',
      cardHolder: 'John Doe',
      isDefault: true,
    },
    {
      id: '2',
      type: 'debit',
      cardNumber: '**** **** **** 5678',
      expiryDate: '06/25',
      cardHolder: 'John Doe',
      isDefault: false,
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCard, setNewCard] = useState<Omit<PaymentMethod, 'id'>>({
    type: 'credit',
    cardNumber: '',
    expiryDate: '',
    cardHolder: '',
    isDefault: false,
  });

  const handleAddCard = () => {
    if (newCard.cardNumber && newCard.expiryDate && newCard.cardHolder) {
      const id = Math.random().toString(36).substr(2, 9);
      const maskedNumber = '**** **** **** ' + newCard.cardNumber.slice(-4);
      setPaymentMethods([
        ...paymentMethods,
        { ...newCard, id, cardNumber: maskedNumber },
      ]);
      setIsAddingNew(false);
      setNewCard({
        type: 'credit',
        cardNumber: '',
        expiryDate: '',
        cardHolder: '',
        isDefault: false,
      });
    }
  };

  const handleDeleteCard = (id: string) => {
    setPaymentMethods(paymentMethods.filter(card => card.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(card => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <Button
            onClick={() => setIsAddingNew(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Card
          </Button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((card) => (
            <div
              key={card.id}
              className={`p-4 border rounded-lg ${
                card.isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold capitalize">{card.type} Card</span>
                    {card.isDefault && (
                      <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 font-mono">{card.cardNumber}</p>
                  <p className="text-gray-600">
                    {card.cardHolder} • Expires {card.expiryDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!card.isDefault && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCard(card.id)}
                        className="hover:bg-gray-100 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleSetDefault(card.id)}
                        className="text-sm"
                      >
                        Set as Default
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isAddingNew && (
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Card Type</label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={newCard.type}
                    onChange={(e) =>
                      setNewCard({ ...newCard, type: e.target.value as 'credit' | 'debit' })
                    }
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <Input
                    type="text"
                    value={newCard.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                      setNewCard({ ...newCard, cardNumber: value });
                    }}
                    placeholder="Enter card number"
                    maxLength={16}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <Input
                    type="text"
                    value={newCard.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      setNewCard({ ...newCard, expiryDate: value });
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <Input
                    type="password"
                    maxLength={4}
                    placeholder="Enter CVV"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Card Holder Name</label>
                  <Input
                    value={newCard.cardHolder}
                    onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value })}
                    placeholder="Enter card holder name"
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newCard.isDefault}
                      onChange={(e) =>
                        setNewCard({ ...newCard, isDefault: e.target.checked })
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Set as default payment method</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingNew(false);
                    setNewCard({
                      type: 'credit',
                      cardNumber: '',
                      expiryDate: '',
                      cardHolder: '',
                      isDefault: false,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCard}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Save Card
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 