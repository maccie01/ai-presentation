"use client";

import React, { useState, useRef, useEffect } from 'react';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';
import PButton from '@/components/ui/PButton';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import { useTheme } from '@/lib/themeContext';

interface CodeEditorProps {
  title?: string;
  description?: string;
  language?: string;
  defaultCode?: string;
  height?: string;
  readOnly?: boolean;
  onCodeChange?: (code: string) => void;
  onRunCode?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  title,
  description,
  language = 'javascript',
  defaultCode = '// Type your code here',
  height = '300px',
  readOnly = false,
  onCodeChange,
  onRunCode,
}) => {
  const [code, setCode] = useState<string>(defaultCode);
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);
  const { isDarkMode } = useTheme();

  // Update code when defaultCode changes (for tab switching)
  useEffect(() => {
    setCode(defaultCode);
    setOutput('');
    setError(null);
    // Update the editor content if editor is already mounted
    if (editorRef.current) {
      editorRef.current.setValue(defaultCode);
    }
  }, [defaultCode]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    setupTheme(monaco);
  };

  const setupTheme = (monaco: Monaco) => {
    if (!monaco || !monaco.editor) return;
    
    const editorTheme = isDarkMode ? 'porscheThemeDark' : 'porscheThemeLight';
    
    monaco.editor.defineTheme('porscheThemeLight', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#f8f8f8',
        'editor.foreground': '#333333',
        'editor.lineHighlightBackground': '#f0f0f0',
        'editorCursor.foreground': '#0069b4',
        'editorLineNumber.foreground': '#999999',
      },
    });
    
    monaco.editor.defineTheme('porscheThemeDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1a1a1a',
        'editor.foreground': '#e5e7eb',
        'editor.lineHighlightBackground': '#2d3748',
        'editorCursor.foreground': '#60a5fa',
        'editorLineNumber.foreground': '#6b7280',
      },
    });
    
    monaco.editor.setTheme(editorTheme);
  };

  // Update theme when isDarkMode changes
  useEffect(() => {
    if (editorRef.current && editorRef.current._monaco && editorRef.current._monaco.editor) {
      setupTheme(editorRef.current._monaco);
    }
  }, [isDarkMode]);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      onCodeChange && onCodeChange(value);
    }
  };

  const handleRunCode = () => {
    if (!onRunCode) {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simple evaluation for JavaScript
        if (language === 'javascript') {
          setTimeout(() => {
            try {
              // Capture console.log output
              const originalConsoleLog = console.log;
              let logs: any[] = [];
              
              console.log = (...args) => {
                logs.push(args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
              };
              
              // Use Function constructor to avoid eval
              const result = new Function(code)();
              
              // Restore console.log
              console.log = originalConsoleLog;
              
              setOutput(logs.join('\n') + (result !== undefined ? '\n=> ' + result : ''));
              setIsLoading(false);
            } catch (err: any) {
              setIsLoading(false);
              setError(err.toString());
            }
          }, 500);
        } else {
          setIsLoading(false);
          setOutput('Code execution is only supported for JavaScript');
        }
      } catch (err: any) {
        setIsLoading(false);
        setError(err.toString());
      }
    } else {
      onRunCode(code);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleResetCode = () => {
    setCode(defaultCode);
    setOutput('');
    setError(null);
    // Reset the editor content
    if (editorRef.current) {
      editorRef.current.setValue(defaultCode);
    }
  };

  return (
    <div 
      className="border rounded-lg overflow-hidden" 
      style={{ borderColor: 'var(--border-color)' }}
    >
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
      
      <div className="p-4">
        <div className="mb-4">
          <Editor
            height={height}
            language={language}
            value={code}
            onChange={handleCodeChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              readOnly,
              lineNumbers: 'on',
              roundedSelection: true,
              automaticLayout: true,
            }}
            theme={isDarkMode ? 'vs-dark' : 'vs'}
            key={`editor-${language}-${defaultCode.substring(0, 20)}`}
          />
        </div>
        
        <div className="flex space-x-2 mb-4">
          {!readOnly && (
            <>
              <PButton variant="primary" onClick={handleRunCode} disabled={isLoading}>
                {isLoading ? 'Running...' : 'Run Code'}
              </PButton>
              <PButton variant="secondary" onClick={handleCopyCode}>
                Copy Code
              </PButton>
              <PButton variant="tertiary" onClick={handleResetCode}>
                Reset
              </PButton>
            </>
          )}
        </div>
        
        {(output || error) && (
          <div 
            className="mt-4 border rounded p-3" 
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
          >
            <PHeading tag="h4" size="small" className="mb-2">Output:</PHeading>
            {error ? (
              <pre 
                className="text-sm whitespace-pre-wrap font-mono p-2 rounded"
                style={{ 
                  backgroundColor: isDarkMode ? '#4a2023' : '#fee2e2', 
                  color: isDarkMode ? '#f87171' : '#dc2626' 
                }}
              >
                {error}
              </pre>
            ) : (
              <pre 
                className="text-sm whitespace-pre-wrap font-mono p-2"
                style={{ color: 'var(--foreground)' }}
              >
                {output}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor; 