"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
    <div className="power-pages-demo border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-[#008272] text-white p-2 flex items-center">
        <div className="mr-2 bg-white text-[#008272] rounded-full h-6 w-6 flex items-center justify-center font-bold">P</div>
        <span className="font-medium">Power Pages - Kundenservice-Portal</span>
        <div className="ml-auto flex space-x-2">
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-sm text-sm">Vorschau</button>
          <button className="bg-white text-[#008272] px-3 py-1 rounded-sm text-sm font-medium">Veröffentlichen</button>
        </div>
      </div>
      
      <div className="flex bg-gray-100 border-b border-gray-200 p-2">
        <div className="flex space-x-2">
          <button 
            className={`py-1 px-3 text-sm rounded ${activeTab === 'pages' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('pages')}
          >
            Seiten
          </button>
          <button 
            className={`py-1 px-3 text-sm rounded ${activeTab === 'templates' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('templates')}
          >
            Vorlagen
          </button>
          <button 
            className={`py-1 px-3 text-sm rounded ${activeTab === 'themes' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('themes')}
          >
            Designs
          </button>
        </div>
        
        <div className="ml-auto flex space-x-2">
          <button 
            className={`py-1 px-3 text-sm rounded ${editMode === 'design' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setEditMode('design')}
          >
            Design
          </button>
          <button 
            className={`py-1 px-3 text-sm rounded ${editMode === 'content' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setEditMode('content')}
          >
            Inhalte
          </button>
          <button 
            className={`py-1 px-3 text-sm rounded ${editMode === 'settings' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            onClick={() => setEditMode('settings')}
          >
            Einstellungen
          </button>
        </div>
      </div>
      
      <div className="h-[520px] flex">
        {/* Left sidebar */}
        <div className="w-64 p-2 bg-gray-50 border-r border-gray-200">
          {activeTab === 'pages' && renderPagesList()}
          {activeTab === 'templates' && renderTemplateSelector()}
          {activeTab === 'themes' && (
            <div className="text-center p-6 text-gray-500">
              Design-Optionen werden hier angezeigt
            </div>
          )}
        </div>
        
        {/* Main content area */}
        <div className="flex-1 p-2">
          {editMode === 'design' && renderPreview()}
          {editMode === 'content' && (
            <div className="bg-white h-full p-6 flex items-center justify-center text-gray-500">
              Inhaltseditor wird hier angezeigt
            </div>
          )}
          {editMode === 'settings' && (
            <div className="bg-white h-full p-6 flex items-center justify-center text-gray-500">
              Seiteneinstellungen werden hier angezeigt
            </div>
          )}
        </div>
        
        {/* Right sidebar */}
        <div className="w-64 p-2 bg-gray-50 border-l border-gray-200">
          {renderComponentsList()}
        </div>
      </div>
    </div>
  );
} 