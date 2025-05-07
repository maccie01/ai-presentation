"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';

// Dynamically import MermaidDiagram with no SSR
const MermaidDiagram = dynamic(
  () => import('@/components/interactive/MermaidDiagram'),
  { ssr: false, loading: () => <div className="p-4 text-center">Diagramm wird geladen...</div> }
);

const MemoryLifecycleDiagram: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  
  const lifecycleDiagramMermaid = `
flowchart TD
    subgraph Creation ["Memory Creation & Initialization"]
      A[Benutzerinteraktion] --> B[Extraktion wichtiger Informationen]
      B --> C[Speicherung in Memory Bank]
      C --> D{Memory Typ?}
      D -->|Kurzzeit| E[Flüchtige Speicherung]
      D -->|Langzeit| F[Persistente Speicherung]
      D -->|Episodisch| G[Sequentielle Speicherung]
    end
    
    subgraph Access ["Memory Retrieval & Usage"]
      H[Neue Benutzeranfrage] --> I[Relevante Memory-Suche]
      I --> J[Memory Priorisierung & Ranking]
      J --> K[Konsolidierung mehrerer Memories]
      K --> L[Integration in Prompt-Kontext]
    end
    
    subgraph Maintenance ["Memory Management & Wartung"]
      M[Zeitbasierte Verfallsprüfung] --> N{Memory veraltet?}
      N -->|Ja| O[Löschung/Archivierung]
      N -->|Nein| P[Beibehaltung]
      Q[Relevanzprüfung] --> R{Noch relevant?}
      R -->|Ja| S[Aktualisieren der Relevanzbewertung]
      R -->|Nein| T[Herabstufung/Löschung]
    end
    
    Creation --> Access
    Access --> Maintenance
    Maintenance -.-> Access
  `;

  if (hasError) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
        <PHeading tag="h3" size="small" className="text-red-700 mb-2">Diagramm konnte nicht geladen werden</PHeading>
        <PText>Es gab ein Problem beim Laden des Memory-Lebenszyklus-Diagramms. Bitte versuchen Sie, die Seite neu zu laden.</PText>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <PHeading tag="h3" size="small" className="mb-2">Memory-Lebenszyklus in KI-Systemen</PHeading>
        <PText className="mb-4">
          Der Memory-Lebenszyklus umfasst die Erstellung, den Zugriff und die Wartung von Erinnerungen in einem 
          KI-System. Dieses Diagramm visualisiert die Prozesse, die Memory durch seine Lebenszeit durchläuft.
        </PText>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <MermaidDiagram 
          diagramDefinition={lifecycleDiagramMermaid}
          title="Memory-Lebenszyklus"
          description="Vom Erstellen über Abrufen bis zur Wartung von KI-Gedächtnisinhalten"
        />
      </div>

      <div className="mt-6 space-y-4">
        <PHeading tag="h4" size="small" className="mb-2">Schlüsselphasen im Memory-Lebenszyklus</PHeading>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Erstellung & Initialisierung:</strong> Neue Memories werden aus Benutzerinteraktionen 
            extrahiert, klassifiziert und gespeichert.
          </li>
          <li>
            <strong>Abruf & Nutzung:</strong> Bei neuen Anfragen werden relevante Memories gesucht, 
            priorisiert und in den Prompt-Kontext integriert.
          </li>
          <li>
            <strong>Management & Wartung:</strong> Regelmäßige Überprüfung der Memories auf Relevanz und 
            Aktualität mit entsprechenden Maßnahmen.
          </li>
          <li>
            <strong>Kontinuierlicher Kreislauf:</strong> Der Prozess ist zyklisch und selbstverbessernd, 
            mit kontinuierlichem Lernen über die Zeit.
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default MemoryLifecycleDiagram; 