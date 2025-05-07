'use client';

import React, { useState } from 'react';
import PButton from '@/components/ui/PButton';
import PText from '@/components/ui/PText';
import PHeading from '@/components/ui/PHeading';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MarkerType,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';

const ArchitectureDiagram: React.FC = () => {
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  // Node styles
  const baseNodeStyle = {
    border: '1px solid #c9c9c9',
    borderRadius: '8px',
    padding: '10px',
    width: 180,
  };

  const serverNodeStyle = {
    ...baseNodeStyle,
    backgroundColor: '#E6F7FF',
    borderColor: '#1890FF',
  };

  const clientNodeStyle = {
    ...baseNodeStyle,
    backgroundColor: '#F6FFED',
    borderColor: '#52C41A',
  };

  const securityNodeStyle = {
    ...baseNodeStyle,
    backgroundColor: '#FFF7E6',
    borderColor: '#FAAD14',
  };

  const aiServiceNodeStyle = {
    ...baseNodeStyle,
    backgroundColor: '#F9F0FF',
    borderColor: '#722ED1',
  };

  // Initial nodes
  const initialNodes: Node[] = [
    {
      id: 'client-app',
      data: { 
        label: 'Client Application',
        details: 'Anwendungen, die KI-Dienste nutzen möchten (z.B. Webapps, mobile Apps, Desktopanwendungen)'
      },
      position: { x: 250, y: 50 },
      style: clientNodeStyle,
      sourcePosition: Position.Bottom,
    },
    {
      id: 'mcp-server',
      data: { 
        label: 'MCP Server',
        details: 'Zentrale Einheit, die Anfragen verarbeitet, Autorisierung durchführt und als Gateway zu KI-Diensten dient'
      },
      position: { x: 250, y: 200 },
      style: serverNodeStyle,
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: 'auth-service',
      data: { 
        label: 'Authentication Service',
        details: 'Verwaltet Benutzerauthentifizierung, Token-Validierung und Zugriffsberechtigungen'
      },
      position: { x: 50, y: 300 },
      style: securityNodeStyle,
      targetPosition: Position.Top,
    },
    {
      id: 'connector-manager',
      data: { 
        label: 'Connector Manager',
        details: 'Verwaltet Verbindungen zu verschiedenen KI-Diensten, handhabt Service Discovery und Load Balancing'
      },
      position: { x: 250, y: 300 },
      style: serverNodeStyle,
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: 'logging-analytics',
      data: { 
        label: 'Logging & Analytics',
        details: 'Erfasst Metriken, Protokolliert Anfragen und Antworten für Audit und Performance-Analyse'
      },
      position: { x: 450, y: 300 },
      style: serverNodeStyle,
      targetPosition: Position.Top,
    },
    {
      id: 'openai-service',
      data: { 
        label: 'OpenAI Service',
        details: 'Connector für OpenAI-Dienste (GPT-4, DALL-E, etc.)'
      },
      position: { x: 150, y: 400 },
      style: aiServiceNodeStyle,
      targetPosition: Position.Top,
    },
    {
      id: 'azure-service',
      data: { 
        label: 'Azure AI Service',
        details: 'Connector für Microsoft Azure AI-Dienste'
      },
      position: { x: 350, y: 400 },
      style: aiServiceNodeStyle,
      targetPosition: Position.Top,
    },
    {
      id: 'custom-service',
      data: { 
        label: 'Custom AI Service',
        details: 'Eigene oder Drittanbieter-KI-Dienste mit spezialisierten Fähigkeiten'
      },
      position: { x: 550, y: 400 },
      style: aiServiceNodeStyle,
      targetPosition: Position.Top,
    },
  ];

  // Define edges (connections between nodes)
  const edges: Edge[] = [
    {
      id: 'client-to-mcp',
      source: 'client-app',
      target: 'mcp-server',
      animated: true,
      label: 'API Requests',
      style: { strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'mcp-to-auth',
      source: 'mcp-server',
      target: 'auth-service',
      label: 'Auth Check',
      style: { strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'mcp-to-connector',
      source: 'mcp-server',
      target: 'connector-manager',
      label: 'Route Request',
      style: { strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'mcp-to-logging',
      source: 'mcp-server',
      target: 'logging-analytics',
      label: 'Log Activity',
      style: { strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'connector-to-openai',
      source: 'connector-manager',
      target: 'openai-service',
      animated: true,
      style: { strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'connector-to-azure',
      source: 'connector-manager',
      target: 'azure-service',
      animated: true,
      style: { strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'connector-to-custom',
      source: 'connector-manager',
      target: 'custom-service',
      animated: true,
      style: { strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
  ];

  const [nodes, /*setNodes*/] = useState(initialNodes);

  // Handle node click to show details
  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setShowDetails(node.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
      <PHeading tag="h3" size="medium" className="mb-4">
        MCP Server Architektur
      </PHeading>
      <div className="h-[500px] w-full mb-4">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodeClick={onNodeClick}
          proOptions={{ hideAttribution: true }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <PHeading tag="h4" size="small" className="mb-2">
              {nodes.find(n => n.id === showDetails)?.data.label}
            </PHeading>
            <PText>
              {nodes.find(n => n.id === showDetails)?.data.details}
            </PText>
          </div>
          <PButton
            variant="secondary"
            onClick={() => setShowDetails(null)}
          >
            Details ausblenden
          </PButton>
        </motion.div>
      )}

      <div className="mt-4">
        <PText className="font-semibold mb-2">
          Klicken Sie auf einen Knoten, um Details anzuzeigen
        </PText>
        <PText>
          Diese Architekturdiagramm zeigt die Hauptkomponenten des MCP-Servers und deren Beziehungen.
          Der Server fungiert als zentraler Zugangspunkt für KI-Dienste, wobei er Authentifizierung, 
          Routing und Protokollierung übernimmt.
        </PText>
      </div>
    </div>
  );
};

export default ArchitectureDiagram; 