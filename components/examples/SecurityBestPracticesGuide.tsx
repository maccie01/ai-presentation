"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import InfoCard from '@/components/ui/InfoCard';
import Tabs from '@/components/ui/Tabs';
import { useTheme } from '@/lib/themeContext';

// Security risk levels
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// Data protection measures
const dataProtectionMeasures = [
  {
    id: 'anonymization',
    name: 'Anonymisierung',
    description: 'Entfernung aller persönlich identifizierbaren Informationen aus Daten vor der Verarbeitung.',
    examples: ['Entfernung von Namen, IDs, E-Mail-Adressen', 'Ersetzung durch Platzhalter oder Pseudonyme', 'Aggregation von Daten'],
    impact: 'high',
    implementation: 'medium',
  },
  {
    id: 'minimization',
    name: 'Datenminimierung',
    description: 'Beschränkung des Kontexts auf die minimal notwendigen Informationen für die Anfrage.',
    examples: ['Filterung irrelevanter Daten', 'Auswahl spezifischer Datenfelder', 'Zeitliche Begrenzung der Daten'],
    impact: 'medium',
    implementation: 'low',
  },
  {
    id: 'encryption',
    name: 'Verschlüsselung',
    description: 'Verschlüsselung sensibler Informationen vor der Übermittlung an KI-Systeme.',
    examples: ['End-to-End-Verschlüsselung', 'Verschlüsselte Speicherung', 'Tokenisierung sensibler Daten'],
    impact: 'high',
    implementation: 'high',
  },
  {
    id: 'access_control',
    name: 'Zugriffskontrollen',
    description: 'Einrichtung von Berechtigungssystemen für den Zugriff auf Kontextdaten.',
    examples: ['Rollenbasierte Zugriffsrechte', 'Zeitlich begrenzte Zugriffe', 'Protokollierung aller Zugriffe'],
    impact: 'high',
    implementation: 'medium',
  },
  {
    id: 'validation',
    name: 'Eingabevalidierung',
    description: 'Überprüfung und Bereinigung aller Eingaben vor der Verwendung als Kontext.',
    examples: ['Formatprüfung', 'Entfernung potenziell schädlicher Inhalte', 'Validierung gegen vordefinierte Schemas'],
    impact: 'medium',
    implementation: 'medium',
  }
];

// Security risk categories
const securityRisks = [
  {
    category: 'Datenlecks',
    description: 'Unbeabsichtigte Offenlegung sensibler Informationen durch KI-Systeme.',
    risks: [
      { name: 'Prompt Injection', level: 'critical' as RiskLevel, mitigation: 'Eingabevalidierung und Escape-Sequenzen verwenden' },
      { name: 'Kontext-Extraktion', level: 'high' as RiskLevel, mitigation: 'Kontextinformationen minimieren und anonymisieren' },
      { name: 'Modell-Inferenz', level: 'medium' as RiskLevel, mitigation: 'Zugriff auf sensible Daten beschränken' }
    ]
  },
  {
    category: 'Manipulation',
    description: 'Gezielte Beeinflussung des KI-Verhaltens durch manipulierte Kontextdaten.',
    risks: [
      { name: 'Prompt Hijacking', level: 'high' as RiskLevel, mitigation: 'Strikte Validierung und Sanierung aller Eingaben' },
      { name: 'Kontext-Poisoning', level: 'high' as RiskLevel, mitigation: 'Vertrauenswürdige Kontextquellen sicherstellen' },
      { name: 'Instruction Override', level: 'critical' as RiskLevel, mitigation: 'System-Anweisungen von Benutzereingaben trennen' }
    ]
  },
  {
    category: 'Compliance-Verstöße',
    description: 'Nichteinhaltung von Datenschutzbestimmungen und Branchenstandards.',
    risks: [
      { name: 'DSGVO-Verstöße', level: 'high' as RiskLevel, mitigation: 'Datenschutz-Folgenabschätzung durchführen' },
      { name: 'Verarbeitung ohne Einwilligung', level: 'high' as RiskLevel, mitigation: 'Explizite Einwilligung für Datenverarbeitung einholen' },
      { name: 'Unzureichende Dokumentation', level: 'medium' as RiskLevel, mitigation: 'Vollständige Dokumentation der Datenverarbeitung sicherstellen' }
    ]
  },
  {
    category: 'Systemsicherheit',
    description: 'Sicherheitsrisiken auf der technischen Infrastrukturebene.',
    risks: [
      { name: 'Unzureichende API-Sicherheit', level: 'high' as RiskLevel, mitigation: 'API-Schlüssel sicher verwalten und Zugriffe beschränken' },
      { name: 'Ungeschützte Datenübertragung', level: 'medium' as RiskLevel, mitigation: 'TLS/SSL für alle Datenübertragungen verwenden' },
      { name: 'Fehlende Zugriffslogs', level: 'low' as RiskLevel, mitigation: 'Umfassende Protokollierung und Überwachung implementieren' }
    ]
  }
];

// Secure workflow steps
const secureWorkflowSteps = [
  {
    id: 'assessment',
    name: 'Risikobewertung',
    description: 'Bewertung der Sensibilität der zu verarbeitenden Daten und der potenziellen Risiken.',
    actions: [
      'Sensibilitätsgrad der Daten klassifizieren',
      'Relevante Datenschutzbestimmungen identifizieren',
      'Potenzielle Angriffsvektoren analysieren'
    ]
  },
  {
    id: 'preparation',
    name: 'Kontextvorbereitung',
    description: 'Sichere Aufbereitung der Kontextdaten vor der Verwendung in KI-Anfragen.',
    actions: [
      'Personenbezogene Daten anonymisieren',
      'Irrelevante sensible Informationen entfernen',
      'Strukturierung und Formatierung der Daten'
    ]
  },
  {
    id: 'validation',
    name: 'Eingabevalidierung',
    description: 'Überprüfung und Bereinigung aller Benutzereingaben vor der Verarbeitung.',
    actions: [
      'Eingabevalidierung gegen definierte Schemas',
      'Filterfunktionen für potenziell schädliche Inhalte',
      'Trennung von Anweisungen und Benutzereingaben'
    ]
  },
  {
    id: 'processing',
    name: 'Sichere Verarbeitung',
    description: 'Implementierung von Sicherheitsmaßnahmen während der Verarbeitung durch das KI-System.',
    actions: [
      'Zugriffskontrollen für das KI-System konfigurieren',
      'Protokollierung aller Verarbeitungsschritte',
      'Verwendung sicherer API-Verbindungen'
    ]
  },
  {
    id: 'monitoring',
    name: 'Überwachung & Audit',
    description: 'Kontinuierliche Überwachung und Überprüfung der KI-Interaktionen.',
    actions: [
      'Automatisierte Überprüfung auf Anomalien',
      'Regelmäßige Sicherheitsaudits durchführen',
      'Protokollierung aller Datenzugriffe und -änderungen'
    ]
  }
];

// Risk level color mapping - updated to be theme-aware
const getRiskLevelColor = (level: RiskLevel, isDarkMode: boolean): string => {
  switch (level) {
    case 'critical': 
      return isDarkMode 
        ? 'bg-red-900 bg-opacity-30 text-red-300 border-red-700' 
        : 'bg-red-100 text-red-800 border-red-300';
    case 'high': 
      return isDarkMode 
        ? 'bg-orange-900 bg-opacity-30 text-orange-300 border-orange-700' 
        : 'bg-orange-100 text-orange-800 border-orange-300';
    case 'medium': 
      return isDarkMode 
        ? 'bg-yellow-900 bg-opacity-30 text-yellow-300 border-yellow-700' 
        : 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'low': 
      return isDarkMode 
        ? 'bg-green-900 bg-opacity-30 text-green-300 border-green-700' 
        : 'bg-green-100 text-green-800 border-green-300';
    default: 
      return isDarkMode 
        ? 'bg-gray-800 bg-opacity-30 text-gray-300 border-gray-700' 
        : 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const DataProtectionVisualization: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Datenschutzmaßnahmen für KI-Kontext</PHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {dataProtectionMeasures.map((measure) => (
          <motion.div
            key={measure.id}
            className="rounded-lg p-4 h-full border"
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
            whileHover={{ y: -5, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start mb-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                style={{ 
                  backgroundColor: measure.impact === 'high' 
                    ? (isDarkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(219, 234, 254, 0.8)') 
                    : (isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(243, 244, 246, 0.8)'),
                  color: measure.impact === 'high' 
                    ? (isDarkMode ? '#60a5fa' : '#1e40af') 
                    : (isDarkMode ? '#9ca3af' : '#374151')
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <PHeading tag="h5" size="small" className="mb-1">{measure.name}</PHeading>
                <div className="flex gap-2 mb-2">
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(219, 234, 254, 0.8)',
                      color: isDarkMode ? '#60a5fa' : '#1e40af'
                    }}
                  >
                    Wirksamkeit: {measure.impact === 'high' ? 'Hoch' : measure.impact === 'medium' ? 'Mittel' : 'Niedrig'}
                  </span>
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(243, 244, 246, 0.8)',
                      color: isDarkMode ? '#d1d5db' : '#374151'
                    }}
                  >
                    Aufwand: {measure.implementation === 'high' ? 'Hoch' : measure.implementation === 'medium' ? 'Mittel' : 'Niedrig'}
                  </span>
                </div>
              </div>
            </div>
            
            <PText size="small" className="mb-3">{measure.description}</PText>
            
            <div>
              <PText size="small" className="font-medium mb-1">Beispiele:</PText>
              <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                {measure.examples.map((example, index) => (
                  <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{example}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SecurityRiskAssessmentMatrix: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Sicherheitsrisiko-Bewertungsmatrix</PHeading>
      
      <div 
        className="rounded-lg p-4 overflow-x-auto border"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)'
        }}
      >
        {securityRisks.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-6 last:mb-0">
            <div 
              className="p-3 mb-3 rounded-lg border-l-4"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.8)',
                borderLeftColor: isDarkMode ? '#3b82f6' : '#2563eb'
              }}
            >
              <PHeading tag="h5" size="small" className="mb-1">{category.category}</PHeading>
              <PText size="small">{category.description}</PText>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {category.risks.map((risk, riskIndex) => (
                <div 
                  key={riskIndex} 
                  className={`border rounded-lg p-3 ${getRiskLevelColor(risk.level, isDarkMode)}`}
                >
                  <div className="font-medium mb-1">{risk.name}</div>
                  <div className="flex items-center mb-2">
                    <span 
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      Risiko: {risk.level === 'critical' ? 'Kritisch' : 
                              risk.level === 'high' ? 'Hoch' : 
                              risk.level === 'medium' ? 'Mittel' : 'Niedrig'}
                    </span>
                  </div>
                  <PText size="small">{risk.mitigation}</PText>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SecureWorkflowDiagram: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Sicherer Workflow für Kontextverarbeitung</PHeading>
      
      <div 
        className="rounded-lg p-4 border"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {secureWorkflowSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center mb-4 md:mb-0">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-2"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(219, 234, 254, 0.8)',
                  color: isDarkMode ? '#60a5fa' : '#1e40af'
                }}
              >
                {index + 1}
              </div>
              <div className="text-center">
                <div className="font-medium">{step.name}</div>
                <div className="text-xs" style={{ color: 'var(--foreground-lighter)' }}>Schritt {index + 1}</div>
              </div>
              
              {index < secureWorkflowSteps.length - 1 && (
                <div 
                  className="hidden md:block w-12 h-1 absolute left-full top-8 -ml-6"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.8)' 
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {secureWorkflowSteps.map((step) => (
            <div 
              key={step.id} 
              className="rounded-lg p-4 border"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)',
                borderColor: 'var(--border-color)'
              }}
            >
              <PHeading tag="h5" size="small" className="mb-2">{step.name}</PHeading>
              <PText size="small" className="mb-3">{step.description}</PText>
              
              <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                {step.actions.map((action, actionIndex) => (
                  <li key={actionIndex} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface SecurityBestPracticesGuideProps {
  title?: string;
  description?: string;
}

const SecurityBestPracticesGuide: React.FC<SecurityBestPracticesGuideProps> = ({
  title = "Sicherheitsleitfaden für Kontextnutzung",
  description
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h3" size="medium" className="mb-2">{title}</PHeading>
      {description && <PText className="mb-6">{description}</PText>}
      
      <Tabs
        tabs={[
          {
            id: 'data-protection',
            label: 'Datenschutzmaßnahmen',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            ),
            content: <DataProtectionVisualization />
          },
          {
            id: 'risk-assessment',
            label: 'Risikobewertung',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ),
            content: <SecurityRiskAssessmentMatrix />
          },
          {
            id: 'secure-workflow',
            label: 'Sicherer Workflow',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
            content: <SecureWorkflowDiagram />
          }
        ]}
        variant="pills"
        className="mb-6"
      />
      
      <div 
        className="p-4 rounded-lg border mt-6" 
        style={{ 
          backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.2)' : 'rgba(239, 246, 255, 0.8)', 
          borderColor: isDarkMode ? 'rgba(37, 99, 235, 0.4)' : 'rgba(147, 197, 253, 0.8)' 
        }}
      >
        <PHeading tag="h4" size="small" className="mb-2">Empfehlung für Automobilanwendungen:</PHeading>
        <PText>
          In der Automobilindustrie, wo sowohl technische als auch personenbezogene Daten verarbeitet werden, 
          ist ein mehrstufiger Sicherheitsansatz entscheidend. Kombinieren Sie starke Anonymisierung mit 
          granularen Zugriffskontrollen und regelmäßigen Sicherheitsaudits. Besonderes Augenmerk sollte 
          auf der Trennung von Kundendaten, Fahrzeugdaten und technischen Spezifikationen liegen, um sowohl 
          Geschäftsgeheimnisse als auch personenbezogene Daten zu schützen.
        </PText>
      </div>
    </div>
  );
};

export default SecurityBestPracticesGuide; 