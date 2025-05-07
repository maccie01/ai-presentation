"use client";

import React from 'react';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <PHeading tag="h3" size="small" className="mb-1">
              AI Presentation
            </PHeading>
            <PText className="text-sm">
              Eine interaktive Präsentation zu künstlicher Intelligenz
            </PText>
          </div>
          
          <PText className="text-xs">
            © {new Date().getFullYear()} AI Presentation. Alle Rechte vorbehalten.
          </PText>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 