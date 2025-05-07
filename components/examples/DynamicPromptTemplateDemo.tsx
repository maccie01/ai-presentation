"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import InfoCard from '@/components/ui/InfoCard';
import Tabs from '@/components/ui/Tabs';
import CodeEditor from '@/components/interactive/CodeEditor';
import { useTheme } from '@/lib/themeContext';

// Template variable data
const templateVariables = [
  {
    id: 'user',
    name: 'Benutzer-Kontext',
    examples: ['Name', 'Rolle', 'Abteilung', 'Berechtigungen'],
    description: 'Informationen über den Benutzer, der die Anfrage stellt',
    placeholders: ['{{user.name}}', '{{user.role}}', '{{user.department}}'],
  },
  {
    id: 'domain',
    name: 'Domänen-Kontext',
    examples: ['Fahrzeugdaten', 'Produktdokumentation', 'Technik-Standards'],
    description: 'Fachlich relevante Informationen für den Anwendungsbereich',
    placeholders: ['{{domain.vehicle_type}}', '{{domain.product_series}}', '{{domain.technical_standard}}'],
  },
  {
    id: 'system',
    name: 'System-Kontext',
    examples: ['Anwendungsversion', 'Konfiguration', 'Umgebung'],
    description: 'Technische Informationen über das System',
    placeholders: ['{{system.version}}', '{{system.config}}', '{{system.environment}}'],
  },
  {
    id: 'history',
    name: 'Interaktions-Kontext',
    examples: ['Vorherige Anfragen', 'Gesprächsverlauf', 'Präferenzen'],
    description: 'Informationen aus früheren Interaktionen mit dem System',
    placeholders: ['{{history.last_query}}', '{{history.preferences}}', '{{history.session_id}}'],
  }
];

// Example prompt templates
const promptTemplates = [
  {
    id: 'technical_support',
    name: 'Technischer Support',
    description: 'Template für technische Supportanfragen zu Fahrzeugsystemen',
    template: `Als Technischer Support-Experte für Porsche beantworte bitte die folgende Anfrage für {{user.name}} (Rolle: {{user.role}}) zum Fahrzeugtyp {{domain.vehicle_type}}:

ANFRAGE: {{user_query}}

Berücksichtige folgende technische Dokumente:
{{domain.technical_standard}}

Falls relevante Informationen fehlen, bitte um spezifische Details.`,
  },
  {
    id: 'product_inquiry',
    name: 'Produktanfrage',
    description: 'Template für Anfragen zu Produkteigenschaften und -funktionen',
    template: `Du bist ein Produktberater für Porsche. Der Kunde {{user.name}} hat folgende Anfrage zu {{domain.product_series}}:

ANFRAGE: {{user_query}}

Berücksichtige die Kaufhistorie und Präferenzen: {{history.preferences}}
Beziehe dich auf die Produktdokumentation für {{domain.product_series}}.

Beantworte die Anfrage präzise und kundenorientiert.`,
  },
  {
    id: 'diagnostic',
    name: 'Fahrzeugdiagnose',
    description: 'Template für die Diagnose von Fahrzeugproblemen',
    template: `Als Diagnose-Experte für Porsche-Fahrzeuge, analysiere bitte das folgende Problem für {{user.name}} mit einem {{domain.vehicle_type}}:

PROBLEMBESCHREIBUNG: {{user_query}}

Fahrzeugdaten:
- Modell: {{domain.vehicle_type}}
- Software-Version: {{system.version}}
- Letzte Diagnose: {{history.last_query}}

Gib eine strukturierte Diagnose mit möglichen Ursachen und empfohlenen Maßnahmen.`,
  }
];

// Flow diagram node data
const flowDiagramNodes = [
  { id: 'input', type: 'input', label: 'Benutzeranfrage', position: { x: 100, y: 50 } },
  { id: 'template', type: 'default', label: 'Template-Auswahl', position: { x: 100, y: 150 } },
  { id: 'variables', type: 'default', label: 'Variablen-Extraktion', position: { x: 100, y: 250 } },
  { id: 'user_context', type: 'default', label: 'Benutzer-Kontext', position: { x: 250, y: 200 } },
  { id: 'domain_context', type: 'default', label: 'Domänen-Kontext', position: { x: 250, y: 300 } },
  { id: 'substitution', type: 'default', label: 'Variablen-Substitution', position: { x: 100, y: 350 } },
  { id: 'final_prompt', type: 'output', label: 'Finaler Prompt', position: { x: 100, y: 450 } },
];

// Flow diagram edge data
const flowDiagramEdges = [
  { id: 'e1-2', source: 'input', target: 'template' },
  { id: 'e2-3', source: 'template', target: 'variables' },
  { id: 'e3-4', source: 'variables', target: 'user_context' },
  { id: 'e3-5', source: 'variables', target: 'domain_context' },
  { id: 'e4-6', source: 'user_context', target: 'substitution' },
  { id: 'e5-6', source: 'domain_context', target: 'substitution' },
  { id: 'e6-7', source: 'substitution', target: 'final_prompt' },
];

const TemplateVariableFlow: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Template-Variablentypen</PHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templateVariables.map((variable, index) => (
          <div 
            key={variable.id} 
            className="rounded-lg p-4 border" 
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
          >
            <PHeading tag="h5" size="small" className="mb-2">{variable.name}</PHeading>
            <PText size="small" className="mb-3">{variable.description}</PText>
            
            <div className="mb-2 font-medium text-sm">Beispiele:</div>
            <div 
              className="flex flex-wrap gap-2 mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              {variable.examples.map((example, i) => (
                <span 
                  key={i} 
                  className="px-2 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)', 
                    color: 'var(--foreground)'
                  }}
                >
                  {example}
                </span>
              ))}
            </div>
            
            <div className="mb-2 font-medium text-sm">Platzhalter:</div>
            <div 
              className="font-mono text-xs" 
              style={{ color: isDarkMode ? 'rgba(147, 197, 253, 0.9)' : '#2563eb' }}
            >
              {variable.placeholders.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TemplateComposition: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(promptTemplates[0]);
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Template-Kompositions-Visualisierung</PHeading>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <PHeading tag="h5" size="small" className="mb-2">Template-Bibliothek</PHeading>
          <div 
            className="rounded-lg overflow-hidden border" 
            style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
          >
            {promptTemplates.map((template) => (
              <div 
                key={template.id}
                className="p-3 cursor-pointer border-b"
                style={{ 
                  backgroundColor: selectedTemplate.id === template.id 
                    ? isDarkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(219, 234, 254, 0.8)'
                    : 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  borderLeftWidth: selectedTemplate.id === template.id ? '4px' : '0px',
                  borderLeftColor: isDarkMode ? '#3b82f6' : '#2563eb'
                }}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="font-medium">{template.name}</div>
                <PText size="small">{template.description}</PText>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <PHeading tag="h5" size="small" className="mb-2">Template-Struktur</PHeading>
          <CodeEditor
            language="markdown"
            defaultCode={selectedTemplate.template}
            height="280px"
            readOnly={true}
          />
          
          <div 
            className="mt-4 p-3 rounded-lg border" 
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.2)' : 'rgba(239, 246, 255, 0.8)', 
              borderColor: isDarkMode ? 'rgba(37, 99, 235, 0.4)' : 'rgba(147, 197, 253, 0.8)' 
            }}
          >
            <PHeading tag="h5" size="small" className="mb-1">Template-Eigenschaften</PHeading>
            <ul className="list-disc pl-5" style={{ color: 'var(--foreground)' }}>
              <li><PText size="small"><strong>Zweck:</strong> {selectedTemplate.description}</PText></li>
              <li><PText size="small"><strong>Variablen:</strong> {[...selectedTemplate.template.matchAll(/\{\{([^}]+)\}\}/g)].map(m => m[0]).join(', ')}</PText></li>
              <li>
                <PText size="small">
                  <strong>Struktur:</strong> Dieses Template verwendet eine klare Struktur mit Rollen-Prompt, 
                  Kontextinformationen und spezifischen Anweisungen.
                </PText>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContextInjectionPipeline: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  // Theme-aware style constants
  const boxStyle = {
    backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.3)' : 'rgba(219, 234, 254, 0.8)',
    borderColor: isDarkMode ? 'rgba(37, 99, 235, 0.5)' : 'rgba(147, 197, 253, 0.8)'
  };
  
  const connectorStyle = {
    backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.8)'
  };
  
  const cardBg = {
    backgroundColor: 'var(--card-bg)',
    borderColor: 'var(--border-color)'
  };
  
  return (
    <div className="w-full">
      <PHeading tag="h4" size="small" className="mb-4">Kontext-Injektions-Pipeline</PHeading>
      
      <div 
        className="rounded-lg p-4 overflow-x-auto border" 
        style={cardBg}
      >
        <div className="min-w-[700px] py-4">
          {/* Pipeline stages visualization */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col items-center w-[150px]">
              <div 
                className="rounded-lg p-3 mb-2 h-20 flex items-center justify-center text-center border"
                style={boxStyle}
              >
                <PText size="small"><strong>Template<br />Auswahl</strong></PText>
              </div>
              <div style={{ color: 'var(--foreground-lighter)' }} className="text-xs">Schritt 1</div>
            </div>
            
            <div className="h-0.5 w-10" style={connectorStyle}></div>
            
            <div className="flex flex-col items-center w-[150px]">
              <div 
                className="rounded-lg p-3 mb-2 h-20 flex items-center justify-center text-center border"
                style={boxStyle}
              >
                <PText size="small"><strong>Kontext<br />Sammlung</strong></PText>
              </div>
              <div style={{ color: 'var(--foreground-lighter)' }} className="text-xs">Schritt 2</div>
            </div>
            
            <div className="h-0.5 w-10" style={connectorStyle}></div>
            
            <div className="flex flex-col items-center w-[150px]">
              <div 
                className="rounded-lg p-3 mb-2 h-20 flex items-center justify-center text-center border"
                style={boxStyle}
              >
                <PText size="small"><strong>Variable<br />Ersetzung</strong></PText>
              </div>
              <div style={{ color: 'var(--foreground-lighter)' }} className="text-xs">Schritt 3</div>
            </div>
            
            <div className="h-0.5 w-10" style={connectorStyle}></div>
            
            <div className="flex flex-col items-center w-[150px]">
              <div 
                className="rounded-lg p-3 mb-2 h-20 flex items-center justify-center text-center border"
                style={boxStyle}
              >
                <PText size="small"><strong>Prompt<br />Validierung</strong></PText>
              </div>
              <div style={{ color: 'var(--foreground-lighter)' }} className="text-xs">Schritt 4</div>
            </div>
          </div>
          
          {/* Pipeline details */}
          <div className="grid grid-cols-4 gap-4">
            <div 
              className="p-2 border-t pt-4" 
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="font-medium text-sm mb-1">1. Template Auswahl</div>
              <ul className="text-xs list-disc pl-4" style={{ color: 'var(--foreground)' }}>
                <li>Basierend auf Anfragetype</li>
                <li>Auswahl passender Struktur</li>
                <li>Bestimmung von Rollenkontext</li>
              </ul>
            </div>
            
            <div 
              className="p-2 border-t pt-4" 
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="font-medium text-sm mb-1">2. Kontext Sammlung</div>
              <ul className="text-xs list-disc pl-4" style={{ color: 'var(--foreground)' }}>
                <li>Extraktion von Benutzerkontext</li>
                <li>Abruf von Domänenwissen</li>
                <li>Sammlung von Systemdaten</li>
              </ul>
            </div>
            
            <div 
              className="p-2 border-t pt-4" 
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="font-medium text-sm mb-1">3. Variable Ersetzung</div>
              <ul className="text-xs list-disc pl-4" style={{ color: 'var(--foreground)' }}>
                <li>Variablen identifizieren</li>
                <li>Werte aus Kontext zuordnen</li>
                <li>Formattierung anwenden</li>
              </ul>
            </div>
            
            <div 
              className="p-2 border-t pt-4" 
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="font-medium text-sm mb-1">4. Prompt Validierung</div>
              <ul className="text-xs list-disc pl-4" style={{ color: 'var(--foreground)' }}>
                <li>Syntax-Prüfung</li>
                <li>Längenüberprüfung</li>
                <li>Sicherheitscheck</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="mt-6 p-4 rounded-lg border" 
        style={{ 
          backgroundColor: isDarkMode ? 'rgba(234, 179, 8, 0.1)' : 'rgba(254, 252, 232, 0.8)', 
          borderColor: isDarkMode ? 'rgba(234, 179, 8, 0.3)' : 'rgba(250, 204, 21, 0.4)' 
        }}
      >
        <PHeading tag="h5" size="small" className="mb-2">Best Practice: Kontext-Priorisierung</PHeading>
        <PText>
          Bei der Verwendung dynamischer Templates ist die Priorisierung von Kontext entscheidend.
          Die wichtigsten Kontextinformationen sollten am Anfang des Prompts platziert werden,
          während unterstützende Details später folgen können. Dies verbessert die Aufmerksamkeit
          des KI-Modells auf die relevantesten Daten.
        </PText>
      </div>
    </div>
  );
};

interface DynamicPromptTemplateDemoProps {
  title?: string;
  description?: string;
}

const DynamicPromptTemplateDemo: React.FC<DynamicPromptTemplateDemoProps> = ({
  title = "Dynamische Prompt-Templates",
  description
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full">
      <PHeading tag="h3" size="medium" className="mb-2">{title}</PHeading>
      {description && <PText className="mb-6">{description}</PText>}
      
      <Tabs
        tabs={[
          {
            id: 'variable-flow',
            label: 'Template-Variablen',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            ),
            content: <TemplateVariableFlow />
          },
          {
            id: 'composition',
            label: 'Template-Komposition',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            ),
            content: <TemplateComposition />
          },
          {
            id: 'injection-pipeline',
            label: 'Kontext-Injektion',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            content: <ContextInjectionPipeline />
          }
        ]}
        variant="pills"
        className="mb-6"
      />
      
      <div 
        className="p-4 rounded-lg border mt-6" 
        style={{ 
          backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.2)' : 'rgba(239, 246, 255, 0.8)', 
          borderColor: isDarkMode ? 'rgba(37, 99, 235, 0.4)' : 'rgba(147, 197, 253, 0.8)' 
        }}
      >
        <PHeading tag="h4" size="small" className="mb-2">Vorteile dynamischer Templates:</PHeading>
        <PText>
          Dynamische Prompt-Templates ermöglichen die flexible Anpassung von KI-Anfragen an verschiedene 
          Anwendungsfälle und Benutzergruppen. Durch die Verwendung von Variablen und die kontextbasierte 
          Anreicherung können Templates wiederverwendet und konsistente Ergebnisse erzielt werden.
          Besonders in technischen Umgebungen wie der Automobilindustrie bieten sie eine strukturierte 
          Möglichkeit, komplexe Anfragen zu standardisieren.
        </PText>
      </div>
    </div>
  );
};

export default DynamicPromptTemplateDemo; 