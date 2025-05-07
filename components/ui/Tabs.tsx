"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PText from '@/components/ui/PText';
import { useTheme } from '@/lib/themeContext';

interface TabsProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }[];
  defaultTabId?: string;
  variant?: 'default' | 'outline' | 'pills';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  onChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  variant = 'default',
  orientation = 'horizontal',
  className = '',
  tabClassName = '',
  contentClassName = '',
  onChange,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTabId || (tabs.length > 0 ? tabs[0].id : ''));
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { isDarkMode } = useTheme();

  // Set up refs array for keyboard navigation
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs]);

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const lastIndex = tabs.length - 1;
    let newIndex = currentIndex;

    if (orientation === 'horizontal') {
      switch (event.key) {
        case 'ArrowRight':
          newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
          break;
        case 'ArrowLeft':
          newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
          break;
        default:
          return;
      }
    } else {
      switch (event.key) {
        case 'ArrowDown':
          newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
          break;
        case 'ArrowUp':
          newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
          break;
        default:
          return;
      }
    }

    event.preventDefault();
    const newTabId = tabs[newIndex].id;
    handleTabChange(newTabId);
    tabRefs.current[newIndex]?.focus();
  };

  // Variant styles with dark mode support
  const variantStyles = {
    default: {
      container: isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200',
      tab: 'border-b-2 border-transparent transition-colors font-medium',
      activeTab: isDarkMode 
        ? 'border-blue-500 text-blue-400'
        : 'border-blue-600 text-blue-600',
      inactiveTab: isDarkMode
        ? 'text-gray-300 hover:text-gray-100 hover:border-gray-600'
        : 'text-gray-600 hover:text-gray-900 hover:border-gray-300',
    },
    outline: {
      container: '',
      tab: isDarkMode 
        ? 'border border-gray-700 transition-colors font-medium'
        : 'border border-gray-200 transition-colors font-medium',
      activeTab: isDarkMode
        ? 'bg-blue-900 border-blue-500 text-blue-300'
        : 'bg-blue-50 border-blue-600 text-blue-600',
      inactiveTab: isDarkMode
        ? 'text-gray-300 hover:bg-gray-800'
        : 'text-gray-600 hover:bg-gray-50',
    },
    pills: {
      container: '',
      tab: 'rounded-full transition-colors font-medium',
      activeTab: isDarkMode
        ? 'bg-blue-800 text-white'
        : 'bg-blue-600 text-white',
      inactiveTab: isDarkMode
        ? 'text-gray-300 hover:bg-gray-800'
        : 'text-gray-600 hover:bg-gray-100',
    },
  };

  // Orientation styles
  const orientationStyles = {
    horizontal: {
      container: 'flex space-x-1',
      tab: 'px-4 py-2',
    },
    vertical: {
      container: 'flex flex-col space-y-1',
      tab: 'px-4 py-2 text-left',
    },
  };

  // Small screen adjustment for horizontal tabs
  const mobileStyles = orientation === 'horizontal' 
    ? 'overflow-x-auto scrollbar-hide flex-nowrap -mx-1 px-1 pb-1' 
    : '';

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div 
      className={`tabs-component ${className}`}
      style={{ color: 'var(--foreground)' }}
    >
      <div 
        className={`
          ${variantStyles[variant].container} 
          ${orientationStyles[orientation].container}
          ${mobileStyles}
        `}
        role="tablist"
        aria-orientation={orientation}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[index] = el; }}
            role="tab"
            aria-selected={tab.id === activeTabId}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={tab.id === activeTabId ? 0 : -1}
            className={`
              ${variantStyles[variant].tab} 
              ${tab.id === activeTabId ? variantStyles[variant].activeTab : variantStyles[variant].inactiveTab}
              ${orientationStyles[orientation].tab}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              ${tabClassName}
            `}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <div className="flex items-center justify-center">
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className={`mt-4 ${contentClassName}`}>
        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div
              key={activeTabId}
              id={`panel-${activeTabId}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTabId}`}
              initial={{ opacity: 0, x: orientation === 'horizontal' ? 10 : 0, y: orientation === 'vertical' ? 10 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: orientation === 'horizontal' ? -10 : 0, y: orientation === 'vertical' ? -10 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {typeof activeTab.content === 'string' ? <PText>{activeTab.content}</PText> : activeTab.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs; 