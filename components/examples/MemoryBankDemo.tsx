"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import InfoCard from '@/components/ui/InfoCard';
import Tabs from '@/components/ui/Tabs';
import CodeEditor from '@/components/interactive/CodeEditor';
import { useTheme } from '@/lib/themeContext';

// Types for memory bank API
interface MemoryItem {
  id: string;
  type: 'user' | 'system' | 'document';
  content: string;
  metadata: {
    timestamp: string;
    tags: string[];
    source?: string;
    importance: number;
  };
}

// Memory API endpoints and operations
const memoryApiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/memory',
    description: 'Speichert ein neues Memory-Item in der Memory Bank',
    requestExample: `{
  "type": "user",
  "content": "Der Benutzer bevorzugt detaillierte technische Erklärungen.",
  "metadata": {
    "tags": ["preference", "communication_style"],
    "importance": 0.8
  }
}`,
    responseExample: `{
  "success": true,
  "id": "mem_1a2b3c4d5e",
  "timestamp": "2023-10-15T14:30:45Z"
}`
  },
  {
    method: 'GET',
    endpoint: '/api/memory/:id',
    description: 'Ruft ein spezifisches Memory-Item anhand seiner ID ab',
    requestExample: 'GET /api/memory/mem_1a2b3c4d5e',
    responseExample: `{
  "id": "mem_1a2b3c4d5e",
  "type": "user",
  "content": "Der Benutzer bevorzugt detaillierte technische Erklärungen.",
  "metadata": {
    "timestamp": "2023-10-15T14:30:45Z",
    "tags": ["preference", "communication_style"],
    "importance": 0.8
  }
}`
  },
  {
    method: 'GET',
    endpoint: '/api/memory/search',
    description: 'Durchsucht die Memory Bank nach relevanten Einträgen',
    requestExample: `{
  "query": "Benutzerpräferenzen",
  "type": "user",
  "tags": ["preference"],
  "limit": 5
}`,
    responseExample: `{
  "results": [
    {
      "id": "mem_1a2b3c4d5e",
      "type": "user",
      "content": "Der Benutzer bevorzugt detaillierte technische Erklärungen.",
      "metadata": {
        "timestamp": "2023-10-15T14:30:45Z",
        "tags": ["preference", "communication_style"],
        "importance": 0.8
      },
      "relevance": 0.92
    },
    // weitere Ergebnisse...
  ],
  "total": 12
}`
  },
  {
    method: 'PUT',
    endpoint: '/api/memory/:id',
    description: 'Aktualisiert ein bestehendes Memory-Item',
    requestExample: `{
  "content": "Der Benutzer bevorzugt detaillierte technische Erklärungen mit Beispielen.",
  "metadata": {
    "tags": ["preference", "communication_style", "examples"],
    "importance": 0.9
  }
}`,
    responseExample: `{
  "success": true,
  "id": "mem_1a2b3c4d5e",
  "timestamp": "2023-10-16T09:15:30Z"
}`
  },
  {
    method: 'DELETE',
    endpoint: '/api/memory/:id',
    description: 'Löscht ein Memory-Item aus der Memory Bank',
    requestExample: 'DELETE /api/memory/mem_1a2b3c4d5e',
    responseExample: `{
  "success": true,
  "id": "mem_1a2b3c4d5e"
}`
  },
  {
    method: 'POST',
    endpoint: '/api/memory/prompt',
    description: 'Generiert einen angereicherten Prompt mit relevanten Memory-Items',
    requestExample: `{
  "basePrompt": "Erkläre die Funktionsweise eines Elektromotors.",
  "contextTypes": ["user", "document"],
  "maxItems": 3
}`,
    responseExample: `{
  "enrichedPrompt": "Erkläre die Funktionsweise eines Elektromotors. Beachte dabei: Der Benutzer bevorzugt detaillierte technische Erklärungen mit Beispielen. Er hat zuvor nach Informationen über Magnetfelder gesucht. Er arbeitet im Automobilbereich.",
  "usedMemoryItems": [
    {
      "id": "mem_1a2b3c4d5e",
      "type": "user",
      "relevance": 0.92
    },
    // weitere genutzte Memory-Items...
  ]
}`
  }
];

// API specification diagram component
const MemoryApiSpecification: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(memoryApiEndpoints[0]);
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Memory Bank API Spezifikation</PHeading>
      
      <div className="mb-6 rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)',
        borderColor: 'var(--border-color)'
      }}>
        <PText className="mb-3">
          Die Memory Bank API ermöglicht das Speichern, Abrufen und Verwalten von Gedächtnisinformationen für KI-Systeme.
          Diese API-Endpunkte bilden die Grundlage für die Integration von persistentem Gedächtnis in Ihre Anwendungen.
        </PText>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <PHeading tag="h5" size="small" className="mb-2">Primäre Funktionen:</PHeading>
            <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
              <li>Speichern von Benutzerinteraktionen</li>
              <li>Verwalten von dokumentbasiertem Wissen</li>
              <li>Semantische Suche nach relevanten Informationen</li>
              <li>Automatische Prompt-Anreicherung</li>
              <li>Priorisierung von Informationen nach Relevanz</li>
            </ul>
          </div>
          <div>
            <PHeading tag="h5" size="small" className="mb-2">Integrationsoptionen:</PHeading>
            <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
              <li>REST API für direkte Integration</li>
              <li>JavaScript-Client-Bibliothek</li>
              <li>Serverlose Funktionsintegrationen</li>
              <li>Webhook-Events für Echtzeit-Updates</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* API Endpoints Navigation */}
      <div className="rounded-lg overflow-hidden mb-6 border" style={{ 
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)'
      }}>
        <div className="flex overflow-x-auto">
          {memoryApiEndpoints.map((endpoint, index) => (
            <button
              key={index}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap`}
              style={{
                backgroundColor: selectedEndpoint === endpoint 
                  ? (isDarkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(219, 234, 254, 0.8)')
                  : 'transparent',
                color: selectedEndpoint === endpoint 
                  ? (isDarkMode ? '#60a5fa' : '#2563eb')
                  : 'var(--foreground)',
                borderBottom: selectedEndpoint === endpoint 
                  ? `2px solid ${isDarkMode ? '#60a5fa' : '#3b82f6'}`
                  : 'none'
              }}
              onClick={() => setSelectedEndpoint(endpoint)}
            >
              <span className={`mr-2 font-mono`} style={{
                color: endpoint.method === 'GET' 
                  ? (isDarkMode ? '#34d399' : '#10b981')
                  : endpoint.method === 'POST' 
                  ? (isDarkMode ? '#60a5fa' : '#2563eb')
                  : endpoint.method === 'PUT' 
                  ? (isDarkMode ? '#fbbf24' : '#d97706')
                  : (isDarkMode ? '#f87171' : '#ef4444')
              }}>
                {endpoint.method}
              </span>
              {endpoint.endpoint}
            </button>
          ))}
        </div>
        
        {/* Selected Endpoint Details */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="mb-3">
            <PHeading tag="h5" size="small">{selectedEndpoint.description}</PHeading>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Request:</div>
              <div className="p-3 rounded-md font-mono text-sm overflow-auto whitespace-pre" style={{ 
                backgroundColor: isDarkMode ? '#1f2937' : '#1f2937',
                color: isDarkMode ? '#f3f4f6' : '#f3f4f6'
              }}>
                {selectedEndpoint.requestExample}
              </div>
            </div>
            <div>
              <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Response:</div>
              <div className="p-3 rounded-md font-mono text-sm overflow-auto whitespace-pre" style={{ 
                backgroundColor: isDarkMode ? '#1f2937' : '#1f2937',
                color: isDarkMode ? '#f3f4f6' : '#f3f4f6'
              }}>
                {selectedEndpoint.responseExample}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <InfoCard 
        title="Sicherheitshinweise"
        variant="warning"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        }
      >
        <PText size="small">
          <ul className="list-disc pl-4">
            <li className="mb-1">Implementieren Sie angemessene Authentifizierung und Autorisierung für alle API-Endpunkte.</li>
            <li className="mb-1">Speichern Sie keine sensiblen persönlichen Daten ohne angemessene Verschlüsselung und Datenschutzmaßnahmen.</li>
            <li className="mb-1">Implementieren Sie Mechanismen zur Datenminimierung und automatischen Löschung nicht mehr benötigter Informationen.</li>
            <li>Stellen Sie sicher, dass Benutzer Kontrolle über ihre gespeicherten Informationen haben (Einsicht, Bearbeitung, Löschung).</li>
          </ul>
        </PText>
      </InfoCard>
    </div>
  );
};

// Storage and retrieval flow stages
const storageStages = [
  {
    id: 'capture',
    name: 'Erfassung',
    description: 'Extraktion relevanter Informationen aus verschiedenen Quellen.',
    substeps: [
      'Analyse von Benutzerinteraktionen',
      'Verarbeitung von Dokumenten und Inhalten',
      'Erfassung von Systemzuständen und Ereignissen'
    ]
  },
  {
    id: 'processing',
    name: 'Verarbeitung',
    description: 'Strukturierung und Anreicherung der erfassten Informationen.',
    substeps: [
      'Extraktion von Entitäten und Konzepten',
      'Kategorisierung und Tagging',
      'Relevanz- und Wichtigkeitsbewertung'
    ]
  },
  {
    id: 'storage',
    name: 'Speicherung',
    description: 'Persistentes Speichern der verarbeiteten Informationen.',
    substeps: [
      'Zuweisung eindeutiger Identifikatoren',
      'Indexierung für schnellen Zugriff',
      'Speicherung mit Metadaten'
    ]
  }
];

const retrievalStages = [
  {
    id: 'query',
    name: 'Abfrage',
    description: 'Formulierung der Suchanfrage basierend auf aktuellem Kontext.',
    substeps: [
      'Analyse des aktuellen Benutzerkontexts',
      'Identifikation relevanter Suchbegriffe',
      'Formulierung strukturierter Abfragen'
    ]
  },
  {
    id: 'search',
    name: 'Suche',
    description: 'Durchsuchen der Memory Bank nach relevanten Informationen.',
    substeps: [
      'Exakte und semantische Suche',
      'Filterung nach Metadaten',
      'Relevanzbasierte Sortierung'
    ]
  },
  {
    id: 'ranking',
    name: 'Ranking',
    description: 'Priorisierung der gefundenen Informationen nach Relevanz.',
    substeps: [
      'Berechnung kontextueller Relevanz',
      'Zeitliche Priorisierung',
      'Berücksichtigung von Wichtigkeitsbewertungen'
    ]
  },
  {
    id: 'integration',
    name: 'Integration',
    description: 'Einbindung der ausgewählten Informationen in den Prompt.',
    substeps: [
      'Zusammenfassung und Komprimierung',
      'Strukturierte Formatierung',
      'Kombinieren mit Benutzeranfrage'
    ]
  }
];

// Memory storage and retrieval flow component
const MemoryStorageRetrievalFlow: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Speicher- und Abrufprozess</PHeading>
      
      <div className="mb-6 rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.2)' : 'rgba(219, 234, 254, 0.8)', 
        borderColor: isDarkMode ? 'rgba(37, 99, 235, 0.4)' : 'rgba(191, 219, 254, 0.8)'
      }}>
        <PText>
          Der Memory-Speicher- und Abrufprozess umfasst mehrere Schlüsselphasen, von der Datenerfassung 
          über die Verarbeitung und Speicherung bis hin zum gezielten Abruf relevanter Informationen. 
          Klicken Sie auf die einzelnen Phasen, um mehr Details zu erfahren.
        </PText>
      </div>
      
      {/* Process Flow Visualization - Fixed to prevent overlap issues */}
      <div className="relative mb-6 overflow-x-auto">
        <div className="min-w-[700px] py-4">
          {/* Connection lines */}
          <div className="absolute top-[40px] left-0 w-full h-2" style={{ 
            zIndex: 0,
          }}>
            <svg width="100%" height="2">
              <line 
                x1="10%" 
                y1="1" 
                x2="90%" 
                y2="1" 
                stroke={isDarkMode ? 'rgba(75, 85, 99, 0.5)' : '#d1d5db'} 
                strokeWidth="2" 
                strokeDasharray="5,5"
              />
            </svg>
          </div>
          
          {/* Process steps */}
          <div className="flex justify-between items-center relative" style={{ zIndex: 1 }}>
            {storageStages.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center relative">
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer mb-2`}
                  style={{ 
                    backgroundColor: selectedStage === stage.id 
                      ? (isDarkMode ? 'rgba(37, 99, 235, 0.6)' : '#3b82f6')
                      : (isDarkMode ? 'rgba(75, 85, 99, 0.3)' : '#e5e7eb'),
                    color: selectedStage === stage.id 
                      ? '#ffffff' 
                      : (isDarkMode ? '#e5e7eb' : '#4b5563'),
                    border: `2px solid ${selectedStage === stage.id 
                      ? (isDarkMode ? '#60a5fa' : '#2563eb')
                      : 'transparent'}`,
                    boxShadow: selectedStage === stage.id ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                    zIndex: 2,
                    position: 'relative'
                  }}
                  onClick={() => setSelectedStage(stage.id === selectedStage ? null : stage.id)}
                >
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                
                <div className="text-center max-w-[120px]">
                  <div className="font-medium" style={{ color: 'var(--foreground)' }}>{stage.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Selected Stage Details */}
      {selectedStage && (
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
          {storageStages
            .filter(stage => stage.id === selectedStage)
            .map(stage => (
              <div key={stage.id}>
                <PHeading tag="h5" size="small" className="mb-2">{stage.name}</PHeading>
                <PText className="mb-3">{stage.description}</PText>
                
                <div>
                  <div className="font-medium mb-2" style={{ color: 'var(--foreground)' }}>Prozessschritte:</div>
                  <ol className="list-decimal pl-5" style={{ color: 'var(--foreground)' }}>
                    {stage.substeps.map((step, index) => (
                      <li key={index} className="mb-1" style={{ color: 'var(--foreground-lighter)' }}>{step}</li>
                    ))}
                  </ol>
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
          In einem Diagnosesystem für Fahrzeugwartung kann dieser Prozess folgendermaßen umgesetzt werden:
          <ul className="list-disc pl-5 mt-2" style={{ color: 'var(--foreground)' }}>
            <li><strong>Erfassung:</strong> Sammlung von Fehlercodes, Sensordaten und Technikerfeedback</li>
            <li><strong>Vorverarbeitung:</strong> Strukturierung in Fahrzeugmodelle, Komponentenkategorien und Schweregrade</li>
            <li><strong>Speicherung:</strong> Organisation in eine Wissensdatenbank mit Fehlerbehebungshistorie</li>
            <li><strong>Indizierung:</strong> Verknüpfung von Symptomen mit erfolgreichen Lösungsansätzen</li>
            <li><strong>Abruf:</strong> Bei neuen Diagnoseanfragen werden ähnliche Fälle und bewährte Lösungen gefunden</li>
            <li><strong>Integration:</strong> Relevante Wartungshistorie wird in die Diagnosevorschläge einbezogen</li>
          </ul>
        </PText>
      </div>
    </div>
  );
};

// Sample prompts for the interactive demo
const samplePrompts = [
  {
    id: 'basic',
    name: 'Einfacher Prompt',
    prompt: 'Erkläre die Funktionsweise von Elektroautos.',
    memories: []
  },
  {
    id: 'with-preferences',
    name: 'Mit Benutzerpräferenzen',
    prompt: 'Erkläre die Funktionsweise von Elektroautos.',
    memories: [
      {
        id: 'pref-1',
        type: 'user',
        content: 'Der Benutzer bevorzugt technische Details und Diagramme.',
        category: 'Präferenz'
      },
      {
        id: 'pref-2',
        type: 'user',
        content: 'Der Benutzer hat einen technischen Hintergrund in der Automobilindustrie.',
        category: 'Hintergrund'
      }
    ]
  },
  {
    id: 'with-history',
    name: 'Mit Konversationsverlauf',
    prompt: 'Wie unterscheiden sie sich von den zuvor besprochenen Fahrzeugen?',
    memories: [
      {
        id: 'conv-1',
        type: 'system',
        content: 'Die letzte Konversation behandelte Hybrid-Fahrzeuge und deren Kraftstoffeffizienz.',
        category: 'Gesprächsverlauf'
      },
      {
        id: 'conv-2',
        type: 'system',
        content: 'Der Benutzer hatte Fragen zur Reichweite und Ladeinfrastruktur.',
        category: 'Gesprächsverlauf'
      }
    ]
  },
  {
    id: 'comprehensive',
    name: 'Umfassender Kontext',
    prompt: 'Was sind die Vor- und Nachteile im täglichen Gebrauch?',
    memories: [
      {
        id: 'comp-1',
        type: 'user',
        content: 'Der Benutzer fährt hauptsächlich in der Stadt und hat Zugang zu einer Heimladestation.',
        category: 'Nutzungskontext'
      },
      {
        id: 'comp-2',
        type: 'document',
        content: 'Aktuelle Studien zeigen, dass E-Fahrzeuge eine TCO-Parität mit Verbrennern erreichen.',
        category: 'Fachwissen'
      },
      {
        id: 'comp-3',
        type: 'system',
        content: 'In früheren Gesprächen wurden Bedenken bezüglich Batteriedegradation geäußert.',
        category: 'Gesprächsverlauf'
      },
      {
        id: 'comp-4',
        type: 'user',
        content: 'Der Benutzer interessiert sich besonders für Umweltauswirkungen und Nachhaltigkeit.',
        category: 'Interesse'
      }
    ]
  }
];

// Memory context integration component
const MemoryContextIntegration: React.FC = () => {
  const [basePrompt, setBasePrompt] = useState<string>("Erkläre mir, wie ein Elektromotor funktioniert.");
  const [memoryEnabled, setMemoryEnabled] = useState<boolean>(true);
  const [enrichedPrompt, setEnrichedPrompt] = useState<string>("");
  const { isDarkMode } = useTheme();
  
  // Generate an enriched prompt based on the base prompt and memory context
  const generateEnrichedPrompt = () => {
    if (memoryEnabled) {
      const memoryContext = [
        "Der Benutzer hat zuvor nach technischen Erklärungen gesucht.",
        "Der Benutzer arbeitet im Automobilbereich.",
        "Letzte Woche hat der Benutzer nach Magnetfeldern und Induktion gefragt.",
        "Der Benutzer bevorzugt Erklärungen mit praktischen Beispielen."
      ];
      
      const randomContext = memoryContext.filter(() => Math.random() > 0.3);
      const contextPrefix = randomContext.length > 0 
        ? `Basierend auf deiner Memory:\n- ${randomContext.join('\n- ')}\n\n` 
        : '';
      
      setEnrichedPrompt(`${contextPrefix}${basePrompt}`);
    } else {
      setEnrichedPrompt(basePrompt);
    }
  };
  
  // Generate initial enriched prompt
  useEffect(() => {
    generateEnrichedPrompt();
  }, [basePrompt, memoryEnabled]);
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Kontextintegration</PHeading>
      
      <div className="mb-6 rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(126, 34, 206, 0.2)' : 'rgba(243, 232, 255, 0.8)', 
        borderColor: isDarkMode ? 'rgba(126, 34, 206, 0.4)' : 'rgba(216, 180, 254, 0.8)'
      }}>
        <PText>
          Die Integration von Memory-Kontext in Prompts erlaubt personalisiertere und präzisere Antworten.
          Experimentieren Sie unten mit verschiedenen Basisanfragen und sehen Sie, wie Memory-Informationen
          den Prompt anreichern können.
        </PText>
      </div>
      
      <div className="rounded-lg border mb-6 overflow-hidden" style={{ 
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)'
      }}>
        <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <PHeading tag="h5" size="small" className="mb-3">Prompt-Generator mit Memory-Kontext</PHeading>
          
          <div className="mb-4">
            <label className="block font-medium mb-2" style={{ color: 'var(--foreground)' }}>Basis-Prompt:</label>
            <textarea
              className="w-full p-3 rounded-md border text-sm font-mono"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)',
                borderColor: 'var(--border-color)',
                color: 'var(--foreground)'
              }}
              rows={3}
              value={basePrompt}
              onChange={(e) => setBasePrompt(e.target.value)}
            />
          </div>
          
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <label className="font-medium flex items-center" style={{ color: 'var(--foreground)' }}>
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4"
                  checked={memoryEnabled}
                  onChange={() => setMemoryEnabled(!memoryEnabled)}
                />
                Memory-Kontext aktivieren
              </label>
            </div>
            
            <button
              className="px-4 py-2 rounded-md font-medium"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(124, 58, 237, 0.8)' : '#8b5cf6',
                color: 'white'
              }}
              onClick={generateEnrichedPrompt}
            >
              Prompt generieren
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-3">
            <label className="block font-medium mb-2" style={{ color: 'var(--foreground)' }}>Angereicherter Prompt:</label>
            <div className="p-3 rounded-md font-mono text-sm whitespace-pre-line" style={{ 
              backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)',
              color: 'var(--foreground)'
            }}>
              {enrichedPrompt}
            </div>
          </div>
          
          <InfoCard
            title="Wie funktioniert es?"
            variant="info"
          >
            <PText size="small">
              Der angezeigte Prompt wurde mit relevanten Kontextinformationen aus dem Memory-System angereichert.
              Diese Informationen können Benutzervorlieben, frühere Interaktionen oder relevante Domänenkenntnisse umfassen.
              Die Anreicherung erfolgt in mehreren Schritten:
            </PText>
            <ol className="list-decimal pl-5 mt-2" style={{ color: 'var(--foreground)' }}>
              <li>Analyse des Basis-Prompts zur Identifizierung des Kontextbedarfs</li>
              <li>Abruf relevanter Memory-Items aus verschiedenen Kategorien</li>
              <li>Bewertung und Priorisierung basierend auf Relevanz und Aktualität</li>
              <li>Integration in den Prompt unter Berücksichtigung der Token-Limits</li>
            </ol>
          </InfoCard>
        </div>
      </div>
      
      <div className="rounded-lg p-4 border" style={{ 
        backgroundColor: isDarkMode ? 'rgba(5, 150, 105, 0.1)' : 'rgba(209, 250, 229, 0.8)',
        borderColor: isDarkMode ? 'rgba(5, 150, 105, 0.4)' : 'rgba(167, 243, 208, 0.8)'
      }}>
        <PHeading tag="h5" size="small" className="mb-2">Integration in Automotive-Anwendungen</PHeading>
        <PText>
          In der Automobildiagnostik und -technischen Beratung kann eine solche Kontextintegration:
          <ul className="list-disc pl-5 mt-2" style={{ color: 'var(--foreground)' }}>
            <li>Fahrzeugspezifische Parameter automatisch in Diagnoseanfragen einbeziehen</li>
            <li>Frühere Werkstattbesuche und bekannte Probleme berücksichtigen</li>
            <li>Technische Expertise des Fragenden in die Erklärungstiefe einfließen lassen</li>
            <li>Region- und länderspezifische Unterschiede in Fahrzeugspezifikationen berücksichtigen</li>
          </ul>
        </PText>
      </div>
    </div>
  );
};

interface MemoryBankDemoProps {
  title?: string;
  description?: string;
}

const MemoryBankDemo: React.FC<MemoryBankDemoProps> = ({
  title = "Interaktive Memory Bank Demo",
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
            id: 'api-spec',
            label: 'API Spezifikationen',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            ),
            content: <MemoryApiSpecification />
          },
          {
            id: 'storage-retrieval',
            label: 'Speicher & Abruf',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            ),
            content: <MemoryStorageRetrievalFlow />
          },
          {
            id: 'context-integration',
            label: 'Kontextintegration',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            content: <MemoryContextIntegration />
          }
        ]}
      />
    </div>
  );
};

export default MemoryBankDemo; 