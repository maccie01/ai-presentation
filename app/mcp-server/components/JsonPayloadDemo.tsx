'use client';

import React, { useState } from 'react';
import PButton from '@/components/ui/PButton';
import PText from '@/components/ui/PText';
import PHeading from '@/components/ui/PHeading';
import Tabs from '@/components/ui/Tabs';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Sample payloads for different request types
const payloadExamples = {
  chat: {
    request: {
      action: "chat",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an automotive engineering assistant with expertise in vehicle systems and diagnostics."
        },
        {
          role: "user",
          content: "What are the key components of an electric vehicle's battery management system?"
        }
      ],
      parameters: {
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1.0
      },
      metadata: {
        user_id: "user_12345",
        session_id: "sess_abcde",
        request_id: "req_67890"
      }
    },
    response: {
      status: "success",
      request_id: "req_67890",
      content: {
        model: "gpt-4",
        response: "The Battery Management System (BMS) in an electric vehicle is crucial for monitoring and protecting the battery. Key components include:\n\n1. **Control Unit**: The main processor that coordinates all BMS functions and communicates with the vehicle's systems.\n\n2. **Cell Monitoring Circuits**: Hardware that measures voltage, current, and temperature of individual battery cells.\n\n3. **Thermal Management System**: Controls heating and cooling to keep batteries within optimal temperature range.\n\n4. **Balancing Circuits**: Ensures all cells maintain similar charge levels to maximize capacity and lifespan.\n\n5. **State Estimation Algorithms**: Software that calculates State of Charge (SoC), State of Health (SoH), and State of Power (SoP).\n\n6. **Safety Systems**: Includes contactors, fuses, and isolation monitoring to prevent hazardous conditions.\n\n7. **Communication Interfaces**: CAN bus or other protocols to send data to the vehicle control systems and diagnostics.\n\n8. **Current Sensors**: High-precision measurements of current flowing in/out of the battery pack.\n\n9. **Diagnostics System**: Continuously monitors for faults and stores diagnostic trouble codes.\n\n10. **Data Storage**: Keeps historical data for performance analysis and warranty purposes.\n\nThe BMS is essential for maximizing battery life, ensuring safe operation, optimizing performance, and providing accurate range estimation.",
        finish_reason: "stop",
        usage: {
          prompt_tokens: 42,
          completion_tokens: 237,
          total_tokens: 279
        }
      },
      metrics: {
        response_time_ms: 850,
        processing_time_ms: 750,
        queue_time_ms: 100
      }
    }
  },
  completion: {
    request: {
      action: "completion",
      model: "gpt-4",
      prompt: "List the top 5 safety features in modern automotive systems",
      parameters: {
        temperature: 0.3,
        max_tokens: 300,
        top_p: 1.0
      },
      metadata: {
        user_id: "user_12345",
        session_id: "sess_abcde",
        request_id: "req_67891"
      }
    },
    response: {
      status: "success",
      request_id: "req_67891",
      content: {
        model: "gpt-4",
        response: "1. Advanced Driver Assistance Systems (ADAS): Includes features like automatic emergency braking, lane keeping assist, and adaptive cruise control that use sensors and cameras to monitor surroundings and assist drivers.\n\n2. Electronic Stability Control (ESC): Automatically applies brakes to individual wheels to help maintain directional control during emergency maneuvers or on slippery surfaces.\n\n3. Airbag Systems: Modern vehicles feature multiple airbags (frontal, side, knee, curtain) with advanced sensors that adjust deployment based on crash severity, occupant position, and seat belt use.\n\n4. Collision Mitigation Systems: Pre-collision systems that detect imminent crashes, pre-tension seat belts, adjust headrests, close windows, and prepare braking systems for maximum stopping power.\n\n5. Blind Spot Detection: Uses radar or cameras to monitor areas beside and behind the vehicle that are difficult for drivers to see, providing alerts when vehicles enter these blind spots.",
        finish_reason: "stop",
        usage: {
          prompt_tokens: 12,
          completion_tokens: 172,
          total_tokens: 184
        }
      },
      metrics: {
        response_time_ms: 650,
        processing_time_ms: 580,
        queue_time_ms: 70
      }
    }
  },
  image: {
    request: {
      action: "image_generation",
      model: "dall-e-3",
      prompt: "Create a photorealistic image of a futuristic electric vehicle charging station with solar panels and automated battery swapping robots",
      parameters: {
        quality: "hd",
        size: "1024x1024",
        style: "photographic"
      },
      metadata: {
        user_id: "user_12345",
        session_id: "sess_abcde",
        request_id: "req_67892"
      }
    },
    response: {
      status: "success",
      request_id: "req_67892",
      content: {
        model: "dall-e-3",
        images: [
          {
            url: "https://mcp-server.example.com/images/generated/img_67892_01.png",
            size: "1024x1024",
            format: "png"
          }
        ],
        prompt_feedback: "Created image of futuristic charging station with solar canopy and robotic battery swap system"
      },
      metrics: {
        response_time_ms: 3250,
        processing_time_ms: 3150,
        queue_time_ms: 100
      }
    }
  },
  error: {
    request: {
      action: "chat",
      model: "nonexistent-model",
      messages: [
        {
          role: "user",
          content: "Explain quantum computing"
        }
      ],
      parameters: {
        temperature: 0.7,
        max_tokens: 300
      },
      metadata: {
        user_id: "user_12345",
        session_id: "sess_abcde",
        request_id: "req_67893"
      }
    },
    response: {
      status: "error",
      request_id: "req_67893",
      error: {
        code: "model_not_found",
        message: "The requested model 'nonexistent-model' does not exist or is not available",
        details: {
          available_models: ["gpt-4", "gpt-3.5-turbo", "dall-e-3", "gemini-pro"],
          suggestion: "Try using one of the available models listed in the details"
        },
        status_code: 404
      },
      metrics: {
        response_time_ms: 120,
        processing_time_ms: 50,
        queue_time_ms: 70
      }
    }
  }
};

interface PayloadViewProps {
  jsonData: object;
  title: string;
}

const PayloadView: React.FC<PayloadViewProps> = ({ jsonData, title }) => {
  return (
    <div className="mb-4">
      <PText className="font-semibold mb-2">
        {title}
      </PText>
      <div className="bg-[#1E1E1E] rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language="json"
          style={vscDarkPlus}
          customStyle={{ 
            margin: 0, 
            padding: '16px', 
            borderRadius: '8px',
            maxHeight: '400px',
            overflow: 'auto'
          }}
        >
          {JSON.stringify(jsonData, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const JsonPayloadDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Create tab content
  const renderTabContent = (tabId: string) => {
    const payload = payloadExamples[tabId as keyof typeof payloadExamples];
    
    return (
      <motion.div
        key={tabId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <PayloadView 
              jsonData={payload.request} 
              title="Anfrage (Request) Payload" 
            />
          </div>
          <div className="w-full md:w-1/2">
            <PayloadView 
              jsonData={payload.response} 
              title="Antwort (Response) Payload" 
            />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
      <PHeading tag="h3" size="medium" className="mb-4">
        JSON Payload Struktur
      </PHeading>
      
      <PText className="mb-6">
        Der MCP-Server verwendet standardisierte JSON-Payloads für die Kommunikation. 
        Die folgenden Beispiele zeigen die Struktur für verschiedene Anfragetypen.
      </PText>
      
      <Tabs
        tabs={[
          { id: 'chat', label: 'Chat Anfrage', content: renderTabContent('chat') },
          { id: 'completion', label: 'Text Completion', content: renderTabContent('completion') },
          { id: 'image', label: 'Bild-Generierung', content: renderTabContent('image') },
          { id: 'error', label: 'Fehler-Antwort', content: renderTabContent('error') }
        ]}
        defaultTabId={activeTab}
        onChange={handleTabChange}
        className="mb-6"
      />
      
      <div className="mt-8">
        <PHeading tag="h4" size="small" className="mb-4">
          Payload-Struktur Richtlinien
        </PHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <PHeading tag="h5" size="small" className="mb-2">Anfrage-Struktur</PHeading>
            <ul className="pl-5 space-y-1">
              <li><PText size="small">Immer <code className="bg-gray-100 px-1 rounded">action</code> angeben, um den Anfragetyp zu identifizieren</PText></li>
              <li><PText size="small"><code className="bg-gray-100 px-1 rounded">model</code> spezifiziert das zu verwendende KI-Modell</PText></li>
              <li><PText size="small"><code className="bg-gray-100 px-1 rounded">parameters</code> enthält modellspezifische Konfiguration</PText></li>
              <li><PText size="small"><code className="bg-gray-100 px-1 rounded">metadata</code> wird für Tracking und Logging verwendet</PText></li>
              <li><PText size="small">Jede Anfrage sollte eine eindeutige <code className="bg-gray-100 px-1 rounded">request_id</code> haben</PText></li>
            </ul>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <PHeading tag="h5" size="small" className="mb-2">Antwort-Struktur</PHeading>
            <ul className="pl-5 space-y-1">
              <li><PText size="small"><code className="bg-gray-100 px-1 rounded">status</code> zeigt Erfolg oder Fehler an</PText></li>
              <li><PText size="small"><code className="bg-gray-100 px-1 rounded">request_id</code> entspricht der ID der Anfrage</PText></li>
              <li><PText size="small"><code className="bg-gray-100 px-1 rounded">content</code> enthält die eigentlichen Ergebnisdaten</PText></li>
              <li><PText size="small"><code className="bg-gray-100 px-1 rounded">metrics</code> bietet Performance-Informationen</PText></li>
              <li><PText size="small">Bei Fehlern enthält <code className="bg-gray-100 px-1 rounded">error</code> detaillierte Informationen</PText></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonPayloadDemo; 