import React from "react";
import { Clock } from "lucide-react";

interface StoreCardProps {
  id: string;
  name: string;
  image: string;
  deliveryTime?: string;
  openTime?: string;
  onClick?: () => void;
}

const StoreCard = ({
  id,
  name,
  image,
  deliveryTime,
  openTime,
  onClick,
}: StoreCardProps) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-2 text-sm font-medium text-center">{name}</h3>
      {deliveryTime ? (
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Clock className="h-3 w-3 mr-1" />
          <span>{deliveryTime}</span>
        </div>
      ) : (
        <div className="text-xs text-gray-500 mt-1">{openTime}</div>
      )}
    </div>
  );
};

export default StoreCard;
