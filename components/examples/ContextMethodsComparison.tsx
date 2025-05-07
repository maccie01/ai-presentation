"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import InfoCard from '@/components/ui/InfoCard';
import Tabs from '@/components/ui/Tabs';
import { useTheme } from '@/lib/themeContext';

// Context method types with descriptions and properties
const contextMethods = [
  {
    id: 'document',
    name: 'Dokumentbasiert',
    description: 'Verwendet vollständige Dokumente oder Textabschnitte als Kontext',
    pros: [
      'Umfassender thematischer Kontext',
      'Ermöglicht detaillierte Analysen',
      'Gut für komplexe Zusammenhänge'
    ],
    cons: [
      'Hoher Token-Verbrauch',
      'Kann irrelevante Informationen enthalten',
      'Höhere Verarbeitungszeit'
    ],
    bestFor: [
      'Dokumentanalyse',
      'Zusammenfassungen',
      'Tiefgehende Recherche'
    ],
    examplePrompt: 'Analysiere folgendes technisches Dokument und fasse die Hauptpunkte zusammen: [Dokument]'
  },
  {
    id: 'semantic',
    name: 'Semantische Suche',
    description: 'Verwendet intelligente Textsuche, um relevante Textabschnitte als Kontext zu finden',
    pros: [
      'Hohe Relevanz zur Anfrage',
      'Reduzierte Menge an Kontextdaten',
      'Effizienter Token-Verbrauch'
    ],
    cons: [
      'Abhängig von der Suchqualität',
      'Potentiell fehlender Gesamtkontext',
      'Erfordert Vektorindizes/Embeddings'
    ],
    bestFor: [
      'Wissensdatenbanken',
      'Technische Dokumentation',
      'Kundensupport'
    ],
    examplePrompt: 'Basierend auf unserer Technischen Dokumentation: Wie konfiguriere ich den CAN-Bus im Taycan?'
  },
  {
    id: 'structured',
    name: 'Strukturierte Daten',
    description: 'Verwendet präzise, strukturierte Daten wie JSON, CSV oder Datenbankeinträge als Kontext',
    pros: [
      'Hohe Präzision',
      'Effiziente Datennutzung',
      'Gut für quantitative Analysen'
    ],
    cons: [
      'Begrenzte narrative Fähigkeiten',
      'Erfordert Datenvorverarbeitung',
      'Weniger flexibel für offene Fragen'
    ],
    bestFor: [
      'Datenauswertungen',
      'Dashboards',
      'Technische Berichte'
    ],
    examplePrompt: 'Analysiere die beigefügten Fahrzeugdaten im JSON-Format und identifiziere ungewöhnliche Werte.'
  },
  {
    id: 'prior',
    name: 'Gespräch/Vorwissen',
    description: 'Verwendet vorangegangene Interaktionen oder vortrainiertes Wissen als Kontext',
    pros: [
      'Natürlichere Konversation',
      'Kein zusätzlicher Kontext nötig',
      'Geringe Latenz'
    ],
    cons: [
      'Begrenzte Spezifität',
      'Potentiell veraltetes Wissen',
      'Unzuverlässig bei Fachthemen'
    ],
    bestFor: [
      'Allgemeine Informationen',
      'Casual Konversation',
      'Einfache Definitionen'
    ],
    examplePrompt: 'Erkläre mir, was Regeneratives Bremsen ist.'
  },
  {
    id: 'hybrid',
    name: 'Hybrid-Ansatz',
    description: 'Kombiniert mehrere Kontextquellen für optimale Ergebnisse',
    pros: [
      'Verbindet Vorteile mehrerer Methoden',
      'Flexibel an Anforderungen anpassbar',
      'Höhere Antwortqualität'
    ],
    cons: [
      'Komplexere Implementierung',
      'Potentiell höhere Kosten',
      'Aufwändigere Konfiguration'
    ],
    bestFor: [
      'Unternehmensanwendungen',
      'Komplexe Assistenzsysteme',
      'Kritische Entscheidungsunterstützung'
    ],
    examplePrompt: 'Basierend auf unserer Produktdokumentation und den aktuellen Kundendaten, erstelle eine Empfehlung für das passende Fahrzeugmodell.'
  }
];

// Data categories for classification schema
const dataCategories = [
  {
    name: 'Unstrukturierte Textdaten',
    examples: ['Dokumente', 'E-Mails', 'Gesprächsprotokolle'],
    bestContextMethod: 'document',
    relevance: 'high',
  },
  {
    name: 'Semi-strukturierte Daten',
    examples: ['Wiki-Einträge', 'FAQ-Dokumente', 'Technische Anleitungen'],
    bestContextMethod: 'semantic',
    relevance: 'high',
  },
  {
    name: 'Strukturierte Daten',
    examples: ['Datenbankeinträge', 'JSON/XML', 'CSV-Dateien'],
    bestContextMethod: 'structured',
    relevance: 'medium',
  },
  {
    name: 'Allgemeines Wissen',
    examples: ['Basiswissen', 'Common Sense', 'Allgemeine Konzepte'],
    bestContextMethod: 'prior',
    relevance: 'low',
  },
  {
    name: 'Fachdaten',
    examples: ['Sensorwerte', 'Messdaten', 'Technische Spezifikationen'],
    bestContextMethod: 'structured',
    relevance: 'high',
  },
  {
    name: 'Historische Interaktionen',
    examples: ['Chat-Verlauf', 'Frühere Anfragen', 'Nutzereinstellungen'],
    bestContextMethod: 'hybrid',
    relevance: 'medium',
  }
];

// Context relevance data for heat map
const contextRelevanceData = [
  { query: 'Technische Spezifikationen', result: 'Präzise Daten', relevance: 'high' },
  { query: 'Technische Spezifikationen', result: 'Allgemeine Informationen', relevance: 'low' },
  { query: 'Technische Spezifikationen', result: 'Ähnliche Produkte', relevance: 'medium' },
  
  { query: 'Problemlösung', result: 'Präzise Daten', relevance: 'medium' },
  { query: 'Problemlösung', result: 'Allgemeine Informationen', relevance: 'low' },
  { query: 'Problemlösung', result: 'Ähnliche Produkte', relevance: 'high' },
  
  { query: 'Produktvergleich', result: 'Präzise Daten', relevance: 'high' },
  { query: 'Produktvergleich', result: 'Allgemeine Informationen', relevance: 'medium' },
  { query: 'Produktvergleich', result: 'Ähnliche Produkte', relevance: 'high' },
  
  { query: 'Konzeptuelle Fragen', result: 'Präzise Daten', relevance: 'low' },
  { query: 'Konzeptuelle Fragen', result: 'Allgemeine Informationen', relevance: 'high' },
  { query: 'Konzeptuelle Fragen', result: 'Ähnliche Produkte', relevance: 'medium' }
];

const DecisionTree: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const getContextMethod = (methodId: string) => {
    return contextMethods.find(method => method.id === methodId);
  };

  // Style utility for nodes
  const getNodeStyle = (nodeId: string) => {
    const isSelected = selectedNode === nodeId;
    return {
      backgroundColor: isSelected 
        ? isDarkMode ? '#3b82f6' : '#1a4694'
        : isDarkMode ? 'rgba(55, 65, 81, 0.5)' : '#e5e7eb',
      color: isSelected 
        ? 'white' 
        : isDarkMode ? 'rgba(229, 231, 235, 0.9)' : 'black',
      borderColor: isSelected 
        ? isDarkMode ? '#60a5fa' : '#0f2a5c'
        : isDarkMode ? 'rgba(75, 85, 99, 0.5)' : '#d1d5db',
    };
  };

  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Entscheidungsbaum für Kontextauswahl</PHeading>
      
      {/* Decision tree visualization */}
      <div className="relative w-full mb-8">
        <div className="decision-tree flex flex-col items-center">
          {/* Root question */}
          <div className="mb-8 text-center">
            <div 
              className="border rounded-lg p-3 inline-block" 
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(219, 234, 254, 0.8)',
                borderColor: isDarkMode ? 'rgba(37, 99, 235, 0.5)' : 'rgba(147, 197, 253, 0.8)' 
              }}
            >
              <PText size="small"><strong>Was ist der Hauptzweck Ihrer Anfrage?</strong></PText>
            </div>
            
            {/* Branch lines */}
            <div 
              className="h-6 w-1 mx-auto mt-1" 
              style={{ backgroundColor: isDarkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(156, 163, 175, 0.8)' }}
            ></div>
          </div>
          
          {/* First level */}
          <div className="grid grid-cols-3 gap-4 mb-8 w-full">
            <div className="flex flex-col items-center">
              <motion.div 
                className="border rounded-lg p-3 cursor-pointer"
                style={getNodeStyle('document-analysis')}
                whileHover={{ y: -3, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                onClick={() => handleNodeClick('document-analysis')}
              >
                <PText size="small">Dokument/Text analysieren</PText>
              </motion.div>
              <div 
                className="h-6 w-1 mx-auto mt-1" 
                style={{ backgroundColor: isDarkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(156, 163, 175, 0.8)' }}
              ></div>
            </div>
            
            <div className="flex flex-col items-center">
              <motion.div 
                className="border rounded-lg p-3 cursor-pointer"
                style={getNodeStyle('data-processing')}
                whileHover={{ y: -3, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                onClick={() => handleNodeClick('data-processing')}
              >
                <PText size="small">Daten verarbeiten</PText>
              </motion.div>
              <div 
                className="h-6 w-1 mx-auto mt-1" 
                style={{ backgroundColor: isDarkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(156, 163, 175, 0.8)' }}
              ></div>
            </div>
            
            <div className="flex flex-col items-center">
              <motion.div 
                className="border rounded-lg p-3 cursor-pointer"
                style={getNodeStyle('conversation')}
                whileHover={{ y: -3, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                onClick={() => handleNodeClick('conversation')}
              >
                <PText size="small">Konversation/Diskussion</PText>
              </motion.div>
              <div 
                className="h-6 w-1 mx-auto mt-1" 
                style={{ backgroundColor: isDarkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(156, 163, 175, 0.8)' }}
              ></div>
            </div>
          </div>
          
          {/* Second level */}
          <div className="grid grid-cols-3 gap-4 mb-8 w-full">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center">
                <motion.div 
                  className="border rounded-lg p-3 cursor-pointer"
                  style={getNodeStyle('document')}
                  whileHover={{ y: -3, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                  onClick={() => handleNodeClick('document')}
                >
                  <PText size="small">Volltext</PText>
                </motion.div>
              </div>
              
              <div className="flex flex-col items-center">
                <motion.div 
                  className="border rounded-lg p-3 cursor-pointer"
                  style={getNodeStyle('semantic')}
                  whileHover={{ y: -3, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                  onClick={() => handleNodeClick('semantic')}
                >
                  <PText size="small">Semantisch</PText>
                </motion.div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col items-center">
                <motion.div 
                  className="border rounded-lg p-3 cursor-pointer"
                  style={getNodeStyle('structured')}
                  whileHover={{ y: -3, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                  onClick={() => handleNodeClick('structured')}
                >
                  <PText size="small">Strukturierte Daten</PText>
                </motion.div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center">
                <motion.div 
                  className="border rounded-lg p-3 cursor-pointer"
                  style={getNodeStyle('prior')}
                  whileHover={{ y: -3, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                  onClick={() => handleNodeClick('prior')}
                >
                  <PText size="small">Vorwissen</PText>
                </motion.div>
              </div>
              
              <div className="flex flex-col items-center">
                <motion.div 
                  className="border rounded-lg p-3 cursor-pointer"
                  style={getNodeStyle('hybrid')}
                  whileHover={{ y: -3, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                  onClick={() => handleNodeClick('hybrid')}
                >
                  <PText size="small">Hybrid</PText>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Selected method details */}
      {selectedNode && contextMethods.some(method => method.id === selectedNode) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <InfoCard 
            title={getContextMethod(selectedNode)?.name || ''}
            variant="info"
          >
            <PText className="mb-3">{getContextMethod(selectedNode)?.description}</PText>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <PHeading tag="h5" size="small" className="mb-2">Vorteile</PHeading>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {getContextMethod(selectedNode)?.pros.map((pro, index) => (
                    <li key={index}>
                      <PText size="small">{pro}</PText>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <PHeading tag="h5" size="small" className="mb-2">Nachteile</PHeading>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {getContextMethod(selectedNode)?.cons.map((con, index) => (
                    <li key={index}>
                      <PText size="small">{con}</PText>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <PHeading tag="h5" size="small" className="mb-2">Am besten für</PHeading>
                <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
                  {getContextMethod(selectedNode)?.bestFor.map((use, index) => (
                    <li key={index}>
                      <PText size="small">{use}</PText>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
              <PHeading tag="h5" size="small" className="mb-2">Beispiel-Prompt</PHeading>
              <p className="font-mono text-sm">{getContextMethod(selectedNode)?.examplePrompt}</p>
            </div>
          </InfoCard>
        </motion.div>
      )}
    </div>
  );
};

const DataClassificationSchema: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Datenklassifikationsschema</PHeading>
      
      <div className="w-full overflow-x-auto">
        <table 
          className="min-w-full border rounded-lg" 
          style={{ 
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--foreground)'
          }}
        >
          <thead>
            <tr style={{ backgroundColor: isDarkMode ? 'var(--card-bg-darker)' : 'var(--card-bg-lighter)' }}>
              <th className="py-3 px-4 text-left border-b" style={{ borderColor: 'var(--border-color)' }}>Datenkategorie</th>
              <th className="py-3 px-4 text-left border-b" style={{ borderColor: 'var(--border-color)' }}>Beispiele</th>
              <th className="py-3 px-4 text-left border-b" style={{ borderColor: 'var(--border-color)' }}>Beste Kontextmethode</th>
              <th className="py-3 px-4 text-left border-b" style={{ borderColor: 'var(--border-color)' }}>Relevanz</th>
            </tr>
          </thead>
          <tbody>
            {dataCategories.map((category, index) => {
              const contextMethod = contextMethods.find(m => m.id === category.bestContextMethod);
              
              // Theme-aware relevance colors
              let relevanceStyle = {};
              switch(category.relevance) {
                case 'high': 
                  relevanceStyle = { 
                    backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(209, 250, 229, 0.8)',
                    color: isDarkMode ? '#34d399' : '#047857'
                  }; 
                  break;
                case 'medium': 
                  relevanceStyle = { 
                    backgroundColor: isDarkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(254, 240, 215, 0.8)', 
                    color: isDarkMode ? '#fbbf24' : '#92400e' 
                  }; 
                  break;
                case 'low': 
                  relevanceStyle = { 
                    backgroundColor: isDarkMode ? 'rgba(156, 163, 175, 0.2)' : 'rgba(243, 244, 246, 0.8)', 
                    color: isDarkMode ? '#9ca3af' : '#374151' 
                  }; 
                  break;
              }
              
              return (
                <tr 
                  key={index} 
                  style={{ 
                    backgroundColor: index % 2 === 0 
                      ? isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)'
                      : 'var(--card-bg)'
                  }}
                >
                  <td className="py-3 px-4 border-b" style={{ borderColor: 'var(--border-color)', fontWeight: 'medium' }}>
                    {category.name}
                  </td>
                  <td className="py-3 px-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    {category.examples.join(', ')}
                  </td>
                  <td className="py-3 px-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    {contextMethod?.name}
                  </td>
                  <td className="py-3 px-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="px-2 py-1 rounded-full text-xs font-medium" style={relevanceStyle}>
                      {{
                        'high': 'Hoch',
                        'medium': 'Mittel',
                        'low': 'Niedrig'
                      }[category.relevance]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ContextRelevanceHeatMap: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const getRelevanceColor = (relevance: string): string => {
    switch(relevance) {
      case 'high':
        return isDarkMode 
          ? 'bg-green-900 bg-opacity-60 text-green-300' 
          : 'bg-green-500 text-white';
      case 'medium':
        return isDarkMode 
          ? 'bg-yellow-900 bg-opacity-60 text-yellow-300' 
          : 'bg-yellow-400 text-gray-800';
      case 'low':
        return isDarkMode 
          ? 'bg-gray-700 bg-opacity-60 text-gray-300' 
          : 'bg-gray-300 text-gray-800';
      default:
        return isDarkMode 
          ? 'bg-gray-800 bg-opacity-60 text-gray-400' 
          : 'bg-gray-100 text-gray-500';
    }
  };

  const queryTypes = ['Technische Spezifikationen', 'Problemlösung', 'Produktvergleich', 'Konzeptuelle Fragen'];
  const resultTypes = ['Präzise Daten', 'Allgemeine Informationen', 'Ähnliche Produkte'];

  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Kontextrelevanz für verschiedene Anfragen</PHeading>
      
      <div 
        className="p-4 rounded-lg" 
        style={{ 
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-color)'
        }}
      >
        <div className="overflow-x-auto">
          <div className="grid" style={{ gridTemplateColumns: '200px repeat(3, minmax(120px, 1fr))' }}>
            {/* Header */}
            <div className="p-2"></div>
            {resultTypes.map((type, index) => (
              <div 
                key={index} 
                className="p-2 font-medium text-center border-b" 
                style={{ 
                  borderColor: 'var(--border-color)',
                  backgroundColor: isDarkMode ? 'var(--card-bg-darker)' : 'var(--card-bg-lighter)' 
                }}
              >
                <PText size="small">{type}</PText>
              </div>
            ))}
            
            {queryTypes.map((queryType, queryIndex) => (
              <React.Fragment key={queryIndex}>
                <div 
                  className="p-2 font-medium border-b border-r" 
                  style={{ 
                    borderColor: 'var(--border-color)',
                    backgroundColor: isDarkMode ? 'var(--card-bg-darker)' : 'var(--card-bg-lighter)' 
                  }}
                >
                  <PText size="small">{queryType}</PText>
                </div>
                
                {resultTypes.map((resultType, resultIndex) => {
                  const dataPoint = contextRelevanceData.find(
                    item => item.query === queryType && item.result === resultType
                  );
                  
                  const relevance = dataPoint?.relevance || 'none';
                  const colorClass = getRelevanceColor(relevance);
                  
                  return (
                    <motion.div 
                      key={resultIndex}
                      className={`${colorClass} p-2 border-b border-r text-center relative`}
                      style={{ borderColor: 'var(--border-color)' }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <PText size="small" className="font-medium">
                        {{
                          'high': 'Hoch',
                          'medium': 'Mittel',
                          'low': 'Niedrig',
                          'none': '-'
                        }[relevance]}
                      </PText>
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex items-center justify-end gap-4">
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-sm mr-2" 
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.6)' : 'rgba(34, 197, 94, 1)' 
              }}
            ></div>
            <PText size="small">Hohe Relevanz</PText>
          </div>
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-sm mr-2" 
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(234, 179, 8, 0.6)' : 'rgba(250, 204, 21, 1)' 
              }}
            ></div>
            <PText size="small">Mittlere Relevanz</PText>
          </div>
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-sm mr-2" 
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(107, 114, 128, 0.6)' : 'rgba(209, 213, 219, 1)' 
              }}
            ></div>
            <PText size="small">Niedrige Relevanz</PText>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContextMethodsComparisonProps {
  title?: string;
  description?: string;
}

const ContextMethodsComparison: React.FC<ContextMethodsComparisonProps> = ({ 
  title = "Vergleich von Kontextmethoden",
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
            id: 'decision-tree',
            label: 'Entscheidungsbaum',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            ),
            content: <DecisionTree />
          },
          {
            id: 'classification',
            label: 'Datenklassifikation',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
            content: <DataClassificationSchema />
          },
          {
            id: 'heatmap',
            label: 'Relevanz-Heatmap',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            ),
            content: <ContextRelevanceHeatMap />
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
        <PHeading tag="h4" size="small" className="mb-2">Auswahltipp:</PHeading>
        <PText>
          Die optimale Kontextmethode hängt von Ihrem spezifischen Anwendungsfall ab. 
          Für allgemeine Fragen reicht oft das Vorwissen des Modells, während für spezifische 
          Analysen dokumentbasierte oder strukturierte Kontexte bessere Ergebnisse liefern. 
          In der Praxis erreichen Hybrid-Ansätze oft die besten Resultate, indem sie verschiedene 
          Methoden kombinieren.
        </PText>
      </div>
    </div>
  );
};

export default ContextMethodsComparison; 