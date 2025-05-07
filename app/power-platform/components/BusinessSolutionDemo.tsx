"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SolutionComponent {
  id: string;
  name: string;
  type: 'app' | 'flow' | 'dashboard' | 'portal' | 'bot';
  description: string;
  icon: string;
}

export function BusinessSolutionDemo() {
  const [activeSolution, setActiveSolution] = useState<'dealership' | 'manufacturing' | 'field-service'>('dealership');
  const [activeStep, setActiveStep] = useState<number>(1);
  
  const solutions = [
    { id: 'dealership', name: 'Fahrzeughändler-Management', description: 'Komplettlösung für Fahrzeugbestand, Kundenbeziehungen und Serviceprozesse' },
    { id: 'manufacturing', name: 'Fertigungsqualitätskontrolle', description: 'Überwachung und Steuerung der Qualität im Produktionsprozess' },
    { id: 'field-service', name: 'Außendienst-Optimierung', description: 'Effiziente Planung und Steuerung von Serviceeinsätzen und Technikern' }
  ];
  
  const components: Record<string, SolutionComponent[]> = {
    'dealership': [
      { id: 'app1', name: 'Fahrzeugbestand-App', type: 'app', description: 'Erfassung und Verwaltung von Fahrzeugen im Bestand', icon: '🚗' },
      { id: 'app2', name: 'Kundenbeziehungs-App', type: 'app', description: 'CRM-System für Kundendaten und Verkaufschancen', icon: '👥' },
      { id: 'flow1', name: 'Angebotserstellung', type: 'flow', description: 'Automatisierte Erstellung und Versand von Angeboten', icon: '📝' },
      { id: 'flow2', name: 'Serviceerinnerung', type: 'flow', description: 'Automatisierte Benachrichtigungen für fällige Servicetermine', icon: '🔔' },
      { id: 'dashboard', name: 'Vertriebsübersicht', type: 'dashboard', description: 'Echtzeit-Übersicht über Verkaufszahlen und -prognosen', icon: '📊' },
      { id: 'portal', name: 'Kundenportal', type: 'portal', description: 'Self-Service-Portal für Kunden zur Terminbuchung und Statusabfrage', icon: '🌐' },
      { id: 'bot', name: 'Kundenservice-Bot', type: 'bot', description: 'Automatisierte Beantwortung von Kundenanfragen', icon: '🤖' }
    ],
    'manufacturing': [
      { id: 'app1', name: 'Qualitätskontroll-App', type: 'app', description: 'Erfassung und Auswertung von Qualitätsprüfungen', icon: '✓' },
      { id: 'flow1', name: 'Prüfprozess-Workflow', type: 'flow', description: 'Automatisierte Prüfprozesse und Qualitätssicherung', icon: '⚙️' },
      { id: 'dashboard', name: 'Qualitätsanalyse', type: 'dashboard', description: 'Auswertung von Qualitätsdaten und Trends', icon: '📈' }
    ],
    'field-service': [
      { id: 'app1', name: 'Techniker-App', type: 'app', description: 'Mobile App für Techniker im Außendienst', icon: '🔧' },
      { id: 'flow1', name: 'Einsatzplanung', type: 'flow', description: 'Optimierte Routenplanung und Terminierung', icon: '🗓️' },
      { id: 'dashboard', name: 'Serviceleistung', type: 'dashboard', description: 'Kennzahlen zur Leistung des Serviceteams', icon: '📊' },
      { id: 'bot', name: 'Techniker-Assistent', type: 'bot', description: 'KI-gestützter Assistent für technische Unterstützung', icon: '🤖' }
    ]
  };
  
  const steps = [
    { id: 1, name: 'Geschäftsprozess-Analyse' },
    { id: 2, name: 'Datenmodell-Entwurf' },
    { id: 3, name: 'App-Entwicklung' },
    { id: 4, name: 'Workflow-Automatisierung' },
    { id: 5, name: 'Dashboard-Erstellung' },
    { id: 6, name: 'Portalimplementierung' },
    { id: 7, name: 'Bot-Integration' }
  ];
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'app': return 'bg-purple-100 text-purple-800';
      case 'flow': return 'bg-blue-100 text-blue-800';
      case 'dashboard': return 'bg-yellow-100 text-yellow-800';
      case 'portal': return 'bg-green-100 text-green-800';
      case 'bot': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="business-solution-demo border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 flex items-center">
        <div className="mr-2 bg-white rounded-full h-6 w-6 flex items-center justify-center font-bold text-purple-600">P</div>
        <span className="font-medium">Power Platform - Geschäftslösungen</span>
      </div>
      
      <div className="bg-gray-50 p-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold">End-to-End Geschäftslösungen</h2>
        <p className="text-sm text-gray-600">
          Komplette Unternehmenslösungen, die alle Komponenten der Power Platform nutzen
        </p>
      </div>
      
      <div className="p-4 flex flex-col md:flex-row gap-4 h-[500px]">
        <div className="md:w-1/3 border border-gray-200 rounded-md overflow-hidden bg-white">
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <h3 className="font-medium">Lösungsvorlagen</h3>
          </div>
          <div className="p-3 space-y-3">
            {solutions.map(solution => (
              <div 
                key={solution.id}
                className={`p-3 border rounded-md cursor-pointer transition-all ${activeSolution === solution.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setActiveSolution(solution.id as any)}
              >
                <div className="font-medium">{solution.name}</div>
                <div className="text-sm text-gray-600 mt-1">{solution.description}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:w-2/3 flex flex-col border border-gray-200 rounded-md overflow-hidden bg-white">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium">
              {solutions.find(s => s.id === activeSolution)?.name}
            </h3>
            <div className="flex space-x-2">
              <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Lösung erstellen</button>
            </div>
          </div>
          
          <div className="p-3 border-b border-gray-200 bg-white">
            <div className="flex space-x-2 overflow-x-auto py-2">
              {steps.map(step => (
                <button
                  key={step.id}
                  className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                    activeStep === step.id 
                      ? 'bg-blue-600 text-white' 
                      : activeStep > step.id 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  {step.id}. {step.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <h4 className="font-medium mb-3">Lösungskomponenten</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {components[activeSolution]?.map(component => (
                <motion.div
                  key={component.id}
                  className="p-3 border border-gray-200 rounded-md"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start">
                    <div className="text-2xl mr-3">{component.icon}</div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{component.name}</span>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getTypeColor(component.type)}`}>
                          {component.type === 'app' && 'Power Apps'}
                          {component.type === 'flow' && 'Power Automate'}
                          {component.type === 'dashboard' && 'Power BI'}
                          {component.type === 'portal' && 'Power Pages'}
                          {component.type === 'bot' && 'Copilot Studio'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-3">Vorteile dieser Lösung</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Vollständig integriert mit allen Power Platform-Komponenten</li>
                <li>Schnelle Implementierung durch vorgefertigte Vorlagen</li>
                <li>Anpassbar an spezifische Geschäftsanforderungen</li>
                <li>Reduzierte Entwicklungskosten durch Low-Code-Ansatz</li>
                <li>Leicht erweiterbar mit zusätzlichen Funktionen</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 