import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock, SlidersHorizontal } from 'lucide-react';
import Header from '../../components/layout/Header';
import { Button } from '../../components/ui/button';
import FilterSidebar from '../../components/layout/FilterSidebar';

interface CategoryData {
  id: string;
  title: string;
  description: string;
  image: string;
  restaurants: {
    id: string;
    name: string;
    image: string;
    rating: number;
    deliveryTime: string;
    tags: string[];
    priceRange: string;
  }[];
}

const categoryData: { [key: string]: CategoryData } = {
  burgers: {
    id: 'burgers',
    title: 'Best Burgers',
    description: 'Discover the juiciest and most delicious burgers in your area',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    restaurants: [
      {
        id: 'burgers-and-co',
        name: 'Burgers & Co.',
        image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.7,
        deliveryTime: '15-25 min',
        tags: ['American', 'Burgers', 'Fast Food'],
        priceRange: '$$'
      },
      {
        id: 'gourmet-burger-kitchen',
        name: 'Gourmet Burger Kitchen',
        image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.5,
        deliveryTime: '20-35 min',
        tags: ['Gourmet', 'Burgers', 'American'],
        priceRange: '$$$'
      },
      {
        id: 'burger-shack',
        name: 'Burger Shack',
        image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.3,
        deliveryTime: '20-30 min',
        tags: ['Fast Food', 'Burgers', 'Shakes'],
        priceRange: '$'
      }
    ]
  },
  pizza: {
    id: 'pizza',
    title: 'Pizza Places',
    description: 'From classic Margherita to gourmet toppings, find your perfect slice',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    restaurants: [
      {
        id: 'pizza-palace',
        name: 'Pizza Palace',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.5,
        deliveryTime: '20-35 min',
        tags: ['Italian', 'Pizza', 'Pasta'],
        priceRange: '$$'
      },
      {
        id: 'authentic-italian',
        name: 'Authentic Italian',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.8,
        deliveryTime: '25-40 min',
        tags: ['Italian', 'Pizza', 'Wine'],
        priceRange: '$$$'
      }
    ]
  },
  sushi: {
    id: 'sushi',
    title: 'Sushi Restaurants',
    description: 'Fresh and delicious sushi from top-rated Japanese restaurants',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    restaurants: [
      {
        id: 'sushi-express',
        name: 'Sushi Express',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.8,
        deliveryTime: '25-40 min',
        tags: ['Japanese', 'Sushi', 'Asian'],
        priceRange: '$$'
      },
      {
        id: 'tokyo-sushi',
        name: 'Tokyo Sushi',
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.6,
        deliveryTime: '30-45 min',
        tags: ['Japanese', 'Sushi', 'Ramen'],
        priceRange: '$$$'
      }
    ]
  },
  mexican: {
    id: 'mexican',
    title: 'Mexican Restaurants',
    description: 'Authentic Mexican flavors and dishes delivered to your door',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    restaurants: [
      {
        id: 'taco-fiesta',
        name: 'Taco Fiesta',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.6,
        deliveryTime: '15-30 min',
        tags: ['Mexican', 'Tacos', 'Burritos'],
        priceRange: '$$'
      },
      {
        id: 'el-mariachi',
        name: 'El Mariachi',
        image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 4.7,
        deliveryTime: '25-40 min',
        tags: ['Mexican', 'Authentic', 'Drinks'],
        priceRange: '$$$'
      }
    ]
  }
};

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  const category = id ? categoryData[id] : null;

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        showSearch={true}
        showLocation={true}
        showCart={true}
        showFilters={true}
        onFilterClick={() => setIsFilterSidebarOpen(true)}
      />

      {/* Hero Section */}
      <div className="relative h-[200px] md:h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.title}
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
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
          <p className="text-white/90">{category.description}</p>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
              onClick={() => navigate(`/vendor/${restaurant.id}`)}
            >
              <div className="relative h-48">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-600">{restaurant.deliveryTime}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{restaurant.priceRange}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {restaurant.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        onFilterChange={() => {}}
      />
    </div>
  );
};

export default CategoryPage; 