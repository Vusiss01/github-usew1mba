import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

interface StoreCardProps {
  id: string;
  name: string;
  image: string;
  deliveryTime?: string;
  openTime?: string;
}

const StoreCard = ({
  id,
  name,
  image,
  deliveryTime,
  openTime,
}: StoreCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex-shrink-0 w-48 bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-100"
      onClick={() => navigate(`/vendor/${id}`)}
    >
      <div className="relative h-32">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate">{name}</h3>
        {deliveryTime ? (
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{deliveryTime}</span>
          </div>
        ) : (
          <div className="text-sm text-gray-500 mt-1">{openTime}</div>
        )}
      </div>
    </div>
  );
};

export default StoreCard;
