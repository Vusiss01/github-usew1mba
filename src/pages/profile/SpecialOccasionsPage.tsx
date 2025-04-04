import React, { useState } from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { BulkMealSelector } from '../../components/ui/BulkMealSelector';

interface Occasion {
  id: string;
  name: string;
  date: string;
  type: string;
  selectedMeals: { [key: string]: number };
}

export default function SpecialOccasionsPage() {
  const navigate = useNavigate();
  const [occasions, setOccasions] = useState<Occasion[]>([
    {
      id: '1',
      name: 'Birthday',
      date: '2024-06-15',
      type: 'Birthday',
      selectedMeals: {}
    },
    {
      id: '2',
      name: 'Anniversary',
      date: '2024-08-22',
      type: 'Anniversary',
      selectedMeals: {}
    }
  ]);

  const [newOccasion, setNewOccasion] = useState({
    name: '',
    date: '',
    type: ''
  });

  const [selectedOccasionId, setSelectedOccasionId] = useState<string | null>(null);

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
      const newId = Date.now().toString();
      setOccasions([
        ...occasions,
        {
          id: newId,
          ...newOccasion,
          selectedMeals: {}
        }
      ]);
      setNewOccasion({ name: '', date: '', type: '' });
      setSelectedOccasionId(newId);
    }
  };

  const handleDelete = (id: string) => {
    setOccasions(occasions.filter(occasion => occasion.id !== id));
    if (selectedOccasionId === id) {
      setSelectedOccasionId(null);
    }
  };

  const handleMealSelect = (occasionId: string, mealId: string, quantity: number) => {
    setOccasions(occasions.map(occasion => {
      if (occasion.id === occasionId) {
        return {
          ...occasion,
          selectedMeals: {
            ...occasion.selectedMeals,
            [mealId]: Math.max(0, quantity)
          }
        };
      }
      return occasion;
    }));
  };

  const handleSave = () => {
    // TODO: Save occasions to backend
    navigate('/profile');
  };

  const selectedOccasion = occasions.find(o => o.id === selectedOccasionId);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
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
                className="rounded-lg border p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{occasion.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(occasion.date).toLocaleDateString()} - {occasion.type}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedOccasionId(occasion.id === selectedOccasionId ? null : occasion.id)}
                    >
                      {occasion.id === selectedOccasionId ? 'Hide Meals' : 'Select Meals'}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDelete(occasion.id)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {occasion.id === selectedOccasionId && (
                  <div className="mt-4 border-t pt-4">
                    <BulkMealSelector
                      selectedMeals={occasion.selectedMeals}
                      onMealSelect={(mealId, quantity) => handleMealSelect(occasion.id, mealId, quantity)}
                    />
                  </div>
                )}
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