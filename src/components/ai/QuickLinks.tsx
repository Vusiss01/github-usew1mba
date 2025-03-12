import React from "react";
import { Percent, Gift, Award, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickLink {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  path: string;
  onClick?: () => void;
}

interface QuickLinksProps {
  links?: QuickLink[];
  className?: string;
}

const QuickLinks = ({ links, className = "" }: QuickLinksProps) => {
  const navigate = useNavigate();

  const defaultLinks: QuickLink[] = [
    {
      id: "promos",
      title: "Promotions",
      icon: <Percent className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-600",
      path: "/promotions",
    },
    {
      id: "rewards",
      title: "Rewards",
      icon: <Gift className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-600",
      path: "/promotions#rewards",
    },
    {
      id: "top-rated",
      title: "Top Rated",
      icon: <Award className="h-5 w-5" />,
      color: "bg-yellow-100 text-yellow-600",
      path: "/top-rated",
    },
    {
      id: "cuisine",
      title: "Cuisines",
      icon: <Utensils className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
      path: "/cuisines",
    },
  ];

  const finalLinks = links || defaultLinks;

  const handleLinkClick = (link: QuickLink) => {
    if (link.onClick) {
      link.onClick();
    } else if (link.path) {
      navigate(link.path);
    }
  };

  return (
    <div className={`grid grid-cols-4 gap-3 ${className}`}>
      {finalLinks.map((link) => (
        <button
          key={link.id}
          className={`flex flex-col items-center justify-center p-3 rounded-lg ${link.color} transition-transform hover:scale-105`}
          onClick={() => handleLinkClick(link)}
        >
          {link.icon}
          <span className="mt-2 text-xs font-medium">{link.title}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickLinks;
