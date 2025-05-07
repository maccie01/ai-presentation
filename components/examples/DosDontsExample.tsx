"use client";

import React from 'react';
import Tabs from '@/components/ui/Tabs';
import InfoCard from '@/components/ui/InfoCard';
import PText from '@/components/ui/PText';
import PHeading from '@/components/ui/PHeading';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/themeContext';

interface PromptExample {
  bad: {
    prompt: string;
    explanation: string;
    problems: string[];
  };
  good: {
    prompt: string;
    explanation: string;
    improvements: string[];
  };
  metrics?: {
    tokensReduced?: number;
    qualityIncrease?: number;
    responseTime?: {
      before: string;
      after: string;
    };
  };
}

interface DosDontsExampleProps {
  title: string;
  description?: string;
  examples: PromptExample[];
}

const BeforeAfterVisualization: React.FC<{ example: PromptExample }> = ({ example }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <InfoCard
        title="Don't"
        variant="error"
        className="h-full"
      >
        <div className="mb-4">
          <div className="p-4 rounded-md mb-4 font-mono text-sm whitespace-pre-wrap" style={{ 
            backgroundColor: isDarkMode ? 'rgba(127, 29, 29, 0.2)' : 'rgba(254, 226, 226, 0.8)',
            color: isDarkMode ? 'var(--foreground)' : '#1f2937'
          }}>
            {example.bad.prompt}
          </div>
          <PText>{example.bad.explanation}</PText>
        </div>
        
        <div>
          <PHeading tag="h5" size="small" className="mb-2">Probleme:</PHeading>
          <ul className="list-disc pl-5 space-y-1">
            {example.bad.problems.map((problem, index) => (
              <li key={index}>
                <PText size="small">{problem}</PText>
              </li>
            ))}
          </ul>
        </div>
      </InfoCard>

      <InfoCard
        title="Do"
        variant="success"
        className="h-full"
      >
        <div className="mb-4">
          <div className="p-4 rounded-md mb-4 font-mono text-sm whitespace-pre-wrap" style={{ 
            backgroundColor: isDarkMode ? 'rgba(6, 78, 59, 0.2)' : 'rgba(240, 253, 244, 0.8)',
            color: isDarkMode ? 'var(--foreground)' : '#1f2937'
          }}>
            {example.good.prompt}
          </div>
          <PText>{example.good.explanation}</PText>
        </div>
        
        <div>
          <PHeading tag="h5" size="small" className="mb-2">Verbesserungen:</PHeading>
          <ul className="list-disc pl-5 space-y-1">
            {example.good.improvements.map((improvement, index) => (
              <li key={index}>
                <PText size="small">{improvement}</PText>
              </li>
            ))}
          </ul>
        </div>
      </InfoCard>
    </div>
  );
};

const MetricsVisualization: React.FC<{ metrics?: PromptExample['metrics'] }> = ({ metrics }) => {
  const { isDarkMode } = useTheme();
  
  if (!metrics) return null;
  
  return (
    <div className="p-4 rounded-md mt-6" style={{ 
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.8)' 
    }}>
      <PHeading tag="h4" size="small" className="mb-4">Leistungsmetriken</PHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.tokensReduced && (
          <div className="text-center">
            <PHeading tag="h5" size="small" style={{ color: isDarkMode ? '#60a5fa' : '#2563eb' }}>
              {metrics.tokensReduced}%
            </PHeading>
            <PText size="small">Token-Reduzierung</PText>
            <motion.div 
              className="w-full h-2 rounded-full mt-2"
              style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="h-2 rounded-full"
                style={{ backgroundColor: isDarkMode ? '#60a5fa' : '#3b82f6' }}
                initial={{ width: 0 }}
                animate={{ width: `${metrics.tokensReduced}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        )}
        
        {metrics.qualityIncrease && (
          <div className="text-center">
            <PHeading tag="h5" size="small" style={{ color: isDarkMode ? '#34d399' : '#10b981' }}>
              {metrics.qualityIncrease}%
            </PHeading>
            <PText size="small">Qualitätssteigerung</PText>
            <motion.div 
              className="w-full h-2 rounded-full mt-2"
              style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="h-2 rounded-full"
                style={{ backgroundColor: isDarkMode ? '#34d399' : '#10b981' }}
                initial={{ width: 0 }}
                animate={{ width: `${metrics.qualityIncrease}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        )}
        
        {metrics.responseTime && (
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2">
              <PText size="small" style={{ color: isDarkMode ? '#f87171' : '#ef4444', textDecoration: 'line-through' }}>
                {metrics.responseTime.before}
              </PText>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              <PText size="small" style={{ color: isDarkMode ? '#34d399' : '#10b981' }}>
                {metrics.responseTime.after}
              </PText>
            </div>
            <PText size="small">Antwortzeit</PText>
            <motion.div 
              className="w-full h-2 rounded-full mt-2"
              style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="h-2 rounded-full"
                style={{ backgroundColor: isDarkMode ? '#a78bfa' : '#8b5cf6' }}
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

const ImprovementSuggestions: React.FC<{ example: PromptExample }> = ({ example }) => {
  const { isDarkMode } = useTheme();
  const suggestions = [
    "Seien Sie spezifisch und klar in Ihren Anfragen",
    "Stellen Sie den notwendigen Kontext bereit",
    "Unterteilen Sie komplexe Aufgaben in kleinere Schritte",
    "Nutzen Sie Formatierung für bessere Lesbarkeit",
    "Fügen Sie relevante Beispiele oder Einschränkungen hinzu"
  ];

  return (
    <div className="mt-6">
      <PHeading tag="h4" size="small" className="mb-4">Interaktive Verbesserungsvorschläge</PHeading>
      
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <motion.div 
            key={index}
            className="p-3 rounded-md hover:shadow-md transition-shadow"
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(219, 234, 254, 0.8)',
              borderLeft: `4px solid ${isDarkMode ? '#3b82f6' : '#2563eb'}`
            }}
            whileHover={{ x: 5 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PText>{suggestion}</PText>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const DosDontsExample: React.FC<DosDontsExampleProps> = ({ title, description, examples }) => {
  // Create tabs for each example
  const tabs = examples.map((example, index) => {
    return {
      id: `example-${index}`,
      label: `Beispiel ${index + 1}`,
      content: (
        <div className="p-2">
          <Tabs
            tabs={[
              {
                id: 'before-after',
                label: 'Vorher & Nachher',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                ),
                content: <BeforeAfterVisualization example={example} />
              },
              {
                id: 'metrics',
                label: 'Verbesserungsmetriken',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                content: <MetricsVisualization metrics={example.metrics} />
              },
              {
                id: 'suggestions',
                label: 'Verbesserungstipps',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                content: <ImprovementSuggestions example={example} />
              }
            ]}
            variant="pills"
            className="mb-6"
          />
        </div>
      )
    };
  });

  return (
    <div className="mt-8">
      <PHeading tag="h3" size="medium" className="mb-2">{title}</PHeading>
      {description && <PText className="mb-6">{description}</PText>}
      
      <Tabs
        tabs={tabs}
        variant="outline"
        className="mb-6"
      />
    </div>
  );
};

export default DosDontsExample; 