"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PGrid, PGridItem } from '@/components/ui/PGrid';

interface SectionContentProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

const SectionContent: React.FC<SectionContentProps> = ({ 
  children, 
  columns = 1,
  className = '',
}) => {
  const getGridSize = (columns: number): 1 | 2 | 3 | 4 | 6 | 12 => {
    switch (columns) {
      case 1: return 12;
      case 2: return 6;
      case 3: return 4;
      default: return 12;
    }
  };

  return (
    <motion.div
      className={`max-w-6xl mx-auto px-4 mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <PGrid>
        {React.Children.map(children, (child, index) => (
          <PGridItem key={index} size={getGridSize(columns)} className="p-3">
            {child}
          </PGridItem>
        ))}
      </PGrid>
    </motion.div>
  );
};

export default SectionContent; 