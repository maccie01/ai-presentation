"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/themeContext';

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
  const { isDarkMode } = useTheme();
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
  
  const styles = {
    container: {
      backgroundColor: isDarkMode ? 'var(--card-bg)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      color: isDarkMode ? 'var(--foreground)' : 'inherit',
    },
    panel: {
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
    },
    flowStep: {
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      color: isDarkMode ? 'var(--foreground)' : 'inherit',
    },
    selected: {
      borderColor: isDarkMode ? '#3b82f6' : '#3b82f6',
      backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 246, 255, 0.8)',
    },
    stepHeader: {
      trigger: {
        backgroundColor: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : 'rgba(237, 233, 254, 0.8)',
      },
      condition: {
        backgroundColor: isDarkMode ? 'rgba(234, 179, 8, 0.2)' : 'rgba(254, 249, 195, 0.8)',
      },
      action: {
        backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(220, 252, 231, 0.8)',
      },
    },
    actionsPanel: {
      backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(249, 250, 251, 0.8)',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
    },
    actionItem: {
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
    },
    button: {
      hover: {
        backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.8)' : 'rgba(243, 244, 246, 0.8)',
      },
      primary: {
        backgroundColor: isDarkMode ? '#2563eb' : '#3b82f6',
        color: 'white',
      },
      standard: {
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
        color: isDarkMode ? 'var(--foreground)' : 'inherit',
      }
    },
    testBar: {
      success: {
        backgroundColor: isDarkMode ? 'rgba(22, 163, 74, 0.2)' : 'rgba(220, 252, 231, 0.8)',
        color: isDarkMode ? '#4ade80' : '#16a34a',
      },
      error: {
        backgroundColor: isDarkMode ? 'rgba(220, 38, 38, 0.2)' : 'rgba(254, 226, 226, 0.8)',
        color: isDarkMode ? '#f87171' : '#dc2626',
      },
      running: {
        backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(219, 234, 254, 0.8)',
        color: isDarkMode ? '#60a5fa' : '#3b82f6',
      },
    },
    input: {
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      color: isDarkMode ? 'var(--foreground)' : 'inherit',
    },
    text: {
      muted: {
        color: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : '#6b7280',
      },
    },
  };
  
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
    
    // Determine step header style based on type
    const headerStyle = step.type === 'trigger' 
      ? styles.stepHeader.trigger 
      : step.type === 'condition' 
        ? styles.stepHeader.condition 
        : styles.stepHeader.action;
    
    return (
      <motion.div 
        key={step.id}
        className="flow-step mb-2 rounded-md border overflow-hidden"
        style={{
          ...(isSelected ? styles.selected : styles.flowStep)
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="p-3 cursor-pointer flex items-center justify-between"
          style={headerStyle}
          onClick={() => toggleExpand(step.id)}
        >
          <div className="flex items-center">
            <span className="text-xl mr-3">{step.icon}</span>
            <div>
              <h4 className="font-medium text-sm">{step.title}</h4>
              <p className="text-xs truncate max-w-md" style={styles.text.muted}>{step.description}</p>
            </div>
          </div>
          <div className="flex items-center">
            <button 
              className="mr-2 p-1 rounded-full"
              style={{
                color: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : '#6b7280',
              }}
              onClick={(e) => { e.stopPropagation(); selectStep(step.id); }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <svg className={`w-5 h-5 transition-transform ${step.expanded ? 'transform rotate-180' : ''}`} 
              style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : '#9ca3af' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {step.expanded && step.actions && (
          <div className="p-3 border-t" style={styles.actionsPanel}>
            <h5 className="text-xs font-medium mb-2" style={styles.text.muted}>Aktionen</h5>
            <div className="space-y-2">
              {step.actions.map(action => (
                <div key={action.id} className="p-2 rounded border" style={styles.actionItem}>
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs" style={styles.text.muted}>{action.description}</div>
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
            <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>Name</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              style={styles.input}
              value={step.title}
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>Beschreibung</label>
            <textarea 
              className="w-full p-2 border rounded-md"
              style={styles.input}
              rows={3}
              value={step.description}
              readOnly
            />
          </div>
          
          {step.type === 'trigger' && (
            <div>
              <label className="block text-sm font-medium mb-1 mt-3" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>SharePoint-Standort</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                style={styles.input}
                value="https://contoso.sharepoint.com/sites/dokumente"
                readOnly
              />
              <label className="block text-sm font-medium mb-1 mt-3" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>Bibliothek</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                style={styles.input}
                value="Vertragsdokumente"
                readOnly
              />
            </div>
          )}
          
          {step.type === 'condition' && (
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>Bedingung</label>
              <div className="border rounded-md p-2 text-xs" style={styles.input}>
                @equals(triggerOutputs()?['body/ContentType'], 'Vertrag')
              </div>
              <div className="flex mt-4">
                <div className="flex-1 mr-2">
                  <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>Wenn ja</label>
                  <div className="border rounded-md p-2 text-xs" style={styles.input}>
                    Genehmigungsanfrage senden
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>Wenn nein</label>
                  <div className="border rounded-md p-2 text-xs" style={styles.input}>
                    Prozess beenden
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const runFlowTest = () => {
    setTestStatus('running');
    setTimeout(() => {
      setTestStatus('success');
    }, 2000);
  };
  
  return (
    <div className="power-automate-demo border rounded-lg overflow-hidden" style={styles.container}>
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: styles.container.borderColor }}>
        <div className="flex items-center">
          <span className="text-blue-600 font-medium">Power Automate</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm" style={styles.text.muted}>Dokumentengenehmigungsworkflow</span>
        </div>
        <div className="flow-test-buttons flex items-center">
          {testStatus === 'idle' && (
            <button 
              className="px-3 py-1 rounded-sm text-sm" 
              style={styles.button.primary}
              onClick={runFlowTest}
            >
              Flow testen
            </button>
          )}
          {testStatus === 'running' && (
            <div className="flex items-center p-1 rounded" style={styles.testBar.running}>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-medium">Flow wird ausgeführt...</span>
            </div>
          )}
          {testStatus === 'success' && (
            <div className="flex items-center p-1 rounded" style={styles.testBar.success}>
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-medium">Flow erfolgreich ausgeführt</span>
            </div>
          )}
          {testStatus === 'error' && (
            <div className="flex items-center p-1 rounded" style={styles.testBar.error}>
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-xs font-medium">Fehler bei der Ausführung</span>
            </div>
          )}
          <button 
            style={{
              backgroundColor: styles.button.standard?.backgroundColor,
              color: styles.button.standard?.color,
            }}
            className="ml-2 hover:bg-white/30 px-3 py-1 rounded-sm text-sm"
          >
            Speichern
          </button>
        </div>
      </div>
      
      <div className="flex h-[500px]">
        <div className="flow-designer w-2/3 p-4 border-r overflow-y-auto" style={{ borderColor: styles.container.borderColor }}>
          <div className="flow-steps">
            {flowSteps.map(renderFlowStep)}
          </div>
          <div className="flex justify-center mt-4">
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Schritt hinzufügen
            </button>
          </div>
        </div>
        
        <div className="flow-settings w-1/3 border-l flex flex-col" style={{ borderColor: styles.container.borderColor }}>
          <div className="flow-settings-tabs flex border-b" style={{ borderColor: styles.container.borderColor }}>
            <button 
              className={`flex-1 py-2 text-sm ${flowPanel === 'designer' ? 'font-medium border-b-2 border-blue-500' : ''}`}
              onClick={() => setFlowPanel('designer')}
            >
              Flow
            </button>
            <button 
              className={`flex-1 py-2 text-sm ${flowPanel === 'settings' ? 'font-medium border-b-2 border-blue-500' : ''}`}
              onClick={() => setFlowPanel('settings')}
            >
              Details
            </button>
          </div>
          
          <div className="flow-settings-content flex-1 overflow-y-auto">
            {flowPanel === 'designer' && (
              <div className="p-4">
                <h3 className="font-bold text-lg mb-3">Flow-Eigenschaften</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      style={styles.input}
                      value="Dokumentengenehmigungsworkflow"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>Umgebung</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      style={styles.input}
                      value="Contoso (Standard)"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>Besitzer</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      style={styles.input}
                      value="Max Mustermann"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
            
            {flowPanel === 'settings' && renderSettingsPanel()}
          </div>
        </div>
      </div>
    </div>
  );
} 