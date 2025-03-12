import React from "react";

interface FoodItem {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  points: number;
  category: string;
  description?: string;
}

interface FoodItemGridProps {
  items?: FoodItem[];
  loading?: boolean;
}

const FoodItemGrid: React.FC<FoodItemGridProps> = ({
  items = [
    {
      id: "1",
      name: "Classic Cheeseburger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 8.99,
      rating: 4.5,
      points: 25,
      category: "Burger",
      description:
        "Juicy beef patty with melted cheese, lettuce, tomato, and special sauce",
    },
    {
      id: "2",
      name: "Double Bacon Burger",
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 12.99,
      rating: 4.8,
      points: 35,
      category: "Burger",
      description:
        "Two beef patties with crispy bacon, cheese, and all the fixings",
    },
    {
      id: "3",
      name: "Veggie Burger",
      image:
        "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 9.99,
      rating: 4.2,
      points: 20,
      category: "Burger",
      description: "Plant-based patty with fresh vegetables and vegan sauce",
    },
    {
      id: "4",
      name: "Chicken Burger",
      image:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 10.99,
      rating: 4.3,
      points: 30,
      category: "Burger",
      description:
        "Grilled chicken breast with avocado, lettuce, and spicy mayo",
    },
    {
      id: "5",
      name: "BBQ Burger",
      image:
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 11.99,
      rating: 4.6,
      points: 40,
      category: "Burger",
      description: "Beef patty with BBQ sauce, onion rings, and cheddar cheese",
    },
    {
      id: "6",
      name: "Mushroom Swiss Burger",
      image:
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: 10.49,
      rating: 4.4,
      points: 30,
      category: "Burger",
      description: "Beef patty topped with sautéed mushrooms and Swiss cheese",
    },
  ],
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md h-64 animate-pulse"
            >
              <div className="h-40 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      {items.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">No items found</h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your filters or search criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                  {item.points} pts
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-bold">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-700">{item.rating}</span>
                  </div>
                </div>
                {item.description && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {item.description}
                  </p>
                )}
                <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodItemGrid;
