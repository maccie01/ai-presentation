"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface SwipeNavigationProps {
  children: React.ReactNode;
  className?: string;
  nextPath?: string;
  prevPath?: string;
  onNext?: () => void;
  onPrev?: () => void;
  threshold?: number;
  disableNext?: boolean;
  disablePrev?: boolean;
  showIndicators?: boolean;
  indicatorsPosition?: 'top' | 'bottom' | 'left' | 'right';
  indicatorsClass?: string;
}

/**
 * SwipeNavigation component for swipe-based navigation between pages
 * 
 * Allows users to swipe left/right to navigate pages with visual feedback
 */
const SwipeNavigation: React.FC<SwipeNavigationProps> = ({
  children,
  className = '',
  nextPath,
  prevPath,
  onNext,
  onPrev,
  threshold = 100, // Minimum swipe distance to trigger navigation
  disableNext = false,
  disablePrev = false,
  showIndicators = true,
  indicatorsPosition = 'bottom',
  indicatorsClass = '',
}) => {
  const router = useRouter();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Track if user is currently swiping
  const [isSwiping, setIsSwiping] = useState(false);
  
  // Ensure component only runs client-side to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsSwiping(false);
    
    // Calculate drag distance on x-axis
    const { offset } = info;
    
    // Reset position with spring animation
    controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
    
    // Handle navigation based on swipe distance and direction
    if (offset.x > threshold && !disablePrev) {
      // Swiped right (go to previous)
      if (prevPath) {
        router.push(prevPath);
      }
      if (onPrev) {
        onPrev();
      }
    } else if (offset.x < -threshold && !disableNext) {
      // Swiped left (go to next)
      if (nextPath) {
        router.push(nextPath);
      }
      if (onNext) {
        onNext();
      }
    }
  };
  
  // Update styles during drag to provide visual feedback
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Only update x position if not disabled in the swipe direction
    if ((info.offset.x > 0 && !disablePrev) || (info.offset.x < 0 && !disableNext)) {
      // Apply resistance factor at edges to make it feel more natural
      const resistance = 0.4;
      const xValue = info.offset.x * resistance;
      controls.set({ x: xValue });
    }
  };
  
  const handleDragStart = () => {
    setIsSwiping(true);
  };
  
  // Build swipe indicators based on position
  const renderIndicators = () => {
    if (!showIndicators) return null;
    
    // Determine classes based on position
    const getIndicatorClasses = () => {
      const baseClasses = `absolute flex space-x-2 ${indicatorsClass}`;
      
      switch (indicatorsPosition) {
        case 'top': return `${baseClasses} top-4 left-1/2 transform -translate-x-1/2`;
        case 'bottom': return `${baseClasses} bottom-4 left-1/2 transform -translate-x-1/2`;
        case 'left': return `${baseClasses} left-4 top-1/2 transform -translate-y-1/2 flex-col space-x-0 space-y-2`;
        case 'right': return `${baseClasses} right-4 top-1/2 transform -translate-y-1/2 flex-col space-x-0 space-y-2`;
        default: return baseClasses;
      }
    };
    
    // Create indicator elements
    return (
      <div className={getIndicatorClasses()}>
        {!disablePrev && (
          <div className={`h-1 w-8 rounded-full bg-gray-300 ${isSwiping ? 'opacity-100' : 'opacity-50'}`} />
        )}
        {!disableNext && (
          <div className={`h-1 w-8 rounded-full bg-gray-300 ${isSwiping ? 'opacity-100' : 'opacity-50'}`} />
        )}
      </div>
    );
  };
  
  if (!isClient) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <div className={`relative overflow-hidden ${className}`} ref={containerRef}>
      <motion.div
        drag="x"
        dragConstraints={containerRef}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        animate={controls}
        className="w-full h-full"
        dragElastic={0.1} // Slight elasticity for better feel
      >
        {children}
      </motion.div>
      
      {renderIndicators()}
    </div>
  );
};

export default SwipeNavigation; 