"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PText from '@/components/ui/PText';
import { useTheme } from '@/lib/themeContext';

interface NavigationItem {
  name: string;
  path: string;
}

const navigationItems: NavigationItem[] = [
  { name: 'KI-Überblick', path: '/ki-uberblick' },
  { name: 'High-Level Prompting', path: '/high-level-prompting' },
  { name: 'Kontextwahl', path: '/kontextwahl' },
  { name: 'Memory-Prompts', path: '/memory-prompts' },
  { name: 'Automotive-Beispiele', path: '/automotive-beispiele' },
  { name: 'Microsoft Office KI', path: '/power-platform' },
  { name: 'MCP-Server', path: '/mcp-server' },
  { name: 'Ausblick & Trends', path: '/ausblick-trends' },
  { name: 'Ressourcen', path: '/ressourcen' },
];

const NavigationBar: React.FC = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const { isDarkMode } = useTheme();
  
  // Find current index for progress calculation
  const currentIndex = navigationItems.findIndex(item => item.path === pathname);
  
  useEffect(() => {
    if (currentIndex !== -1) {
      const progressPercentage = ((currentIndex + 1) / navigationItems.length) * 100;
      setProgress(progressPercentage);
    } else {
      setProgress(0);
    }
  }, [pathname, currentIndex]);

  return (
    <nav 
      className="sticky top-0 z-10 border-b py-3 px-4" 
      style={{ 
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="container mx-auto">
        <div className="flex items-center overflow-x-auto pb-2">
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.path;
            const isPast = currentIndex > index;
            
            let bgColor, textColor;
            
            if (isActive) {
              bgColor = isDarkMode ? '#3b82f6' : '#2563eb'; // blue-500 : blue-600
              textColor = 'white';
            } else if (isPast) {
              bgColor = isDarkMode ? '#4b5563' : '#d1d5db'; // gray-600 : gray-300
              textColor = isDarkMode ? '#e5e7eb' : '#374151'; // gray-200 : gray-700
            } else {
              bgColor = isDarkMode ? '#374151' : '#f3f4f6'; // gray-700 : gray-100
              textColor = isDarkMode ? '#9ca3af' : '#6b7280'; // gray-400 : gray-500
            }
            
            return (
              <Link 
                key={index}
                href={item.path}
                className="flex-shrink-0 mx-3 first:ml-0 last:mr-0"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className="rounded-full w-8 h-8 flex items-center justify-center mb-1"
                    style={{ 
                      backgroundColor: bgColor,
                      color: textColor
                    }}
                  >
                    {index + 1}
                  </div>
                  <PText 
                    size="small"
                    className="whitespace-nowrap"
                    style={{ 
                      color: isActive 
                        ? (isDarkMode ? '#60a5fa' : '#2563eb') // blue-400 : blue-600
                        : isPast 
                          ? (isDarkMode ? '#e5e7eb' : '#374151') // gray-200 : gray-700
                          : (isDarkMode ? '#9ca3af' : '#6b7280'), // gray-400 : gray-500
                      fontWeight: isActive ? 600 : 400
                    }}
                  >
                    {item.name}
                  </PText>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Progress bar */}
        <div 
          className="h-1 mt-2" 
          style={{ backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb' }}
        >
          <div 
            className="h-full transition-all duration-500"
            style={{ 
              width: `${progress}%`,
              backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb' // blue-500 : blue-600
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar; 