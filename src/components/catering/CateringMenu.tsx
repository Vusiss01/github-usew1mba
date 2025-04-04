import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus, Minus, Users } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  servings: number;
  category: string;
  dietaryInfo: string[];
}

interface CateringMenuProps {
  companyId: string;
  selectedItems: { [key: string]: number };
  onUpdateItem: (itemId: string, quantity: number) => void;
}

const menuItems: { [key: string]: MenuItem[] } = {
  '1': [ // Royal Feast Catering
    {
      id: '1-1',
      name: 'Premium Wedding Buffet',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      description: 'Complete wedding buffet with appetizers, main courses, and desserts',
      price: 45.99,
      servings: 50,
      category: 'Full Course',
      dietaryInfo: ['Customizable', 'Gluten-free options']
    },
    {
      id: '1-2',
      name: 'Elegant Hors d\'oeuvres Package',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      description: 'Selection of premium appetizers and finger foods',
      price: 25.99,
      servings: 30,
      category: 'Appetizers',
      dietaryInfo: ['Vegetarian options']
    }
  ],
  '2': [ // Quick Bites Events
    {
      id: '2-1',
      name: 'Corporate Lunch Box',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      description: 'Individual lunch boxes with sandwich, salad, and dessert',
      price: 15.99,
      servings: 1,
      category: 'Lunch',
      dietaryInfo: ['Vegetarian options', 'Halal']
    },
    {
      id: '2-2',
      name: 'Party Slider Package',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      description: 'Mini burgers and sandwiches perfect for casual events',
      price: 12.99,
      servings: 20,
      category: 'Fast Food',
      dietaryInfo: ['Contains meat']
    }
  ],
  '3': [ // Green Garden Catering
    {
      id: '3-1',
      name: 'Vegan Buddha Bowl Station',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      description: 'Build-your-own healthy buddha bowls with quinoa base',
      price: 18.99,
      servings: 15,
      category: 'Healthy',
      dietaryInfo: ['Vegan', 'Gluten-free']
    },
    {
      id: '3-2',
      name: 'Plant-Based Party Platter',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      description: 'Assortment of vegan appetizers and snacks',
      price: 22.99,
      servings: 25,
      category: 'Appetizers',
      dietaryInfo: ['Vegan', 'Nut-free']
    }
  ],
  '4': [ // Party Time Platters
    {
      id: '4-1',
      name: 'Dessert Extravaganza',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      description: 'Variety of cakes, pastries, and sweet treats',
      price: 16.99,
      servings: 30,
      category: 'Desserts',
      dietaryInfo: ['Contains dairy', 'Contains nuts']
    },
    {
      id: '4-2',
      name: 'Finger Food Feast',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      description: 'Mix of hot and cold appetizers',
      price: 19.99,
      servings: 25,
      category: 'Appetizers',
      dietaryInfo: ['Mixed options']
    }
  ],
  '5': [ // Global Fusion Kitchen
    {
      id: '5-1',
      name: 'International Food Station',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      description: 'Multiple cuisine stations featuring global favorites',
      price: 35.99,
      servings: 40,
      category: 'Full Course',
      dietaryInfo: ['Mixed options', 'Customizable']
    },
    {
      id: '5-2',
      name: 'Fusion Appetizer Collection',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
      description: 'Creative fusion appetizers combining different cuisines',
      price: 28.99,
      servings: 35,
      category: 'Appetizers',
      dietaryInfo: ['Mixed options']
    }
  ]
};

export function CateringMenu({ companyId, selectedItems, onUpdateItem }: CateringMenuProps) {
  const items = menuItems[companyId] || [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Select Menu Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className="absolute top-2 right-2 bg-orange-100 text-orange-800 border-orange-200"
              >
                <Users className="w-3 h-3 mr-1" />
                Serves {item.servings}
              </Badge>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <span className="text-lg font-semibold text-orange-600">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.dietaryInfo.map((info) => (
                  <Badge
                    key={info}
                    variant="outline"
                    className="text-xs"
                  >
                    {info}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onUpdateItem(item.id, (selectedItems[item.id] || 0) - 1)}
                    disabled={!selectedItems[item.id]}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{selectedItems[item.id] || 0}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onUpdateItem(item.id, (selectedItems[item.id] || 0) + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  Total: ${((selectedItems[item.id] || 0) * item.price).toFixed(2)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 