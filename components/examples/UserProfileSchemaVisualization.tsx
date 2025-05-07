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

const UserProfileSchemaVisualization: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  
  const userProfileMermaid = `
classDiagram
    class UserProfile {
      +String userId
      +String username
      +Dictionary preferences
      +Array[Interaction] recentInteractions
      +Dictionary systemPreferences
      +Timestamp lastActivity
      +MemorySettings memorySettings
    }
    
    class Preferences {
      +String[] topics
      +String[] preferredFormats
      +Dictionary customSettings
      +Boolean rememberContext
      +Int sessionMemoryLength
    }
    
    class Interaction {
      +String id
      +Timestamp timestamp
      +String query
      +String response
      +Dictionary metadata
      +String[] tags
      +Float relevanceScore
    }
    
    class MemorySettings {
      +Boolean enableLongTermMemory
      +Int shortTermRetention
      +String[] persistentFacts
      +String[] forgettableTopics
      +Int recallPriority
    }
    
    UserProfile *-- Preferences : contains
    UserProfile *-- Interaction : records
    UserProfile *-- MemorySettings : configures
  `;

  if (hasError) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
        <PHeading tag="h3" size="small" className="text-red-700 mb-2">Diagramm konnte nicht geladen werden</PHeading>
        <PText>Es gab ein Problem beim Laden des Benutzerprofilschemas. Bitte versuchen Sie, die Seite neu zu laden.</PText>
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
        <PHeading tag="h3" size="small" className="mb-2">Benutzerprofilschema für KI-Memory-Systeme</PHeading>
        <PText className="mb-4">
          Das Benutzerprofilschema definiert die strukturierten Daten, die für personalisierte KI-Interaktionen
          gespeichert werden. Es umfasst Benutzereinstellungen, Interaktionsgeschichte und Memory-Konfigurationen.
        </PText>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <MermaidDiagram 
          diagramDefinition={userProfileMermaid}
          title="Benutzerprofilschema" 
          description="Schema mit Präferenzen, Interaktions- und Memory-Einstellungen"
        />
      </div>

      <div className="mt-6 space-y-4">
        <PHeading tag="h4" size="small" className="mb-2">Schlüsselkomponenten im Benutzerprofil</PHeading>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Core Identity:</strong> Grundlegende Benutzeridentifikation für Persistenz und Retrieval.
          </li>
          <li>
            <strong>Präferenzen:</strong> Gespeicherte Vorlieben für personalisierte Antworten und Format-Präferenzen.
          </li>
          <li>
            <strong>Interaktionshistorie:</strong> Zeitlich geordnete Historie für kontextbewusste Antworten.
          </li>
          <li>
            <strong>Memory-Einstellungen:</strong> Konfiguration für die Balance zwischen Kontext-Retention und -Vergessen.
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default UserProfileSchemaVisualization; 