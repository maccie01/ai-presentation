'use client';

import React from 'react';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import InfoCard from '@/components/ui/InfoCard';
import { useTheme } from '@/lib/themeContext';

const LlmLeaderboard: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const keywordGroups = [
    {
      title: "Vergleichsbereiche",
      keywords: ["Performance", "Preise", "Benchmarks", "Kontextfenster", "Tokenisierung", "Geschwindigkeit"]
    },
    {
      title: "Führende Modelle",
      keywords: ["Claude 3.7", "GPT-4o", "Llama 3", "Mistral", "Grok 3", "DeepSeek"]
    },
    {
      title: "Anwendungsfälle",
      keywords: ["Code", "Reasoning", "Multimodal", "Dokumentation", "Forschung", "Wissensmanagement"]
    }
  ];
  
  return (
    <div className="llm-leaderboard">
      <div className="mb-4">
        <PHeading tag="h3" size="medium" className="mb-3">
          LLM Stats - Leaderboard für aktuelle KI-Modelle
        </PHeading>
        
        <PText className="mb-4">
          LLM Stats bietet eine tagesaktuelle Übersicht über die leistungsstärksten Large Language Models (LLMs) 
          auf dem Markt mit detaillierten Benchmark-Vergleichen, Preisstrukturen und Leistungsmetriken.
        </PText>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {keywordGroups.map((group, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-lg border"
              style={{ 
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--card-bg)'
              }}
            >
              <div className="font-medium mb-2">{group.title}</div>
              <div className="flex flex-wrap gap-2">
                {group.keywords.map((keyword, kidx) => (
                  <span
                    key={kidx}
                    className="px-2 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(219, 234, 254, 0.5)',
                      color: isDarkMode ? 'rgba(96, 165, 250, 0.9)' : 'rgba(37, 99, 235, 0.9)'
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <a 
            href="https://llm-stats.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white transition-all"
            style={{
              backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
            }}
          >
            LLM Stats Leaderboard öffnen
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="p-4 rounded-lg" style={{ 
        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)' 
      }}>
        <PText className="text-sm">
          <strong>Hinweis:</strong> Die Website liefert tagesaktuelle Vergleichsdaten zu führenden KI-Modellen, 
          die für fundierte Entscheidungen bei der Auswahl und Implementierung von LLM-Lösungen genutzt werden können.
          Stand: 6. Mai 2025
        </PText>
      </div>
    </div>
  );
};

export default LlmLeaderboard; 