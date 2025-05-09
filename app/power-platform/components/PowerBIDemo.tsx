"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/themeContext';

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
  type: 'select' | 'date-range';
  options?: string[];
  value?: any;
}

interface Metric {
  name: string;
  value: string;
  trend: number;
}

export function PowerBIDemo() {
  const { isDarkMode } = useTheme();
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
      id: 'date',
      name: 'Zeitraum',
      type: 'date-range',
      value: { start: '01.01.2023', end: '31.03.2023' }
    },
    {
      id: 'product',
      name: 'Produktkategorie',
      type: 'select',
      options: ['Alle', 'Elektronik', 'Möbel', 'Kleidung', 'Lebensmittel']
    },
    {
      id: 'region',
      name: 'Region',
      type: 'select',
      options: ['Alle', 'Nord', 'Süd', 'Ost', 'West']
    },
    {
      id: 'channel',
      name: 'Vertriebskanal',
      type: 'select',
      options: ['Alle', 'Online', 'Stationär', 'Partner']
    },
  ]);
  
  const [activeTab, setActiveTab] = useState<'report' | 'data' | 'model'>('report');
  const [selectedViz, setSelectedViz] = useState<string | null>(null);
  
  // Define metrics array
  const metrics = [
    {
      name: 'Gesamtumsatz',
      value: '1.35M €',
      trend: 12.5
    },
    {
      name: 'Durchschn. Bestellwert',
      value: '418 €',
      trend: 8.3
    },
    {
      name: 'Konversionsrate',
      value: '4.2%',
      trend: -1.5
    }
  ];
  
  const styles = {
    container: {
      backgroundColor: isDarkMode ? 'var(--card-bg)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      color: isDarkMode ? 'var(--foreground)' : 'inherit',
    },
    header: {
      backgroundColor: isDarkMode ? 'rgba(249, 171, 0, 0.9)' : '#F2C811',
      color: isDarkMode ? '#111827' : 'black',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
    },
    button: {
      standard: {
        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        color: isDarkMode ? 'white' : 'black',
      },
      primary: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'white',
        color: isDarkMode ? 'white' : 'black',
      },
    },
    panel: {
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : '#f9fafb',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
    },
    chart: {
      backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.6)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      gridColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6',
      textColor: isDarkMode ? 'rgba(229, 231, 235, 0.8)' : '#374151',
    },
    input: {
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'white',
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      color: isDarkMode ? 'var(--foreground)' : '#374151',
    },
    text: {
      muted: {
        color: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : '#6b7280',
      },
    },
    metricCard: {
      borderColor: isDarkMode ? 'var(--border-color)' : '#e5e7eb',
      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'white',
      boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
    },
  };
  
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
          <div className="flex flex-col justify-between pr-2 text-[10px] text-gray-500" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : '#6b7280' }}>
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
              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6' }}></div>
              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6' }}></div>
              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6' }}></div>
              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6' }}></div>
              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6' }}></div>
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
                    <div className="text-xs mt-1 truncate w-full text-center font-medium" style={{ fontSize: '0.7rem', color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : '#4b5563' }}>{category}</div>
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
          <div className="flex flex-col justify-between pr-2 text-[10px]" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : '#6b7280' }}>
            <div>{formatCurrency(maxValue)}</div>
            <div>{formatCurrency(maxValue * 0.75)}</div>
            <div>{formatCurrency(maxValue * 0.5)}</div>
            <div>{formatCurrency(maxValue * 0.25)}</div>
            <div>€0</div>
          </div>
          
          <div className="relative flex-1">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6' }}></div>
              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6' }}></div>
              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6' }}></div>
              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6' }}></div>
              <div className="h-px w-full" style={{ backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#f3f4f6' }}></div>
            </div>
            
            {/* Enhanced line chart visualization */}
            <div className="absolute inset-0 pt-1 pb-6">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Line for 2023 */}
                <polyline
                  points={calculatePoints(series[0].values)}
                  fill="none"
                  stroke={isDarkMode ? "#60a5fa" : "#0078D4"}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  className="filter drop-shadow-sm"
                />
                
                {/* Line for 2022 */}
                <polyline
                  points={calculatePoints(series[1].values)}
                  fill="none"
                  stroke={isDarkMode ? "#9ca3af" : "#777777"}
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
                      fill={isDarkMode ? "#60a5fa" : "#0078D4"} 
                      stroke={isDarkMode ? "#1f2937" : "white"} 
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 w-full flex justify-between px-2">
              {categories.map((cat: string) => (
                <div key={cat} className="text-center text-xs font-medium" style={{ color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : '#4b5563' }}>{cat}</div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-1 flex justify-end space-x-4 px-6">
          {series.map((s: any) => (
            <div key={s.name} className="flex items-center text-xs">
              <div 
                className={`w-3 h-1.5 mr-1 ${s.name === '2023' ? (isDarkMode ? 'bg-blue-400' : 'bg-blue-500') : (isDarkMode ? 'bg-gray-400' : 'bg-gray-500')}`}
                style={s.name === '2022' ? { borderTop: `1px dashed ${isDarkMode ? '#9ca3af' : '#777'}` } : {}}
              ></div>
              <span style={{ color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : '#4b5563' }}>{s.name}</span>
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
        <h3 className="font-medium text-sm mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#4b5563' }}>{viz.title}</h3>
        <div className="text-3xl font-bold" style={{ color: isDarkMode ? 'var(--foreground)' : '#111827' }}>
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
          
          <div className="text-xs" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : '#6b7280' }}>vs. Vorjahr</div>
        </div>
        
        {/* Progress bar showing actual vs target */}
        <div className="mt-3 w-full px-2">
          <div className="flex justify-between text-xs mb-1">
            <span style={{ color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : '#4b5563' }}>Ziel: {formatCurrency(target)}</span>
            <span style={{ color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : '#4b5563' }}>{percentage}%</span>
          </div>
          <div className="w-full rounded-full h-2" style={{ backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : '#e5e7eb' }}>
            <div 
              className={`h-2 rounded-full ${Number(percentage) >= 100 ? (isDarkMode ? 'bg-green-500' : 'bg-green-500') : (isDarkMode ? 'bg-blue-500' : 'bg-blue-500')}`}
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
                    stroke={isDarkMode ? "rgba(31, 41, 55, 0.6)" : "white"}
                    strokeWidth="1"
                    className="hover:opacity-90 transition-opacity cursor-pointer"
                  />
                ))}
                {/* Optional inner circle to create a donut chart */}
                <circle cx="50" cy="50" r="15" fill={isDarkMode ? "rgba(31, 41, 55, 0.6)" : "white"} />
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
                    <span className="font-medium" style={{ color: isDarkMode ? 'var(--foreground)' : '#4b5563' }}>{category}</span>
                    <div className="flex items-baseline space-x-1">
                      <span style={{ color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : '#6b7280' }}>{formatCurrency(values[index])}</span>
                      <span style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : '#9ca3af' }} className="text-[10px]">({percentages[index]}%)</span>
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
                <tr style={{ backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : '#f9fafb' }}>
                  {columns.map((column: string, idx: number) => (
                    <th 
                      key={column} 
                      className="px-2 py-1.5 text-left font-medium border-b sticky top-0 z-10 select-none"
                      style={{ 
                        color: isDarkMode ? 'rgba(229, 231, 235, 0.9)' : '#4b5563',
                        borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#e5e7eb',
                        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.6)' : '#f9fafb'
                      }}
                    >
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
                    style={{ 
                      backgroundColor: rowIndex % 2 === 1 
                        ? (isDarkMode ? 'rgba(31, 41, 55, 0.3)' : '#f9fafb') 
                        : (isDarkMode ? 'transparent' : 'white')
                    }}
                    className={`hover:${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'} transition-colors cursor-pointer`}
                  >
                    {row.map((cell: any, cellIndex: number) => (
                      <td 
                        key={cellIndex} 
                        className={`px-2 py-1.5 border-b ${cellIndex === 0 ? 'font-medium' : ''}`}
                        style={{ 
                          borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.4)' : '#e5e7eb',
                          color: isDarkMode ? 'var(--foreground)' : 'inherit'
                        }}
                      >
                        {cellIndex === 3 ? (
                          <span className={`px-1.5 py-0.5 rounded-full text-xs ${cell.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} style={{
                            backgroundColor: cell.startsWith('+') 
                              ? (isDarkMode ? 'rgba(5, 150, 105, 0.2)' : '#d1fae5') 
                              : (isDarkMode ? 'rgba(220, 38, 38, 0.2)' : '#fee2e2'),
                            color: cell.startsWith('+') 
                              ? (isDarkMode ? '#34d399' : '#065f46') 
                              : (isDarkMode ? '#f87171' : '#991b1b')
                          }}>
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
        
        <div className="flex justify-between items-center mt-2 px-1 text-xs" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.8)' : '#6b7280' }}>
          <div>Anzeige 1-{rows.length} von {rows.length}</div>
          <div className="flex space-x-1">
            <button 
              className={`px-1.5 py-1 rounded ${isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} disabled:opacity-30 disabled:hover:bg-transparent`} 
              disabled
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className={`px-1.5 py-1 rounded ${isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100'} disabled:opacity-30 disabled:hover:bg-transparent`} 
              disabled
            >
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
    <div className="power-bi-demo border rounded-lg overflow-hidden" style={styles.container}>
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4" style={styles.header}>
        <div className="flex items-center">
          <span className="font-bold text-lg mr-1">Power BI</span>
          <span className="text-sm opacity-80">| Vertriebsleistungsanalyse</span>
        </div>
        <div className="flex space-x-2">
          <button 
            style={styles.button.standard}
            className="hover:bg-white/30 px-3 py-1 rounded text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </button>
          <button 
            style={styles.button.primary}
            className="px-3 py-1 rounded text-sm font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Aktualisieren
          </button>
        </div>
      </div>
      
      {/* Dashboard toolbar */}
      <div className="border-b border-t h-10 flex items-center px-4" style={{
        borderColor: styles.container.borderColor,
        backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.6)' : '#f9fafb',
      }}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm mr-2" style={styles.text.muted}>Dashboard:</span>
            <select className="text-sm border rounded px-2 py-1" style={styles.input}>
              <option>Vertriebsleistung</option>
              <option>Produktanalyse</option>
              <option>Kundenübersicht</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2" style={styles.text.muted}>Zeitraum:</span>
            <div className="flex items-center text-sm">
              <span className="border rounded px-2 py-1" style={styles.input}>
                01.01.2023
              </span>
              <span className="mx-2">-</span>
              <span className="border rounded px-2 py-1" style={styles.input}>
                31.03.2023
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main dashboard content */}
      <div className="grid grid-cols-12 h-[540px]">
        {/* Left sidebar - filters */}
        <div className="col-span-2 border-r p-4 overflow-y-auto" style={{ borderColor: styles.container.borderColor, backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.5)' : '#f9fafb' }}>
          <h3 className="font-bold text-base mb-4">Filter</h3>
          
          {filters.map((filter, i) => (
            <div key={i} className="mb-4">
              <label className="block text-sm font-medium mb-1" style={{ color: isDarkMode ? 'var(--foreground)' : '#374151' }}>
                {filter.name}
              </label>
              
              {filter.type === 'select' && (
                <select 
                  className="border rounded px-2 py-1 text-xs outline-none w-full"
                  style={styles.input}
                >
                  {filter.options?.map((option, j) => (
                    <option key={j}>{option}</option>
                  ))}
                </select>
              )}
              
              {filter.type === 'date-range' && (
                <div className="flex flex-col space-y-2 text-xs">
                  <div className="flex items-center">
                    <span className="w-10 text-xs" style={styles.text.muted}>Von:</span>
                    <span 
                      className="border rounded px-2 py-1 flex-1"
                      style={styles.input}
                    >
                      {filter.value.start}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-10 text-xs" style={styles.text.muted}>Bis:</span>
                    <span 
                      className="border rounded px-2 py-1 flex-1"
                      style={styles.input}
                    >
                      {filter.value.end}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <button className="w-full mt-2 py-1 text-sm flex justify-center items-center" style={{
            color: isDarkMode ? '#60a5fa' : '#2563eb',
            backgroundColor: isDarkMode ? 'rgba(37, 99, 235, 0.1)' : 'rgba(239, 246, 255, 0.8)',
            borderRadius: '0.25rem',
          }}>
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Filter hinzufügen
          </button>
        </div>
        
        {/* Main content - charts and metrics */}
        <div className="col-span-10 p-5 overflow-y-auto">
          {/* Key metrics */}
          <div className="grid grid-cols-3 gap-5 mb-6">
            {metrics.map((metric, i) => (
              <div 
                key={i}
                className="p-4 rounded-lg border"
                style={styles.metricCard}
              >
                <h4 className="text-sm font-medium mb-1" style={styles.text.muted}>{metric.name}</h4>
                <div className="flex items-end">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span 
                    className={`ml-2 text-xs flex items-center ${
                      metric.trend > 0 ? 'text-green-500' : metric.trend < 0 ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    {metric.trend > 0 ? (
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : metric.trend < 0 ? (
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    ) : null}
                    {Math.abs(metric.trend)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-2 gap-5">
            {/* Bar chart */}
            <div 
              className="border rounded-lg p-4 h-[390px]"
              style={styles.chart}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Umsatz nach Produktkategorie</h3>
                <div className="flex text-xs space-x-1">
                  <button className="p-1 rounded" style={{
                    backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : '#f3f4f6',
                    color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : '#4b5563'
                  }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </button>
                  <button className="p-1 rounded" style={{
                    backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : '#f3f4f6',
                    color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : '#4b5563'
                  }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[320px] relative">
                {/* Bar chart visualization */}
                <div className="absolute bottom-0 left-0 right-0 top-0">
                  <div className="flex items-end h-full relative">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div 
                          key={i} 
                          className="border-b border-dashed h-0 relative" 
                          style={{
                            borderColor: styles.chart.gridColor
                          }}
                        >
                          <span 
                            className="absolute -top-2.5 -left-8 text-[10px]"
                            style={{ color: styles.chart.textColor }}
                          >
                            {(5 - i) * 20}K €
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Static bar chart data instead of using visualizations */}
                    <div className="flex-1 flex flex-col justify-end items-center mx-3">
                      <div 
                        className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{
                          height: '80%',
                          opacity: isDarkMode ? 0.8 : 1
                        }}
                      />
                      <div className="mt-2 text-center">
                        <span 
                          className="block text-xs mb-1"
                          style={{ color: styles.chart.textColor }}
                        >
                          Fahrzeugteile
                        </span>
                        <span className="block text-xs font-medium">
                          80K €
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-end items-center mx-3">
                      <div 
                        className="w-full bg-blue-600 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{
                          height: '65%',
                          opacity: isDarkMode ? 0.8 : 1
                        }}
                      />
                      <div className="mt-2 text-center">
                        <span 
                          className="block text-xs mb-1"
                          style={{ color: styles.chart.textColor }}
                        >
                          Elektronik
                        </span>
                        <span className="block text-xs font-medium">
                          65K €
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-end items-center mx-3">
                      <div 
                        className="w-full bg-blue-700 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{
                          height: '55%',
                          opacity: isDarkMode ? 0.8 : 1
                        }}
                      />
                      <div className="mt-2 text-center">
                        <span 
                          className="block text-xs mb-1"
                          style={{ color: styles.chart.textColor }}
                        >
                          Innenausstattung
                        </span>
                        <span className="block text-xs font-medium">
                          55K €
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-end items-center mx-3">
                      <div 
                        className="w-full bg-blue-800 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{
                          height: '40%',
                          opacity: isDarkMode ? 0.8 : 1
                        }}
                      />
                      <div className="mt-2 text-center">
                        <span 
                          className="block text-xs mb-1"
                          style={{ color: styles.chart.textColor }}
                        >
                          Zubehör
                        </span>
                        <span className="block text-xs font-medium">
                          40K €
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-end items-center mx-3">
                      <div 
                        className="w-full bg-blue-900 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{
                          height: '30%',
                          opacity: isDarkMode ? 0.8 : 1
                        }}
                      />
                      <div className="mt-2 text-center">
                        <span 
                          className="block text-xs mb-1"
                          style={{ color: styles.chart.textColor }}
                        >
                          Service
                        </span>
                        <span className="block text-xs font-medium">
                          30K €
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pie chart */}
            <div 
              className="border rounded-lg p-4 h-[390px]"
              style={styles.chart}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Umsatz nach Region</h3>
                <div className="flex text-xs space-x-1">
                  <button className="p-1 rounded" style={{
                    backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : '#f3f4f6',
                    color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : '#4b5563'
                  }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </button>
                  <button className="p-1 rounded" style={{
                    backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : '#f3f4f6',
                    color: isDarkMode ? 'rgba(209, 213, 219, 0.9)' : '#4b5563'
                  }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[320px] flex items-center justify-center">
                {/* Pie chart visualization */}
                <div className="relative h-[220px] w-[220px]">
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    {/* Use predefined pie segments instead of trying to use paths from viz.config */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#4285F4"
                      strokeWidth="20"
                      strokeDasharray="70 30"
                      transform="rotate(-90) translate(-100, 0)"
                      opacity={isDarkMode ? 0.8 : 1}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#34A853"
                      strokeWidth="20"
                      strokeDasharray="50 50"
                      transform="rotate(180) translate(-100, -100)"
                      opacity={isDarkMode ? 0.8 : 1}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#FBBC05"
                      strokeWidth="20"
                      strokeDasharray="40 60"
                      transform="rotate(90) translate(0, -100)"
                      opacity={isDarkMode ? 0.8 : 1}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#EA4335"
                      strokeWidth="20"
                      strokeDasharray="25 75"
                      transform="rotate(0) translate(0, 0)"
                      opacity={isDarkMode ? 0.8 : 1}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill={isDarkMode ? 'rgba(31, 41, 55, 0.6)' : 'white'}
                    />
                  </svg>
                </div>
                <div className="ml-8">
                  {/* Static region data instead of using the visualizations */}
                  <div className="flex items-center mb-3">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ 
                        backgroundColor: "#4285F4",
                        opacity: isDarkMode ? 0.8 : 1
                      }}
                    />
                    <div>
                      <span className="block text-sm" style={{ color: styles.chart.textColor }}>
                        Nord
                      </span>
                      <span className="text-sm font-medium">
                        35%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ 
                        backgroundColor: "#34A853",
                        opacity: isDarkMode ? 0.8 : 1
                      }}
                    />
                    <div>
                      <span className="block text-sm" style={{ color: styles.chart.textColor }}>
                        Süd
                      </span>
                      <span className="text-sm font-medium">
                        25%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ 
                        backgroundColor: "#FBBC05",
                        opacity: isDarkMode ? 0.8 : 1
                      }}
                    />
                    <div>
                      <span className="block text-sm" style={{ color: styles.chart.textColor }}>
                        Ost
                      </span>
                      <span className="text-sm font-medium">
                        20%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ 
                        backgroundColor: "#EA4335",
                        opacity: isDarkMode ? 0.8 : 1
                      }}
                    />
                    <div>
                      <span className="block text-sm" style={{ color: styles.chart.textColor }}>
                        West
                      </span>
                      <span className="text-sm font-medium">
                        20%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 