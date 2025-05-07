"use client";

import React from 'react';
import SectionHero from '@/components/sections/SectionHero';
import SectionContent from '@/components/sections/SectionContent';
import InteractiveArea from '@/components/sections/InteractiveArea';
import SectionSummary from '@/components/sections/SectionSummary';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import CodeEditorWithTabs from '@/components/interactive/CodeEditorWithTabs';
import PromptBuilder from '@/components/interactive/PromptBuilder';
import DosDontsExample from '@/components/examples/DosDontsExample';
import { promptExamples, automotivePromptExamples } from '@/data/promptExamples';
import { useTheme } from '@/lib/themeContext';

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

const codeExamples = [
  {
    name: 'Einfache API-Anfrage',
    language: 'javascript',
    code: `// Einfache Anfrage an eine KI-API
const axios = require('axios');

async function askAI(prompt) {
  try {
    const response = await axios.post(
      'https://api.example.com/v1/completions',
      {
        model: 'gpt-4',
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': \`Bearer \${process.env.API_KEY}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred';
  }
}

// Beispielaufruf
askAI('Was sind die wichtigsten KI-Trends für die Automobilindustrie?')
  .then(response => console.log(response));`
  },
  {
    name: 'Fortgeschrittene Prompting',
    language: 'javascript',
    code: `// Fortgeschrittene Prompting-Techniken
const axios = require('axios');

// Prompt-Templates als Funktion
function createExpertPrompt(topic, expertise, audience) {
  return \`Als Experte für \${expertise}, erkläre \${topic} für \${audience}. 
Verwende eine klare, verständliche Sprache und relevante Beispiele.\`;
}

// Chain-of-Thought Prompting
function createChainOfThoughtPrompt(problem) {
  return \`Problem: \${problem}
Denke Schritt für Schritt durch die Lösung dieses Problems.
1. Identifiziere die Kernfragen
2. Analysiere relevante Faktoren
3. Betrachte mögliche Lösungsansätze
4. Bewerte die Vor- und Nachteile jedes Ansatzes
5. Empfehle die beste Lösung mit Begründung\`;
}

async function askAI(prompt, temperature = 0.7) {
  try {
    const response = await axios.post(
      'https://api.example.com/v1/completions',
      {
        model: 'gpt-4',
        prompt: prompt,
        max_tokens: 1000,
        temperature: temperature
      },
      {
        headers: {
          'Authorization': \`Bearer \${process.env.API_KEY}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred';
  }
}

// Beispielaufrufe
const expertPrompt = createExpertPrompt(
  'autonomes Fahren',
  'KI und maschinelles Lernen',
  'Automobilingenieure ohne KI-Hintergrund'
);

const cotPrompt = createChainOfThoughtPrompt(
  'Wie können wir die Genauigkeit unseres Objekterkennungssystems für Fußgänger verbessern?'
);

// Niedriger Temperature-Wert für analytische Antworten
askAI(cotPrompt, 0.2).then(response => console.log(response));`
  },
  {
    name: 'Kontext und Formatierung',
    language: 'javascript',
    code: `// Kontext und Formatierung in Prompts
const axios = require('axios');

// Strukturierter Prompt mit Kontext und Format
function createStructuredPrompt(context, task, format) {
  return \`KONTEXT:
\${context}

AUFGABE:
\${task}

FORMAT:
\${format}

ANTWORT:\`;
}

async function askAI(prompt) {
  try {
    const response = await axios.post(
      'https://api.example.com/v1/completions',
      {
        model: 'gpt-4',
        prompt: prompt,
        max_tokens: 1500,
        temperature: 0.5
      },
      {
        headers: {
          'Authorization': \`Bearer \${process.env.API_KEY}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred';
  }
}

// Beispielaufruf
const technicalReportPrompt = createStructuredPrompt(
  \`Wir entwickeln ein neues Fahrassistenzsystem für Porsche-Fahrzeuge, 
das KI zur Erkennung von Verkehrsschildern und Fahrbahnmarkierungen nutzt.
Bisherige Tests zeigen eine Erkennungsrate von 92% bei Tag und 78% bei Nacht.\`,
  
  \`Erstelle einen technischen Bericht, der Verbesserungsmöglichkeiten für die 
Erkennungsrate bei Nacht identifiziert und priorisiert.\`,
  
  \`Der Bericht sollte folgende Abschnitte enthalten:
1. Zusammenfassung (3-5 Sätze)
2. Herausforderungen bei der Nachterkennung (stichpunktartig)
3. Technische Lösungsansätze (nummeriert und priorisiert)
4. Implementierungsempfehlungen (tabelliert nach Aufwand und Wirkung)
5. Nächste Schritte (als Todo-Liste)\`
);

askAI(technicalReportPrompt).then(response => console.log(response));`
  }
];

export default function HighLevelPrompting() {
  const { isDarkMode } = useTheme();
  
  return (
    <main>
      <SectionHero
        title="High-Level Prompting"
        subtitle="Best Practices für effektive KI-Kommunikation"
      />

      <SectionContent>
        <PHeading tag="h2" size="large" className="mb-6">Effektive Kommunikation mit KI-Systemen</PHeading>
        <PText className="mb-8">
          Das Formulieren präziser und wirkungsvoller Prompts ist entscheidend für die erfolgreiche Nutzung von KI-Systemen. Durch optimierte Prompts erhalten Sie bessere, relevantere und genauere Antworten bei gleichzeitiger Ressourcenoptimierung.
        </PText>

        <PGrid>
          <PGridItem size={12}>
            <PHeading tag="h3" size="medium" className="mb-4">Prompting-Grundlagen</PHeading>
            <PText className="mb-6">
              Prompts sind Anweisungen oder Fragen, die wir KI-Modellen stellen. Die Qualität und Struktur dieser Prompts haben direkten Einfluss auf die Qualität der Antworten. Gute Prompts sind klar, spezifisch und bieten ausreichend Kontext.
            </PText>
          </PGridItem>
        </PGrid>
      </SectionContent>

      <InteractiveArea title="Interaktiver Prompt-Builder">
        <PromptBuilder 
          templates={promptTemplates}
          parameters={promptParameters}
        />
      </InteractiveArea>

      <SectionContent>
        <PHeading tag="h3" size="medium" className="mb-4">Prompting-Muster im Vergleich</PHeading>
        <PText className="mb-6">
          Es haben sich verschiedene Prompting-Techniken entwickelt, die für unterschiedliche Anforderungen geeignet sind. Im Folgenden finden Sie einen Vergleich gängiger Ansätze.
        </PText>

        <PGrid className="gap-6 mb-8">
          <PGridItem size={6} className="col-span-12 sm:col-span-6">
            <div className="p-6 rounded-lg h-full" style={{ backgroundColor: 'var(--card-bg)' }}>
              <PHeading tag="h4" size="small" className="mb-3">Einfache Anfragen</PHeading>
              <PText className="mb-4">
                Direkte Fragen oder Anweisungen ohne besondere Struktur. Geeignet für einfache, faktische Informationen.
              </PText>
              <p 
                className="font-mono text-sm p-3 rounded" 
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'white', 
                  color: 'var(--foreground)',
                  border: '1px solid var(--border-color)'
                }}
              >
                Was ist die Reichweite des Porsche Taycan?
              </p>
            </div>
          </PGridItem>
          
          <PGridItem size={6} className="col-span-12 sm:col-span-6">
            <div className="p-6 rounded-lg h-full" style={{ backgroundColor: 'var(--card-bg)' }}>
              <PHeading tag="h4" size="small" className="mb-3">Chain-of-Thought Prompting</PHeading>
              <PText className="mb-4">
                Fordert das Modell auf, seinen Denkprozess schrittweise zu erläutern. Ideal für komplexe Probleme oder Analysen.
              </PText>
              <p 
                className="font-mono text-sm p-3 rounded" 
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'white', 
                  color: 'var(--foreground)',
                  border: '1px solid var(--border-color)'
                }}
              >
                Wie können wir den Energieverbrauch beim Taycan optimieren? Denke Schritt für Schritt durch die möglichen Ansätze.
              </p>
            </div>
          </PGridItem>
          
          <PGridItem size={6} className="col-span-12 sm:col-span-6">
            <div className="p-6 rounded-lg h-full" style={{ backgroundColor: 'var(--card-bg)' }}>
              <PHeading tag="h4" size="small" className="mb-3">Rollenbasierte Prompts</PHeading>
              <PText className="mb-4">
                Weist dem Modell eine spezifische Rolle oder Expertise zu. Effektiv für spezialisierte oder fachspezifische Antworten.
              </PText>
              <p 
                className="font-mono text-sm p-3 rounded" 
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'white', 
                  color: 'var(--foreground)',
                  border: '1px solid var(--border-color)'
                }}
              >
                Als Experte für Elektromobilität, erkläre die Vorteile der 800V-Architektur im Porsche Taycan.
              </p>
            </div>
          </PGridItem>
          
          <PGridItem size={6} className="col-span-12 sm:col-span-6">
            <div className="p-6 rounded-lg h-full" style={{ backgroundColor: 'var(--card-bg)' }}>
              <PHeading tag="h4" size="small" className="mb-3">Strukturierte Prompts</PHeading>
              <PText className="mb-4">
                Klar formatierte Anfragen mit Abschnitten für Kontext, Aufgabe und gewünschtes Format. Optimal für komplexe Aufgaben mit spezifischen Anforderungen.
              </PText>
              <p 
                className="font-mono text-sm p-3 rounded" 
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'white', 
                  color: 'var(--foreground)',
                  border: '1px solid var(--border-color)'
                }}
              >
                KONTEXT: Analyse von Telemetriedaten des Porsche Taycan
                <br />
                AUFGABE: Identifiziere Muster im Ladeverhalten
                <br />
                FORMAT: Tabellarische Zusammenfassung mit Grafiken
              </p>
            </div>
          </PGridItem>
        </PGrid>
      </SectionContent>

      <InteractiveArea title="Code-Beispiele für Prompt-Implementierungen">
        <CodeEditorWithTabs 
          tabs={codeExamples}
          height="500px"
        />
      </InteractiveArea>

      <SectionContent>
        <DosDontsExample 
          title="Dos & Don'ts für effektive Prompts"
          description="Lernen Sie aus Beispielen, wie Sie Ihre Prompts optimieren können, um bessere Ergebnisse zu erzielen und typische Fehler zu vermeiden."
          examples={promptExamples}
        />

        <DosDontsExample 
          title="Automotive-spezifische Prompt-Beispiele"
          description="Spezialisierte Prompt-Optimierungen für den Automobilkontext, die die besonderen Anforderungen und Fachterminologie berücksichtigen."
          examples={automotivePromptExamples}
        />
      </SectionContent>

      <SectionSummary
        title="Zusammenfassung"
        takeaways={[
          "Effektive Prompts sind klar, spezifisch und bieten ausreichend Kontext.",
          "Verschiedene Prompting-Techniken eignen sich für unterschiedliche Anforderungen.",
          "Strukturierte Prompts mit klarem Format führen zu konsistenteren Ergebnissen.",
          "Rollenbasierte und Chain-of-Thought Prompts verbessern die Qualität komplexer Antworten.",
          "Branchenspezifische Prompts mit Fachterminologie erhöhen die Relevanz für den Automobilbereich."
        ]}
        nextSection={{
          name: "Kontextwahl",
          path: "/kontextwahl"
        }}
      />
    </main>
  );
} 