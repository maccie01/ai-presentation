"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PButton from '@/components/ui/PButton';

interface EmbeddedPresentationProps {
  presentationId?: string;
  width?: string;
  height?: string;
}

const EmbeddedPresentation: React.FC<EmbeddedPresentationProps> = ({
  presentationId = "Yjr8Lr",
  width = "100%",
  height = "525px"
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const presentationRef = useRef<HTMLDivElement>(null);
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    // If fullscreen, prevent body scrolling
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  // Set loaded state after iframe loads
  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-4 right-4 z-10">
              <PButton 
                variant="secondary"
                onClick={toggleFullscreen}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
              >
                Exit Fullscreen
              </PButton>
            </div>
            <div className="w-full h-full max-w-none p-4">
              <iframe 
                src={`https://app.presentations.ai/view/${presentationId}`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="clipboard-write autoplay"
                allowFullScreen={true}
                scrolling="no"
                onLoad={handleIframeLoad}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center">
        <div
          ref={presentationRef}
          style={{
            width,
            height: isFullscreen ? '0' : height,
            maxWidth: '700px',
            margin: 'auto',
            display: 'block',
            position: 'relative',
            border: '2px solid #dee1e5',
            borderRadius: '3px',
            overflow: 'hidden',
            transition: 'height 0.3s ease'
          }}
        >
          {!isFullscreen && (
            <>
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              <iframe
                src={`https://app.presentations.ai/view/${presentationId}`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="clipboard-write autoplay"
                allowFullScreen={true}
                scrolling="no"
                onLoad={handleIframeLoad}
              />
            </>
          )}
        </div>
        
        <div className="mt-4">
          <PButton 
            variant="primary" 
            onClick={toggleFullscreen}
            className="px-8 py-2"
          >
            Start Presentation
          </PButton>
        </div>
      </div>
    </>
  );
};

export default EmbeddedPresentation; 