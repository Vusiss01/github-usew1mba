import React, { useState } from 'react';
import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export default function ManageAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false,
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    type: 'home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false,
  });

  const handleAddAddress = () => {
    if (newAddress.street && newAddress.city && newAddress.state && newAddress.zipCode) {
      const id = Math.random().toString(36).substr(2, 9);
      setAddresses([...addresses, { ...newAddress, id }]);
      setIsAddingNew(false);
      setNewAddress({
        type: 'home',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false,
      });
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Manage Addresses</h1>
          <Button
            onClick={() => setIsAddingNew(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 border rounded-lg ${
                address.isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold capitalize">{address.type}</span>
                    {address.isDefault && (
                      <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{address.street}</p>
                  <p className="text-gray-600">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingId(address.id)}
                    className="hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="hover:bg-gray-100 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      onClick={() => handleSetDefault(address.id)}
                      className="text-sm"
                    >
                      Set as Default
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isAddingNew && (
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Address Type</label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={newAddress.type}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, type: e.target.value as 'home' | 'work' | 'other' })
                    }
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Street Address</label>
                  <Input
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <Input
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <Input
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    placeholder="Enter state"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">ZIP Code</label>
                  <Input
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    placeholder="Enter ZIP code"
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, isDefault: e.target.checked })
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Set as default address</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingNew(false);
                    setNewAddress({
                      type: 'home',
                      street: '',
                      city: '',
                      state: '',
                      zipCode: '',
                      isDefault: false,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAddress}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Save Address
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 