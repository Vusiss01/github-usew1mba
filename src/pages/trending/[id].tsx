import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Header from '../../components/layout/Header';

interface TrendingItemDetails {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  prepTime: string;
  price: number;
  tags: string[];
  ingredients: string[];
  nutritionFacts: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  isNew?: boolean;
}

const trendingItemsData: { [key: string]: TrendingItemDetails } = {
  'spicy-ramen': {
    id: 'spicy-ramen',
    name: 'Spicy Ramen Bowl',
    description: 'A steaming bowl of authentic Japanese ramen with a spicy twist. Features tender chashu pork, soft-boiled eggs, fresh vegetables, and our signature spicy miso broth.',
    image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    prepTime: '20-30 min',
    price: 15.99,
    tags: ['Japanese', 'Spicy', 'Noodles', 'Soup'],
    ingredients: ['Ramen noodles', 'Chashu pork', 'Soft-boiled eggs', 'Bean sprouts', 'Green onions', 'Nori', 'Spicy miso broth'],
    nutritionFacts: {
      calories: 650,
      protein: 32,
      carbs: 75,
      fat: 28
    },
    isNew: true
  },
  'avocado-toast': {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    description: 'Freshly toasted artisanal bread topped with creamy mashed avocado, lemon juice, and everything bagel seasoning. Served with a side of microgreens.',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    prepTime: '15-25 min',
    price: 12.99,
    tags: ['Breakfast', 'Healthy', 'Vegetarian', 'Vegan'],
    ingredients: ['Sourdough bread', 'Ripe avocado', 'Lemon juice', 'Everything bagel seasoning', 'Microgreens', 'Olive oil', 'Sea salt'],
    nutritionFacts: {
      calories: 380,
      protein: 8,
      carbs: 35,
      fat: 24
    }
  },
  'acai-bowl': {
    id: 'acai-bowl',
    name: 'Acai Bowl',
    description: 'A refreshing blend of acai berries topped with fresh fruits, granola, honey, and chia seeds. Perfect for a healthy breakfast or post-workout meal.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    prepTime: '15-20 min',
    price: 13.99,
    tags: ['Healthy', 'Breakfast', 'Vegetarian', 'Vegan'],
    ingredients: ['Acai blend', 'Banana', 'Strawberries', 'Blueberries', 'Granola', 'Honey', 'Chia seeds'],
    nutritionFacts: {
      calories: 420,
      protein: 12,
      carbs: 68,
      fat: 16
    },
    isNew: true
  },
  'truffle-pasta': {
    id: 'truffle-pasta',
    name: 'Truffle Pasta',
    description: 'Handmade fettuccine pasta tossed in a creamy truffle sauce with wild mushrooms and fresh parmesan. A luxurious Italian classic.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    prepTime: '25-35 min',
    price: 24.99,
    tags: ['Italian', 'Gourmet', 'Vegetarian'],
    ingredients: ['Fresh fettuccine', 'Black truffle', 'Wild mushrooms', 'Heavy cream', 'Parmesan cheese', 'Garlic', 'Fresh herbs'],
    nutritionFacts: {
      calories: 780,
      protein: 24,
      carbs: 82,
      fat: 42
    }
  }
};

const TrendingItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const item = id ? trendingItemsData[id] : null;

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Item not found</h1>
          <p className="text-gray-600 mb-4">The item you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        showSearch={false}
        showLocation={true}
        showCart={true}
        showFilters={false}
      />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative -mt-20 bg-white rounded-t-3xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
            {item.isNew && (
              <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded">
                New
              </span>
            )}
          </div>

          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{item.rating}</span>
            <span className="mx-2 text-gray-300">•</span>
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="ml-1 text-gray-600">{item.prepTime}</span>
            <span className="mx-2 text-gray-300">•</span>
            <DollarSign className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">${item.price.toFixed(2)}</span>
          </div>

          <p className="text-gray-600 mb-6">{item.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Ingredients</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {item.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-gray-50 px-4 py-3 rounded-lg text-gray-700"
                >
                  {ingredient}
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Facts */}
          <div>
            <h2 className="text-xl font-bold mb-4">Nutrition Facts</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Calories</div>
                <div className="text-xl font-bold text-gray-900">{item.nutritionFacts.calories}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Protein</div>
                <div className="text-xl font-bold text-gray-900">{item.nutritionFacts.protein}g</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Carbs</div>
                <div className="text-xl font-bold text-gray-900">{item.nutritionFacts.carbs}g</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Fat</div>
                <div className="text-xl font-bold text-gray-900">{item.nutritionFacts.fat}g</div>
              </div>
            </div>
          </div>

          {/* Order Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 md:static md:border-0 md:p-0 md:mt-8">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-medium rounded-xl"
              onClick={() => {
                // TODO: Implement order functionality
                alert('Order functionality coming soon!');
              }}
            >
              Order Now - ${item.price.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingItemPage; 