"use client";

import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown, FaCode, FaCopy } from 'react-icons/fa';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';

interface SchemaVisualizerProps {
  schema: any;
  title?: string;
  description?: string;
  defaultExpanded?: boolean;
  maxDepth?: number;
  initialExpandedDepth?: number;
  className?: string;
  showCopyButton?: boolean;
}

type DataType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null' | 'undefined';

const getDataType = (value: any): DataType => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  return typeof value as DataType;
};

const getTypeColor = (type: DataType): string => {
  switch (type) {
    case 'string': return 'text-green-600';
    case 'number': return 'text-blue-600';
    case 'boolean': return 'text-purple-600';
    case 'object': return 'text-gray-800';
    case 'array': return 'text-orange-600';
    case 'null': return 'text-red-600';
    case 'undefined': return 'text-gray-500';
    default: return 'text-gray-800';
  }
};

const SchemaNode: React.FC<{
  name: string;
  value: any;
  depth: number;
  maxDepth?: number;
  defaultExpanded: boolean;
  initialExpandedDepth: number;
  isLast: boolean;
}> = ({ 
  name, 
  value, 
  depth, 
  maxDepth = Infinity, 
  defaultExpanded, 
  initialExpandedDepth, 
  isLast 
}) => {
  const dataType = getDataType(value);
  const isExpandable = (dataType === 'object' || dataType === 'array') && Object.keys(value).length > 0;
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || depth < initialExpandedDepth);
  
  // Check if we've reached max depth
  if (depth > maxDepth) {
    return (
      <div className="font-mono text-sm pl-4 py-1">
        <span className="text-gray-600">{name}: </span>
        <span className="text-purple-600">[Max depth reached]</span>
      </div>
    );
  }
  
  // Primitive values (string, number, boolean, null, undefined)
  if (!isExpandable) {
    return (
      <div className="font-mono text-sm pl-4 py-1">
        <span className="text-gray-600">{name}: </span>
        {dataType === 'string' && <span className={getTypeColor(dataType)}>"{value}"</span>}
        {dataType === 'number' && <span className={getTypeColor(dataType)}>{value}</span>}
        {dataType === 'boolean' && <span className={getTypeColor(dataType)}>{value.toString()}</span>}
        {dataType === 'null' && <span className={getTypeColor(dataType)}>null</span>}
        {dataType === 'undefined' && <span className={getTypeColor(dataType)}>undefined</span>}
      </div>
    );
  }
  
  // Objects and arrays
  const isArray = Array.isArray(value);
  const keys = Object.keys(value);
  
  return (
    <div className="pl-4">
      <div 
        className="py-1 flex items-center cursor-pointer hover:bg-gray-50 rounded -ml-4 pl-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpandable ? (
          isExpanded ? <FaChevronDown className="mr-1 text-gray-500 text-xs" /> : <FaChevronRight className="mr-1 text-gray-500 text-xs" />
        ) : (
          <span className="mr-3"></span>
        )}
        <span className="text-gray-600 font-mono text-sm">{name}: </span>
        <span className={`font-mono text-sm ${getTypeColor(dataType)}`}>
          {isArray ? '[' : '{'}
          {!isExpanded && (keys.length > 0 ? '...' : '')}
          {!isExpanded && (isArray ? ']' : '}')}
        </span>
        <span className="ml-2 text-xs text-gray-400">
          {isArray ? `Array(${keys.length})` : `${keys.length} properties`}
        </span>
      </div>
      
      {isExpanded && (
        <div className="border-l border-gray-200 ml-1">
          {keys.map((key, index) => (
            <SchemaNode
              key={key}
              name={isArray ? `${key}` : key}
              value={value[key]}
              depth={depth + 1}
              maxDepth={maxDepth}
              defaultExpanded={defaultExpanded}
              initialExpandedDepth={initialExpandedDepth}
              isLast={index === keys.length - 1}
            />
          ))}
          <div className="font-mono text-sm pl-4 py-1">
            <span className={getTypeColor(dataType)}>
              {isArray ? ']' : '}'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const SchemaVisualizer: React.FC<SchemaVisualizerProps> = ({
  schema,
  title,
  description,
  defaultExpanded = false,
  maxDepth,
  initialExpandedDepth = 1,
  className = '',
  showCopyButton = true,
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                title="Copy schema"
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
      
      <div className="p-4 overflow-auto max-h-96">
        {schema ? (
          <div className="relative">
            <SchemaNode
              name="root"
              value={schema}
              depth={0}
              maxDepth={maxDepth}
              defaultExpanded={defaultExpanded}
              initialExpandedDepth={initialExpandedDepth}
              isLast={true}
            />
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaCode className="mx-auto mb-2 text-xl" />
            <p>No schema data provided</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemaVisualizer; 