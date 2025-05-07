"use client";

import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import PButton from '@/components/ui/PButton';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';

interface CodeTab {
  name: string;
  language: string;
  code: string;
  description?: string;
}

interface CodeEditorWithTabsProps {
  title?: string;
  description?: string;
  tabs: CodeTab[];
  height?: string;
  readOnly?: boolean;
}

const CodeEditorWithTabs: React.FC<CodeEditorWithTabsProps> = ({
  title,
  description,
  tabs,
  height = '300px',
  readOnly = false,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentCode, setCurrentCode] = useState(tabs[0]?.code || '');
  
  useEffect(() => {
    if (tabs[activeTabIndex]) {
      setCurrentCode(tabs[activeTabIndex].code);
    }
  }, [activeTabIndex, tabs]);
  
  if (tabs.length === 0) {
    return <div>No code tabs provided</div>;
  }

  const activeTab = tabs[activeTabIndex];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {(title || description) && (
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          {title && <PHeading tag="h3" size="medium" className="mb-1">{title}</PHeading>}
          {description && <PText size="small">{description}</PText>}
        </div>
      )}
      
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                index === activeTabIndex
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTabIndex(index)}
              aria-selected={index === activeTabIndex}
              role="tab"
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      
      <div key={`tab-content-${activeTabIndex}`}>
        <CodeEditor
          language={activeTab.language}
          defaultCode={currentCode}
          description={activeTab.description}
          height={height}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default CodeEditorWithTabs; 