"use client";

import React, { useMemo } from 'react';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import InfoCard from '@/components/ui/InfoCard';
import FlowDiagram from '@/components/interactive/FlowDiagram';

interface LogAnalysisVisualizationProps {
  title: string;
  description: string;
}

const LogAnalysisVisualization: React.FC<LogAnalysisVisualizationProps> = ({ title, description }) => {
  // Memoize nodes and edges separately with proper dependency arrays
  const logNodes = useMemo(() => [
    { id: '1', position: { x: 50, y: 100 }, data: { label: 'Fahrzeug-Logs' }, type: 'input' },
    { id: '2', position: { x: 250, y: 50 }, data: { label: 'Telemetrie-Daten' } },
    { id: '3', position: { x: 250, y: 150 }, data: { label: 'Diagnose-Logs' } },
    { id: '4', position: { x: 450, y: 100 }, data: { label: 'Log-Aggregation' } },
    { id: '5', position: { x: 650, y: 100 }, data: { label: 'KI-Analyse' } },
    { id: '6', position: { x: 850, y: 50 }, data: { label: 'Anomalie-Erkennung' } },
    { id: '7', position: { x: 850, y: 150 }, data: { label: 'Muster-Erkennung' } },
    { id: '8', position: { x: 1050, y: 100 }, data: { label: 'Alerts & Reports' }, type: 'output' }
  ], []);
  
  const logEdges = useMemo(() => [
    { id: 'e1-4', source: '1', target: '4', animated: true },
    { id: 'e2-4', source: '2', target: '4', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true },
    { id: 'e5-6', source: '5', target: '6', animated: true },
    { id: 'e5-7', source: '5', target: '7', animated: true },
    { id: 'e6-8', source: '6', target: '8', animated: true },
    { id: 'e7-8', source: '7', target: '8', animated: true }
  ], []);

  // Crucial fix: Memoize ALL props passed to FlowDiagram to prevent re-renders
  const flowDiagramProps = useMemo(() => ({
    initialNodes: logNodes,
    initialEdges: logEdges,
    fitView: true,
    readOnly: true,
    enablePanAndZoom: false
  }), [logNodes, logEdges]);

  // Example log patterns for automotive systems
  const logPatterns = [
    {
      title: "ECU Kommunikationsfehler",
      pattern: "CAN_ERROR: ECU [0x742] Timeout nach 3 Versuchen",
      significance: "Kann auf Hardware-Fehler oder Netzwerkprobleme hindeuten",
      severity: "Hoch"
    },
    {
      title: "Battery Management System Warnung",
      pattern: "BMS_WARNING: Cell-Voltage-Imbalance > 200mV detected",
      significance: "Potentielles Problem mit Batteriezelle oder BMS",
      severity: "Mittel"
    },
    {
      title: "OTA Update Fehlschlag",
      pattern: "OTA_ERROR: Signature verification failed for package [fw_v2.3.14]",
      significance: "Sicherheitsrisiko oder Datenkorruption",
      severity: "Kritisch"
    },
    {
      title: "Sensor-Kalibrierung",
      pattern: "SENSOR: Recalibration required for [LIDAR_FRONT] - Confidence: 72%",
      significance: "Beeinträchtigte Sensorgenauigkeit",
      severity: "Niedrig"
    },
    {
      title: "Sicherheitswarnung",
      pattern: "SECURITY: Multiple authentication failures for diagnostic session",
      significance: "Potentieller Angriffsversuch",
      severity: "Kritisch"
    }
  ];

  // Alert classification schema
  const alertClassification = [
    { 
      category: "Fahrzeugsicherheit",
      description: "Betrifft funktionale Sicherheit und Fahrzeugsteuerung",
      examples: ["Bremssystemfehler", "Stabilitätskontrollfehlfunktion", "Airbag-Systemwarnung"],
      responseTime: "Sofort (< 1 Stunde)",
      notification: "Fahrer + Service-Center + Entwicklung"
    },
    { 
      category: "Cybersicherheit",
      description: "Betrifft potenzielle oder tatsächliche Sicherheitsverletzungen",
      examples: ["Unbefugter Zugriffsversuch", "Unerwartete Firmware-Änderung", "Kommunikationsanomalien"],
      responseTime: "Kritisch (< 4 Stunden)",
      notification: "Security Team + Entwicklung"
    },
    { 
      category: "Fahrzeugdiagnostik",
      description: "Betrifft vorhersehbare Wartung und Systemdiagnose",
      examples: ["Akkumulierte Fehlercodes", "Abnormale Sensorwerte", "Kalibrierungsabweichungen"],
      responseTime: "Standard (< 24 Stunden)",
      notification: "Service-Center"
    },
    { 
      category: "Betriebsoptimierung",
      description: "Betrifft Effizienz und Performanz ohne unmittelbare Risiken",
      examples: ["Kraftstoffeffizienz-Abweichungen", "Unoptimale Routennutzung", "Software-Performance"],
      responseTime: "Niedrig (< 1 Woche)",
      notification: "Produkt-Management"
    }
  ];

  return (
    <div className="w-full">
      <PHeading tag="h3" size="medium" className="mb-4">{title}</PHeading>
      <PText className="mb-6">{description}</PText>

      <PGrid>
        <PGridItem size={12} className="mb-8">
          <InfoCard 
            title="Log-Verarbeitungspipeline"
            icon="chart"
            variant="info"
            className="mb-4"
          >
            <PText>KI-gestützte Verarbeitung von Fahrzeugdaten für Anomalieerkennung und proaktive Fehleridentifikation</PText>
          </InfoCard>
          
          <div className="w-full h-[400px] rounded-md" style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)'
          }}>
            {/* Use the spread operator with memoized props object */}
            <FlowDiagram {...flowDiagramProps} />
          </div>
        </PGridItem>

        <PGridItem size={12} className="mb-8">
          <PHeading tag="h4" size="small" className="mb-3">Typische Log-Muster in Automotive-Systemen</PHeading>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-md" style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--foreground)'
            }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-subtle)' }}>
                  <th className="px-4 py-3 text-left">Muster</th>
                  <th className="px-4 py-3 text-left">Log-Beispiel</th>
                  <th className="px-4 py-3 text-left">Bedeutung</th>
                  <th className="px-4 py-3 text-left">Schweregrad</th>
                </tr>
              </thead>
              <tbody>
                {logPatterns.map((pattern, index) => (
                  <tr key={index} style={{ 
                    backgroundColor: index % 2 === 0 ? 'var(--card-bg)' : 'var(--bg-subtle)'
                  }}>
                    <td className="px-4 py-3 font-medium">{pattern.title}</td>
                    <td className="px-4 py-3 font-mono text-sm">{pattern.pattern}</td>
                    <td className="px-4 py-3">{pattern.significance}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium`} style={{
                        backgroundColor: pattern.severity === "Kritisch" ? 'var(--red-bg)' :
                                        pattern.severity === "Hoch" ? 'var(--orange-bg)' :
                                        pattern.severity === "Mittel" ? 'var(--yellow-bg)' :
                                        'var(--green-bg)',
                        color: pattern.severity === "Kritisch" ? 'var(--red-fg)' :
                               pattern.severity === "Hoch" ? 'var(--orange-fg)' :
                               pattern.severity === "Mittel" ? 'var(--yellow-fg)' :
                               'var(--green-fg)'
                      }}>
                        {pattern.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PGridItem>

        <PGridItem size={12}>
          <PHeading tag="h4" size="small" className="mb-3">Alert-Klassifizierung für Automotive-Logs</PHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alertClassification.map((alert, index) => (
              <div key={index} className="rounded-md p-4" style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--foreground)'
              }}>
                <PHeading tag="h5" size="small" className="mb-2">{alert.category}</PHeading>
                <PText className="mb-2 text-sm">{alert.description}</PText>
                <div className="mb-2">
                  <span className="text-xs font-medium" style={{ color: 'var(--foreground-lighter)' }}>Beispiele:</span>
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    {alert.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mt-3 text-sm">
                  <div>
                    <span className="font-medium">Reaktionszeit:</span> {alert.responseTime}
                  </div>
                  <div>
                    <span className="font-medium">Benachrichtigung:</span> {alert.notification}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PGridItem>
      </PGrid>
    </div>
  );
};

export default LogAnalysisVisualization; 