"use client";

import React, { useState } from 'react';
import InfoCard from '../ui/InfoCard';
import PHeading from '../ui/PHeading';
import PText from '../ui/PText';
import Tabs from '../ui/Tabs';
import UserProfileSchemaVisualization from '@/components/examples/UserProfileSchemaVisualization';
import PersonalizationDecisionTree from '@/components/examples/PersonalizationDecisionTree';
import MemoryLifecycleDiagram from '@/components/examples/MemoryLifecycleDiagram';

interface SessionPersonalizationExampleProps {
  title: string;
  description: string;
}

const SessionPersonalizationExample: React.FC<SessionPersonalizationExampleProps> = ({
  title,
  description
}) => {
  const [activeTab, setActiveTab] = useState('user-profile');

  const tabs = [
    { 
      id: 'user-profile', 
      label: 'Benutzerprofilschema', 
      content: <UserProfileSchemaVisualization /> 
    },
    { 
      id: 'personalization', 
      label: 'Personalisierungsentscheidungen', 
      content: <PersonalizationDecisionTree /> 
    },
    { 
      id: 'lifecycle', 
      label: 'Memory-Lebenszyklus', 
      content: <MemoryLifecycleDiagram /> 
    }
  ];

  return (
    <InfoCard
      title={title}
      variant="info"
      className="w-full overflow-hidden"
    >
      <div>
        <PText className="mb-6">{description}</PText>
        
        <Tabs 
          tabs={tabs}
          defaultTabId={activeTab}
          onChange={setActiveTab}
          className="mb-4"
        />
      </div>
    </InfoCard>
  );
};

export default SessionPersonalizationExample; 