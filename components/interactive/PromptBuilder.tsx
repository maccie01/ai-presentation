"use client";

import React, { useState, useRef, useEffect } from 'react';
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
}

interface PromptParameter {
  name: string;
  defaultValue: string;
  description?: string;
}

interface PromptBuilderProps {
  title?: string;
  description?: string;
  templates?: PromptTemplate[];
  parameters?: PromptParameter[];
  onSubmit?: (prompt: string, parameters: Record<string, string>) => Promise<string>;
}

const PromptBuilder: React.FC<PromptBuilderProps> = ({
  title,
  description,
  templates = [],
  parameters = [],
  onSubmit,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(
    templates.length > 0 ? templates[0] : null
  );
  const [prompt, setPrompt] = useState<string>(selectedTemplate?.template || '');
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [processedPrompt, setProcessedPrompt] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [promptParameters, setPromptParameters] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});
  const responseRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  // Extract parameters from prompt template using regex
  const extractParametersFromPrompt = (promptText: string): string[] => {
    const regex = /\{\{\s*([^{}]+)\s*\}\}/g;
    const matches = [...promptText.matchAll(regex)];
    const params = matches.map(match => match[1].trim());
    return [...new Set(params)]; // Remove duplicates
  };

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
      document.head.removeChild(style);
    };
  }, []);

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

  // Keep handleSubmit function for potential external usage, but it's no longer directly accessed from the UI
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setCopyFeedback(null);
    
    try {
      if (onSubmit) {
        const result = await onSubmit(processedPrompt, paramValues);
        setResponse(result);
      } else {
        // If no onSubmit handler is provided, just show the processed prompt
        setTimeout(() => {
          setResponse(`This is a simulated response to your prompt:\n\n${processedPrompt}`);
          setIsLoading(false);
        }, 1000);
      }
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
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

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(response);
    showCopyFeedback("Response copied!");
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
    
    setResponse('');
    setError(null);
    setCopyFeedback(null);
  };

  // Add handleClearParameters function
  const handleClearParameters = () => {
    // Clear all parameter values but keep the prompt as is
    const clearedValues: Record<string, string> = {};
    Object.keys(paramValues).forEach(key => {
      clearedValues[key] = '';
    });
    setParamValues(clearedValues);
    setCopyFeedback("Parameters cleared");
  };

  // Only show parameters that are needed by the current prompt
  const relevantParameters = parameters.filter(param => 
    promptParameters.includes(param.name)
  );

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
        <PGrid cols={2} gap={4} className="mb-4">
          <PGridItem>
            <div className="mb-3">
              <PText size="small" weight="semi-bold" className="mb-1 block">Prompt Template:</PText>
              {templates.length > 0 && (
                <div className="mb-3">
                  <select
                    className="w-full p-2 border rounded mb-3"
                    style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}
                    value={selectedTemplate?.name || ''}
                    onChange={handleTemplateChange}
                  >
                    {templates.map((template) => (
                      <option key={template.name} value={template.name}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  {selectedTemplate?.description && (
                    <PText size="small" className="mb-3">
                      {selectedTemplate.description}
                    </PText>
                  )}
                </div>
              )}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={handlePromptChange}
                  className="w-full p-3 border rounded font-mono text-sm min-h-[150px]"
                  style={{ 
                    borderColor: 'var(--border-color)', 
                    backgroundColor: 'var(--card-bg)', 
                    color: 'var(--foreground)' 
                  }}
                  placeholder="Gib deinen Prompt-Template ein..."
                />
                <button
                  onClick={handleCopyRawPrompt}
                  className="absolute top-2 right-2 p-1 rounded"
                  style={{ color: 'var(--foreground)' }}
                  title="Kopiere Template"
                >
                  <PIcon name="copy" />
                </button>
              </div>
            </div>
          </PGridItem>
          
          <PGridItem>
            <div>
              <PText size="small" weight="semi-bold" className="mb-1 block">Parameter:</PText>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {promptParameters.length > 0 ? (
                  promptParameters.map((paramName) => {
                    const param = parameters.find((p) => p.name === paramName);
                    return (
                      <div key={paramName} className="relative">
                        <PText size="small" className="mb-1 block">
                          <code className="px-1 rounded text-sm font-mono" style={{
                            backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(219, 234, 254, 0.8)',
                            color: isDarkMode ? '#60a5fa' : '#1e40af'
                          }}>
                            {`{{${paramName}}}`}
                          </code>
                          {param?.description && <span className="ml-2">{param.description}</span>}
                        </PText>
                        <textarea
                          ref={(el) => {
                            textareaRefs.current[paramName] = el;
                          }}
                          value={paramValues[paramName] || ''}
                          onChange={(e) => handleParamChange(paramName, e.target.value)}
                          className="w-full p-3 border rounded min-h-[80px] font-mono text-sm"
                          style={{ 
                            borderColor: 'var(--border-color)', 
                            backgroundColor: 'var(--card-bg)', 
                            color: 'var(--foreground)' 
                          }}
                          placeholder={`Wert für ${paramName}...`}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div 
                    className="p-4 rounded text-center" 
                    style={{ 
                      backgroundColor: 'var(--card-bg)', 
                      color: 'var(--foreground)' 
                    }}
                  >
                    <PText>
                      Keine Parameter erkannt. Füge Parameter im Format <code style={{
                        backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(219, 234, 254, 0.8)',
                        color: isDarkMode ? '#60a5fa' : '#1e40af',
                        padding: '0 0.25rem',
                        borderRadius: '0.25rem'
                      }}>{'{{parameter_name}}'}</code> hinzu.
                    </PText>
                  </div>
                )}
              </div>
            </div>
          </PGridItem>
        </PGrid>
        
        <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--border-color)' }}>
          <PText size="small" weight="semi-bold" className="mb-1 block">Vorschau:</PText>
          <div 
            className="relative p-3 border rounded mb-4 min-h-[100px] font-mono text-sm whitespace-pre-wrap"
            style={{ 
              borderColor: 'var(--border-color)', 
              backgroundColor: 'var(--card-bg)', 
              color: 'var(--foreground)' 
            }}
          >
            {processedPrompt || <span className="text-gray-400">Vorschau wird hier angezeigt...</span>}
            <button
              onClick={handleCopyPrompt}
              className="absolute top-2 right-2 p-1 rounded"
              style={{ color: 'var(--foreground)' }}
              title="Kopiere formatierten Prompt"
            >
              <PIcon name="copy" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <PButton variant="primary" onClick={handleCopyPrompt}>
            Copy
          </PButton>
          <PButton variant="tertiary" onClick={handleClearParameters}>
            Clear
          </PButton>
          <PButton variant="tertiary" onClick={handleReset}>
            Reset
          </PButton>
          
          {copyFeedback && (
            <div className="ml-2 animate-fade-in-out px-3 py-1 rounded-full text-sm"
                 style={{ 
                   backgroundColor: isDarkMode ? 'rgba(6, 78, 59, 0.8)' : 'rgba(209, 250, 229, 0.8)', 
                   color: isDarkMode ? '#34d399' : '#065f46' 
                 }}>
              {copyFeedback}
            </div>
          )}
        </div>
        
        {(response || error) && (
          <div className="mt-4 border rounded p-4" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <div className="flex justify-between items-center mb-2">
              <PHeading tag="h4" size="small">Response:</PHeading>
              {response && !error && (
                <PButton variant="secondary" onClick={handleCopyResponse}>
                  Copy Response
                </PButton>
              )}
            </div>
            {error ? (
              <div className="p-2 rounded border" style={{ 
                backgroundColor: isDarkMode ? 'rgba(127, 29, 29, 0.3)' : 'rgba(254, 226, 226, 0.8)',
                borderColor: isDarkMode ? '#ef4444' : '#fca5a5',
                color: isDarkMode ? '#fca5a5' : '#b91c1c'
              }}>
                <PText>{error}</PText>
              </div>
            ) : (
              <div 
                ref={responseRef}
                className="whitespace-pre-wrap p-3 rounded border font-mono text-sm max-h-[400px] overflow-y-auto"
                style={{ 
                  borderColor: 'var(--border-color)', 
                  backgroundColor: 'var(--background)', 
                  color: 'var(--foreground)' 
                }}
              >
                {response}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptBuilder;