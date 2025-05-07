"use client";

import React from 'react';
import { PGrid as PDSGrid, PGridItem as PDSGridItem } from '@porsche-design-system/components-react';

interface PGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  colsSm?: number;
  colsMd?: number;
  colsLg?: number;
  colsXl?: number;
  gap?: number;
}

interface PGridItemProps {
  children: React.ReactNode;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}

const PGrid: React.FC<PGridProps> = ({ 
  children, 
  className = '',
  cols,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap
}) => {
  // Convert grid props to PDS format
  const gridProps: any = {};
  
  if (cols !== undefined) gridProps.cols = cols;
  if (colsSm !== undefined) gridProps['cols-sm'] = colsSm;
  if (colsMd !== undefined) gridProps['cols-md'] = colsMd;
  if (colsLg !== undefined) gridProps['cols-lg'] = colsLg;
  if (colsXl !== undefined) gridProps['cols-xl'] = colsXl;
  if (gap !== undefined) gridProps.gap = gap;
  
  return <PDSGrid className={className} {...gridProps}>{children}</PDSGrid>;
};

const PGridItem: React.FC<PGridItemProps> = ({
  children,
  size = 12,
  className = '',
}) => {
  return (
    <PDSGridItem size={size} className={className}>
      {children}
    </PDSGridItem>
  );
};

export { PGrid, PGridItem }; 