'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import Tabs from '@/components/ui/Tabs';
import { useTheme } from '@/lib/themeContext';

interface TrendItem {
  id: string;
  title: string;
  description: string;
  timeline: string;
  impact: 'High' | 'Very High' | 'Medium' | 'Transformative';
  category: 'agents' | 'efficiency' | 'multimodal' | 'enterprise' | 'democratization';
  details: string[];
  source?: string;
}

const emergingTrends: TrendItem[] = [
  {
    id: "ai-agents",
    title: "Autonome KI-Agenten",
    description: "Systeme, die ihre Umgebung wahrnehmen, Entscheidungen treffen und autonome Aktionen ausführen, um bestimmte Ziele zu erreichen.",
    timeline: "2024-2028",
    impact: "Very High",
    category: "agents",
    details: [
      "Tech-Giganten investieren massiv in autonome Agenten-Technologie.",
      "Prognosen sehen, dass KI-Agenten bis 2028 etwa 15% der täglichen Arbeitsentscheidungen autonom treffen könnten.",
      "Multi-Agenten-Systeme ermöglichen komplexere Problemlösungen durch Zusammenarbeit mehrerer spezialisierter KI-Einheiten."
    ],
    source: "statworx"
  },
  {
    id: "smaller-models",
    title: "Effizienzfokus und kleinere Modelle",
    description: "Entwicklung kleinerer, effizienterer Modelle mit starker Leistung bei geringerem Ressourcenbedarf.",
    timeline: "2024-2025",
    impact: "High",
    category: "efficiency",
    details: [
      "Modelle wie Microsoft Phi-3, OpenAI GPT-4o mini und Meta Llama 3 8B bieten beeindruckende Leistung bei reduzierter Größe.",
      "Small Language Models (SLMs) eignen sich besonders für On-Device-Deployment und ressourcenbeschränkte Umgebungen.",
      "Optimierungsansätze umfassen Quantisierung, Pruning und Distillation-Techniken für bessere Effizienz."
    ]
  },
  {
    id: "multimodality",
    title: "Multimodalität als Standard",
    description: "KI-Systeme, die nahtlos zwischen Text, Bildern, Audio und Video arbeiten können.",
    timeline: "2024-2025",
    impact: "Very High",
    category: "multimodal",
    details: [
      "Führende Modelle wie GPT-4o und Google Gemini verarbeiten und generieren Inhalte über mehrere Modalitäten hinweg.",
      "Simultane Verarbeitung verschiedener Eingabequellen für ganzheitliches Verständnis.",
      "Ermöglicht neue Anwendungsfälle wie visuelle Frage-Antwort-Systeme und multimediale Inhaltsanalyse."
    ]
  },
  {
    id: "democratization",
    title: "Demokratisierung von KI",
    description: "Breitere Verfügbarkeit und einfachere Nutzung von KI-Technologien für mehr Anwender.",
    timeline: "2023-2025",
    impact: "High",
    category: "democratization",
    details: [
      "Zunehmend mehr Open-Source-Modelle (z.B. Llama-Serie, Mistral-Modelle) fördern Innovation und breitere Nutzung.",
      "Low-Code/No-Code-KI-Plattformen ermöglichen auch Nicht-Entwicklern den Aufbau KI-gestützter Anwendungen.",
      "API-Schnittstellen und Cloud-Dienste senken Einstiegshürden für KI-Integration."
    ]
  },
  {
    id: "enterprise-integration",
    title: "Verstärkte Unternehmensintegration",
    description: "Tiefere Einbettung von KI in bestehende Unternehmenssoftware und -prozesse.",
    timeline: "2024-2026",
    impact: "High",
    category: "enterprise",
    details: [
      "KI wird zunehmend in ERPs, CRMs und Produktivitätssuiten wie Microsoft 365 Copilot integriert.",
      "Fokus auf Retrieval Augmented Generation (RAG) zur Verankerung von KI-Antworten in unternehmenseigenen Daten.",
      "Verbesserung der Relevanz und Genauigkeit für Unternehmensanwendungsfälle."
    ],
    source: "SAP"
  },
  {
    id: "rag-systems",
    title: "RAG als De-facto-Standard",
    description: "Retrieval Augmented Generation wird zum Standardansatz für verantwortungsvolle und faktenbasierte KI-Lösungen.",
    timeline: "2024-2025",
    impact: "High",
    category: "enterprise",
    details: [
      "Kombination von LLMs mit Wissensdatenbanken und Vektordatenbanken für präzisere, faktenbasierte Antworten.",
      "Reduziert Halluzinationen und verbessert die Aktualität der Informationen.",
      "Ermöglicht Unternehmen, KI-Systeme auf ihr spezifisches Domänenwissen auszurichten."
    ]
  },
  {
    id: "ai-regulation",
    title: "Evolvierende regulatorische Landschaft",
    description: "Zunehmende regulatorische Anforderungen an KI-Systeme weltweit.",
    timeline: "2024-2026",
    impact: "High",
    category: "enterprise",
    details: [
      "Weltweit arbeiten Regierungen an KI-Vorschriften (z.B. EU AI Act).",
      "Verstärkter Fokus auf verantwortungsvolle KI-Entwicklung, Fairness, Transparenz und Reduzierung von Verzerrungen.",
      "Compliance-Anforderungen werden ein integraler Bestandteil von KI-Entwicklungsprozessen."
    ],
    source: "Consilien, FullStack"
  },
  {
    id: "edge-ai",
    title: "Edge-KI und On-Device-Inferenz",
    description: "Verlagerung von KI-Verarbeitung auf Endgeräte für verbesserte Privatsphäre, Latenz und Offline-Nutzung.",
    timeline: "2024-2026",
    impact: "Medium",
    category: "efficiency",
    details: [
      "Optimierte Modelle für Ausführung auf ressourcenbeschränkten Geräten (Smartphones, IoT-Geräte).",
      "Reduzierte Abhängigkeit von Cloud-Diensten für bestimmte KI-Funktionen.",
      "Verbesserte Privatsphäre durch lokale Datenverarbeitung ohne Übertragung sensibler Daten."
    ]
  },
  {
    id: "domain-llms",
    title: "Domänenspezifische LLMs",
    description: "Spezialisierte große Sprachmodelle für bestimmte Branchen und Anwendungsfälle.",
    timeline: "2024-2025",
    impact: "High",
    category: "enterprise",
    details: [
      "Auf spezifische Domänen wie Recht, Medizin, Finanzen oder Technik fokussierte Modelle.",
      "Tieferes Verständnis und höhere Genauigkeit in Nischenanwendungen.",
      "Optimierte Leistung durch spezialisiertes Training auf domänenspezifischen Datensätzen."
    ]
  },
  {
    id: "multi-agent-systems",
    title: "Multi-Agenten-KI-Systeme",
    description: "Mehrere KI-Agenten arbeiten zusammen, um komplexe Aufgaben zu lösen, die über die Fähigkeiten einzelner Modelle hinausgehen.",
    timeline: "2025-2026",
    impact: "Transformative",
    category: "agents",
    details: [
      "Spezialisierte Agenten für unterschiedliche Aspekte komplexer Aufgaben.",
      "Imitiert menschliche Teamarbeit durch Kollaboration und Aufgabenteilung.",
      "Ermöglicht vollautomatisierte Geschäftsprozesse und komplexe Entscheidungsfindung."
    ]
  }
];

// Component for trend cards with animation
const TrendCard: React.FC<{ trend: TrendItem; expanded: boolean; toggleExpand: () => void }> = ({ 
  trend, 
  expanded,
  toggleExpand
}) => {
  const { isDarkMode } = useTheme();
  
  // Theme-aware colors based on category
  const categoryColors = {
    agents: {
      bg: isDarkMode ? 'rgba(79, 70, 229, 0.1)' : 'rgba(238, 242, 255, 0.8)',
      border: isDarkMode ? '#4f46e5' : '#818cf8',
      icon: '🤖'
    },
    efficiency: {
      bg: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 253, 245, 0.8)',
      border: isDarkMode ? '#10b981' : '#34d399',
      icon: '⚡'
    },
    multimodal: {
      bg: isDarkMode ? 'rgba(217, 70, 239, 0.1)' : 'rgba(250, 232, 255, 0.8)',
      border: isDarkMode ? '#d946ef' : '#e879f9',
      icon: '🔄'
    },
    enterprise: {
      bg: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(254, 243, 199, 0.8)',
      border: isDarkMode ? '#f59e0b' : '#fbbf24',
      icon: '🏢'
    },
    democratization: {
      bg: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(219, 234, 254, 0.8)',
      border: isDarkMode ? '#3b82f6' : '#60a5fa',
      icon: '🌐'
    }
  };
  
  // Impact level colors
  const impactColors = {
    'Medium': isDarkMode ? '#38bdf8' : '#0ea5e9',
    'High': isDarkMode ? '#4ade80' : '#16a34a',
    'Very High': isDarkMode ? '#f87171' : '#ef4444',
    'Transformative': isDarkMode ? '#c084fc' : '#9333ea'
  };
  
  return (
    <motion.div
      layout
      onClick={toggleExpand}
      className={`p-4 rounded-lg cursor-pointer border transition-all duration-300 ${expanded ? 'shadow-md' : 'shadow-sm'}`}
      style={{ 
        backgroundColor: 'var(--card-bg)',
        borderColor: categoryColors[trend.category].border,
        borderWidth: expanded ? '2px' : '1px'
      }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <span className="text-xl mr-2">{categoryColors[trend.category].icon}</span>
          <PHeading tag="h4" size="small">{trend.title}</PHeading>
        </div>
        <div 
          className="px-2 py-1 text-xs rounded-full"
          style={{
            backgroundColor: categoryColors[trend.category].bg,
            color: categoryColors[trend.category].border
          }}
        >
          {trend.timeline}
        </div>
      </div>
      
      <PText className="text-sm mb-3">{trend.description}</PText>
      
      <div className="flex justify-between items-center mb-2">
        <div 
          className="px-2 py-1 text-xs rounded-full"
          style={{
            backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)',
            color: impactColors[trend.impact]
          }}
        >
          <span className="font-medium">Impact: {trend.impact}</span>
        </div>
        {trend.source && (
          <div className="text-xs" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
            Quelle: {trend.source}
          </div>
        )}
      </div>
      
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <div className="text-sm font-medium mb-2">Details:</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {trend.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

// Main component
const EmergingTechnologyTrends: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { isDarkMode } = useTheme();
  
  // Filter trends by category
  const filteredTrends = activeCategory 
    ? emergingTrends.filter(trend => trend.category === activeCategory)
    : emergingTrends;
  
  // Category options for filtering
  const categories = [
    { id: null, label: "Alle Trends" },
    { id: "agents", label: "KI-Agenten" },
    { id: "multimodal", label: "Multimodalität" },
    { id: "efficiency", label: "Effizienz & SLMs" },
    { id: "enterprise", label: "Unternehmens-KI" },
    { id: "democratization", label: "Demokratisierung" }
  ];
  
  return (
    <div className="emerging-tech-trends">
      <div className="mb-6">
        <PHeading tag="h3" size="medium" className="mb-2">
          Transformative KI-Trends 2024-2028
        </PHeading>
        <PText className="mb-6">
          Diese Übersicht zeigt die wichtigsten transformativen KI-Trends für die kommenden Jahre. Diese Entwicklungen
          werden die Art und Weise, wie KI in Unternehmen eingesetzt wird, grundlegend verändern und neue
          Anwendungsmöglichkeiten erschließen.
        </PText>
        
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id ?? "all"}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors`}
              style={{
                backgroundColor: activeCategory === category.id 
                  ? (isDarkMode ? '#3b82f6' : '#2563eb') 
                  : (isDarkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.5)'),
                color: activeCategory === category.id 
                  ? '#fff' 
                  : (isDarkMode ? 'rgba(209, 213, 219, 0.9)' : 'rgba(75, 85, 99, 0.9)')
              }}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Trend cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrends.map(trend => (
          <TrendCard 
            key={trend.id}
            trend={trend}
            expanded={expandedId === trend.id}
            toggleExpand={() => setExpandedId(expandedId === trend.id ? null : trend.id)}
          />
        ))}
      </div>
      
      <div className="mt-8 p-4 rounded-lg" style={{ 
        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)'
      }}>
        <PText className="text-sm italic">
          <strong>Hinweis:</strong> Diese Trends sind basierend auf aktuellen Forschungsberichten und Marktanalysen
          von führenden Institutionen und Experten zusammengestellt. Die tatsächliche Entwicklung kann je nach
          technologischen Durchbrüchen, regulatorischen Änderungen und Marktdynamiken variieren.
          Stand: 6. Mai 2025
        </PText>
      </div>
    </div>
  );
};

export default EmergingTechnologyTrends; 