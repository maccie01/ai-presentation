'use client';

import React, { useState } from 'react';
import PButton from '@/components/ui/PButton';
import PText from '@/components/ui/PText';
import PHeading from '@/components/ui/PHeading';
import Tabs from '@/components/ui/Tabs';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Process step animation variants
const stepVariants = {
  inactive: { opacity: 0.5, scale: 0.95 },
  active: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  complete: { opacity: 1, scale: 1, backgroundColor: '#E6FFFB', borderColor: '#13C2C2' }
};

const ConnectorExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState('handshake');
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Handshake process steps
  const handshakeSteps = [
    {
      title: 'Connector Registration',
      description: 'Der Connector sendet seine Capabilities und Metadaten an den MCP-Server',
      code: `// Connector Registration Request
{
  "action": "register",
  "connector_id": "openai-gpt4",
  "capabilities": {
    "models": ["gpt-4", "gpt-3.5-turbo"],
    "features": ["chat", "completion", "embedding"],
    "max_tokens": 8192
  },
  "auth": {
    "type": "api_key",
    "token_endpoint": "/auth/token"
  },
  "version": "1.0",
  "provider": "OpenAI"
}`
    },
    {
      title: 'Validierung & Verifizierung',
      description: 'Der MCP-Server validiert die Connector-Informationen und prüft Berechtigungen',
      code: `// Server Validation Process
function validateConnector(connectorData) {
  // Verify connector signature
  const isSignatureValid = verifySignature(
    connectorData.signature,
    connectorData.connector_id
  );
  
  // Check if connector is authorized
  const isAuthorized = checkConnectorAuthorization(
    connectorData.connector_id,
    connectorData.capabilities
  );
  
  // Validate capabilities against allowed features
  const capabilitiesValidation = validateCapabilities(
    connectorData.capabilities
  );
  
  return {
    valid: isSignatureValid && isAuthorized && capabilitiesValidation.valid,
    reasons: capabilitiesValidation.reasons
  };
}`
    },
    {
      title: 'Connector Bestätigung',
      description: 'Der MCP-Server bestätigt die Registrierung und weist eine Connector-ID zu',
      code: `// Registration Response
{
  "status": "success",
  "connector_id": "openai-gpt4-12345",
  "server_version": "2.1.0",
  "supported_capabilities": {
    "models": ["gpt-4", "gpt-3.5-turbo"],
    "features": ["chat", "completion", "embedding"],
    "max_tokens": 8192
  },
  "heartbeat_interval": 60,
  "encryption": {
    "enabled": true,
    "public_key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."
  }
}`
    },
    {
      title: 'Heartbeat Establishment',
      description: 'Ein regelmäßiger Heartbeat wird eingerichtet, um die Connector-Verfügbarkeit zu überwachen',
      code: `// Heartbeat Request (every 60 seconds)
{
  "action": "heartbeat",
  "connector_id": "openai-gpt4-12345",
  "timestamp": "2023-07-10T15:30:45Z",
  "status": "healthy",
  "metrics": {
    "requests_processed": 127,
    "average_latency": 245,
    "errors": 2
  }
}

// Heartbeat Response
{
  "status": "acknowledged",
  "server_timestamp": "2023-07-10T15:30:46Z",
  "connector_status": "active"
}`
    }
  ];

  // Discovery mechanism steps
  const discoverySteps = [
    {
      title: 'Capability Announcement',
      description: 'Der Connector veröffentlicht seine Fähigkeiten im MCP-Verzeichnis',
      code: `// Capability Announcement
{
  "action": "announce_capabilities",
  "connector_id": "openai-gpt4-12345",
  "capabilities": {
    "models": [
      {
        "id": "gpt-4",
        "type": "chat",
        "context_length": 8192,
        "features": ["function_calling", "json_mode", "vision"]
      },
      {
        "id": "gpt-3.5-turbo",
        "type": "chat",
        "context_length": 4096,
        "features": ["function_calling", "json_mode"]
      }
    ],
    "endpoints": {
      "chat": "/v1/chat/completions",
      "completions": "/v1/completions",
      "embeddings": "/v1/embeddings"
    }
  }
}`
    },
    {
      title: 'Service Discovery',
      description: 'Client-Anwendungen können verfügbare KI-Dienste und deren Fähigkeiten abfragen',
      code: `// Service Discovery Request
{
  "action": "discover_services",
  "client_id": "webapp-dashboard",
  "requirements": {
    "model_type": "chat",
    "features": ["function_calling"],
    "min_context_length": 4000
  }
}

// Service Discovery Response
{
  "status": "success",
  "available_services": [
    {
      "connector_id": "openai-gpt4-12345",
      "models": ["gpt-4", "gpt-3.5-turbo"],
      "capabilities": {
        "max_context_length": 8192,
        "features": ["function_calling", "json_mode", "vision"]
      },
      "performance": {
        "avg_response_time": 250,
        "availability": 0.995
      }
    },
    {
      "connector_id": "azure-openai-456",
      "models": ["gpt-4", "gpt-35-turbo"],
      "capabilities": {
        "max_context_length": 8192,
        "features": ["function_calling", "json_mode"]
      },
      "performance": {
        "avg_response_time": 180,
        "availability": 0.998
      }
    }
  ]
}`
    },
    {
      title: 'Capability Negotiation',
      description: 'Der MCP-Server und Client handeln die benötigten Features und Parameter aus',
      code: `// Capability Negotiation Request
{
  "action": "negotiate_capabilities",
  "client_id": "webapp-dashboard",
  "connector_id": "openai-gpt4-12345",
  "requested_capabilities": {
    "model": "gpt-4",
    "features": ["function_calling", "json_mode"],
    "max_tokens": 2000,
    "temperature": 0.7
  }
}

// Capability Negotiation Response
{
  "status": "success",
  "negotiated_capabilities": {
    "model": "gpt-4",
    "features": ["function_calling", "json_mode"],
    "max_tokens": 2000,
    "temperature": 0.7
  },
  "session_id": "sess_12345abcde",
  "expires_in": 3600
}`
    },
    {
      title: 'Dynamic Service Updates',
      description: 'Connectors können ihre Capabilities dynamisch aktualisieren und neue Features ankündigen',
      code: `// Dynamic Capability Update
{
  "action": "update_capabilities",
  "connector_id": "openai-gpt4-12345",
  "updates": {
    "new_models": [
      {
        "id": "gpt-4-vision",
        "type": "multimodal",
        "context_length": 8192,
        "features": ["function_calling", "json_mode", "vision", "audio"]
      }
    ],
    "deprecated_models": [],
    "feature_updates": {
      "gpt-4": {
        "add_features": ["audio"],
        "remove_features": []
      }
    }
  },
  "effective_date": "2023-08-15T00:00:00Z"
}`
    }
  ];

  // Invocation sequence steps
  const invocationSteps = [
    {
      title: 'Client API Request',
      description: 'Die Client-Anwendung sendet eine Anfrage an den MCP-Server',
      code: `// Client Request to MCP Server
POST /api/v1/completion HTTP/1.1
Host: mcp-server.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "connector": "openai-gpt4-12345",
  "model": "gpt-4",
  "prompt": "Explain the concept of autonomous driving in simple terms",
  "max_tokens": 150,
  "temperature": 0.7,
  "top_p": 1.0,
  "request_id": "req_7890abcdef"
}`
    },
    {
      title: 'MCP Server Verarbeitung',
      description: 'Der MCP-Server überprüft Authentifizierung, Autorisierung und bereitet die Anfrage vor',
      code: `// MCP Server Processing Pipeline
async function processClientRequest(request) {
  // Authentication & authorization
  const user = await authenticateRequest(request.headers.authorization);
  const isAuthorized = await checkPermissions(user, request.body.connector);
  
  if (!isAuthorized) {
    return createErrorResponse(403, "Not authorized to use this connector");
  }
  
  // Rate limiting & quota check
  const quotaCheck = await checkUserQuota(user.id, request.body.connector);
  if (!quotaCheck.allowed) {
    return createErrorResponse(429, \`Rate limit exceeded: \${quotaCheck.reason}\`);
  }
  
  // Request transformation & enrichment
  const transformedRequest = transformRequest(request.body, user.preferences);
  
  // Request logging
  await logRequest(request.body.request_id, user.id, transformedRequest);
  
  // Forward to appropriate connector
  return forwardToConnector(request.body.connector, transformedRequest);
}`
    },
    {
      title: 'Connector Anfrage Weiterleitung',
      description: 'Der MCP-Server leitet die Anfrage an den ausgewählten Connector weiter',
      code: `// Request Transformation to Connector Format
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant that explains technical concepts in simple terms."
    },
    {
      "role": "user",
      "content": "Explain the concept of autonomous driving in simple terms"
    }
  ],
  "max_tokens": 150,
  "temperature": 0.7,
  "top_p": 1.0,
  "user": "user_12345",
  "metadata": {
    "request_id": "req_7890abcdef",
    "client_id": "webapp-dashboard",
    "session_id": "sess_12345abcde"
  }
}`
    },
    {
      title: 'Connector Verarbeitung',
      description: 'Der Connector verarbeitet die Anfrage und kommuniziert mit dem KI-Dienst',
      code: `// Connector Processing
async function processRequest(request) {
  // Transform to provider-specific format
  const providerRequest = mapToProviderFormat(request);
  
  // Set up authentication for the provider
  const authHeaders = await getProviderAuthHeaders();
  
  // Send request to AI provider
  const response = await fetch(PROVIDER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeaders,
      ...getRequestMetadata(request)
    },
    body: JSON.stringify(providerRequest)
  });
  
  // Process provider response
  const providerResponse = await response.json();
  
  // Transform back to MCP format
  return mapToMCPFormat(providerResponse, request.metadata);
}`
    },
    {
      title: 'Ergebnisrückgabe',
      description: 'Die Antwort wird vom Connector zurück an den MCP-Server und dann an den Client gesendet',
      code: `// Response from AI Service (via Connector)
{
  "id": "chatcmpl-123abc",
  "object": "chat.completion",
  "created": 1677858242,
  "model": "gpt-4",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Autonomous driving is like having a robot chauffeur in your car. The car uses cameras, sensors, and computers to see the road, other vehicles, and obstacles—just like human eyes and brain do. It can steer, brake, accelerate, and make decisions without a human driver. Think of it as your car having its own brain that can drive while you relax, read, or nap. The technology ranges from helping features (like automatic braking) to fully driverless cars that need no human input at all."
      },
      "finish_reason": "stop",
      "index": 0
    }
  ],
  "usage": {
    "prompt_tokens": 29,
    "completion_tokens": 103,
    "total_tokens": 132
  },
  "metadata": {
    "request_id": "req_7890abcdef",
    "processed_by": "openai-gpt4-12345"
  }
}

// Final Response to Client
{
  "status": "success",
  "request_id": "req_7890abcdef",
  "result": {
    "text": "Autonomous driving is like having a robot chauffeur in your car. The car uses cameras, sensors, and computers to see the road, other vehicles, and obstacles—just like human eyes and brain do. It can steer, brake, accelerate, and make decisions without a human driver. Think of it as your car having its own brain that can drive while you relax, read, or nap. The technology ranges from helping features (like automatic braking) to fully driverless cars that need no human input at all.",
    "model": "gpt-4",
    "usage": {
      "prompt_tokens": 29,
      "completion_tokens": 103,
      "total_tokens": 132
    }
  },
  "timing": {
    "total_ms": 1250,
    "thinking_ms": 1150,
    "processing_ms": 100
  }
}`
    }
  ];

  // Get current steps based on active tab
  const getCurrentSteps = () => {
    switch (activeTab) {
      case 'handshake':
        return handshakeSteps;
      case 'discovery':
        return discoverySteps;
      case 'invocation':
        return invocationSteps;
      default:
        return handshakeSteps;
    }
  };

  const currentSteps = getCurrentSteps();

  // Handle tab change
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setActiveStep(0);
    setIsComplete(false);
  };

  // Handle step navigation
  const handleNextStep = () => {
    if (activeStep < currentSteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setIsComplete(false);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsComplete(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
      <PHeading tag="h3" size="medium" className="mb-4">
        Connector-Prozesse
      </PHeading>
      
      <Tabs
        tabs={[
          { 
            id: 'handshake', 
            label: 'Handshake Prozess',
            content: <></>  // Content will be rendered separately
          },
          { 
            id: 'discovery', 
            label: 'Discovery Mechanismus',
            content: <></>
          },
          { 
            id: 'invocation', 
            label: 'Aufrufsequenz',
            content: <></>
          }
        ]}
        defaultTabId={activeTab}
        onChange={handleTabChange}
        className="mb-6"
        contentClassName="hidden" // Hide the content section as we'll render our own
      />
      
      <div className="mb-6">
        <PHeading tag="h4" size="small" className="mb-2">
          {activeTab === 'handshake' ? 'Connector Handshake Prozess' : 
           activeTab === 'discovery' ? 'Service Discovery Mechanismus' : 
           'Connector Aufrufsequenz'}
        </PHeading>
        <PText className="mb-4">
          {activeTab === 'handshake' ? 
            'Der Prozess, durch den ein neuer Connector sich beim MCP-Server registriert und authentifiziert.' : 
           activeTab === 'discovery' ? 
            'Wie Client-Anwendungen verfügbare KI-Dienste und deren Fähigkeiten entdecken können.' : 
            'Der Ablauf einer Anfrage von der Client-Anwendung bis zur Antwort des KI-Dienstes.'}
        </PText>
      </div>
      
      {/* Process Steps */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
        {currentSteps.map((step, index) => (
          <motion.div
            key={index}
            variants={stepVariants}
            initial="inactive"
            animate={
              index === activeStep 
                ? "active" 
                : index < activeStep || isComplete 
                  ? "complete" 
                  : "inactive"
            }
            className="min-w-[200px] p-4 rounded-lg border border-gray-300 cursor-pointer"
            onClick={() => {
              setActiveStep(index);
              setIsComplete(false);
            }}
          >
            <div className="flex items-center mb-2">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-white
                  ${index === activeStep 
                    ? 'bg-blue-500' 
                    : index < activeStep || isComplete 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'}`}
              >
                {index < activeStep || isComplete ? '✓' : index + 1}
              </div>
              <PText className="font-semibold">
                {step.title}
              </PText>
            </div>
            <PText size="small">
              {step.description}
            </PText>
          </motion.div>
        ))}
      </div>
      
      {/* Code Example */}
      <motion.div
        key={`${activeTab}-${activeStep}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-[#1E1E1E] rounded-lg mb-6 overflow-hidden">
          <SyntaxHighlighter
            language="json"
            style={vscDarkPlus}
            customStyle={{ 
              margin: 0, 
              padding: '16px', 
              borderRadius: '8px',
              maxHeight: '350px',
              overflow: 'auto'
            }}
          >
            {currentSteps[activeStep].code}
          </SyntaxHighlighter>
        </div>
      </motion.div>
      
      {/* Navigation Controls */}
      <div className="flex justify-between">
        <div>
          <PButton
            variant="secondary"
            onClick={handlePrevStep}
            disabled={activeStep === 0}
            className="mr-2"
          >
            Zurück
          </PButton>
          
          <PButton
            variant="primary"
            onClick={handleNextStep}
            disabled={isComplete}
          >
            {activeStep < currentSteps.length - 1 ? 'Weiter' : 'Abschließen'}
          </PButton>
        </div>
        
        {isComplete && (
          <PButton
            variant="secondary"
            onClick={handleReset}
          >
            Prozess neu starten
          </PButton>
        )}
      </div>
    </div>
  );
};

export default ConnectorExample; 