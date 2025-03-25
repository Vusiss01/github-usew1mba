import React, { createContext, useContext, useState } from 'react';

// Create a context to manage sidebar state globally
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: (forceState?: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggleSidebar: () => {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = (forceState?: boolean) => {
    setIsOpen(forceState !== undefined ? forceState : !isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
