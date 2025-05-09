"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/themeContext';

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
  const { isDarkMode } = useTheme();
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
            <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>Name</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              style={{
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'white',
                borderColor: isDarkMode ? 'var(--border-color)' : '#d1d5db',
                color: isDarkMode ? 'var(--foreground)' : 'inherit'
              }}
              value={element.name}
              onChange={() => {}}
            />
          </div>
          
          {Object.entries(element.properties).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'white',
                  borderColor: isDarkMode ? 'var(--border-color)' : '#d1d5db',
                  color: isDarkMode ? 'var(--foreground)' : 'inherit'
                }}
                value={typeof value === 'object' ? JSON.stringify(value) : value}
                onChange={() => {}}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Define styles with dark mode support
  const styles = {
    panel: {
      backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : '#f9fafb',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
    },
    component: {
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      border: '1px solid',
      color: isDarkMode ? 'var(--foreground)' : 'inherit',
    },
    canvas: {
      backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.5)' : '#f9fafb',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      color: isDarkMode ? 'var(--foreground)' : 'inherit',
    },
    dataConnector: {
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      color: isDarkMode ? 'var(--foreground)' : 'inherit',
    },
    tab: {
      active: {
        borderColor: '#5b21b6',
        color: isDarkMode ? 'white' : '#374151',
      },
      inactive: {
        color: isDarkMode ? 'rgba(209, 213, 219, 0.8)' : '#6b7280',
        hover: {
          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(243, 244, 246, 0.5)'
        }
      }
    },
    hoverElement: {
      backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.7)'
    }
  };
  
  const renderCanvasElement = (element: CanvasElement) => {
    const style = {
      position: 'absolute' as const,
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      cursor: 'pointer',
      border: selectedElement === element.id ? '2px solid #5b21b6' : '1px solid',
      borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.6)' : '#ddd',
      backgroundColor: element.type === 'container' ? 
        (element.properties.color || (isDarkMode ? 'rgba(31, 41, 55, 0.6)' : '#f0f4f8')) : 
        (element.properties.backgroundColor && 
         element.properties.backgroundColor === '#0078d4' && 
         isDarkMode ? '#0078d4' : element.properties.backgroundColor || 'transparent'),
      borderRadius: element.properties.borderRadius ? `${element.properties.borderRadius}px` : '0',
      padding: element.properties.padding || '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: element.type === 'button' ? 'center' : 'flex-start',
      color: element.properties.color === '#f0f4f8' && isDarkMode ? 'var(--foreground)' : element.properties.color,
    };
    
    return (
      <div 
        key={element.id}
        style={style}
        onClick={() => setSelectedElement(element.id)}
      >
        {element.type === 'label' && (
          <span style={{ 
            fontWeight: element.properties.fontWeight || 'normal',
            fontSize: element.properties.fontSize ? `${element.properties.fontSize}px` : 'inherit',
            color: isDarkMode ? 'var(--foreground)' : 'inherit'
          }}>
            {element.properties.text || ''}
          </span>
        )}
        
        {element.type === 'textinput' && (
          <input 
            type="text"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              padding: '0 8px',
              color: isDarkMode ? 'var(--foreground)' : 'inherit'
            }}
            placeholder={element.properties.placeholder || ''}
            readOnly
          />
        )}
        
        {element.type === 'button' && (
          <button style={{ 
            color: isDarkMode && !element.properties.color ? 'var(--foreground)' : element.properties.color || 'inherit'
          }}>
            {element.properties.text || 'Button'}
          </button>
        )}
        
        {element.type === 'datatable' && (
          <div style={{ width: '100%', height: '100%', overflow: 'auto', fontSize: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {(element.properties.headers || ['Column 1', 'Column 2']).map((header: string, i: number) => (
                    <th key={i} style={{ 
                      padding: '6px', 
                      borderBottom: '1px solid',
                      borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.6)' : '#ddd',
                      textAlign: 'left',
                      backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : '#f3f4f6',
                      color: isDarkMode ? 'var(--foreground)' : 'inherit'
                    }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map(row => (
                  <tr key={row}>
                    {(element.properties.headers || ['Column 1', 'Column 2']).map((header: string, i: number) => (
                      <td key={i} style={{ 
                        padding: '4px 6px', 
                        borderBottom: '1px solid',
                        borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.6)' : '#ddd',
                        color: isDarkMode ? 'var(--foreground)' : 'inherit'
                      }}>
                        Sample data
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {element.type === 'form' && (
          <div style={{ width: '100%', height: '100%', padding: '10px', fontSize: '12px' }}>
            {(element.properties.fields || ['Field 1', 'Field 2']).map((field: string, i: number) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '4px',
                  color: isDarkMode ? 'var(--foreground)' : 'inherit'
                }}>
                  {field}
                </label>
                <input 
                  type="text" 
                  style={{ 
                    width: '100%', 
                    padding: '4px', 
                    border: '1px solid',
                    borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.6)' : '#ddd',
                    borderRadius: '3px',
                    backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'white',
                    color: isDarkMode ? 'var(--foreground)' : 'inherit'
                  }} 
                  readOnly
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="power-apps-creator w-full h-[600px] rounded-lg overflow-hidden border" style={{ borderColor: styles.canvas.borderColor }}>
      {/* Studio Header */}
      <div className="studio-header h-12 flex items-center justify-between px-4 border-b" style={{
        backgroundColor: isDarkMode ? '#462A7C' : '#742774',
        borderColor: styles.canvas.borderColor,
        color: 'white'
      }}>
        <div className="flex items-center">
          <span className="font-bold text-lg mr-1">Power Apps</span>
          <span className="text-sm opacity-80">| Studio</span>
        </div>
        <div className="flex space-x-2">
          <button 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
            }}
            className="hover:bg-white/30 px-3 py-1 rounded text-sm cursor-pointer"
          >
            Vorschau
          </button>
          <button 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
            }}
            className="hover:bg-white/30 px-3 py-1 rounded text-sm cursor-pointer"
          >
            Speichern
          </button>
          <button 
            style={{
              backgroundColor: 'white',
              color: isDarkMode ? '#462A7C' : '#742774',
            }}
            className="px-3 py-1 rounded text-sm font-medium cursor-pointer"
          >
            Veröffentlichen
          </button>
        </div>
      </div>
      
      {/* Studio Main Area */}
      <div className="studio-main flex h-[590px]">
        {/* Left Panel - Components/Data/Properties */}
        <div className="left-panel w-64 border-r h-full overflow-hidden flex flex-col" style={styles.panel}>
          <div className="tabs flex border-b" style={{ borderColor: styles.panel.borderColor }}>
            <button 
              className={`flex-1 py-2 text-sm ${activeTab === 'editor' ? 'font-medium border-b-2' : ''}`}
              style={activeTab === 'editor' ? styles.tab.active : { color: styles.tab.inactive.color }}
              onClick={() => setActiveTab('editor')}
            >
              Editor
            </button>
            <button 
              className={`flex-1 py-2 text-sm ${activeTab === 'components' ? 'font-medium border-b-2' : ''}`}
              style={activeTab === 'components' ? styles.tab.active : { color: styles.tab.inactive.color }}
              onClick={() => setActiveTab('components')}
            >
              Komponenten
            </button>
            <button 
              className={`flex-1 py-2 text-sm ${activeTab === 'data' ? 'font-medium border-b-2' : ''}`}
              style={activeTab === 'data' ? styles.tab.active : { color: styles.tab.inactive.color }}
              onClick={() => setActiveTab('data')}
            >
              Daten
            </button>
          </div>
          
          <div className="panel-content p-4 overflow-y-auto flex-grow">
            {activeTab === 'editor' && (
              <div>
                <h3 className="font-medium mb-2">Bildschirme</h3>
                <ul className="text-sm space-y-1">
                  <li className="py-1 px-2 rounded" style={{ backgroundColor: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : 'rgb(243, 232, 255)' }}>Hauptbildschirm</li>
                  <li className="py-1 px-2 cursor-pointer rounded hover:bg-gray-100" style={{ 
                    backgroundColor: isDarkMode ? 'transparent' : 'transparent',
                  }}>Detailansicht</li>
                  <li className="py-1 px-2 cursor-pointer rounded hover:bg-gray-100" style={{ 
                    backgroundColor: isDarkMode ? 'transparent' : 'transparent',
                  }}>Bearbeitungsformular</li>
                </ul>
                
                <h3 className="font-medium mt-4 mb-2">Elemente</h3>
                <div>
                  {selectedElement && (
                    <PropertyPanel />
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'components' && (
              <div>
                <h3 className="font-medium mb-3">UI-Komponenten</h3>
                <div className="grid grid-cols-2 gap-2">
                  {componentTemplates.map(component => (
                    <motion.div
                      key={component.id}
                      className="cursor-grab text-center"
                      style={{ 
                        padding: '12px',
                        borderRadius: '4px',
                        ...styles.component
                      }}
                      whileHover={{ scale: 1.05, borderColor: isDarkMode ? '#8b5cf6' : '#8b5cf6' }}
                      draggable
                      onDragStart={() => handleDragStart(component.id)}
                      onDragEnd={handleDragEnd}
                    >
                      <div>{component.icon}</div>
                      <div className="text-xs mt-1">{component.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'data' && (
              <div>
                <h3 className="font-medium mb-3">Datenquellen</h3>
                <div className="space-y-2">
                  {dataConnectors.map(connector => (
                    <div 
                      key={connector.id}
                      className="p-3 rounded border flex items-start"
                      style={styles.dataConnector}
                    >
                      <div className="text-2xl mr-3">{connector.icon}</div>
                      <div>
                        <h4 className="font-medium text-sm">{connector.name}</h4>
                        <p className="text-xs mt-1">{connector.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Canvas Area */}
        <div className="canvas-area flex-1 relative overflow-auto" style={styles.canvas}>
          {canvasElements.map(element => renderCanvasElement(element))}
        </div>
      </div>
    </div>
  );
} 