"use client";

import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import isEqual from 'lodash/isEqual'; // Import for deep equality checking
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
  Panel,
  getRectOfNodes,
  getTransformForBounds
} from 'reactflow';
import 'reactflow/dist/style.css';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import DiagramControls from '@/components/ui/DiagramControls';
import { exportDiagramAsImage, fitNodesToContainer } from '@/lib/utils/diagramUtils';
import { useDiagramData } from '@/lib/hooks/useDiagramData';
import { useTheme } from '@/lib/themeContext';

// Helper function to manually export the diagram to image
const exportToImage = (reactFlowNode: HTMLDivElement | null, fileName: string = 'diagram') => {
  if (!reactFlowNode) return;
  
  // Get the reactflow node and create a copy for the canvas
  const reactFlowBounds = reactFlowNode.getBoundingClientRect();
  const nodesBounds = {
    width: reactFlowBounds.width,
    height: reactFlowBounds.height,
    x: 0,
    y: 0
  };
  
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = reactFlowBounds.width;
  canvas.height = reactFlowBounds.height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create an image from the canvas
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
      
      // Create download link
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    
    // Convert DOM node to image
    const svg = reactFlowNode.querySelector('.react-flow__renderer')?.outerHTML;
    if (svg) {
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      image.src = url;
    }
  }
};

interface FlowDiagramProps {
  title?: string;
  description?: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
  dataSource?: string | (() => Promise<{ nodes: Node[], edges: Edge[] }>);
  readOnly?: boolean;
  showControls?: boolean;
  showCustomControls?: boolean;
  showMiniMap?: boolean;
  height?: string;
  fitView?: boolean;
  className?: string;
  onNodeClick?: (node: Node) => void;
  refreshInterval?: number;
  enablePanAndZoom?: boolean;
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({
  title,
  description,
  initialNodes = [],
  initialEdges = [],
  dataSource,
  readOnly = true,
  showControls = false,
  showCustomControls = true,
  showMiniMap = false,
  height = '400px',
  fitView = true,
  className = '',
  onNodeClick,
  refreshInterval,
  enablePanAndZoom = true,
}) => {
  const reactFlowRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  
  // Memoize the initialNodes and initialEdges to prevent them from changing on re-renders
  const memoizedInitialNodes = useMemo(() => initialNodes, []);
  const memoizedInitialEdges = useMemo(() => initialEdges, []);
  
  // Track if we are in the first render
  const isFirstRender = useRef(true);
  
  // Memoize the dataSource object to ensure stable identity
  const memoizedDataSource = useMemo(() => {
    if (typeof dataSource === 'string' || typeof dataSource === 'function') {
      return dataSource;
    }
    
    // If it's not a string or function, it must be an object or undefined
    return dataSource || { nodes: memoizedInitialNodes, edges: memoizedInitialEdges };
  }, [dataSource, memoizedInitialNodes, memoizedInitialEdges]);
  
  // Use initial data source setup with memoized values
  const { 
    data: sourceData, 
    isLoading 
  } = useDiagramData(
    memoizedDataSource,
    { 
      refreshInterval,
      initialData: { 
        nodes: memoizedInitialNodes, 
        edges: memoizedInitialEdges 
      } 
    }
  );
  
  // Create a stable reference to the source data
  const stableSourceNodes = useMemo(() => sourceData?.nodes || memoizedInitialNodes, [sourceData?.nodes, memoizedInitialNodes]);
  const stableSourceEdges = useMemo(() => sourceData?.edges || memoizedInitialEdges, [sourceData?.edges, memoizedInitialEdges]);
  
  // Initialize node and edge states 
  const [nodes, setNodes, onNodesChange] = useNodesState(stableSourceNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(stableSourceEdges);
  
  // Previous values for comparison
  const prevNodesRef = useRef(nodes);
  const prevEdgesRef = useRef(edges);

  // Theme styles
  const themeStyles = useMemo(() => ({
    background: 'var(--card-bg)',
    nodeBackground: isDarkMode ? '#4a5568' : '#ffffff',
    edgeColor: isDarkMode ? '#a0aec0' : '#555555',
    textColor: 'var(--foreground)',
    borderColor: 'var(--border-color)',
  }), [isDarkMode]);

  // Update nodes/edges only when there's an actual change in the data
  useEffect(() => {
    // Skip first render to avoid initial state setup conflicts
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevNodesRef.current = stableSourceNodes;
      prevEdgesRef.current = stableSourceEdges;
      return;
    }
    
    // Only update state if the data has actually changed (deep comparison)
    if (!isEqual(stableSourceNodes, prevNodesRef.current)) {
      setNodes(stableSourceNodes);
      prevNodesRef.current = stableSourceNodes;
    }
    
    if (!isEqual(stableSourceEdges, prevEdgesRef.current)) {
      setEdges(stableSourceEdges);
      prevEdgesRef.current = stableSourceEdges;
    }
  }, [stableSourceNodes, stableSourceEdges, setNodes, setEdges]);
  
  // Memoize the onConnect callback
  const onConnect = useCallback(
    (connection: Connection) => {
      if (!readOnly) {
        setEdges((eds) => 
          addEdge({
            ...connection,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            style: {
              stroke: themeStyles.edgeColor,
            },
          }, eds)
        );
      }
    },
    [readOnly, setEdges, themeStyles.edgeColor]
  );

  // Handle node click with memoized callback
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        onNodeClick(node);
      }
    },
    [onNodeClick]
  );

  // Simple handler for exporting diagram
  const handleExport = useCallback(() => {
    const fileName = `diagram-${title?.toLowerCase().replace(/\s+/g, '-') || 'export'}`;
    exportToImage(reactFlowRef.current, fileName);
  }, [title, reactFlowRef]);

  // Apply theme-specific styles to nodes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          background: themeStyles.nodeBackground,
          color: themeStyles.textColor,
          borderColor: node.style?.borderColor || themeStyles.borderColor,
        },
        data: {
          ...node.data,
          labelStyle: {
            color: themeStyles.textColor,
          },
        },
      }))
    );

    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: themeStyles.edgeColor,
        },
        labelStyle: {
          ...edge.labelStyle,
          color: themeStyles.textColor,
        },
      }))
    );
  }, [isDarkMode, setNodes, setEdges, themeStyles]);

  // Create the ReactFlow element
  const flowElement = (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={handleNodeClick}
      fitView={fitView}
      minZoom={0.1}
      maxZoom={4}
      proOptions={{ hideAttribution: true }}
      style={{ background: themeStyles.background }}
      defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      nodesConnectable={false}
      elementsSelectable={true}
      zoomOnScroll={enablePanAndZoom}
      panOnScroll={false}
      panOnDrag={enablePanAndZoom}
    >
      {showCustomControls && (
        <Panel position="top-right" className="p-2 flex space-x-2">
          <button 
            className="p-1 rounded-full transition-colors"
            style={{ 
              backgroundColor: isDarkMode ? '#4b5563' : '#f3f4f6',
              color: 'var(--foreground)'
            }}
            onClick={handleExport}
            title="Export as image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
          </button>
        </Panel>
      )}
      
      {showControls && <Controls />}
      {showMiniMap && (
        <MiniMap 
          style={{ 
            background: themeStyles.background
          }} 
        />
      )}
      
      <Background color={isDarkMode ? '#555' : '#aaa'} gap={16} />
    </ReactFlow>
  );
  
  return (
    <div 
      className={`border rounded-lg overflow-hidden ${className}`}
      style={{ borderColor: 'var(--border-color)' }}
    >
      {(title || description) && (
        <div 
          className="border-b p-4"
          style={{ 
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)' 
          }}
        >
          {title && <PHeading tag="h3" size="medium" className="mb-1">{title}</PHeading>}
          {description && <PText size="small">{description}</PText>}
        </div>
      )}
      
      <div className="relative" style={{ backgroundColor: 'var(--background)' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-10" style={{ backgroundColor: 'var(--background)' }}>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: 'var(--foreground)' }}></div>
          </div>
        )}
        
        <div 
          className="relative"
          style={{ height: height, backgroundColor: themeStyles.background }}
          ref={reactFlowRef}
        >
          <ReactFlowProvider>
            {flowElement}
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
};

export default FlowDiagram; 