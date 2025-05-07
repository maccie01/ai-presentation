"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PButton from '@/components/ui/PButton';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import Tabs from '@/components/ui/Tabs';
import InfoCard from '@/components/ui/InfoCard';
import Tooltip from '@/components/ui/Tooltip';
import { useTheme } from '@/lib/themeContext';

// Types for the product data
interface Feature {
  name: string;
  description: string;
  supportLevel: 'high' | 'medium' | 'low' | 'none';
  details?: string;
}

interface AIProduct {
  id: string;
  name: string;
  provider: string;
  description: string;
  releaseDate: string;
  keyFeatures: string[];
  useCases: {
    automotive: string[];
    security: string[];
  };
  features: Feature[];
  modelType: string;
  parameters: string;
  contextWindow: string;
  accessMethods: string[];
  logo?: string;
  bestFor: string;
}

// Sample data for AI products
const aiProducts: AIProduct[] = [
  {
    id: "gpt4o",
    name: "GPT-4o / GPT-4 Turbo",
    provider: "OpenAI",
    description: "GPT-4o (\"o\" für \"omni\") ist ein multimodales Sprachmodell mit sehr hoher Leistungsfähigkeit. Es ist schneller und kosteneffizienter als frühere GPT-4 Versionen.",
    releaseDate: "Mai 2024",
    keyFeatures: [
      "Multimodale Fähigkeiten (Text, Bild, Audio Ein-/Ausgabe)",
      "Starkes Reasoning",
      "Exzellente Codierungsfähigkeiten",
      "Schnellere Verarbeitung als frühere GPT-4 Versionen"
    ],
    useCases: {
      automotive: [
        "Dokumentationsanalyse für Fahrzeugkomponenten",
        "Audiovisuelle Interpretation von Fahrzeugsituationen",
        "KI-gestützte Fahrer-Assistenzsysteme"
      ],
      security: [
        "Multimodale Sicherheitsanalyse",
        "Erkennung verdächtiger Aktivitäten in Bildern/Video/Audio",
        "Code-Sicherheitsüberprüfungen"
      ]
    },
    features: [
      { name: "Kontextfenster", description: "Maximale Eingabelänge", supportLevel: "high", details: "128.000 Tokens" },
      { name: "Multimodale Verarbeitung", description: "Unterstützte Medientypen", supportLevel: "high", details: "Text, Bild, Audio" },
      { name: "Reasoning", description: "Fähigkeit zu logischem Denken", supportLevel: "high", details: "Sehr stark in komplexen Schlussfolgerungen" },
      { name: "Codierung", description: "Fähigkeit, Code zu verstehen und zu generieren", supportLevel: "high", details: "Hohe Leistung bei Programmieraufgaben" },
      { name: "Geschwindigkeit", description: "Verarbeitungsgeschwindigkeit", supportLevel: "high", details: "Schneller als frühere Versionen" }
    ],
    modelType: "Multimodales Sprachmodell (LLM)",
    parameters: "Sehr groß (Est. >1T)",
    contextWindow: "128K Tokens (Turbo)",
    accessMethods: ["API", "ChatGPT"],
    bestFor: "Multimodale Interaktion, Allzweckeinsatz, kreatives Schreiben"
  },
  {
    id: "gemini",
    name: "Gemini Familie",
    provider: "Google DeepMind",
    description: "Die Gemini-Familie (2.5 Pro, 2.5 Flash, Ultra) sind leistungsstarke multimodale Sprachmodelle mit besonders langen Kontextfenstern für komplexe Aufgaben.",
    releaseDate: "Mai 2024",
    keyFeatures: [
      "Extrem lange Kontextfenster (bis zu 2M Tokens experimentell mit 2.5 Pro)",
      "Multimodale Verarbeitung",
      "Nahtlose Integration mit Google-Produkten",
      "Starke Leistung bei verschiedenen Benchmarks"
    ],
    useCases: {
      automotive: [
        "Analyse sehr umfangreicher Fahrzeugdaten",
        "Verarbeitung großer Mengen von Sensordaten",
        "Integration mit Google-basierten Fahrzeugsystemen"
      ],
      security: [
        "Langzeit-Sicherheitsanalysen",
        "Verbindung großer Datenmengen für Bedrohungserkennung",
        "Multimodale Sicherheitsüberwachung"
      ]
    },
    features: [
      { name: "Kontextfenster", description: "Maximale Eingabelänge", supportLevel: "high", details: "Bis zu 2M Tokens (2.5 Pro experimentell)" },
      { name: "Multimodale Verarbeitung", description: "Unterstützte Medientypen", supportLevel: "high", details: "Text, Bild, Audio, Video" },
      { name: "Reasoning", description: "Fähigkeit zu logischem Denken", supportLevel: "high", details: "Stark bei langkontextigen Aufgaben" },
      { name: "Codierung", description: "Fähigkeit, Code zu verstehen und zu generieren", supportLevel: "high", details: "Gut für verschiedene Programmiersprachen" },
      { name: "Geschwindigkeit", description: "Verarbeitungsgeschwindigkeit", supportLevel: "medium", details: "Flash-Variante für höhere Geschwindigkeit optimiert" }
    ],
    modelType: "Multimodales Sprachmodell (LLM)",
    parameters: "Sehr groß",
    contextWindow: "2M Tokens",
    accessMethods: ["API", "Google AI Studio"],
    bestFor: "Lange Kontextverarbeitung, Google-Integration, umfangreiche Dokumentenanalyse"
  },
  {
    id: "claude3",
    name: "Claude 3 Familie",
    provider: "Anthropic",
    description: "Claude 3 (Opus, Sonnet, Haiku) ist eine Familie von KI-Assistenten, die für Sicherheit, komplexes Reasoning und Dokumentenanalyse optimiert sind.",
    releaseDate: "März 2024",
    keyFeatures: [
      "Sehr große Kontextfenster (200.000 Tokens)",
      "Hohe Genauigkeit bei komplexen Reasoning-Aufgaben",
      "Starke Sicherheitsmaßnahmen",
      "Ausgezeichnete Dokumentenanalyse"
    ],
    useCases: {
      automotive: [
        "Sichere Verarbeitung sensibler Fahrzeugdaten",
        "Detaillierte Analyse technischer Dokumentationen",
        "Compliance-Überprüfung für Fahrzeugsicherheit"
      ],
      security: [
        "Sichere Verarbeitung vertraulicher Informationen",
        "Ethische KI-Anwendungen mit Constitutional AI",
        "Risikoabschätzung in komplexen Szenarien"
      ]
    },
    features: [
      { name: "Kontextfenster", description: "Maximale Eingabelänge", supportLevel: "high", details: "200.000 Tokens" },
      { name: "Multimodale Verarbeitung", description: "Unterstützte Medientypen", supportLevel: "high", details: "Text und Bilder" },
      { name: "Reasoning", description: "Fähigkeit zu logischem Denken", supportLevel: "high", details: "Stark bei komplexen Dokumentenanalysen" },
      { name: "Codierung", description: "Fähigkeit, Code zu verstehen und zu generieren", supportLevel: "high", details: "Gut für Code-Verständnis und -Erstellung" },
      { name: "Geschwindigkeit", description: "Verarbeitungsgeschwindigkeit", supportLevel: "high", details: "Sonnet (170.4 Tokens/Sek.) besonders schnell" }
    ],
    modelType: "Multimodales Sprachmodell (LLM)",
    parameters: "Sehr groß",
    contextWindow: "200K Tokens",
    accessMethods: ["API", "claude.ai"],
    bestFor: "Sicherheit, Ethik, präzise Dokumentenanalyse"
  },
  {
    id: "llama3",
    name: "Llama 3.1 Familie",
    provider: "Meta AI",
    description: "Die Llama 3.1 Familie (8B, 70B, 405B) ist eine Reihe von leistungsstarken Open-Weights-Modellen mit guter Finetuning-Fähigkeit und mehrsprachiger Unterstützung.",
    releaseDate: "April 2024",
    keyFeatures: [
      "Offene Gewichte für flexible Anwendungen",
      "Verschiedene Modellgrößen (8B bis 405B Parameter)",
      "Gut für Feinabstimmung auf spezifische Anwendungsfälle",
      "Mehrsprachige Unterstützung"
    ],
    useCases: {
      automotive: [
        "Lokale KI-Anwendungen in Fahrzeugen",
        "Anpassbare Sprachassistenten für Automobilhersteller",
        "Mehrsprachige Fahrzeugsysteme für globale Märkte"
      ],
      security: [
        "Lokale Sicherheitsanalyse ohne Cloud-Abhängigkeit",
        "Anpassbare Sicherheitsmodelle für spezifische Bedrohungsszenarien",
        "Datenschutzkonforme KI-Lösungen ohne Datenweitergabe"
      ]
    },
    features: [
      { name: "Kontextfenster", description: "Maximale Eingabelänge", supportLevel: "medium", details: "8K - 128K+ Tokens je nach Version" },
      { name: "Multimodale Verarbeitung", description: "Unterstützte Medientypen", supportLevel: "medium", details: "Primär Text, erweiterbar" },
      { name: "Reasoning", description: "Fähigkeit zu logischem Denken", supportLevel: "high", details: "Besonders gut bei größeren Varianten" },
      { name: "Codierung", description: "Fähigkeit, Code zu verstehen und zu generieren", supportLevel: "high", details: "Stark in der 70B+ Version" },
      { name: "Geschwindigkeit", description: "Verarbeitungsgeschwindigkeit", supportLevel: "medium", details: "Kleinere Varianten (8B) schneller, größere leistungsfähiger" }
    ],
    modelType: "Sprachmodell (LLM)",
    parameters: "8B bis 405B",
    contextWindow: "8K - 128K+ Tokens",
    accessMethods: ["Open Weights"],
    bestFor: "Open-Source-Einsatz, Finetuning, lokale Implementierung"
  },
  {
    id: "mistral",
    name: "Mistral Large / Mixtral 8x22B",
    provider: "Mistral AI",
    description: "Mistral Large und Mixtral 8x22B sind hocheffiziente Modelle mit Mixture-of-Experts (MoE) Architektur für verbesserte Leistung bei reduziertem Ressourcenverbrauch.",
    releaseDate: "März 2024",
    keyFeatures: [
      "Mixture-of-Experts (MoE) Architektur für Effizienz",
      "Hohe Leistung bei vergleichsweise geringerem Ressourcenverbrauch",
      "Europäische Entwicklung mit Fokus auf Datensouveränität",
      "Teilweise offene Modelle für kleinere Varianten"
    ],
    useCases: {
      automotive: [
        "Ressourceneffiziente KI-Anwendungen im Fahrzeug",
        "Europäische Compliance für Automobilhersteller",
        "Spezialisierte Expertensysteme für verschiedene Fahrzeugfunktionen"
      ],
      security: [
        "Datenschutzkonforme KI für europäische Unternehmen",
        "Effiziente Verarbeitung großer Sicherheitsdatenmengen",
        "Spezifische Sicherheitsexpertise durch MoE-Architektur"
      ]
    },
    features: [
      { name: "Kontextfenster", description: "Maximale Eingabelänge", supportLevel: "medium", details: "32K - 64K Tokens" },
      { name: "Multimodale Verarbeitung", description: "Unterstützte Medientypen", supportLevel: "medium", details: "Primär Text" },
      { name: "Reasoning", description: "Fähigkeit zu logischem Denken", supportLevel: "high", details: "Effiziente Reasoning-Fähigkeiten durch MoE" },
      { name: "Codierung", description: "Fähigkeit, Code zu verstehen und zu generieren", supportLevel: "high", details: "Gute Codierungsfähigkeiten" },
      { name: "Geschwindigkeit", description: "Verarbeitungsgeschwindigkeit", supportLevel: "high", details: "Effizient durch selektive Aktivierung von Experten" }
    ],
    modelType: "Sprachmodell (LLM) mit MoE-Architektur",
    parameters: "Large / ~141B (MoE)",
    contextWindow: "32K - 64K Tokens",
    accessMethods: ["API", "Open Weights (einige kleinere Modelle)"],
    bestFor: "Effizienz, EU-Compliance, Ressourcenoptimierung"
  },
  {
    id: "dalle3",
    name: "DALL·E 3",
    provider: "OpenAI",
    description: "Ein fortschrittliches Bild-Generierungsmodell, das qualitativ hochwertige und präzise Bilder basierend auf Textbeschreibungen erzeugt.",
    releaseDate: "Oktober 2023",
    keyFeatures: [
      "Hochwertige Text-zu-Bild-Generierung",
      "Präzise Umsetzung von Textanweisungen",
      "Integration mit ChatGPT",
      "Eingebaute Sicherheitsfunktionen"
    ],
    useCases: {
      automotive: [
        "Konzeptdesign neuer Fahrzeugmodelle",
        "Visualisierung von Designänderungen",
        "Erstellung von Marketingmaterial"
      ],
      security: [
        "Visualisierung von Sicherheitskonzepten",
        "Erstellung von Schulungsmaterial",
        "Illustration von Bedrohungsszenarien"
      ]
    },
    features: [
      { name: "Bildqualität", description: "Qualität der generierten Bilder", supportLevel: "high", details: "Hochauflösend mit feinen Details" },
      { name: "Textbefolgung", description: "Genauigkeit bei der Umsetzung von Textbeschreibungen", supportLevel: "high", details: "Präzise Umsetzung komplexer Anweisungen" },
      { name: "Stilvielfalt", description: "Verschiedene künstlerische Stile", supportLevel: "high", details: "Breites Spektrum an Kunststilen" },
      { name: "Sicherheitsfeatures", description: "Eingebaute Sicherheitsmechanismen", supportLevel: "high", details: "Filterung problematischer Inhalte" },
      { name: "Integration", description: "Integration mit anderen Systemen", supportLevel: "high", details: "Nahtlose Integration mit ChatGPT" }
    ],
    modelType: "Text-zu-Bild-Generierung",
    parameters: "N/A (Bild-Generator)",
    contextWindow: "N/A",
    accessMethods: ["API", "ChatGPT"],
    bestFor: "Präzise Bilderstellung, ChatGPT-Integration, Marketing"
  },
  {
    id: "stablediffusion",
    name: "Stable Diffusion 3",
    provider: "Stability AI",
    description: "Ein Open-Source-Bildgenerierungsmodell mit starker Community, hoher Anpassbarkeit und multimodalen Fähigkeiten.",
    releaseDate: "März 2024",
    keyFeatures: [
      "Open-Source-Architektur",
      "Starke Community-Unterstützung",
      "Hochgradig anpassbar",
      "Multimodale Fähigkeiten"
    ],
    useCases: {
      automotive: [
        "Individualisierte Fahrzeugvisualisierungen",
        "Anpassbare Designwerkzeuge für Hersteller",
        "Prototyping neuer Konzepte"
      ],
      security: [
        "Lokale Bildgenerierung ohne Cloud-Abhängigkeit",
        "Anpassbare Sicherheitstrainingsvisualisierungen",
        "Flexible Einsatzszenarien ohne Datenweitergabe"
      ]
    },
    features: [
      { name: "Bildqualität", description: "Qualität der generierten Bilder", supportLevel: "high", details: "Hohe Qualität mit kontinuierlichen Verbesserungen" },
      { name: "Textbefolgung", description: "Genauigkeit bei der Umsetzung von Textbeschreibungen", supportLevel: "medium", details: "Gute Umsetzung von Anweisungen" },
      { name: "Stilvielfalt", description: "Verschiedene künstlerische Stile", supportLevel: "high", details: "Extrem vielseitig durch Community-Erweiterungen" },
      { name: "Anpassbarkeit", description: "Möglichkeit der Anpassung", supportLevel: "high", details: "Hochgradig anpassbar durch Open-Source-Natur" },
      { name: "Lokale Ausführung", description: "Fähigkeit zur lokalen Ausführung", supportLevel: "high", details: "Kann lokal auf eigener Hardware ausgeführt werden" }
    ],
    modelType: "Text-zu-Bild-Generierung",
    parameters: "N/A (Bild-Generator)",
    contextWindow: "N/A",
    accessMethods: ["Open Weights", "API"],
    bestFor: "Anpassbare Bildgenerierung, lokale Ausführung, Community-Erweiterungen"
  },
  {
    id: "sora",
    name: "Sora",
    provider: "OpenAI",
    description: "Ein fortschrittliches Text-zu-Video-Generierungsmodell, das hochwertige Videos mit komplexen Szenen und Charakteren erstellen kann.",
    releaseDate: "Februar 2024",
    keyFeatures: [
      "Hochwertige Text-zu-Video-Generierung",
      "Komplexe Szenen und Charaktere",
      "Cinematische Qualität",
      "Physikalische Konsistenz"
    ],
    useCases: {
      automotive: [
        "Visualisierung von Fahrzeugkonzepten in Bewegung",
        "Simulation von Fahrzeugbewegung und -verhalten",
        "Erstellung von Marketingvideos"
      ],
      security: [
        "Simulation von Sicherheitsszenarien",
        "Erstellung von Trainingsvideos",
        "Visualisierung von Sicherheitsmaßnahmen"
      ]
    },
    features: [
      { name: "Videoqualität", description: "Qualität der generierten Videos", supportLevel: "high", details: "Hochwertige Videos mit feinen Details" },
      { name: "Längendauer", description: "Maximale Videolänge", supportLevel: "medium", details: "Kurze bis mittellange Clips" },
      { name: "Physikalischer Realismus", description: "Realistische Physik in Videos", supportLevel: "high", details: "Gute physikalische Konsistenz" },
      { name: "Komplexität", description: "Fähigkeit zur Darstellung komplexer Szenen", supportLevel: "high", details: "Komplexe Szenen und Charaktere" },
      { name: "Integration", description: "Integration mit anderen Systemen", supportLevel: "medium", details: "Begrenzte API-Funktionalität" }
    ],
    modelType: "Text-zu-Video-Generierung",
    parameters: "N/A (Video-Generator)",
    contextWindow: "N/A",
    accessMethods: ["Begrenzter Zugang"],
    bestFor: "Hochwertige Videogenerierung, realistische Bewegungssimulation, visuelle Storytelling"
  },
  {
    id: "phi3",
    name: "Phi-3 Familie",
    provider: "Microsoft",
    description: "Eine Familie kleinerer Sprachmodelle (SLMs), die für Qualität statt Größe optimiert sind, ideal für ressourcenbeschränkte Szenarien.",
    releaseDate: "April 2024",
    keyFeatures: [
      "Kleine bis mittlere Modellgrößen (z.B. 3,8B mini)",
      "Für On-Device-Einsatz optimiert",
      "Ressourceneffizient",
      "Fokus auf Qualität statt Größe"
    ],
    useCases: {
      automotive: [
        "Edge-Anwendungen in Fahrzeugen",
        "Lokale Sprachverarbeitung ohne Cloud",
        "Ressourceneffiziente KI für eingebettete Systeme"
      ],
      security: [
        "On-Device-Sicherheitsanalyse",
        "Datenschutzkonforme lokale Verarbeitung",
        "Einsatz in ressourcenbeschränkten Sicherheitsgeräten"
      ]
    },
    features: [
      { name: "Kontextfenster", description: "Maximale Eingabelänge", supportLevel: "medium", details: "Bis zu 128K Tokens" },
      { name: "Ressourceneffizienz", description: "Effizienz bei Hardware-Ressourcen", supportLevel: "high", details: "Optimiert für begrenzte Ressourcen" },
      { name: "On-Device-Fähigkeit", description: "Fähigkeit zur lokalen Ausführung", supportLevel: "high", details: "Speziell für On-Device-Anwendungen konzipiert" },
      { name: "Leistung-zu-Größe", description: "Leistungsfähigkeit im Verhältnis zur Größe", supportLevel: "high", details: "Sehr gute Leistung bei kleiner Modellgröße" },
      { name: "Anpassbarkeit", description: "Möglichkeit der Anpassung", supportLevel: "medium", details: "Kann für spezifische Aufgaben angepasst werden" }
    ],
    modelType: "Small Language Model (SLM)",
    parameters: "Klein bis Mittel (z.B. 3,8B mini)",
    contextWindow: "128K Tokens",
    accessMethods: ["Open Weights (einige)"],
    bestFor: "Edge-Computing, ressourcenbeschränkte Geräte, eingebettete Systeme"
  },
  {
    id: "gpt4mini",
    name: "GPT-4o mini",
    provider: "OpenAI",
    description: "Eine kompaktere Version von GPT-4o, die für kosteneffiziente Anwendungen optimiert ist, bei denen die volle GPT-4o-Leistung nicht erforderlich ist.",
    releaseDate: "Mai 2024",
    keyFeatures: [
      "Kosteneffizient",
      "Schnell",
      "Gute Balance zwischen Leistung und Kosten",
      "Optimiert für Hochdurchsatz-Anwendungen"
    ],
    useCases: {
      automotive: [
        "Alltägliche Fahrzeugassistenzfunktionen",
        "Kostengünstige KI für Massenmarktfahrzeuge",
        "Effiziente Sprachverarbeitung im Fahrzeug"
      ],
      security: [
        "Breitflächige Sicherheitsüberwachung",
        "Kosteneffiziente Analyseanwendungen",
        "High-Throughput-Sicherheitsscanning"
      ]
    },
    features: [
      { name: "Kontextfenster", description: "Maximale Eingabelänge", supportLevel: "high", details: "128K Tokens" },
      { name: "Kosteneffizienz", description: "Kosten-Leistungs-Verhältnis", supportLevel: "high", details: "$0.0007/1K Tokens" },
      { name: "Geschwindigkeit", description: "Verarbeitungsgeschwindigkeit", supportLevel: "high", details: "Optimiert für hohen Durchsatz" },
      { name: "Reasoning", description: "Fähigkeit zu logischem Denken", supportLevel: "medium", details: "Gut für die meisten Anwendungsfälle" },
      { name: "Leistungseffizienz", description: "Leistung im Verhältnis zum Aufwand", supportLevel: "high", details: "Für kostensensitive Anwendungen optimiert" }
    ],
    modelType: "Sprachmodell (LLM)",
    parameters: "Mittel",
    contextWindow: "128K Tokens",
    accessMethods: ["API"],
    bestFor: "Kosteneffizienz, hoher Durchsatz, alltägliche KI-Aufgaben"
  }
];

// Support level indicator component
const SupportLevel: React.FC<{ level: Feature['supportLevel'] }> = ({ level }) => {
  const { isDarkMode } = useTheme();
  
  // Theme-aware colors
  const levelColors = {
    high: {
      bg: isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(209, 250, 229, 0.8)',
      text: isDarkMode ? '#34d399' : '#10b981',
    },
    medium: {
      bg: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(219, 234, 254, 0.8)',
      text: isDarkMode ? '#60a5fa' : '#3b82f6',
    },
    low: {
      bg: isDarkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(254, 240, 215, 0.8)',
      text: isDarkMode ? '#fbbf24' : '#f59e0b',
    },
    none: {
      bg: isDarkMode ? 'rgba(156, 163, 175, 0.2)' : 'rgba(229, 231, 235, 0.5)',
      text: isDarkMode ? '#9ca3af' : '#6b7280',
    }
  };

  const levelText = {
    high: 'Hoch',
    medium: 'Mittel',
    low: 'Niedrig',
    none: 'Nicht unterstützt'
  };

  return (
    <span 
      className="inline-block px-2 py-1 rounded-full text-xs font-medium"
      style={{ 
        backgroundColor: levelColors[level].bg,
        color: levelColors[level].text
      }}
    >
      {levelText[level]}
    </span>
  );
};

// Product details card component
const ProductCard: React.FC<{ product: AIProduct; onNext: () => void; onPrev: () => void }> = ({ 
  product, 
  onNext, 
  onPrev 
}) => {
  const [activeTab, setActiveTab] = useState<string>('features');
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-lg shadow-lg"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <PHeading tag="h3" size="medium">{product.name}</PHeading>
          <div className="text-sm mt-1" style={{ color: isDarkMode ? 'rgba(209, 213, 219, 0.8)' : 'rgba(107, 114, 128, 0.9)' }}>
            von {product.provider} | Veröffentlicht: {product.releaseDate}
          </div>
        </div>
        <div className="flex space-x-2">
          <PButton variant="secondary" onClick={onPrev}>Zurück</PButton>
          <PButton variant="secondary" onClick={onNext}>Weiter</PButton>
        </div>
      </div>
      
      <PText className="mb-4">
        {product.description}
      </PText>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="rounded-md p-3" style={{ backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)' }}>
          <div className="text-sm font-semibold mb-1">Modelltyp</div>
          <div>{product.modelType}</div>
        </div>
        <div className="rounded-md p-3" style={{ backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)' }}>
          <div className="text-sm font-semibold mb-1">Parameter</div>
          <div>{product.parameters}</div>
        </div>
        <div className="rounded-md p-3" style={{ backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)' }}>
          <div className="text-sm font-semibold mb-1">Kontextfenster</div>
          <div>{product.contextWindow}</div>
        </div>
        <div className="rounded-md p-3" style={{ backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)' }}>
          <div className="text-sm font-semibold mb-1">Zugriffsmöglichkeiten</div>
          <div>{product.accessMethods.join(', ')}</div>
        </div>
      </div>
      
      <Tabs 
        tabs={[
          {
            id: 'features',
            label: 'Hauptmerkmale',
            content: (
              <ul className="list-disc pl-5 space-y-2 mt-4" style={{ color: 'var(--foreground)' }}>
                {product.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )
          },
          {
            id: 'usecases',
            label: 'Anwendungsfälle',
            content: (
              <div className="mt-4">
                <PHeading tag="h4" size="small" className="mb-2">Automobilindustrie</PHeading>
                <ul className="list-disc pl-5 space-y-1 mb-4" style={{ color: 'var(--foreground)' }}>
                  {product.useCases.automotive.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
                
                <PHeading tag="h4" size="small" className="mb-2">Informationssicherheit</PHeading>
                <ul className="list-disc pl-5 space-y-1" style={{ color: 'var(--foreground)' }}>
                  {product.useCases.security.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
            )
          },
          {
            id: 'details',
            label: 'Technische Details',
            content: (
              <div className="space-y-3 mt-4">
                {product.features.map((feature) => (
                  <InfoCard 
                    key={feature.name}
                    title={feature.name}
                    variant="info"
                  >
                    <div>
                      <PText className="mb-2">{feature.description}</PText>
                      <div className="flex justify-between items-center mt-3">
                        <SupportLevel level={feature.supportLevel} />
                        <span 
                          className="text-sm" 
                          style={{ color: isDarkMode ? 'rgba(209, 213, 219, 0.8)' : 'rgba(107, 114, 128, 0.9)' }}
                        >
                          {feature.details}
                        </span>
                      </div>
                    </div>
                  </InfoCard>
                ))}
              </div>
            )
          }
        ]}
        defaultTabId="features"
        onChange={setActiveTab}
      />
    </motion.div>
  );
};

// Feature comparison matrix component
const FeatureComparisonMatrix: React.FC<{ products: AIProduct[] }> = ({ products }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div 
      className="rounded-lg shadow-lg p-6" 
      style={{ 
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)'
      }}
    >
      <PHeading tag="h3" size="medium" className="mb-4">Vergleich der KI-Modelle</PHeading>
      
      <div className="mb-6">
        <PHeading tag="h4" size="small" className="mb-3">Modellübersicht</PHeading>
        <div className="overflow-x-auto">
          <table className="min-w-full" style={{ color: 'var(--foreground)' }}>
            <thead>
              <tr style={{ backgroundColor: isDarkMode ? 'var(--card-bg-darker)' : 'var(--card-bg-lighter)' }}>
                <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Modell</th>
                <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Anbieter</th>
                <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Typ</th>
                <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Parameter</th>
                <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Kontextfenster</th>
                <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Zugriffsmöglichkeiten</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr 
                  key={product.id} 
                  style={{ 
                    backgroundColor: index % 2 === 0 
                      ? isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)'
                      : 'var(--card-bg)'
                  }}
                >
                  <td className="py-3 px-4 border font-medium" style={{ borderColor: 'var(--border-color)' }}>{product.name}</td>
                  <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>{product.provider}</td>
                  <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>{product.modelType}</td>
                  <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>{product.parameters}</td>
                  <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>{product.contextWindow}</td>
                  <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>{product.accessMethods.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mb-8">
        <PHeading tag="h4" size="small" className="mb-3">Stärken & Empfohlene Einsatzbereiche</PHeading>
        <div className="overflow-x-auto">
          <table className="min-w-full" style={{ color: 'var(--foreground)' }}>
            <thead>
              <tr style={{ backgroundColor: isDarkMode ? 'var(--card-bg-darker)' : 'var(--card-bg-lighter)' }}>
                <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Modell</th>
                <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Anbieter</th>
                <th className="py-3 px-4 text-left border" style={{ borderColor: 'var(--border-color)' }}>Besonders geeignet für</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr 
                  key={product.id} 
                  style={{ 
                    backgroundColor: index % 2 === 0 
                      ? isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)'
                      : 'var(--card-bg)'
                  }}
                >
                  <td className="py-3 px-4 border font-medium" style={{ borderColor: 'var(--border-color)' }}>{product.name}</td>
                  <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>{product.provider}</td>
                  <td className="py-3 px-4 border" style={{ borderColor: 'var(--border-color)' }}>{product.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <PHeading tag="h4" size="small" className="mb-3">Kontextfenster-Vergleich</PHeading>
        <div className="flex flex-wrap gap-4">
          {products
            .filter(p => p.contextWindow !== "N/A") // Filter out non-text models
            .sort((a, b) => {
              // Extract the first number from context window string for comparison
              const getFirstNumber = (str: string) => {
                const match = str.match(/\d+/);
                return match ? parseInt(match[0]) : 0;
              };
              return getFirstNumber(b.contextWindow) - getFirstNumber(a.contextWindow);
            })
            .map((product) => (
              <div 
                key={product.id}
                className="p-4 rounded-lg"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)',
                  width: '30%',
                  minWidth: '250px'
                }}
              >
                <div className="font-medium mb-2">{product.name}</div>
                <div className="text-sm mb-1">Kontextfenster: <span className="font-medium">{product.contextWindow}</span></div>
                <div className="h-4 w-full rounded-full overflow-hidden bg-gray-200">
                  <div 
                    className="h-full rounded-full"
                    style={{
                      width: product.contextWindow === "2M Tokens" ? "100%" :
                             product.contextWindow === "200K Tokens" ? "40%" :
                             product.contextWindow === "128K Tokens" ? "25%" :
                             product.contextWindow === "8K - 128K+ Tokens" ? "25%" :
                             product.contextWindow === "32K - 64K Tokens" ? "15%" : "10%",
                      backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb'
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Main component
const ProductShowcase: React.FC = () => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const { isDarkMode } = useTheme();
  
  const nextProduct = () => {
    setActiveProductIndex((prevIndex) => 
      prevIndex === aiProducts.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevProduct = () => {
    setActiveProductIndex((prevIndex) => 
      prevIndex === 0 ? aiProducts.length - 1 : prevIndex - 1
    );
  };
  
  const toggleComparison = () => {
    setShowComparison(prev => !prev);
  };
  
  return (
    <div className="product-showcase">
      <div className="flex justify-between items-center mb-6">
        <PHeading tag="h2" size="large">KI Modelle im Überblick</PHeading>
        <PButton variant="tertiary" onClick={toggleComparison}>
          {showComparison ? 'Produktdetails anzeigen' : 'Produktvergleich anzeigen'}
        </PButton>
      </div>
      
      {!showComparison ? (
        <AnimatePresence mode="wait">
          <ProductCard 
            key={aiProducts[activeProductIndex].id}
            product={aiProducts[activeProductIndex]}
            onNext={nextProduct}
            onPrev={prevProduct}
          />
        </AnimatePresence>
      ) : (
        <FeatureComparisonMatrix products={aiProducts} />
      )}
      
      {!showComparison && (
        <div className="flex justify-center mt-6">
          {aiProducts.map((product, index) => (
            <button
              key={product.id}
              className={`mx-1 w-3 h-3 rounded-full`}
              style={{
                backgroundColor: index === activeProductIndex 
                  ? (isDarkMode ? '#3b82f6' : '#2563eb')
                  : (isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.8)')
              }}
              onClick={() => setActiveProductIndex(index)}
              aria-label={`Show ${product.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductShowcase; 