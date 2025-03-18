import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

interface TrendingItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  prepTime: string;
  tags: string[];
  isNew?: boolean;
}

const trendingItems: TrendingItem[] = [
  {
    id: "spicy-ramen",
    name: "Spicy Ramen Bowl",
    image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.8,
    prepTime: "20-30 min",
    tags: ["Japanese", "Spicy"],
    isNew: true
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.5,
    prepTime: "15-25 min",
    tags: ["Breakfast", "Healthy"]
  },
  {
    id: "acai-bowl",
    name: "Acai Bowl",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.7,
    prepTime: "15-20 min",
    tags: ["Healthy", "Breakfast"],
    isNew: true
  },
  {
    id: "truffle-pasta",
    name: "Truffle Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    prepTime: "25-35 min",
    tags: ["Italian", "Gourmet"]
  }
];

const TrendingSection: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <section className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          Trending Now
          <svg className="w-5 h-5 ml-2 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 7L17 11L13 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trendingItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-100"
            onClick={() => navigate(`/trending/${item.id}`)}
          >
            <div className="relative h-40">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.isNew && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  New
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-sm font-medium">{item.rating}</span>
                <span className="mx-2 text-gray-300">•</span>
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500 ml-1">{item.prepTime}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
