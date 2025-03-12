import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Star, Minus, Plus, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  popular: boolean;
  vegetarian: boolean;
  spicy: boolean;
  calories: number;
  ingredients: string[];
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  customizationOptions: {
    id: string;
    name: string;
    required: boolean;
    multiSelect: boolean;
    options: {
      id: string;
      name: string;
      price: number;
    }[];
  }[];
}

const ItemDetailScreen = () => {
  const navigate = useNavigate();
  const { vendorId, itemId } = useParams<{
    vendorId: string;
    itemId: string;
  }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Sample item data - in a real app, this would be fetched based on itemId
  const item: MenuItem = {
    id: itemId || "classic-burger",
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty with melted cheese, lettuce, tomato, and special sauce on a toasted brioche bun. Our signature burger that's been a customer favorite for years.",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 342,
    popular: true,
    vegetarian: false,
    spicy: false,
    calories: 650,
    ingredients: [
      "Beef patty",
      "Cheddar cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Pickles",
      "Special sauce",
      "Brioche bun",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 650,
      protein: 35,
      carbs: 40,
      fat: 38,
    },
    customizationOptions: [
      {
        id: "cheese",
        name: "Cheese",
        required: false,
        multiSelect: false,
        options: [
          { id: "cheddar", name: "Cheddar", price: 0 },
          { id: "american", name: "American", price: 0 },
          { id: "swiss", name: "Swiss", price: 0.5 },
          { id: "blue", name: "Blue Cheese", price: 0.75 },
        ],
      },
      {
        id: "toppings",
        name: "Extra Toppings",
        required: false,
        multiSelect: true,
        options: [
          { id: "bacon", name: "Bacon", price: 1.5 },
          { id: "avocado", name: "Avocado", price: 1.25 },
          { id: "egg", name: "Fried Egg", price: 1.0 },
          { id: "mushrooms", name: "Sautéed Mushrooms", price: 0.75 },
        ],
      },
      {
        id: "doneness",
        name: "Doneness",
        required: true,
        multiSelect: false,
        options: [
          { id: "medium-rare", name: "Medium Rare", price: 0 },
          { id: "medium", name: "Medium", price: 0 },
          { id: "medium-well", name: "Medium Well", price: 0 },
          { id: "well-done", name: "Well Done", price: 0 },
        ],
      },
    ],
  };

  // Initialize selected options
  React.useEffect(() => {
    const initialOptions: Record<string, string[]> = {};
    item.customizationOptions.forEach((option) => {
      if (option.required && !option.multiSelect) {
        initialOptions[option.id] = [option.options[0].id];
      } else {
        initialOptions[option.id] = [];
      }
    });
    setSelectedOptions(initialOptions);
  }, [item]);

  // Handle option selection
  const handleOptionSelect = (
    optionGroupId: string,
    optionId: string,
    multiSelect: boolean,
  ) => {
    setSelectedOptions((prev) => {
      const newOptions = { ...prev };

      if (multiSelect) {
        // For multi-select, toggle the option
        if (newOptions[optionGroupId].includes(optionId)) {
          newOptions[optionGroupId] = newOptions[optionGroupId].filter(
            (id) => id !== optionId,
          );
        } else {
          newOptions[optionGroupId] = [...newOptions[optionGroupId], optionId];
        }
      } else {
        // For single-select, replace the option
        newOptions[optionGroupId] = [optionId];
      }

      return newOptions;
    });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = item.price * quantity;

    // Add price for selected options
    Object.entries(selectedOptions).forEach(
      ([optionGroupId, selectedOptionIds]) => {
        const optionGroup = item.customizationOptions.find(
          (group) => group.id === optionGroupId,
        );
        if (optionGroup) {
          selectedOptionIds.forEach((optionId) => {
            const option = optionGroup.options.find(
              (opt) => opt.id === optionId,
            );
            if (option) {
              total += option.price * quantity;
            }
          });
        }
      },
    );

    return total.toFixed(2);
  };

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Add to cart
  const addToCart = () => {
    // In a real app, this would add the item to a cart state or context
    navigate(`/vendor/${vendorId}/menu`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Image */}
        <div className="w-full h-[300px] relative overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <button
              onClick={() => navigate(`/vendor/${vendorId}/menu`)}
              className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Item Basic Info */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
              <span className="font-bold text-green-600 text-xl">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center mt-2">
              <div className="flex items-center mr-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-medium">{item.rating}</span>
                <span className="text-gray-400 ml-1">({item.reviewCount})</span>
              </div>

              <div className="flex gap-1">
                {item.vegetarian && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Vegetarian
                  </Badge>
                )}
                {item.spicy && (
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    Spicy
                  </Badge>
                )}
                {item.popular && (
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200"
                  >
                    Popular
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-gray-600 mt-3">{item.description}</p>
          </div>

          {/* Tabs for Details, Nutrition, Reviews */}
          <Tabs defaultValue="customize" className="w-full mb-6">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4">
              <TabsTrigger
                value="customize"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Customize
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="nutrition"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2 text-base"
              >
                Nutrition
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customize" className="mt-0">
              <div className="space-y-6">
                {item.customizationOptions.map((optionGroup) => (
                  <div
                    key={optionGroup.id}
                    className="bg-white rounded-lg shadow-sm p-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">
                        {optionGroup.name}
                        {optionGroup.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </h3>
                      {optionGroup.multiSelect ? (
                        <span className="text-xs text-gray-500">
                          Select multiple
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">
                          Select one
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {optionGroup.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                          onClick={() =>
                            handleOptionSelect(
                              optionGroup.id,
                              option.id,
                              optionGroup.multiSelect,
                            )
                          }
                        >
                          <div className="flex items-center">
                            {optionGroup.multiSelect ? (
                              <div className="relative flex items-center mr-3">
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 opacity-0 absolute"
                                  checked={
                                    selectedOptions[optionGroup.id]?.includes(
                                      option.id,
                                    ) || false
                                  }
                                  readOnly
                                />
                                <div
                                  className={`h-5 w-5 rounded border ${selectedOptions[optionGroup.id]?.includes(option.id) ? "border-orange-500 bg-orange-500" : "border-gray-300"} flex items-center justify-center`}
                                >
                                  {selectedOptions[optionGroup.id]?.includes(
                                    option.id,
                                  ) && (
                                    <svg
                                      className="h-3 w-3 text-white"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="relative flex items-center mr-3">
                                <input
                                  type="radio"
                                  className="h-5 w-5 opacity-0 absolute"
                                  checked={
                                    selectedOptions[optionGroup.id]?.[0] ===
                                    option.id
                                  }
                                  readOnly
                                />
                                <div
                                  className={`h-5 w-5 rounded-full border ${selectedOptions[optionGroup.id]?.[0] === option.id ? "border-orange-500 bg-orange-500" : "border-gray-300"} flex items-center justify-center`}
                                >
                                  {selectedOptions[optionGroup.id]?.[0] ===
                                    option.id && (
                                    <div className="h-2 w-2 rounded-full bg-white"></div>
                                  )}
                                </div>
                              </div>
                            )}
                            <span>{option.name}</span>
                          </div>
                          {option.price > 0 && (
                            <span className="text-gray-600">
                              +${option.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Special Instructions */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold mb-3">Special Instructions</h3>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Add any special requests, allergies, or preferences here..."
                    rows={3}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {ingredient}
                    </Badge>
                  ))}
                </div>

                <h3 className="font-semibold mb-3">Allergens</h3>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((allergen, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200"
                    >
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-3">Nutritional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Calories</div>
                    <div className="font-bold text-lg">
                      {item.nutritionalInfo.calories} kcal
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Protein</div>
                    <div className="font-bold text-lg">
                      {item.nutritionalInfo.protein}g
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Carbohydrates</div>
                    <div className="font-bold text-lg">
                      {item.nutritionalInfo.carbs}g
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Fat</div>
                    <div className="font-bold text-lg">
                      {item.nutritionalInfo.fat}g
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <Info className="h-4 w-4 mr-2" />
                  <span>Daily values may vary based on individual needs</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Bottom Bar with Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-3 font-medium">{quantity}</span>
            <button
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              onClick={incrementQuantity}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <Button
            className="bg-orange-500 hover:bg-orange-600 flex-1 ml-4 py-6"
            onClick={addToCart}
          >
            Add to Cart - ${calculateTotalPrice()}
          </Button>
        </div>
      </div>

      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="md:hidden">
        <BottomNavBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ItemDetailScreen;
