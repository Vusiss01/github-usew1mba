import React, { useState } from "react";
import { MapPin, Navigation, Compass } from "lucide-react";
import { Button } from "../ui/button";

interface MapViewProps {
  className?: string;
  height?: string;
}

const MapView = ({ className = "", height = "h-[200px]" }: MapViewProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLocateMe = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div
      className={`relative ${height} rounded-xl overflow-hidden ${className}`}
    >
      {/* Map placeholder - in a real app this would be a map component */}
      <div className="absolute inset-0 bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
          alt="Map"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Map overlay with vendor pins */}
      <div className="absolute inset-0">
        {/* Vendor pins */}
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="h-8 w-8 text-orange-500 fill-orange-100" />
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs font-medium">
              Burgers & Co.
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="h-8 w-8 text-orange-500 fill-orange-100" />
        </div>

        <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="h-8 w-8 text-orange-500 fill-orange-100" />
        </div>

        {/* User location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white"></div>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-2 w-2 bg-blue-500 rotate-45"></div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-white shadow-md"
          onClick={handleLocateMe}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Navigation className="h-4 w-4 text-blue-500" />
          )}
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-white shadow-md"
        >
          <Compass className="h-4 w-4" />
        </Button>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-1 right-1 text-[10px] text-gray-600 bg-white/80 px-1 rounded">
        Map data © OpenStreetMap contributors
      </div>
    </div>
  );
};

export default MapView;
