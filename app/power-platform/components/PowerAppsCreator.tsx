"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CanvasElement {
  id: string;
  type: string;
  name: string;
  properties: Record<string, any>;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DataSource {
  id: string;
  name: string;
  type: string;
  icon: string;
  description: string;
}

interface ComponentTemplate {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
}

export function PowerAppsCreator() {
  const [activeTab, setActiveTab] = useState<'editor' | 'components' | 'data'>('editor');
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([
    {
      id: 'header',
      type: 'container',
      name: 'Header',
      properties: { color: '#f0f4f8', padding: '10px' },
      x: 10,
      y: 10,
      width: 580,
      height: 60
    },
    {
      id: 'label1',
      type: 'label',
      name: 'TitleLabel',
      properties: { text: 'Produktkatalog', fontSize: 20, fontWeight: 'bold' },
      x: 30,
      y: 25,
      width: 200,
      height: 30
    },
    {
      id: 'searchbox',
      type: 'textinput',
      name: 'SearchBox',
      properties: { placeholder: 'Produkt suchen...', borderRadius: 4 },
      x: 350,
      y: 20,
      width: 220,
      height: 40
    }
  ]);
  
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  
  const dataConnectors: DataSource[] = [
    {
      id: 'dataverse',
      name: 'Dataverse',
      type: 'database',
      icon: '🗄️',
      description: 'Die zentrale Datenplattform für Power Platform-Anwendungen'
    },
    {
      id: 'sharepoint',
      name: 'SharePoint',
      type: 'document',
      icon: '📋',
      description: 'Verbinden Sie mit SharePoint-Listen und -Bibliotheken'
    },
    {
      id: 'excel',
      name: 'Excel',
      type: 'file',
      icon: '📊',
      description: 'Verbinden Sie mit Excel-Dateien in SharePoint oder OneDrive'
    },
    {
      id: 'sql',
      name: 'SQL Server',
      type: 'database',
      icon: '💾',
      description: 'Verbinden Sie mit SQL Server-Datenbanken'
    },
    {
      id: 'dynamics',
      name: 'Dynamics 365',
      type: 'crm',
      icon: '🔄',
      description: 'Integrieren Sie mit Dynamics 365-Anwendungen'
    }
  ];
  
  const componentTemplates: ComponentTemplate[] = [
    {
      id: 'button',
      name: 'Button',
      category: 'Input',
      icon: '🔘',
      description: 'Standard-Schaltfläche für Aktionen'
    },
    {
      id: 'textinput',
      name: 'Text Input',
      category: 'Input',
      icon: '📝',
      description: 'Eingabefeld für Texteingabe'
    },
    {
      id: 'dropdown',
      name: 'Dropdown',
      category: 'Input',
      icon: '🔽',
      description: 'Auswahlmenü mit Optionen'
    },
    {
      id: 'datatable',
      name: 'Data Table',
      category: 'Data',
      icon: '📋',
      description: 'Tabelle zur Anzeige von Datensätzen'
    },
    {
      id: 'chart',
      name: 'Chart',
      category: 'Visualization',
      icon: '📊',
      description: 'Diagramm zur Datenvisualisierung'
    },
    {
      id: 'gallery',
      name: 'Gallery',
      category: 'Data',
      icon: '🖼️',
      description: 'Flexible Darstellung von Datensätzen'
    },
    {
      id: 'form',
      name: 'Form',
      category: 'Data',
      icon: '📄',
      description: 'Formular zur Dateneingabe und -bearbeitung'
    },
    {
      id: 'image',
      name: 'Image',
      category: 'Media',
      icon: '🖼️',
      description: 'Bild-Element'
    }
  ];
  
  const addElementToCanvas = (type: string) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type,
      name: `New${type.charAt(0).toUpperCase() + type.slice(1)}`,
      properties: {},
      x: 100,
      y: 100,
      width: 200,
      height: 40
    };
    
    // Set default properties based on component type
    switch (type) {
      case 'button':
        newElement.properties = { text: 'Button', borderRadius: 4, backgroundColor: '#0078d4', color: 'white' };
        break;
      case 'textinput':
        newElement.properties = { placeholder: 'Enter text...', borderRadius: 4 };
        break;
      case 'datatable':
        newElement.width = 580;
        newElement.height = 300;
        newElement.properties = { headers: ['ID', 'Name', 'Category', 'Price'] };
        break;
      case 'form':
        newElement.width = 400;
        newElement.height = 300;
        newElement.properties = { fields: ['Name', 'Description', 'Category', 'Price'] };
        break;
      default:
        newElement.properties = { placeholder: 'New Component' };
    }
    
    setCanvasElements([...canvasElements, newElement]);
  };
  
  const handleDragStart = (id: string) => {
    setDraggedComponent(id);
  };
  
  const handleDragEnd = () => {
    if (draggedComponent) {
      addElementToCanvas(draggedComponent);
      setDraggedComponent(null);
    }
  };
  
  const PropertyPanel = () => {
    if (!selectedElement) return <div className="p-4 text-gray-500">Kein Element ausgewählt</div>;
    
    const element = canvasElements.find(el => el.id === selectedElement);
    if (!element) return null;
    
    return (
      <div className="p-4">
        <h3 className="font-bold text-lg mb-3">{element.name} ({element.type})</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={element.name}
              onChange={() => {}}
            />
          </div>
          
          {Object.entries(element.properties).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={typeof value === 'object' ? JSON.stringify(value) : value}
                onChange={() => {}}
              />
            </div>
          ))}
          
          <div className="pt-2 border-t border-gray-200">
            <button className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm">
              Element löschen
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderCanvasElement = (element: CanvasElement) => {
    const isSelected = selectedElement === element.id;
    const style = {
      position: 'absolute' as 'absolute',
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      borderRadius: element.properties.borderRadius ? `${element.properties.borderRadius}px` : '0',
      backgroundColor: element.properties.backgroundColor || 
                      (element.type === 'container' ? element.properties.color : 'white'),
      border: isSelected ? '2px solid #0078d4' : '1px solid #ccc',
      padding: element.properties.padding || '4px',
      fontSize: element.properties.fontSize ? `${element.properties.fontSize}px` : 'inherit',
      fontWeight: element.properties.fontWeight || 'normal',
      color: element.properties.color || 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: element.type === 'button' ? 'center' : 'flex-start',
      cursor: 'pointer',
      overflow: 'hidden'
    };
    
    return (
      <div 
        key={element.id}
        style={style}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element.id);
        }}
      >
        {element.type === 'label' && element.properties.text}
        {element.type === 'button' && element.properties.text}
        {element.type === 'textinput' && (
          <input 
            type="text" 
            placeholder={element.properties.placeholder} 
            className="w-full h-full border-none bg-transparent outline-none"
            onClick={(e) => e.stopPropagation()}
          />
        )}
        {element.type === 'datatable' && (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {element.properties.headers.map((header: string, i: number) => (
                  <th key={i} className="border border-gray-300 px-2 py-1 bg-gray-100 text-sm">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map(row => (
                <tr key={row}>
                  {element.properties.headers.map((header: string, i: number) => (
                    <td key={i} className="border border-gray-300 px-2 py-1 text-sm">
                      {i === 0 ? `PRD-${row}00` : `Sample ${row}`}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {element.type === 'form' && (
          <div className="w-full p-2">
            {element.properties.fields.map((field: string, i: number) => (
              <div key={i} className="mb-2">
                <label className="block text-sm font-medium">{field}:</label>
                <input type="text" className="w-full border border-gray-300 p-1 text-sm" />
              </div>
            ))}
            <div className="mt-3 flex justify-end">
              <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded">Speichern</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="power-apps-creator border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-[#742774] text-white p-2 flex items-center">
        <div className="mr-2 bg-white text-[#742774] rounded-full h-6 w-6 flex items-center justify-center font-bold">P</div>
        <span className="font-medium">Power Apps Studio</span>
        <div className="ml-auto flex space-x-2">
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-sm text-sm">Vorschau</button>
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-sm text-sm">Speichern</button>
          <button className="bg-white text-[#742774] px-3 py-1 rounded-sm text-sm font-medium">Veröffentlichen</button>
        </div>
      </div>
      
      <div className="flex h-[600px]">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
          <div className="p-2 border-b border-gray-200">
            <div className="flex space-x-1">
              <button 
                className={`flex-1 py-2 px-3 text-sm rounded ${activeTab === 'editor' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                onClick={() => setActiveTab('editor')}
              >
                Eigenschaften
              </button>
              <button 
                className={`flex-1 py-2 px-3 text-sm rounded ${activeTab === 'components' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                onClick={() => setActiveTab('components')}
              >
                Komponenten
              </button>
              <button 
                className={`flex-1 py-2 px-3 text-sm rounded ${activeTab === 'data' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                onClick={() => setActiveTab('data')}
              >
                Daten
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'editor' && <PropertyPanel />}
            
            {activeTab === 'components' && (
              <div className="p-3">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Komponenten</h3>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm" 
                    placeholder="Komponente suchen..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {componentTemplates.map(component => (
                    <motion.div
                      key={component.id}
                      className="bg-white p-3 rounded border border-gray-200 cursor-grab hover:border-blue-400 hover:shadow-sm text-center"
                      whileHover={{ scale: 1.03 }}
                      draggable
                      onDragStart={() => handleDragStart(component.id)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="text-2xl mb-1">{component.icon}</div>
                      <div className="text-sm font-medium">{component.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'data' && (
              <div className="p-3">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Datenquellen</h3>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm" 
                    placeholder="Datenquelle suchen..."
                  />
                </div>
                
                <div className="space-y-2">
                  {dataConnectors.map(connector => (
                    <motion.div
                      key={connector.id}
                      className="bg-white p-3 rounded border border-gray-200 hover:border-blue-400 hover:shadow-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center mb-1">
                        <span className="text-xl mr-2">{connector.icon}</span>
                        <span className="font-medium">{connector.name}</span>
                      </div>
                      <p className="text-xs text-gray-600">{connector.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Canvas Area */}
        <div className="flex-1 bg-gray-50 relative">
          <div className="p-2 bg-white border-b border-gray-200 flex items-center">
            <span className="font-medium text-sm">Bildschirm 1</span>
            <span className="ml-auto text-sm text-gray-500">Phone Layout (1080 x 1920)</span>
          </div>
          
          <div 
            className="canvas-area relative overflow-auto h-[550px]"
            onClick={() => setSelectedElement(null)}
          >
            <div className="canvas bg-white shadow-sm mx-auto my-4" style={{ width: '600px', height: '900px', position: 'relative' }}>
              {canvasElements.map(renderCanvasElement)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 