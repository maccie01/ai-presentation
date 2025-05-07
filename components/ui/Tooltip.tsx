"use client";

import React, { useState, useRef, useEffect, ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import PText from '@/components/ui/PText';
import { useTheme } from '@/lib/themeContext';

interface TooltipProps {
  content: React.ReactNode;
  children: ReactElement<any, any>;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  maxWidth?: number;
  variant?: 'light' | 'dark' | 'auto';
  showArrow?: boolean;
  className?: string;
  contentClassName?: string;
  id?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
  maxWidth = 250,
  variant = 'auto',
  showArrow = true,
  className = '',
  contentClassName = '',
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const uniqueId = useRef(`tooltip-${id || Math.random().toString(36).substring(2, 9)}`);
  const { isDarkMode } = useTheme();
  
  // Use auto variant to select based on theme
  const effectiveVariant = variant === 'auto' 
    ? (isDarkMode ? 'dark' : 'light')
    : variant;

  // Ensure we're in a browser environment before attempting DOM operations
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const variantStyles = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-800',
      border: 'border border-gray-200',
      shadow: 'shadow-md',
      arrow: 'border-gray-200',
    },
    dark: {
      bg: isDarkMode ? 'bg-gray-900' : 'bg-gray-800',
      text: 'text-white',
      border: isDarkMode ? 'border border-gray-700' : '',
      shadow: 'shadow-lg',
      arrow: isDarkMode ? 'bg-gray-900' : 'bg-gray-800',
    },
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsVisible(false);
  };

  useEffect(() => {
    const calculatePosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = triggerRect.top + scrollY - tooltipRect.height - 10;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'right':
          top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.right + scrollX + 10;
          break;
        case 'bottom':
          top = triggerRect.bottom + scrollY + 10;
          left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'left':
          top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.left + scrollX - tooltipRect.width - 10;
          break;
      }

      // Keep tooltip within viewport bounds
      const padding = 10;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Horizontal bounds checking
      if (left + tooltipRect.width + padding > viewportWidth) {
        left = viewportWidth - tooltipRect.width - padding;
      }
      if (left < padding) {
        left = padding;
      }

      // Vertical bounds checking
      if (top + tooltipRect.height + padding > viewportHeight + scrollY) {
        top = viewportHeight + scrollY - tooltipRect.height - padding;
      }
      if (top < padding + scrollY) {
        top = padding + scrollY;
      }

      setTooltipPosition({ top, left });
    };

    if (isVisible) {
      // Use a small delay to ensure the tooltip is rendered before calculating position
      const positionTimer = setTimeout(calculatePosition, 0);
      return () => clearTimeout(positionTimer);
    }
  }, [isVisible, position]);

  // Add resize and scroll event listeners
  useEffect(() => {
    const handlePositionUpdate = () => {
      if (isVisible) {
        const positionTimer = setTimeout(() => {
          if (triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            if (
              triggerRect.top < 0 ||
              triggerRect.left < 0 ||
              triggerRect.right > window.innerWidth ||
              triggerRect.bottom > window.innerHeight
            ) {
              setIsVisible(false);
              return;
            }
          }
          setTooltipPosition(prev => ({ ...prev })); // Trigger re-render
        }, 50);
        return () => clearTimeout(positionTimer);
      }
    };

    window.addEventListener('resize', handlePositionUpdate);
    window.addEventListener('scroll', handlePositionUpdate, true);

    return () => {
      window.removeEventListener('resize', handlePositionUpdate);
      window.removeEventListener('scroll', handlePositionUpdate, true);
    };
  }, [isVisible]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Animation variants
  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.1 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.15 }
    }
  };

  // Get arrow positioning
  const getArrowStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45';
      case 'right':
        return 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45';
      case 'bottom':
        return 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45';
      case 'left':
        return 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45';
    }
  };

  // Enhance the child element with tooltip handling
  const childWithProps = React.cloneElement(children, {
    'aria-describedby': uniqueId.current,
    ref: (node: HTMLElement | null) => {
      // Save the node to our ref
      triggerRef.current = node;
      
      // If the child has a ref prop, forward the node to it
      const { ref } = children as any;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && typeof ref === 'object' && 'current' in ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouseEnter();
      // Forward the event to the original handler if it exists
      if (children.props.onMouseEnter) {
        children.props.onMouseEnter(e);
      }
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouseLeave();
      // Forward the event to the original handler if it exists
      if (children.props.onMouseLeave) {
        children.props.onMouseLeave(e);
      }
    },
    onFocus: (e: React.FocusEvent) => {
      handleMouseEnter();
      // Forward the event to the original handler if it exists
      if (children.props.onFocus) {
        children.props.onFocus(e);
      }
    },
    onBlur: (e: React.FocusEvent) => {
      handleMouseLeave();
      // Forward the event to the original handler if it exists
      if (children.props.onBlur) {
        children.props.onBlur(e);
      }
    },
  });

  // Combine content and arrow into the tooltip
  const tooltipContent = (
    <motion.div
      ref={tooltipRef}
      id={uniqueId.current}
      className={`
        pointer-events-none absolute z-50 px-3 py-2 rounded-md text-sm
        ${variantStyles[effectiveVariant].bg}
        ${variantStyles[effectiveVariant].text}
        ${variantStyles[effectiveVariant].border}
        ${variantStyles[effectiveVariant].shadow}
        ${contentClassName}
      `}
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        maxWidth: maxWidth,
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={tooltipVariants}
      role="tooltip"
    >
      {typeof content === 'string' ? <PText size="small">{content}</PText> : content}
      
      {showArrow && (
        <span
          className={`absolute w-2 h-2 
            ${variantStyles[effectiveVariant].bg} 
            ${variantStyles[effectiveVariant].border} 
            ${getArrowStyles()}
          `}
        />
      )}
    </motion.div>
  );

  return (
    <>
      {childWithProps}
      
      {isMounted && isVisible && createPortal(
        <AnimatePresence>{tooltipContent}</AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Tooltip; 