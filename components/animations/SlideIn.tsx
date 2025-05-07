"use client";

import React, { RefObject } from 'react';
import { motion, MotionProps, Variants } from 'framer-motion';
import { 
  slideInLeft, 
  slideInRight, 
  slideInTop, 
  slideInBottom 
} from '@/lib/animations/variants';

// Define ViewportOptions type
interface ViewportOptions {
  once?: boolean;
  amount?: 'some' | 'all' | number;
  margin?: string;
  root?: RefObject<Element>;
}

type SlideDirection = 'left' | 'right' | 'top' | 'bottom';

interface SlideInProps extends Omit<MotionProps, 'viewport'> {
  children: React.ReactNode;
  className?: string;
  direction?: SlideDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  viewport?: boolean | ViewportOptions;
  once?: boolean;
  amount?: number;
  custom?: any;
}

/**
 * SlideIn component for slide-in animations from different directions
 */
const SlideIn: React.FC<SlideInProps> = ({
  children,
  className = '',
  direction = 'left',
  delay = 0,
  duration = 0.5,
  distance = 50,
  viewport = false,
  once = true,
  amount = 0.1,
  custom,
  ...props
}) => {
  // Select the appropriate variant based on direction
  const getBaseVariant = (): Variants => {
    switch (direction) {
      case 'right': return slideInRight;
      case 'top': return slideInTop;
      case 'bottom': return slideInBottom;
      case 'left':
      default: return slideInLeft;
    }
  };
  
  // Get the base variant and customize it with the provided distance
  const baseVariant = getBaseVariant();
  
  // Create custom variants with the specified distance, duration, and delay
  const customVariants: Variants = {
    hidden: {
      ...baseVariant.hidden,
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'top' ? -distance : direction === 'bottom' ? distance : 0,
    },
    visible: {
      ...baseVariant.visible,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
    exit: {
      ...baseVariant.exit,
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'top' ? -distance : direction === 'bottom' ? distance : 0,
      transition: {
        duration: duration * 0.6, // Exit slightly faster than entrance
        ease: 'easeIn',
      },
    },
  };

  // Handle viewport animation
  const viewportConfig = 
    viewport === true ? { once, amount } :
    viewport === false ? undefined :
    viewport;

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={customVariants}
      viewport={viewportConfig}
      custom={custom}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn; 