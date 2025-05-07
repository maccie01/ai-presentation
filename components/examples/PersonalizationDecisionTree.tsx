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

const PersonalizationDecisionTree: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  
  const decisionTreeMermaid = `
graph TD
    A[Neue Benutzeranfrage] --> B{Benutzer bekannt?}
    B -->|Ja| C[Lade Benutzerprofil]
    B -->|Nein| D[Erstelle neues Profil]
    
    C --> E{Relevante Vorherige Interaktionen?}
    E -->|Ja| F[Lade relevante Interaktionsgeschichte]
    E -->|Nein| G[Fahre ohne Interaktionskontext fort]
    
    F --> H{Benutzereinstellungen überprüfen}
    G --> H
    D --> H
    
    H --> I{Erinnerungslängenpräferenz?}
    I -->|Kurz| J[Beschränke auf letzte 1-3 Interaktionen]
    I -->|Medium| K[Beschränke auf letzte 5-10 Interaktionen]
    I -->|Lang| L[Lade umfangreiche Interaktionsgeschichte]
    I -->|Unbegrenzt| M[Lade vollständigen Kontext]
    
    J --> N[Erstelle personalisierten Prompt]
    K --> N
    L --> N
    M --> N
    
    N --> O[Erstelle KI-Antwort]
    O --> P[Speichere neue Interaktion]
    P --> Q[Aktualisiere Benutzermodellerkenntnis]
  `;

  if (hasError) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
        <PHeading tag="h3" size="small" className="text-red-700 mb-2">Diagramm konnte nicht geladen werden</PHeading>
        <PText>Es gab ein Problem beim Laden des Personalisierungsentscheidungsbaums. Bitte versuchen Sie, die Seite neu zu laden.</PText>
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
        <PHeading tag="h3" size="small" className="mb-2">Personalisierungsentscheidungsbaum</PHeading>
        <PText className="mb-4">
          Der Personalisierungsprozess verwendet Memory, um kontextbewusste und personalisierte Antworten zu generieren.
          Dieser Entscheidungsbaum zeigt, wie eine KI-Anwendung Benutzerprofile und historische Interaktionen nutzt, um
          die optimale Antwort zu generieren.
        </PText>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <MermaidDiagram 
          diagramDefinition={decisionTreeMermaid}
          title="Entscheidungsbaum für Personalisierung"
          description="Entscheidungsbaum für KI-Antworten basierend auf Benutzerkontext und Gedächtniseinstellungen"
        />
      </div>

      <div className="mt-6 space-y-4">
        <PHeading tag="h4" size="small" className="mb-2">Schlüsselentscheidungspunkte</PHeading>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Benutzeridentifikation:</strong> Ist der Benutzer bekannt oder neu im System?
          </li>
          <li>
            <strong>Relevanzprüfung:</strong> Welche vorherigen Interaktionen sind für die aktuelle Anfrage relevant?
          </li>
          <li>
            <strong>Kontextumfang:</strong> Wieviel historischer Kontext sollte basierend auf Benutzereinstellungen geladen werden?
          </li>
          <li>
            <strong>Modellaktualisierung:</strong> Wie wird das Benutzermodell nach der Interaktion aktualisiert?
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default PersonalizationDecisionTree; 