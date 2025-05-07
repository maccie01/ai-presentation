'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import InfoCard from '@/components/ui/InfoCard';
import Tabs from '@/components/ui/Tabs';
import { useTheme } from '@/lib/themeContext';

// Type for governance framework node data
type GovernanceNodeData = {
  label: string;
  description?: string;
  color: string;
};

// Custom node component
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
      description: 'Übergreifende Steuerung & Aufsicht',
      color: 'bg-blue-600',
    },
  },
  {
    id: '2',
    type: 'governanceNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Fairness & Nicht-Diskriminierung',
      description: 'Vermeidung von Verzerrungen & Bias',
      color: 'bg-purple-600',
    },
  },
  {
    id: '3',
    type: 'governanceNode',
    position: { x: 400, y: 100 },
    data: {
      label: 'Transparenz & Erklärbarkeit',
      description: 'Verständliche KI-Entscheidungen',
      color: 'bg-indigo-600',
    },
  },
  {
    id: '4',
    type: 'governanceNode',
    position: { x: 100, y: 200 },
    data: {
      label: 'Datenschutz & Daten-Governance',
      description: 'Schutz persönlicher Daten',
      color: 'bg-teal-600',
    },
  },
  {
    id: '5',
    type: 'governanceNode',
    position: { x: 250, y: 200 },
    data: {
      label: 'Verantwortlichkeit',
      description: 'Klare Verantwortungszuordnung',
      color: 'bg-green-600',
    },
  },
  {
    id: '6',
    type: 'governanceNode',
    position: { x: 400, y: 200 },
    data: {
      label: 'Sicherheit & Robustheit',
      description: 'Schutz vor Angriffen & Fehlern',
      color: 'bg-amber-600',
    },
  },
  {
    id: '7',
    type: 'governanceNode',
    position: { x: 250, y: 300 },
    data: {
      label: 'Menschliche Aufsicht & Kontrolle',
      description: 'Sinnvolle menschliche Eingriffsmöglichkeiten',
      color: 'bg-red-600',
    },
  },
  {
    id: '8',
    type: 'governanceNode',
    position: { x: 250, y: 400 },
    data: {
      label: 'Regulatorische Compliance',
      description: 'Einhaltung von Gesetzen & Standards',
      color: 'bg-gray-600',
    },
  },
];

// Edges for the governance framework
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e3-6', source: '3', target: '6' },
  { id: 'e4-7', source: '4', target: '7' },
  { id: 'e5-7', source: '5', target: '7' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e7-8', source: '7', target: '8' },
];

// Implementation step items
interface ImplementationStep {
  id: string;
  title: string;
  description: string;
  pillars: string[];
  keyTasks: string[];
  source?: string;
}

const implementationSteps: ImplementationStep[] = [
  {
    id: 'ethics-committee',
    title: 'KI-Ethikkomitee einrichten',
    description: 'Eine funktionsübergreifende Gruppe, die KI-Initiativen überwacht, ethische Richtlinien entwickelt und hochriskante Anwendungen überprüft.',
    pillars: ['Verantwortlichkeit', 'Fairness', 'Transparenz'],
    keyTasks: [
      'Identifizierung relevanter Stakeholder aus verschiedenen Abteilungen',
      'Definition klarer Rollen und Verantwortlichkeiten',
      'Entwicklung eines Überprüfungsprozesses für KI-Initiativen',
      'Regelmäßige Treffen zur Evaluierung und Anpassung von Richtlinien'
    ],
    source: 'Consilien, FullStack'
  },
  {
    id: 'ai-code',
    title: 'KI-Verhaltenskodex entwickeln',
    description: 'Interne Richtlinien, die mit Unternehmenswerten und globalen ethischen Prinzipien/Vorschriften übereinstimmen.',
    pillars: ['Fairness', 'Verantwortlichkeit', 'Menschliche Kontrolle'],
    keyTasks: [
      'Formulierung klarer ethischer Prinzipien für KI-Nutzung',
      'Alignment mit Unternehmenskultur und -werten',
      'Integration bestehender Ethik- und Compliance-Richtlinien',
      'Regelmäßige Überprüfung und Aktualisierung'
    ],
    source: 'Consilien'
  },
  {
    id: 'risk-assessment',
    title: 'KI-Risikobewertungen durchführen',
    description: 'Identifizierung und Bewertung potenzieller Risiken (Bias, Sicherheit, Compliance) für jede KI-Anwendung, insbesondere für hochriskante.',
    pillars: ['Fairness', 'Sicherheit', 'Datenschutz'],
    keyTasks: [
      'Risikobewertung nach Anwendungsfall kategorisieren',
      'Entwicklung einer Risikomatrix für verschiedene KI-Anwendungen',
      'Durchführung von Bias-Audits für trainierte Modelle',
      'Aufbau eines kontinuierlichen Risikomanagementprozesses'
    ],
    source: 'Consilien'
  },
  {
    id: 'monitoring',
    title: 'KI-Überwachung & Auditing implementieren',
    description: 'Regelmäßige Überwachung der KI-Systemleistung, Entscheidungsfindung und Compliance. Durchführung interner Audits zur Erkennung von Verstößen oder Verzerrungen.',
    pillars: ['Verantwortlichkeit', 'Transparenz', 'Sicherheit'],
    keyTasks: [
      'Implementierung von Monitoring-Tools für KI-Systeme',
      'Definition von KPIs für ethische KI-Performance',
      'Erstellung von Berichtsstrukturen und Eskalationspfaden',
      'Regelmäßige unabhängige Audits durchführen'
    ],
    source: 'Consilien'
  },
  {
    id: 'training',
    title: 'In Schulung investieren',
    description: 'Entwickler, Data Scientists, IT-Mitarbeiter und Geschäftsanwender zu verantwortungsvoller KI-Nutzung, ethischen Überlegungen und Compliance-Anforderungen schulen.',
    pillars: ['Verantwortlichkeit', 'Menschliche Kontrolle', 'Transparenz'],
    keyTasks: [
      'Entwicklung rollenspezifischer Schulungsprogramme',
      'Integration von KI-Ethik in bestehende Trainings',
      'Aufbau von Bewusstsein für ethische Herausforderungen',
      'Förderung einer verantwortungsbewussten KI-Kultur'
    ],
    source: 'Consilien, FullStack'
  },
  {
    id: 'data-governance',
    title: 'Daten-Governance priorisieren',
    description: 'Sicherstellung hochwertiger, repräsentativer Daten für das Training von Modellen und Implementierung starker Datensicherheitspraktiken.',
    pillars: ['Datenschutz', 'Fairness', 'Sicherheit'],
    keyTasks: [
      'Entwicklung von Datenqualitätsstandards für KI-Training',
      'Implementierung von Datenschutzmaßnahmen (z.B. Federated Learning)',
      'Schaffung klarer Datenverantwortlichkeiten',
      'Etablierung von Prozessen zur regelmäßigen Datenüberprüfung'
    ],
  },
  {
    id: 'risk-based',
    title: 'Risikobasierten Ansatz verfolgen',
    description: 'Governance-Bemühungen auf die spezifischen Risiken verschiedener KI-Anwendungen zuschneiden (z.B. ein Kundenservice-Chatbot hat möglicherweise andere Governance-Anforderungen als ein KI-System für medizinische Diagnosen).',
    pillars: ['Verantwortlichkeit', 'Menschliche Kontrolle', 'Transparenz'],
    keyTasks: [
      'Kategorisierung von KI-Systemen nach Risikostufen',
      'Anpassung der Governance-Anforderungen je nach Risikokategorie',
      'Priorisierung von Ressourcen basierend auf Risikobewertung',
      'Stärkere Kontrollen für Hochrisiko-KI-Anwendungen'
    ],
  },
  {
    id: 'responsibility-culture',
    title: 'Verantwortungskultur fördern',
    description: 'Offene Diskussion über KI-Ethik fördern und Mitarbeiter ermutigen, Bedenken zu äußern.',
    pillars: ['Verantwortlichkeit', 'Transparenz', 'Menschliche Kontrolle'],
    keyTasks: [
      'Aufbau von Kommunikationskanälen für ethische Bedenken',
      'Anerkennung und Belohnung ethisch bewusster Entscheidungen',
      'Etablierung eines "Speak-Up"-Ansatzes für KI-bezogene Bedenken',
      'Integration ethischer Überlegungen in Entscheidungsprozesse'
    ],
  }
];

const EthicsGovernanceFramework: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('framework');
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  // Toggle step expansion
  const toggleStep = (stepId: string) => {
    if (activeStep === stepId) {
      setActiveStep(null);
    } else {
      setActiveStep(stepId);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <PHeading tag="h3" size="medium" className="mb-2">
          KI-Ethik & Governance-Framework
        </PHeading>
        <PText className="mb-6">
          Mit zunehmender Leistungsfähigkeit und Verbreitung von KI wird die Etablierung robuster Ethik- und Governance-Frameworks 
          immer wichtiger, insbesondere für IT-Abteilungen, die deren Implementierung und Management überwachen.
        </PText>
      </div>

      <Tabs
        tabs={[
          {
            id: 'framework',
            label: 'Governance-Framework',
            content: (
              <div className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <PHeading tag="h4" size="small" className="mb-2">
                        Schlüsselsäulen der KI-Governance
                      </PHeading>
                      <PText className="text-sm mb-4">
                        Ein effektives KI-Governance-Framework beruht auf mehreren Kernprinzipien, die sicherstellen, 
                        dass KI-Systeme ethisch, sicher und im Einklang mit gesellschaftlichen Werten und 
                        regulatorischen Anforderungen eingesetzt werden.
                      </PText>
                    </div>
                    
                    <div className="space-y-3">
                      <InfoCard
                        title="Fairness & Nicht-Diskriminierung"
                        variant="info"
                      >
                        <PText className="text-sm">
                          Sicherstellung, dass KI-Systeme keine in den Daten vorhandenen Verzerrungen fortführen oder verstärken 
                          (z.B. bei Einstellungen, Kreditanträgen, Strafverfolgung). Erfordert sorgfältige Datenkuration, Modelldesign und kontinuierliche Bias-Audits.
                        </PText>
                      </InfoCard>
                      
                      <InfoCard
                        title="Transparenz & Erklärbarkeit (XAI)"
                        variant="info"
                      >
                        <PText className="text-sm">
                          Verstehen, wie KI-Modelle zu ihren Entscheidungen gelangen, insbesondere bei kritischen Anwendungen. 
                          Bei komplexen Modellen wie Deep Neural Networks kann dies eine Herausforderung sein. Klare Erklärungen der 
                          KI-Systemfähigkeiten und -limitierungen für Nutzer und Stakeholder bereitstellen.
                        </PText>
                      </InfoCard>
                      
                      <InfoCard
                        title="Verantwortlichkeit"
                        variant="info"
                      >
                        <PText className="text-sm">
                          Definition klarer Verantwortungslinien für die Ergebnisse von KI-Systemen.
                          Etablierung von Mechanismen zur Wiedergutmachung, wenn KI-Systeme Schaden anrichten oder Fehler machen.
                        </PText>
                      </InfoCard>
                      
                      <InfoCard
                        title="Datenschutz & Daten-Governance"
                        variant="info"
                      >
                        <PText className="text-sm">
                          Sicherstellung, dass KI-Systeme personenbezogene Daten in Übereinstimmung mit Vorschriften (z.B. DSGVO) verarbeiten.
                          Implementierung robuster Datensicherheitsmaßnahmen zum Schutz sensibler Informationen. Techniken wie Federated Learning oder Differential Privacy können dabei helfen, Daten zu schützen.
                        </PText>
                      </InfoCard>
                    </div>
                  </div>
                  
                  <div 
                    style={{ 
                      height: 600,
                      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)' 
                    }} 
                    className="border rounded-lg"
                  >
                    <ReactFlow
                      nodes={initialNodes}
                      edges={initialEdges}
                      nodeTypes={nodeTypes}
                      fitView
                    >
                      <Controls />
                      <Background />
                    </ReactFlow>
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: 'implementation',
            label: 'Implementierungsschritte',
            content: (
              <div className="pt-6">
                <div className="mb-4">
                  <PHeading tag="h4" size="small" className="mb-2">
                    Praktische Schritte für IT-Management
                  </PHeading>
                  <PText className="text-sm mb-6">
                    Die Implementierung eines KI-Governance-Frameworks erfordert einen strukturierten Ansatz. 
                    Die folgenden Schritte bieten eine praktische Anleitung für IT-Manager zur Entwicklung und 
                    Umsetzung einer robusten KI-Governance-Strategie.
                  </PText>
                </div>
                
                <div className="space-y-4">
                  {implementationSteps.map((step) => (
                    <motion.div
                      key={step.id}
                      layout
                      onClick={() => toggleStep(step.id)}
                      className={`p-4 rounded-lg cursor-pointer border transition-all duration-300 ${activeStep === step.id ? 'shadow-md' : 'shadow-sm'}`}
                      style={{ 
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--border-color)',
                        borderWidth: activeStep === step.id ? '2px' : '1px'
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <PHeading tag="h4" size="small">{step.title}</PHeading>
                        <div className="flex space-x-1">
                          {step.pillars.slice(0, 2).map((pillar, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 text-xs rounded-full"
                              style={{ 
                                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)',
                                color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : 'rgba(75, 85, 99, 0.9)'
                              }}
                            >
                              {pillar}
                            </span>
                          ))}
                          {step.pillars.length > 2 && (
                            <span 
                              className="px-2 py-1 text-xs rounded-full"
                              style={{ 
                                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)',
                                color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : 'rgba(75, 85, 99, 0.9)'
                              }}
                            >
                              +{step.pillars.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <PText className="text-sm my-2">
                        {step.description}
                      </PText>
                      
                      {step.source && (
                        <div className="text-xs mb-2" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
                          Quelle: {step.source}
                        </div>
                      )}
                      
                      {activeStep === step.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 border-t pt-4"
                          style={{ borderColor: 'var(--border-color)' }}
                        >
                          <div className="text-sm font-medium mb-2">Kernaufgaben:</div>
                          <ul className="list-disc pl-5 space-y-2 text-sm">
                            {step.keyTasks.map((task, index) => (
                              <li key={index}>{task}</li>
                            ))}
                          </ul>
                          
                          {step.pillars.length > 0 && (
                            <div className="mt-4">
                              <div className="text-sm font-medium mb-2">Unterstützte Governance-Säulen:</div>
                              <div className="flex flex-wrap gap-2">
                                {step.pillars.map((pillar, index) => (
                                  <span 
                                    key={index}
                                    className="px-2 py-1 text-xs rounded-full"
                                    style={{ 
                                      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)',
                                      color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : 'rgba(75, 85, 99, 0.9)'
                                    }}
                                  >
                                    {pillar}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            id: 'principles',
            label: 'Verantwortungsvolle KI-Prinzipien',
            content: (
              <div className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InfoCard
                      title="Menschliche Aufsicht & Kontrolle"
                      variant="info"
                    >
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Aufrechterhaltung sinnvoller menschlicher Kontrolle über KI-Systeme, insbesondere solche mit erheblichen Auswirkungen.</li>
                        <li>Gestaltung von Systemen, bei denen Menschen eingreifen, überstimmen oder KI bei Bedarf abschalten können.</li>
                        <li>Definition klarer Eskalationspfade für problematische KI-Entscheidungen.</li>
                        <li>Balance zwischen Automatisierung und menschlichem Urteilsvermögen finden.</li>
                      </ul>
                    </InfoCard>
                    
                    <InfoCard
                      title="Sicherheit & Robustheit"
                      variant="info"
                      className="mt-4"
                    >
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Schutz von KI-Systemen vor gegnerischen Angriffen (z.B. Datenvergiftung, Modellevasion).</li>
                        <li>Sicherstellung, dass Modelle zuverlässig sind und unter verschiedenen Bedingungen konsistent funktionieren.</li>
                        <li>Implementierung von Überwachungsmechanismen zur Erkennung von ungewöhnlichem Verhalten.</li>
                        <li>Regelmäßige Sicherheitsaudits und Penetrationstests für kritische KI-Systeme.</li>
                      </ul>
                    </InfoCard>
                  </div>
                  
                  <div>
                    <InfoCard
                      title="Compliance mit Vorschriften"
                      variant="info"
                    >
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Auf dem Laufenden bleiben und Einhaltung sich entwickelnder KI-Gesetze und -Standards (z.B. EU AI Act, NIST AI Risk Management Framework).</li>
                        <li>Entwicklung eines Mechanismus zur kontinuierlichen Überwachung regulatorischer Änderungen.</li>
                        <li>Dokumentation von Compliance-Maßnahmen und deren Wirksamkeit.</li>
                        <li>Proaktive Zusammenarbeit mit Aufsichtsbehörden und Branchengruppen bei der Entwicklung von Standards.</li>
                      </ul>
                    </InfoCard>
                    
                    <div className="mt-4 p-4 rounded-lg" style={{ 
                      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)'
                    }}>
                      <PHeading tag="h4" size="small" className="mb-2">
                        Kontinuierlicher Governance-Zyklus
                      </PHeading>
                      <PText className="text-sm mb-4">
                        KI-Governance ist kein einmaliges Projekt, sondern ein kontinuierlicher Prozess, der regelmäßige 
                        Überprüfung und Anpassung erfordert. Dieser Zyklus umfasst:
                      </PText>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li><strong>Risikobewertung:</strong> Identifizierung potenzieller ethischer und operativer Risiken</li>
                        <li><strong>Richtlinienentwicklung:</strong> Gestaltung angemessener Kontrollen und Richtlinien</li>
                        <li><strong>Implementierung:</strong> Umsetzung der Governance-Maßnahmen</li>
                        <li><strong>Überwachung:</strong> Kontinuierliche Beobachtung der KI-Systeme</li>
                        <li><strong>Audit & Bewertung:</strong> Regelmäßige Überprüfung der Wirksamkeit</li>
                        <li><strong>Verbesserung:</strong> Anpassung basierend auf Erkenntnissen und neuen Anforderungen</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg border" style={{ 
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)'
                }}>
                  <PHeading tag="h4" size="small" className="mb-2">
                    Besondere Bedeutung für IT-Management
                  </PHeading>
                  <PText className="text-sm">
                    Proaktive KI-Governance ist entscheidend, um Risiken (Verzerrungen, Fehler, Sicherheitsverletzungen, regulatorische Nichteinhaltung) 
                    zu minimieren und Vertrauen aufzubauen. Dies umfasst ethische Überlegungen, Datenschutz und Transparenz.
                    IT-Management spielt eine zentrale Rolle bei der Etablierung und Durchsetzung dieser Frameworks in Zusammenarbeit mit anderen 
                    Geschäftsbereichen.
                  </PText>
                  <div className="text-xs mt-2 text-right" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
                    Quelle: Forrester, Atera, Consilien
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        defaultTabId="framework"
        onChange={(tabId) => setActiveTab(tabId)}
      />
      
      <div className="mt-8 text-xs text-right" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
        Stand: 6. Mai 2025
      </div>
    </div>
  );
};

export default EthicsGovernanceFramework; 