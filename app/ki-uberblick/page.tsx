import React from 'react';
import { Metadata } from 'next';
import SectionHero from '@/components/sections/SectionHero';
import SectionContent from '@/components/sections/SectionContent';
import InteractiveArea from '@/components/sections/InteractiveArea';
import SectionSummary from '@/components/sections/SectionSummary';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import ProductShowcase from '@/components/interactive/ProductShowcase';
import TrendsVisualization from '@/components/interactive/TrendsVisualization';
import AISolutionsShowcase from '@/components/interactive/AISolutionsShowcase';

export const metadata: Metadata = {
  title: 'KI-Überblick | AI Presentation',
  description: 'Eine umfassende Einführung in KI, aktuelle Produkte und Trends für 2025.',
};

export default function KIUberblick() {
  return (
    <>
      <SectionHero 
        title="KI-Überblick" 
        subtitle="Eine Einführung in künstliche Intelligenz, aktuelle Produkte und Trends für 2025. Stand: 6. Mai 2025"
      />
      
      <SectionContent columns={1}>
        <div>
          <PHeading tag="h2" size="large" className="mb-4">
            Was ist künstliche Intelligenz?
          </PHeading>
          <PText className="mb-6">
            Künstliche Intelligenz (KI) ist ein breites Feld, das verschiedene Technologien umfasst, die Maschinen befähigen, 
            Aufgaben auszuführen, die normalerweise menschliche Intelligenz erfordern. Diese Fähigkeiten umfassen 
            logisches Denken, Lernen, Wahrnehmung, Problemlösung und autonome Entscheidungsfindung.
          </PText>
          
          <PGrid className="mb-8">
            <PGridItem size={4} className="p-4">
              <PHeading tag="h3" size="medium" className="mb-3">
                Machine Learning
              </PHeading>
              <PText>
                Eine Unterkategorie der KI, bei der Systeme aus Daten lernen, 
                ohne explizit programmiert zu werden. Algorithmen identifizieren Muster 
                in großen Datensätzen, um Vorhersagen zu treffen oder Entscheidungen zu fällen.
              </PText>
            </PGridItem>
            <PGridItem size={4} className="p-4">
              <PHeading tag="h3" size="medium" className="mb-3">
                Deep Learning
              </PHeading>
              <PText>
                Ein spezialisiertes Feld des maschinellen Lernens, das künstliche neuronale Netzwerke 
                mit mehreren Schichten verwendet, um komplexe Daten wie Bilder, Ton und Text zu verarbeiten. 
                2024 hatte Deep Learning mit 37,4% den größten Marktanteil im KI-Technologiesegment.
              </PText>
            </PGridItem>
            <PGridItem size={4} className="p-4">
              <PHeading tag="h3" size="medium" className="mb-3">
                Generative KI
              </PHeading>
              <PText>
                Algorithmen, die neue, originelle Inhalte (Text, Bilder, Audio, Video, Code) 
                basierend auf gelernten Mustern erstellen können. Große Sprachmodelle (LLMs) 
                wie GPT-4o, Claude 3 und Gemini sind prominente Beispiele für generative KI.
              </PText>
            </PGridItem>
            <PGridItem size={4} className="p-4">
              <PHeading tag="h3" size="medium" className="mb-3">
                Natural Language Processing
              </PHeading>
              <PText>
                Ein Bereich der KI, der sich darauf konzentriert, Computern das Verstehen, Interpretieren, 
                Generieren und Reagieren auf menschliche Sprache (Text und Sprache) zu ermöglichen.
                NLP umfasst Textanalyse, maschinelle Übersetzung, Frage-Antwort-Systeme und Spracherkennung.
              </PText>
            </PGridItem>
            <PGridItem size={4} className="p-4">
              <PHeading tag="h3" size="medium" className="mb-3">
                Computer Vision
              </PHeading>
              <PText>
                Ein KI-Bereich, der Computer befähigt, visuelle Informationen aus der realen Welt, 
                wie Bilder und Videos, zu "sehen" und zu interpretieren. Anwendungen umfassen Bilderkennung, 
                Objekterkennung, Bildsegmentierung und Gesichtserkennung.
              </PText>
            </PGridItem>
            <PGridItem size={4} className="p-4">
              <PHeading tag="h3" size="medium" className="mb-3">
                KI-Agenten
              </PHeading>
              <PText>
                Systeme, die ihre Umgebung wahrnehmen, Entscheidungen treffen und autonome Aktionen 
                ausführen können, um bestimmte Ziele zu erreichen. Moderne KI-Agenten, oft mit LLMs, 
                können komplexe mehrstufige Aufgaben erledigen und mit ihrer Umgebung interagieren.
              </PText>
            </PGridItem>
          </PGrid>
        </div>
      </SectionContent>
      
      <InteractiveArea title="KI Modelle im Überblick">
        <ProductShowcase />
      </InteractiveArea>
      
      <InteractiveArea title="KI-Produkte im Überblick">
        <AISolutionsShowcase />
      </InteractiveArea>
      
      <InteractiveArea title="KI-Trends für 2025">
        <TrendsVisualization />
      </InteractiveArea>
      
      <InteractiveArea title="KI-Anwendungen in der Automobilindustrie">
        <PGrid>
          <PGridItem size={4} className="p-4">
            <PHeading tag="h3" size="medium" className="mb-3">
              Autonomes Fahren
            </PHeading>
            <PText>
              KI-Systeme erkennen Verkehrssituationen, interpretieren multimodale Sensordaten 
              und treffen Fahrententscheidungen. Neuere Entwicklungen integrieren verschiedene Sensortypen 
              für ein umfassenderes Situationsverständnis.
            </PText>
          </PGridItem>
          <PGridItem size={4} className="p-4">
            <PHeading tag="h3" size="medium" className="mb-3">
              Prädiktive Wartung
            </PHeading>
            <PText>
              KI analysiert Fahrzeugdaten in Echtzeit, um potenzielle Probleme vorherzusagen, 
              bevor sie auftreten. Laut aktuellen Studien können KI-basierte vorausschauende 
              Wartungssysteme die Maschinenausfallzeiten signifikant reduzieren.
            </PText>
          </PGridItem>
          <PGridItem size={4} className="p-4">
            <PHeading tag="h3" size="medium" className="mb-3">
              Fahrzeugdesign und -entwicklung
            </PHeading>
            <PText>
              KI beschleunigt den Fahrzeugdesignprozess durch schnelle Iteration und Optimierung. 
              Hersteller wie Toyota setzen KI ein, um den Entwicklungsprozess zu beschleunigen und 
              innovative Fahrzeugkonzepte zu erforschen.
            </PText>
          </PGridItem>
        </PGrid>
      </InteractiveArea>
      
      <SectionSummary 
        title="Key Takeaways"
        takeaways={[
          "Die KI-Adoption in Unternehmen ist laut McKinsey auf 72% gestiegen (2024), ein deutlicher Sprung von 50%",
          "Multimodale KI-Systeme, die Text, Bild, Audio und Video verarbeiten können, sind der neue Standard",
          "Der globale KI-Markt wurde 2024 auf 638,23 Mrd. USD geschätzt und soll 2025 um 38% wachsen",
          "KI-Agenten, die autonome Aufgaben ausführen können, sind ein wichtiger Trend mit erheblichen Auswirkungen",
          "Kleinere, effizientere KI-Modelle bieten starke Leistung bei geringeren Kosten und Ressourcenanforderungen"
        ]}
        nextSection={{
          name: "High-Level Prompting",
          path: "/high-level-prompting"
        }}
      />
    </>
  );
} 