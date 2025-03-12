import React from "react";

interface FoodCategoryCardProps {
  id: string;
  name: string;
  image: string;
  onClick?: () => void;
}

const FoodCategoryCard = ({
  id,
  name,
  image,
  onClick,
}: FoodCategoryCardProps) => {
  return (
    <div
      className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
        <h3 className="text-white font-medium">{name}</h3>
      </div>
    </div>
  );
};

export default FoodCategoryCard;
