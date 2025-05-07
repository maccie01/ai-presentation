"use client";

import React, { RefObject } from 'react';
import { motion, MotionProps, Variants, useScroll, useTransform } from 'framer-motion';
import { fadeIn } from '@/lib/animations/variants';

// Define ViewportOptions type
interface ViewportOptions {
  once?: boolean;
  amount?: 'some' | 'all' | number;
  margin?: string;
  root?: RefObject<Element>;
}

type AnimationType = 'fade' | 'slide' | 'zoom' | 'parallax' | 'rotate' | 'custom';
type TriggerType = 'viewport' | 'scroll';

interface ScrollAnimationProps extends Omit<MotionProps, 'viewport'> {
  children: React.ReactNode;
  className?: string;
  type?: AnimationType;
  triggerType?: TriggerType;
  threshold?: number;
  once?: boolean;
  delay?: number;
  duration?: number;
  parallaxFactor?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  variants?: Variants;
  custom?: any;
}

/**
 * Component for triggering animations based on scroll position or viewport entry
 */
const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  type = 'fade',
  triggerType = 'viewport',
  threshold = 0.1,
  once = true,
  delay = 0,
  duration = 0.5,
  parallaxFactor = 0.3,
  direction = 'up',
  variants: customVariants,
  custom,
  ...props
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Define animation variants based on the selected type
  const getVariants = (): Variants => {
    if (customVariants) return customVariants;

    switch (type) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { duration, delay, ease: 'easeOut' } 
          },
        };
      case 'slide':
        return {
          hidden: { 
            opacity: 0, 
            x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
            y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
          },
          visible: { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            transition: { duration, delay, ease: 'easeOut' } 
          },
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration, delay, ease: 'easeOut' } 
          },
        };
      case 'rotate':
        return {
          hidden: { 
            opacity: 0, 
            rotate: direction === 'left' ? -5 : 5, 
            scale: 0.95 
          },
          visible: { 
            opacity: 1, 
            rotate: 0, 
            scale: 1, 
            transition: { duration, delay, ease: 'easeOut' } 
          },
        };
      default:
        return fadeIn;
    }
  };

  // Set up parallax effect if type is parallax
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    type === 'parallax' ? [100 * parallaxFactor, -100 * parallaxFactor] : [0, 0]
  );

  // Main animation style based on scroll progress
  const animationStyle = type === 'parallax' ? { y } : {};

  // Render based on trigger type
  if (triggerType === 'scroll') {
    return (
      <motion.div
        ref={containerRef}
        className={className}
        style={animationStyle}
        custom={custom}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  // Viewport-triggered animation
  return (
    <motion.div
      ref={containerRef}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={getVariants()}
      custom={custom}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation; 