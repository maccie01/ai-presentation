"use client";

import React, { RefObject } from 'react';
import { motion, Variants } from 'framer-motion';

// Define ViewportOptions type
interface ViewportOptions {
  once?: boolean;
  amount?: 'some' | 'all' | number;
  margin?: string;
  root?: RefObject<Element>;
}

// Only support div element for now to simplify types
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  viewport?: boolean | ViewportOptions;
  once?: boolean;
  amount?: number;
  direction?: 1 | -1; // 1 for forward staggering, -1 for reverse
  childrenClassName?: string;
  mode?: 'sync' | 'popIn' | 'trail';
  [key: string]: any; // Allow any other props to pass through
}

/**
 * Container component for creating staggered animations of children
 * 
 * Children should be direct descendants that accept Framer Motion props
 */
const StaggerContainer = ({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0.2,
  viewport = false,
  once = true,
  amount = 0.1,
  direction = 1,
  childrenClassName = '',
  mode = 'sync',
  ...props
}: StaggerContainerProps) => {
  // Create custom variants based on provided stagger timing
  const customVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
        staggerDirection: direction,
        when: mode === 'sync' ? 'beforeChildren' : 'afterChildren',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerDelay / 2, // Faster exit staggering
        staggerDirection: direction * -1, // Reverse the exit direction
        when: 'afterChildren',
      },
    },
  };

  // Child variants based on the selected mode
  const childVariants: Variants = React.useMemo(() => {
    switch (mode) {
      case 'popIn':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
              type: 'spring', 
              stiffness: 300,
              damping: 20
            } 
          },
          exit: { 
            opacity: 0, 
            scale: 0.8, 
            transition: { 
              duration: 0.2, 
              ease: 'easeIn' 
            } 
          },
        };
      case 'trail':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration: 0.4, 
              ease: 'easeOut' 
            } 
          },
          exit: { 
            opacity: 0, 
            y: 20, 
            transition: { 
              duration: 0.2, 
              ease: 'easeIn' 
            } 
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { 
              duration: 0.4 
            } 
          },
          exit: { 
            opacity: 0, 
            transition: { 
              duration: 0.2 
            } 
          },
        };
    }
  }, [mode]);

  // Handle viewport animation
  const viewportConfig = 
    viewport === true ? { once, amount } :
    viewport === false ? undefined :
    viewport;
    
  // We're simplifying by forcing all children to be direct descendants
  // of a wrapper div with variants applied at container level
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={customVariants}
      viewport={viewportConfig}
      {...props}
    >
      {/* Instead of trying to modify each child, we wrap them in a div with the className */}
      <div className={childrenClassName}>
        {/* We render the children as-is to avoid type issues */}
        {React.Children.map(children, (child) => {
          // Each child will inherit animation variants from the parent
          return child;
        })}
      </div>
    </motion.div>
  );
};

export default StaggerContainer; 