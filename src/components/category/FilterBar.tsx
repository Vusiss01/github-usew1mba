import React from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Toggle } from "../ui/toggle";

interface FilterBarProps {
  onFilterChange?: (filters: FilterOptions) => void;
  activeFilters?: string[];
}

interface FilterOptions {
  sortBy?: string;
  priceRange?: [number, number];
  dietary?: string[];
  rating?: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange = () => {},
  activeFilters = [],
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterOptions>({
    sortBy: "popularity",
    priceRange: [0, 50],
    dietary: [],
    rating: 0,
  });

  const dietaryOptions = [
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Vegan", value: "vegan" },
    { label: "Gluten Free", value: "gluten-free" },
    { label: "Dairy Free", value: "dairy-free" },
  ];

  const handleSortChange = (value: string) => {
    const newFilters = { ...filters, sortBy: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: [number, number]) => {
    const newFilters = { ...filters, priceRange: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDietaryToggle = (value: string) => {
    const newDietary = filters.dietary?.includes(value)
      ? filters.dietary.filter((item) => item !== value)
      : [...(filters.dietary || []), value];

    const newFilters = { ...filters, dietary: newDietary };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full bg-white shadow-sm py-3 px-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search items..."
              className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-[200px] md:w-[300px]"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Sort dropdown */}
          <div className="hidden md:block">
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active filters */}
          <div className="hidden md:flex items-center space-x-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="px-3 py-1">
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filter button */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleExpand}
          className="flex items-center gap-1"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </Button>
      </div>

      {/* Expanded filter options */}
      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-3 border-t">
          {/* Price range */}
          <div>
            <h3 className="font-medium text-sm mb-3">Price Range</h3>
            <Slider
              defaultValue={[0, 50]}
              max={100}
              step={1}
              onValueChange={(value) =>
                handlePriceChange(value as [number, number])
              }
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${filters.priceRange?.[0]}</span>
              <span>${filters.priceRange?.[1]}</span>
            </div>
          </div>

          {/* Dietary preferences */}
          <div>
            <h3 className="font-medium text-sm mb-3">Dietary Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => (
                <Toggle
                  key={option.value}
                  pressed={filters.dietary?.includes(option.value)}
                  onPressedChange={() => handleDietaryToggle(option.value)}
                  variant="outline"
                  size="sm"
                >
                  {option.label}
                </Toggle>
              ))}
            </div>
          </div>

          {/* Rating filter */}
          <div>
            <h3 className="font-medium text-sm mb-3">Minimum Rating</h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant={filters.rating >= star ? "default" : "outline"}
                  size="sm"
                  className="w-10 h-10 p-0"
                  onClick={() => {
                    const newFilters = { ...filters, rating: star };
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                >
                  {star}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
