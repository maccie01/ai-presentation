"use client";

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import { FaCopy, FaCode } from 'react-icons/fa';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';

interface Annotation {
  line: number; // Line number (1-based)
  text: string; // Annotation text
  type?: 'info' | 'warning' | 'error' | 'success'; // Annotation type for styling
}

interface CodeAnnotatorProps {
  code: string;
  language?: string;
  annotations?: Annotation[];
  title?: string;
  description?: string;
  startLineNumber?: number;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  className?: string;
  maxHeight?: string;
}

const typeColors = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-500',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: 'text-yellow-500',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: 'text-red-500',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: 'text-green-500',
  },
};

const CodeAnnotator: React.FC<CodeAnnotatorProps> = ({
  code,
  language = 'typescript',
  annotations = [],
  title,
  description,
  startLineNumber = 1,
  highlightLines = [],
  showLineNumbers = true,
  showCopyButton = true,
  className = '',
  maxHeight = '600px',
}) => {
  const [copied, setCopied] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);
  
  // Perform syntax highlighting when component mounts
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Split code into lines for rendering
  const codeLines = code.split('\n');
  
  // Create a mapping of line numbers to annotations
  const annotationMap = annotations.reduce<Record<number, Annotation[]>>((acc, annotation) => {
    const lineNumber = annotation.line;
    if (!acc[lineNumber]) acc[lineNumber] = [];
    acc[lineNumber].push(annotation);
    return acc;
  }, {});
  
  const handleLineClick = (lineNumber: number) => {
    if (annotationMap[lineNumber]) {
      setActiveAnnotation(activeAnnotation === lineNumber ? null : lineNumber);
    }
  };
  
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden bg-white ${className}`}>
      {(title || description) && (
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              {title && <PHeading tag="h3" size="medium" className="mb-1">{title}</PHeading>}
              {description && <PText size="small">{description}</PText>}
            </div>
            
            {showCopyButton && (
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                title="Copy code"
              >
                {copied ? (
                  <span className="text-green-600">Copied!</span>
                ) : (
                  <>
                    <FaCopy className="text-gray-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
      
      <div className="relative" style={{ maxHeight }}>
        <div className="flex overflow-auto">
          {/* Line numbers */}
          {showLineNumbers && (
            <div className="flex-none bg-gray-50 text-gray-500 text-right pr-3 py-4 select-none border-r border-gray-200 font-mono text-sm">
              {codeLines.map((_, i) => {
                const lineNumber = i + startLineNumber;
                const hasAnnotation = !!annotationMap[lineNumber];
                
                return (
                  <div 
                    key={i}
                    className={`
                      py-1 px-2 cursor-pointer
                      ${hasAnnotation ? 'font-bold' : ''}
                      ${highlightLines.includes(lineNumber) ? 'bg-yellow-100' : ''}
                    `}
                    onClick={() => handleLineClick(lineNumber)}
                  >
                    {lineNumber}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Code */}
          <div className="flex-grow overflow-auto">
            <pre className="p-4 m-0 overflow-visible">
              <code className={`language-${language}`}>
                {codeLines.map((line, i) => {
                  const lineNumber = i + startLineNumber;
                  const hasAnnotation = !!annotationMap[lineNumber];
                  
                  return (
                    <div 
                      key={i}
                      className={`
                        py-1
                        ${hasAnnotation ? 'cursor-pointer hover:bg-gray-50' : ''}
                        ${highlightLines.includes(lineNumber) ? 'bg-yellow-100' : ''}
                      `}
                      onClick={() => handleLineClick(lineNumber)}
                    >
                      {line || ' '}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </div>
        
        {/* Annotations panel */}
        {activeAnnotation !== null && annotationMap[activeAnnotation] && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Annotations for line {activeAnnotation}
            </h4>
            
            <div className="space-y-2">
              {annotationMap[activeAnnotation].map((annotation, i) => {
                const type = annotation.type || 'info';
                const colors = typeColors[type];
                
                return (
                  <div 
                    key={i} 
                    className={`p-3 rounded-md ${colors.bg} ${colors.border} border`}
                  >
                    <div className={`text-sm ${colors.text}`}>{annotation.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeAnnotator; 