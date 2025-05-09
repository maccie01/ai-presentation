"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/themeContext';

export function PowerAdminDemo() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'environments' | 'dlp' | 'users' | 'analytics'>('environments');
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>('prod');
  
  const environments = [
    { id: 'prod', name: 'Produktion', type: 'Production', region: 'Europe', apps: 12, flows: 34, status: 'Aktiv' },
    { id: 'test', name: 'Test', type: 'Sandbox', region: 'Europe', apps: 8, flows: 21, status: 'Aktiv' },
    { id: 'dev', name: 'Entwicklung', type: 'Developer', region: 'Europe', apps: 15, flows: 27, status: 'Aktiv' }
  ];
  
  const dlpPolicies = [
    { id: 'p1', name: 'Standard-Unternehmensrichtlinie', environmentCount: 3, connectorCount: 18 },
    { id: 'p2', name: 'Vertrauliche Daten', environmentCount: 2, connectorCount: 12 },
    { id: 'p3', name: 'Externe Partnerzugriffe', environmentCount: 1, connectorCount: 8 }
  ];
  
  return (
    <div className="power-admin-demo border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-[#742774] text-white p-2 flex items-center">
        <div className="mr-2 bg-white text-[#742774] rounded-full h-6 w-6 flex items-center justify-center font-bold">A</div>
        <span className="font-medium">Power Platform Admin Center</span>
        <div className="ml-auto flex space-x-2">
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-sm text-sm">Einstellungen</button>
          <button className="bg-white text-[#742774] px-3 py-1 rounded-sm text-sm font-medium">Hilfe</button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-2 border-b border-gray-200">
        <div className="flex space-x-2">
          <button 
            className={`py-1 px-3 text-sm rounded ${activeTab === 'environments' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('environments')}
          >
            Umgebungen
          </button>
          <button 
            className={`py-1 px-3 text-sm rounded ${activeTab === 'dlp' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('dlp')}
          >
            DLP-Richtlinien
          </button>
          <button 
            className={`py-1 px-3 text-sm rounded ${activeTab === 'users' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('users')}
          >
            Benutzer
          </button>
          <button 
            className={`py-1 px-3 text-sm rounded ${activeTab === 'analytics' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>
      </div>
      
      <div className="p-4 h-[500px] bg-white overflow-y-auto">
        {activeTab === 'environments' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Umgebungen</h2>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Neue Umgebung
              </button>
            </div>
            
            <div className="bg-gray-50 p-2 mb-3 border border-gray-200 rounded-md">
              <input 
                type="text" 
                placeholder="Umgebungen suchen..." 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-2 border-b border-gray-200">Name</th>
                  <th className="p-2 border-b border-gray-200">Typ</th>
                  <th className="p-2 border-b border-gray-200">Region</th>
                  <th className="p-2 border-b border-gray-200">Apps</th>
                  <th className="p-2 border-b border-gray-200">Flows</th>
                  <th className="p-2 border-b border-gray-200">Status</th>
                  <th className="p-2 border-b border-gray-200">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {environments.map(env => (
                  <tr 
                    key={env.id} 
                    className={selectedEnvironment === env.id ? "bg-blue-50" : "hover:bg-gray-50"}
                    onClick={() => setSelectedEnvironment(env.id)}
                  >
                    <td className="p-2 border-b border-gray-200 font-medium">{env.name}</td>
                    <td className="p-2 border-b border-gray-200">{env.type}</td>
                    <td className="p-2 border-b border-gray-200">{env.region}</td>
                    <td className="p-2 border-b border-gray-200">{env.apps}</td>
                    <td className="p-2 border-b border-gray-200">{env.flows}</td>
                    <td className="p-2 border-b border-gray-200">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {env.status}
                      </span>
                    </td>
                    <td className="p-2 border-b border-gray-200">
                      <button className="text-blue-600 hover:text-blue-800">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'dlp' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Data Loss Prevention-Richtlinien</h2>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Neue Richtlinie
              </button>
            </div>
            
            <div className="space-y-4">
              {dlpPolicies.map(policy => (
                <motion.div 
                  key={policy.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-medium">{policy.name}</h3>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:underline text-sm">Bearbeiten</button>
                      <button className="text-red-600 hover:underline text-sm">Löschen</button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Umgebungen</div>
                        <div className="text-xl font-bold">{policy.environmentCount}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Konnektoren</div>
                        <div className="text-xl font-bold">{policy.connectorCount}</div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <div className="text-gray-600">Zuletzt geändert</div>
                        <div>vor 3 Tagen</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6">
              <div className="mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Benutzerverwaltung</h3>
              <p className="mt-1 text-sm text-gray-500">
                Hier können Sie Benutzer und ihre Rollen für die Power Platform-Umgebungen verwalten.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6">
              <div className="mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Plattformanalyse</h3>
              <p className="mt-1 text-sm text-gray-500">
                Hier können Sie Nutzungsstatistiken und Leistungskennzahlen für Ihre Power Platform-Ressourcen einsehen.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 