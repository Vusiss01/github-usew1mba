import React, { useState } from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router-dom';

interface Occasion {
  id: string;
  name: string;
  date: string;
  type: string;
}

export default function SpecialOccasionsPage() {
  const navigate = useNavigate();
  const [occasions, setOccasions] = useState<Occasion[]>([
    {
      id: '1',
      name: 'Birthday',
      date: '2024-06-15',
      type: 'Birthday'
    },
    {
      id: '2',
      name: 'Anniversary',
      date: '2024-08-22',
      type: 'Anniversary'
    }
  ]);

  const [newOccasion, setNewOccasion] = useState({
    name: '',
    date: '',
    type: ''
  });

  const occasionTypes = [
    'Birthday',
    'Anniversary',
    'Graduation',
    'Wedding',
    'Holiday',
    'Other'
  ];

  const handleAdd = () => {
    if (newOccasion.name && newOccasion.date && newOccasion.type) {
      setOccasions([
        ...occasions,
        {
          id: Date.now().toString(),
          ...newOccasion
        }
      ]);
      setNewOccasion({ name: '', date: '', type: '' });
    }
  };

  const handleDelete = (id: string) => {
    setOccasions(occasions.filter(occasion => occasion.id !== id));
  };

  const handleSave = () => {
    // TODO: Save occasions to backend
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1">Back to Profile</span>
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-2xl font-semibold text-gray-900">Special Occasions</h1>
          <p className="mb-6 text-gray-600">
            Add your special occasions and celebrations to receive personalized recommendations.
          </p>

          <div className="mb-8 space-y-4 rounded-lg border p-4">
            <h2 className="text-lg font-medium text-gray-900">Add New Occasion</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                placeholder="Occasion Name"
                value={newOccasion.name}
                onChange={(e) => setNewOccasion({ ...newOccasion, name: e.target.value })}
              />
              <Input
                type="date"
                value={newOccasion.date}
                onChange={(e) => setNewOccasion({ ...newOccasion, date: e.target.value })}
              />
              <select
                className="rounded-md border border-gray-300 px-3 py-2"
                value={newOccasion.type}
                onChange={(e) => setNewOccasion({ ...newOccasion, type: e.target.value })}
              >
                <option value="">Select Type</option>
                {occasionTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <Button
              onClick={handleAdd}
              className="mt-2 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Occasion</span>
            </Button>
          </div>

          <div className="space-y-4">
            {occasions.map((occasion) => (
              <div
                key={occasion.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{occasion.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(occasion.date).toLocaleDateString()} - {occasion.type}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(occasion.id)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 