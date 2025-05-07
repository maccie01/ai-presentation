"use client";

import React, { useState } from 'react';
import { Node, Edge, MarkerType } from 'reactflow';
import ArchitectureDiagram from '@/components/interactive/ArchitectureDiagram';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import Tabs from '@/components/ui/Tabs';
import InfoCard from '@/components/ui/InfoCard';
import PButton from '@/components/ui/PButton';

const ArchitectureDiagramExample: React.FC = () => {
  // Example 1: Cloud-based Microservices Architecture
  const microservicesNodes: Node[] = [
    {
      id: 'client',
      type: 'client',
      data: { 
        label: 'Client Application',
        description: 'Web and mobile front-end applications',
        details: {
          'Technologies': 'React, React Native',
          'Users': 'End users, Admin users',
          'Deployment': 'CDN, App Stores'
        }
      },
      position: { x: 250, y: 50 },
    },
    {
      id: 'api-gateway',
      type: 'security',
      data: { 
        label: 'API Gateway',
        description: 'Route and secure API requests',
        details: {
          'Service': 'AWS API Gateway',
          'Features': 'Authentication, Rate Limiting, Request Validation',
          'Protocols': 'HTTPS, WebSockets'
        }
      },
      position: { x: 250, y: 150 },
    },
    {
      id: 'auth-service',
      type: 'service',
      data: { 
        label: 'Auth Service',
        description: 'Handle authentication and authorization',
        details: {
          'Framework': 'Node.js, Express',
          'Database': 'MongoDB',
          'Features': 'JWT, OAuth, RBAC'
        }
      },
      position: { x: 100, y: 250 },
    },
    {
      id: 'user-service',
      type: 'service',
      data: { 
        label: 'User Service',
        description: 'Manage user profiles and preferences',
        details: {
          'Framework': 'Node.js, NestJS',
          'Database': 'PostgreSQL',
          'Features': 'Profile management, Preferences, Settings'
        }
      },
      position: { x: 250, y: 250 },
    },
    {
      id: 'content-service',
      type: 'service',
      data: { 
        label: 'Content Service',
        description: 'Handle content and media assets',
        details: {
          'Framework': 'Python, FastAPI',
          'Database': 'MongoDB, S3',
          'Features': 'Content delivery, Media processing'
        }
      },
      position: { x: 400, y: 250 },
    },
    {
      id: 'user-db',
      type: 'database',
      data: { 
        label: 'User Database',
        description: 'Store user profiles and relations',
        details: {
          'Type': 'PostgreSQL',
          'Scaling': 'Read replicas',
          'Backup': 'Daily snapshots, WAL archiving'
        }
      },
      position: { x: 250, y: 350 },
    },
    {
      id: 'content-db',
      type: 'database',
      data: { 
        label: 'Content Storage',
        description: 'Store and retrieve content assets',
        details: {
          'Type': 'MongoDB + S3',
          'Scaling': 'Sharding',
          'Features': 'Document indexing, Object storage'
        }
      },
      position: { x: 400, y: 350 },
    },
    {
      id: 'analytics',
      type: 'external',
      data: { 
        label: 'Analytics Service',
        description: 'Process user activities and metrics',
        details: {
          'Platform': 'AWS Kinesis + Redshift',
          'Features': 'Real-time processing, Data warehousing',
          'Insights': 'Usage patterns, Performance metrics'
        }
      },
      position: { x: 550, y: 150 },
    },
  ];

  const microservicesEdges: Edge[] = [
    {
      id: 'e1-2',
      source: 'client',
      target: 'api-gateway',
      label: 'HTTPS/REST',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e2-3',
      source: 'api-gateway',
      target: 'auth-service',
      label: 'Auth requests',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e2-4',
      source: 'api-gateway',
      target: 'user-service',
      label: 'User requests',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e2-5',
      source: 'api-gateway',
      target: 'content-service',
      label: 'Content requests',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e4-6',
      source: 'user-service',
      target: 'user-db',
      label: 'CRUD operations',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e5-7',
      source: 'content-service',
      target: 'content-db',
      label: 'Store/Retrieve',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e2-8',
      source: 'api-gateway',
      target: 'analytics',
      label: 'Log events',
      type: 'smoothstep',
      style: { stroke: '#888', strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
  ];

  // Example 2: Automotive AI System Architecture
  const automotiveNodes: Node[] = [
    {
      id: 'sensors',
      type: 'client',
      data: { 
        label: 'Vehicle Sensors',
        description: 'Cameras, LiDAR, radar, and other input devices',
        details: {
          'Inputs': 'Visual, Range, Motion, Environmental',
          'Rate': '10-60 Hz depending on sensor type',
          'Processing': 'Edge preprocessing, Data fusion'
        }
      },
      position: { x: 250, y: 50 },
    },
    {
      id: 'perception',
      type: 'service',
      data: { 
        label: 'Perception System',
        description: 'Process sensor data into environmental model',
        details: {
          'AI Models': 'CNN, YOLO, PointNet',
          'Output': 'Object detection and classification',
          'Performance': 'Real-time detection at <100ms latency'
        }
      },
      position: { x: 250, y: 150 },
    },
    {
      id: 'prediction',
      type: 'service',
      data: { 
        label: 'Prediction System',
        description: 'Forecast movements of road users',
        details: {
          'AI Models': 'LSTM, Transformer-based',
          'Features': 'Trajectory prediction, Intent recognition',
          'Horizon': '3-5 seconds prediction window'
        }
      },
      position: { x: 100, y: 250 },
    },
    {
      id: 'planning',
      type: 'service',
      data: { 
        label: 'Planning System',
        description: 'Generate safe vehicle trajectory',
        details: {
          'Algorithms': 'RL, Graph-based planning',
          'Features': 'Path planning, Behavioral planning',
          'Constraints': 'Safety rules, Physical limitations'
        }
      },
      position: { x: 400, y: 250 },
    },
    {
      id: 'control',
      type: 'service',
      data: { 
        label: 'Vehicle Control',
        description: 'Convert plans into vehicle commands',
        details: {
          'Type': 'MPC, PID controllers',
          'Outputs': 'Steering, throttle, braking commands',
          'Rate': '50-100 Hz update rate'
        }
      },
      position: { x: 250, y: 350 },
    },
    {
      id: 'hd-map',
      type: 'database',
      data: { 
        label: 'HD Map Data',
        description: 'High-definition map information',
        details: {
          'Resolution': 'Centimeter-level accuracy',
          'Features': 'Lane markings, Traffic signs, Road geometry',
          'Updates': 'OTA updates, Crowdsourced corrections'
        }
      },
      position: { x: 550, y: 150 },
    },
    {
      id: 'security',
      type: 'security',
      data: { 
        label: 'Security Module',
        description: 'Ensure system integrity and safety',
        details: {
          'Features': 'Intrusion detection, Input validation',
          'Standards': 'ISO 26262, ISO/SAE 21434',
          'Monitoring': 'Continuous threat assessment'
        }
      },
      position: { x: 550, y: 250 },
    },
  ];

  const automotiveEdges: Edge[] = [
    {
      id: 'e1-2',
      source: 'sensors',
      target: 'perception',
      label: 'Raw data',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e2-3',
      source: 'perception',
      target: 'prediction',
      label: 'Detected objects',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e2-4',
      source: 'perception',
      target: 'planning',
      label: 'Environment model',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e6-2',
      source: 'hd-map',
      target: 'perception',
      label: 'Map data',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e3-4',
      source: 'prediction',
      target: 'planning',
      label: 'Predicted trajectories',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e4-5',
      source: 'planning',
      target: 'control',
      label: 'Planned path',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e7-2',
      source: 'security',
      target: 'perception',
      label: 'Validate',
      type: 'smoothstep',
      style: { stroke: '#d00', strokeDasharray: '5,5' },
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e7-4',
      source: 'security',
      target: 'planning',
      label: 'Validate',
      type: 'smoothstep',
      style: { stroke: '#d00', strokeDasharray: '5,5' },
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
    },
  ];

  // Example 3: AI Training Pipeline
  const aiPipelineNodes: Node[] = [
    {
      id: 'data-sources',
      type: 'external',
      data: { 
        label: 'Data Sources',
        description: 'Raw data from various sources',
        details: {
          'Types': 'Text, Images, Logs, Structured Data',
          'Volume': 'Petabytes of training data',
          'Sources': 'Web crawling, Proprietary datasets, Public sources'
        }
      },
      position: { x: 250, y: 50 },
    },
    {
      id: 'data-prep',
      type: 'service',
      data: { 
        label: 'Data Preparation',
        description: 'Clean, transform, and augment data',
        details: {
          'Services': 'ETL pipelines, Data quality checks',
          'Features': 'Normalization, Augmentation, Anonymization',
          'Output': 'Processed datasets ready for training'
        }
      },
      position: { x: 250, y: 150 },
    },
    {
      id: 'feature-eng',
      type: 'service',
      data: { 
        label: 'Feature Engineering',
        description: 'Extract relevant features for models',
        details: {
          'Techniques': 'Feature extraction, Dimensionality reduction',
          'Tools': 'Principal Component Analysis, Feature selection',
          'Output': 'Feature vectors for model training'
        }
      },
      position: { x: 250, y: 250 },
    },
    {
      id: 'model-training',
      type: 'service',
      data: { 
        label: 'Model Training',
        description: 'Train and optimize AI models',
        details: {
          'Infrastructure': 'GPU/TPU clusters',
          'Frameworks': 'PyTorch, TensorFlow',
          'Techniques': 'Transfer learning, Distributed training'
        }
      },
      position: { x: 100, y: 350 },
    },
    {
      id: 'model-eval',
      type: 'service',
      data: { 
        label: 'Model Evaluation',
        description: 'Validate and test trained models',
        details: {
          'Metrics': 'Accuracy, Precision, Recall, F1',
          'Methods': 'Cross-validation, Ablation studies',
          'Outputs': 'Performance reports, Error analysis'
        }
      },
      position: { x: 400, y: 350 },
    },
    {
      id: 'model-registry',
      type: 'database',
      data: { 
        label: 'Model Registry',
        description: 'Version and store models',
        details: {
          'Features': 'Version control, Metadata tracking',
          'Integration': 'CI/CD pipelines, Deployment tools',
          'Storage': 'Artifact repository with security controls'
        }
      },
      position: { x: 250, y: 450 },
    },
    {
      id: 'inference',
      type: 'service',
      data: { 
        label: 'Inference Service',
        description: 'Serve models for production use',
        details: {
          'Deployment': 'Kubernetes, Serverless',
          'Features': 'Auto-scaling, A/B testing, Shadow deployment',
          'Performance': 'Low-latency predictions, High availability'
        }
      },
      position: { x: 250, y: 550 },
    },
    {
      id: 'monitoring',
      type: 'security',
      data: { 
        label: 'Monitoring System',
        description: 'Monitor model performance and drift',
        details: {
          'Metrics': 'Prediction quality, Drift detection',
          'Alerts': 'Performance degradation, Anomaly detection',
          'Feedback': 'Human feedback loop, Ground truth collection'
        }
      },
      position: { x: 450, y: 550 },
    },
  ];

  const aiPipelineEdges: Edge[] = [
    {
      id: 'e1-2',
      source: 'data-sources',
      target: 'data-prep',
      label: 'Raw data',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e2-3',
      source: 'data-prep',
      target: 'feature-eng',
      label: 'Processed data',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e3-4',
      source: 'feature-eng',
      target: 'model-training',
      label: 'Feature vectors',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e4-5',
      source: 'model-training',
      target: 'model-eval',
      label: 'Trained models',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e5-6',
      source: 'model-eval',
      target: 'model-registry',
      label: 'Validated models',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e6-7',
      source: 'model-registry',
      target: 'inference',
      label: 'Deploy model',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e7-8',
      source: 'inference',
      target: 'monitoring',
      label: 'Metrics',
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e8-4',
      source: 'monitoring',
      target: 'model-training',
      label: 'Feedback loop',
      type: 'smoothstep',
      style: { stroke: '#888', strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed },
    },
  ];

  // Interactive example state
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<{nodes: string[], edges: string[]} | undefined>(undefined);

  // Define paths for the microservices architecture
  const microservicesPaths = {
    'auth': {
      label: 'Authentication Flow',
      nodes: ['client', 'api-gateway', 'auth-service'],
      edges: ['e1-2', 'e2-3']
    },
    'content': {
      label: 'Content Delivery',
      nodes: ['client', 'api-gateway', 'content-service', 'content-db'],
      edges: ['e1-2', 'e2-5', 'e5-7']
    },
    'analytics': {
      label: 'Analytics Pipeline',
      nodes: ['client', 'api-gateway', 'analytics'],
      edges: ['e1-2', 'e2-8']
    }
  };

  // Define example tabs
  const exampleTabs = [
    {
      id: 'microservices',
      label: 'Microservices Architecture',
      content: (
        <div className="p-4">
          <PText className="mb-4">
            This diagram shows a typical cloud-based microservices architecture with separate services
            for authentication, user management, and content delivery.
          </PText>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
            <ArchitectureDiagram
              title="Cloud Microservices Architecture"
              description="A typical microservices architecture with API Gateway and specialized services."
              initialNodes={microservicesNodes}
              initialEdges={microservicesEdges}
              height="500px"
              showControls={true}
              showMiniMap={true}
              showNodeDetails={true}
              highlightedPath={highlightedPath}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <PButton
              variant="secondary"
              onClick={() => {
                setHighlightedPath(undefined);
                setSelectedPath(null);
              }}
              className={!selectedPath ? 'bg-blue-100' : ''}
            >
              Show All
            </PButton>
            {Object.entries(microservicesPaths).map(([key, path]) => (
              <PButton
                key={key}
                variant="secondary"
                onClick={() => {
                  setHighlightedPath({
                    nodes: path.nodes,
                    edges: path.edges
                  });
                  setSelectedPath(key);
                }}
                className={selectedPath === key ? 'bg-blue-100' : ''}
              >
                {path.label}
              </PButton>
            ))}
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
            This diagram illustrates the architecture of an automotive AI system, showing the flow from
            sensor inputs through perception, prediction, planning, and control.
          </PText>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <ArchitectureDiagram
              title="Automotive AI System Architecture"
              description="Key components of an autonomous driving system and their interactions."
              initialNodes={automotiveNodes}
              initialEdges={automotiveEdges}
              height="500px"
              showControls={true}
              showMiniMap={true}
              showNodeDetails={true}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'ai-pipeline',
      label: 'AI Training Pipeline',
      content: (
        <div className="p-4">
          <PText className="mb-4">
            This architecture demonstrates a comprehensive AI model training pipeline from data
            collection through deployment and monitoring.
          </PText>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <ArchitectureDiagram
              title="AI Model Training Pipeline"
              description="End-to-end pipeline for developing and deploying AI models."
              initialNodes={aiPipelineNodes}
              initialEdges={aiPipelineEdges}
              height="600px"
              showControls={true}
              showMiniMap={true}
              showNodeDetails={true}
              enableAnimation={true}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'customization',
      label: 'Customization Options',
      content: (
        <div className="p-4">
          <InfoCard title="Component Flexibility" variant="info" className="mb-4">
            The ArchitectureDiagram component offers extensive customization options:
            <ul className="list-disc pl-5 mt-2">
              <li>Multiple node types with custom styling (Service, Database, Client, Security, External)</li>
              <li>Path highlighting for showcasing specific flows</li>
              <li>Animated edges for emphasizing important connections</li>
              <li>Interactive node selection with detailed information display</li>
              <li>Controls for zooming, panning, and fitting the view</li>
              <li>Support for both read-only and editable modes</li>
            </ul>
          </InfoCard>
          <PText className="mb-4">
            The component is ideal for visualizing complex system architectures, data flows, and component relationships.
            It supports multiple node types with custom styling and provides interactive features for exploring system details.
          </PText>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <PHeading tag="h2" size="large" className="mb-4">Architecture Diagram Examples</PHeading>
        <PText className="mb-6">
          The ArchitectureDiagram component visualizes system architectures, component relationships, and data flows.
          It's useful for technical documentation, system design, and explaining complex architectures.
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

export default ArchitectureDiagramExample; 