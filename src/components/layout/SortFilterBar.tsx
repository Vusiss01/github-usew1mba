import React from "react";
import { ChevronDown } from "lucide-react";

interface SortOption {
  id: string;
  label: string;
}

interface SortFilterBarProps {
  activeSort: string;
  options: SortOption[];
  onSortChange: (id: string) => void;
}

const SortFilterBar = ({
  activeSort,
  options,
  onSortChange,
}: SortFilterBarProps) => {
  return (
    <div className="flex items-center py-3 border-b border-gray-200">
      <h3 className="text-lg font-semibold mr-4">All stores</h3>
      <div className="relative">
        <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
          <span>Sort</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>
        <div className="absolute left-0 top-full mt-1 bg-white shadow-md rounded-md py-1 z-10 hidden">
          {options.map((option) => (
            <button
              key={option.id}
              className={`block w-full text-left px-4 py-2 text-sm ${activeSort === option.id ? "bg-gray-100 font-medium" : ""}`}
              onClick={() => onSortChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortFilterBar;
