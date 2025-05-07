"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import PText from '@/components/ui/PText';
import PHeading from '@/components/ui/PHeading';
import { useTheme } from '@/lib/themeContext';

interface MediaContainerProps {
  src: string;
  alt: string;
  type?: 'image' | 'video';
  width?: number;
  height?: number;
  caption?: string;
  title?: string;
  className?: string;
  fullWidth?: boolean;
  clickToExpand?: boolean;
}

const MediaContainer: React.FC<MediaContainerProps> = ({
  src,
  alt,
  type = 'image',
  width = 800,
  height = 450,
  caption,
  title,
  className = '',
  fullWidth = false,
  clickToExpand = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleExpand = () => {
    if (clickToExpand) {
      setExpanded(!expanded);
    }
  };

  const containerStyle = {
    borderColor: 'var(--border-color)',
    backgroundColor: 'var(--card-bg)',
  };

  const renderMedia = () => {
    if (type === 'video') {
      return (
        <video
          src={src}
          controls
          width={width}
          height={height}
          className="w-full h-auto rounded"
        >
          <track kind="captions" src="" label={alt} />
          Your browser does not support the video tag.
        </video>
      );
    }
    
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto rounded"
      />
    );
  };

  return (
    <div 
      className={`overflow-hidden rounded-lg border ${className} ${fullWidth ? 'w-full' : 'max-w-lg mx-auto'} ${clickToExpand ? 'cursor-pointer' : ''}`}
      style={containerStyle}
      onClick={toggleExpand}
    >
      {expanded ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-w-screen-xl">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              className="absolute -top-10 right-0 text-white p-2 hover:bg-gray-700/50 rounded-full"
              aria-label="Close expanded view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18"></path>
                <path d="M6 6L18 18"></path>
              </svg>
            </button>
            {renderMedia()}
            {caption && (
              <PText size="small" className="text-white mt-2 text-center">
                {caption}
              </PText>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-hidden">
            {renderMedia()}
          </div>
          
          {(title || caption) && (
            <div className="p-4">
              {title && (
                <PHeading tag="h4" size="small" className="mb-1">
                  {title}
                </PHeading>
              )}
              {caption && (
                <PText size="small" className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {caption}
                </PText>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MediaContainer; 