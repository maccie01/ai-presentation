"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import PHeading from '@/components/ui/PHeading';
import PButton from '@/components/ui/PButton';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTheme } from '@/lib/themeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <header className="border-b" style={{ 
      borderColor: 'var(--border-color)',
      backgroundColor: 'var(--background)'
    }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <PHeading tag="h1" size="large" className={isDarkMode ? "text-blue-400" : "text-blue-600"}>
                AI Presentation
              </PHeading>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: 'var(--foreground)' }}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/ki-uberblick" style={{ textDecoration: 'none' }}>
              <PButton variant="tertiary">KI-Überblick</PButton>
            </Link>
            <Link href="/high-level-prompting" style={{ textDecoration: 'none' }}>
              <PButton variant="tertiary">Prompting</PButton>
            </Link>
            <Link href="/automotive-beispiele" style={{ textDecoration: 'none' }}>
              <PButton variant="tertiary">Automotive</PButton>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/ki-uberblick" 
                className={`px-3 py-2 rounded ${isDarkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                KI-Überblick
              </Link>
              <Link 
                href="/high-level-prompting" 
                className={`px-3 py-2 rounded ${isDarkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                High-Level Prompting
              </Link>
              <Link 
                href="/automotive-beispiele" 
                className={`px-3 py-2 rounded ${isDarkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                Automotive Beispiele
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 