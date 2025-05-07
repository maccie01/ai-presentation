"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getThemeClass } from './porscheDesignSystem';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check for system preference initially, default to light
  const [theme, setTheme] = useState<Theme>('light');
  
  useEffect(() => {
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);
  
  // Update body class when theme changes
  useEffect(() => {
    document.body.className = getThemeClass(theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        isDarkMode: theme === 'dark' 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 