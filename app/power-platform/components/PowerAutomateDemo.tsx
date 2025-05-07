"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlowStep {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  title: string;
  description: string;
  icon: string;
  selected?: boolean;
  expanded?: boolean;
  actions?: {
    id: string;
    title: string;
    description: string;
  }[];
}

export function PowerAutomateDemo() {
  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([
    {
      id: 'trigger',
      type: 'trigger',
      title: 'Wenn ein neues Dokument erstellt wird',
      description: 'Dieser Auslöser wird aktiviert, wenn ein neues Dokument in einer SharePoint-Dokumentbibliothek erstellt wird.',
      icon: '📄',
      expanded: true,
    },
    {
      id: 'condition',
      type: 'condition',
      title: 'Dokument-Typ prüfen',
      description: 'Prüft, ob das Dokument eine Vertragsvorlage ist und eine Genehmigung erfordert.',
      icon: '🔍',
      expanded: false,
    },
    {
      id: 'action1',
      type: 'action',
      title: 'Genehmigungsanfrage senden',
      description: 'Sendet eine Genehmigungsanfrage an den Abteilungsleiter mit Dokumentdetails.',
      icon: '✉️',
      expanded: false,
    },
    {
      id: 'action2',
      type: 'action',
      title: 'Warten auf Genehmigungsreaktion',
      description: 'Wartet auf die Antwort des Genehmigenden (Genehmigt/Abgelehnt).',
      icon: '⏱️',
      expanded: false,
    },
    {
      id: 'condition2',
      type: 'condition',
      title: 'Genehmigungsergebnis prüfen',
      description: 'Prüft, ob die Genehmigung erteilt oder verweigert wurde.',
      icon: '🔍',
      expanded: false,
    },
    {
      id: 'action3',
      type: 'action',
      title: 'Dokument als "Genehmigt" markieren',
      description: 'Aktualisiert den Dokumentstatus und benachrichtigt den Ersteller.',
      icon: '✅',
      expanded: false,
      actions: [
        {
          id: 'sub1',
          title: 'Dokumentmetadaten aktualisieren',
          description: 'Setzt den Status des Dokuments auf "Genehmigt"',
        },
        {
          id: 'sub2',
          title: 'E-Mail an Ersteller senden',
          description: 'Benachrichtigt den Dokumentersteller über die Genehmigung',
        }
      ]
    },
    {
      id: 'action4',
      type: 'action',
      title: 'Feedback an Ersteller senden',
      description: 'Sendet das Ablehnungs-Feedback und den Grund an den Dokumentersteller.',
      icon: '❌',
      expanded: false,
    }
  ]);
  
  const [selectedStep, setSelectedStep] = useState<string | null>('trigger');
  const [flowPanel, setFlowPanel] = useState<'designer' | 'settings'>('designer');
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  
  const toggleExpand = (id: string) => {
    setFlowSteps(flowSteps.map(step => 
      step.id === id ? { ...step, expanded: !step.expanded } : step
    ));
  };
  
  const selectStep = (id: string) => {
    setSelectedStep(id);
    setFlowPanel('settings');
  };
  
  const renderFlowStep = (step: FlowStep) => {
    const isSelected = selectedStep === step.id;
    
    return (
      <motion.div 
        key={step.id}
        className={`flow-step mb-2 rounded-md border ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className={`p-3 cursor-pointer flex items-center justify-between ${step.type === 'trigger' ? 'bg-purple-50' : step.type === 'condition' ? 'bg-yellow-50' : 'bg-green-50'}`}
          onClick={() => toggleExpand(step.id)}
        >
          <div className="flex items-center">
            <span className="text-xl mr-3">{step.icon}</span>
            <div>
              <h4 className="font-medium text-sm">{step.title}</h4>
              <p className="text-xs text-gray-500 truncate max-w-md">{step.description}</p>
            </div>
          </div>
          <div className="flex items-center">
            <button 
              className="mr-2 p-1 hover:bg-gray-100 rounded-full"
              onClick={(e) => { e.stopPropagation(); selectStep(step.id); }}
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <svg className={`w-5 h-5 text-gray-400 transition-transform ${step.expanded ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {step.expanded && step.actions && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <h5 className="text-xs font-medium text-gray-500 mb-2">Aktionen</h5>
            <div className="space-y-2">
              {step.actions.map(action => (
                <div key={action.id} className="bg-white p-2 rounded border border-gray-200 text-sm">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-gray-500">{action.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };
  
  const renderSettingsPanel = () => {
    const step = flowSteps.find(s => s.id === selectedStep);
    if (!step) return null;
    
    return (
      <div className="p-4">
        <h3 className="font-bold text-lg mb-3">{step.title}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={step.title}
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
              value={step.description}
              readOnly
            />
          </div>
          
          {step.type === 'trigger' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SharePoint-Standort</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value="https://contoso.sharepoint.com/sites/dokumente"
                readOnly
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Bibliothek</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value="Vertragsunterlagen"
                readOnly
              />
            </div>
          )}
          
          {step.type === 'condition' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedingung</label>
              <div className="flex items-center space-x-2 mb-2">
                <select className="p-2 border border-gray-300 rounded-md text-sm">
                  <option>Dokumenttyp</option>
                  <option>Ersteller</option>
                  <option>Dateigröße</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-md text-sm">
                  <option>ist gleich</option>
                  <option>enthält</option>
                  <option>beginnt mit</option>
                </select>
                <input 
                  type="text" 
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                  value="Vertrag"
                  readOnly
                />
              </div>
              <button className="text-blue-600 text-sm hover:underline flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Bedingung hinzufügen
              </button>
            </div>
          )}
          
          {step.type === 'action' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aktion konfigurieren</label>
              {step.id === 'action1' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Genehmiger</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value="Abteilungsleiter"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Nachricht</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={2}
                      value="Bitte überprüfen Sie das angehängte Dokument und genehmigen Sie es, wenn es Ihren Anforderungen entspricht."
                      readOnly
                    />
                  </div>
                </div>
              )}
              
              {step.id === 'action2' && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Diese Aktion wartet auf die Antwort der Genehmigungsanfrage.</p>
                  <div className="bg-yellow-50 p-2 rounded border border-yellow-200 text-sm">
                    Timeout einstellen: <span className="font-medium">7 Tage</span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-200">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              onClick={() => setFlowPanel('designer')}
            >
              Einstellungen speichern
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const runFlowTest = () => {
    setTestStatus('running');
    setTimeout(() => {
      setTestStatus('success');
    }, 3000);
  };
  
  return (
    <div className="power-automate-demo border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-[#0066FF] text-white p-2 flex items-center">
        <div className="mr-2 bg-white text-[#0066FF] rounded-full h-6 w-6 flex items-center justify-center font-bold">P</div>
        <span className="font-medium">Power Automate - Dokumentengenehmigungsworkflow</span>
        <div className="ml-auto flex space-x-2">
          <button 
            className={`px-3 py-1 rounded-sm text-sm flex items-center ${testStatus === 'idle' || testStatus === 'success' ? 'bg-white text-[#0066FF] hover:bg-blue-50' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            onClick={testStatus !== 'running' ? runFlowTest : undefined}
            disabled={testStatus === 'running'}
          >
            {testStatus === 'running' && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {testStatus === 'success' && (
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {testStatus === 'running' ? 'Wird ausgeführt...' : testStatus === 'success' ? 'Erfolgreich getestet' : 'Flow testen'}
          </button>
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-sm text-sm">Speichern</button>
        </div>
      </div>
      
      <div className="flex h-[550px]">
        {/* Left Sidebar - Flow Steps */}
        <div className="w-2/3 border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-medium text-sm">Flow-Designer</h3>
            <div className="space-x-2">
              <button className="text-blue-600 text-sm hover:underline flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Schritt hinzufügen
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1 mb-4">
              {flowSteps.map(renderFlowStep)}
            </div>
            
            <div className="mt-6 text-center">
              <button className="px-4 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50 flex items-center mx-auto">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Schritt hinzufügen
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar - Settings */}
        <div className="w-1/3 bg-gray-50">
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <div className="flex space-x-1">
              <button 
                className={`py-1 px-3 text-sm rounded ${flowPanel === 'designer' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                onClick={() => setFlowPanel('designer')}
              >
                Flow-Übersicht
              </button>
              <button 
                className={`py-1 px-3 text-sm rounded ${flowPanel === 'settings' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                onClick={() => setFlowPanel('settings')}
              >
                Einstellungen
              </button>
            </div>
          </div>
          
          <div className="overflow-y-auto h-[500px]">
            {flowPanel === 'designer' ? (
              <div className="p-4">
                <h3 className="font-bold text-lg mb-3">Dokumentengenehmigungsworkflow</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Dieser Flow automatisiert den Prozess der Dokumentüberprüfung und -genehmigung. Er wird ausgelöst, wenn ein neues Dokument in der SharePoint-Bibliothek erstellt wird.
                </p>
                
                <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-4">
                  <h4 className="font-medium text-sm text-blue-800 mb-1">Flow-Übersicht</h4>
                  <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                    <li>Auslöser: Neues Dokument in SharePoint</li>
                    <li>Prüfung des Dokumenttyps</li>
                    <li>Genehmigungsanfrage an Abteilungsleiter</li>
                    <li>Verarbeitung der Genehmigungsantwort</li>
                    <li>Benachrichtigung des Dokumenterstellers</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Flow-Ausführungsprotokoll</h4>
                    <div className="bg-white border border-gray-200 rounded-md p-2 text-xs">
                      <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                        <span className="font-medium">Letzte Ausführungen</span>
                        <span className="text-gray-500">Status</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>21.06.2023 14:32</span>
                          <span className="text-green-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Erfolgreich
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>15.06.2023 10:17</span>
                          <span className="text-green-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Erfolgreich
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>08.06.2023 09:45</span>
                          <span className="text-red-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Fehlgeschlagen
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Verbundene Lösungen</h4>
                    <div className="bg-white border border-gray-200 rounded-md p-2 text-xs">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">🗃️</span>
                        <div>
                          <div className="font-medium">Dokumentenverwaltung</div>
                          <div className="text-gray-500">Version 1.2</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              renderSettingsPanel()
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 