import React from 'react';
import { useNavigate } from 'react-router-dom';

const SandwichDealsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-shadow duration-300 ease-in-out overflow-hidden">
        <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-8">
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                <span>Best deals </span>
                <span className="text-amber-500">Crispy Sandwiches</span>
              </h2>
              <p className="mt-2 text-gray-600">
                Enjoy the large size of sandwiches. Complete perfect slice of sandwiches.
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
              src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af"
              alt="Crispy Sandwiches"
              className="w-full h-[300px] object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandwichDealsSection; 