"use client";

import React from 'react';
import SectionHero from '@/components/sections/SectionHero';
import SectionContent from '@/components/sections/SectionContent';
import SectionSummary from '@/components/sections/SectionSummary';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import { UseCaseExamples, LogAnalysisVisualization, DocumentationTemplateShowcase } from '@/components/examples';

interface AutomotiveBeispieleClientContentProps {
  title: string;
  subtitle: string;
}

const AutomotiveBeispieleClientContent: React.FC<AutomotiveBeispieleClientContentProps> = ({
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
        <PHeading tag="h2" size="large" className="mb-6">Automotive KI-Anwendungsfälle</PHeading>
        <PText className="mb-8">
          Die Automobilindustrie bietet ein breites Spektrum an Anwendungsmöglichkeiten für KI-Technologien - 
          von der Fahrzeugentwicklung über die Produktion bis hin zu After-Sales und Connected Services. 
          In diesem Abschnitt betrachten wir branchenspezifische Beispiele, die den gezielten Einsatz von KI 
          in automotive-relevanten Szenarien demonstrieren.
        </PText>

        <PGrid>
          <PGridItem size={12}>
            <PHeading tag="h3" size="medium" className="mb-4">Potenzial für die Automobilindustrie</PHeading>
            <PText className="mb-6">
              KI-Technologien können in nahezu allen Bereichen der Automobilwertschöpfungskette Mehrwert schaffen - 
              von der Optimierung von Entwicklungsprozessen über die Automatisierung von Qualitätssicherung bis hin 
              zur Verbesserung von Kundenerlebnissen. Die folgenden Beispiele zeigen, wie moderne KI-Ansätze auf 
              spezifische Herausforderungen der Branche angewendet werden können.
            </PText>
          </PGridItem>
        </PGrid>
      </SectionContent>

      <SectionContent>
        <UseCaseExamples 
          title="Use Case Beispiele mit umschaltbaren Ausgaben"
          description="Erkunden Sie verschiedene Automotive-spezifische KI-Anwendungsfälle mit konkreten Prompt-Beispielen und Ausgaben."
        />
      </SectionContent>

      <SectionContent>
        <LogAnalysisVisualization 
          title="Log-Analyse Visualisierung"
          description="Erfahren Sie, wie KI-gestützte Loganalyse zur Erkennung von Mustern, Anomalien und potentiellen Problemen in Fahrzeugsystemen eingesetzt werden kann."
        />
      </SectionContent>
      
      <SectionContent>
        <DocumentationTemplateShowcase
          title="Dokumentationsvorlagen"
          description="Entdecken Sie, wie KI bei der Generierung und Pflege von technischer Dokumentation für komplexe Automobilsysteme unterstützen kann."
        />
      </SectionContent>
      
      <SectionContent>
        <PGrid>
          <PGridItem size={12}>
            <PHeading tag="h3" size="medium" className="mb-4">Implementierungsansätze</PHeading>
            <PText className="mb-3">
              Bei der Integration von KI in automotive Prozesse sollten folgende Aspekte berücksichtigt werden:
            </PText>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>
                <strong>Domänenspezifisches Fachwissen:</strong> Die Kombination von KI-Expertise mit tiefem Automotive-Know-how 
                ist entscheidend für erfolgreiche Anwendungen.
              </li>
              <li>
                <strong>Datenqualität und -verfügbarkeit:</strong> Hochwertige, repräsentative Daten sind die Grundlage 
                für zuverlässige KI-Lösungen in sicherheitskritischen Bereichen.
              </li>
              <li>
                <strong>Sicherheits- und Compliance-Anforderungen:</strong> Automotive-spezifische Vorschriften und Standards 
                müssen bei der KI-Implementierung berücksichtigt werden.
              </li>
              <li>
                <strong>Integration in bestehende Systeme:</strong> Die nahtlose Einbindung in etablierte Entwicklungs-, 
                Produktions- und Serviceprozesse ist entscheidend für die Akzeptanz.
              </li>
            </ul>
          </PGridItem>
        </PGrid>
      </SectionContent>

      <SectionSummary
        title="Zusammenfassung"
        takeaways={[
          "KI bietet vielfältige Anwendungsmöglichkeiten entlang der gesamten Automotive-Wertschöpfungskette",
          "Branchenspezifische Anforderungen erfordern angepasste KI-Lösungen und -Prompts",
          "Log-Analyse ermöglicht proaktive Erkennung von Problemen und Optimierungspotentialen",
          "Automatisierte Dokumentation verbessert Konsistenz und reduziert manuellen Aufwand",
          "Die Kombination von Fach- und KI-Expertise ist der Schlüssel zum Erfolg"
        ]}
        nextSection={{
          name: "Microsoft Office KI-Produkte (Power Platform)",
          path: "/power-platform"
        }}
      />
    </main>
  );
}

export default AutomotiveBeispieleClientContent; 