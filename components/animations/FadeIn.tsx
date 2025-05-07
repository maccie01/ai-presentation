"use client";

import React, { RefObject } from 'react';
import { motion, MotionProps, Variants } from 'framer-motion';
import { fadeIn } from '@/lib/animations/variants';

// Define our own ViewportOptions type based on Framer Motion's actual types
interface ViewportOptions {
  once?: boolean;
  amount?: 'some' | 'all' | number;
  margin?: string;
  root?: RefObject<Element>;
}

interface FadeInProps extends Omit<MotionProps, 'viewport'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  viewport?: boolean | ViewportOptions;
  once?: boolean;
  amount?: number;
  custom?: any;
  variants?: Variants;
}

/**
 * FadeIn component for simple fade in animations
 */
const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  viewport = false,
  once = true,
  amount = 0.1,
  custom,
  variants = fadeIn,
  ...props
}) => {
  // Create a copy of the variants with custom duration and delay
  const customVariants: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        duration,
        delay,
        ease: 'easeInOut',
      },
    },
    exit: variants.exit,
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

export default FadeIn; 