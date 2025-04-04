import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star } from 'lucide-react';

interface CateringCompany {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  specialties: string[];
  minOrderSize: number;
  preparationTime: string;
  description: string;
}

interface CateringCompaniesProps {
  selectedCompanyId: string;
  onSelectCompany: (companyId: string) => void;
}

const companies: CateringCompany[] = [
  {
    id: '1',
    name: 'Royal Feast Catering',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    rating: 4.8,
    specialties: ['Full Course Meals', 'Fine Dining', 'Wedding Catering'],
    minOrderSize: 50,
    preparationTime: '48 hours',
    description: 'Luxury catering service specializing in elegant weddings and high-end corporate events.'
  },
  {
    id: '2',
    name: 'Quick Bites Events',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    rating: 4.6,
    specialties: ['Fast Food', 'Finger Foods', 'Corporate Lunches'],
    minOrderSize: 20,
    preparationTime: '24 hours',
    description: 'Efficient catering solutions for corporate events and casual gatherings.'
  },
  {
    id: '3',
    name: 'Green Garden Catering',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    rating: 4.7,
    specialties: ['Vegetarian', 'Vegan', 'Health Food'],
    minOrderSize: 15,
    preparationTime: '36 hours',
    description: 'Sustainable and healthy catering options with a focus on plant-based cuisine.'
  },
  {
    id: '4',
    name: 'Party Time Platters',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    rating: 4.5,
    specialties: ['Party Platters', 'Appetizers', 'Desserts'],
    minOrderSize: 25,
    preparationTime: '24 hours',
    description: 'Specializing in party platters and appetizers perfect for social gatherings.'
  },
  {
    id: '5',
    name: 'Global Fusion Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    rating: 4.9,
    specialties: ['International Cuisine', 'Fusion Dishes', 'Custom Menus'],
    minOrderSize: 35,
    preparationTime: '48 hours',
    description: 'Bringing together flavors from around the world with innovative fusion dishes.'
  }
];

export function CateringCompanies({ selectedCompanyId, onSelectCompany }: CateringCompaniesProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Select a Catering Company</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <Card
            key={company.id}
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedCompanyId === company.id
                ? 'ring-2 ring-orange-500'
                : 'hover:shadow-lg'
            }`}
            onClick={() => onSelectCompany(company.id)}
          >
            <div className="aspect-video relative">
              <img
                src={company.imageUrl}
                alt={company.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium">{company.rating}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{company.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{company.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {company.specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className="text-xs"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Min. Order: {company.minOrderSize} people</span>
                <span>Prep Time: {company.preparationTime}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 