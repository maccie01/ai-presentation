"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { useTheme } from '@/lib/themeContext';

interface InteractiveAreaProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  initialFocus?: boolean;
  tabIndex?: number;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

const InteractiveArea: React.FC<InteractiveAreaProps> = ({
  children,
  title,
  description,
  className = '',
  initialFocus = false,
  tabIndex = 0,
  ariaLabel,
  ariaLabelledBy,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleId = ariaLabelledBy || (title ? 'interactive-area-title' : undefined);
  const { isDarkMode } = useTheme();

  // Focus management - set initial focus when component mounts
  useEffect(() => {
    if (initialFocus && containerRef.current) {
      containerRef.current.focus();
    }
  }, [initialFocus]);

  // Trap focus within the interactive area when tabbing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        // If shift+tab and focus is on first element, move to last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        
        // If tab and focus is on last element, move to first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
      
      // Allow escape key to blur the container
      if (e.key === 'Escape') {
        containerRef.current?.blur();
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <motion.div
      className={`max-w-6xl mx-auto px-4 mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <PHeading 
              tag="h3" 
              size="large" 
              className="mb-2" 
              id={titleId}
            >
              {title}
            </PHeading>
          )}
          {description && (
            <PText className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              {description}
            </PText>
          )}
        </div>
      )}
      
      <div 
        ref={containerRef}
        className="border rounded-lg p-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)'
        }}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        aria-labelledby={titleId}
        role="region"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default InteractiveArea; 