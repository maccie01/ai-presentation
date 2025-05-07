'use client';

import React from 'react';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { useTheme } from '@/lib/themeContext';

const TeamsChannelExample: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="teams-channel-example">
      <div className="mb-6">
        <PHeading tag="h3" size="medium" className="mb-3">
          Microsoft Teams KI-Community
        </PHeading>
        <PText className="mb-4">
          Wir haben einen dedizierten Microsoft Teams-Kanal für alles rund um KI und die internen Implementationen und Projekte.
        </PText>
      </div>
      
      <div className="p-5 rounded-lg border" style={{ 
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--card-bg)'
      }}>
        <div className="flex items-center mb-4">
          <div className="bg-purple-600 text-white h-10 w-10 rounded flex items-center justify-center text-lg font-bold mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-semibold">Generative Artificial Intelligence Channel</div>
            <div className="text-sm" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.9)' : 'rgba(107, 114, 128, 0.9)' }}>
              Unternehmensweite Kollaboration zu KI-Projekten
            </div>
          </div>
        </div>
        
        <div className="mb-5">
          <PText className="mb-3">
            Der bestehende Teams-Kanal bietet folgende Vorteile:
          </PText>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Zentraler Wissensaustausch:</strong> Teilen und finden Sie alle relevanten KI-Ressourcen und Informationen an einem Ort</li>
            <li><strong>Direkte Unterstützung:</strong> Erhalten Sie schnelle Hilfe von KI-Experten bei Fragen und Herausforderungen</li>
            <li><strong>Community-Building:</strong> Knüpfen Sie Kontakte mit anderen KI-interessierten Kollegen über Abteilungsgrenzen hinweg</li>
            <li><strong>Neuigkeiten:</strong> Bleiben Sie über die neuesten Entwicklungen, Updates und Best Practices informiert</li>
          </ul>
        </div>
        
        <div className="flex justify-center">
          <a 
            href="https://teams.microsoft.com/l/team/19%3AtWCAzFGHyrCuzGek45op8uISEYZ6iz0x9lbZVGYiZw81%40thread.tacv2/conversations?groupId=dbb58220-9f8a-4ea4-823c-c1c642c1f99c&tenantId=56564e0f-83d3-4b52-92e8-a6bb9ea36564"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white transition-all"
            style={{
              backgroundColor: isDarkMode ? '#7b4cec' : '#6b46c1', // purple-600 variations
            }}
          >
            Teams KI-Community öffnen
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="mt-6 p-4 rounded-lg" style={{ 
        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)'
      }}>
        <PText className="text-sm">
          <strong>Hinweis:</strong> Wenn Sie noch keinen Zugriff auf den KI-Community-Kanal haben,
          wenden Sie sich bitte an Ihren IT-Ansprechpartner oder den Kanal-Administrator, 
          um eine Einladung zu erhalten. Die Teilnahme steht allen interessierten Mitarbeitern offen.
        </PText>
      </div>
    </div>
  );
};

export default TeamsChannelExample; 