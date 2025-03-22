import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSidebar } from './SidebarContext';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = "", variant = 'default' }) => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleClick = () => {
    navigate('/');
  };

  const textColor = variant === 'white' ? 'text-white' : 'text-gray-900 dark:text-white';
  const dotColor = variant === 'white' ? 'text-white/30' : 'text-orange-500/30';
  const byteGradient = variant === 'white' ? 'from-white to-white/90' : 'from-orange-500 to-orange-600';
  const underlineColor = variant === 'white' ? 'bg-white' : 'bg-orange-500';
  const pulseColor = variant === 'white' ? 'bg-white' : 'bg-orange-500';

  return (
    <motion.div 
      className={`flex items-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group cursor-pointer"
        onClick={handleClick}
        onMouseEnter={toggleSidebar}
      >
        <h1 className="flex items-center space-x-1">
          <span className={`text-2xl font-light tracking-tight ${textColor} relative`}>
            <span className="relative">
              b<span className={dotColor}>.</span>
            </span>
            <span className="relative">izi</span>
          </span>
          <span className={`text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${byteGradient}`}>
            byte
          </span>
          <motion.div 
            className={`absolute -top-1 -right-3 w-2 h-2 ${pulseColor} rounded-full`}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </h1>
        <div className={`h-[2px] w-0 group-hover:w-full ${underlineColor} transition-all duration-300 ease-out`} />
      </motion.div>
    </motion.div>
  );
};

export default Logo; 