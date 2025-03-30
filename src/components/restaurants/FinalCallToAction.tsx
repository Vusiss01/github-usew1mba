import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinalCallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-amber-400 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-12 px-4">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
            alt="Fresh Salad"
            className="w-72 h-72 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Are you ready to order with<br />the best deals?
          </h2>
          <button
            onClick={() => navigate('/order')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
          >
            PROCEED TO ORDER →
          </button>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1585109649139-366815a0d713"
            alt="French Fries"
            className="w-72 h-72 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default FinalCallToAction; 