"use client";

import React, { useState } from 'react';
import { Node, Edge, MarkerType } from 'reactflow';
import NodeDiagram from '@/components/interactive/NodeDiagram';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import Tabs from '@/components/ui/Tabs';
import InfoCard from '@/components/ui/InfoCard';

const NodeDiagramExample: React.FC = () => {
  // AI System Architecture Example
  const aiSystemNodes: Node[] = [
    {
      id: 'user-input',
      type: 'process',
      data: { 
        label: 'User Input', 
        description: 'Natural language queries and instructions from users',
      },
      position: { x: 50, y: 100 },
    },
    {
      id: 'nlp',
      type: 'feature',
      data: { 
        label: 'NLP Processing', 
        description: 'Natural language processing and tokenization',
      },
      position: { x: 250, y: 50 },
    },
    {
      id: 'llm',
      type: 'concept',
      data: { 
        label: 'Large Language Model', 
        description: 'Core model for understanding and generating text',
      },
      position: { x: 450, y: 100 },
    },
    {
      id: 'context',
      type: 'feature',
      data: { 
        label: 'Context Management', 
        description: 'Handling conversation history and context',
      },
      position: { x: 250, y: 150 },
    },
    {
      id: 'output',
      type: 'process',
      data: { 
        label: 'Response Generation', 
        description: 'Creating appropriate and helpful responses',
      },
      position: { x: 650, y: 100 },
    },
  ];

  const aiSystemEdges: Edge[] = [
    {
      id: 'e1-2',
      source: 'user-input',
      target: 'nlp',
      label: 'processes',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e2-3',
      source: 'nlp',
      target: 'llm',
      label: 'feeds into',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e4-3',
      source: 'context',
      target: 'llm',
      label: 'enhances',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e1-4',
      source: 'user-input',
      target: 'context',
      label: 'updates',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e3-5',
      source: 'llm',
      target: 'output',
      label: 'produces',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
  ];

  // Automotive Example
  const automotiveNodes: Node[] = [
    {
      id: 'sensors',
      type: 'process',
      data: { 
        label: 'Vehicle Sensors', 
        description: 'Cameras, LiDAR, radar and other sensor inputs',
      },
      position: { x: 100, y: 100 },
    },
    {
      id: 'perception',
      type: 'feature',
      data: { 
        label: 'Perception System', 
        description: 'Object detection, classification and tracking',
      },
      position: { x: 300, y: 50 },
    },
    {
      id: 'planning',
      type: 'concept',
      data: { 
        label: 'Planning & Decision', 
        description: 'Route planning and decision making algorithms',
      },
      position: { x: 500, y: 100 },
    },
    {
      id: 'prediction',
      type: 'feature',
      data: { 
        label: 'Behavior Prediction', 
        description: 'Predicting movements of other road users',
      },
      position: { x: 300, y: 150 },
    },
    {
      id: 'control',
      type: 'process',
      data: { 
        label: 'Vehicle Control', 
        description: 'Steering, acceleration and braking commands',
      },
      position: { x: 700, y: 100 },
    },
  ];

  const automotiveEdges: Edge[] = [
    {
      id: 'e1-2',
      source: 'sensors',
      target: 'perception',
      label: 'data input',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e2-3',
      source: 'perception',
      target: 'planning',
      label: 'scene understanding',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e4-3',
      source: 'prediction',
      target: 'planning',
      label: 'informs',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e2-4',
      source: 'perception',
      target: 'prediction',
      label: 'object data',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e3-5',
      source: 'planning',
      target: 'control',
      label: 'commands',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
  ];

  // Interactive example with modifiable nodes
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    setHighlightedNodes([node.id]);
  };

  // Define example tabs
  const exampleTabs = [
    {
      id: 'ai-system',
      label: 'AI System Architecture',
      content: (
        <div className="p-4">
          <PText className="mb-4">
            This diagram shows the high-level architecture of an AI system, with components for processing user input, 
            natural language processing, context management, and response generation.
          </PText>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <NodeDiagram
              initialNodes={aiSystemNodes}
              initialEdges={aiSystemEdges}
              height="400px"
              showMiniMap={true}
              enableEdgeLabels={true}
              theme="light"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'automotive',
      label: 'Automotive AI System',
      content: (
        <div className="p-4">
          <PText className="mb-4">
            This diagram illustrates the key components of an automotive AI system, showing the flow from 
            sensor inputs through perception, prediction, and planning to vehicle control.
          </PText>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <NodeDiagram
              initialNodes={automotiveNodes}
              initialEdges={automotiveEdges}
              height="400px"
              showMiniMap={true}
              enableEdgeLabels={true}
              theme="light"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'interactive',
      label: 'Interactive Mode',
      content: (
        <div className="p-4">
          <InfoCard title="Interactive Diagram" variant="info" className="mb-4">
            This is an interactive version of the node diagram. You can:
            <ul className="list-disc pl-5 mt-2">
              <li>Click on nodes to see more details</li>
              <li>Drag nodes to reposition them</li>
              <li>Add new nodes using the buttons in the top-left</li>
              <li>Connect nodes by dragging from one node to another</li>
              <li>Use the controls to zoom and pan the diagram</li>
            </ul>
          </InfoCard>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <NodeDiagram
              initialNodes={aiSystemNodes.slice(0, 3)}
              initialEdges={aiSystemEdges.slice(0, 2)}
              height="500px"
              readOnly={false}
              showMiniMap={true}
              enableEdgeLabels={true}
              showZoomControls={true}
              theme="light"
              highlightNodes={highlightedNodes}
              onNodeClick={handleNodeClick}
            />
          </div>
          {selectedNode && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <PHeading tag="h4" size="small" className="mb-2">Selected Node: {selectedNode.data.label}</PHeading>
              {selectedNode.data.description && (
                <PText>{selectedNode.data.description}</PText>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'dark-mode',
      label: 'Dark Theme',
      content: (
        <div className="p-4">
          <PText className="mb-4">
            The same diagram with a dark theme for improved visibility in low-light environments.
          </PText>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <NodeDiagram
              initialNodes={automotiveNodes}
              initialEdges={automotiveEdges}
              height="400px"
              showMiniMap={true}
              enableEdgeLabels={true}
              theme="dark"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <PHeading tag="h2" size="large" className="mb-4">Node Diagram Examples</PHeading>
        <PText className="mb-6">
          The NodeDiagram component visualizes relationships between concepts, features, and processes.
          It's useful for system architecture diagrams, concept maps, and workflow visualization.
        </PText>
        
        <Tabs 
          tabs={exampleTabs}
          variant="outline"
          className="mb-8"
        />
      </div>
    </div>
  );
};

export default NodeDiagramExample; 