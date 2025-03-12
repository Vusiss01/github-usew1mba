import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "../ui/button";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface DietaryPreference {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

const DietaryPreferencesScreen = () => {
  const navigate = useNavigate();

  // Sample dietary preferences
  const [preferences, setPreferences] = useState<DietaryPreference[]>([
    {
      id: "vegetarian",
      name: "Vegetarian",
      description: "No meat, poultry, or seafood",
      selected: true,
    },
    {
      id: "vegan",
      name: "Vegan",
      description: "No animal products or byproducts",
      selected: false,
    },
    {
      id: "gluten-free",
      name: "Gluten-Free",
      description: "No wheat, barley, or rye",
      selected: false,
    },
    {
      id: "dairy-free",
      name: "Dairy-Free",
      description: "No milk, cheese, or dairy products",
      selected: true,
    },
    {
      id: "nut-free",
      name: "Nut-Free",
      description: "No peanuts or tree nuts",
      selected: false,
    },
    {
      id: "low-carb",
      name: "Low-Carb",
      description: "Reduced carbohydrate intake",
      selected: false,
    },
    {
      id: "keto",
      name: "Keto",
      description: "High-fat, low-carb diet",
      selected: false,
    },
    {
      id: "paleo",
      name: "Paleo",
      description:
        "Based on foods presumed to be available to paleolithic humans",
      selected: false,
    },
    {
      id: "halal",
      name: "Halal",
      description: "Adheres to Islamic dietary laws",
      selected: false,
    },
    {
      id: "kosher",
      name: "Kosher",
      description: "Adheres to Jewish dietary laws",
      selected: false,
    },
  ]);

  // Toggle preference selection
  const togglePreference = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, selected: !pref.selected } : pref,
      ),
    );
  };

  // Save preferences
  const savePreferences = () => {
    // In a real app, this would save to a backend
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          {/* Back button and title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold">Dietary Preferences</h1>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Select your dietary preferences to help us personalize your
            recommendations and filter options that match your needs.
          </p>

          {/* Preferences List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {preferences.map((preference) => (
              <div
                key={preference.id}
                className="p-4 border-b border-gray-100 last:border-0"
                onClick={() => togglePreference(preference.id)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${preference.selected ? "bg-orange-500" : "border border-gray-300"}`}
                  >
                    {preference.selected && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{preference.name}</h3>
                    <p className="text-sm text-gray-500">
                      {preference.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600"
            onClick={savePreferences}
          >
            Save Preferences
          </Button>
        </div>
      </main>

      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="md:hidden">
        <BottomNavBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DietaryPreferencesScreen;
