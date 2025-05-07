"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/lib/themeContext';

interface PinchZoomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  minScale?: number;
  maxScale?: number;
  className?: string;
  imageClassName?: string;
  containerClassName?: string;
  showResetButton?: boolean;
  resetButtonClassName?: string;
  resetButtonText?: string;
  showZoomIndicator?: boolean;
  onZoomChange?: (scale: number) => void;
}

/**
 * PinchZoomImage component for pinch and drag zoom functionality
 */
const PinchZoomImage: React.FC<PinchZoomImageProps> = ({
  src,
  alt,
  width,
  height,
  minScale = 1,
  maxScale = 3,
  className = '',
  imageClassName = '',
  containerClassName = '',
  showResetButton = true,
  resetButtonClassName = '',
  resetButtonText = 'Reset Zoom',
  showZoomIndicator = true,
  onZoomChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Motion values for tracking transformation
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Track distance between fingers for pinch detection
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(null);
  
  // Control for programmatic animations
  const controls = useAnimation();
  
  // Transform for zoom indicator
  const zoomPercentage = useTransform(scale, [minScale, maxScale], [0, 100]);
  
  // State to track if the image is currently being interacted with
  const [isInteracting, setIsInteracting] = useState(false);
  
  // Ensure component only runs client-side to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Notify parent component about zoom changes
  useEffect(() => {
    if (onZoomChange) {
      const unsubscribe = scale.onChange((value) => {
        onZoomChange(value);
      });
      
      return () => unsubscribe();
    }
  }, [scale, onZoomChange]);
  
  // Handle drag constraints based on scale
  const calculateDragConstraints = (currentScale: number) => {
    if (!containerRef.current) return { top: 0, right: 0, bottom: 0, left: 0 };
    
    const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
    
    // Calculate the size of the image based on scale
    const scaledWidth = containerWidth * currentScale;
    const scaledHeight = containerHeight * currentScale;
    
    // Calculate the maximum distance the image can be dragged
    const dragLimitX = Math.max(0, (scaledWidth - containerWidth) / 2);
    const dragLimitY = Math.max(0, (scaledHeight - containerHeight) / 2);
    
    return {
      top: -dragLimitY,
      right: dragLimitX,
      bottom: dragLimitY,
      left: -dragLimitX,
    };
  };
  
  // Reset zoom and position
  const resetZoom = () => {
    controls.start({
      scale: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
  };
  
  // Calculate distance between two touch points
  const getDistanceBetweenTouches = (touches: React.TouchList): number => {
    if (touches.length < 2) return 0;
    
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  // Handle touch start to detect pinch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setTouchStartDistance(getDistanceBetweenTouches(e.touches));
    }
  };
  
  // Handle touch move for pinch zoom
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 2 || touchStartDistance === null) return;
    
    const currentDistance = getDistanceBetweenTouches(e.touches);
    const distanceRatio = currentDistance / touchStartDistance;
    
    // Apply the scale change, but constrain it within min and max bounds
    const currentScale = scale.get();
    const newScale = Math.min(maxScale, Math.max(minScale, currentScale * distanceRatio));
    
    // Set the new scale
    scale.set(newScale);
    
    // Update the start distance for the next move event
    setTouchStartDistance(currentDistance);
    
    // Recalculate drag constraints based on new scale
    const constraints = calculateDragConstraints(newScale);
    
    // Ensure the current position is within the new constraints
    const currentX = x.get();
    const currentY = y.get();
    
    x.set(Math.min(constraints.right, Math.max(constraints.left, currentX)));
    y.set(Math.min(constraints.bottom, Math.max(constraints.top, currentY)));
  };
  
  // Handle touch end for pinch gesture
  const handleTouchEnd = () => {
    setTouchStartDistance(null);
    
    // Apply same constraints as handleInteractionEnd
    handleInteractionEnd();
  };
  
  // Handle start of interaction
  const handleInteractionStart = () => {
    setIsInteracting(true);
  };
  
  // Handle end of interaction
  const handleInteractionEnd = () => {
    setIsInteracting(false);
    
    // Get the current scale
    const currentScale = scale.get();
    
    // If scale is less than minimum, reset to minimum
    if (currentScale < minScale) {
      controls.start({
        scale: minScale,
        transition: { type: 'spring', stiffness: 300, damping: 25 },
      });
    }
    
    // If scale is greater than maximum, reset to maximum
    if (currentScale > maxScale) {
      controls.start({
        scale: maxScale,
        transition: { type: 'spring', stiffness: 300, damping: 25 },
      });
    }
    
    // Recalculate constraints based on final scale
    const constraints = calculateDragConstraints(scale.get());
    
    // Get current position
    const currentX = x.get();
    const currentY = y.get();
    
    // If the current position is outside constraints, animate back to valid area
    if (
      currentX < constraints.left ||
      currentX > constraints.right ||
      currentY < constraints.top ||
      currentY > constraints.bottom
    ) {
      controls.start({
        x: Math.min(constraints.right, Math.max(constraints.left, currentX)),
        y: Math.min(constraints.bottom, Math.max(constraints.top, currentY)),
        transition: { type: 'spring', stiffness: 300, damping: 25 },
      });
    }
  };
  
  // Don't render anything on the server
  if (!isClient) {
    return <div className={className}></div>;
  }
  
  return (
    <div className={`relative ${className}`}>
      <div 
        ref={containerRef} 
        className={`overflow-hidden relative ${containerClassName}`}
        style={{ touchAction: 'none' }}
      >
        <motion.div
          drag
          dragElastic={0.1}
          dragTransition={{ power: 0.5, timeConstant: 200 }}
          dragConstraints={calculateDragConstraints(scale.get())}
          onDragStart={handleInteractionStart}
          onDragEnd={handleInteractionEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ x, y, scale }}
          animate={controls}
          whileTap={{ cursor: 'grabbing' }}
          className="cursor-grab"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`pointer-events-none ${imageClassName}`}
            draggable={false}
          />
        </motion.div>
      </div>
      
      {showZoomIndicator && (
        <div 
          className="absolute top-4 right-4 rounded-full px-3 py-1 text-sm shadow-md"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.75)' : 'rgba(255, 255, 255, 0.8)',
            color: isDarkMode ? 'rgba(229, 231, 235, 0.9)' : 'rgba(31, 41, 55, 0.9)',
            border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.5)'}`
          }}
        >
          {Math.round(zoomPercentage.get())}%
        </div>
      )}
      
      {showResetButton && scale.get() > 1.05 && (
        <button
          onClick={resetZoom}
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md transition-opacity ${resetButtonClassName}`}
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.75)' : 'rgba(255, 255, 255, 0.8)',
            color: isDarkMode ? 'rgba(229, 231, 235, 0.9)' : 'rgba(31, 41, 55, 0.9)',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.5)'}`
          }}
        >
          {resetButtonText}
        </button>
      )}
    </div>
  );
};

export default PinchZoomImage; 