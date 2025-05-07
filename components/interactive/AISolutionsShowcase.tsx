"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import Tabs from '@/components/ui/Tabs';
import PButton from '@/components/ui/PButton';
import InfoCard from '@/components/ui/InfoCard';
import { useTheme } from '@/lib/themeContext';

// Types for the solution data
interface AISolution {
  id: string;
  name: string;
  primaryFunction: string;
  keyFeatures: string[];
  targetUsers: string[];
  category: 'assistant' | 'creative' | 'productivity' | 'business' | 'development';
  description: string;
}

// Sample data for AI solutions based on the research document
const aiSolutions: AISolution[] = [
  {
    id: "chatgpt",
    name: "ChatGPT (mit GPT-4o/Plugins)",
    primaryFunction: "Konversations-KI, Content-Generierung, Recherche",
    keyFeatures: [
      "Textgenerierung",
      "Coding-Hilfe",
      "Brainstorming",
      "Zusammenfassung",
      "Frage-Antwort",
      "Bildgenerierung (über DALL·E 3)",
      "Datenanalyse",
      "Plugin-Ökosystem für spezifische Aufgaben"
    ],
    targetUsers: ["Allgemeine Nutzer", "Fachleute", "Entwickler"],
    category: "assistant",
    description: "Der populärste KI-Assistent von OpenAI, der eine breite Palette von Aufgaben über eine intuitive Konversationsschnittstelle erledigen kann."
  },
  {
    id: "copilot",
    name: "Microsoft Copilot",
    primaryFunction: "KI-Assistent, Suche, Content-Erstellung",
    keyFeatures: [
      "In Windows, Edge, M365 integriert",
      "Web-Suche mit Grundierung",
      "Text-/Bildgenerierung",
      "Coding-Unterstützung",
      "Datenanalyse in Excel",
      "Zusammenfassung in Word/Outlook"
    ],
    targetUsers: ["M365-Nutzer", "Unternehmensanwender"],
    category: "productivity",
    description: "Microsofts KI-Assistent, der tief in Windows und Microsoft 365 integriert ist und Produktivitätsaufgaben optimiert."
  },
  {
    id: "gemini",
    name: "Google Gemini App / Vertex AI",
    primaryFunction: "Konversations-KI, Multimodale Aufgaben / ML-Plattform",
    keyFeatures: [
      "Gemini App: Mobiler KI-Assistent, multimodale Eingabe",
      "Vertex AI: End-to-End MLOps",
      "Zugriff auf Gemini-Modelle",
      "Benutzerdefiniertes Modelltraining",
      "Datenanalyse"
    ],
    targetUsers: ["Allgemeine Nutzer", "Data Scientists", "ML-Ingenieure"],
    category: "assistant",
    description: "Googles KI-Ökosystem mit der Gemini App für Verbraucher und Vertex AI für ML-Profis."
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    primaryFunction: "KI-gestützte Such- und Antwortmaschine",
    keyFeatures: [
      "Konversationssuche",
      "Liefert Antworten mit zitierten Quellen",
      "Verschiedene Fokusmodi (z.B. akademisch, Schreiben)",
      "Gut für Recherche und schnelles Verständnis"
    ],
    targetUsers: ["Forscher", "Studenten", "Fachleute"],
    category: "assistant",
    description: "Eine spezialisierte Suchmaschine, die Antworten mit Quellennachweisen liefert und für Recherche- und Lernaufgaben optimiert ist."
  },
  {
    id: "claude",
    name: "Claude.ai",
    primaryFunction: "Konversations-KI, Dokumentenanalyse, Kreatives Schreiben",
    keyFeatures: [
      "Starke Zusammenfassung langer Dokumente",
      "Coding",
      "Kreative Textgenerierung",
      "Betonung auf Sicherheit und Hilfsbereitschaft",
      "Kann 'Artifacts' wie einfache UIs erstellen"
    ],
    targetUsers: ["Fachleute", "Autoren", "Entwickler"],
    category: "assistant",
    description: "Anthropics KI-Assistent, der für sicheren, hilfreichen Dialog und hervorragende Dokument- und Textverarbeitung bekannt ist."
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    primaryFunction: "KI-Pair-Programmer",
    keyFeatures: [
      "Code-Vervollständigung",
      "Vorschläge",
      "Funktionsgenerierung",
      "Natürliche Sprache zu Code",
      "In IDEs integriert"
    ],
    targetUsers: ["Softwareentwickler"],
    category: "development",
    description: "Ein spezialisierter KI-Assistent für Programmierer, der Code-Vorschläge in Echtzeit generiert und in gängige Entwicklungsumgebungen integriert ist."
  },
  {
    id: "jasper",
    name: "Jasper",
    primaryFunction: "KI-Schreibassistent für Marketing & Business",
    keyFeatures: [
      "Generiert Marketing-Texte",
      "Blogbeiträge",
      "Social-Media-Inhalte",
      "Produktbeschreibungen",
      "SEO-Optimierung",
      "Markensprache-Konsistenz"
    ],
    targetUsers: ["Vermarkter", "Content-Ersteller", "Unternehmer"],
    category: "business",
    description: "Ein auf Marketing spezialisierter KI-Schreibassistent, der qualitativ hochwertige, markengerechte Inhalte erstellt."
  },
  {
    id: "midjourney",
    name: "Midjourney",
    primaryFunction: "Hochwertige KI-Bildgenerierung",
    keyFeatures: [
      "Bekannt für künstlerische und fotorealistische Bildgenerierung über Discord-Bot",
      "Leistungsstarke Stilkontrolle"
    ],
    targetUsers: ["Künstler", "Designer", "Kreative"],
    category: "creative",
    description: "Ein führendes Text-zu-Bild-Tool, das für seine künstlerische Qualität und fotorealistische Darstellungen bekannt ist."
  },
  {
    id: "runway",
    name: "Runway Gen-2 / RunwayML",
    primaryFunction: "KI-Videogenerierung & Bearbeitungsplattform",
    keyFeatures: [
      "Text-zu-Video",
      "Bild-zu-Video",
      "Video-zu-Video",
      "KI-Magic-Tools für Videobearbeitung (Inpainting, Motion Tracking, Green Screen)"
    ],
    targetUsers: ["Videoersteller", "Filmemacher", "Vermarkter"],
    category: "creative",
    description: "Eine fortschrittliche Plattform für KI-gestützte Videogenerierung und -bearbeitung mit professionellen Features."
  },
  {
    id: "synthesia",
    name: "Synthesia",
    primaryFunction: "KI-Videogenerierung mit Avataren",
    keyFeatures: [
      "Erstellt Videos mit KI-Avataren aus Textskripten",
      "Mehrsprachig",
      "Gut für Trainingsvideos, Unternehmenskommunikation"
    ],
    targetUsers: ["L&D", "Marketing", "Vertriebsteams"],
    category: "creative",
    description: "Eine Plattform zum Erstellen von Erklär- und Schulungsvideos mit KI-generierten Sprechern aus einfachen Textskripten."
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    primaryFunction: "KI-Funktionen innerhalb des Notion-Workspace",
    keyFeatures: [
      "Zusammenfassung",
      "Extraktion von Aktionspunkten",
      "Entwurf",
      "Übersetzung",
      "Brainstorming direkt in Notion-Seiten und Datenbanken"
    ],
    targetUsers: ["Notion-Nutzer", "Teams für Wissensmanagement"],
    category: "productivity",
    description: "Integrierte KI-Funktionen in der Notion-Plattform zur Verbesserung von Produktivität und Wissensmanagement."
  },
  {
    id: "zapier",
    name: "Zapier Centrals",
    primaryFunction: "Workflow-Automatisierung mit KI",
    keyFeatures: [
      "Automatisiert Aufgaben über tausende von Apps hinweg",
      "KI-Tools für Datenformatierung",
      "Content-Generierung",
      "Entscheidungsfindung innerhalb von Zaps"
    ],
    targetUsers: ["Business-Nutzer", "IT-Fachleute", "Automatisierer"],
    category: "productivity",
    description: "Eine Plattform zur Workflow-Automatisierung zwischen verschiedenen Apps und Diensten mit zusätzlichen KI-Funktionen."
  },
  {
    id: "guru",
    name: "Guru",
    primaryFunction: "KI-gestützte Unternehmenssuche & Wissensmanagement",
    keyFeatures: [
      "Vereint Unternehmenswissen aus verschiedenen Apps (Google Docs, Slack, Salesforce)",
      "Bietet verifizierte, kontextbezogene Antworten innerhalb von Workflows"
    ],
    targetUsers: ["Vertrieb", "Support", "HR", "IT", "Betriebsteams"],
    category: "business",
    description: "Eine Plattform, die Unternehmenswissen vereinheitlicht und kontextbezogene Antworten aus verschiedenen Quellen liefert."
  },
  {
    id: "dataiku",
    name: "Dataiku",
    primaryFunction: "Kollaborative Data Science & ML-Plattform",
    keyFeatures: [
      "End-to-End-Plattform für Datenvorbereitung",
      "Modellentwicklung",
      "Deployment und Überwachung",
      "Unterstützt visuelle Workflows und Coding"
    ],
    targetUsers: ["Data Scientists", "Analysten", "ML-Ingenieure"],
    category: "business",
    description: "Eine umfassende Plattform für Datenwissenschaft und Machine Learning mit Tools für die gesamte ML-Pipeline."
  },
  {
    id: "grammarly",
    name: "Grammarly",
    primaryFunction: "KI-gestützter Schreibassistent",
    keyFeatures: [
      "Grammatik-/Rechtschreibprüfung",
      "Stil-/Tonvorschläge",
      "Klarheitsverbesserungen",
      "Plagiatserkennung",
      "Generative KI-Funktionen für Entwurf/Umschreiben"
    ],
    targetUsers: ["Alle, die schreiben"],
    category: "productivity",
    description: "Ein beliebter Schreibassistent, der Texte auf Grammatik, Stil und Klarheit prüft und mit generativen KI-Funktionen erweitert wurde."
  }
];

// Filter solutions by category
const filterSolutionsByCategory = (solutions: AISolution[], category: string | null) => {
  if (!category) return solutions;
  return solutions.filter(solution => solution.category === category);
};

// Solution card component
const SolutionCard: React.FC<{ solution: AISolution }> = ({ solution }) => {
  const { isDarkMode } = useTheme();
  
  const categoryColors = {
    assistant: { bg: isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(219, 234, 254, 0.8)", border: isDarkMode ? "#3b82f6" : "#93c5fd" },
    creative: { bg: isDarkMode ? "rgba(217, 70, 239, 0.15)" : "rgba(250, 232, 255, 0.8)", border: isDarkMode ? "#d946ef" : "#e879f9" },
    productivity: { bg: isDarkMode ? "rgba(16, 185, 129, 0.15)" : "rgba(209, 250, 229, 0.8)", border: isDarkMode ? "#10b981" : "#34d399" },
    business: { bg: isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(254, 243, 199, 0.8)", border: isDarkMode ? "#f59e0b" : "#fbbf24" },
    development: { bg: isDarkMode ? "rgba(107, 114, 128, 0.15)" : "rgba(243, 244, 246, 0.8)", border: isDarkMode ? "#6b7280" : "#9ca3af" }
  };

  const categoryLabels = {
    assistant: "KI-Assistent",
    creative: "Kreativ-Tool",
    productivity: "Produktivität",
    business: "Business",
    development: "Entwicklung"
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
      className="p-4 rounded-lg border h-full flex flex-col"
      style={{ 
        backgroundColor: 'var(--card-bg)',
        borderColor: categoryColors[solution.category].border
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <PHeading tag="h3" size="small">{solution.name}</PHeading>
        <span 
          className="text-xs px-2 py-1 rounded-full"
          style={{ 
            backgroundColor: categoryColors[solution.category].bg,
            color: categoryColors[solution.category].border,
            border: `1px solid ${categoryColors[solution.category].border}`
          }}
        >
          {categoryLabels[solution.category]}
        </span>
      </div>
      
      <PText className="text-sm mb-3 flex-grow">{solution.description}</PText>
      
      <div className="mt-2">
        <div className="text-sm font-semibold mb-1">Primäre Funktion:</div>
        <PText className="text-sm mb-3">{solution.primaryFunction}</PText>
        
        <div className="text-sm font-semibold mb-1">Zielgruppe:</div>
        <div className="flex flex-wrap gap-1 mb-3">
          {solution.targetUsers.map(user => (
            <span 
              key={user} 
              className="text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.8)',
                color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : 'rgba(75, 85, 99, 0.9)'
              }}
            >
              {user}
            </span>
          ))}
        </div>
        
        <div className="text-sm font-semibold mb-1">Hauptmerkmale:</div>
        <ul className="list-disc pl-5 text-sm" style={{ color: 'var(--foreground)' }}>
          {solution.keyFeatures.slice(0, 3).map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
          {solution.keyFeatures.length > 3 && (
            <li className="text-sm" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.9)' : 'rgba(107, 114, 128, 0.9)' }}>
              {solution.keyFeatures.length - 3} weitere...
            </li>
          )}
        </ul>
      </div>
    </motion.div>
  );
};

// Category filter component
const CategoryFilter: React.FC<{ 
  activeCategory: string | null, 
  onCategoryChange: (category: string | null) => void 
}> = ({ activeCategory, onCategoryChange }) => {
  const { isDarkMode } = useTheme();

  const categories = [
    { id: null, label: "Alle" },
    { id: "assistant", label: "KI-Assistenten" },
    { id: "creative", label: "Kreativ-Tools" },
    { id: "productivity", label: "Produktivität" },
    { id: "business", label: "Business & Enterprise" },
    { id: "development", label: "Entwicklung" }
  ];

  return (
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
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

// Main component
const AISolutionsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const { isDarkMode } = useTheme();
  
  const filteredSolutions = filterSolutionsByCategory(aiSolutions, activeCategory);
  
  return (
    <div className="ai-solutions-showcase">
      <div className="flex justify-between items-center mb-6">
        <PHeading tag="h2" size="large">KI-Produkte im Überblick</PHeading>
        <div className="flex gap-2">
          <PButton 
            variant={viewMode === 'grid' ? 'primary' : 'secondary'} 
            onClick={() => setViewMode('grid')}
          >
            Kacheln
          </PButton>
          <PButton 
            variant={viewMode === 'table' ? 'primary' : 'secondary'} 
            onClick={() => setViewMode('table')}
          >
            Tabelle
          </PButton>
        </div>
      </div>
      
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
      {viewMode === 'grid' ? (
        <PGrid className="mb-8 gap-4">
          {filteredSolutions.map(solution => (
            <PGridItem key={solution.id} size={4} className="h-full">
              <SolutionCard solution={solution} />
            </PGridItem>
          ))}
        </PGrid>
      ) : (
        <div 
          className="rounded-lg shadow-lg overflow-x-auto"
          style={{ backgroundColor: 'var(--card-bg)' }}
        >
          <table className="min-w-full" style={{ color: 'var(--foreground)' }}>
            <thead>
              <tr style={{ backgroundColor: isDarkMode ? 'var(--card-bg-darker)' : 'var(--card-bg-lighter)' }}>
                <th className="py-3 px-4 text-left border-b" style={{ borderColor: 'var(--border-color)' }}>Name</th>
                <th className="py-3 px-4 text-left border-b" style={{ borderColor: 'var(--border-color)' }}>Kategorie</th>
                <th className="py-3 px-4 text-left border-b" style={{ borderColor: 'var(--border-color)' }}>Primäre Funktion</th>
                <th className="py-3 px-4 text-left border-b" style={{ borderColor: 'var(--border-color)' }}>Zielgruppe</th>
              </tr>
            </thead>
            <tbody>
              {filteredSolutions.map((solution, index) => {
                const categoryLabels = {
                  assistant: "KI-Assistent",
                  creative: "Kreativ-Tool",
                  productivity: "Produktivität",
                  business: "Business",
                  development: "Entwicklung"
                };
                
                return (
                  <tr 
                    key={solution.id} 
                    style={{ 
                      backgroundColor: index % 2 === 0 
                        ? isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)'
                        : 'var(--card-bg)'
                    }}
                  >
                    <td className="py-3 px-4 border-b font-medium" style={{ borderColor: 'var(--border-color)' }}>
                      <div>{solution.name}</div>
                      <div className="text-xs mt-1" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.9)' : 'rgba(107, 114, 128, 0.9)' }}>
                        {solution.description.length > 80 
                          ? `${solution.description.substring(0, 80)}...` 
                          : solution.description}
                      </div>
                    </td>
                    <td className="py-3 px-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      {categoryLabels[solution.category]}
                    </td>
                    <td className="py-3 px-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      {solution.primaryFunction}
                    </td>
                    <td className="py-3 px-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      {solution.targetUsers.join(', ')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      <PText className="text-xs mt-4" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
        Datenquelle: Aktualisierte Forschung, Stand: 6. Mai 2025
      </PText>

      <div className="mt-8">
        <InfoCard 
          title="Business-Impact von KI-Plattformen" 
          variant="info"
        >
          <PText className="mb-4">
            KI-Plattformen und -Lösungen werden zunehmend zu unverzichtbaren Werkzeugen für Unternehmen aller Größen.
            Laut aktuellen Daten von McKinsey ist die allgemeine KI-Adoption in Unternehmen auf 72% gestiegen,
            ein deutlicher Anstieg von etwa 50%, wo sie in den vorherigen sechs Jahren verharrte.
          </PText>
          <PGrid>
            <PGridItem size={4}>
              <div className="text-center p-3 rounded-lg" style={{ backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: isDarkMode ? '#3b82f6' : '#2563eb' }}>72%</div>
                <div className="text-sm">Unternehmens-KI-Adoption 2024</div>
              </div>
            </PGridItem>
            <PGridItem size={4}>
              <div className="text-center p-3 rounded-lg" style={{ backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: isDarkMode ? '#10b981' : '#047857' }}>38%</div>
                <div className="text-sm">Prognostiziertes KI-Marktwachstum 2025</div>
              </div>
            </PGridItem>
            <PGridItem size={4}>
              <div className="text-center p-3 rounded-lg" style={{ backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: isDarkMode ? '#f59e0b' : '#d97706' }}>638,23 Mrd. $</div>
                <div className="text-sm">Globaler KI-Marktwert 2024</div>
              </div>
            </PGridItem>
          </PGrid>
        </InfoCard>
      </div>
    </div>
  );
};

export default AISolutionsShowcase; 