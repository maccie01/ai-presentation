"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import InfoCard from '@/components/ui/InfoCard';
import Tabs from '@/components/ui/Tabs';
import { useTheme } from '@/lib/themeContext';

// Chunking strategies with descriptions and use cases
const chunkingStrategies = [
  {
    id: 'fixed-size',
    name: 'Feste Größe',
    description: 'Teilt Daten in Blöcke fester Größe, unabhängig vom Inhalt.',
    pros: [
      'Einfache Implementierung',
      'Vorhersehbare Token-Nutzung',
      'Gleichmäßige Verarbeitung'
    ],
    cons: [
      'Kann relevante Informationen trennen',
      'Nicht kontextsensitiv',
      'Möglicherweise redundante Grenzen'
    ],
    useCase: 'Geeignet für homogene Daten mit ähnlicher Struktur und Informationsdichte.'
  },
  {
    id: 'semantic',
    name: 'Semantische Grenzen',
    description: 'Teilt Daten basierend auf semantischen Einheiten wie Absätzen, Abschnitten oder Konzepten.',
    pros: [
      'Respektiert inhaltliche Grenzen',
      'Erhält zusammenhängende Informationen',
      'Verbessert Retrieval-Qualität'
    ],
    cons: [
      'Komplexere Implementierung',
      'Ungleichmäßige Chunk-Größen',
      'Abhängig von Qualität der Grenzerkennung'
    ],
    useCase: 'Ideal für strukturierte Dokumente, technische Dokumentation und Inhalte mit klaren thematischen Abschnitten.'
  },
  {
    id: 'hybrid',
    name: 'Hybride Methode',
    description: 'Verwendet semantische Grenzen, respektiert aber maximale Größenlimits für jeden Chunk.',
    pros: [
      'Balanciert Semantik und Größenbeschränkungen',
      'Vermeidet Überschreitung von Token-Limits',
      'Flexibel anpassbar'
    ],
    cons: [
      'Höhere Komplexität als einzelne Methoden',
      'Erfordert Kalibrierung und Anpassung',
      'Größere Implementierungsaufwand'
    ],
    useCase: 'Empfohlen für die meisten Produktionsanwendungen, besonders für heterogene Dokumente und Wissensbasen.'
  },
  {
    id: 'recursion',
    name: 'Rekursives Chunking',
    description: 'Erstellt hierarchische Chunks durch rekursive Unterteilung nach semantischen und strukturellen Merkmalen.',
    pros: [
      'Erstellt hierarchische Informationsstruktur',
      'Ermöglicht mehrstufiges Retrieval',
      'Optimal für komplexe Dokumente'
    ],
    cons: [
      'Höchste Implementierungskomplexität',
      'Rechenintensiver',
      'Benötigt spezielle Retrieval-Strategien'
    ],
    useCase: 'Besonders wirksam für lange, komplexe Dokumente mit hierarchischer Struktur wie technische Handbücher, wissenschaftliche Arbeiten oder umfassende Dokumentationen.'
  }
];

// Semantic organization methods
const semanticOrganizationMethods = [
  {
    id: 'vector-db',
    name: 'Vektordatenbank',
    description: 'Speichert Embeddings für semantische Suche und ähnlichkeitsbasiertes Retrieval.',
    components: [
      'Embedding-Generierung',
      'Vektorspeicher',
      'Ähnlichkeitssuche',
      'Metadaten-Management'
    ],
    examples: [
      'Pinecone',
      'Weaviate',
      'Qdrant',
      'Chroma',
      'Milvus'
    ],
    advantages: [
      'Schnelles semantisches Retrieval',
      'Skalierbar für große Datenmengen',
      'Unterstützt komplexe semantische Abfragen'
    ]
  },
  {
    id: 'knowledge-graph',
    name: 'Wissensgraph',
    description: 'Strukturiert Informationen als Graphen mit Entitäten und Beziehungen.',
    components: [
      'Entitätsextraktion',
      'Beziehungsmodellierung',
      'Graphdatenbank',
      'Inferenzengine'
    ],
    examples: [
      'Neo4j',
      'Amazon Neptune',
      'TigerGraph',
      'Azure Cosmos DB Gremlin API'
    ],
    advantages: [
      'Explizite Beziehungsmodellierung',
      'Unterstützt komplexe Abfragen und Traversierung',
      'Ideal für vernetzte Information'
    ]
  },
  {
    id: 'hybrid-approach',
    name: 'Hybrider Ansatz',
    description: 'Kombiniert Vektordatenbanken mit Graph- oder relationalen Strukturen.',
    components: [
      'Embedding-Speicher',
      'Strukturierte Metadaten',
      'Graphkomponenten',
      'Hybrid-Retrieval-Engine'
    ],
    examples: [
      'LangChain mit kombiniertem Retrieval',
      'Vektordatenbank mit GraphQL-Schicht',
      'Benutzerdefinierte Lösungen mit mehreren Backends'
    ],
    advantages: [
      'Verbindet Stärken verschiedener Ansätze',
      'Flexible Abfragemöglichkeiten',
      'Kontextsensitives Retrieval'
    ]
  }
];

// Memory hierarchy levels
const memoryHierarchyLevels = [
  {
    id: 'session',
    name: 'Sitzungskontext',
    level: 1,
    scope: 'Aktuelle Konversation',
    retention: 'Kurzfristig (Sitzungsdauer)',
    examples: [
      'Aktuelle Nachrichten in der Konversation',
      'Temporäre Benutzerabsichten',
      'Unmittelbarer Dialogkontext'
    ],
    usage: 'Direkt in jeden Prompt eingebunden, um Konsistenz innerhalb einer Sitzung zu gewährleisten.'
  },
  {
    id: 'user',
    name: 'Benutzerkontext',
    level: 2,
    scope: 'Benutzerspezifische Informationen',
    retention: 'Mittelfristig bis langfristig',
    examples: [
      'Benutzereinstellungen und Präferenzen',
      'Frühere Anfragen und Interaktionen',
      'Personalisierte Anpassungen'
    ],
    usage: 'Selektiv basierend auf Relevanz eingebunden, um personalisierte Erfahrungen zu ermöglichen.'
  },
  {
    id: 'domain',
    name: 'Domänenkontext',
    level: 3,
    scope: 'Fachspezifisches Wissen',
    retention: 'Langfristig',
    examples: [
      'Technische Dokumentation',
      'Produktspezifikationen',
      'Branchenspezifische Informationen'
    ],
    usage: 'Nach Bedarf durch semantische Suche abgerufen, um domänenspezifische Antworten zu liefern.'
  },
  {
    id: 'organizational',
    name: 'Organisationskontext',
    level: 4,
    scope: 'Unternehmensweites Wissen',
    retention: 'Langfristig mit Aktualisierungen',
    examples: [
      'Unternehmenspolitik',
      'Interne Verfahren',
      'Mitarbeiterinformationen',
      'Projektdokumentation'
    ],
    usage: 'Selektiv basierend auf Benutzerrolle und Berechtigungen eingebunden.'
  },
  {
    id: 'global',
    name: 'Globaler Kontext',
    level: 5,
    scope: 'Allgemeines Wissen',
    retention: 'Permanent (im LLM)',
    examples: [
      'Faktisches Wissen aus Training',
      'Allgemeine Konzepte',
      'Sprachverständnis'
    ],
    usage: 'Bereits im Modell enthalten, kann durch RAG ergänzt werden.'
  }
];

const ChunkingStrategyVisualization: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Chunking-Strategien für effektive Memory-Prompts</PHeading>
      
      <div className="mb-6 rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(234, 179, 8, 0.1)' : 'rgba(254, 252, 232, 0.8)',
        borderColor: isDarkMode ? 'rgba(234, 179, 8, 0.3)' : 'rgba(250, 204, 21, 0.4)'
      }}>
        <PHeading tag="h5" size="small" className="mb-2">Warum ist Chunking wichtig?</PHeading>
        <PText>
          Effektives Chunking ist entscheidend für die Leistung von Memory-Systemen. Es beeinflusst direkt:
          <ul className="list-disc pl-5 mt-2" style={{ color: 'var(--foreground)' }}>
            <li>Relevanz und Qualität des Retrievals</li>
            <li>Effizienz der Speichernutzung</li>
            <li>Verarbeitungsgeschwindigkeit</li>
            <li>Kontextkosten für LLM-Anfragen</li>
          </ul>
        </PText>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {chunkingStrategies.slice(0, 2).map((strategy) => (
          <motion.div
            key={strategy.id}
            className="rounded-lg overflow-hidden border"
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
            whileHover={{ y: -5, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          >
            <div className={`p-4`} style={{ 
              backgroundColor: strategy.id === 'fixed-size' 
                ? (isDarkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(219, 234, 254, 0.8)')
                : (isDarkMode ? 'rgba(6, 95, 70, 0.3)' : 'rgba(209, 250, 229, 0.8)')
            }}>
              <PHeading tag="h5" size="small">{strategy.name}</PHeading>
              <PText size="small">{strategy.description}</PText>
            </div>
            
            <div className="p-4">
              <div className="mb-3">
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Vorteile:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {strategy.pros.map((pro, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{pro}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-3">
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Nachteile:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {strategy.cons.map((con, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{con}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Anwendungsfall:</div>
                <PText size="small" style={{ color: 'var(--foreground-lighter)' }}>{strategy.useCase}</PText>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chunkingStrategies.slice(2).map((strategy) => (
          <motion.div
            key={strategy.id}
            className="rounded-lg overflow-hidden border"
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
            whileHover={{ y: -5, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          >
            <div className={`p-4`} style={{ 
              backgroundColor: strategy.id === 'hybrid' 
                ? (isDarkMode ? 'rgba(124, 58, 237, 0.3)' : 'rgba(237, 233, 254, 0.8)')
                : (isDarkMode ? 'rgba(192, 38, 211, 0.3)' : 'rgba(250, 232, 255, 0.8)')
            }}>
              <PHeading tag="h5" size="small">{strategy.name}</PHeading>
              <PText size="small">{strategy.description}</PText>
            </div>
            
            <div className="p-4">
              <div className="mb-3">
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Vorteile:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {strategy.pros.map((pro, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{pro}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-3">
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Nachteile:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {strategy.cons.map((con, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{con}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Anwendungsfall:</div>
                <PText size="small" style={{ color: 'var(--foreground-lighter)' }}>{strategy.useCase}</PText>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SemanticOrganizationDiagram: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Semantische Organisation</PHeading>
      
      <div className="mb-6 rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.2)' : 'rgba(219, 234, 254, 0.8)', 
        borderColor: isDarkMode ? 'rgba(37, 99, 235, 0.4)' : 'rgba(191, 219, 254, 0.8)'
      }}>
        <PText>
          Die semantische Organisation von Memory-Inhalten ist entscheidend für ein effektives Retrieval. 
          Sie ermöglicht die Strukturierung von Informationen basierend auf Bedeutung und Kontext, 
          was zu präziseren und relevanteren Abrufen führt.
        </PText>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {semanticOrganizationMethods.map((method) => (
          <motion.div
            key={method.id}
            className="rounded-lg overflow-hidden border"
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
            whileHover={{ y: -5, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          >
            <div className="p-4" style={{ 
              backgroundColor: method.id === 'vector-db' 
                ? (isDarkMode ? 'rgba(5, 150, 105, 0.2)' : 'rgba(209, 250, 229, 0.8)')
                : method.id === 'knowledge-graph'
                  ? (isDarkMode ? 'rgba(79, 70, 229, 0.2)' : 'rgba(224, 231, 255, 0.8)')
                  : (isDarkMode ? 'rgba(217, 70, 239, 0.2)' : 'rgba(250, 232, 255, 0.8)')
            }}>
              <PHeading tag="h5" size="small">{method.name}</PHeading>
              <PText size="small">{method.description}</PText>
            </div>
            
            <div className="p-4">
              <div className="mb-3">
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Komponenten:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {method.components.map((component, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{component}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-3">
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Beispiele:</div>
                <div className="flex flex-wrap gap-2">
                  {method.examples.map((example, index) => (
                    <span key={index} className="text-xs px-2 py-1 rounded" style={{ 
                      backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)',
                      color: 'var(--foreground-lighter)'
                    }}>
                      {example}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Vorteile:</div>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {method.advantages.map((advantage, index) => (
                    <li key={index} className="text-sm mb-1" style={{ color: 'var(--foreground-lighter)' }}>{advantage}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(243, 244, 246, 0.8)',
        borderColor: 'var(--border-color)'
      }}>
        <PHeading tag="h5" size="small" className="mb-2">Implementierungsempfehlung für Automotive-Anwendungen</PHeading>
        <PText>
          Für Automotive-Kontext empfehlen wir einen hybriden Ansatz, der:
          <ol className="list-decimal pl-5 mt-2 space-y-1" style={{ color: 'var(--foreground)' }}>
            <li>Vektoreinbettungen für technische Dokumentation und Diagnosedaten verwendet</li>
            <li>Einen Wissensgraphen für Fahrzeugkomponenten und deren Beziehungen implementiert</li>
            <li>Metadaten wie Fahrzeugmodell, Software-Version und Komponenten-ID für präzise Filterung nutzt</li>
            <li>Benutzerprofile und Präferenzen für personalisierte Antworten einbindet</li>
          </ol>
        </PText>
      </div>
    </div>
  );
};

const MemoryHierarchyVisualization: React.FC = () => {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Memory-Hierarchie</PHeading>
      
      <div className="mb-6 rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(124, 58, 237, 0.2)' : 'rgba(237, 233, 254, 0.8)', 
        borderColor: isDarkMode ? 'rgba(124, 58, 237, 0.4)' : 'rgba(216, 180, 254, 0.8)'
      }}>
        <PText>
          Memory-Systeme sind oft hierarchisch strukturiert, ähnlich wie das menschliche Gedächtnis.
          Diese Hierarchie ermöglicht eine effiziente Organisation von Informationen nach ihrer Wichtigkeit,
          Aktualität und Relevanz. Bewegen Sie den Mauszeiger über die verschiedenen Ebenen, um Details zu sehen.
        </PText>
      </div>
      
      <div className="relative mb-10">
        {/* Pyramid visualization */}
        <div className="flex flex-col items-center">
          {memoryHierarchyLevels.map((level, index) => {
            const width = 100 - (index * 15); // Decrease width for each level up the pyramid
            const isHovered = hoveredLevel === level.id;
            
            return (
              <motion.div
                key={level.id}
                className="mb-1 flex items-center justify-center cursor-pointer"
                style={{ 
                  width: `${width}%`,
                  height: '60px',
                  backgroundColor: isHovered 
                    ? (isDarkMode ? 'rgba(124, 58, 237, 0.4)' : 'rgba(216, 180, 254, 0.8)')
                    : (isDarkMode ? 'rgba(124, 58, 237, 0.2)' : 'rgba(237, 233, 254, 0.8)'),
                  borderRadius: '4px',
                  border: `1px solid ${isHovered 
                    ? (isDarkMode ? 'rgba(124, 58, 237, 0.8)' : 'rgba(124, 58, 237, 0.4)')
                    : (isDarkMode ? 'rgba(124, 58, 237, 0.3)' : 'rgba(167, 139, 250, 0.3)')}`,
                  zIndex: 10 - index
                }}
                whileHover={{ y: -2 }}
                onMouseEnter={() => setHoveredLevel(level.id)}
                onMouseLeave={() => setHoveredLevel(null)}
              >
                <PText size="small" className="font-medium">
                  {level.name}
                </PText>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Level Details */}
      {hoveredLevel && (
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
          {memoryHierarchyLevels
            .filter(level => level.id === hoveredLevel)
            .map(level => (
              <div key={level.id}>
                <PHeading tag="h5" size="small" className="mb-2">{level.name}</PHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-3">
                      <div className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>Umfang:</div>
                      <PText size="small" style={{ color: 'var(--foreground-lighter)' }}>{level.scope}</PText>
                    </div>
                    <div>
                      <div className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>Speicherdauer:</div>
                      <PText size="small" style={{ color: 'var(--foreground-lighter)' }}>{level.retention}</PText>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>Beispiele:</div>
                    <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                      {level.examples.map((example, index) => (
                        <li key={index} className="mb-1" style={{ color: 'var(--foreground-lighter)' }}>
                          <PText size="small">{example}</PText>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>Verwendung im Prompt:</div>
                  <PText size="small" style={{ color: 'var(--foreground-lighter)' }}>{level.usage}</PText>
                </div>
              </div>
            ))}
        </motion.div>
      )}
      
      <div className="rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(5, 150, 105, 0.1)' : 'rgba(209, 250, 229, 0.8)',
        borderColor: isDarkMode ? 'rgba(5, 150, 105, 0.4)' : 'rgba(167, 243, 208, 0.8)'
      }}>
        <PHeading tag="h5" size="small" className="mb-2">Automotive-Anwendungsbeispiel</PHeading>
        <PText>
          In einem Fahrzeug-Diagnosesystem könnte diese Hierarchie folgendermaßen implementiert werden:
          <ul className="list-disc pl-5 mt-2" style={{ color: 'var(--foreground)' }}>
            <li><strong>Sitzungskontext:</strong> Aktuelle Diagnosesitzung und Fehlercodes</li>
            <li><strong>Benutzerkontext:</strong> Fahrzeug-Profil, Wartungshistorie, Fahrergewohnheiten</li>
            <li><strong>Domänenkontext:</strong> Technische Handbücher, bekannte Fehler und Lösungen</li>
            <li><strong>Organisationskontext:</strong> Herstellerrichtlinien, Rückrufaktionen, interne Verfahren</li>
            <li><strong>Globaler Kontext:</strong> Allgemeines technisches Wissen über Fahrzeugsysteme</li>
          </ul>
        </PText>
      </div>
    </div>
  );
};

interface MemoryPromptStructureDiagramProps {
  title?: string;
  description?: string;
}

const MemoryPromptStructureDiagram: React.FC<MemoryPromptStructureDiagramProps> = ({
  title = "Memory-Prompt Strukturierung",
  description
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full p-4 rounded-lg" style={{ 
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--border-color)' 
    }}>
      <PHeading tag="h3" className="mb-2">{title}</PHeading>
      
      {description && (
        <PText className="mb-4">{description}</PText>
      )}
      
      <Tabs
        tabs={[
          {
            id: 'chunking',
            label: 'Chunking-Strategien',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2M7 7h10" />
              </svg>
            ),
            content: <ChunkingStrategyVisualization />
          },
          {
            id: 'organization',
            label: 'Semantische Organisation',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            ),
            content: <SemanticOrganizationDiagram />
          },
          {
            id: 'hierarchy',
            label: 'Memory-Hierarchie',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            ),
            content: <MemoryHierarchyVisualization />
          }
        ]}
      />
      
      <InfoCard
        title="Best Practices für Memory-Prompt-Struktur in der Fahrzeugtechnik"
        variant="info"
      >
        <PText className="mb-3">
          Für Anwendungen in der Fahrzeugtechnik empfehlen wir folgende Optimierungen:
        </PText>
        <ul className="list-disc pl-5">
          <li className="mb-1">
            <strong>Modellspezifisches Chunking:</strong> Organisieren Sie technische Dokumente nach Fahrzeugmodellen und -systemen 
            für präziseres Retrieval.
          </li>
          <li className="mb-1">
            <strong>Symptombasierte Verknüpfung:</strong> Verknüpfen Sie Diagnoseprotokolle semantisch mit Symptomen und 
            Fehlercodes für effiziente Problemlösung.
          </li>
          <li className="mb-1">
            <strong>Hierarchisches Expertenwissen:</strong> Strukturieren Sie Experteninformationen in einer Hierarchie 
            von allgemeinen Fahrzeugsystemen bis zu spezifischen Komponenten.
          </li>
          <li>
            <strong>Kontextbasiertes Token-Management:</strong> Priorisieren Sie fahrzeugspezifische Informationen 
            basierend auf dem aktuellen Diagnosekontext.
          </li>
        </ul>
      </InfoCard>
    </div>
  );
};

export default MemoryPromptStructureDiagram; 