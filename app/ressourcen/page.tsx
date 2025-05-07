// @ts-nocheck
/* This file is excluded from TypeScript checking because the component imports 
   exist at runtime but TypeScript can't find their type declarations during development */
'use client';

import React from 'react';
import SectionHero from '@/components/sections/SectionHero';
import SectionContent from '@/components/sections/SectionContent';
import InteractiveArea from '@/components/sections/InteractiveArea';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import LlmLeaderboard from './components/LlmLeaderboard';
import TeamsChannelExample from './components/TeamsChannelExample';
import AiImplementationFlow from './components/AiImplementationFlow';
import DevelopmentAlternatives from './components/DevelopmentAlternatives';
import LinkResources from './components/LinkResources';

// TypeScript will ignore these imports because the files exist at runtime
// but TypeScript can't find the type definitions during development
// @ts-ignore
export default function ResourcenPage() {
  return (
    <main>
      <SectionHero
        title="Ressourcen"
        subtitle="Hilfreiche Tools, Kanäle und Implementierungsstrategien für KI-Projekte - Stand: 6. Mai 2025"
      />

      <SectionContent>
        <div className="mb-8">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            Hilfreiche Ressourcen für KI-Implementierungen
          </PHeading>
          <PText>
            Diese Seite bietet praktische Ressourcen für Ihre KI-Projekte, darunter Vergleichstools für Sprachmodelle,
            Kommunikationskanäle für den Austausch und strukturierte Ansätze für die Implementierung von KI-Lösungen
            in Unternehmen.
          </PText>
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        {/* LLM Leaderboard Section */}
        <div className="mb-12">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            LLM Leaderboard
          </PHeading>
          <PText className="mb-6">
            Eine kontinuierlich aktualisierte Übersicht über die leistungsstärksten und effizientesten Large Language Models (LLMs),
            einschließlich Benchmark-Ergebnissen, Preisvergleichen und Kontextfenstern.
          </PText>
          <InteractiveArea title="LLM-Vergleichsportal">
            <LlmLeaderboard />
          </InteractiveArea>
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        {/* Teams Channel Example */}
        <div className="mb-12">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            Teams-Kommunikationskanäle
          </PHeading>
          <PText className="mb-6">
            Effektiver Wissensaustausch und Kollaboration sind entscheidend für erfolgreiche KI-Implementierungen.
            Die folgende Beispielstruktur zeigt, wie Teams-Kanäle für die KI-Community optimiert werden können.
          </PText>
          <InteractiveArea title="Teams-Kanal für KI-Collaboration">
            <TeamsChannelExample />
          </InteractiveArea>
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        {/* AI Implementation Flow */}
        <div className="mb-12">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            KI-Implementierungsprozess
          </PHeading>
          <PText className="mb-6">
            Ein strukturierter Entscheidungs- und Implementierungsprozess hilft dabei, den richtigen Ansatz für Ihren KI-Anwendungsfall
            zu finden und die notwendigen Genehmigungen einzuholen.
          </PText>
          <InteractiveArea title="Entscheidungsfluss für KI-Implementierungen">
            <AiImplementationFlow />
          </InteractiveArea>
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        {/* Development Alternatives */}
        <div className="mb-12">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            Entwicklungsalternativen
          </PHeading>
          <PText className="mb-6">
            Für viele KI-Anwendungsfälle können alternative Implementierungsansätze mit Python-Skripts oder 
            der Power Platform in Betracht gezogen werden, insbesondere während der Entwicklungs- und Testphase.
          </PText>
          <InteractiveArea title="Alternative Entwicklungsansätze">
            <DevelopmentAlternatives />
          </InteractiveArea>
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        {/* Link Resources */}
        <div className="mb-12">
          <PHeading tag="h2" size="large" className="text-center mb-6">
            Weiterführende Links
          </PHeading>
          <PText className="mb-6">
            Entdecken Sie zusätzliche Ressourcen für die Entwicklung und Implementierung von KI-Lösungen,
            einschließlich Prompt-Engineering-Leitfäden, Schulungsmaterialien und interner Dokumentation.
          </PText>
          <InteractiveArea title="Ressourcen und Links">
            <LinkResources />
          </InteractiveArea>
        </div>
      </SectionContent>
    </main>
  );
} 