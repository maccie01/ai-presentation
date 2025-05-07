'use client';

import React, { useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import Tabs from '@/components/ui/Tabs';
import InfoCard from '@/components/ui/InfoCard';
import { useTheme } from '@/lib/themeContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Market size prediction data
const marketGrowthData: ChartData<'line'> = {
  labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034'],
  datasets: [
    {
      label: 'Marktprognose (Precedence Research)',
      data: [638.23, 880.76, 1050.36, 1252.02, 1492.42, 1779.43, 2122.07, 2529.55, 3016.03, 3595.99, 3680.47],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.3,
      yAxisID: 'y',
    },
    {
      label: 'Marktprognose (Fortune Business)',
      data: [233.46, 301.43, 389.04, 502.20, 648.36, 837.00, 1080.51, 1394.33, 1771.62, null, null],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.3,
      yAxisID: 'y',
    }
  ],
};

// Technology segment market share
const marketShareData: ChartData<'doughnut'> = {
  labels: ['Deep Learning', 'Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Andere KI-Technologien'],
  datasets: [
    {
      data: [37.4, 26.5, 14.8, 12.7, 8.6],
      backgroundColor: [
        'rgba(53, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
      borderColor: [
        'rgb(53, 162, 235)',
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 159, 64)',
        'rgb(153, 102, 255)',
      ],
      borderWidth: 1,
    },
  ],
};

// Regional AI adoption data
const regionalAdoptionData: ChartData<'bar'> = {
  labels: ['Global', 'Nordamerika', 'Europa (Großunternehmen)', 'Europa (Alle Unternehmen)', 'Asien-Pazifik', 'IT & Kommunikation', 'Finanzsektor'],
  datasets: [
    {
      label: 'KI-Adoptionsrate in % (2024)',
      data: [72, 82, 41.17, 13.48, 68, 57.3, 17.4],
      backgroundColor: 'rgba(53, 162, 235, 0.8)',
      borderColor: 'rgb(53, 162, 235)',
      borderWidth: 1,
    }
  ],
};

// Key statistics for cards
const keyStats = [
  {
    title: "Gesamte Marktgröße 2024",
    value: "638,23 Mrd. $",
    change: "+174% in zwei Jahren",
    source: "Precedence Research"
  },
  {
    title: "Prognostiziertes Wachstum 2025",
    value: "38%",
    change: "Jährliches Wachstum",
    source: "Exploding Topics"
  },
  {
    title: "CAGR 2025-2034",
    value: "19,2%",
    change: "Compound Annual Growth Rate",
    source: "Precedence Research"
  },
  {
    title: "KI-Startup-Investitionen 2023",
    value: "25%",
    change: "Aller US-Startup-Investitionen",
    source: "Fortune Business Insights"
  }
];

// Main component
const AiInvestmentTrends: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="ai-investment-trends">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {keyStats.map((stat, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg shadow-sm flex flex-col"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div className="text-sm font-medium mb-2" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.9)' : 'rgba(107, 114, 128, 0.9)' }}>
                {stat.title}
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs mt-auto flex justify-between items-end">
                <span style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.9)' : 'rgba(107, 114, 128, 0.9)' }}>
                  {stat.change}
                </span>
                <span style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
                  Quelle: {stat.source}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg shadow-sm p-4" style={{ 
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            border: '1px solid var(--border-color)'
          }}>
            <PHeading tag="h4" size="small" className="mb-3">
              KI-Marktprognose bis 2034
            </PHeading>
            <PText className="text-sm mb-4">
              Langfristige Wachstumsprognosen für den globalen KI-Markt von führenden Marktforschungsinstituten.
              Die Prognosen variieren, zeigen jedoch übereinstimmend ein starkes Wachstum in den kommenden Jahren.
            </PText>
            <div className="h-80 w-full">
              <Line 
                data={marketGrowthData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          let label = context.dataset.label || '';
                          if (label) {
                            label += ': ';
                          }
                          if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('de-DE', { 
                              style: 'currency', 
                              currency: 'USD',
                              maximumFractionDigits: 0,
                              notation: 'compact',
                              compactDisplay: 'short'
                            }).format(context.parsed.y * 1000000000);
                          }
                          return label;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Marktgröße (Mrd. USD)'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Jahr'
                      }
                    }
                  }
                }}
              />
            </div>
            <div className="text-xs mt-2 text-right" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
              Quellen: Precedence Research, Fortune Business Insights (2024)
            </div>
          </div>
          
          <div className="rounded-lg shadow-sm p-4" style={{ 
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            border: '1px solid var(--border-color)'
          }}>
            <PHeading tag="h4" size="small" className="mb-3">
              KI-Adoptionsraten nach Region und Branche (2024)
            </PHeading>
            <PText className="text-sm mb-4">
              Die Adoptionsrate von KI-Technologien variiert stark nach Region und Branchensektor. 
              Nordamerika führt bei der Adoption, während in Europa besonders Großunternehmen KI einsetzen.
            </PText>
            <div className="h-80 w-full">
              <Bar 
                data={regionalAdoptionData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          let label = context.dataset.label || '';
                          if (label) {
                            label += ': ';
                          }
                          if (context.parsed.y !== null) {
                            label += context.parsed.y + '%';
                          }
                          return label;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      title: {
                        display: true,
                        text: 'Adoptionsrate (%)'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Region/Sektor'
                      }
                    }
                  }
                }}
              />
            </div>
            <div className="text-xs mt-2 text-right" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
              Quellen: McKinsey, Eurostat, Precedence Research (2024)
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="rounded-lg shadow-sm p-4" style={{ 
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
              border: '1px solid var(--border-color)'
            }}>
              <PHeading tag="h4" size="small" className="mb-3">
                Marktanteil nach KI-Technologiesegment (2024)
              </PHeading>
              <PText className="text-sm mb-4">
                Deep Learning dominiert den KI-Markt mit dem größten Anteil, gefolgt von traditionellen Machine-Learning-Technologien.
              </PText>
              <div className="h-64 w-full flex justify-center">
                <div style={{ maxWidth: '300px', width: '100%' }}>
                  <Doughnut 
                    data={marketShareData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom' as const,
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              let label = context.label || '';
                              if (label) {
                                label += ': ';
                              }
                              if (context.parsed !== null) {
                                label += context.parsed + '%';
                              }
                              return label;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div className="text-xs mt-2 text-right" style={{ color: isDarkMode ? 'rgba(156, 163, 175, 0.7)' : 'rgba(107, 114, 128, 0.7)' }}>
                Quelle: Precedence Research (2024)
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <InfoCard title="Wichtige Beobachtungen zur KI-Marktentwicklung" variant="info">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <strong>Sprunghafte Adoption:</strong> Die Adoptionsrate von KI in Unternehmen stieg laut McKinsey auf 72% in 2024, 
                  nachdem sie sechs Jahre lang bei etwa 50% stagnierte.
                </li>
                <li>
                  <strong>Regionale Unterschiede:</strong> In der EU nutzen 13,48% aller Unternehmen KI-Technologien, während die Rate bei 
                  Großunternehmen mit 41,17% deutlich höher liegt.
                </li>
                <li>
                  <strong>Branchenführer:</strong> Die Informations- und Kommunikationsbranche hat die höchste Adoptionsrate, gefolgt vom Finanzsektor 
                  mit 17,4% Marktanteil.
                </li>
                <li>
                  <strong>Textanalyse dominiert:</strong> Die am häufigsten verwendeten KI-Technologien in EU-Unternehmen sind solche für
                  Textanalyse (Text Mining), mit einer Nutzungsrate von 6,88%.
                </li>
                <li>
                  <strong>Startups im Fokus:</strong> 2023 flossen etwa 25% aller Investitionen in amerikanische Startups in KI-bezogene Unternehmen,
                  was das hohe Interesse an KI-Innovationen unterstreicht.
                </li>
              </ul>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInvestmentTrends; 