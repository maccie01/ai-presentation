"use client";

import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import SchemaVisualizer from './SchemaVisualizer';

// HTTP method colors
const methodColors: Record<string, string> = {
  GET: 'bg-blue-100 text-blue-800',
  POST: 'bg-green-100 text-green-800',
  PUT: 'bg-amber-100 text-amber-800',
  DELETE: 'bg-red-100 text-red-800',
  PATCH: 'bg-purple-100 text-purple-800',
  OPTIONS: 'bg-gray-100 text-gray-800',
  HEAD: 'bg-teal-100 text-teal-800',
};

// API status code colors
const statusColors: Record<string, string> = {
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  redirect: 'bg-amber-100 text-amber-800',
  clientError: 'bg-orange-100 text-orange-800',
  serverError: 'bg-red-100 text-red-800',
  other: 'bg-gray-100 text-gray-800',
};

// Get color class for status code
const getStatusColor = (code: number): string => {
  if (code >= 200 && code < 300) return statusColors.success;
  if (code >= 300 && code < 400) return statusColors.redirect;
  if (code >= 400 && code < 500) return statusColors.clientError;
  if (code >= 500) return statusColors.serverError;
  return statusColors.other;
};

export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  description?: string;
  parameters?: {
    path?: Array<{
      name: string;
      type: string;
      required?: boolean;
      description?: string;
    }>;
    query?: Array<{
      name: string;
      type: string;
      required?: boolean;
      description?: string;
    }>;
    header?: Array<{
      name: string;
      type: string;
      required?: boolean;
      description?: string;
    }>;
  };
  requestBody?: {
    description?: string;
    contentType?: string;
    schema?: any;
    example?: any;
  };
  responses: Array<{
    code: number;
    description?: string;
    contentType?: string;
    schema?: any;
    example?: any;
  }>;
}

interface ApiSchemaVisualizerProps {
  title?: string;
  description?: string;
  endpoints: ApiEndpoint[];
  className?: string;
  showExamples?: boolean;
}

const ApiSchemaVisualizer: React.FC<ApiSchemaVisualizerProps> = ({
  title = 'API Documentation',
  description,
  endpoints,
  className = '',
  showExamples = true,
}) => {
  const [expandedEndpoints, setExpandedEndpoints] = useState<Record<string, boolean>>({});
  
  const toggleEndpoint = (index: number) => {
    setExpandedEndpoints(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const renderParameters = (
    parameters: ApiEndpoint['parameters'], 
    type: 'path' | 'query' | 'header'
  ) => {
    const params = parameters?.[type];
    if (!params?.length) return null;
    
    return (
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">
          {type === 'path' ? 'Path' : type === 'query' ? 'Query' : 'Header'} Parameters
        </h4>
        <div className="bg-gray-50 overflow-hidden rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {params.map((param, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-2 text-sm font-mono text-gray-900">{param.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{param.type}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {param.required === false ? 'No' : 'Yes'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{param.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden bg-white ${className}`}>
      {(title || description) && (
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          {title && <PHeading tag="h3" size="medium" className="mb-1">{title}</PHeading>}
          {description && <PText size="small">{description}</PText>}
        </div>
      )}
      
      <div className="divide-y divide-gray-200">
        {endpoints.map((endpoint, i) => (
          <div key={i} className="bg-white">
            <div 
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleEndpoint(i)}
            >
              <div className="flex-shrink-0 mr-2">
                {expandedEndpoints[i] ? (
                  <FaChevronDown className="text-gray-500" />
                ) : (
                  <FaChevronRight className="text-gray-500" />
                )}
              </div>
              
              <div className="flex-shrink-0 mr-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${methodColors[endpoint.method] || 'bg-gray-100'}`}>
                  {endpoint.method}
                </span>
              </div>
              
              <div className="flex-grow">
                <span className="font-mono text-gray-900">{endpoint.path}</span>
              </div>
            </div>
            
            {expandedEndpoints[i] && (
              <div className="px-4 pb-4">
                {endpoint.description && (
                  <div className="mt-2 mb-4">
                    <PText size="small">{endpoint.description}</PText>
                  </div>
                )}
                
                {/* Parameters */}
                {endpoint.parameters && (
                  <>
                    {renderParameters(endpoint.parameters, 'path')}
                    {renderParameters(endpoint.parameters, 'query')}
                    {renderParameters(endpoint.parameters, 'header')}
                  </>
                )}
                
                {/* Request Body */}
                {endpoint.requestBody && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Request Body</h4>
                    {endpoint.requestBody.description && (
                      <p className="text-sm text-gray-600 mb-2">{endpoint.requestBody.description}</p>
                    )}
                    {endpoint.requestBody.contentType && (
                      <p className="text-xs font-mono text-gray-500 mb-2">Content-Type: {endpoint.requestBody.contentType}</p>
                    )}
                    
                    {endpoint.requestBody.schema && (
                      <div className="mb-2">
                        <SchemaVisualizer 
                          schema={endpoint.requestBody.schema}
                          title="Request Schema"
                          initialExpandedDepth={2}
                        />
                      </div>
                    )}
                    
                    {showExamples && endpoint.requestBody.example && (
                      <div className="mt-2">
                        <SchemaVisualizer 
                          schema={endpoint.requestBody.example}
                          title="Request Example"
                          initialExpandedDepth={2}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Responses */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Responses</h4>
                  
                  <div className="space-y-3">
                    {endpoint.responses.map((response, j) => (
                      <div key={j} className="border border-gray-200 rounded-md overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${getStatusColor(response.code)}`}>
                            {response.code}
                          </span>
                          {response.description && (
                            <span className="text-sm text-gray-600">{response.description}</span>
                          )}
                          {response.contentType && (
                            <span className="text-xs font-mono text-gray-500">Content-Type: {response.contentType}</span>
                          )}
                        </div>
                        
                        {response.schema && (
                          <div className="px-4 py-2">
                            <SchemaVisualizer 
                              schema={response.schema}
                              title="Response Schema"
                              initialExpandedDepth={2}
                            />
                          </div>
                        )}
                        
                        {showExamples && response.example && (
                          <div className="px-4 py-2 border-t border-gray-200">
                            <SchemaVisualizer 
                              schema={response.example}
                              title="Response Example"
                              initialExpandedDepth={2}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiSchemaVisualizer; 