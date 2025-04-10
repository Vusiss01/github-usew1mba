import React from "react";
import { motion } from "framer-motion";
import { useSidebar } from "./SidebarContext";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = "", variant = 'default' }) => {
  const { toggleSidebar } = useSidebar();
  const [isHovered, setIsHovered] = React.useState(false);
  const navigate = useNavigate();

  const textColor = variant === 'white' ? 'text-white' : 'text-gray-900 dark:text-white';
  const dotColor = variant === 'white' ? 'text-white/30' : 'text-orange-500/30';
  const byteGradient = variant === 'white' ? 'from-white to-white/90' : 'from-orange-500 to-orange-600';
  const pulseColor = variant === 'white' ? 'bg-white' : 'bg-orange-500';
  const underlineGradient = variant === 'white' ? 'from-white to-white/90' : 'from-orange-500 to-orange-600';

  const handleMouseEnter = () => {
    setIsHovered(true);
    toggleSidebar(true);
  };

  return (
    <motion.div 
      className={`flex items-center ${className} relative cursor-pointer select-none will-change-transform`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate('/splash')}
      style={{ transform: 'translateZ(0)' }}
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
          className={`absolute -top-1 -right-3 w-2 h-2 ${pulseColor} rounded-full will-change-transform`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transform: 'translateZ(0)' }}
        />
      </h1>
      <motion.div
        className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r ${underlineGradient} will-change-transform`}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transform: 'translateZ(0)' }}
      />
    </motion.div>
  );
};

export default Logo; 