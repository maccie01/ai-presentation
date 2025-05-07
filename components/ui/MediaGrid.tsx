"use client";

import React from 'react';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import MediaContainer from '@/components/ui/MediaContainer';

interface MediaItem {
  src: string;
  alt: string;
  type?: 'image' | 'video';
  width?: number;
  height?: number;
  caption?: string;
  title?: string;
}

interface MediaGridProps {
  items: MediaItem[];
  columns?: 1 | 2 | 3 | 4;
  spacing?: 'small' | 'medium' | 'large';
  clickToExpand?: boolean;
  className?: string;
}

const MediaGrid: React.FC<MediaGridProps> = ({
  items,
  columns = 2,
  spacing = 'medium',
  clickToExpand = true,
  className = '',
}) => {
  if (!items || items.length === 0) return null;
  
  const getGridSize = (columns: number): 1 | 2 | 3 | 4 | 6 | 12 => {
    switch (columns) {
      case 1: return 12;
      case 2: return 6;
      case 3: return 4;
      case 4: return 3;
      default: return 6;
    }
  };
  
  const getSpacingClass = (spacing: string): string => {
    switch (spacing) {
      case 'small': return 'p-1';
      case 'large': return 'p-4';
      case 'medium':
      default: return 'p-2';
    }
  };
  
  const spacingClass = getSpacingClass(spacing);
  
  return (
    <div className={`w-full ${className}`}>
      <PGrid>
        {items.map((item, index) => (
          <PGridItem key={index} size={getGridSize(columns)} className={spacingClass}>
            <MediaContainer
              src={item.src}
              alt={item.alt}
              type={item.type}
              width={item.width}
              height={item.height}
              caption={item.caption}
              title={item.title}
              clickToExpand={clickToExpand}
              fullWidth
            />
          </PGridItem>
        ))}
      </PGrid>
    </div>
  );
};

export default MediaGrid; 