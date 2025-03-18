import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import FoodCategoryCard from '../../components/layout/FoodCategoryCard';

const categories = [
  {
    id: "burgers",
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Juicy burgers from top-rated restaurants"
  },
  {
    id: "pizza",
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "From classic Margherita to gourmet toppings"
  },
  {
    id: "sushi",
    name: "Sushi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Fresh and delicious Japanese cuisine"
  },
  {
    id: "mexican",
    name: "Mexican",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Authentic Mexican flavors and dishes"
  },
  {
    id: "indian",
    name: "Indian",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Flavorful curries and tandoori specialties"
  },
  {
    id: "chinese",
    name: "Chinese",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Traditional and modern Chinese dishes"
  },
  {
    id: "thai",
    name: "Thai",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Spicy and aromatic Thai favorites"
  },
  {
    id: "desserts",
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Sweet treats and delightful desserts"
  }
];

const CategoriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        showSearch={true}
        showLocation={true}
        showCart={true}
        showFilters={false}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Food Categories</h1>
          <p className="mt-2 text-gray-600">Explore restaurants by cuisine type</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col">
              <FoodCategoryCard
                id={category.id}
                name={category.name}
                image={category.image}
              />
              <p className="mt-2 text-sm text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage; 