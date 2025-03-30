import React from 'react';
import { useNavigate } from 'react-router-dom';

const SpicyPizzaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 md:px-6 mb-8">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-shadow duration-300 ease-in-out overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 p-6 md:p-8 space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="text-gray-800">Wanna eat hot</span><br />
                <span className="text-gray-800">& spicy </span>
                <span className="text-amber-500">Pizza?</span>
              </h2>
              <p className="mt-2 text-gray-600">
                Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals.
              </p>
            </div>
            <button
              onClick={() => navigate('/order')}
              className="bg-amber-400 hover:bg-amber-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
            >
              PROCEED TO ORDER →
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
              alt="Hot and Spicy Pizza"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpicyPizzaSection; 