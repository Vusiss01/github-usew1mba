import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface DietaryPreference {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

export default function PreferredDietPage() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<DietaryPreference[]>([
    {
      id: 'vegetarian',
      name: 'Vegetarian',
      description: 'Plant-based diet excluding meat and fish',
      selected: false
    },
    {
      id: 'vegan',
      name: 'Vegan',
      description: 'Excludes all animal products',
      selected: false
    },
    {
      id: 'gluten-free',
      name: 'Gluten Free',
      description: 'Excludes wheat and other gluten-containing grains',
      selected: false
    },
    {
      id: 'halal',
      name: 'Halal',
      description: 'Prepared according to Islamic dietary laws',
      selected: false
    },
    {
      id: 'kosher',
      name: 'Kosher',
      description: 'Prepared according to Jewish dietary laws',
      selected: false
    },
    {
      id: 'dairy-free',
      name: 'Dairy Free',
      description: 'Excludes milk and dairy products',
      selected: false
    }
  ]);

  const togglePreference = (id: string) => {
    setPreferences(preferences.map(pref => 
      pref.id === id ? { ...pref, selected: !pref.selected } : pref
    ));
  };

  const handleSave = () => {
    // TODO: Save preferences to backend
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
          <h1 className="mb-6 text-2xl font-semibold text-gray-900">Dietary Preferences</h1>
          <p className="mb-6 text-gray-600">
            Select your dietary preferences to help us customize your food recommendations.
          </p>

          <div className="space-y-4">
            {preferences.map((preference) => (
              <div
                key={preference.id}
                className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-gray-50"
                onClick={() => togglePreference(preference.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`h-5 w-5 rounded-md border ${
                      preference.selected 
                        ? 'border-orange-500 bg-orange-500' 
                        : 'border-gray-300'
                    }`}>
                      {preference.selected && (
                        <svg 
                          viewBox="0 0 24 24" 
                          className="h-5 w-5 text-white"
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="3"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900">{preference.name}</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{preference.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 