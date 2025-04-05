import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { MapPin, Plus, Check } from 'lucide-react';

interface Address {
  id: string;
  street: string;
  city: string;
  unit?: string;
  isDefault?: boolean;
}

interface AddressSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (address: Address) => void;
  currentAddress?: Address;
}

export default function AddressSelector({
  open,
  onClose,
  onSelect,
  currentAddress,
}: AddressSelectorProps) {
  // Sample addresses - in a real app, these would come from an API or database
  const [addresses] = useState<Address[]>([
    {
      id: '1',
      street: '12 Roncroft Dr',
      city: 'Toronto',
      isDefault: true,
    },
    {
      id: '2',
      street: '789 Bay Street',
      city: 'Toronto',
      unit: '12B',
    },
    {
      id: '3',
      street: '456 Queen Street West',
      city: 'Toronto',
      unit: '3A',
    },
  ]);

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    unit: '',
  });

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to save the new address
    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
    };
    onSelect(address);
    setNewAddress({ street: '', city: '', unit: '' });
    setShowNewAddressForm(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Delivery Address</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {!showNewAddressForm ? (
            <>
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`flex items-start p-4 rounded-lg border-2 cursor-pointer ${
                      currentAddress?.id === address.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-200'
                    }`}
                    onClick={() => {
                      onSelect(address);
                      onClose();
                    }}
                  >
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{address.street}</p>
                      {address.unit && (
                        <p className="text-sm text-gray-600">Unit {address.unit}</p>
                      )}
                      <p className="text-sm text-gray-600">{address.city}</p>
                    </div>
                    {currentAddress?.id === address.id && (
                      <Check className="h-5 w-5 text-orange-500 ml-2" />
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowNewAddressForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </>
          ) : (
            <form onSubmit={handleAddNewAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <Input
                  required
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress((prev) => ({ ...prev, street: e.target.value }))
                  }
                  placeholder="Enter street address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apartment/Suite/Unit
                </label>
                <Input
                  value={newAddress.unit}
                  onChange={(e) =>
                    setNewAddress((prev) => ({ ...prev, unit: e.target.value }))
                  }
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <Input
                  required
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="Enter city"
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowNewAddressForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                  Save Address
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 