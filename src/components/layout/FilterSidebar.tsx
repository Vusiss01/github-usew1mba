import React, { useState } from "react";
import { ChevronDown, ChevronUp, Tag, Award, Star } from "lucide-react";
import { Slider } from "../ui/slider";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: any) => void;
}

const FilterSidebar = ({
  isOpen,
  onClose,
  onFilterChange,
}: FilterSidebarProps) => {
  const [sortOption, setSortOption] = useState("recommended");
  const [showOffers, setShowOffers] = useState(false);
  const [showTopEats, setShowTopEats] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(6);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);

  // Collapsible sections
  const [sortOpen, setSortOpen] = useState(true);
  const [fromPostmatesOpen, setFromPostmatesOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(false);
  const [deliveryFeeOpen, setDeliveryFeeOpen] = useState(true);
  const [dietaryOpen, setDietaryOpen] = useState(false);

  const sortOptions: FilterOption[] = [
    { id: "recommended", label: "Recommended" },
    { id: "popular", label: "Most popular" },
    { id: "rating", label: "Rating" },
    { id: "earliest", label: "Earliest arrival" },
  ];

  const handleSortChange = (id: string) => {
    setSortOption(id);
    applyFilters({ sortBy: id });
  };

  const handleOffersChange = (checked: boolean) => {
    setShowOffers(checked);
    applyFilters({ offers: checked });
  };

  const handleTopEatsChange = (checked: boolean) => {
    setShowTopEats(checked);
    applyFilters({ topEats: checked });
  };

  const handleDeliveryFeeChange = (value: number) => {
    setDeliveryFee(value);
    applyFilters({ maxDeliveryFee: value });
  };

  const handleVegetarianChange = (checked: boolean) => {
    setIsVegetarian(checked);
    applyFilters({ vegetarian: checked });
  };

  const handleVeganChange = (checked: boolean) => {
    setIsVegan(checked);
    applyFilters({ vegan: checked });
  };

  const applyFilters = (filterUpdate: any) => {
    const filters = {
      sortBy: sortOption,
      offers: showOffers,
      topEats: showTopEats,
      maxDeliveryFee: deliveryFee,
      vegetarian: isVegetarian,
      vegan: isVegan,
      ...filterUpdate,
    };
    onFilterChange(filters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[320px] bg-white shadow-lg z-40 overflow-y-auto">
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-bold">All stores</h2>

        {/* Sort Section */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium mb-4"
            onClick={() => setSortOpen(!sortOpen)}
          >
            <span>Sort</span>
            {sortOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          {sortOpen && (
            <div className="space-y-3">
              {sortOptions.map((option) => (
                <label key={option.id} className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      className="h-5 w-5 opacity-0 absolute"
                      checked={sortOption === option.id}
                      onChange={() => handleSortChange(option.id)}
                    />
                    <div
                      className={`h-5 w-5 rounded-full border ${sortOption === option.id ? "border-black bg-black" : "border-gray-300"} flex items-center justify-center`}
                    >
                      {sortOption === option.id && (
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="ml-3">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* From Postmates Section */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium mb-4"
            onClick={() => setFromPostmatesOpen(!fromPostmatesOpen)}
          >
            <span>From Postmates</span>
            {fromPostmatesOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          {fromPostmatesOpen && (
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 mr-3" />
                  <span>Offers</span>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={showOffers}
                    onChange={(e) => handleOffersChange(e.target.checked)}
                    style={{
                      right: showOffers ? "0" : "4px",
                      transition: "right 0.2s",
                      borderColor: showOffers ? "#000" : "#ccc",
                      backgroundColor: showOffers ? "#000" : "#fff",
                    }}
                  />
                  <label
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    style={{ backgroundColor: showOffers ? "#ccc" : "#ccc" }}
                  ></label>
                </div>
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-3" />
                  <span>Top Eats</span>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={showTopEats}
                    onChange={(e) => handleTopEatsChange(e.target.checked)}
                    style={{
                      right: showTopEats ? "0" : "4px",
                      transition: "right 0.2s",
                      borderColor: showTopEats ? "#000" : "#ccc",
                      backgroundColor: showTopEats ? "#000" : "#fff",
                    }}
                  />
                  <label
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    style={{ backgroundColor: showTopEats ? "#ccc" : "#ccc" }}
                  ></label>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium mb-4"
            onClick={() => setPriceOpen(!priceOpen)}
          >
            <span>Price</span>
            {priceOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          {priceOpen && (
            <div className="space-y-3">
              {/* Price filters would go here */}
              <div className="flex space-x-4">
                <button className="border border-gray-300 rounded-full px-3 py-1 text-sm hover:border-black">
                  $
                </button>
                <button className="border border-gray-300 rounded-full px-3 py-1 text-sm hover:border-black">
                  $$
                </button>
                <button className="border border-gray-300 rounded-full px-3 py-1 text-sm hover:border-black">
                  $$$
                </button>
                <button className="border border-gray-300 rounded-full px-3 py-1 text-sm hover:border-black">
                  $$$$
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delivery Fee Section */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium mb-4"
            onClick={() => setDeliveryFeeOpen(!deliveryFeeOpen)}
          >
            <span>Delivery fee</span>
            {deliveryFeeOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          {deliveryFeeOpen && (
            <div className="space-y-6">
              <Slider
                defaultValue={[deliveryFee]}
                max={10}
                step={1}
                onValueChange={(value) => handleDeliveryFeeChange(value[0])}
              />
              <div className="flex justify-between text-sm">
                <span>$4</span>
                <span>$5</span>
                <span>$6</span>
                <span>${deliveryFee}+</span>
              </div>
            </div>
          )}
        </div>

        {/* Dietary Section */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium mb-4"
            onClick={() => setDietaryOpen(!dietaryOpen)}
          >
            <span>Dietary</span>
            {dietaryOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          {dietaryOpen && (
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
                  checked={isVegetarian}
                  onChange={(e) => handleVegetarianChange(e.target.checked)}
                />
                <span className="ml-3">Vegetarian</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
                  checked={isVegan}
                  onChange={(e) => handleVeganChange(e.target.checked)}
                />
                <span className="ml-3">Vegan</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
