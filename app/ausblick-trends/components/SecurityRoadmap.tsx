'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import PButton from '@/components/ui/PButton';
import { useTheme } from '@/lib/themeContext';

// Security challenge/solution data
interface SecurityItem {
  year: string;
  challenges: {
    title: string;
    description: string;
    riskLevel: 'High' | 'Medium' | 'Low' | 'Very High';
  }[];
  solutions: {
    title: string;
    description: string;
    effectiveLevel: 'High' | 'Medium' | 'Low' | 'Partial';
    maturityLevel: 'Emerging' | 'Established' | 'Mature' | 'Experimental';
  }[];
}

const securityRoadmapData: SecurityItem[] = [
  {
    year: '2024',
    challenges: [
      {
        title: 'Prompt-Injection-Angriffe',
        description: 'Angreifer fügen schädliche Anweisungen in Benutzeranfragen ein, um KI-Modelle zu manipulieren.',
        riskLevel: 'High'
      },
      {
        title: 'Datenschutzverletzungen durch Modell-Extraktion',
        description: 'Trainingsdaten können aus Modellen extrahiert werden, was zu Datenschutzproblemen führt.',
        riskLevel: 'Medium'
      },
      {
        title: 'Unzureichende Zugriffskontrolle',
        description: 'Fehlende oder schwache Authentifizierung und Autorisierung für KI-Systeme.',
        riskLevel: 'High'
      }
    ],
    solutions: [
      {
        title: 'Prompt-Validierung und -Filterung',
        description: 'Implementierung von strengen Eingabevalidierungsmechanismen und Filterung potenziell schädlicher Prompts.',
        effectiveLevel: 'Medium',
        maturityLevel: 'Established'
      },
      {
        title: 'Differential Privacy',
        description: 'Verwendung von Differential-Privacy-Techniken zum Schutz sensibler Daten im Modelltraining.',
        effectiveLevel: 'Medium',
        maturityLevel: 'Emerging'
      },
      {
        title: 'Zero-Trust-Architektur',
        description: 'Implementierung von Zero-Trust-Sicherheitsmodellen für KI-Systeme mit kontinuierlicher Authentifizierung.',
        effectiveLevel: 'High',
        maturityLevel: 'Emerging'
      }
    ]
  },
  {
    year: '2025',
    challenges: [
      {
        title: 'KI-basierte Cyberangriffe',
        description: 'Zunahme von KI-gestützten Angriffsmethoden, die automatisiert Schwachstellen ausnutzen.',
        riskLevel: 'Very High'
      },
      {
        title: 'Halluzination und Fehlinformation',
        description: 'KI-Systeme erzeugen falsche oder irreführende Informationen, die für kritische Entscheidungen verwendet werden könnten.',
        riskLevel: 'High'
      },
      {
        title: 'Supply-Chain-Angriffe auf KI-Komponenten',
        description: 'Kompromittierung von KI-Modellen oder -Bibliotheken in der Lieferkette.',
        riskLevel: 'Medium'
      }
    ],
    solutions: [
      {
        title: 'KI-Sicherheits-Frameworks',
        description: 'Entwicklung spezialisierter Frameworks zur Erkennung und Abwehr von KI-basierten Angriffen.',
        effectiveLevel: 'Medium',
        maturityLevel: 'Emerging'
      },
      {
        title: 'Faktenprüfung und Konfidenzmetriken',
        description: 'Integration von automatisierten Faktenprüfungssystemen und Konfidenzmetriken in KI-Outputs.',
        effectiveLevel: 'Medium',
        maturityLevel: 'Experimental'
      },
      {
        title: 'Vertrauenswürdige KI-Lieferketten',
        description: 'Etablierung von verifizierbaren und sicheren Lieferketten für KI-Komponenten und -Modelle.',
        effectiveLevel: 'High',
        maturityLevel: 'Emerging'
      }
    ]
  },
  {
    year: '2026',
    challenges: [
      {
        title: 'Autonome KI-Bedrohungen',
        description: 'Selbstständig agierende KI-Systeme, die ohne menschliches Eingreifen Angriffe durchführen können.',
        riskLevel: 'Very High'
      },
      {
        title: 'Modell-Diebstahl und -Piraterie',
        description: 'Zunehmende Angriffe zum Diebstahl von proprietären KI-Modellen und deren unbefugte Nutzung.',
        riskLevel: 'High'
      },
      {
        title: 'Regulatorische Non-Compliance',
        description: 'Schwierigkeiten bei der Einhaltung komplexer und sich schnell entwickelnder KI-Vorschriften.',
        riskLevel: 'Medium'
      }
    ],
    solutions: [
      {
        title: 'Erweiterte KI-Sicherheitsprüfungen',
        description: 'Automatisierte und kontinuierliche Sicherheitsbewertungen für autonome KI-Systeme.',
        effectiveLevel: 'High',
        maturityLevel: 'Emerging'
      },
      {
        title: 'Wasserzeichen und Fingerabdrücke für KI',
        description: 'Fortschrittliche Techniken zum Schutz von KI-Modellen durch digitale Wasserzeichen und Fingerabdrücke.',
        effectiveLevel: 'Medium',
        maturityLevel: 'Established'
      },
      {
        title: 'KI-Compliance-Automatisierung',
        description: 'Automatisierte Tools zur Überwachung und Sicherstellung der Einhaltung von KI-Vorschriften.',
        effectiveLevel: 'High',
        maturityLevel: 'Experimental'
      }
    ]
  },
  {
    year: '2027+',
    challenges: [
      {
        title: 'Quantensichere KI',
        description: 'Neue Sicherheitsherausforderungen durch Quantencomputing für KI-Systeme.',
        riskLevel: 'Medium'
      },
      {
        title: 'Deepfake-Evolution',
        description: 'Hochentwickelte synthetische Medien, die nicht mehr von echten zu unterscheiden sind.',
        riskLevel: 'Very High'
      },
      {
        title: 'KI-Sicherheits-Wettrüsten',
        description: 'Beschleunigtes Wettrüsten zwischen Angreifern und Verteidigern mit KI-Technologien.',
        riskLevel: 'High'
      }
    ],
    solutions: [
      {
        title: 'Post-Quanten-Kryptographie für KI',
        description: 'Integration von quantensicheren kryptographischen Methoden in KI-Systeme.',
        effectiveLevel: 'High',
        maturityLevel: 'Experimental'
      },
      {
        title: 'Fortschrittliche Medien-Authentifizierung',
        description: 'KI-gestützte Systeme zur Erkennung und Verifizierung von synthetischen Medien in Echtzeit.',
        effectiveLevel: 'Medium',
        maturityLevel: 'Emerging'
      },
      {
        title: 'Selbstlernende Sicherheitssysteme',
        description: 'KI-Sicherheitssysteme, die sich kontinuierlich an neue Bedrohungen anpassen können.',
        effectiveLevel: 'High',
        maturityLevel: 'Experimental'
      }
    ]
  }
];

export default function SecurityRoadmap() {
  const [selectedYear, setSelectedYear] = useState<string>(securityRoadmapData[0].year);
  const [showChallenges, setShowChallenges] = useState<boolean>(true);
  const [showSolutions, setShowSolutions] = useState<boolean>(true);
  const { isDarkMode } = useTheme();

  const currentYearData = securityRoadmapData.find(item => item.year === selectedYear);

  // Theme-aware colors
  const riskLevelColorsThemed = {
    'Low': isDarkMode ? '#4ade80' : '#4CAF50',
    'Medium': isDarkMode ? '#fb923c' : '#FF9800',
    'High': isDarkMode ? '#f87171' : '#F44336',
    'Very High': isDarkMode ? '#c084fc' : '#9C27B0'
  };

  const effectiveLevelColorsThemed = {
    'Low': isDarkMode ? '#fcd34d' : '#FFD54F',
    'Medium': isDarkMode ? '#38bdf8' : '#4FC3F7',
    'High': isDarkMode ? '#4ade80' : '#66BB6A',
    'Partial': isDarkMode ? '#fb923c' : '#FF8A65'
  };

  const maturityLevelStylesThemed = {
    'Experimental': isDarkMode ? 'bg-purple-900 bg-opacity-30 text-purple-300' : 'bg-purple-100 text-purple-800',
    'Emerging': isDarkMode ? 'bg-blue-900 bg-opacity-30 text-blue-300' : 'bg-blue-100 text-blue-800',
    'Established': isDarkMode ? 'bg-green-900 bg-opacity-30 text-green-300' : 'bg-green-100 text-green-800',
    'Mature': isDarkMode ? 'bg-gray-800 bg-opacity-50 text-gray-300' : 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="rounded-lg shadow-sm p-6" style={{ 
      backgroundColor: 'var(--card-bg)', 
      borderColor: 'var(--border-color)',
      border: '1px solid var(--border-color)'
    }}>
      <div className="mb-6">
        <PHeading tag="h3" size="medium" className="mb-4">
          KI-Sicherheitsroadmap 2024-2027+
        </PHeading>
        <PText className="mb-4">
          Diese Roadmap zeigt die Entwicklung von Sicherheitsherausforderungen im KI-Bereich und entsprechende 
          Lösungsansätze über die kommenden Jahre. Wählen Sie ein Jahr, um die spezifischen Herausforderungen
          und Lösungen zu sehen.
        </PText>
      </div>

      {/* Timeline Navigation */}
      <div className="flex items-center justify-between mb-8 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex space-x-1">
          {securityRoadmapData.map((item) => (
            <button
              key={item.year}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors`}
              style={{
                backgroundColor: selectedYear === item.year 
                  ? (isDarkMode ? '#3b82f6' : '#3b82f6') 
                  : (isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)'),
                color: selectedYear === item.year 
                  ? 'white' 
                  : (isDarkMode ? 'rgba(229, 231, 235, 0.8)' : 'rgba(55, 65, 81, 0.9)')
              }}
              onClick={() => setSelectedYear(item.year)}
            >
              {item.year}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <PButton
            variant={showChallenges ? "primary" : "secondary"}
            onClick={() => setShowChallenges(!showChallenges)}
          >
            Herausforderungen
          </PButton>
          <PButton
            variant={showSolutions ? "primary" : "secondary"} 
            onClick={() => setShowSolutions(!showSolutions)}
          >
            Lösungsansätze
          </PButton>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Challenges */}
        {showChallenges && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="col-span-1"
          >
            <div className="mb-4">
              <PHeading tag="h4" size="small" className="mb-2">
                Sicherheitsherausforderungen {selectedYear}
              </PHeading>
              <PText size="small">
                Aktuelle und erwartete Sicherheitsrisiken im Bereich der KI-Technologie.
              </PText>
            </div>
            
            <div className="space-y-4">
              {currentYearData?.challenges.map((challenge, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'white',
                    border: '1px solid var(--border-color)' 
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <PHeading tag="h5" size="small">{challenge.title}</PHeading>
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: isDarkMode 
                          ? `${riskLevelColorsThemed[challenge.riskLevel]}33` 
                          : `${riskLevelColorsThemed[challenge.riskLevel]}22`,
                        color: riskLevelColorsThemed[challenge.riskLevel]
                      }}
                    >
                      {challenge.riskLevel}
                    </span>
                  </div>
                  <PText size="small">{challenge.description}</PText>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Solutions */}
        {showSolutions && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="col-span-1"
          >
            <div className="mb-4">
              <PHeading tag="h4" size="small" className="mb-2">
                Sicherheitslösungen {selectedYear}
              </PHeading>
              <PText size="small">
                Entwickelte und angestrebte Lösungsansätze für KI-Sicherheitsherausforderungen.
              </PText>
            </div>
            
            <div className="space-y-4">
              {currentYearData?.solutions.map((solution, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'white',
                    border: '1px solid var(--border-color)' 
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <PHeading tag="h5" size="small">{solution.title}</PHeading>
                    <div className="flex space-x-2">
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: isDarkMode 
                            ? `${effectiveLevelColorsThemed[solution.effectiveLevel]}33` 
                            : `${effectiveLevelColorsThemed[solution.effectiveLevel]}22`,
                          color: effectiveLevelColorsThemed[solution.effectiveLevel]
                        }}
                      >
                        {solution.effectiveLevel}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${maturityLevelStylesThemed[solution.maturityLevel]}`}>
                        {solution.maturityLevel}
                      </span>
                    </div>
                  </div>
                  <PText size="small">{solution.description}</PText>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 