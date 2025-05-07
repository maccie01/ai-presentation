"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFlow, { 
  Node, 
  Edge, 
  NodeTypes, 
  EdgeTypes,
  Background,
  Controls,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node component for Power Platform products
const PlatformNode: React.FC<any> = ({ data }) => {
  return (
    <motion.div 
      className="platform-node relative"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div 
        className={`p-4 rounded-lg shadow-md cursor-pointer text-center ${data.className}`} 
        onClick={() => data.onSelect(data.id)}
      >
        <div className="icon-container mb-2">
          {data.icon && <data.icon size={36} />}
        </div>
        <h3 className="font-bold text-lg mb-1">{data.label}</h3>
        <p className="text-sm">{data.shortDescription}</p>
      </div>
    </motion.div>
  );
};

// Custom edge with animation
const AnimatedEdge: React.FC<any> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}) => {
  const edgePath = `M ${sourceX},${sourceY} C ${sourceX + 50},${sourceY} ${targetX - 50},${targetY} ${targetX},${targetY}`;
  
  return (
    <g>
      <path
        id={id}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: data?.color || '#ccc',
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={MarkerType.ArrowClosed}
      />
      <text>
        <textPath
          href={`#${id}`}
          style={{ fontSize: '12px' }}
          startOffset="50%"
          textAnchor="middle"
        >
          {data?.label}
        </textPath>
      </text>
    </g>
  );
};

// Node and edge type definitions
const nodeTypes: NodeTypes = {
  platformNode: PlatformNode,
};

const edgeTypes: EdgeTypes = {
  animated: AnimatedEdge,
};

// Component details interfaces
interface ComponentDetail {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  keyFeatures: string[];
  businessValue: string[];
}

// Main component
export function PowerPlatformOverview() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  
  // Define nodes for the Power Platform components
  const initialNodes: Node[] = [
    {
      id: 'power-apps',
      type: 'platformNode',
      position: { x: 250, y: 50 },
      data: { 
        id: 'power-apps',
        label: 'Power Apps', 
        shortDescription: 'Low-Code App Development',
        className: 'bg-purple-100 border border-purple-300',
        onSelect: setSelectedComponent
      }
    },
    {
      id: 'power-automate',
      type: 'platformNode',
      position: { x: 500, y: 150 },
      data: { 
        id: 'power-automate',
        label: 'Power Automate', 
        shortDescription: 'Process Automation',
        className: 'bg-blue-100 border border-blue-300',
        onSelect: setSelectedComponent
      }
    },
    {
      id: 'power-bi',
      type: 'platformNode',
      position: { x: 400, y: 300 },
      data: { 
        id: 'power-bi',
        label: 'Power BI', 
        shortDescription: 'Business Intelligence',
        className: 'bg-yellow-100 border border-yellow-300',
        onSelect: setSelectedComponent
      }
    },
    {
      id: 'power-pages',
      type: 'platformNode',
      position: { x: 100, y: 300 },
      data: { 
        id: 'power-pages',
        label: 'Power Pages', 
        shortDescription: 'External Websites',
        className: 'bg-green-100 border border-green-300',
        onSelect: setSelectedComponent
      }
    },
    {
      id: 'copilot-studio',
      type: 'platformNode',
      position: { x: 0, y: 150 },
      data: { 
        id: 'copilot-studio',
        label: 'Copilot Studio', 
        shortDescription: 'Conversational AI',
        className: 'bg-orange-100 border border-orange-300',
        onSelect: setSelectedComponent
      }
    },
    {
      id: 'admin-center',
      type: 'platformNode',
      position: { x: 250, y: 180 },
      data: { 
        id: 'admin-center',
        label: 'Admin Center', 
        shortDescription: 'Governance & Administration',
        className: 'bg-red-100 border border-red-300',
        onSelect: setSelectedComponent
      }
    },
    {
      id: 'dataverse',
      type: 'platformNode',
      position: { x: 250, y: 400 },
      data: { 
        id: 'dataverse',
        label: 'Dataverse', 
        shortDescription: 'Data Platform',
        className: 'bg-indigo-100 border border-indigo-300',
        onSelect: setSelectedComponent
      }
    },
  ];
  
  // Define connections between components
  const initialEdges: Edge[] = [
    {
      id: 'apps-to-automate',
      source: 'power-apps',
      target: 'power-automate',
      type: 'animated',
      data: { label: 'Triggers flows', color: '#9333ea' }
    },
    {
      id: 'apps-to-pages',
      source: 'power-apps',
      target: 'power-pages',
      type: 'animated',
      data: { label: 'Embeds in portals', color: '#9333ea' }
    },
    {
      id: 'apps-to-admin',
      source: 'power-apps',
      target: 'admin-center',
      type: 'animated',
      data: { label: 'Managed by', color: '#9333ea' }
    },
    {
      id: 'apps-to-dataverse',
      source: 'power-apps',
      target: 'dataverse',
      type: 'animated',
      data: { label: 'Stores data', color: '#9333ea' }
    },
    {
      id: 'automate-to-bi',
      source: 'power-automate',
      target: 'power-bi',
      type: 'animated',
      data: { label: 'Refreshes data', color: '#3b82f6' }
    },
    {
      id: 'automate-to-admin',
      source: 'power-automate',
      target: 'admin-center',
      type: 'animated',
      data: { label: 'Governed by', color: '#3b82f6' }
    },
    {
      id: 'automate-to-dataverse',
      source: 'power-automate',
      target: 'dataverse',
      type: 'animated',
      data: { label: 'Processes data', color: '#3b82f6' }
    },
    {
      id: 'pages-to-admin',
      source: 'power-pages',
      target: 'admin-center',
      type: 'animated',
      data: { label: 'Configured in', color: '#22c55e' }
    },
    {
      id: 'pages-to-dataverse',
      source: 'power-pages',
      target: 'dataverse',
      type: 'animated',
      data: { label: 'Reads/writes data', color: '#22c55e' }
    },
    {
      id: 'bi-to-dataverse',
      source: 'power-bi',
      target: 'dataverse',
      type: 'animated',
      data: { label: 'Analyzes data', color: '#eab308' }
    },
    {
      id: 'bi-to-admin',
      source: 'power-bi',
      target: 'admin-center',
      type: 'animated',
      data: { label: 'Managed by', color: '#eab308' }
    },
    {
      id: 'copilot-to-apps',
      source: 'copilot-studio',
      target: 'power-apps',
      type: 'animated',
      data: { label: 'Embedded in', color: '#f97316' }
    },
    {
      id: 'copilot-to-pages',
      source: 'copilot-studio',
      target: 'power-pages',
      type: 'animated',
      data: { label: 'Integrated with', color: '#f97316' }
    },
    {
      id: 'copilot-to-admin',
      source: 'copilot-studio',
      target: 'admin-center',
      type: 'animated',
      data: { label: 'Governed by', color: '#f97316' }
    },
    {
      id: 'copilot-to-dataverse',
      source: 'copilot-studio',
      target: 'dataverse',
      type: 'animated',
      data: { label: 'Uses data from', color: '#f97316' }
    },
    {
      id: 'admin-to-dataverse',
      source: 'admin-center',
      target: 'dataverse',
      type: 'animated',
      data: { label: 'Manages', color: '#ef4444' }
    },
  ];
  
  // Component details for display in the detail panel
  const componentDetails: Record<string, ComponentDetail> = {
    'power-apps': {
      id: 'power-apps',
      title: 'Power Apps',
      description: 'Eine Low-Code-Entwicklungsplattform zum Erstellen benutzerdefinierter Anwendungen ohne umfangreiche Programmierkenntnisse. Mit Power Apps können Sie schnell geschäftsspezifische Anwendungen mit einer intuitiven drag-and-drop-Oberfläche erstellen.',
      capabilities: [
        'Canvas-Apps mit vollständig anpassbarem UI',
        'Model-driven Apps für komplexe Datenmodelle',
        'Portal-Apps für externe Benutzer',
        'Mobile-ready Anwendungen für iOS und Android',
      ],
      keyFeatures: [
        'Drag-and-Drop App-Builder mit vorgefertigten Komponenten',
        'Über 400 Datenquellen-Konnektoren (SharePoint, Excel, SQL, etc.)',
        'Formularbasierte Datenerfassung mit Validierungsregeln',
        'Responsive Design für alle Bildschirmgrößen',
      ],
      businessValue: [
        'Reduzierung der Entwicklungszeit und -kosten',
        'Schnellere Umsetzung von Geschäftsideen',
        'Behebung von Prozesslücken durch maßgeschneiderte Apps',
        'Mobilisierung der Belegschaft mit Apps für unterwegs',
      ],
    },
    'power-automate': {
      id: 'power-automate',
      title: 'Power Automate',
      description: 'Eine Workflow-Automatisierungsplattform zum Erstellen automatisierter Geschäftsprozesse. Von einfachen Benachrichtigungen bis hin zu komplexen mehrstufigen Genehmigungsprozessen ermöglicht Power Automate die Automatisierung wiederkehrender Aufgaben.',
      capabilities: [
        'Cloud Flows für API-basierte Automatisierungen',
        'Desktop Flows für RPA (Robotic Process Automation)',
        'Business Process Flows für geführte Arbeitsabläufe',
        'Instant Flows für manuelle Auslöser',
      ],
      keyFeatures: [
        'Visuelle Workflow-Erstellung ohne Programmierung',
        'Vorgefertigte Vorlagen für gängige Automatisierungen',
        'Umfangreiche Trigger- und Aktionsmöglichkeiten',
        'Bedingte Logik und Schleifen für komplexe Szenarien',
      ],
      businessValue: [
        'Reduzierung manueller, zeitaufwändiger Aufgaben',
        'Standardisierung von Geschäftsprozessen',
        'Verbesserung der Datenqualität durch automatisierte Validierung',
        'Schnellere Reaktion auf Geschäftsereignisse',
      ],
    },
    'power-bi': {
      id: 'power-bi',
      title: 'Power BI',
      description: 'Eine Business Intelligence-Plattform für datengestützte Entscheidungen durch interaktive Visualisierungen und Self-Service-Analysen. Power BI verwandelt Daten in aussagekräftige Einblicke mit umfangreichen Visualisierungsmöglichkeiten.',
      capabilities: [
        'Interaktive Dashboards und Berichte',
        'Datenmodellierung und Transformation',
        'Echtzeitanalysen und automatische Aktualisierungen',
        'Integrierte KI-Funktionen für erweiterte Analysen',
      ],
      keyFeatures: [
        'Drag-and-Drop Report Builder mit visueller Formatierung',
        'Leistungsstarke DAX-Formelsprache für Berechnungen',
        'Natürliche Sprachsuche für Datenabfragen (Q&A)',
        'Umfangreiche Datenanbindung an verschiedenste Quellen',
      ],
      businessValue: [
        'Verbessertes Verständnis von Geschäftsdaten für bessere Entscheidungen',
        'Demokratisierung von Daten durch Self-Service BI',
        'Früherkennung von Trends und Anomalien',
        'Einheitliche Sicht auf Unternehmenskennzahlen',
      ],
    },
    'power-pages': {
      id: 'power-pages',
      title: 'Power Pages',
      description: 'Eine sichere Low-Code-Plattform zum Erstellen von professionellen, nach außen gerichteten Websites. Power Pages ermöglicht die Erstellung von Portalen für Kunden, Partner und Mitarbeiter mit direkter Dataverse-Integration.',
      capabilities: [
        'Benutzerdefinierbare Website-Vorlagen',
        'Integrierte Formulare für Datenerfassung',
        'Sicheres Identitätsmanagement',
        'Multilingual Content Management',
      ],
      keyFeatures: [
        'WYSIWYG-Editor für visuelles Website-Design',
        'Direkte Integration mit Dataverse-Daten',
        'Rollenbasierte Zugriffssteuerung',
        'Responsive Design für alle Geräte',
      ],
      businessValue: [
        'Vereinfachte externe Zusammenarbeit mit Partnern und Kunden',
        'Reduzierung der Kosten für externe Website-Entwicklung',
        'Schnellere Time-to-Market für kundenorientierte Lösungen',
        'Nahtlose Integration in bestehende Power Platform-Lösungen',
      ],
    },
    'copilot-studio': {
      id: 'copilot-studio',
      title: 'Copilot Studio',
      description: 'Eine Low-Code-Plattform für die Erstellung intelligenter, konversationeller KI-Bots. Copilot Studio (früher Power Virtual Agents) ermöglicht es Unternehmen, Chatbots zu erstellen, die auf Kundenanfragen reagieren, Informationen bereitstellen und Geschäftsprozesse auslösen können.',
      capabilities: [
        'No-Code Bot-Erstellung mit visuellem Dialog-Builder',
        'Nahtlose Integration mit Power Platform-Produkten',
        'Mehrkanal-Bereitstellung (Web, Teams, etc.)',
        'Natürliche Sprachverarbeitung und Absichtserkennung',
      ],
      keyFeatures: [
        'Themenbasierte Konversationsgestaltung ohne Programmierung',
        'KI-gestützte Vorschläge für Themen und Dialoge',
        'Einfache Integration von Authentifizierung und Personalisierung',
        'Umfassende Analyse der Bot-Leistung und -Nutzung',
      ],
      businessValue: [
        'Reduzierung der Kosten im Kundenservice durch Automatisierung',
        '24/7-Verfügbarkeit für Kundenanfragen',
        'Entlastung von Mitarbeitern bei sich wiederholenden Anfragen',
        'Skalierbare Kundenkommunikation ohne Personalaufstockung',
      ],
    },
    'admin-center': {
      id: 'admin-center',
      title: 'Power Platform Admin Center',
      description: 'Ein zentrales Verwaltungsportal für die Steuerung, Überwachung und Verwaltung aller Power Platform-Ressourcen. Das Admin Center bietet Governance-Tools, Umgebungsmanagement und Sicherheitskontrollen für die gesamte Power Platform.',
      capabilities: [
        'Umgebungs- und Ressourcenverwaltung',
        'Daten- und Berechtigungsmanagement',
        'Nutzungsüberwachung und Analysen',
        'Konnektor- und Richtlinienverwaltung',
      ],
      keyFeatures: [
        'Zentralisierte Verwaltung aller Power Platform-Komponenten',
        'Data Loss Prevention (DLP) Richtlinien',
        'Umfassende Sicherheits- und Compliance-Einstellungen',
        'Detaillierte Nutzungs- und Leistungsmetriken',
      ],
      businessValue: [
        'Reduzierung von Shadow IT durch zentrale Governance',
        'Verbesserung der Sicherheit und Compliance',
        'Optimierung der Ressourcennutzung und Kostenmanagement',
        'Förderung bewährter Verfahren durch standardisierte Richtlinien',
      ],
    },
    'dataverse': {
      id: 'dataverse',
      title: 'Dataverse',
      description: 'Eine skalierbare Datenspeicher- und -modellierungsplattform, die als Grundlage für Power Platform-Anwendungen dient. Dataverse speichert Ihre Geschäftsdaten in Form von Tabellen mit einem reichhaltigen Metadatenmodell und Sicherheitskonzepten.',
      capabilities: [
        'Relationale Datenspeicherung mit definierten Datentypen',
        'Vordefinierte Geschäftstabellen (Leads, Kontakte, etc.)',
        'Erweiterbare Datenmodelle mit benutzerdefinierten Tabellen',
        'Integrierte Sicherheit auf Zeilen- und Spaltenebene',
      ],
      keyFeatures: [
        'No-Code Datenmodellierung über die Benutzeroberfläche',
        'Automatische API-Generierung für all Ihre Daten',
        'Integrierte Business Rules und Validierungen',
        'Offline-Fähigkeit für mobile Szenarien',
      ],
      businessValue: [
        'Einheitliche Datenbasis für alle Power Platform-Anwendungen',
        'Reduzierung von Datensilos und Dateninkonsistenzen',
        'Verbesserte Datenintegrität und Geschäftslogik',
        'Sichere und konforme Datenspeicherung mit Audit-Trails',
      ],
    },
  };
  
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
        <div className="col-span-1 md:col-span-2 h-full">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <div className="col-span-1 bg-white p-4 rounded-lg border border-gray-200 shadow-sm overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedComponent ? (
              <motion.div
                key={selectedComponent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="component-details"
              >
                <h3 className="text-xl font-bold mb-3">{componentDetails[selectedComponent].title}</h3>
                <p className="mb-4 text-gray-700">{componentDetails[selectedComponent].description}</p>
                
                <h4 className="font-bold mb-2 text-blue-600">Kernfunktionen:</h4>
                <ul className="list-disc pl-5 mb-4">
                  {componentDetails[selectedComponent].capabilities.map((capability, index) => (
                    <li key={`cap-${index}`} className="mb-1 text-sm">{capability}</li>
                  ))}
                </ul>
                
                <h4 className="font-bold mb-2 text-purple-600">Hauptmerkmale:</h4>
                <ul className="list-disc pl-5 mb-4">
                  {componentDetails[selectedComponent].keyFeatures.map((feature, index) => (
                    <li key={`feat-${index}`} className="mb-1 text-sm">{feature}</li>
                  ))}
                </ul>
                
                <h4 className="font-bold mb-2 text-green-600">Geschäftlicher Nutzen:</h4>
                <ul className="list-disc pl-5">
                  {componentDetails[selectedComponent].businessValue.map((value, index) => (
                    <li key={`val-${index}`} className="mb-1 text-sm">{value}</li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => setSelectedComponent(null)}
                  >
                    Zurück zur Übersicht
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="instructions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-lg font-bold mb-3">Microsoft Power Platform</h3>
                <p className="mb-4 text-gray-700">
                  Die Microsoft Power Platform ist eine Sammlung von Produkten, die Unternehmen beim Erstellen von Lösungen, Automatisieren von Prozessen und Analysieren von Daten unterstützen - mit minimalem Code und maximaler Effizienz.
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Klicken Sie auf eine Komponente im Diagramm, um Details zu sehen.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
                  <p className="text-sm font-medium text-blue-700">
                    Die Integration aller Komponenten der Power Platform ermöglicht es Unternehmen, Geschäftslösungen schneller, kostengünstiger und mit weniger technischem Aufwand zu erstellen.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 