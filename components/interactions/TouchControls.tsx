"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TouchControlOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  activeColor?: string;
  disabled?: boolean;
}

interface TouchControlsProps {
  options: TouchControlOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  gap?: number;
  iconOnly?: boolean;
  showLabels?: boolean;
  hapticFeedback?: boolean;
  swipeable?: boolean;
  mobileOptimized?: boolean;
}

/**
 * Touch-friendly controls optimized for mobile interactions
 */
const TouchControls: React.FC<TouchControlsProps> = ({
  options,
  value,
  onChange,
  className = '',
  orientation = 'horizontal',
  size = 'medium',
  gap = 4,
  iconOnly = false,
  showLabels = true,
  hapticFeedback = true,
  swipeable = false,
  mobileOptimized = true,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(value);
  const [startX, setStartX] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Sync internal state with external value
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);
  
  // Ensure component only runs client-side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Handle option selection
  const handleOptionClick = (optionId: string, disabled: boolean | undefined) => {
    if (disabled) return;
    
    setSelectedOption(optionId);
    
    if (onChange) {
      onChange(optionId);
    }
    
    // Provide haptic feedback if supported
    if (hapticFeedback && isClient && navigator.vibrate) {
      navigator.vibrate(10); // Short vibration for feedback
    }
  };
  
  // Determine control size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return iconOnly 
          ? 'h-8 w-8 text-sm' 
          : 'h-8 px-3 text-xs';
      case 'large':
        return iconOnly 
          ? 'h-14 w-14 text-xl' 
          : 'h-14 px-6 text-base';
      case 'medium':
      default:
        return iconOnly 
          ? 'h-12 w-12 text-lg' 
          : 'h-12 px-5 text-sm';
    }
  };
  
  // Get container classes based on orientation
  const getContainerClasses = () => {
    return orientation === 'horizontal'
      ? `flex flex-row`
      : `flex flex-col`;
  };
  
  // Handle swipe gestures if enabled
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swipeable) return;
    
    const touch = e.touches[0];
    setStartX(orientation === 'horizontal' ? touch.clientX : touch.clientY);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!swipeable || startX === null) return;
    
    const touch = e.changedTouches[0];
    const endX = orientation === 'horizontal' ? touch.clientX : touch.clientY;
    const diff = endX - startX;
    
    // If the swipe is significant enough (40px), change the selection
    if (Math.abs(diff) > 40) {
      const currentIndex = options.findIndex(opt => opt.id === selectedOption);
      if (currentIndex !== -1) {
        const direction = diff > 0 ? -1 : 1; // -1 for prev, 1 for next
        const newIndex = currentIndex + direction;
        
        // Make sure the new index is within bounds
        if (newIndex >= 0 && newIndex < options.length) {
          const newOption = options[newIndex];
          if (!newOption.disabled) {
            handleOptionClick(newOption.id, newOption.disabled);
          }
        }
      }
    }
    
    setStartX(null);
  };
  
  if (!isClient) {
    return null;
  }
  
  return (
    <div 
      className={`
        ${getContainerClasses()} 
        ${orientation === 'horizontal' ? `gap-${gap}` : `gap-y-${gap}`}
        ${className}
      `}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {options.map((option) => {
        const isSelected = option.id === selectedOption;
        
        return (
          <motion.button
            key={option.id}
            className={`
              flex items-center justify-center 
              rounded-full font-medium 
              ${getSizeClasses()}
              ${mobileOptimized ? 'touch-manipulation' : ''}
              ${isSelected 
                ? `${option.activeColor || 'bg-blue-500 text-white'}` 
                : `${option.color || 'bg-gray-100 text-gray-700'}`
              }
              ${option.disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-opacity-90 active:bg-opacity-100'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-300
              transition-all duration-200
            `}
            whileTap={!option.disabled ? { scale: 0.95 } : undefined}
            onClick={() => handleOptionClick(option.id, option.disabled)}
            disabled={option.disabled}
            aria-pressed={isSelected}
          >
            {option.icon && (
              <span className={showLabels && !iconOnly ? 'mr-2' : ''}>{option.icon}</span>
            )}
            {(showLabels && !iconOnly) && (
              <span>{option.label}</span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default TouchControls; 