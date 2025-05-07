'use client';

import React, { useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  Handle,
  Position,
  NodeTypes,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import InfoCard from '@/components/ui/InfoCard';
import { useTheme } from '@/lib/themeContext';

// Custom node components
const DecisionNode = ({ data }: { data: any }) => {
  const { isDarkMode } = useTheme();
  return (
    <div 
      className="px-4 py-3 rounded-lg shadow-md border-2 max-w-[220px] text-center"
      style={{ 
        borderColor: '#6366f1', 
        backgroundColor: isDarkMode ? 'rgba(79, 70, 229, 0.1)' : 'rgba(238, 242, 255, 0.9)',
        color: isDarkMode ? '#e5e7eb' : '#1f2937'
      }}
    >
      <div className="font-medium text-sm">{data.label}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="source" position={Position.Left} id="c" />
    </div>
  );
};

const ProcessNode = ({ data }: { data: any }) => {
  const { isDarkMode } = useTheme();
  return (
    <div 
      className="px-4 py-3 rounded-lg shadow-md border-2 max-w-[220px] text-center"
      style={{ 
        borderColor: '#10b981', 
        backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 253, 245, 0.9)',
        color: isDarkMode ? '#e5e7eb' : '#1f2937'
      }}
    >
      <div className="font-medium text-sm">{data.label}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const StartEndNode = ({ data }: { data: any }) => {
  const { isDarkMode } = useTheme();
  return (
    <div 
      className="px-4 py-3 rounded-lg shadow-md border-2 max-w-[220px] text-center"
      style={{ 
        borderColor: '#3b82f6', 
        backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(219, 234, 254, 0.9)',
        color: isDarkMode ? '#e5e7eb' : '#1f2937'
      }}
    >
      <div className="font-medium text-sm">{data.label}</div>
      {data.type === 'start' ? (
        <Handle type="source" position={Position.Bottom} />
      ) : (
        <Handle type="target" position={Position.Top} />
      )}
    </div>
  );
};

// Node types definition
const nodeTypes: NodeTypes = {
  decision: DecisionNode,
  process: ProcessNode,
  startEnd: StartEndNode,
};

// Flow diagram data
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'startEnd',
    position: { x: 300, y: 0 },
    data: { label: 'Start: KI-Usecase identifizieren', type: 'start' },
  },
  {
    id: '2',
    type: 'decision',
    position: { x: 300, y: 120 },
    data: { label: 'Für gesamtes Unternehmen, Abteilung oder Einzelne?' },
  },
  {
    id: '3',
    type: 'process',
    position: { x: 600, y: 180 },
    data: { label: 'Proof of Concept (PoC) mit Azure/AWS bauen' },
  },
  {
    id: '4',
    type: 'decision',
    position: { x: 300, y: 240 },
    data: { label: 'Ist es ein Codriver-Usecase?' },
  },
  {
    id: '5',
    type: 'process',
    position: { x: 0, y: 240 },
    data: { label: 'An GGG-AI Abteilung zur Implementierung übergeben' },
  },
  {
    id: '6',
    type: 'process',
    position: { x: 300, y: 360 },
    data: { label: 'Proof of Concept (PoC) mit Azure/AWS bauen' },
  },
  {
    id: '7',
    type: 'process',
    position: { x: 450, y: 450 },
    data: { label: 'Abteilungs-Spoke kontaktieren' },
  },
  {
    id: '8',
    type: 'process',
    position: { x: 450, y: 550 },
    data: { label: 'Auf Genehmigung warten' },
  },
  {
    id: '9',
    type: 'startEnd',
    position: { x: 300, y: 650 },
    data: { label: 'Ende: KI-Usecase implementiert', type: 'end' },
  },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true,
    type: 'step',
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    sourceHandle: 'b',
    label: 'Einzelne',
    labelStyle: { fill: '#6b7280', fontWeight: 500 },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    type: 'smoothstep',
  },
  { 
    id: 'e2-4', 
    source: '2', 
    target: '4', 
    label: 'Abteilung/Unternehmen',
    labelStyle: { fill: '#6b7280', fontWeight: 500, paddingRight: '15px' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    type: 'step',
  },
  { 
    id: 'e4-5', 
    source: '4', 
    target: '5', 
    label: 'Ja',
    labelStyle: { fill: '#6b7280', fontWeight: 500 },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    type: 'smoothstep',
    sourceHandle: 'c',
  },
  { 
    id: 'e4-6', 
    source: '4', 
    target: '6', 
    label: 'Nein',
    labelStyle: { fill: '#6b7280', fontWeight: 500, paddingRight: '15px' },
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)' },
    type: 'step',
  },
  { 
    id: 'e3-7', 
    source: '3', 
    target: '7',
    animated: true,
    type: 'smoothstep',
  },
  { 
    id: 'e6-7', 
    source: '6', 
    target: '7',
    animated: true,
    type: 'smoothstep',
  },
  { 
    id: 'e7-8', 
    source: '7', 
    target: '8', 
    animated: true,
    type: 'step',
  },
  { 
    id: 'e8-9', 
    source: '8', 
    target: '9', 
    animated: true,
    type: 'step',
  },
  { 
    id: 'e5-9', 
    source: '5', 
    target: '9', 
    type: 'smoothstep',
    animated: true,
  },
];

const AiImplementationFlow: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="ai-implementation-flow">
      <div className="mb-6">
        <PHeading tag="h3" size="medium" className="mb-3">
          KI-Implementierungsprozess im Unternehmen
        </PHeading>
        <PText className="mb-6">
          Diese Visualisierung zeigt den strukturierten Entscheidungs- und Implementierungsprozess
          für KI-Usecases im Unternehmen. Der Prozess beginnt mit der Identifikation des Usecases und unterscheidet
          zwischen Einzelpersonen und Abteilungs-/Unternehmensanwendungen. Usecases für Einzelpersonen erfordern immer
          einen Proof of Concept, gefolgt von Spoke-Genehmigung. Bei abteilungs- oder unternehmensweiten Usecases
          wird zusätzlich geprüft, ob es sich um einen Codriver-Usecase handelt, der direkt an die Codriver Abteilung zur Implementation überwiesen wird.
          Abteilung zur Implementation überwiesen wird.
        </PText>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <InfoCard title="Usecase-Evaluierung" variant="info">
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Klare Identifikation des KI-Anwendungsfalls und seiner Ziele</li>
            <li>Festlegung der Reichweite: Unternehmensweit, abteilungsbezogen oder für einzelne Mitarbeiter</li>
            <li>Prüfung der Skalierbarkeit und des Ressourcenbedarfs des Usecases</li>
          </ul>
        </InfoCard>
        
        <InfoCard title="Implementierungspfade" variant="info">
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>Einzelne Mitarbeiter:</strong> Entwicklung eines PoC mit Azure/AWS und anschließende Genehmigung</li>
            <li><strong>Codriver-Usecase (nur Abteilung/Unternehmen):</strong> Übergabe an (FDA oder FDS) Abteilung für spezialisierte Implementierung</li>
            <li><strong>Sonstige Abteilungs-/Unternehmensusecases:</strong> Entwicklung eines PoC mit Azure oder AWS</li>
          </ul>
        </InfoCard>
        
        <InfoCard title="Genehmigungsprozess" variant="info">
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Kontaktieren des zuständigen Abteilungs-Spoke für initiale Bewertung</li>
            <li>Vorlage des PoC einschließlich technischer Details und Geschäftswert</li>
            <li>Einreichung erforderlicher Dokumentation (Datenschutz, Sicherheit, etc.)</li>
            <li>Nach Genehmigung: Vollständige Implementierung des Usecases</li>
          </ul>
        </InfoCard>
      </div>
      
      {/* Flow Diagram */}
      <div 
        style={{ 
          height: 750,
          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}
        className="border"
      >
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          connectionLineType={ConnectionLineType.SmoothStep}
          defaultEdgeOptions={{ type: 'smoothstep' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color={isDarkMode ? '#4b5563' : '#e5e7eb'} size={1.5} />
          <Controls />
        </ReactFlow>
      </div>
      
      <div className="p-4 rounded-lg" style={{ 
        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)'
      }}>
        <PText className="text-sm">
          <strong>Hinweis:</strong> Dieser Entscheidungsprozess stellt den empfohlenen Implementierungsweg für KI-Usecases dar. 
          Codriver-Usecases kommen nur für abteilungs- oder unternehmensweit genutzte Anwendungsfälle in Frage und werden 
          direkt an die GGG-AI Abteilung weitergeleitet. Für einzelne Nutzer und alle anderen Usecases ist ein Proof of 
          Concept zu erstellen, der dem zuständigen Spoke zur Genehmigung vorgelegt werden muss.
          Stand: 6. Mai 2025
        </PText>
      </div>
    </div>
  );
};

export default AiImplementationFlow; 