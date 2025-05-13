'use client';

import React, { useState } from 'react';
import PText from '@/components/ui/PText';
import Tabs from '@/components/ui/Tabs';
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useTheme } from '@/lib/themeContext';

// Custom node component for governance framework
type GovernanceNodeData = {
  label: string;
  description?: string;
  color: string;
};

const GovernanceNode = ({ data }: { data: GovernanceNodeData }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${data.color} text-white min-w-[180px]`}>
      <div className="font-bold text-sm mb-1">{data.label}</div>
      {data.description && <div className="text-xs">{data.description}</div>}
      <Handle type="target" position={Position.Top} style={{ background: '#fff' }} />
      <Handle type="source" position={Position.Bottom} style={{ background: '#fff' }} />
    </div>
  );
};

// Node types for the governance framework
const nodeTypes = {
  governanceNode: GovernanceNode,
};

// Governance framework diagram data
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'governanceNode',
    position: { x: 250, y: 0 },
    data: {
      label: 'KI-Governance-Board',
      description: 'Strategische Leitung & Aufsicht',
      color: 'bg-blue-600',
    },
  },
  {
    id: '2',
    type: 'governanceNode',
    position: { x: 20, y: 100 },
    data: {
      label: 'Ethikrichtlinien',
      description: 'Ethische Standards & Prinzipien',
      color: 'bg-purple-600',
    },
  },
  {
    id: '3',
    type: 'governanceNode',
    position: { x: 230, y: 100 },
    data: {
      label: 'Risikomanagement',
      description: 'Risikobewertung & -kontrolle',
      color: 'bg-red-600',
    },
  },
  {
    id: '4',
    type: 'governanceNode',
    position: { x: 420, y: 100 },
    data: {
      label: 'Compliance',
      description: 'Regulatorische Anforderungen',
      color: 'bg-green-600',
    },
  },
  {
    id: '5',
    type: 'governanceNode',
    position: { x: 40, y: 200 },
    data: {
      label: 'Datenschutz',
      description: 'Privacy & Datensouveränität',
      color: 'bg-indigo-600',
    },
  },
  {
    id: '6',
    type: 'governanceNode',
    position: { x: 230, y: 200 },
    data: {
      label: 'KI-Qualitätssicherung',
      description: 'Testing & Validation',
      color: 'bg-yellow-600',
    },
  },
  {
    id: '7',
    type: 'governanceNode',
    position: { x: 420, y: 200 },
    data: {
      label: 'Transparenz',
      description: 'Erklärbarkeit & Dokumentation',
      color: 'bg-teal-600',
    },
  },
  {
    id: '8',
    type: 'governanceNode',
    position: { x: 250, y: 300 },
    data: {
      label: 'Implementierung & Betrieb',
      description: 'Operative Umsetzung',
      color: 'bg-cyan-600',
    },
  },
];

// Governance framework edges
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e3-6', source: '3', target: '6' },
  { id: 'e4-7', source: '4', target: '7' },
  { id: 'e5-8', source: '5', target: '8' },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e7-8', source: '7', target: '8' },
];

// Compliance assessment data
interface ComplianceItem {
  category: string;
  requirements: {
    title: string;
    description: string;
    complianceLevel: 'Vollständig' | 'Teilweise' | 'In Bearbeitung' | 'Nicht begonnen';
    priority: 'Hoch' | 'Mittel' | 'Niedrig';
  }[];
}

const complianceData: ComplianceItem[] = [
  {
    category: 'Datenschutz & Privacy',
    requirements: [
      {
        title: 'Datenminimierung',
        description: 'Verarbeitung nur der für den Zweck notwendigen Daten.',
        complianceLevel: 'Vollständig',
        priority: 'Hoch'
      },
      {
        title: 'Einwilligung & Transparenz',
        description: 'Klare Informationen und Einwilligung zur KI-Datenverarbeitung.',
        complianceLevel: 'Teilweise',
        priority: 'Hoch'
      },
      {
        title: 'Datensicherheit',
        description: 'Schutz vor unbefugtem Zugriff und Datenverlust.',
        complianceLevel: 'Teilweise',
        priority: 'Hoch'
      }
    ]
  },
  {
    category: 'Ethik & Fairness',
    requirements: [
      {
        title: 'Bias-Reduktion',
        description: 'Erkennung und Minimierung von Verzerrungen in KI-Systemen.',
        complianceLevel: 'In Bearbeitung',
        priority: 'Hoch'
      },
      {
        title: 'Ethische Richtlinien',
        description: 'Dokumentierte ethische Grundsätze für KI-Anwendungen.',
        complianceLevel: 'Vollständig',
        priority: 'Mittel'
      },
      {
        title: 'Diversity & Inclusion',
        description: 'Berücksichtigung verschiedener Nutzergruppen und Perspektiven.',
        complianceLevel: 'In Bearbeitung',
        priority: 'Mittel'
      }
    ]
  },
  {
    category: 'Transparenz & Erklärbarkeit',
    requirements: [
      {
        title: 'Erklärbare KI',
        description: 'Mechanismen zur Erklärung von KI-Entscheidungen.',
        complianceLevel: 'In Bearbeitung',
        priority: 'Hoch'
      },
      {
        title: 'Dokumentation',
        description: 'Vollständige Dokumentation von Modellen und Trainingsdaten.',
        complianceLevel: 'Teilweise',
        priority: 'Mittel'
      },
      {
        title: 'Audit-Trails',
        description: 'Nachverfolgbarkeit von KI-Entscheidungen und -Aktionen.',
        complianceLevel: 'Nicht begonnen',
        priority: 'Niedrig'
      }
    ]
  },
  {
    category: 'Risikomanagement',
    requirements: [
      {
        title: 'Risikoklassifizierung',
        description: 'Einstufung von KI-Systemen nach Risikopotenzial.',
        complianceLevel: 'Vollständig',
        priority: 'Hoch'
      },
      {
        title: 'Kontinuierliche Überwachung',
        description: 'Laufende Überwachung der KI-Systemleistung und -Risiken.',
        complianceLevel: 'In Bearbeitung',
        priority: 'Hoch'
      },
      {
        title: 'Notfallpläne',
        description: 'Maßnahmen bei unvorhergesehenem KI-Verhalten.',
        complianceLevel: 'Nicht begonnen',
        priority: 'Mittel'
      }
    ]
  }
];

// RACI Matrix data for responsibility assignment
interface RaciItem {
  activity: string;
  roles: {
    role: string;
    responsibility: 'R' | 'A' | 'C' | 'I' | '';
  }[];
}

const raciData: RaciItem[] = [
  {
    activity: 'KI-Strategie & Roadmap',
    roles: [
      { role: 'C-Level', responsibility: 'A' },
      { role: 'KI-Governance-Board', responsibility: 'R' },
      { role: 'KI-Entwickler', responsibility: 'C' },
      { role: 'Datenschutzbeauftragter', responsibility: 'C' },
      { role: 'Fachbereich', responsibility: 'C' },
      { role: 'Compliance', responsibility: 'C' },
      { role: 'IT-Sicherheit', responsibility: 'I' }
    ]
  },
  {
    activity: 'Risikoanalyse von KI-Systemen',
    roles: [
      { role: 'C-Level', responsibility: 'I' },
      { role: 'KI-Governance-Board', responsibility: 'A' },
      { role: 'KI-Entwickler', responsibility: 'C' },
      { role: 'Datenschutzbeauftragter', responsibility: 'C' },
      { role: 'Fachbereich', responsibility: 'C' },
      { role: 'Compliance', responsibility: 'R' },
      { role: 'IT-Sicherheit', responsibility: 'R' }
    ]
  },
  {
    activity: 'KI-Entwicklungsstandards',
    roles: [
      { role: 'C-Level', responsibility: '' },
      { role: 'KI-Governance-Board', responsibility: 'A' },
      { role: 'KI-Entwickler', responsibility: 'R' },
      { role: 'Datenschutzbeauftragter', responsibility: 'C' },
      { role: 'Fachbereich', responsibility: 'C' },
      { role: 'Compliance', responsibility: 'C' },
      { role: 'IT-Sicherheit', responsibility: 'C' }
    ]
  },
  {
    activity: 'Datenschutz-Impact-Assessment',
    roles: [
      { role: 'C-Level', responsibility: 'I' },
      { role: 'KI-Governance-Board', responsibility: 'A' },
      { role: 'KI-Entwickler', responsibility: 'C' },
      { role: 'Datenschutzbeauftragter', responsibility: 'R' },
      { role: 'Fachbereich', responsibility: 'C' },
      { role: 'Compliance', responsibility: 'C' },
      { role: 'IT-Sicherheit', responsibility: 'C' }
    ]
  },
  {
    activity: 'KI-Qualitätssicherung & Testing',
    roles: [
      { role: 'C-Level', responsibility: '' },
      { role: 'KI-Governance-Board', responsibility: 'A' },
      { role: 'KI-Entwickler', responsibility: 'R' },
      { role: 'Datenschutzbeauftragter', responsibility: 'I' },
      { role: 'Fachbereich', responsibility: 'C' },
      { role: 'Compliance', responsibility: 'I' },
      { role: 'IT-Sicherheit', responsibility: 'C' }
    ]
  },
  {
    activity: 'Produktiver KI-Betrieb',
    roles: [
      { role: 'C-Level', responsibility: 'I' },
      { role: 'KI-Governance-Board', responsibility: 'A' },
      { role: 'KI-Entwickler', responsibility: 'R' },
      { role: 'Datenschutzbeauftragter', responsibility: 'I' },
      { role: 'Fachbereich', responsibility: 'R' },
      { role: 'Compliance', responsibility: 'I' },
      { role: 'IT-Sicherheit', responsibility: 'C' }
    ]
  },
  {
    activity: 'KI-Incident-Management',
    roles: [
      { role: 'C-Level', responsibility: 'I' },
      { role: 'KI-Governance-Board', responsibility: 'A' },
      { role: 'KI-Entwickler', responsibility: 'R' },
      { role: 'Datenschutzbeauftragter', responsibility: 'C' },
      { role: 'Fachbereich', responsibility: 'C' },
      { role: 'Compliance', responsibility: 'C' },
      { role: 'IT-Sicherheit', responsibility: 'R' }
    ]
  }
];

// Color map for compliance levels with dark mode support
const getComplianceLevelColors = (isDarkMode: boolean) => ({
  'Vollständig': isDarkMode 
    ? 'bg-green-900 border-green-700 text-green-300' 
    : 'bg-green-100 border-green-500 text-green-800',
  'Teilweise': isDarkMode 
    ? 'bg-yellow-900 border-yellow-700 text-yellow-300' 
    : 'bg-yellow-100 border-yellow-500 text-yellow-800',
  'In Bearbeitung': isDarkMode 
    ? 'bg-blue-900 border-blue-700 text-blue-300' 
    : 'bg-blue-100 border-blue-500 text-blue-800',
  'Nicht begonnen': isDarkMode 
    ? 'bg-red-900 border-red-700 text-red-300' 
    : 'bg-red-100 border-red-500 text-red-800'
});

// Color map for priority levels with dark mode support
const getPriorityColors = (isDarkMode: boolean) => ({
  'Hoch': isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white',
  'Mittel': isDarkMode ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-white',
  'Niedrig': isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
});

// Color map for RACI responsibilities
const getRaciColors = (isDarkMode: boolean) => ({
  'R': isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white',
  'A': isDarkMode ? 'bg-amber-600 text-white' : 'bg-amber-500 text-white',
  'C': isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white',
  'I': isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white',
  '': isDarkMode ? 'bg-gray-700 dark:text-gray-400' : 'bg-gray-200'
});

export default function GovernanceChecklist() {
  const [, setActiveTab] = useState("framework");
  const { isDarkMode } = useTheme();

  // Get color maps with current theme
  const complianceLevelColors = getComplianceLevelColors(isDarkMode);
  const priorityColors = getPriorityColors(isDarkMode);
  const raciColors = getRaciColors(isDarkMode);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Tab content
  const tabsContent = [
    {
      id: "framework",
      label: 'Governance-Framework',
      content: (
        <div className="h-[500px] w-full">
          <PText className="mb-4">
            Ein effektives KI-Governance-Framework umfasst verschiedene Komponenten, die zusammen einen 
            umfassenden Rahmen für die verantwortungsvolle und sichere Implementierung von KI-Technologien bilden.
          </PText>
          <div className="h-[400px] border rounded-lg overflow-hidden" style={{ 
            borderColor: 'var(--border-color)',
            backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)' 
          }}>
            <ReactFlow
              nodes={initialNodes}
              edges={initialEdges}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
              <Background color={isDarkMode ? '#4b5563' : '#aaa'} gap={16} />
            </ReactFlow>
          </div>
          <div className="mt-4 text-sm" style={{ color: isDarkMode ? 'rgba(209, 213, 219, 0.8)' : 'rgba(75, 85, 99, 0.8)' }}>
            <p>
              Das Framework zeigt die Hierarchie und Beziehungen zwischen den verschiedenen 
              Governance-Komponenten, vom strategischen KI-Governance-Board bis zur operativen Implementierung.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "compliance",
      label: 'Compliance-Assessment',
      content: (
        <div className="py-4">
          <PText className="mb-4">
            Ein Compliance-Assessment hilft Unternehmen, den aktuellen Stand ihrer KI-Governance 
            zu bewerten und Lücken zu identifizieren. Die folgende Übersicht zeigt typische 
            Anforderungen und deren Erfüllungsgrad.
          </PText>
          
          <div className="space-y-6">
            {complianceData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                <div className="px-4 py-2 font-semibold" style={{ 
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'rgba(243, 244, 246, 0.8)',
                  color: isDarkMode ? 'var(--foreground)' : 'inherit'
                }}>
                  {category.category}
                </div>
                <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                  {category.requirements.map((req, reqIndex) => (
                    <div key={reqIndex} className="p-4">
                      <div className="flex items-start">
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <span className="font-medium mr-2">{req.title}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[req.priority]}`}>
                              {req.priority}
                            </span>
                          </div>
                          <p className="text-sm mb-2" style={{ color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : 'rgba(75, 85, 99, 0.9)' }}>
                            {req.description}
                          </p>
                        </div>
                        <div className={`ml-4 text-sm border px-2 py-1 rounded ${complianceLevelColors[req.complianceLevel]}`}>
                          {req.complianceLevel}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "raci",
      label: 'RACI-Matrix',
      content: (
        <div className="py-4">
          <PText className="mb-4">
            Die RACI-Matrix (Responsible, Accountable, Consulted, Informed) definiert klare Rollen und 
            Verantwortlichkeiten für KI-Governance-Aktivitäten im Unternehmen.
          </PText>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr style={{ backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'rgba(243, 244, 246, 0.8)' }}>
                  <th className="border px-4 py-2 text-left" style={{ borderColor: 'var(--border-color)' }}>Aktivität</th>
                  {raciData[0].roles.map((role, roleIndex) => (
                    <th key={roleIndex} className="border px-4 py-2 text-center whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>
                      {role.role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {raciData.map((item, itemIndex) => (
                  <tr key={itemIndex} style={{ 
                    backgroundColor: isDarkMode 
                      ? (itemIndex % 2 === 0 ? 'var(--card-bg)' : 'rgba(31, 41, 55, 0.3)')
                      : (itemIndex % 2 === 0 ? 'white' : 'rgba(243, 244, 246, 0.5)')
                  }}>
                    <td className="border px-4 py-2 font-medium" style={{ borderColor: 'var(--border-color)' }}>{item.activity}</td>
                    {item.roles.map((role, roleIndex) => (
                      <td key={roleIndex} className="border px-4 py-2 text-center" style={{ borderColor: 'var(--border-color)' }}>
                        {role.responsibility ? (
                          <span className={`inline-block w-6 h-6 rounded-full ${raciColors[role.responsibility]} flex items-center justify-center text-xs font-bold`}>
                            {role.responsibility}
                          </span>
                        ) : (
                          <span className={`inline-block w-6 h-6 rounded-full ${raciColors['']}`}></span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="flex items-center text-sm">
              <span className={`inline-block w-5 h-5 mr-2 rounded-full ${raciColors['R']}`}></span>
              <span>R: Responsible (Durchführung)</span>
            </div>
            <div className="flex items-center text-sm">
              <span className={`inline-block w-5 h-5 mr-2 rounded-full ${raciColors['A']}`}></span>
              <span>A: Accountable (Verantwortlich)</span>
            </div>
            <div className="flex items-center text-sm">
              <span className={`inline-block w-5 h-5 mr-2 rounded-full ${raciColors['C']}`}></span>
              <span>C: Consulted (Konsultiert)</span>
            </div>
            <div className="flex items-center text-sm">
              <span className={`inline-block w-5 h-5 mr-2 rounded-full ${raciColors['I']}`}></span>
              <span>I: Informed (Informiert)</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full">
      <Tabs
        tabs={tabsContent}
        defaultTabId="framework"
        onChange={handleTabChange}
      />
    </div>
  );
} 