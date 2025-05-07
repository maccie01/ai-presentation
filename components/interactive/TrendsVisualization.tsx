"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import PButton from '@/components/ui/PButton';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import Tabs from '@/components/ui/Tabs';
import ChartVisualization from '@/components/interactive/ChartVisualization';
import { useTheme } from '@/lib/themeContext';

// Types for trends data
interface TrendData {
  id: string;
  name: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number; // 0-100
  adoptionRate: number[]; // 0-100 values for adoption curve
  years: string[]; // years for x-axis
  automotive: string[];
  security: string[];
}

// Sample data for AI trends
const aiTrends: TrendData[] = [
  {
    id: 'multimodal',
    name: 'Multimodale KI als Standard',
    description: 'KI-Systeme, die mehrere Eingabetypen (Text, Bild, Audio, Video) nahtlos verarbeiten können, werden zum Standard mit Modellen wie GPT-4o und Google Gemini.',
    impact: 'high',
    confidence: 95,
    adoptionRate: [25, 45, 70, 85, 95],
    years: ['2023', '2024', '2025', '2026', '2027'],
    automotive: [
      'Kamera- und Sensordaten werden gemeinsam für verbesserte Fahrerassistenzsysteme ausgewertet',
      'Integrierte Sprach-, Gesten- und Blickerkennung für intuitive Fahrzeugsteuerung',
      'Verbesserte Situationsanalyse durch Integration verschiedener Datenquellen'
    ],
    security: [
      'Verbesserte Authentifizierung durch Kombination mehrerer biometrischer Merkmale',
      'Umfassende Bedrohungserkennung durch Analyse verschiedener Datentypen',
      'Überwachung von Sicherheitskameras mit Audioverarbeitung und Verhaltensanalyse'
    ]
  },
  {
    id: 'ai-agents',
    name: 'Autonome KI-Agenten',
    description: 'KI-Agenten, die komplexe mehrstufige Aufgaben eigenständig durchführen und mit ihrer Umgebung interagieren können, gewinnen stark an Bedeutung.',
    impact: 'high',
    confidence: 85,
    adoptionRate: [10, 25, 50, 70, 85],
    years: ['2023', '2024', '2025', '2026', '2027'],
    automotive: [
      'Autonome Diagnosesysteme, die Probleme erkennen und Lösungen vorschlagen',
      'KI-Assistenten, die komplexe Fahrzeugfunktionen ohne menschliches Eingreifen steuern',
      'Prognose: Etwa 15% der täglichen Fahrzeugentscheidungen könnten bis 2028 autonom getroffen werden'
    ],
    security: [
      'Autonome Sicherheitsagenten, die Bedrohungen erkennen und abwehren',
      'Proaktive Sicherheitsmaßnahmen ohne menschliches Eingreifen',
      'Selbstheilende Systeme, die Schwachstellen eigenständig identifizieren und beheben'
    ]
  },
  {
    id: 'small-models',
    name: 'Effiziente kleinere Modelle (SLMs)',
    description: 'Trend zu kleineren, effizienteren Modellen (wie Microsofts Phi-3, GPT-4o mini, Llama 3 8B), die gute Leistung bei geringeren Kosten und Ressourcenverbrauch bieten.',
    impact: 'high',
    confidence: 90,
    adoptionRate: [15, 40, 65, 80, 90],
    years: ['2023', '2024', '2025', '2026', '2027'],
    automotive: [
      'Einsatz von KI-Modellen direkt in Fahrzeugen ohne Cloud-Abhängigkeit',
      'Energieeffiziente KI für batteriebetriebene Fahrzeuge',
      'Kostengünstige KI-Lösungen für verschiedene Fahrzeugklassen'
    ],
    security: [
      'On-Device-Verarbeitung sensibler Daten ohne Cloud-Übertragung',
      'Schnellere Reaktionszeiten für sicherheitskritische Anwendungen',
      'Geringere Angriffsfläche durch reduzierte Netzwerkkommunikation'
    ]
  },
  {
    id: 'enterprise-integration',
    name: 'Tiefere Unternehmensintegration',
    description: 'KI wird tiefer in bestehende Unternehmenssoftware (ERPs, CRMs, Produktivitäts-Suites wie Microsoft 365 Copilot) integriert.',
    impact: 'high',
    confidence: 95,
    adoptionRate: [20, 45, 72, 85, 95],
    years: ['2023', '2024', '2025', '2026', '2027'],
    automotive: [
      'Integration von KI in bestehende Fahrzeugdiagnose- und Wartungssysteme',
      'KI-gestützte Produktionsplanung und Lieferkettenoptimierung',
      'Nahtlose Verknüpfung von Fahrzeugdaten mit Unternehmens-ERPs'
    ],
    security: [
      'Integration von KI-Sicherheitsmaßnahmen in bestehende IT-Infrastruktur',
      'Automatisierte Compliance-Überprüfung in Unternehmenssystemen',
      'Einheitliche Sicherheitsrichtlinien über verschiedene Anwendungen hinweg'
    ]
  },
  {
    id: 'rag',
    name: 'Retrieval Augmented Generation (RAG)',
    description: 'Fokus auf RAG-Technologien, um KI-Antworten mit proprietären Unternehmensdaten zu verankern und so Relevanz und Genauigkeit zu verbessern.',
    impact: 'high',
    confidence: 90,
    adoptionRate: [15, 35, 65, 85, 95],
    years: ['2023', '2024', '2025', '2026', '2027'],
    automotive: [
      'KI-Assistenten mit Zugriff auf spezifische Fahrzeug- und Unternehmenshandbücher',
      'Kontextbewusste technische Unterstützung basierend auf Fahrzeughistorie',
      'Präzise Diagnosen durch Kombination von Modellwissen und spezifischen Fahrzeugdaten'
    ],
    security: [
      'Sicherheitsanalysen basierend auf aktuellen Bedrohungsdatenbanken',
      'Verbesserte Bedrohungserkennung durch Kombination von KI-Modellen und spezifischen Unternehmensrichtlinien',
      'Maßgeschneiderte Sicherheitsempfehlungen basierend auf der IT-Umgebung des Unternehmens'
    ]
  }
];

// Impact color mapping
const impactColors = {
  high: '#EF4444', // red
  medium: '#F59E0B', // amber
  low: '#10B981', // emerald
};

// Confidence visualization component
const ConfidenceIndicator: React.FC<{ confidence: number }> = ({ confidence }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex items-center">
      <div className="w-full rounded-full h-2.5 mr-2" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)' }}>
        <div 
          className="h-2.5 rounded-full" 
          style={{ 
            width: `${confidence}%`,
            backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb'
          }}
        ></div>
      </div>
      <span className="text-sm font-medium">{confidence}%</span>
    </div>
  );
};

// Impact level component
const ImpactLevel: React.FC<{ impact: TrendData['impact'] }> = ({ impact }) => {
  const levelText = {
    high: 'Hoch',
    medium: 'Mittel',
    low: 'Niedrig',
  };
  
  return (
    <div className="flex items-center">
      <div 
        className="w-3 h-3 rounded-full mr-2" 
        style={{ backgroundColor: impactColors[impact] }}
      ></div>
      <span className="text-sm font-medium">{levelText[impact]}</span>
    </div>
  );
};

// Trend detail card component
const TrendDetailCard: React.FC<{ trend: TrendData }> = ({ trend }) => {
  const { isDarkMode } = useTheme();
  
  // Prepare data for ChartVisualization
  const adoptionData = trend.years.map((year, index) => ({
    x: year,
    y: trend.adoptionRate[index],
  }));
  
  return (
    <div className="rounded-lg shadow-lg p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <PHeading tag="h3" size="medium">{trend.name}</PHeading>
          <ImpactLevel impact={trend.impact} />
        </div>
        <PText className="mb-4">{trend.description}</PText>
        <div className="mb-4">
          <div className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>Prognose-Konfidenz:</div>
          <ConfidenceIndicator confidence={trend.confidence} />
        </div>
      </div>
      
      <div className="mb-8">
        <PHeading tag="h4" size="small" className="mb-3">Adoptionskurve bis 2027</PHeading>
        <div className="h-96">
          <ChartVisualization 
            type="line"
            data={adoptionData}
            xAxisLabel="Jahr"
            yAxisLabel="Adoptionsrate (%)"
            showGrid={true}
            showTooltip={true}
          />
        </div>
      </div>
      
      <Tabs
        tabs={[
          {
            id: 'automotive',
            label: 'Automobilindustrie',
            content: (
              <div className="mt-6">
                <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--foreground)' }}>
                  {trend.automotive.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )
          },
          {
            id: 'security',
            label: 'Informationssicherheit',
            content: (
              <div className="mt-6">
                <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--foreground)' }}>
                  {trend.security.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )
          }
        ]}
        defaultTabId="automotive"
      />
    </div>
  );
};

// Technology adoption grid component
const TechnologyAdoptionGrid: React.FC<{ trends: TrendData[] }> = ({ trends }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="rounded-lg shadow-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
      <PHeading tag="h3" size="medium" className="mb-4">KI-Technologie Adoption Übersicht 2025</PHeading>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse" style={{ backgroundColor: 'var(--card-bg)' }}>
          <thead>
            <tr style={{ backgroundColor: isDarkMode ? 'var(--card-bg-darker)' : 'var(--card-bg-lighter)' }}>
              <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Technologie</th>
              <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Erwartete Adoption</th>
              <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Prognose-Konfidenz</th>
              <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Auswirkung</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((trend) => (
              <tr key={trend.id} className="hover:opacity-90" style={{ 
                backgroundColor: 'var(--card-bg)',
                color: 'var(--foreground)'
              }}>
                <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>{trend.name}</td>
                <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>
                  {trend.adoptionRate[2]}% {/* 2025 value */}
                </td>
                <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>
                  <ConfidenceIndicator confidence={trend.confidence} />
                </td>
                <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>
                  <ImpactLevel impact={trend.impact} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Capability evolution roadmap component
const CapabilityRoadmap: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  // Roadmap data
  const capabilities = [
    { 
      category: 'Natürliche Sprachverarbeitung', 
      stages: [
        { year: 2023, level: 'Verbesserte Kontextverarbeitung' },
        { year: 2024, level: 'Domänenspezifische Spezialisierung' },
        { year: 2025, level: 'Automatisierte Reasoning-Fähigkeiten' },
        { year: 2026, level: 'Kontinuierliches Lernen und Adaption' },
        { year: 2027, level: 'Menschenähnliches Sprachverständnis' }
      ]
    },
    { 
      category: 'Computer Vision', 
      stages: [
        { year: 2023, level: 'Präzise Objekterkennung und -klassifizierung' },
        { year: 2024, level: 'Umfassendes Szenenverständnis' },
        { year: 2025, level: 'Kontextuelles visuelles Reasoning' },
        { year: 2026, level: 'Proaktive visuelle Interpretation' },
        { year: 2027, level: 'Intuitive visuelle Konzeptbildung' }
      ]
    },
    { 
      category: 'Multimodale Integration', 
      stages: [
        { year: 2023, level: 'Grundlegende Text-Bild-Integration' },
        { year: 2024, level: 'Multi-Sensor-Datenfusion' },
        { year: 2025, level: 'Integrierte Cross-Modal-Analyse' },
        { year: 2026, level: 'Vollständig integriertes Weltmodell' },
        { year: 2027, level: 'Menschenähnliche multimodale Kognition' }
      ]
    },
    { 
      category: 'KI-Ethik und -Governance', 
      stages: [
        { year: 2023, level: 'Basale Sicherheitsfilter' },
        { year: 2024, level: 'Erweiterte Bias-Erkennung' },
        { year: 2025, level: 'Integrierte ethische Frameworks' },
        { year: 2026, level: 'Selbstüberwachung und -korrektur' },
        { year: 2027, level: 'Wertausgerichtete KI-Systeme' }
      ]
    }
  ];
  
  return (
    <div className="rounded-lg shadow-lg p-6" style={{ backgroundColor: 'var(--card-bg)' }}>
      <PHeading tag="h3" size="medium" className="mb-6">KI-Fähigkeiten Evolutionsfahrplan</PHeading>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse" style={{ backgroundColor: 'var(--card-bg)' }}>
          <thead>
            <tr style={{ backgroundColor: isDarkMode ? 'var(--card-bg-darker)' : 'var(--card-bg-lighter)' }}>
              <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Kategorie</th>
              <th className="py-3 px-4 text-center border" style={{ borderColor: 'var(--border-color)' }}>2023</th>
              <th className="py-3 px-4 text-center border" style={{ borderColor: 'var(--border-color)' }}>2024</th>
              <th className="py-3 px-4 text-center border" style={{ borderColor: 'var(--border-color)' }}>2025</th>
              <th className="py-3 px-4 text-center border" style={{ borderColor: 'var(--border-color)' }}>2026</th>
              <th className="py-3 px-4 text-center border" style={{ borderColor: 'var(--border-color)' }}>2027</th>
            </tr>
          </thead>
          <tbody>
            {capabilities.map((capability, index) => (
              <tr key={index} className="hover:opacity-90" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}>
                <td className="py-3 px-4 border font-medium" style={{ borderColor: 'var(--border-color)' }}>{capability.category}</td>
                {capability.stages.map((stage, i) => (
                  <td 
                    key={i} 
                    className={`py-3 px-4 text-sm border`}
                    style={{ 
                      borderColor: 'var(--border-color)',
                      backgroundColor: i === 2 ? (isDarkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(239, 246, 255, 0.8)') : 'transparent'
                    }}
                  >
                    {stage.level}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main component
const TrendsVisualization: React.FC = () => {
  const [activeTrendId, setActiveTrendId] = useState<string>(aiTrends[0].id);
  const [viewMode, setViewMode] = useState<'detail' | 'grid' | 'roadmap'>('detail');
  const { isDarkMode } = useTheme();
  
  const activeTrend = aiTrends.find(trend => trend.id === activeTrendId) || aiTrends[0];
  
  return (
    <div className="trends-visualization">
      <div className="flex justify-between items-center mb-6">
        <PHeading tag="h2" size="large">KI-Trends für 2025</PHeading>
        <div className="flex space-x-2">
          <PButton 
            variant={viewMode === 'detail' ? 'primary' : 'secondary'} 
            onClick={() => setViewMode('detail')}
          >
            Trend Details
          </PButton>
          <PButton 
            variant={viewMode === 'grid' ? 'primary' : 'secondary'} 
            onClick={() => setViewMode('grid')}
          >
            Adoption Übersicht
          </PButton>
          <PButton 
            variant={viewMode === 'roadmap' ? 'primary' : 'secondary'} 
            onClick={() => setViewMode('roadmap')}
          >
            Roadmap
          </PButton>
        </div>
      </div>
      
      {viewMode === 'detail' && (
        <>
          <div className="mb-6 flex justify-center space-x-2">
            {aiTrends.map((trend) => (
              <button
                key={trend.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors`}
                style={{
                  backgroundColor: trend.id === activeTrendId
                    ? (isDarkMode ? '#3b82f6' : '#2563eb')
                    : (isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)'),
                  color: trend.id === activeTrendId
                    ? 'white'
                    : (isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 0.9)')
                }}
                onClick={() => setActiveTrendId(trend.id)}
              >
                {trend.name}
              </button>
            ))}
          </div>
          
          <motion.div
            key={activeTrendId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TrendDetailCard trend={activeTrend} />
          </motion.div>
        </>
      )}
      
      {viewMode === 'grid' && (
        <TechnologyAdoptionGrid trends={aiTrends} />
      )}
      
      {viewMode === 'roadmap' && (
        <CapabilityRoadmap />
      )}
    </div>
  );
};

export default TrendsVisualization; 