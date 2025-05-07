"use client";

import React from 'react';
import SectionHero from '@/components/sections/SectionHero';
import SectionContent from '@/components/sections/SectionContent';
import InteractiveArea from '@/components/sections/InteractiveArea';
import SectionSummary from '@/components/sections/SectionSummary';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import ContextMethodsComparison from '@/components/examples/ContextMethodsComparison';
import DynamicPromptTemplateDemo from '@/components/examples/DynamicPromptTemplateDemo';
import SecurityBestPracticesGuide from '@/components/examples/SecurityBestPracticesGuide';

export default function Kontextwahl() {
  return (
    <main>
      <SectionHero
        title="Kontextwahl"
        subtitle="Optimale Strategien für die Auswahl und Nutzung von Kontext in KI-Anfragen"
      />

      <SectionContent>
        <PHeading tag="h2" size="large" className="mb-6">Kontext in KI-Interaktionen</PHeading>
        <PText className="mb-8">
          Die Auswahl und Strukturierung des Kontexts ist entscheidend für präzise und relevante KI-Antworten. 
          Die richtige Kontextstrategie erhöht die Relevanz der Ergebnisse, optimiert die Ressourcennutzung 
          und verbessert die Sicherheit Ihrer Interaktionen mit KI-Systemen.
        </PText>

        <PGrid>
          <PGridItem size={12}>
            <PHeading tag="h3" size="medium" className="mb-4">Warum Kontext wichtig ist</PHeading>
            <PText className="mb-6">
              KI-Modelle benötigen Kontext, um Anfragen richtig zu interpretieren und relevante Antworten zu liefern. 
              Der Kontext dient als Rahmen, der dem Modell hilft, Ambiguitäten aufzulösen, Fachbegriffe zu verstehen 
              und die Anfrage im richtigen thematischen Zusammenhang zu verarbeiten.
            </PText>
          </PGridItem>
        </PGrid>
      </SectionContent>

      <SectionContent>
        <ContextMethodsComparison 
          title="Vergleich von Kontextmethoden"
          description="Verschiedene Methoden der Kontextbereitstellung haben unterschiedliche Vor- und Nachteile. Die Wahl der richtigen Methode hängt vom spezifischen Anwendungsfall ab und kann erheblichen Einfluss auf die Qualität der KI-Antworten haben."
        />
      </SectionContent>

      <SectionContent>
        <DynamicPromptTemplateDemo
          title="Dynamische Prompt-Templates"
          description="Dynamische Templates ermöglichen die flexible Anpassung von Prompts an verschiedene Anwendungsfälle durch die Verwendung von Variablen und kontextbasierter Anreicherung."
        />
      </SectionContent>

      <SectionContent>
        <SecurityBestPracticesGuide
          title="Sicherheitsleitfaden für Kontextnutzung"
          description="Sicherheitsmaßnahmen und Best Practices für die sichere Verwendung von Kontext in KI-Anfragen, um Datenschutz zu gewährleisten und Risiken zu minimieren."
        />
      </SectionContent>

      <SectionSummary
        title="Zusammenfassung"
        takeaways={[
          "Die Wahl des richtigen Kontexts ist entscheidend für präzise KI-Antworten",
          "Verschiedene Kontextmethoden eignen sich für unterschiedliche Anwendungsfälle",
          "Dynamische Prompt-Templates erhöhen die Flexibilität und Wiederverwendbarkeit",
          "Sicherheitsaspekte sollten bei der Kontextbereitstellung immer beachtet werden",
          "Die richtige Kontextstrategie optimiert Ressourcennutzung und verbessert Ergebnisse"
        ]}
        nextSection={{
          name: "Memory-Prompts und Memory Bank",
          path: "/memory-prompts"
        }}
      />
    </main>
  );
} 