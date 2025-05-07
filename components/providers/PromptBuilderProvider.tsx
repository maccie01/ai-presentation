"use client";

import React from 'react';
import FloatingPromptBuilder from '@/components/interactive/FloatingPromptBuilder';

// Define prompt templates - same as in the High-Level Prompting page
const promptTemplates = [
  {
    name: 'Einfache Anfrage',
    template: 'Was ist {{topic}}?',
    description: 'Eine grundlegende Frage zu einem Thema.'
  },
  {
    name: 'Experten-Prompt',
    template: 'Als {{expert_role}} erkläre {{topic}} einem {{audience}}. Berücksichtige dabei {{considerations}}.',
    description: 'Fordert das Modell auf, als Experte zu antworten und die Erklärung an die Zielgruppe anzupassen.'
  },
  {
    name: 'Kontext-Prompt',
    template: 'Kontext: {{context}}\n\nAufgabe: {{task}}\n\nFormat: {{output_format}}',
    description: 'Bietet Kontext, definiert die Aufgabe und gibt das gewünschte Ausgabeformat an.'
  },
  {
    name: 'Chain-of-Thought',
    template: 'Ich muss {{problem}} lösen. Denke Schritt für Schritt durch den Lösungsprozess. Berücksichtige {{constraints}} und optimiere für {{optimization_goal}}.',
    description: 'Fordert das Modell auf, seinen Denkprozess Schritt für Schritt zu erläutern.'
  }
];

// Define parameters - same as in the High-Level Prompting page
const promptParameters = [
  {
    name: 'topic',
    defaultValue: 'künstliche Intelligenz im Automobilbereich',
    description: 'Das Thema der Anfrage'
  },
  {
    name: 'expert_role',
    defaultValue: 'KI-Ingenieur bei Porsche',
    description: 'Die Expertenrolle, die das Modell annehmen soll'
  },
  {
    name: 'audience',
    defaultValue: 'Projektmanager ohne technischen Hintergrund',
    description: 'Die Zielgruppe der Erklärung'
  },
  {
    name: 'considerations',
    defaultValue: 'praktische Anwendungsfälle und Geschäftsvorteile',
    description: 'Besondere Aspekte, die berücksichtigt werden sollen'
  },
  {
    name: 'context',
    defaultValue: 'Wir entwickeln ein neues Fahrassistenzsystem für Porsche-Fahrzeuge',
    description: 'Hintergrundinformationen zur Anfrage'
  },
  {
    name: 'task',
    defaultValue: 'Erstelle ein Konzeptpapier, das die Vorteile von KI in diesem System erläutert',
    description: 'Die zu erfüllende Aufgabe'
  },
  {
    name: 'output_format',
    defaultValue: 'Überschriften, Stichpunkte und kurze Absätze',
    description: 'Das gewünschte Format der Antwort'
  },
  {
    name: 'problem',
    defaultValue: 'die Optimierung von Trainingsdaten für ein Fahrzeug-Erkennungsmodell',
    description: 'Das zu lösende Problem'
  },
  {
    name: 'constraints',
    defaultValue: 'begrenzte Rechenressourcen und Datenschutzanforderungen',
    description: 'Einschränkungen, die berücksichtigt werden müssen'
  },
  {
    name: 'optimization_goal',
    defaultValue: 'Genauigkeit und Inferenzgeschwindigkeit',
    description: 'Das Ziel der Optimierung'
  }
];

export default function PromptBuilderProvider() {
  return (
    <FloatingPromptBuilder 
      templates={promptTemplates}
      parameters={promptParameters}
    />
  );
} 