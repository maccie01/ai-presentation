"use client";

import React from 'react';
import { HiZoomIn, HiZoomOut, HiOutlineRefresh } from 'react-icons/hi';
import { MdFullscreen } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa';

export interface DiagramControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitView?: () => void;
  onReset?: () => void;
  onExport?: () => void;
  className?: string;
  showExport?: boolean;
  direction?: 'horizontal' | 'vertical';
}

const DiagramControls: React.FC<DiagramControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onFitView,
  onReset,
  onExport,
  className = '',
  showExport = true,
  direction = 'vertical'
}) => {
  const containerClasses = `flex ${direction === 'vertical' ? 'flex-col' : 'flex-row'} bg-white rounded-md shadow-md ${className}`;
  const buttonClasses = 'p-2 hover:bg-gray-100 transition-colors duration-150 flex items-center justify-center';
  const dividerClasses = direction === 'vertical' ? 'border-t border-gray-200' : 'border-l border-gray-200';

  return (
    <div className={containerClasses}>
      <button 
        className={buttonClasses}
        onClick={onZoomIn}
        aria-label="Zoom in"
        title="Zoom in"
      >
        <HiZoomIn className="w-5 h-5" />
      </button>
      
      <div className={dividerClasses} />
      
      <button 
        className={buttonClasses}
        onClick={onZoomOut}
        aria-label="Zoom out"
        title="Zoom out"
      >
        <HiZoomOut className="w-5 h-5" />
      </button>
      
      <div className={dividerClasses} />
      
      <button 
        className={buttonClasses}
        onClick={onFitView}
        aria-label="Fit to view"
        title="Fit to view"
      >
        <MdFullscreen className="w-5 h-5" />
      </button>
      
      <div className={dividerClasses} />
      
      <button 
        className={buttonClasses}
        onClick={onReset}
        aria-label="Reset view"
        title="Reset view"
      >
        <HiOutlineRefresh className="w-5 h-5" />
      </button>
      
      {showExport && onExport && (
        <>
          <div className={dividerClasses} />
          <button 
            className={buttonClasses}
            onClick={onExport}
            aria-label="Export diagram"
            title="Export diagram"
          >
            <FaDownload className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default DiagramControls; 