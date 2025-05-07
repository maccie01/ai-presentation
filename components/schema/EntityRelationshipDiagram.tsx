"use client";

import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  NodeTypes,
  EdgeTypes,
  MarkerType,
  NodeProps,
  EdgeProps,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Background,
  Controls,
  Panel,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import DiagramControls from '@/components/ui/DiagramControls';
import { exportDiagramAsImage } from '@/lib/utils/diagramUtils';
import { getNodeStyle, getEdgeStyle } from '@/lib/utils/diagramStyles';

export interface EntityField {
  name: string;
  type: string;
  required?: boolean;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: string; // Entity and field this references (e.g., "User.id")
  description?: string;
}

export interface Entity {
  id: string;
  name: string;
  fields: EntityField[];
  description?: string;
}

export interface Relationship {
  id: string;
  source: string; // ID of source entity
  target: string; // ID of target entity
  sourceField: string; // Field in source entity
  targetField: string; // Field in target entity
  type: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
  label?: string;
}

interface EntityRelationshipDiagramProps {
  entities: Entity[];
  relationships: Relationship[];
  title?: string;
  description?: string;
  className?: string;
  height?: string;
  readOnly?: boolean;
  layoutDirection?: 'horizontal' | 'vertical';
  showControls?: boolean;
}

// Custom node data type
interface EntityNodeData extends Entity {}

// Custom node component to render an entity
const EntityNode: React.FC<NodeProps<EntityNodeData>> = ({ data, isConnectable }) => {
  const [expanded, setExpanded] = useState(true);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div className="bg-white shadow-md rounded-md border border-gray-200 overflow-hidden max-w-xs" style={{ minWidth: '200px' }}>
      <div className="bg-blue-600 text-white px-4 py-2 font-semibold" onClick={toggleExpanded}>
        <div className="flex justify-between items-center cursor-pointer">
          <span>{data.name}</span>
          <svg 
            className={`h-4 w-4 transform transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {data.description && <div className="text-xs mt-1 text-blue-100">{data.description}</div>}
      </div>
      
      {expanded && (
        <div className="bg-white px-2 pb-2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Type</th>
                <th className="p-2">Flags</th>
              </tr>
            </thead>
            <tbody>
              {data.fields.map((field: EntityField, index: number) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-2">
                    <div className="flex items-center">
                      {field.isPrimaryKey && (
                        <span className="mr-1 text-yellow-500" title="Primary Key">🔑</span>
                      )}
                      {field.isForeignKey && (
                        <span className="mr-1 text-purple-500" title="Foreign Key">🔗</span>
                      )}
                      {field.name}
                    </div>
                  </td>
                  <td className="p-2 text-gray-600">{field.type}</td>
                  <td className="p-2">
                    {field.required && <span className="text-red-500" title="Required">*</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Define custom edge data type
interface RelationshipEdgeData {
  type: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
  label?: string;
}

// Custom edges for different relationship types
const RelationshipEdge: React.FC<EdgeProps<RelationshipEdgeData>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}) => {
  // Edge path logic
  const edgePath = `M ${sourceX},${sourceY} L ${targetX},${targetY}`;
  
  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {data?.label && (
        <text>
          <textPath
            href={`#${id}`}
            style={{ fontSize: '10px' }}
            startOffset="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs fill-current text-gray-600"
          >
            {data.label}
          </textPath>
        </text>
      )}
    </>
  );
};

// Define node types
const nodeTypes: NodeTypes = {
  entity: EntityNode,
};

// Define edge types
const edgeTypes: EdgeTypes = {
  relationship: RelationshipEdge,
};

const getLayoutedElements = (
  entities: Entity[],
  relationships: Relationship[],
  direction: 'horizontal' | 'vertical' = 'horizontal',
  nodeWidth = 200,
  nodeHeight = 300,
  spacing = 100
): { nodes: Node<EntityNodeData>[], edges: Edge<RelationshipEdgeData>[] } => {
  // Convert entities to nodes
  const nodes: Node<EntityNodeData>[] = entities.map((entity, index) => {
    // Calculate position based on layout direction
    const position = direction === 'horizontal' 
      ? { x: index * (nodeWidth + spacing), y: 0 }
      : { x: 0, y: index * (nodeHeight + spacing) };
    
    return {
      id: entity.id,
      type: 'entity',
      position,
      data: {
        ...entity,
      },
    };
  });
  
  // Convert relationships to edges
  const edges: Edge<RelationshipEdgeData>[] = relationships.map((relationship) => {
    // Determine edge styling based on relationship type
    let markerEnd = { type: MarkerType.ArrowClosed as const };
    let style: React.CSSProperties = { strokeWidth: 2 };
    let type = 'relationship';
    let animated = false;
    
    switch (relationship.type) {
      case 'one-to-one':
        // Simple arrow from source to target
        break;
      case 'one-to-many':
        // Arrow from "one" to "many"
        style = { ...style, strokeDasharray: '5, 5' };
        break;
      case 'many-to-one':
        // Arrow from "many" to "one"
        animated = true;
        break;
      case 'many-to-many':
        // Double-headed arrow
        style = { ...style, strokeDasharray: '5, 5' };
        animated = true;
        break;
    }
    
    return {
      id: relationship.id,
      source: relationship.source,
      target: relationship.target,
      type,
      animated,
      style,
      markerEnd,
      data: {
        type: relationship.type,
        label: relationship.label || `${relationship.sourceField} → ${relationship.targetField}`,
      },
    };
  });
  
  return { nodes, edges };
};

const EntityRelationshipDiagram: React.FC<EntityRelationshipDiagramProps> = ({
  entities,
  relationships,
  title,
  description,
  className = '',
  height = '600px',
  readOnly = true,
  layoutDirection = 'horizontal',
  showControls = true,
}) => {
  const reactFlowRef = React.useRef<HTMLDivElement>(null);
  
  // Generate initial layout of nodes and edges
  const initialElements = useMemo(
    () => getLayoutedElements(entities, relationships, layoutDirection),
    [entities, relationships, layoutDirection]
  );
  
  // Set up nodes and edges state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialElements.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialElements.edges);
  
  // Export diagram as image
  const handleExport = useCallback(async () => {
    if (reactFlowRef.current) {
      await exportDiagramAsImage(
        reactFlowRef.current,
        { 
          fileName: `er-diagram-${title ? title.toLowerCase().replace(/\s+/g, '-') : 'export'}`,
          backgroundColor: '#ffffff' 
        }
      );
    }
  }, [title]);
  
  // Custom controls component using ReactFlow hooks
  const FlowWithControls = () => {
    const { fitView, zoomIn, zoomOut, setViewport } = useReactFlow();
    
    const handleZoomIn = () => zoomIn();
    const handleZoomOut = () => zoomOut();
    const handleFitView = () => fitView();
    const handleReset = () => setViewport({ x: 0, y: 0, zoom: 1 });
    
    return (
      <>
        {showControls && (
          <Panel position="top-right" className="m-2">
            <DiagramControls
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onFitView={handleFitView}
              onReset={handleReset}
              onExport={handleExport}
              direction="vertical"
            />
          </Panel>
        )}
      </>
    );
  };
  
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          {title && <PHeading tag="h3" size="medium" className="mb-1">{title}</PHeading>}
          {description && <PText size="small">{description}</PText>}
        </div>
      )}
      
      <div style={{ height }} ref={reactFlowRef}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesDraggable={!readOnly}
            nodesConnectable={!readOnly}
            elementsSelectable={!readOnly}
            fitView
            fitViewOptions={{ padding: 0.2 }}
          >
            <FlowWithControls />
            <Controls showInteractive={false} className="bottom-2 left-2" />
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default EntityRelationshipDiagram; 