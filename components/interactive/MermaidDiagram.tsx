"use client";

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import PButton from '@/components/ui/PButton';
import { useTheme } from '@/lib/themeContext';

interface MermaidDiagramProps {
  title?: string;
  description?: string;
  diagramDefinition: string;
  editable?: boolean;
  height?: string;
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
}

// Initialize mermaid only once at component level
if (typeof window !== 'undefined') {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'sans-serif',
  });
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  title,
  description,
  diagramDefinition,
  editable = false,
  height = 'auto',
  theme: propTheme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [diagram, setDiagram] = useState(diagramDefinition);
  const [error, setError] = useState<string | null>(null);
  const [renderKey, setRenderKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Use the provided theme or default to dark/default based on the app theme
  const theme = propTheme || (isDarkMode ? 'dark' : 'default');

  // Handle diagram render
  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === 'undefined') return;

    const renderDiagram = async () => {
      try {
        setError(null);
        setIsLoading(true);
        
        // Clear previous content
        containerRef.current!.innerHTML = '';
        
        // Create a new div for the diagram
        const diagramContainer = document.createElement('div');
        diagramContainer.className = 'mermaid';
        diagramContainer.textContent = diagram;
        containerRef.current!.appendChild(diagramContainer);
        
        // Apply theme
        mermaid.initialize({
          startOnLoad: false,
          theme: theme,
          securityLevel: 'loose',
          fontFamily: 'sans-serif',
          maxTextSize: 10000,
        });
        
        // Render the diagram
        await mermaid.run();
        setIsLoading(false);
      } catch (err: any) {
        console.error("Mermaid error:", err);
        setError(err.toString());
        setIsLoading(false);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="color: #e53e3e; padding: 0.75rem; background-color: ${isDarkMode ? '#2D3748' : '#FFF5F5'}; border-radius: 0.375rem; border: 1px solid ${isDarkMode ? '#4A5568' : '#FED7D7'}">
              <strong>Error rendering diagram:</strong> ${err.message || 'Unknown error'}
            </div>
          `;
        }
      }
    };

    // Add a small delay to ensure the DOM is ready
    const timer = setTimeout(() => {
      renderDiagram().catch(err => {
        console.error("Unhandled promise rejection in MermaidDiagram:", err);
        setIsLoading(false);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [diagram, theme, renderKey, isDarkMode]);

  // Handle diagram update for editable diagrams
  const handleUpdateDiagram = () => {
    if (textareaRef.current) {
      setDiagram(textareaRef.current.value);
      setRenderKey(prev => prev + 1); // Force re-render
    }
  };

  const handleExportAsSVG = () => {
    const svgElement = containerRef.current?.querySelector('svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'diagram.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
      {(title || description) && (
        <div 
          className="border-b p-4" 
          style={{ 
            backgroundColor: 'var(--card-bg)', 
            borderColor: 'var(--border-color)' 
          }}
        >
          {title && <PHeading tag="h3" size="medium" className="mb-1">{title}</PHeading>}
          {description && <PText size="small">{description}</PText>}
        </div>
      )}
      
      <div className="p-4" style={{ backgroundColor: 'var(--background)' }}>
        {editable && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <PText size="small" weight="semi-bold">Edit Diagram Definition:</PText>
              <div className="flex space-x-2">
                <PButton variant="secondary" onClick={handleUpdateDiagram}>
                  Update Diagram
                </PButton>
              </div>
            </div>
            <textarea
              ref={textareaRef}
              value={diagram}
              className="w-full rounded border p-2 font-mono text-sm min-h-[150px]"
              style={{ 
                borderColor: 'var(--border-color)', 
                backgroundColor: 'var(--card-bg)', 
                color: 'var(--foreground)' 
              }}
              onChange={(e) => setDiagram(e.target.value)}
            />
          </div>
        )}
        
        <div 
          className="mermaid-container border rounded p-4 overflow-auto" 
          style={{ 
            borderColor: 'var(--border-color)', 
            backgroundColor: 'var(--card-bg)',
            minHeight: "100px",
            height: editable ? height : 'auto'
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: 'var(--foreground)' }}></div>
            </div>
          ) : (
            <div ref={containerRef} className="mermaid-content"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MermaidDiagram; 