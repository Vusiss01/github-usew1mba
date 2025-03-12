import React from "react";
import { Home, ClipboardList, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BottomNavBarProps {
  className?: string;
}

// This component is no longer used as we've replaced it with NavigationTabs
const BottomNavBar = ({ className = "" }: BottomNavBarProps) => {
  return null;
};

export default BottomNavBar;
