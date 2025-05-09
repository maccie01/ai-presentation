"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/themeContext';

interface PageComponent {
  id: string;
  type: string;
  title: string;
  content?: string;
  children?: PageComponent[];
  properties?: Record<string, any>;
}

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export function PowerPagesDemo() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'pages' | 'templates' | 'themes'>('pages');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<string>('home');
  const [editMode, setEditMode] = useState<'design' | 'content' | 'settings'>('design');
  
  const templates: Template[] = [
    {
      id: 'customer-portal',
      name: 'Kundenportal',
      description: 'Ein Portal für Kundensupport und Serviceanfragen',
      thumbnail: '🏢'
    },
    {
      id: 'event-registration',
      name: 'Event-Anmeldung',
      description: 'Website für Event-Registrierung und -Management',
      thumbnail: '📅'
    },
    {
      id: 'partner-portal',
      name: 'Partner-Portal',
      description: 'Kollaborationsplattform für Geschäftspartner',
      thumbnail: '🤝'
    },
    {
      id: 'product-catalog',
      name: 'Produktkatalog',
      description: 'Präsentation von Produkten mit Bestellmöglichkeit',
      thumbnail: '📦'
    }
  ];
  
  const pages = [
    { id: 'home', name: 'Startseite' },
    { id: 'services', name: 'Serviceangebote' },
    { id: 'request', name: 'Serviceanfrage' },
    { id: 'status', name: 'Anfragenstatus' },
    { id: 'faq', name: 'Häufige Fragen' },
    { id: 'contact', name: 'Kontakt' }
  ];
  
  const pageComponents: PageComponent[] = [
    {
      id: 'header',
      type: 'header',
      title: 'Kopfzeile',
      properties: {
        logo: true,
        navigation: true,
        searchBar: true
      }
    },
    {
      id: 'hero',
      type: 'hero',
      title: 'Hero-Bereich',
      content: 'Willkommen im Kundenservice-Portal',
      properties: {
        backgroundImage: true,
        ctaButton: 'Serviceanfrage stellen'
      }
    },
    {
      id: 'services',
      type: 'section',
      title: 'Serviceangebote',
      children: [
        {
          id: 'service-1',
          type: 'card',
          title: 'Technischer Support',
          content: 'Unterstützung bei technischen Problemen mit unseren Produkten'
        },
        {
          id: 'service-2',
          type: 'card',
          title: 'Reparaturservice',
          content: 'Professionelle Reparatur durch zertifizierte Techniker'
        },
        {
          id: 'service-3',
          type: 'card',
          title: 'Garantieabwicklung',
          content: 'Schnelle und unkomplizierte Bearbeitung von Garantieansprüchen'
        }
      ]
    },
    {
      id: 'status-checker',
      type: 'form',
      title: 'Status-Prüfung',
      properties: {
        fields: [
          { name: 'ticket-id', label: 'Ticket-ID', type: 'text' },
          { name: 'submit', label: 'Status prüfen', type: 'button' }
        ]
      }
    },
    {
      id: 'footer',
      type: 'footer',
      title: 'Fußzeile',
      properties: {
        links: ['Impressum', 'Datenschutz', 'AGB', 'Kontakt'],
        socialMedia: true,
        copyright: true
      }
    }
  ];
  
  const styles = {
    container: {
      backgroundColor: isDarkMode ? 'var(--card-bg)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      color: isDarkMode ? 'var(--foreground)' : 'inherit',
    },
    header: {
      backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : '#f3f4f6',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
    },
    panel: {
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
    },
    content: {
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
    },
    button: {
      standard: {
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
        color: isDarkMode ? 'var(--foreground)' : 'inherit',
      },
      primary: {
        backgroundColor: isDarkMode ? 'rgba(22, 163, 74, 0.8)' : 'white',
        color: isDarkMode ? 'white' : '#008272',
      },
    },
    text: {
      muted: {
        color: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : '#6b7280',
      },
      placeholder: {
        color: isDarkMode ? 'rgba(156, 163, 175, 0.5)' : '#9ca3af',
      },
    },
  };
  
  const renderPreview = () => {
    return (
      <div className="bg-white rounded-md border border-gray-200 h-full overflow-y-auto">
        <div className="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center">
          <span className="text-sm font-medium">Vorschau: Kundenservice-Portal</span>
          <div className="flex space-x-2">
            <button className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-gray-50">
              Mobile
            </button>
            <button className="text-xs bg-blue-50 border border-blue-200 px-2 py-1 rounded text-blue-600">
              Desktop
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Header Component */}
          <div className="bg-blue-600 text-white p-3 rounded">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="mr-2 font-bold">Kundenservice</div>
              </div>
              <div className="flex space-x-4 text-sm">
                <span>Startseite</span>
                <span>Serviceangebote</span>
                <span>Anfrage</span>
                <span>Status</span>
                <span>FAQ</span>
                <span>Kontakt</span>
              </div>
            </div>
          </div>
          
          {/* Hero Component */}
          <div className="bg-gray-200 p-6 rounded-md text-center">
            <h1 className="text-xl font-bold mb-2">Willkommen im Kundenservice-Portal</h1>
            <p className="text-sm mb-4">Hier finden Sie Hilfe und Support für alle unsere Produkte</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
              Serviceanfrage stellen
            </button>
          </div>
          
          {/* Services Section */}
          <div className="py-4">
            <h2 className="text-lg font-bold mb-3">Serviceangebote</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h3 className="font-medium mb-1">Technischer Support</h3>
                <p className="text-xs text-gray-600">Unterstützung bei technischen Problemen mit unseren Produkten</p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h3 className="font-medium mb-1">Reparaturservice</h3>
                <p className="text-xs text-gray-600">Professionelle Reparatur durch zertifizierte Techniker</p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h3 className="font-medium mb-1">Garantieabwicklung</h3>
                <p className="text-xs text-gray-600">Schnelle und unkomplizierte Bearbeitung von Garantieansprüchen</p>
              </div>
            </div>
          </div>
          
          {/* Status Checker Form */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h2 className="text-md font-bold mb-2">Status-Prüfung</h2>
            <div className="flex">
              <input 
                type="text" 
                placeholder="Ticket-ID eingeben" 
                className="flex-1 p-2 border border-gray-300 rounded-l-md text-sm"
              />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-r-md text-sm">
                Status prüfen
              </button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-100 p-3 rounded-md mt-6">
            <div className="flex justify-between text-sm">
              <div className="space-x-3 text-gray-600">
                <span>Impressum</span>
                <span>Datenschutz</span>
                <span>AGB</span>
                <span>Kontakt</span>
              </div>
              <div className="text-gray-500 text-xs">
                © 2023 Kundenservice-Portal
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderComponentsList = () => {
    return (
      <div className="bg-white rounded-md border border-gray-200 h-full overflow-y-auto">
        <div className="bg-gray-50 p-2 border-b border-gray-200">
          <span className="text-sm font-medium">Komponenten</span>
        </div>
        
        <div className="p-2">
          <input
            type="text"
            placeholder="Komponenten suchen..."
            className="w-full p-2 mb-3 border border-gray-300 rounded-md text-sm"
          />
          
          <div className="space-y-2">
            <div className="font-medium text-xs text-gray-500 mb-1">LAYOUT</div>
            {['Section', 'Container', 'Column', 'Spacer'].map(comp => (
              <div key={comp} className="flex items-center p-2 rounded hover:bg-gray-50 cursor-grab">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <span className="text-sm">{comp}</span>
              </div>
            ))}
            
            <div className="font-medium text-xs text-gray-500 mb-1 mt-3">KOMPONENTEN</div>
            {['Heading', 'Text', 'Image', 'Button', 'Card', 'Form', 'List'].map(comp => (
              <div key={comp} className="flex items-center p-2 rounded hover:bg-gray-50 cursor-grab">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-2 text-gray-600">
                  {comp === 'Heading' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                  )}
                  {comp === 'Text' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  )}
                  {comp === 'Image' && "🖼️"}
                  {comp === 'Button' && "🔘"}
                  {comp === 'Card' && "📇"}
                  {comp === 'Form' && "📝"}
                  {comp === 'List' && "📋"}
                </div>
                <span className="text-sm">{comp}</span>
              </div>
            ))}
            
            <div className="font-medium text-xs text-gray-500 mb-1 mt-3">DATEN</div>
            {['Data List', 'Table', 'Chart', 'Data Form'].map(comp => (
              <div key={comp} className="flex items-center p-2 rounded hover:bg-gray-50 cursor-grab">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-2 text-gray-600">
                  {comp === 'Data List' && "📋"}
                  {comp === 'Table' && "🧮"}
                  {comp === 'Chart' && "📊"}
                  {comp === 'Data Form' && "📝"}
                </div>
                <span className="text-sm">{comp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderPagesList = () => {
    return (
      <div className="bg-white rounded-md border border-gray-200 h-full overflow-y-auto">
        <div className="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center">
          <span className="text-sm font-medium">Seiten</span>
          <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded-sm flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Neue Seite
          </button>
        </div>
        
        <div className="p-1">
          {pages.map(page => (
            <div 
              key={page.id}
              className={`flex items-center p-2 rounded cursor-pointer ${activePage === page.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              onClick={() => setActivePage(page.id)}
            >
              <div className="w-6 h-6 bg-gray-100 border border-gray-200 rounded flex items-center justify-center mr-2 text-xs">
                {page.name.charAt(0)}
              </div>
              <span className="text-sm">{page.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderTemplateSelector = () => {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Vorlage auswählen</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {templates.map(template => (
            <motion.div
              key={template.id}
              className={`border rounded-md p-3 cursor-pointer ${selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
              onClick={() => setSelectedTemplate(template.id)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start">
                <div className="text-4xl mr-3">{template.thumbnail}</div>
                <div>
                  <h3 className="font-medium text-sm">{template.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded font-medium text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!selectedTemplate}
          >
            Vorlage verwenden
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="power-pages-demo border rounded-lg overflow-hidden" style={styles.container}>
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: styles.container.borderColor }}>
        <div className="flex items-center">
          <span className="text-green-600 font-medium">Power Pages</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm" style={styles.text.muted}>Kundenservice-Portal</span>
        </div>
        <div className="flex space-x-2">
          <button 
            className="hover:bg-white/30 px-3 py-1 rounded-sm text-sm"
            style={styles.button.standard}
          >
            Vorschau
          </button>
          <button 
            className="px-3 py-1 rounded-sm text-sm font-medium"
            style={styles.button.primary}
          >
            Veröffentlichen
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-12 h-[500px]">
        <div className="col-span-2 border-r" style={{ borderColor: styles.container.borderColor }}>
          <div className="p-3 border-b" style={{ borderColor: styles.container.borderColor }}>
            <h3 className="font-medium text-sm">Seitennavigation</h3>
          </div>
          <div className="p-2">
            <ul className="text-sm space-y-1">
              {pages.map((page, i) => (
                <li 
                  key={i} 
                  className={`py-1 px-2 rounded cursor-pointer ${activePage === page.id ? 'font-medium' : ''}`}
                  style={
                    activePage === page.id 
                      ? { backgroundColor: isDarkMode ? 'rgba(22, 163, 74, 0.2)' : 'rgba(240, 253, 244, 1)' } 
                      : {}
                  }
                  onClick={() => setActivePage(page.id)}
                >
                  {page.name}
                </li>
              ))}
            </ul>
            </div>
        </div>
        
        <div className="col-span-7 flex flex-col border-r" style={{ borderColor: styles.container.borderColor }}>
          <div className="p-3 border-b flex items-center" style={{ borderColor: styles.container.borderColor }}>
            <div className="flex-1">
              <input 
                type="text" 
                className="w-full p-1 border rounded text-sm"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'white',
                  borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
                  color: isDarkMode ? 'var(--foreground)' : 'inherit',
                }}
                value="Kundenservice-Portal" 
                readOnly
              />
            </div>
            <div className="ml-4 flex space-x-2">
              <button className="text-sm flex items-center text-blue-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Ansicht
              </button>
              <button className="text-sm flex items-center text-blue-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Komponenten
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="rounded-md border h-full overflow-y-auto" style={styles.content}>
              {activePage === 'home' && (
                <div className="p-4">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Willkommen beim Kundenservice-Portal</h2>
                    <p className="text-sm" style={styles.text.muted}>Hier finden Sie Hilfe bei allen Fragen zu unseren Produkten und Dienstleistungen.</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-3 rounded-md border" style={styles.content}>
                      <h3 className="font-medium mb-2">Supportanfrage stellen</h3>
                      <p className="text-xs mb-2" style={styles.text.muted}>Erstellen Sie eine neue Supportanfrage und verfolgen Sie den Status.</p>
                      <button className="bg-green-600 text-white px-3 py-1 text-xs rounded hover:bg-green-700">
                        Anfrage stellen
                      </button>
                    </div>
                    
                    <div className="p-3 rounded-md border" style={styles.content}>
                      <h3 className="font-medium mb-2">Wissensdatenbank</h3>
                      <p className="text-xs mb-2" style={styles.text.muted}>Durchsuchen Sie unsere Artikel und Lösungen für häufige Probleme.</p>
                      <button className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700">
                        Artikel anzeigen
                      </button>
                    </div>
                    
                    <div className="p-3 rounded-md border" style={styles.content}>
                      <h3 className="font-medium mb-2">Kontaktinformationen</h3>
                      <p className="text-xs mb-2" style={styles.text.muted}>Finden Sie alternative Kontaktmöglichkeiten für den Support.</p>
                      <button className="bg-purple-600 text-white px-3 py-1 text-xs rounded hover:bg-purple-700">
                        Kontakt anzeigen
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activePage === 'services' && (
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">Serviceangebote</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Technischer Support</h3>
                      <p className="text-xs mb-2" style={styles.text.muted}>Unterstützung bei technischen Problemen mit unseren Produkten</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Reparaturservice</h3>
                      <p className="text-xs mb-2" style={styles.text.muted}>Professionelle Reparatur durch zertifizierte Techniker</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Garantieabwicklung</h3>
                      <p className="text-xs mb-2" style={styles.text.muted}>Schnelle und unkomplizierte Bearbeitung von Garantieansprüchen</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activePage === 'request' && (
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">Neue Supportanfrage</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>
                        Betreff
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded"
                        style={{
                          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'white',
                          borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
                          color: isDarkMode ? 'var(--foreground)' : 'inherit',
                        }}
                        placeholder="Kurze Beschreibung Ihres Problems"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>
                        Kategorie
                      </label>
                      <select 
                        className="w-full p-2 border rounded"
                        style={{
                          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'white',
                          borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
                          color: isDarkMode ? 'var(--foreground)' : 'inherit',
                        }}
                      >
                        <option>Technisches Problem</option>
                        <option>Kontofrage</option>
                        <option>Abrechnung</option>
                        <option>Produktinformation</option>
                        <option>Sonstiges</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>
                        Beschreibung
                      </label>
                      <textarea 
                        className="w-full p-2 border rounded"
                        style={{
                          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'white',
                          borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
                          color: isDarkMode ? 'var(--foreground)' : 'inherit',
                        }}
                        rows={6}
                        placeholder="Detaillierte Beschreibung Ihres Problems"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>
                        Anhänge
                      </label>
                      <div 
                        className="border border-dashed rounded p-4 text-center cursor-pointer"
                        style={{
                          borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
                        }}
                      >
                        <p className="text-sm" style={styles.text.muted}>Dateien hier ablegen oder klicken zum Auswählen</p>
                        <p className="text-xs mt-1" style={styles.text.placeholder}>Max. 5 MB pro Datei</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end space-x-3">
                      <button className="px-4 py-2 rounded text-sm border" style={styles.content}>
                        Abbrechen
                      </button>
                      <button className="px-4 py-2 rounded text-sm bg-green-600 text-white hover:bg-green-700">
                        Anfrage einreichen
                      </button>
                    </div>
                  </div>
            </div>
          )}
            </div>
          </div>
        </div>
        
        <div className="col-span-3 h-full flex flex-col">
          <div className="p-3 border-b" style={{ borderColor: styles.container.borderColor }}>
            <h3 className="font-medium text-sm">Websiteeigenschaften</h3>
          </div>
          
          <div className="p-3 border-b" style={{ borderColor: styles.container.borderColor }}>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>
                  Sprachauswahl
                </label>
                <select 
                  className="w-full p-1 border rounded text-sm"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'white',
                    borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
                    color: isDarkMode ? 'var(--foreground)' : 'inherit',
                  }}
                >
                  <option>Deutsch (DE)</option>
                  <option>English (US)</option>
                  <option>Français (FR)</option>
                  <option>Español (ES)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>
                  Seitenvorlage
                </label>
                <select 
                  className="w-full p-1 border rounded text-sm"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'white',
                    borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
                    color: isDarkMode ? 'var(--foreground)' : 'inherit',
                  }}
                >
                  <option>Kundenportal</option>
                  <option>Informationsseite</option>
                  <option>Dateneingabe</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            <div className="p-3">
              <h4 className="font-medium text-xs mb-3">Komponenten</h4>
              
              <div className="space-y-2">
                {pageComponents.map((component, i) => (
                  <div 
                    key={i} 
                    className="p-2 rounded border cursor-pointer"
                    style={styles.content}
                  >
                    <div className="font-medium text-xs">{component.title}</div>
                    <div className="text-xs" style={styles.text.muted}>{component.type}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <button className="text-sm text-blue-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Komponente hinzufügen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 