import React from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { Plus, Minus, Users } from 'lucide-react';

interface BulkMeal {
  id: string;
  name: string;
  imageUrl: string;
  shop: string;
  servings: number;
  price: number;
  description: string;
}

interface BulkMealSelectorProps {
  selectedMeals: { [key: string]: number };
  onMealSelect: (mealId: string, quantity: number) => void;
}

const sampleBulkMeals: BulkMeal[] = [
  {
    id: '1',
    name: 'Pot of Rice',
    imageUrl: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=500',
    shop: "Maria's Kitchen",
    servings: 10,
    price: 29.99,
    description: 'Large pot of perfectly cooked jasmine rice'
  },
  {
    id: '2',
    name: 'Chicken Curry Party Size',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=500',
    shop: 'Spice Paradise',
    servings: 12,
    price: 89.99,
    description: 'Rich and creamy curry with tender chicken pieces'
  },
  {
    id: '3',
    name: 'Pork Steak Platter (8 pieces)',
    imageUrl: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=500',
    shop: 'Grill Master',
    servings: 8,
    price: 119.99,
    description: 'Juicy grilled pork steaks with herbs'
  },
  {
    id: '4',
    name: 'Party Size Potato Salad',
    imageUrl: 'https://images.unsplash.com/photo-1577859584099-38d39f8e8d0d?q=80&w=500',
    shop: 'Fresh Deli',
    servings: 15,
    price: 39.99,
    description: 'Creamy potato salad with mayo and fresh herbs'
  }
];

export function BulkMealSelector({ selectedMeals, onMealSelect }: BulkMealSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Select Party Size Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleBulkMeals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:border-orange-200 transition-colors"
          >
            <div className="aspect-video relative">
              <img
                src={meal.imageUrl}
                alt={meal.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className="absolute top-2 right-2 bg-orange-100 text-orange-800 border-orange-200"
              >
                <Users className="w-3 h-3 mr-1" />
                Serves {meal.servings}
              </Badge>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-lg">{meal.name}</h3>
                  <p className="text-sm text-gray-500">{meal.shop}</p>
                </div>
                <span className="text-lg font-semibold text-orange-600">
                  ${meal.price.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{meal.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onMealSelect(meal.id, (selectedMeals[meal.id] || 0) - 1)}
                    disabled={!selectedMeals[meal.id]}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{selectedMeals[meal.id] || 0}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onMealSelect(meal.id, (selectedMeals[meal.id] || 0) + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  Total: ${((selectedMeals[meal.id] || 0) * meal.price).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 