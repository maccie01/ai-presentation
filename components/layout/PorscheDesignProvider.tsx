"use client";

import React from 'react';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import { getPDSConfig } from '@/lib/porscheDesignSystem';
import { ThemeProvider, useTheme } from '@/lib/themeContext';

interface PorscheDesignProviderProps {
  children: React.ReactNode;
}

// Inner provider that has access to theme context
const PorscheDesignProviderInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <PorscheDesignSystemProvider {...getPDSConfig(theme)}>
      {children}
    </PorscheDesignSystemProvider>
  );
};

// Outer provider that sets up the theme context
const PorscheDesignProvider: React.FC<PorscheDesignProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <PorscheDesignProviderInner>
        {children}
      </PorscheDesignProviderInner>
    </ThemeProvider>
  );
};

export default PorscheDesignProvider; 