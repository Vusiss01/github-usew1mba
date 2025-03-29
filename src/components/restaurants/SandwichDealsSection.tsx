import React from 'react';
import { useNavigate } from 'react-router-dom';

const SandwichDealsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm mb-8">
      <div className="flex flex-col md:flex-row">
        {/* Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gray-800">Best deals </span>
            <span className="text-amber-400">Crispy Sandwiches</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Enjoy the large size of sandwiches. Complete perfect slice of sandwiches.
          </p>
          <button
            onClick={() => navigate('/order')}
            className="bg-amber-400 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-500 transition-colors w-fit"
          >
            PROCEED TO ORDER →
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44"
            alt="Crispy Sandwiches"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SandwichDealsSection; 