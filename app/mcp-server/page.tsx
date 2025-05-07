'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHero from '@/components/sections/SectionHero';
import SectionContent from '@/components/sections/SectionContent';
import InteractiveArea from '@/components/sections/InteractiveArea';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import ConnectorExample from './components/ConnectorExample';
import JsonPayloadDemo from './components/JsonPayloadDemo';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const MCPServerPage = () => {
  return (
    <main>
      <SectionHero
        title="MCP-Server"
        subtitle="Ein zentralisierter Mechanismus für die sichere Kommunikation mit AI-Diensten"
      />

      <SectionContent>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="mb-8">
            <PHeading tag="h2" size="large" className="text-center mb-6">
              Überblick
            </PHeading>
            <PText>
              Der MCP-Server (Model Control Protocol Server) dient als zentrale Schnittstelle für die sichere Kommunikation 
              zwischen Anwendungen und verschiedenen KI-Diensten. Er bietet standardisierte Mechanismen für die Authentifizierung, 
              Autorisierung und Verwaltung von KI-Anfragen und -Antworten, während gleichzeitig Sicherheit und Compliance 
              gewährleistet werden.
            </PText>
          </div>

          <div className="my-12 border-t border-gray-200"></div>

          {/* Architecture Diagram Section */}
          <div className="mb-12">
            <PHeading tag="h2" size="large" className="text-center mb-6">
              Architektur
            </PHeading>
            <PText className="mb-6">
              Die folgende Darstellung zeigt die Architektur des MCP-Servers, seine Komponenten und wie 
              er in die Systemlandschaft integriert ist.
            </PText>
            <InteractiveArea title="MCP Server Architektur">
              <ArchitectureDiagram />
            </InteractiveArea>
          </div>

          <div className="my-12 border-t border-gray-200"></div>

          {/* Connector Example Section */}
          <div className="mb-12">
            <PHeading tag="h2" size="large" className="text-center mb-6">
              Connector-Beispiele
            </PHeading>
            <PText className="mb-6">
              Die Connector-Komponente ermöglicht die Integration verschiedener KI-Dienste mit dem MCP-Server.
              Hier werden der Handshake-Prozess, der Entdeckungsmechanismus und der Aufrufablauf visualisiert.
            </PText>
            <InteractiveArea title="Connector Prozesse">
              <ConnectorExample />
            </InteractiveArea>
          </div>

          <div className="my-12 border-t border-gray-200"></div>

          {/* JSON Payload Demo Section */}
          <div className="mb-12">
            <PHeading tag="h2" size="large" className="text-center mb-6">
              JSON Payload Demo
            </PHeading>
            <PText className="mb-6">
              Diese interaktive Demo zeigt die Struktur und Verwendung von JSON-Payloads für die Kommunikation 
              mit dem MCP-Server, einschließlich Beispielen für Anfragen und Antworten.
            </PText>
            <InteractiveArea title="JSON Payload Struktur">
              <JsonPayloadDemo />
            </InteractiveArea>
          </div>
        </motion.div>
      </SectionContent>
    </main>
  );
};

export default MCPServerPage; 