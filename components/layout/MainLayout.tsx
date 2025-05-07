"use client";

import React from 'react';
import { useTheme } from '@/lib/themeContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div 
      className="min-h-screen flex flex-col" 
      style={{ 
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)'
      }}
    >
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 