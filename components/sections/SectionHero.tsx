"use client";

import React from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';

interface SectionHeroProps {
  title: string;
  subtitle: string;
}

const SectionHero: React.FC<SectionHeroProps> = ({ 
  title, 
  subtitle
}) => {
  return (
    <motion.div 
      className="py-16 md:py-24 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <PHeading tag="h1" size="xx-large" className="mb-6">
          {title}
        </PHeading>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <PText size="large" className="max-w-2xl mx-auto">
          {subtitle}
        </PText>
      </motion.div>
    </motion.div>
  );
};

export default SectionHero; 