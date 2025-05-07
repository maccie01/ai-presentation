"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type VisualizationType = 'bar' | 'line' | 'pie' | 'kpi' | 'table';

interface Visualization {
  id: string;
  type: VisualizationType;
  title: string;
  position: { x: number; y: number; w: number; h: number };
  data: any;
  config: Record<string, any>;
}

interface Filter {
  id: string;
  name: string;
  type: 'dropdown' | 'daterange' | 'slider';
  options?: string[];
  value: any;
}

export function PowerBIDemo() {
  const [visualizations, setVisualizations] = useState<Visualization[]>([
    {
      id: 'v1',
      type: 'bar',
      title: 'Umsatz nach Produktkategorie',
      position: { x: 0, y: 0, w: 6, h: 3 },
      data: {
        categories: ['Fahrzeugteile', 'Elektronik', 'Innenausstattung', 'Zubehör', 'Service'],
        values: [425000, 310000, 275000, 190000, 150000]
      },
      config: {
        color: '#0078D4',
        showLabels: true,
        sortOrder: 'descending'
      }
    },
    {
      id: 'v2',
      type: 'line',
      title: 'Monatliche Umsatzentwicklung',
      position: { x: 6, y: 0, w: 6, h: 3 },
      data: {
        categories: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun'],
        series: [
          { name: '2023', values: [90000, 85000, 110000, 95000, 120000, 115000] },
          { name: '2022', values: [80000, 75000, 95000, 85000, 100000, 105000] }
        ]
      },
      config: {
        showLegend: true,
        lineStyle: 'solid',
        markers: 'circle'
      }
    },
    {
      id: 'v3',
      type: 'kpi',
      title: 'Gesamtumsatz',
      position: { x: 0, y: 3, w: 3, h: 2 },
      data: {
        value: 1350000,
        target: 1200000,
        trend: 12.5
      },
      config: {
        format: 'currency',
        indicatorType: 'arrow'
      }
    },
    {
      id: 'v4',
      type: 'pie',
      title: 'Umsatz nach Region',
      position: { x: 3, y: 3, w: 3, h: 3 },
      data: {
        categories: ['Nord', 'Süd', 'Ost', 'West', 'Zentral'],
        values: [320000, 410000, 230000, 280000, 110000]
      },
      config: {
        showPercentage: true,
        colorScheme: 'categorical'
      }
    },
    {
      id: 'v5',
      type: 'table',
      title: 'Top Verkäufer',
      position: { x: 6, y: 3, w: 6, h: 3 },
      data: {
        columns: ['Name', 'Abteilung', 'Umsatz', 'Wachstum'],
        rows: [
          ['Schmidt, Anna', 'Fahrzeugteile', '€ 182.500', '+15%'],
          ['Meyer, Thomas', 'Elektronik', '€ 165.300', '+8%'],
          ['Weber, Maria', 'Service', '€ 142.800', '+12%'],
          ['Schulz, Michael', 'Innenausstattung', '€ 138.600', '+5%'],
          ['Hoffmann, Lisa', 'Zubehör', '€ 112.400', '+9%']
        ]
      },
      config: {
        showBorders: true,
        alternatingRows: true
      }
    }
  ]);
  
  const [filters, setFilters] = useState<Filter[]>([
    {
      id: 'f1',
      name: 'Zeitraum',
      type: 'daterange',
      value: { start: '01.01.2023', end: '30.06.2023' }
    },
    {
      id: 'f2',
      name: 'Produktkategorie',
      type: 'dropdown',
      options: ['Alle', 'Fahrzeugteile', 'Elektronik', 'Innenausstattung', 'Zubehör', 'Service'],
      value: 'Alle'
    },
    {
      id: 'f3',
      name: 'Region',
      type: 'dropdown',
      options: ['Alle', 'Nord', 'Süd', 'Ost', 'West', 'Zentral'],
      value: 'Alle'
    }
  ]);
  
  const [activeTab, setActiveTab] = useState<'report' | 'data' | 'model'>('report');
  const [selectedViz, setSelectedViz] = useState<string | null>(null);
  
  const renderBarChart = (viz: Visualization) => {
    const { categories, values } = viz.data;
    const maxValue = Math.max(...values);
    const colors = [
      'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900'
    ];
    
    // Format value with proper currency
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(value);
    };
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm">{viz.title}</h3>
          <div className="flex space-x-1">
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Y-axis labels */}
        <div className="flex flex-1 mt-1">
          <div className="flex flex-col justify-between pr-2 text-[10px] text-gray-500">
            <div>{formatCurrency(maxValue)}</div>
            <div>{formatCurrency(maxValue * 0.75)}</div>
            <div>{formatCurrency(maxValue * 0.5)}</div>
            <div>{formatCurrency(maxValue * 0.25)}</div>
            <div>€0</div>
          </div>
          
          {/* Horizontal grid lines and bars */}
          <div className="relative flex-1">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="h-px bg-gray-200 w-full"></div>
              <div className="h-px bg-gray-200 w-full"></div>
              <div className="h-px bg-gray-200 w-full"></div>
              <div className="h-px bg-gray-200 w-full"></div>
              <div className="h-px bg-gray-200 w-full"></div>
            </div>
            
            {/* Actual bars */}
            <div className="flex items-end h-full space-x-3">
              {categories.map((category: string, index: number) => {
                const value = values[index];
                const height = `${(value / maxValue) * 100}%`;
                
                return (
                  <div key={category} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full">
                      <div 
                        className={`w-full ${colors[index % colors.length]} rounded-t-sm transition-all duration-300 ease-out group-hover:brightness-110`}
                        style={{ height, minHeight: '4px' }}
                      ></div>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-gray-800 text-white text-xs rounded p-1 whitespace-nowrap">
                          {formatCurrency(value)}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs mt-1 truncate w-full text-center font-medium text-gray-600" style={{ fontSize: '0.7rem' }}>{category}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderLineChart = (viz: Visualization) => {
    const { categories, series } = viz.data;
    
    // Find the maximum value across all series for scaling
    const allValues = series.flatMap((s: any) => s.values);
    const maxValue = Math.max(...allValues);
    
    // Format value with proper currency
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(value);
    };
    
    // Calculate points for the SVG polyline
    const calculatePoints = (values: number[]) => {
      // Width step for each point on the x-axis
      const step = 100 / (values.length - 1);
      
      return values.map((value, index) => {
        // invert y because SVG's y-axis is inverted
        // normalize value to the 0-100 range
        const x = index * step;
        const y = 100 - ((value / maxValue) * 100);
        return `${x},${y}`;
      }).join(' ');
    };
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm">{viz.title}</h3>
          <div className="flex space-x-1">
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex flex-1 mt-1">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between pr-2 text-[10px] text-gray-500">
            <div>{formatCurrency(maxValue)}</div>
            <div>{formatCurrency(maxValue * 0.75)}</div>
            <div>{formatCurrency(maxValue * 0.5)}</div>
            <div>{formatCurrency(maxValue * 0.25)}</div>
            <div>€0</div>
          </div>
          
          <div className="relative flex-1">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="h-px bg-gray-200 w-full"></div>
              <div className="h-px bg-gray-200 w-full"></div>
              <div className="h-px bg-gray-200 w-full"></div>
              <div className="h-px bg-gray-200 w-full"></div>
              <div className="h-px bg-gray-200 w-full"></div>
            </div>
            
            {/* Enhanced line chart visualization */}
            <div className="absolute inset-0 pt-1 pb-6">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Line for 2023 */}
                <polyline
                  points={calculatePoints(series[0].values)}
                  fill="none"
                  stroke="#0078D4"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  className="filter drop-shadow-sm"
                />
                
                {/* Line for 2022 */}
                <polyline
                  points={calculatePoints(series[1].values)}
                  fill="none"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                  strokeLinejoin="round"
                />
                
                {/* Data points for 2023 */}
                {series[0].values.map((value: number, index: number) => {
                  const x = index * (100 / (series[0].values.length - 1));
                  const y = 100 - ((value / maxValue) * 100);
                  return (
                    <circle 
                      key={`point-${index}`}
                      cx={x} 
                      cy={y} 
                      r="2.5" 
                      fill="#0078D4" 
                      stroke="white" 
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 w-full flex justify-between px-2">
              {categories.map((cat: string) => (
                <div key={cat} className="text-center text-xs text-gray-600 font-medium">{cat}</div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-1 flex justify-end space-x-4 px-6">
          {series.map((s: any) => (
            <div key={s.name} className="flex items-center text-xs">
              <div 
                className={`w-3 h-1.5 mr-1 ${s.name === '2023' ? 'bg-blue-500' : 'bg-gray-500'}`}
                style={s.name === '2022' ? { borderTop: '1px dashed #777' } : {}}
              ></div>
              <span className="text-gray-600">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderKPI = (viz: Visualization) => {
    const { value, target, trend } = viz.data;
    const isPositive = trend > 0;
    
    // Format value with proper currency
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(value);
    };
    
    const percentage = (value / target * 100).toFixed(1);
    
    return (
      <div className="flex flex-col h-full justify-center items-center p-2">
        <h3 className="font-medium text-sm mb-1 text-gray-700">{viz.title}</h3>
        <div className="text-3xl font-bold text-gray-900">
          {formatCurrency(value).replace('€', '').trim()}
          <span className="text-sm ml-1 font-normal">€</span>
        </div>
        
        <div className="flex items-center space-x-2 mt-1.5">
          <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <svg className={`w-4 h-4 mr-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
            </svg>
            <span>{trend}%</span>
          </div>
          
          <div className="text-xs text-gray-500">vs. Vorjahr</div>
        </div>
        
        {/* Progress bar showing actual vs target */}
        <div className="mt-3 w-full px-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Ziel: {formatCurrency(target)}</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${Number(percentage) >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${Math.min(Number(percentage), 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderPieChart = (viz: Visualization) => {
    const { categories, values } = viz.data;
    const total = values.reduce((sum: number, val: number) => sum + val, 0);
    
    // Color palette for the pie segments
    const colors = [
      '#4285F4', // Blue
      '#34A853', // Green
      '#FBBC05', // Yellow
      '#EA4335', // Red
      '#8430CE'  // Purple
    ];
    
    // Format value with proper currency
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(value);
    };
    
    // Calculate percentage for each segment
    const percentages = values.map((value: number) => ((value / total) * 100).toFixed(1));
    
    // Calculate SVG paths for pie segments
    // This is a simplified approach - in a real implementation, you'd use a library like d3.js
    // to calculate precise SVG paths for the pie segments
    const generatePieSegments = () => {
      let cumulativePercentage = 0;
      
      return values.map((value: number, index: number) => {
        const percentage = (value / total) * 100;
        const startAngle = (cumulativePercentage / 100) * 360;
        cumulativePercentage += percentage;
        const endAngle = (cumulativePercentage / 100) * 360;
        
        // Convert angles to radians and calculate path
        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (endAngle - 90) * Math.PI / 180;
        
        const centerX = 50;
        const centerY = 50;
        const radius = 40;
        
        const startX = centerX + radius * Math.cos(startRad);
        const startY = centerY + radius * Math.sin(startRad);
        const endX = centerX + radius * Math.cos(endRad);
        const endY = centerY + radius * Math.sin(endRad);
        
        // Determine if the arc should take the long path (> 180 degrees)
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        
        // Create SVG path
        const path = [
          `M ${centerX} ${centerY}`,
          `L ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          'Z'
        ].join(' ');
        
        return { path, color: colors[index % colors.length] };
      });
    };
    
    const pieSegments = generatePieSegments();
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm">{viz.title}</h3>
          <div className="flex space-x-1">
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex">
          {/* Pie chart on the left */}
          <div className="flex items-center justify-center w-1/2">
            <div className="relative">
              <svg width="100" height="100" viewBox="0 0 100 100">
                {pieSegments.map((segment: any, i: number) => (
                  <path
                    key={i}
                    d={segment.path}
                    fill={segment.color}
                    stroke="white"
                    strokeWidth="1"
                    className="hover:opacity-90 transition-opacity cursor-pointer"
                  />
                ))}
                {/* Optional inner circle to create a donut chart */}
                <circle cx="50" cy="50" r="15" fill="white" />
              </svg>
            </div>
          </div>
          
          {/* Legend on the right */}
          <div className="w-1/2">
            <div className="space-y-2">
              {categories.map((category: string, index: number) => (
                <div key={category} className="flex items-center text-xs">
                  <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors[index % colors.length] }}></div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{category}</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-gray-600">{formatCurrency(values[index])}</span>
                      <span className="text-gray-400 text-[10px]">({percentages[index]}%)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderTable = (viz: Visualization) => {
    const { columns, rows } = viz.data;
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm">{viz.title}</h3>
          <div className="flex space-x-1">
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div className="overflow-y-auto h-full">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {columns.map((column: string, idx: number) => (
                    <th key={column} className="px-2 py-1.5 text-left font-medium text-gray-600 border-b border-gray-300 sticky top-0 bg-gray-50 z-10 select-none">
                      <div className="flex items-center">
                        <span>{column}</span>
                        {idx > 0 && (
                          <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                {rows.map((row: any, rowIndex: number) => (
                  <tr 
                    key={rowIndex} 
                    className={`${rowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors cursor-pointer`}
                  >
                    {row.map((cell: any, cellIndex: number) => (
                      <td 
                        key={cellIndex} 
                        className={`px-2 py-1.5 border-b border-gray-200 ${cellIndex === 0 ? 'font-medium' : ''}`}
                      >
                        {cellIndex === 3 ? (
                          <span className={`px-1.5 py-0.5 rounded-full text-xs ${cell.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {cell}
                          </span>
                        ) : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2 px-1 text-xs text-gray-500">
          <div>Anzeige 1-{rows.length} von {rows.length}</div>
          <div className="flex space-x-1">
            <button className="px-1.5 py-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent" disabled>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-1.5 py-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent" disabled>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderVisualization = (viz: Visualization) => {
    switch (viz.type) {
      case 'bar':
        return renderBarChart(viz);
      case 'line':
        return renderLineChart(viz);
      case 'kpi':
        return renderKPI(viz);
      case 'pie':
        return renderPieChart(viz);
      case 'table':
        return renderTable(viz);
      default:
        return <div>Visualisierung nicht unterstützt</div>;
    }
  };
  
  return (
    <div className="power-bi-demo border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="bg-[#F2C811] text-black p-2 flex items-center">
        <div className="mr-2 bg-white text-[#F2C811] rounded-full h-6 w-6 flex items-center justify-center font-bold">P</div>
        <span className="font-medium">Power BI - Vertriebsleistungsanalyse</span>
        <div className="ml-auto flex space-x-2">
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-sm text-sm flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button className="bg-white px-3 py-1 rounded-sm text-sm font-medium text-black flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Teilen
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex space-x-4 text-sm">
          <button 
            className={`py-1 px-3 ${activeTab === 'report' ? 'bg-white shadow-sm rounded font-medium' : 'hover:bg-gray-100 rounded text-gray-700'} transition-colors`}
            onClick={() => setActiveTab('report')}
          >
            Bericht
          </button>
          <button 
            className={`py-1 px-3 ${activeTab === 'data' ? 'bg-white shadow-sm rounded font-medium' : 'hover:bg-gray-100 rounded text-gray-700'} transition-colors`}
            onClick={() => setActiveTab('data')}
          >
            Daten
          </button>
          <button 
            className={`py-1 px-3 ${activeTab === 'model' ? 'bg-white shadow-sm rounded font-medium' : 'hover:bg-gray-100 rounded text-gray-700'} transition-colors`}
            onClick={() => setActiveTab('model')}
          >
            Modell
          </button>
        </div>
        
        <div className="flex items-center">
          <button className="p-1 rounded-sm hover:bg-gray-200">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="px-3 py-2 border-b border-gray-200 bg-white">
        <div className="flex flex-wrap items-center gap-3">
          {filters.map(filter => (
            <div key={filter.id} className="inline-flex items-center">
              <span className="text-xs font-medium mr-1.5 text-gray-600">{filter.name}:</span>
              {filter.type === 'dropdown' && (
                <select className="bg-white border border-gray-300 text-xs rounded px-2 py-1 text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                  {filter.options?.map((option: string) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
              {filter.type === 'daterange' && (
                <div className="flex items-center text-xs">
                  <span className="bg-white border border-gray-300 rounded px-2 py-1 text-gray-700">{filter.value.start}</span>
                  <span className="mx-1 text-gray-500">-</span>
                  <span className="bg-white border border-gray-300 rounded px-2 py-1 text-gray-700">{filter.value.end}</span>
                </div>
              )}
            </div>
          ))}
          
          <button className="ml-auto text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Filter hinzufügen
          </button>
        </div>
      </div>
      
      <div className="dashboard-grid p-4 bg-gray-100 h-[450px] overflow-y-auto">
        <div className="grid grid-cols-12 gap-4 auto-rows-[minmax(120px,auto)]">
          {visualizations.map((viz: Visualization) => {
            const { x, y, w, h } = viz.position;
            const isSelected = selectedViz === viz.id;
            
            return (
              <motion.div 
                key={viz.id}
                className={`col-span-${w} row-span-${h} bg-white rounded-lg shadow-sm overflow-hidden ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                style={{ gridColumnStart: x + 1, gridRowStart: y + 1 }}
                onClick={() => setSelectedViz(viz.id)}
                whileHover={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 h-full">
                  {renderVisualization(viz)}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-4 text-center">
          <button className="px-4 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50 flex items-center mx-auto">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Visualisierung hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
} 