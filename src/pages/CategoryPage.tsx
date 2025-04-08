import React from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';

// Sample data structure for food items
interface FoodItem {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
}

// Sample data for different categories
const categoryData: Record<string, FoodItem[]> = {
  pizza: [
    {
      id: 1,
      name: "Pepperoni Pizza",
      restaurant: "Pizza Palace",
      price: 15.99,
      description: "Classic pepperoni pizza with mozzarella cheese",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      rating: 4.5,
      deliveryTime: "25-30 min"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Italian Corner",
      price: 13.99,
      description: "Fresh basil, tomatoes, and buffalo mozzarella",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      rating: 4.8,
      deliveryTime: "20-25 min"
    },
    {
      id: 3,
      name: "BBQ Chicken Pizza",
      restaurant: "Pizza Hub",
      price: 16.99,
      description: "Grilled chicken with BBQ sauce and red onions",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      rating: 4.3,
      deliveryTime: "30-35 min"
    }
  ],
  burger: [
    {
      id: 1,
      name: "Classic Cheeseburger",
      restaurant: "Burger Joint",
      price: 12.99,
      description: "Angus beef patty with cheddar cheese",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      rating: 4.6,
      deliveryTime: "20-25 min"
    },
    {
      id: 2,
      name: "Bacon Avocado Burger",
      restaurant: "Gourmet Burgers",
      price: 14.99,
      description: "Fresh avocado, crispy bacon, and special sauce",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
      rating: 4.7,
      deliveryTime: "25-30 min"
    },
    {
      id: 3,
      name: "Mushroom Swiss Burger",
      restaurant: "Burger Shack",
      price: 13.99,
      description: "Sautéed mushrooms with Swiss cheese",
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5",
      rating: 4.4,
      deliveryTime: "20-25 min"
    }
  ],
  noodles: [
    {
      id: 1,
      name: "Pad Thai",
      restaurant: "Thai Express",
      price: 11.99,
      description: "Classic Thai rice noodles with shrimp",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
      rating: 4.5,
      deliveryTime: "25-30 min"
    },
    {
      id: 2,
      name: "Ramen Bowl",
      restaurant: "Noodle House",
      price: 13.99,
      description: "Traditional Japanese ramen with pork",
      image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1",
      rating: 4.8,
      deliveryTime: "20-25 min"
    }
  ],
  "sub-sandwich": [
    {
      id: 1,
      name: "Italian Sub",
      restaurant: "Subway Corner",
      price: 9.99,
      description: "Classic Italian meats and cheeses",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569",
      rating: 4.3,
      deliveryTime: "15-20 min"
    },
    {
      id: 2,
      name: "Turkey Avocado Sub",
      restaurant: "Fresh Subs",
      price: 10.99,
      description: "Sliced turkey with fresh avocado",
      image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304",
      rating: 4.6,
      deliveryTime: "15-20 min"
    }
  ],
  chowmein: [
    {
      id: 1,
      name: "Vegetable Chowmein",
      restaurant: "Chinese Wok",
      price: 10.99,
      description: "Stir-fried noodles with mixed vegetables",
      image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1",
      rating: 4.4,
      deliveryTime: "20-25 min"
    },
    {
      id: 2,
      name: "Chicken Chowmein",
      restaurant: "Asian Kitchen",
      price: 11.99,
      description: "Classic chicken chowmein with vegetables",
      image: "https://images.unsplash.com/photo-1619380061814-58f03707f082",
      rating: 4.7,
      deliveryTime: "25-30 min"
    }
  ],
  sushi: [
    {
      id: 1,
      name: "California Roll",
      restaurant: "Sushi Master",
      price: 12.99,
      description: "Fresh crab, avocado, and cucumber roll",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      rating: 4.6,
      deliveryTime: "20-25 min"
    },
    {
      id: 2,
      name: "Salmon Nigiri",
      restaurant: "Tokyo Bites",
      price: 14.99,
      description: "Premium salmon over seasoned rice",
      image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a",
      rating: 4.8,
      deliveryTime: "25-30 min"
    },
    {
      id: 3,
      name: "Dragon Roll",
      restaurant: "Sushi Express",
      price: 16.99,
      description: "Eel and cucumber topped with avocado",
      image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56",
      rating: 4.7,
      deliveryTime: "20-25 min"
    }
  ]
};

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const items = category ? categoryData[category.toLowerCase()] : [];

  if (!items) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <h1 className="text-4xl font-normal mb-8 capitalize">{category}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group">
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-4 bg-gray-50">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Details Container */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-base">{item.restaurant}</h3>
                    <p className="text-base">{item.name}</p>
                  </div>
                  <p className="text-base font-medium">${item.price}</p>
                </div>
                
                <p className="text-sm text-gray-600">{item.description}</p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.deliveryTime}</span>
                  </div>
                  
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 