"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PButton from '@/components/ui/PButton';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import PIcon from '@/components/ui/PIcon';
import { useTheme } from '@/lib/themeContext';

interface PromptTemplate {
  name: string;
  template: string;
  description?: string;
  parameters?: string[]; // Define required parameters for this template
}

interface PromptParameter {
  name: string;
  defaultValue: string;
  description?: string;
}

interface FloatingPromptBuilderProps {
  templates?: PromptTemplate[];
  parameters?: PromptParameter[];
}

// Simplified preset configurations
const PRESETS = {
  quarter: (windowWidth: number) => ({ 
    width: Math.floor(windowWidth * 0.25), 
    height: 650,
    x: windowWidth - Math.floor(windowWidth * 0.25) - 20,
    y: 20
  }),
  half: (windowWidth: number) => ({ 
    width: Math.floor(windowWidth * 0.5), 
    height: 650,
    x: windowWidth - Math.floor(windowWidth * 0.5) - 20,
    y: 20
  })
};

const FloatingPromptBuilder: React.FC<FloatingPromptBuilderProps> = ({
  templates = [],
  parameters = [],
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(
    templates.length > 0 ? templates[0] : null
  );
  const [prompt, setPrompt] = useState<string>(selectedTemplate?.template || '');
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [processedPrompt, setProcessedPrompt] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: window.innerWidth - 550 - 20, y: 20 });
  const [size, setSize] = useState({ width: 550, height: 650 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [promptParameters, setPromptParameters] = useState<string[]>([]);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  // Extract parameters from prompt template using regex
  const extractParametersFromPrompt = (promptText: string): string[] => {
    const regex = /\{\{\s*([^{}]+)\s*\}\}/g;
    const matches = [...promptText.matchAll(regex)];
    const params = matches.map(match => match[1].trim());
    return [...new Set(params)]; // Remove duplicates
  };

  // Client-side only code
  useEffect(() => {
    setMounted(true);
    
    // Set initial position and size
    const savedPosition = localStorage.getItem('promptBuilderPosition');
    const savedSize = localStorage.getItem('promptBuilderSize');
    
    if (savedPosition) {
      try {
        setPosition(JSON.parse(savedPosition));
      } catch (e) {
        console.error('Failed to parse saved position');
      }
    }
    
    if (savedSize) {
      try {
        setSize(JSON.parse(savedSize));
      } catch (e) {
        console.error('Failed to parse saved size');
      }
    }
    
    return () => {
      if (position) {
        localStorage.setItem('promptBuilderPosition', JSON.stringify(position));
      }
      if (size) {
        localStorage.setItem('promptBuilderSize', JSON.stringify(size));
      }
    };
  }, []);

  // Extract parameters when prompt changes
  useEffect(() => {
    if (prompt) {
      // Extract parameters from the prompt template
      const extractedParams = extractParametersFromPrompt(prompt);
      setPromptParameters(extractedParams);
      
      // Initialize any new parameters with default values
      const newParamValues = { ...paramValues };
      extractedParams.forEach(paramName => {
        if (!newParamValues[paramName]) {
          const param = parameters.find(p => p.name === paramName);
          newParamValues[paramName] = param?.defaultValue || '';
        }
      });
      setParamValues(newParamValues);
    }
  }, [prompt, parameters]);

  // Update prompt when template changes
  useEffect(() => {
    if (selectedTemplate) {
      setPrompt(selectedTemplate.template);
    }
  }, [selectedTemplate]);

  // Auto-resize textareas
  useEffect(() => {
    // Resize main prompt textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    
    // Resize parameter textareas
    Object.keys(textareaRefs.current).forEach(key => {
      const textarea = textareaRefs.current[key];
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [prompt, paramValues]);

  // Process the prompt with parameters
  useEffect(() => {
    let processed = prompt;
    Object.entries(paramValues).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
      processed = processed.replace(regex, value);
    });
    setProcessedPrompt(processed);
  }, [prompt, paramValues]);

  // Add animation styles for copy feedback
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; }
      }
      .animate-fade-in-out {
        animation: fadeInOut 2s forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Handle window resize to keep the component on screen
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 100),
        y: Math.min(prev.y, window.innerHeight - 100)
      }));
      setSize(prev => ({
        width: Math.min(prev.width, window.innerWidth - position.x - 20),
        height: Math.min(prev.height, window.innerHeight - position.y - 20)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateName = e.target.value;
    const template = templates.find(t => t.name === templateName) || null;
    setSelectedTemplate(template);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleParamChange = (name: string, value: string) => {
    setParamValues(prev => ({ ...prev, [name]: value }));
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(processedPrompt);
    showCopyFeedback("Prompt copied!");
  };

  const handleCopyRawPrompt = () => {
    navigator.clipboard.writeText(prompt);
    showCopyFeedback("Template copied!");
  };

  const handleReset = () => {
    if (selectedTemplate) {
      setPrompt(selectedTemplate.template);
    } else {
      setPrompt('');
    }
    
    // Reset parameters to default values
    const initialValues: Record<string, string> = {};
    parameters.forEach(param => {
      initialValues[param.name] = param.defaultValue;
    });
    setParamValues(initialValues);
    setCopyFeedback(null);
  };

  const handleClearParameters = () => {
    // Clear all parameter values but keep the prompt as is
    const clearedValues: Record<string, string> = {};
    Object.keys(paramValues).forEach(key => {
      clearedValues[key] = '';
    });
    setParamValues(clearedValues);
    showCopyFeedback("Parameters cleared");
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      // Restore previous size and position
      const savedPosition = localStorage.getItem('promptBuilderPosition');
      const savedSize = localStorage.getItem('promptBuilderSize');
      
      if (savedPosition) {
        try {
          setPosition(JSON.parse(savedPosition));
        } catch (e) {
          setPosition({ x: 20, y: 20 });
        }
      }
      
      if (savedSize) {
        try {
          setSize(JSON.parse(savedSize));
        } catch (e) {
          setSize({ width: 550, height: 650 });
        }
      }
    } else {
      // Save current size and position before going fullscreen
      localStorage.setItem('promptBuilderPosition', JSON.stringify(position));
      localStorage.setItem('promptBuilderSize', JSON.stringify(size));
      
      // Go fullscreen
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    
    setIsFullScreen(!isFullScreen);
  };

  // Toggle open/close state
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Use appropriate colors based on theme
  const { isDarkMode } = useTheme();

  // Apply preset sizes and positions
  const applyPreset = (preset: 'quarter' | 'half') => {
    const presetConfig = PRESETS[preset](window.innerWidth);
    setSize({ width: presetConfig.width, height: presetConfig.height });
    setPosition({ x: presetConfig.x, y: presetConfig.y });
    localStorage.setItem('promptBuilderSize', JSON.stringify({ width: presetConfig.width, height: presetConfig.height }));
    localStorage.setItem('promptBuilderPosition', JSON.stringify({ x: presetConfig.x, y: presetConfig.y }));
  };

  // Handle dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start drag if we're clicking on the handle
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      e.preventDefault();
    }
  };

  // Handle resizing functionality
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragStart.y));
      
      setPosition({
        x: newX,
        y: newY
      });
    }
    
    if (isResizing) {
      // Ensure minimum dimensions and maximum based on window size
      const newWidth = Math.max(300, Math.min(window.innerWidth - position.x - 20, resizeStart.width + (e.clientX - resizeStart.x)));
      const newHeight = Math.max(400, Math.min(window.innerHeight - position.y - 20, resizeStart.height + (e.clientY - resizeStart.y)));
      
      setSize({
        width: newWidth,
        height: newHeight
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      localStorage.setItem('promptBuilderPosition', JSON.stringify(position));
    }
    
    if (isResizing) {
      setIsResizing(false);
      localStorage.setItem('promptBuilderSize', JSON.stringify(size));
    }
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    // Fix for resizing: ensure mouse events are properly removed
    const cleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    return cleanup;
  }, [isDragging, isResizing, position, size, resizeStart, dragStart]);

  // Close the builder
  const handleClose = () => {
    setIsOpen(false);
  };

  // Load isOpen state from localStorage
  useEffect(() => {
    const savedIsOpen = localStorage.getItem('promptBuilderOpen');
    if (savedIsOpen !== null) {
      setIsOpen(savedIsOpen === 'true');
    }
  }, []);

  // Render nothing on the server
  if (!mounted) return null;

  // Only show parameters that are needed by the current prompt
  const relevantParameters = parameters.filter(param => 
    promptParameters.includes(param.name)
  );

  const floatingButton = (
    <motion.div 
      className="fixed bottom-4 right-4 z-50"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={toggleOpen}
        className="p-3 rounded-full shadow-lg flex items-center justify-center"
        style={{
          backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
          color: 'white'
        }}
        aria-label={isOpen ? "Close prompt builder" : "Open prompt builder"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
        </svg>
      </button>
    </motion.div>
  );

  return mounted ? createPortal(
    <>
      {floatingButton}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50"
            style={{
              top: position.y,
              left: position.x,
              width: size.width,
              height: size.height,
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 0.8)'}`,
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseDown={handleMouseDown}
          >
            <div 
              className="p-3 drag-handle cursor-grab flex justify-between items-center"
              style={{
                backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6',
                borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                color: isDarkMode ? 'white' : 'black'
              }}
            >
              <div className="font-semibold">Prompt Builder</div>
              <div className="flex items-center space-x-3">
                {/* Preset buttons */}
                <button
                  onClick={() => applyPreset('quarter')}
                  className="hover:opacity-80 focus:outline-none tooltip-container"
                  style={{ color: 'currentColor' }}
                  aria-label="Quarter width"
                  title="Quarter width"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="12" y="6" width="6" height="12" rx="1" strokeWidth="2" />
                  </svg>
                </button>
                <button
                  onClick={() => applyPreset('half')}
                  className="hover:opacity-80 focus:outline-none tooltip-container"
                  style={{ color: 'currentColor' }}
                  aria-label="Half width"
                  title="Half width"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="8" y="6" width="10" height="12" rx="1" strokeWidth="2" />
                  </svg>
                </button>

                {/* Full screen toggle button */}
                <button
                  onClick={toggleFullScreen}
                  className="hover:opacity-80 focus:outline-none tooltip-container"
                  style={{ color: 'currentColor' }}
                  aria-label={isFullScreen ? "Exit full screen" : "Full screen"}
                  title={isFullScreen ? "Exit full screen" : "Full screen"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                      isFullScreen 
                        ? "M9 9H4v-1h5V3h1v5h5v1h-5v5H9V9z" 
                        : "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m14-10l-5 5M3 16l5-5"
                    } />
                  </svg>
                </button>
                
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="hover:opacity-80 focus:outline-none tooltip-container"
                  style={{ color: 'currentColor' }}
                  aria-label="Close"
                  title="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div 
              className="flex-grow overflow-auto relative"
              style={{ backgroundColor: isDarkMode ? 'var(--background)' : 'white' }}
            >
              <div className="p-4">
                <div className="flex flex-col space-y-4">
                
                  {/* Template selection */}
                  {templates.length > 0 && (
                    <div>
                      <label 
                        className="block mb-1 font-medium text-sm"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Template:
                      </label>
                      <select
                        className="w-full p-2 border rounded"
                        style={{ 
                          borderColor: 'var(--border-color)', 
                          backgroundColor: 'var(--card-bg)', 
                          color: 'var(--foreground)' 
                        }}
                        value={selectedTemplate?.name || ''}
                        onChange={handleTemplateChange}
                      >
                        {templates.map(template => (
                          <option key={template.name} value={template.name}>
                            {template.name}
                          </option>
                        ))}
                      </select>
                      {selectedTemplate?.description && (
                        <p 
                          className="mt-1 text-sm"
                          style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
                        >
                          {selectedTemplate.description}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Prompt template */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label 
                        className="block font-medium text-sm"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Prompt Template:
                      </label>
                      <button
                        onClick={handleCopyRawPrompt}
                        className="p-1 rounded-full hover:opacity-80"
                        style={{ color: 'var(--foreground)' }}
                        title="Copy Template"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <textarea
                      ref={textareaRef}
                      className="w-full min-h-[100px] border rounded p-2 font-mono text-sm"
                      style={{ 
                        borderColor: 'var(--border-color)', 
                        backgroundColor: 'var(--card-bg)', 
                        color: 'var(--foreground)' 
                      }}
                      value={prompt}
                      onChange={handlePromptChange}
                      placeholder="Enter your prompt template here..."
                    />
                  </div>
                  
                  {/* Parameters */}
                  {promptParameters.length > 0 && (
                    <div>
                      <label 
                        className="block mb-1 font-medium text-sm"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Parameters:
                      </label>
                      <div 
                        className="border rounded p-3 space-y-3"
                        style={{ 
                          borderColor: 'var(--border-color)', 
                          backgroundColor: 'var(--card-bg)'
                        }}
                      >
                        {promptParameters.map(paramName => {
                          const param = parameters.find(p => p.name === paramName);
                          return (
                            <div key={paramName}>
                              <div className="flex justify-between items-center mb-1">
                                <label 
                                  className="text-sm font-medium"
                                  style={{ color: 'var(--foreground)' }}
                                >
                                  <span 
                                    className="px-1 rounded font-mono text-xs"
                                    style={{ 
                                      backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.3)' : '#dbeafe',
                                      color: isDarkMode ? '#000000' : '#1e40af' 
                                    }}
                                  >
                                    {`{{${paramName}}}`}
                                  </span>
                                  {param?.description && (
                                    <span 
                                      className="ml-2 text-xs font-normal"
                                      style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
                                    >
                                      {param.description}
                                    </span>
                                  )}
                                </label>
                              </div>
                              <textarea
                                ref={el => {
                                  textareaRefs.current[paramName] = el;
                                }}
                                className="w-full border rounded p-2 text-sm font-mono min-h-[60px]"
                                style={{ 
                                  borderColor: 'var(--border-color)', 
                                  backgroundColor: isDarkMode ? '#111827' : '#ffffff',
                                  color: 'var(--foreground)' 
                                }}
                                value={paramValues[paramName] || ''}
                                onChange={e => handleParamChange(paramName, e.target.value)}
                                placeholder={`Value for ${paramName}...`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Preview */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label 
                        className="block font-medium text-sm"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Processed Prompt:
                      </label>
                      <button
                        onClick={handleCopyPrompt}
                        className="p-1 rounded-full hover:opacity-80"
                        style={{ color: 'var(--foreground)' }}
                        title="Copy Processed Prompt"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div 
                      className="border rounded p-2 min-h-[100px] font-mono text-sm whitespace-pre-wrap"
                      style={{ 
                        borderColor: 'var(--border-color)', 
                        backgroundColor: 'var(--card-bg)', 
                        color: 'var(--foreground)' 
                      }}
                    >
                      {processedPrompt || <span style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>Preview will appear here...</span>}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleCopyPrompt}
                      className="px-3 py-1 rounded text-sm font-medium flex items-center"
                      style={{ 
                        backgroundColor: isDarkMode ? '#1e40af' : '#2563eb',
                        color: 'white' 
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy
                    </button>
                    <button
                      onClick={handleClearParameters}
                      className="px-3 py-1 rounded text-sm font-medium"
                      style={{ 
                        backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                        color: isDarkMode ? '#d1d5db' : '#4b5563',
                        border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`
                      }}
                    >
                      Clear Parameters
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-3 py-1 rounded text-sm font-medium"
                      style={{ 
                        backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                        color: isDarkMode ? '#d1d5db' : '#4b5563',
                        border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`
                      }}
                    >
                      Reset
                    </button>
                    
                    {copyFeedback && (
                      <div 
                        className="px-2 py-1 rounded-full text-xs flex items-center animate-fade-in-out ml-auto"
                        style={{ 
                          backgroundColor: isDarkMode ? 'rgba(6, 78, 59, 0.8)' : 'rgba(209, 250, 229, 0.8)',
                          color: isDarkMode ? '#34d399' : '#065f46' 
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {copyFeedback}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resize handle */}
            {!isFullScreen && (
              <div
                className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize"
                onMouseDown={handleResizeMouseDown}
                style={{ 
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  opacity: 0.5 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h16v-2H4v2zm0-3h16v-2H4v2zm0-3h16v-2H4v2z" />
                </svg>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {(isDragging || isResizing) && (
        <div 
          className="fixed inset-0 z-40 cursor-grabbing"
          onMouseMove={(e: React.MouseEvent) => handleMouseMove(e.nativeEvent)}
          onMouseUp={handleMouseUp}
        />
      )}
    </>,
    document.body
  ) : null;
};

export default FloatingPromptBuilder; 