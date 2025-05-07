"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
  NodeTypes,
  Panel,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  MarkerType,
  Handle,
  Position,
  NodeProps
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import PButton from '@/components/ui/PButton';

// Define custom node types
const ServiceNode: React.FC<NodeProps> = ({ data, isConnectable }) => (
  <div className="px-4 py-3 rounded-md border-2 border-blue-500 bg-blue-50 shadow-md w-48">
    <div className="flex items-center justify-between">
      <div className="text-blue-700 font-semibold">{data.label}</div>
      {data.icon && <div className="text-blue-500">{data.icon}</div>}
    </div>
    {data.description && (
      <PText size="small" className="mt-1 text-blue-800">{data.description}</PText>
    )}
    <Handle
      type="target"
      position={Position.Top}
      isConnectable={isConnectable}
      className="w-3 h-3 bg-blue-500"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      isConnectable={isConnectable}
      className="w-3 h-3 bg-blue-500"
    />
  </div>
);

const DatabaseNode: React.FC<NodeProps> = ({ data, isConnectable }) => (
  <div className="px-4 py-3 rounded-md border-2 border-green-500 bg-green-50 shadow-md w-48">
    <div className="flex items-center justify-between">
      <div className="text-green-700 font-semibold">{data.label}</div>
      <div className="text-green-500">📊</div>
    </div>
    {data.description && (
      <PText size="small" className="mt-1 text-green-800">{data.description}</PText>
    )}
    <Handle
      type="target"
      position={Position.Top}
      isConnectable={isConnectable}
      className="w-3 h-3 bg-green-500"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      isConnectable={isConnectable}
      className="w-3 h-3 bg-green-500"
    />
  </div>
);

const ClientNode: React.FC<NodeProps> = ({ data, isConnectable }) => (
  <div className="px-4 py-3 rounded-md border-2 border-purple-500 bg-purple-50 shadow-md w-48">
    <div className="flex items-center justify-between">
      <div className="text-purple-700 font-semibold">{data.label}</div>
      <div className="text-purple-500">👤</div>
    </div>
    {data.description && (
      <PText size="small" className="mt-1 text-purple-800">{data.description}</PText>
    )}
    <Handle
      type="source"
      position={Position.Bottom}
      isConnectable={isConnectable}
      className="w-3 h-3 bg-purple-500"
    />
  </div>
);

const SecurityNode: React.FC<NodeProps> = ({ data, isConnectable }) => (
  <div className="px-4 py-3 rounded-md border-2 border-red-500 bg-red-50 shadow-md w-48">
    <div className="flex items-center justify-between">
      <div className="text-red-700 font-semibold">{data.label}</div>
      <div className="text-red-500">🔒</div>
    </div>
    {data.description && (
      <PText size="small" className="mt-1 text-red-800">{data.description}</PText>
    )}
    <Handle
      type="target"
      position={Position.Top}
      isConnectable={isConnectable}
      className="w-3 h-3 bg-red-500"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      isConnectable={isConnectable}
      className="w-3 h-3 bg-red-500"
    />
  </div>
);

const ExternalNode: React.FC<NodeProps> = ({ data, isConnectable }) => (
  <div className="px-4 py-3 rounded-md border-2 border-gray-500 bg-gray-50 shadow-md w-48">
    <div className="flex items-center justify-between">
      <div className="text-gray-700 font-semibold">{data.label}</div>
      <div className="text-gray-500">🌐</div>
    </div>
    {data.description && (
      <PText size="small" className="mt-1 text-gray-800">{data.description}</PText>
    )}
    <Handle
      type="target"
      position={Position.Top}
      isConnectable={isConnectable}
      className="w-3 h-3 bg-gray-500"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      isConnectable={isConnectable}
      className="w-3 h-3 bg-gray-500"
    />
  </div>
);

// Custom node types mapping
const nodeTypes: NodeTypes = {
  service: ServiceNode,
  database: DatabaseNode,
  client: ClientNode,
  security: SecurityNode,
  external: ExternalNode,
};

interface ArchitectureDiagramProps {
  title?: string;
  description?: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
  readOnly?: boolean;
  showControls?: boolean;
  showMiniMap?: boolean;
  showZoomControls?: boolean;
  height?: string;
  showNodeDetails?: boolean;
  highlightedPath?: {
    nodes: string[];
    edges: string[];
  };
  enableAnimation?: boolean;
  onNodeClick?: (node: Node) => void;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  title,
  description,
  initialNodes = [],
  initialEdges = [],
  readOnly = true,
  showControls = true,
  showMiniMap = true,
  showZoomControls = true,
  height = '600px',
  showNodeDetails = true,
  highlightedPath,
  enableAnimation = true,
  onNodeClick,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  // Apply highlighted path
  useEffect(() => {
    if (highlightedPath) {
      // Update nodes with highlight styling
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          style: {
            ...node.style,
            boxShadow: highlightedPath.nodes.includes(node.id) 
              ? '0 0 12px rgba(0, 105, 180, 0.8)' 
              : node.style?.boxShadow,
            zIndex: highlightedPath.nodes.includes(node.id) ? 1000 : node.style?.zIndex,
            opacity: highlightedPath.nodes.length > 0 && !highlightedPath.nodes.includes(node.id) 
              ? 0.4 
              : 1,
          },
        }))
      );

      // Update edges with highlight styling
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          style: {
            ...edge.style,
            stroke: highlightedPath.edges.includes(edge.id) ? '#0069b4' : edge.style?.stroke,
            strokeWidth: highlightedPath.edges.includes(edge.id) ? 3 : edge.style?.strokeWidth,
            opacity: highlightedPath.edges.length > 0 && !highlightedPath.edges.includes(edge.id) 
              ? 0.2 
              : 1,
          },
          animated: highlightedPath.edges.includes(edge.id) && enableAnimation,
        }))
      );
    }
  }, [highlightedPath, setNodes, setEdges, enableAnimation]);

  // Handle node click
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
      if (onNodeClick) {
        onNodeClick(node);
      }
    },
    [onNodeClick]
  );

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {(title || description) && (
        <div className="bg-gray-50 border-b border-gray-200 p-4">
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
            onNodesChange={readOnly ? undefined : onNodesChange}
            onEdgesChange={readOnly ? undefined : onEdgesChange}
            onNodeClick={handleNodeClick}
            nodesDraggable={!readOnly}
            nodesConnectable={!readOnly}
            elementsSelectable={!readOnly}
            fitView
            minZoom={0.2}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            connectionLineType={ConnectionLineType.SmoothStep}
            defaultEdgeOptions={{
              type: 'smoothstep',
              style: { stroke: '#555' },
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            }}
            proOptions={{ hideAttribution: true }}
          >
            {showControls && <Controls />}
            {showMiniMap && <MiniMap nodeStrokeWidth={3} />}
            <Background color="#aaa" gap={16} />
            
            {showZoomControls && (
              <Panel position="top-right" className="p-2">
                <PButton 
                  variant="tertiary" 
                  className="mb-2" 
                  onClick={() => {
                    // Reset view to fit all nodes
                    if (reactFlowWrapper.current) {
                      const instance = reactFlowWrapper.current;
                      setTimeout(() => {
                        instance.querySelector('.react-flow__controls-fitview')?.dispatchEvent(
                          new MouseEvent('click', { bubbles: true })
                        );
                      }, 0);
                    }
                  }}
                >
                  Fit View
                </PButton>
              </Panel>
            )}
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {showNodeDetails && (
        <AnimatePresence>
          {selectedNode && (
            <motion.div 
              className="border-t border-gray-200 p-4 bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PHeading tag="h4" size="small" className="mb-2">
                {selectedNode.data.label}
              </PHeading>
              {selectedNode.data.description && (
                <PText>{selectedNode.data.description}</PText>
              )}
              {selectedNode.data.details && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  {Object.entries(selectedNode.data.details).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 gap-2 mb-1">
                      <div className="text-gray-600">{key}:</div>
                      <div className="col-span-2">{value as React.ReactNode}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default ArchitectureDiagram; 