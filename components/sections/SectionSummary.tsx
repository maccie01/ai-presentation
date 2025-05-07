"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import PButton from '@/components/ui/PButton';
import { useTheme } from '@/lib/themeContext';

interface SectionSummaryProps {
  title?: string;
  takeaways: string[];
  nextSection?: {
    name: string;
    path: string;
  };
}

const SectionSummary: React.FC<SectionSummaryProps> = ({
  title = 'Key Takeaways',
  takeaways,
  nextSection,
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-12 border-t"
      style={{ borderColor: 'var(--border-color)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div 
        className="rounded-lg shadow-sm p-8 border"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)'
        }}
      >
        <PHeading tag="h3" size="large" className="mb-6">{title}</PHeading>
        
        <ul className="space-y-3 mb-8">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start">
              <span style={{ color: isDarkMode ? '#60a5fa' : '#2563eb' }} className="mr-2">•</span>
              <PText>{takeaway}</PText>
            </li>
          ))}
        </ul>
        
        {nextSection && (
          <div className="text-center mt-8">
            <Link href={nextSection.path} style={{ textDecoration: 'none' }}>
              <PButton variant="primary">
                Weiter zu: {nextSection.name}
              </PButton>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SectionSummary; 