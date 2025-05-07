"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import PButton from '@/components/ui/PButton';
import PIcon from '@/components/ui/PIcon';
import { useTheme } from '@/lib/themeContext';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode | string;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  collapsible?: boolean;
  initiallyExpanded?: boolean;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  icon,
  variant = 'default',
  collapsible = false,
  initiallyExpanded = true,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const { isDarkMode } = useTheme();

  // Variant styling based on theme
  const variantStyles = {
    default: {
      header: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200',
      border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
      icon: isDarkMode ? 'text-gray-300' : 'text-gray-500',
      bg: 'var(--card-bg)',
    },
    info: {
      header: isDarkMode ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-200',
      border: isDarkMode ? 'border-blue-800' : 'border-blue-200',
      icon: isDarkMode ? 'text-blue-300' : 'text-blue-600',
      bg: 'var(--card-bg)',
    },
    success: {
      header: isDarkMode ? 'bg-green-900 border-green-800' : 'bg-green-50 border-green-200',
      border: isDarkMode ? 'border-green-800' : 'border-green-200',
      icon: isDarkMode ? 'text-green-300' : 'text-green-600',
      bg: 'var(--card-bg)',
    },
    warning: {
      header: isDarkMode ? 'bg-yellow-900 border-yellow-800' : 'bg-yellow-50 border-yellow-200',
      border: isDarkMode ? 'border-yellow-800' : 'border-yellow-200',
      icon: isDarkMode ? 'text-yellow-300' : 'text-yellow-600',
      bg: 'var(--card-bg)',
    },
    error: {
      header: isDarkMode ? 'bg-red-900 border-red-800' : 'bg-red-50 border-red-200',
      border: isDarkMode ? 'border-red-800' : 'border-red-200',
      icon: isDarkMode ? 'text-red-300' : 'text-red-600',
      bg: 'var(--card-bg)',
    },
  };

  const toggleExpanded = () => {
    if (collapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  // Get icon element based on variant or provided icon
  const getIconElement = () => {
    // If icon is a string, try to use PIcon
    if (typeof icon === 'string') {
      if (['shield', 'chart', 'document', 'copy'].includes(icon)) {
        return <PIcon name={icon as 'shield' | 'chart' | 'document' | 'copy'} className="h-6 w-6" />;
      }
    }
    
    // If icon is a React node, return it
    if (icon && typeof icon !== 'string') {
      return icon;
    }

    // Default icons for variants
    switch (variant) {
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <motion.div 
      className={`border rounded-lg overflow-hidden shadow-sm ${variantStyles[variant].border} ${className}`}
      style={{ backgroundColor: variantStyles[variant].bg }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className={`flex items-center p-4 ${variantStyles[variant].header} border-b ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={toggleExpanded}
      >
        <div className={`mr-3 ${variantStyles[variant].icon}`}>
          {getIconElement()}
        </div>

        <PHeading tag="h3" size="medium" className="flex-grow">
          {title}
        </PHeading>

        {collapsible && (
          <button className={`ml-2 ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'} focus:outline-none`}>
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}
      </div>

      <AnimatePresence>
        {(!collapsible || isExpanded) && (
          <motion.div
            className="p-4"
            style={{ color: 'var(--foreground)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InfoCard; 