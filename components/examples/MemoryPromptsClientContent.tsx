"use client";

import React from 'react';
import SectionHero from '@/components/sections/SectionHero';
import SectionContent from '@/components/sections/SectionContent';
import SectionSummary from '@/components/sections/SectionSummary';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import MemoryConceptVisualization from '@/components/examples/MemoryConceptVisualization';
import MemoryPromptStructureDiagram from '@/components/examples/MemoryPromptStructureDiagram';
import MemoryBankDemo from '@/components/examples/MemoryBankDemo';
import SessionPersonalizationExample from '@/components/examples/SessionPersonalizationExample';

interface MemoryPromptsClientContentProps {
  title: string;
  subtitle: string;
}

const MemoryPromptsClientContent: React.FC<MemoryPromptsClientContentProps> = ({
  title, 
  subtitle
}) => {
  return (
    <main>
      <SectionHero
        title={title}
        subtitle={subtitle}
      />

      <SectionContent>
        <PHeading tag="h2" size="large" className="mb-6">Erweiterung von KI-Systemen mit Gedächtnisfunktionen</PHeading>
        <PText className="mb-8">
          Memory-Funktionen sind entscheidend für kontextbewusste KI-Systeme, die Informationen über Zeit und Interaktionen hinweg behalten können. 
          In diesem Abschnitt untersuchen wir verschiedene Memory-Konzepte, deren Implementierung und praktische Anwendungsfälle für 
          personalisierte und kontextreiche KI-Erfahrungen.
        </PText>

        <PGrid>
          <PGridItem size={12}>
            <PHeading tag="h3" size="medium" className="mb-4">Warum Memory wichtig ist</PHeading>
            <PText className="mb-6">
              KI-Modelle sind standardmäßig zustandslos - sie behalten keine Informationen zwischen Anfragen.
              Memory-Implementierungen ermöglichen es Ihren KI-Anwendungen, Kontexte zu behalten, aus früheren Interaktionen zu lernen
              und personalisierte Erfahrungen zu bieten, die weit über einfache Anfrage-Antwort-Szenarien hinausgehen.
            </PText>
          </PGridItem>
        </PGrid>
      </SectionContent>

      <SectionContent>
        <MemoryConceptVisualization 
          title="Memory-Konzepte für KI-Systeme"
          description="Memory-Systeme ermöglichen es KI-Anwendungen, Informationen über Zeit und Interaktionen hinweg zu behalten. Diese Visualisierung erklärt die verschiedenen Arten von Memory und ihre Anwendungsfälle."
        />
      </SectionContent>

      <SectionContent>
        <MemoryPromptStructureDiagram 
          title="Strukturierung von Memory-Prompts"
          description="Effektive Memory-Prompt-Strukturierung ist entscheidend für die Leistung von KI-Systemen. Diese Visualisierung zeigt Strategien für Chunking, semantische Organisation und hierarchische Strukturierung von Memory-Inhalten."
        />
      </SectionContent>
      
      <SectionContent>
        <MemoryBankDemo
          title="Interaktive Memory Bank Demo"
          description="Erkunden Sie die Funktionsweise einer Memory Bank von der API-Spezifikation über den Speicher- und Abrufprozess bis zur nahtlosen Kontextintegration in KI-Prompts."
        />
      </SectionContent>
      
      <SectionContent>
        <SessionPersonalizationExample
          title="Session Personalisierung mit Memory"
          description="Anwendung von Gedächtnisfunktionen für personalisierte Benutzererfahrungen: Von Benutzerprofilen über Entscheidungsbäume bis zu Memory-Lebenszyklen."
        />
      </SectionContent>
      
      <SectionContent>
        <PGrid>
          <PGridItem size={12}>
            <PHeading tag="h3" size="medium" className="mb-4">Implementierungsstrategien</PHeading>
            <PText className="mb-3">
              Bei der Integration von Memory-Funktionen in Ihre KI-Anwendungen sollten Sie folgende Ansätze in Betracht ziehen:
            </PText>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>
                <strong>Mehrstufige Memory-Architektur:</strong> Implementieren Sie verschiedene Memory-Typen (kurzfristig, langfristig, episodisch) 
                für unterschiedliche Anwendungsfälle.
              </li>
              <li>
                <strong>Selektive Persistenz:</strong> Speichern Sie nur relevante Informationen, die für zukünftige Interaktionen 
                wertvoll sein könnten.
              </li>
              <li>
                <strong>Privacy-by-Design:</strong> Integrieren Sie Datenschutzkontrollen von Anfang an, einschließlich automatischer 
                Löschung, Anonymisierung und expliziter Benutzereinwilligung.
              </li>
              <li>
                <strong>Kontextuelle Aktivierung:</strong> Entwickeln Sie intelligente Mechanismen, um nur den relevantesten Memory-Kontext 
                basierend auf der aktuellen Benutzeranfrage abzurufen.
              </li>
            </ul>
          </PGridItem>
        </PGrid>
      </SectionContent>

      <SectionSummary
        title="Zusammenfassung"
        takeaways={[
          "Memory-Funktionen ermöglichen kontextbewusste und personalisierte KI-Erfahrungen",
          "Verschiedene Memory-Typen eignen sich für unterschiedliche Anwendungsfälle",
          "Eine gut strukturierte Memory-Architektur verbessert KI-Antworten erheblich",
          "Die Memory Bank bietet eine organisierte Möglichkeit, Projektkontext zu verwalten",
          "Personalisierung durch Memory steigert die Nutzerzufriedenheit und Effizienz"
        ]}
        nextSection={{
          name: "Branchen-spezifische Automotive-Beispiele",
          path: "/automotive-beispiele"
        }}
      />
    </main>
  );
}

export default MemoryPromptsClientContent; 