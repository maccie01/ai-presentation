"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import InfoCard from '@/components/ui/InfoCard';
import Tabs from '@/components/ui/Tabs';
import { useTheme } from '@/lib/themeContext';

// Memory types with descriptions and properties
const memoryTypes = [
  {
    id: 'short-term',
    name: 'Kurzzeit-Speicher',
    description: 'Temporärer Speicher für aktuelle Konversationen oder Sitzungsinformationen.',
    characteristics: [
      'Begrenzte Lebensdauer (typischerweise eine Sitzung)',
      'Hohe Zugriffsgeschwindigkeit',
      'Beschränkte Kapazität',
      'Ideal für aktuelle Konversationskontexte'
    ],
    examples: [
      'Konversationsverlauf der aktuellen Sitzung',
      'Temporäre Benutzereinstellungen',
      'Zwischenergebnisse von mehrstufigen Prozessen'
    ],
    limitations: [
      'Geht nach Sitzungsende verloren',
      'Nicht für langfristige Speicherung geeignet',
      'Begrenzte Kapazität (Token-Limitierung)'
    ]
  },
  {
    id: 'long-term',
    name: 'Langzeit-Speicher',
    description: 'Persistenter Speicher für Benutzerpräferenzen, Wissen und übergreifende Informationen.',
    characteristics: [
      'Persistente Speicherung über Sitzungen hinweg',
      'Strukturierte Organisation von Informationen',
      'Skalierbare Kapazität',
      'Für personalisierte Benutzererfahrungen konzipiert'
    ],
    examples: [
      'Benutzerprofile und Präferenzen',
      'Domänenspezifisches Wissen',
      'Projekt- oder kundenspezifische Informationen',
      'Trainierte Embeddings für semantische Suche'
    ],
    limitations: [
      'Komplexere Implementierung erforderlich',
      'Höhere Kosten für Speicherung und Verarbeitung',
      'Erfordert regelmäßige Wartung und Aktualisierung'
    ]
  },
  {
    id: 'episodic',
    name: 'Episodischer Speicher',
    description: 'Speicher für spezifische Interaktionen oder Ereignisse, organisiert nach zeitlichen Episoden.',
    characteristics: [
      'Chronologische Organisation von Informationen',
      'Kontextbezogene Speicherung von Interaktionen',
      'Ermöglicht zeitliche Abfragen und Analysen'
    ],
    examples: [
      'Verlauf von Kundensupportanfragen',
      'Protokollierung von Fahrzeugdiagnosen',
      'Zeitliche Sequenz von Projektereignissen'
    ],
    limitations: [
      'Kann schnell große Datenmengen erzeugen',
      'Erfordert effiziente Indizierung und Suche',
      'Muss mit Datenschutzrichtlinien konform sein'
    ]
  },
  {
    id: 'semantic',
    name: 'Semantischer Speicher',
    description: 'Bedeutungsbasierter Speicher für konzeptuelle Informationen und Wissensrepräsentation.',
    characteristics: [
      'Organisation nach semantischer Ähnlichkeit',
      'Konzeptbasierte Speicherung',
      'Unterstützt komplexe Abfragen und Inferenzen'
    ],
    examples: [
      'Vektorbasierte Wissensdatenbanken',
      'Ontologien für Domänenwissen',
      'Semantische Netze für Fahrzeugkomponenten'
    ],
    limitations: [
      'Komplex in der Implementierung',
      'Rechenintensiv für große Datenmengen',
      'Qualität abhängig von Embedding-Modellen'
    ]
  }
];

// Memory retrieval flow stages
const retrievalStages = [
  {
    id: 'query',
    name: 'Anfrageverarbeitung',
    description: 'Analyse der Benutzeranfrage zur Identifikation relevanter Memory-Informationen.',
    substeps: [
      'Extraktion von Schlüsselkonzepten',
      'Identifikation von Zeitbezügen',
      'Erkennung von Entitäten und Beziehungen'
    ]
  },
  {
    id: 'search',
    name: 'Speichersuche',
    description: 'Durchsuchen verschiedener Memory-Typen nach relevanten Informationen.',
    substeps: [
      'Suche im Konversationskontext (Kurzzeit)',
      'Abfrage persistenter Daten (Langzeit)',
      'Semantische Ähnlichkeitssuche'
    ]
  },
  {
    id: 'relevance',
    name: 'Relevanzfilterung',
    description: 'Bewertung und Filterung der gefundenen Informationen nach Relevanz.',
    substeps: [
      'Berechnung von Relevanzscores',
      'Zeitliche Priorisierung',
      'Kontextuelle Filterung'
    ]
  },
  {
    id: 'integration',
    name: 'Kontextintegration',
    description: 'Zusammenführung relevanter Informationen zur Anreicherung des Anfragekontexts.',
    substeps: [
      'Strukturierte Zusammenstellung',
      'Token-Optimierung',
      'Formatierung für Prompt-Integration'
    ]
  },
  {
    id: 'application',
    name: 'Anwendung',
    description: 'Nutzung des angereicherten Kontexts für die KI-Anfrage.',
    substeps: [
      'Integration in den Prompt',
      'Gewichtung des Memory-Kontexts',
      'Generierung der Antwort'
    ]
  }
];

// Memory architecture components
const architectureComponents = [
  {
    id: 'input',
    name: 'Eingabe-Verarbeitung',
    description: 'Verarbeitet Benutzeranfragen und -interaktionen.',
    subcomponents: [
      'Anfrageverarbeitung',
      'Entitätserkennung',
      'Intentionserkennung'
    ]
  },
  {
    id: 'memory-store',
    name: 'Speicher-Repository',
    description: 'Speichert verschiedene Arten von Memory-Informationen.',
    subcomponents: [
      'Kurzzeitspeicher (Konversation)',
      'Langzeitspeicher (Benutzer/Domäne)',
      'Vektorbasierte Speicher (Semantik)'
    ]
  },
  {
    id: 'retrieval',
    name: 'Abruf-Engine',
    description: 'Identifiziert und ruft relevante Informationen ab.',
    subcomponents: [
      'Semantische Suche',
      'Relevanzberechnung',
      'Kontextuelle Filterung'
    ]
  },
  {
    id: 'context',
    name: 'Kontext-Manager',
    description: 'Verwaltet den Kontext für KI-Anfragen.',
    subcomponents: [
      'Kontext-Zusammenstellung',
      'Token-Optimierung',
      'Prioritätsmanagement'
    ]
  },
  {
    id: 'llm',
    name: 'LLM-Integration',
    description: 'Verbindet Memory-System mit dem KI-Modell.',
    subcomponents: [
      'Prompt-Engineering',
      'Antwortverarbeitung',
      'Feedback-Verarbeitung'
    ]
  },
  {
    id: 'management',
    name: 'Memory-Management',
    description: 'Verwaltet und optimiert die Memory-Komponenten.',
    subcomponents: [
      'Speicherbereinigung',
      'Aktualisierungsstrategien',
      'Datenschutzkontrollen'
    ]
  }
];

const MemoryComparison: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Kurzzeit- vs. Langzeit-Memory-Vergleich</PHeading>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {memoryTypes.slice(0, 2).map((memoryType) => (
          <motion.div
            key={memoryType.id}
            className="rounded-lg overflow-hidden border"
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
            whileHover={{ y: -5, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          >
            <div className={`p-4`} style={{ 
              backgroundColor: memoryType.id === 'short-term' 
                ? (isDarkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(219, 234, 254, 0.8)')
                : (isDarkMode ? 'rgba(67, 56, 202, 0.3)' : 'rgba(224, 231, 255, 0.8)')
            }}>
              <PHeading tag="h5" size="small">{memoryType.name}</PHeading>
              <PText size="small">{memoryType.description}</PText>
            </div>
            
            <div className="p-4">
              <div className="mb-3">
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Eigenschaften:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {memoryType.characteristics.map((characteristic, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{characteristic}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-3">
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Beispiele:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {memoryType.examples.map((example, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{example}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Einschränkungen:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {memoryType.limitations.map((limitation, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="rounded-lg p-4 border mb-6" style={{ 
        backgroundColor: isDarkMode ? 'rgba(234, 179, 8, 0.1)' : 'rgba(254, 252, 232, 0.8)',
        borderColor: isDarkMode ? 'rgba(234, 179, 8, 0.3)' : 'rgba(250, 204, 21, 0.4)'
      }}>
        <PHeading tag="h5" size="small" className="mb-2">Anwendungsfallbasierte Auswahl</PHeading>
        <PText>
          Die Wahl zwischen Kurzzeit- und Langzeit-Memory hängt vom spezifischen Anwendungsfall ab:
          <ul className="list-disc pl-5 mt-2" style={{ color: 'var(--foreground)' }}>
            <li className="mb-1">
              <strong>Kurzzeit-Memory:</strong> Ideal für kontextuelle Konversationen und temporäre Interaktionen.
            </li>
            <li className="mb-1">
              <strong>Langzeit-Memory:</strong> Geeignet für personalisierte Erfahrungen und domänenspezifisches Wissen.
            </li>
            <li>
              <strong>Kombinierter Ansatz:</strong> Oft ist eine Kombination beider Speichertypen am effektivsten, 
              wobei kurzzeitige Interaktionen mit langfristigem Wissen angereichert werden.
            </li>
          </ul>
        </PText>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {memoryTypes.slice(2).map((memoryType) => (
          <motion.div
            key={memoryType.id}
            className="rounded-lg overflow-hidden border"
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
            whileHover={{ y: -5, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          >
            <div className={`p-4`} style={{ 
              backgroundColor: memoryType.id === 'episodic' 
                ? (isDarkMode ? 'rgba(126, 34, 206, 0.3)' : 'rgba(243, 232, 255, 0.8)')
                : (isDarkMode ? 'rgba(6, 95, 70, 0.3)' : 'rgba(209, 250, 229, 0.8)')
            }}>
              <PHeading tag="h5" size="small">{memoryType.name}</PHeading>
              <PText size="small">{memoryType.description}</PText>
            </div>
            
            <div className="p-4">
              <div className="mb-3">
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Eigenschaften:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {memoryType.characteristics.map((characteristic, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{characteristic}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-3">
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Beispiele:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {memoryType.examples.map((example, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{example}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Einschränkungen:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {memoryType.limitations.map((limitation, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MemoryRetrievalFlow: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  const steps = [
    {
      id: 'query',
      title: 'Benutzeranfrage',
      description: 'Eine neue Anfrage vom Benutzer wird empfangen und analysiert.',
      details: 'Die eingehende Benutzeranfrage wird verarbeitet, um Schlüsselkonzepte und Absichten zu extrahieren. Diese werden verwendet, um relevante Erinnerungen abzurufen.'
    },
    {
      id: 'retrieval',
      title: 'Memory-Abruf',
      description: 'Relevante Erinnerungen werden aus dem Memory-Speicher abgerufen.',
      details: 'Basierend auf der Anfrage werden verschiedene Memory-Typen durchsucht (Kurzzeit, Langzeit, Episodisch, Semantisch). Der Abruf kann verschiedene Strategien nutzen: semantische Suche, Zeitbasis, Tags oder direkter ID-Zugriff.'
    },
    {
      id: 'ranking',
      title: 'Relevanz-Bewertung',
      description: 'Erinnerungen werden nach Relevanz für die aktuelle Anfrage bewertet und priorisiert.',
      details: 'Die abgerufenen Erinnerungen werden nach Relevanz für die aktuelle Anfrage, Aktualität, Wichtigkeit und Zuverlässigkeit bewertet. Nur die relevantesten Erinnerungen werden für den nächsten Schritt ausgewählt.'
    },
    {
      id: 'integration',
      title: 'Prompt-Integration',
      description: 'Ausgewählte Erinnerungen werden in den Prompt integriert.',
      details: 'Die bewerteten und ausgewählten Erinnerungen werden in den Kontext des LLM-Prompts integriert. Dies kann durch direktes Einfügen oder durch strukturierte Formatierung erfolgen, je nach gewünschtem Einfluss auf die Antwort.'
    },
    {
      id: 'response',
      title: 'Antwortgenerierung',
      description: 'Das LLM generiert eine Antwort basierend auf Anfrage und kontextuellen Erinnerungen.',
      details: 'Das Sprachmodell erzeugt eine Antwort, die sowohl auf der ursprünglichen Anfrage als auch auf den bereitgestellten Memory-Informationen basiert. Die Antwort kann Referenzen zu vergangenen Interaktionen enthalten oder personalisierte Informationen basierend auf gespeicherten Daten.'
    },
    {
      id: 'update',
      title: 'Memory-Aktualisierung',
      description: 'Neue Informationen aus der aktuellen Interaktion werden im Memory-Speicher aktualisiert.',
      details: 'Die aktuelle Interaktion wird analysiert, und relevante Informationen werden im Memory-Speicher abgelegt. Dies kann neue Fakten, Benutzervorlieben oder wichtige Dialogelemente umfassen, die für zukünftige Interaktionen relevant sein könnten.'
    }
  ];
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Memory Abrufprozess</PHeading>
      
      <div className="mb-6 rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.2)' : 'rgba(219, 234, 254, 0.8)', 
        borderColor: isDarkMode ? 'rgba(37, 99, 235, 0.4)' : 'rgba(191, 219, 254, 0.8)'
      }}>
        <PText>
          Der Memory-Abrufprozess umfasst mehrere Schritte, von der Anfrage über das Retrieval und die Bewertung 
          bis hin zur Integration in den Prompt. Dieser zyklische Prozess ermöglicht kontextbewusste und 
          personalisierte Antworten basierend auf gespeicherten Informationen. Klicken Sie auf die einzelnen 
          Schritte, um mehr Details zu erfahren.
        </PText>
      </div>
      
      {/* Flow visualization - fixed to prevent overlay issues */}
      <div className="flex flex-col items-center mb-6 relative overflow-hidden">
        <div className="w-full max-w-3xl" style={{ position: 'relative', zIndex: 1 }}>
          {/* Flow lines */}
          <svg className="absolute top-0 left-0 w-full h-full" style={{ 
            zIndex: 0, 
            stroke: isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.8)',
            strokeWidth: 2,
            overflow: 'visible'
          }}>
            <path 
              d="M100,50 C150,50 150,150 200,150 C250,150 250,50 300,50 C350,50 350,150 400,150 C450,150 450,50 500,50 C550,50 550,150 600,150"
              fill="none" 
              strokeDasharray="5,5"
            />
          </svg>
          
          {/* Process steps */}
          <div className="relative flex flex-wrap justify-around py-8 gap-y-12" style={{ zIndex: 2 }}>
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`z-10 w-24 flex flex-col items-center cursor-pointer`}
                onClick={() => setSelectedStep(step.id === selectedStep ? null : step.id)}
                whileHover={{ y: -3 }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-2`}
                  style={{ 
                    backgroundColor: selectedStep === step.id 
                      ? (isDarkMode ? '#3b82f6' : '#2563eb')
                      : (isDarkMode ? 'rgba(31, 41, 55, 0.5)' : '#e5e7eb'),
                    color: selectedStep === step.id 
                      ? 'white' 
                      : (isDarkMode ? 'rgba(229, 231, 235, 0.9)' : 'black'),
                    border: `2px solid ${selectedStep === step.id 
                      ? (isDarkMode ? '#60a5fa' : '#3b82f6')
                      : (isDarkMode ? 'rgba(75, 85, 99, 0.5)' : '#d1d5db')}`,
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {index + 1}
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>{step.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Selected step details */}
      {selectedStep && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 rounded-lg p-4 border"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)',
            borderColor: 'var(--border-color)'
          }}
        >
          <PHeading tag="h5" size="small" className="mb-2">
            {steps.find(s => s.id === selectedStep)?.title}
          </PHeading>
          <PText>
            {steps.find(s => s.id === selectedStep)?.details}
          </PText>
        </motion.div>
      )}
      
      <div 
        className="rounded-lg p-4 border"
        style={{ 
          backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.2)' : 'rgba(219, 234, 254, 0.8)', 
          borderColor: isDarkMode ? 'rgba(37, 99, 235, 0.4)' : 'rgba(191, 219, 254, 0.8)'
        }}
      >
        <PHeading tag="h5" size="small" className="mb-2">Automotive-Anwendungsfall: Diagnose-Memory</PHeading>
        <PText>
          In Fahrzeugdiagnosesystemen kann dieser Abrufprozess genutzt werden, um:
          <ul className="list-disc pl-5 mt-2" style={{ color: 'var(--foreground)' }}>
            <li>Frühere Diagnoseergebnisse für dasselbe Fahrzeug oder ähnliche Modelle abzurufen</li>
            <li>Häufige Fehlermuster und erfolgreiche Lösungsansätze zu identifizieren</li>
            <li>Serviceverlauf und Fahrergewohnheiten in die Fehlerdiagnose zu integrieren</li>
            <li>Personalisierte Empfehlungen basierend auf früheren Präferenzen zu erstellen</li>
          </ul>
        </PText>
      </div>
    </div>
  );
};

const MemoryArchitectureDiagram: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const { isDarkMode } = useTheme();
  
  const getComponentStyle = (componentId: string) => {
    const isSelected = selectedComponent === componentId;
    return {
      backgroundColor: isSelected 
        ? isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(191, 219, 254, 0.8)'
        : isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)',
      borderColor: isSelected 
        ? isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)'
        : 'var(--border-color)',
      color: 'var(--foreground)'
    };
  };
  
  const componentInfo = {
    'user-interface': {
      title: 'Benutzerschnittstelle',
      description: 'Die Frontend-Komponente, die Benutzerinteraktionen verarbeitet und Anfragen an das Memory-System weiterleitet.',
      responsibilities: [
        'Erfassung von Benutzeranfragen',
        'Anzeige von Antworten mit Kontext',
        'Bereitstellung von Feedback-Mechanismen',
        'Benutzerfreundliche Darstellung von Memory-Informationen'
      ]
    },
    'prompt-manager': {
      title: 'Prompt-Manager',
      description: 'Verantwortlich für die Integration von Memory-Informationen in LLM-Prompts und die Verwaltung von Prompt-Vorlagen.',
      responsibilities: [
        'Strukturierung von Prompts mit Memory-Kontext',
        'Auswahl geeigneter Prompt-Vorlagen',
        'Priorisierung von Memory-Informationen',
        'Steuerung des Memory-Einflusses auf Antworten'
      ]
    },
    'context': {
      title: 'Kontext-Manager',
      description: 'Verwaltet den aktuellen Konversationskontext und Umgebungsinformationen für relevante Memory-Abrufe.',
      responsibilities: [
        'Verfolgung des Konversationsverlaufs',
        'Verwaltung von Sitzungskontext',
        'Identifizierung relevanter Kontextfaktoren',
        'Zusammenführung von Kontext und Memory'
      ]
    },
    'memory-store': {
      title: 'Speicher-Repository',
      description: 'Hauptspeicherkomponente, die verschiedene Memory-Typen und deren persistente Speicherung verwaltet.',
      responsibilities: [
        'Organisation von Memory nach Typen und Relevanz',
        'Persistente Speicherung wichtiger Informationen',
        'Effiziente Indizierung für schnellen Zugriff',
        'Datenschutz und Sicherheitsmaßnahmen'
      ]
    },
    'retrieval': {
      title: 'Abruf-Engine',
      description: 'Kern-Engine für die Suche und den Abruf relevanter Memory-Einträge basierend auf Anfragen.',
      responsibilities: [
        'Implementierung verschiedener Suchstrategien',
        'Relevanzbewertung und Ranking',
        'Optimierung der Abrufgeschwindigkeit',
        'Handhabung verschiedener Memory-Formate'
      ]
    }
  };
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Memory-System Architektur</PHeading>
      
      <div className="mb-6 rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.2)' : 'rgba(219, 234, 254, 0.8)', 
        borderColor: isDarkMode ? 'rgba(37, 99, 235, 0.4)' : 'rgba(191, 219, 254, 0.8)'
      }}>
        <PText>
          Die Architektur eines Memory-Systems besteht aus mehreren Komponenten, die zusammenarbeiten, 
          um Informationen zu speichern, abzurufen und in KI-Interaktionen zu integrieren. 
          Klicken Sie auf die einzelnen Komponenten, um deren Funktion und Verantwortlichkeiten zu verstehen.
        </PText>
      </div>
      
      {/* Architecture diagram */}
      <div className="w-full bg-gradient-to-b from-transparent to-transparent rounded-lg p-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          {/* Top row - User Interface */}
          <div className="col-start-2">
            <motion.div
              className={`p-3 rounded-lg border cursor-pointer text-center`}
              style={getComponentStyle('user-interface')}
              whileHover={{ y: -2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
              onClick={() => setSelectedComponent('user-interface')}
            >
              <div className="font-medium">Benutzerschnittstelle</div>
            </motion.div>
          </div>
          
          {/* Second row - Prompt Manager */}
          <div>
            <motion.div
              className={`p-3 rounded-lg border cursor-pointer text-center`}
              style={getComponentStyle('prompt-manager')}
              whileHover={{ y: -2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
              onClick={() => setSelectedComponent('prompt-manager')}
            >
              <div className="font-medium">Prompt-Manager</div>
            </motion.div>
          </div>
          
          {/* Empty middle cell with arrows */}
          <div className="flex items-center justify-center">
            <svg width="100" height="80" viewBox="0 0 100 80">
              <path d="M50,0 L50,80" 
                stroke={isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.8)'} 
                strokeWidth="2" 
                fill="none" 
                strokeDasharray="4 4" 
              />
              <path d="M0,40 L100,40" 
                stroke={isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.8)'} 
                strokeWidth="2" 
                fill="none" 
                strokeDasharray="4 4" 
              />
            </svg>
          </div>
          
          {/* Second row - Context Manager */}
          <div>
            <motion.div
              className={`p-3 rounded-lg border cursor-pointer text-center`}
              style={getComponentStyle('context')}
              whileHover={{ y: -2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
              onClick={() => setSelectedComponent('context')}
            >
              <div className="font-medium">Kontext-Manager</div>
            </motion.div>
          </div>
          
          {/* Memory Store & Retrieval (Row 4) */}
          <div>
            <motion.div
              className={`p-3 rounded-lg border cursor-pointer text-center h-full flex items-center justify-center`}
              style={getComponentStyle('memory-store')}
              whileHover={{ y: -2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
              onClick={() => setSelectedComponent('memory-store')}
            >
              <div className="font-medium">Speicher-Repository</div>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              className={`p-3 rounded-lg border cursor-pointer text-center h-full flex items-center justify-center`}
              style={getComponentStyle('retrieval')}
              whileHover={{ y: -2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
              onClick={() => setSelectedComponent('retrieval')}
            >
              <div className="font-medium">Abruf-Engine</div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Selected component details */}
      {selectedComponent && componentInfo[selectedComponent as keyof typeof componentInfo] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 p-4 rounded-lg border"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)',
            borderColor: 'var(--border-color)'
          }}
        >
          <PHeading tag="h5" size="small" className="mb-2">
            {componentInfo[selectedComponent as keyof typeof componentInfo].title}
          </PHeading>
          <PText className="mb-3">
            {componentInfo[selectedComponent as keyof typeof componentInfo].description}
          </PText>
          <div>
            <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Verantwortlichkeiten:</div>
            <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
              {componentInfo[selectedComponent as keyof typeof componentInfo].responsibilities.map((resp, index) => (
                <li key={index} className="mb-1" style={{ color: 'var(--foreground-lighter)' }}>{resp}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
      
      <div className="rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(6, 78, 59, 0.1)' : 'rgba(236, 253, 245, 0.8)',
        borderColor: isDarkMode ? 'rgba(6, 78, 59, 0.4)' : 'rgba(167, 243, 208, 0.8)'
      }}>
        <PHeading tag="h5" size="small" className="mb-2">Implementierungshinweis</PHeading>
        <PText>
          Für Automotive-Anwendungen ist ein modularer Architekturansatz zu empfehlen, der:
          <ul className="list-disc pl-5 mt-2" style={{ color: 'var(--foreground)' }}>
            <li>Eine klare Trennung von Speicherung und Abruflogik ermöglicht</li>
            <li>Verschiedene Memory-Typen für unterschiedliche Anforderungen unterstützt</li>
            <li>Datenschutz durch granulare Zugriffskontrollen gewährleistet</li>
            <li>Optimierung für spezifische Automotive-Kontexte (Diagnose, Navigation, Benutzerkomfort) ermöglicht</li>
          </ul>
        </PText>
      </div>
    </div>
  );
};

interface MemoryConceptVisualizationProps {
  title?: string;
  description?: string;
}

const MemoryConceptVisualization: React.FC<MemoryConceptVisualizationProps> = ({
  title = "Memory-Konzepte für KI-Systeme",
  description
}) => {
  return (
    <div className="w-full">
      <PHeading tag="h3" size="medium" className="mb-2">{title}</PHeading>
      {description && <PText className="mb-6">{description}</PText>}
      
      <Tabs
        tabs={[
          {
            id: 'memory-comparison',
            label: 'Memory-Typen',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            ),
            content: <MemoryComparison />
          },
          {
            id: 'retrieval-flow',
            label: 'Abruf-Prozess',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ),
            content: <MemoryRetrievalFlow />
          },
          {
            id: 'architecture',
            label: 'Architektur',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            ),
            content: <MemoryArchitectureDiagram />
          }
        ]}
        variant="pills"
        className="mb-6"
      />
      
      <InfoCard
        title="Automotive-Anwendung: Fahrzeugdiagnose-Memory"
        variant="info"
      >
        <PText className="mb-3">
          In Automotive-Anwendungen kann Memory-Funktionalität besonders wertvoll sein:
        </PText>
        <ul className="list-disc pl-5 mb-3">
          <li className="mb-1">
            <strong>Fahrzeughistorie:</strong> Langzeit-Memory für Wartungshistorie, frühere Diagnosen und Fahrzeugdaten.
          </li>
          <li className="mb-1">
            <strong>Diagnose-Sessions:</strong> Kurzzeit-Memory für aktuelle Diagnosesitzungen und Messwerte.
          </li>
          <li className="mb-1">
            <strong>Komponentenwissen:</strong> Semantischer Memory für technische Dokumentation und Ersatzteilkataloge.
          </li>
          <li className="mb-1">
            <strong>Personalisierung:</strong> Langzeit-Memory für Fahrerpräferenzen und häufig genutzte Funktionen.
          </li>
        </ul>
        <PText>
          Die Kombination dieser Memory-Typen ermöglicht intelligente Assistenzsysteme, die sowohl den Fahrzeugkontext 
          als auch die Historie des Fahrzeugs für präzise und relevante Unterstützung nutzen können.
        </PText>
      </InfoCard>
    </div>
  );
};

export default MemoryConceptVisualization; 