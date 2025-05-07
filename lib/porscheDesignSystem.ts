import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

// Define the Porsche Design System configuration
type PDSConfig = Parameters<typeof PorscheDesignSystemProvider>[0];
type Theme = 'light' | 'dark';

// Base configuration that doesn't include theme
const baseConfig: Omit<PDSConfig, 'theme'> = {
  // Additional configuration options can be added as needed
};

// Function to get configuration with the current theme
export const getPDSConfig = (theme: Theme): PDSConfig => ({
  ...baseConfig,
  theme: theme,
});

// Default config with light theme
export const porscheDesignSystemConfig: PDSConfig = {
  ...baseConfig,
  theme: 'light',
};

// Export helper functions for theme management
export const getThemeClass = (isDarkMode: boolean): string => {
  return isDarkMode ? 'pds-theme-dark' : 'pds-theme-light';
}; 