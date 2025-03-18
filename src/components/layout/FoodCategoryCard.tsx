import React from "react";
import { useNavigate } from 'react-router-dom';

interface FoodCategoryCardProps {
  id: string;
  name: string;
  image: string;
}

const FoodCategoryCard = ({ id, name, image }: FoodCategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-40 rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/category/${id}`)}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
    </div>
  );
};

export default FoodCategoryCard;
