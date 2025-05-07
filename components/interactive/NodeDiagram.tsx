"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background, 
  MiniMap, 
  ReactFlowProvider,
  MarkerType, 
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  useReactFlow,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import PButton from '@/components/ui/PButton';
import { useTheme } from '@/lib/themeContext';

// Custom node types
const nodeTypes = {
  concept: ConceptNode,
  feature: FeatureNode,
  process: ProcessNode,
};

interface NodeDiagramProps {
  title?: string;
  description?: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
  readOnly?: boolean;
  showControls?: boolean;
  showMiniMap?: boolean;
  showZoomControls?: boolean;
  height?: string;
  enableNodeSelection?: boolean;
  enableEdgeLabels?: boolean;
  theme?: 'light' | 'dark';
  highlightNodes?: string[];
  onNodeClick?: (node: Node) => void;
}

const NodeDiagram: React.FC<NodeDiagramProps> = ({
  title,
  description,
  initialNodes = [],
  initialEdges = [],
  readOnly = true,
  showControls = true,
  showMiniMap = true,
  showZoomControls = true,
  height = '500px',
  enableNodeSelection = true,
  enableEdgeLabels = true,
  theme: propTheme,
  highlightNodes = [],
  onNodeClick,
}) => {
  const { isDarkMode } = useTheme();
  const theme = propTheme || (isDarkMode ? 'dark' : 'light');
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();

  // Apply highlights to nodes if specified
  useEffect(() => {
    if (highlightNodes.length > 0) {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          style: {
            ...node.style,
            borderColor: highlightNodes.includes(node.id) ? '#ff0072' : node.style?.borderColor,
            borderWidth: highlightNodes.includes(node.id) ? 2 : node.style?.borderWidth,
            boxShadow: highlightNodes.includes(node.id) ? '0 0 10px #ff0072' : node.style?.boxShadow,
          },
        }))
      );
    }
  }, [highlightNodes, setNodes]);

  // Handle connection creation
  const onConnect = useCallback(
    (connection: Connection) => {
      if (!readOnly && connection.source && connection.target) {
        // Use addEdge directly to handle proper Edge typing
        if (enableEdgeLabels) {
          setEdges((eds) => 
            addEdge({
              ...connection,
              label: 'Relationship',
              labelStyle: { fontSize: 12 },
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
              style: { stroke: themeStyles[theme].edgeColor },
            }, eds)
          );
        } else {
          setEdges((eds) => 
            addEdge({
              ...connection,
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
              style: { stroke: themeStyles[theme].edgeColor },
            }, eds)
          );
        }
      }
    },
    [readOnly, setEdges, enableEdgeLabels, theme]
  );

  // Handle node selection
  const onNodeSelection = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (enableNodeSelection) {
        setSelectedNode(node);
        if (onNodeClick) {
          onNodeClick(node);
        }
      }
    },
    [enableNodeSelection, onNodeClick]
  );

  // Reset zoom to fit all nodes
  const resetZoom = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  }, [reactFlowInstance]);

  // Add controls for diagram manipulation
  const addNode = useCallback(
    (type: string) => {
      if (!readOnly) {
        const newNode: Node = {
          id: `node-${nodes.length + 1}`,
          data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodes.length + 1}` },
          position: {
            x: Math.random() * 400,
            y: Math.random() * 400,
          },
          type,
        };
        setNodes((nds) => [...nds, newNode]);
      }
    },
    [readOnly, nodes.length, setNodes]
  );

  // Apply theme styles
  const themeStyles = {
    light: {
      background: 'var(--card-bg)',
      nodeBackground: 'var(--background)',
      edgeColor: '#555555',
      textColor: 'var(--foreground)',
      borderColor: 'var(--border-color)',
    },
    dark: {
      background: 'var(--card-bg)',
      nodeBackground: isDarkMode ? '#4a5568' : '#ffffff',
      edgeColor: isDarkMode ? '#a0aec0' : '#555555',
      textColor: 'var(--foreground)',
      borderColor: 'var(--border-color)',
    },
  };

  // Apply appropriate styles based on the selected theme
  const currentTheme = themeStyles[theme];

  // Update node styles based on theme changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          background: currentTheme.nodeBackground,
          color: currentTheme.textColor,
          borderColor: node.style?.borderColor || currentTheme.borderColor,
        },
        data: {
          ...node.data,
          labelStyle: {
            color: currentTheme.textColor,
          },
        },
      }))
    );

    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: currentTheme.edgeColor,
        },
        labelStyle: {
          ...edge.labelStyle,
          color: currentTheme.textColor,
        },
      }))
    );
  }, [isDarkMode, theme, setNodes, setEdges, currentTheme]);

  return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
      {(title || description) && (
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem' 
        }}>
          {title && <PHeading tag="h3" size="medium" className="mb-1">{title}</PHeading>}
          {description && <PText size="small">{description}</PText>}
        </div>
      )}
      
      <div ref={reactFlowWrapper} style={{ height, width: '100%' }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeSelection}
            nodesConnectable={!readOnly}
            nodesDraggable={!readOnly}
            elementsSelectable={!readOnly}
            fitView
            minZoom={0.1}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            proOptions={{ hideAttribution: true }}
            style={{ background: currentTheme.background }}
          >
            {showControls && <Controls />}
            {showMiniMap && <MiniMap style={{ background: currentTheme.background }} />}
            <Background color={theme === 'light' ? '#aaa' : '#555'} gap={16} />

            {showZoomControls && (
              <Panel position="top-right" className="p-2">
                <PButton 
                  variant="tertiary" 
                  className="mb-2" 
                  onClick={resetZoom}
                >
                  Fit View
                </PButton>
              </Panel>
            )}

            {!readOnly && (
              <Panel position="top-left" className="p-2">
                <div className="flex flex-col space-y-2">
                  <PButton variant="tertiary" onClick={() => addNode('concept')}>
                    Add Concept
                  </PButton>
                  <PButton variant="tertiary" onClick={() => addNode('feature')}>
                    Add Feature
                  </PButton>
                  <PButton variant="tertiary" onClick={() => addNode('process')}>
                    Add Process
                  </PButton>
                </div>
              </Panel>
            )}
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {selectedNode && (
        <motion.div 
          style={{ 
            borderTop: '1px solid var(--border-color)', 
            backgroundColor: 'var(--card-bg)',
            padding: '1rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <PHeading tag="h4" size="small" className="mb-2">
            {selectedNode.data.label}
          </PHeading>
          {selectedNode.data.description && (
            <PText size="small">{selectedNode.data.description}</PText>
          )}
        </motion.div>
      )}
    </div>
  );
};

// Define node styles based on theme
function ConceptNode({ data }: { data: any }) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="p-3 rounded-md border-2 shadow-md" style={{
      backgroundColor: isDarkMode ? '#4a5568' : '#ffffff',
      borderColor: '#6366f1',
      color: isDarkMode ? '#e2e8f0' : '#333333',
    }}>
      {data.label}
    </div>
  );
}

function FeatureNode({ data }: { data: any }) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="p-3 rounded-md border-2 shadow-md" style={{
      backgroundColor: isDarkMode ? '#4a5568' : '#ffffff',
      borderColor: '#10b981',
      color: isDarkMode ? '#e2e8f0' : '#333333',
    }}>
      {data.label}
    </div>
  );
}

function ProcessNode({ data }: { data: any }) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="p-3 rounded-md border-2 shadow-md" style={{
      backgroundColor: isDarkMode ? '#4a5568' : '#ffffff',
      borderColor: '#f97316',
      color: isDarkMode ? '#e2e8f0' : '#333333',
    }}>
      {data.label}
    </div>
  );
}

export default NodeDiagram; 