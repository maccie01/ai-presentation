'use client';

import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  TooltipItem,
} from 'chart.js';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import Tabs from '@/components/ui/Tabs';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Technology adoption data
const adoptionData: ChartData<'line'> = {
  labels: ['2023', '2024', '2025', '2026', '2027', '2028'],
  datasets: [
    {
      label: 'Generative KI',
      data: [35, 55, 70, 78, 83, 86],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.3,
    },
    {
      label: 'KI-Agenten',
      data: [15, 28, 45, 65, 75, 82],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Multimodale Modelle',
      data: [10, 25, 48, 62, 75, 80],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Lokale KI-Modelle',
      data: [5, 18, 38, 55, 70, 80],
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      tension: 0.3,
    },
    {
      label: 'KI-Governance-Frameworks',
      data: [8, 20, 40, 60, 75, 85],
      borderColor: 'rgb(153, 102, 255)',
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      tension: 0.3,
    },
  ],
};

// Capability evolution data
const capabilityData: ChartData<'line'> = {
  labels: ['2023', '2024', '2025', '2026', '2027', '2028'],
  datasets: [
    {
      label: 'Multilinguale Fähigkeiten',
      data: [60, 70, 80, 85, 90, 95],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Reasoning & Problemlösung',
      data: [40, 55, 68, 78, 85, 90],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Bild/Video-Verständnis',
      data: [35, 50, 65, 75, 85, 90],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Domänenspezifisches Wissen',
      data: [30, 45, 60, 75, 85, 90],
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Code-Generierung & Verständnis',
      data: [50, 65, 75, 82, 88, 92],
      borderColor: 'rgb(153, 102, 255)',
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      tension: 0.3,
    },
  ],
};

// Impact assessment data
const impactData: ChartData<'bar'> = {
  labels: [
    'Software-Entwicklung',
    'Kundenservice',
    'Datenanalyse',
    'Autonomes Fahren',
    'Gesundheitswesen',
    'Logistik',
    'Fertigung',
  ],
  datasets: [
    {
      label: 'Effizienzsteigerung (%)',
      data: [45, 65, 60, 40, 55, 50, 35],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: 'rgb(53, 162, 235)',
      borderWidth: 1,
    },
    {
      label: 'Kostenreduktion (%)',
      data: [30, 40, 35, 25, 30, 45, 30],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1,
    },
    {
      label: 'Neue Geschäftsmöglichkeiten (Skalenwert 1-10)',
      data: [8.5, 7, 8, 9, 9.5, 7.5, 6.5],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1,
    },
  ],
};

interface TrendCardProps {
  title: string;
  description: string;
  timeline: string;
  impact: string;
}

const trendCards: TrendCardProps[] = [
  {
    title: "Multi-Agenten KI-Systeme",
    description: "Mehrere KI-Agenten arbeiten zusammen, um komplexe Aufgaben zu lösen, die über die Fähigkeiten einzelner Modelle hinausgehen.",
    timeline: "2025-2026",
    impact: "Hoch - Ermöglicht vollautomatisierte Geschäftsprozesse und komplexe Entscheidungsfindung.",
  },
  {
    title: "Domain-Specific LLMs",
    description: "Spezialisierte große Sprachmodelle für bestimmte Branchen und Anwendungsfälle, mit tiefem Domänenwissen.",
    timeline: "2024-2025",
    impact: "Sehr hoch - Steigert die Relevanz und Genauigkeit in spezifischen Geschäftsanwendungen.",
  },
  {
    title: "KI-Agenten mit langfristigem Gedächtnis",
    description: "Systeme, die Interaktionshistorie über lange Zeiträume speichern und nutzen können.",
    timeline: "2025-2026",
    impact: "Mittel bis hoch - Ermöglicht kontinuierliches Lernen und Anpassung an Benutzer.",
  },
  {
    title: "KI im Edge-Computing",
    description: "Ausführung von KI-Modellen direkt auf Edge-Geräten ohne Cloud-Abhängigkeit.",
    timeline: "2024-2025",
    impact: "Hoch - Verbessert Datenschutz, Latenz und Offline-Verfügbarkeit von KI-Anwendungen.",
  },
  {
    title: "Multimodale Interfaces",
    description: "KI-Systeme, die nahtlos zwischen Text, Sprache, Bild und Video wechseln können.",
    timeline: "2024",
    impact: "Sehr hoch - Revolutioniert die Mensch-Maschine-Interaktion und Zugänglichkeit.",
  },
  {
    title: "Autonome KI-Systeme",
    description: "Selbstständig handelnde KI-Systeme mit eigenen Zielen und Entscheidungsfindung.",
    timeline: "2026-2027",
    impact: "Transformativ - Könnte Automatisierung auf völlig neue Ebenen heben.",
  },
];

export default function TrendsForecast() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  // Prepare tabs content
  const adoptionCurvesContent = (
    <div className="py-4">
      <div className="mb-6">
        <PText className="mb-2">
          Diese Kurven zeigen die prognostizierte Adoptionsrate verschiedener KI-Technologien in Unternehmen über die kommenden Jahre.
          Der Prozentsatz gibt an, wie viele Unternehmen die jeweilige Technologie voraussichtlich implementieren werden.
        </PText>
      </div>
      <div className="h-80 w-full">
        <Line 
          data={adoptionData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              tooltip: {
                callbacks: {
                  label: function(context: TooltipItem<'line'>) {
                    return `${context.dataset.label}: ${context.parsed.y}%`;
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
                  text: 'Jahr'
                }
              }
            }
          }}
        />
      </div>
    </div>
  );

  const capabilityEvolutionContent = (
    <div className="py-4">
      <div className="mb-6">
        <PText className="mb-2">
          Diese Entwicklungskurven illustrieren, wie sich die Fähigkeiten von KI-Systemen in verschiedenen Bereichen
          voraussichtlich verbessern werden. Die Werte repräsentieren ein relatives Leistungsniveau im Vergleich zum
          menschlichen Fähigkeitsniveau (100 = menschliche Leistung).
        </PText>
      </div>
      <div className="h-80 w-full">
        <Line 
          data={capabilityData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              tooltip: {
                callbacks: {
                  label: function(context: TooltipItem<'line'>) {
                    return `${context.dataset.label}: ${context.parsed.y}%`;
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
                  text: 'Fähigkeitsniveau (%)'
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
    </div>
  );

  const impactAssessmentContent = (
    <div className="py-4">
      <div className="mb-6">
        <PText className="mb-2">
          Die folgende Matrix zeigt die erwarteten Auswirkungen von KI-Technologien auf verschiedene Branchen
          in Bezug auf Effizienzsteigerung, Kostenreduktion und neue Geschäftsmöglichkeiten.
        </PText>
      </div>
      <div className="h-80 w-full">
        <Bar 
          data={impactData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Auswirkung'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Branche'
                }
              }
            }
          }}
        />
      </div>
    </div>
  );

  const emergingTrendsContent = (
    <div className="py-4">
      <div className="mb-4">
        <PText>
          Die folgenden aufkommenden Trends werden voraussichtlich die KI-Landschaft in den nächsten Jahren prägen.
          Klicken Sie auf einen Trend für weitere Details.
        </PText>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {trendCards.map((card, index) => (
          <motion.div
            key={index}
            className={`border rounded-lg shadow-sm p-4 cursor-pointer transition-all ${
              expandedCard === index ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200 hover:border-blue-200'
            }`}
            onClick={() => toggleCard(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PHeading tag="h4" size="small" className="mb-2 flex items-center justify-between">
              {card.title}
              <span className={`text-sm px-2 py-1 rounded-full ${
                expandedCard === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}>
                {expandedCard === index ? '−' : '+'}
              </span>
            </PHeading>
            
            {expandedCard === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                <PText size="small" className="mb-2">{card.description}</PText>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="border border-gray-200 rounded p-2 bg-gray-50">
                    <PText size="small" className="font-semibold">Zeitrahmen</PText>
                    <PText size="small">{card.timeline}</PText>
                  </div>
                  <div className="border border-gray-200 rounded p-2 bg-gray-50">
                    <PText size="small" className="font-semibold">Auswirkung</PText>
                    <PText size="small">{card.impact}</PText>
                  </div>
                </div>
              </motion.div>
            )}
            
            {expandedCard !== index && (
              <PText size="small" className="line-clamp-2">{card.description}</PText>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Tabs
        tabs={[
          { id: 'adoption', label: 'Technologie-Adoptionskurven', content: adoptionCurvesContent },
          { id: 'capability', label: 'Fähigkeitsentwicklung', content: capabilityEvolutionContent },
          { id: 'impact', label: 'Auswirkungsmatrix', content: impactAssessmentContent },
          { id: 'trends', label: 'Aufkommende Trends', content: emergingTrendsContent },
        ]}
        variant="pills"
        className="mb-4"
      />
    </div>
  );
} 