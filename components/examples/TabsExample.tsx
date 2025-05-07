"use client";

import React from 'react';
import Tabs from '@/components/ui/Tabs';
import InfoCard from '@/components/ui/InfoCard';
import PText from '@/components/ui/PText';
import PHeading from '@/components/ui/PHeading';

const TabsExample: React.FC = () => {
  // Define tabs for the first example
  const defaultTabs = [
    {
      id: 'tab1',
      label: 'First Tab',
      content: (
        <div className="p-4">
          <PHeading tag="h4" size="small">First Tab Content</PHeading>
          <PText>This is the content for the first tab. It demonstrates the basic functionality of the Tabs component.</PText>
        </div>
      ),
    },
    {
      id: 'tab2',
      label: 'Second Tab',
      content: (
        <div className="p-4">
          <PHeading tag="h4" size="small">Second Tab Content</PHeading>
          <PText>This is the content for the second tab. You can navigate between tabs using the keyboard as well.</PText>
        </div>
      ),
    },
    {
      id: 'tab3',
      label: 'Third Tab',
      content: (
        <div className="p-4">
          <PHeading tag="h4" size="small">Third Tab Content</PHeading>
          <PText>This is the content for the third tab. The Tabs component supports both horizontal and vertical orientations.</PText>
        </div>
      ),
    },
  ];

  // Define tabs for the second example with icons
  const tabsWithIcons = [
    {
      id: 'info',
      label: 'Information',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (
        <InfoCard title="Information Tab" variant="info">
          This tab demonstrates how icons can be included with tab labels for better visual communication.
        </InfoCard>
      ),
    },
    {
      id: 'warning',
      label: 'Warning',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      content: (
        <InfoCard title="Warning Tab" variant="warning">
          This tab shows how you can combine the Tabs component with other UI components like InfoCard.
        </InfoCard>
      ),
    },
    {
      id: 'success',
      label: 'Success',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (
        <InfoCard title="Success Tab" variant="success">
          The Tabs component supports different styling variants and can be integrated with other components.
        </InfoCard>
      ),
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <PHeading tag="h3" size="medium" className="mb-4">Default Tabs</PHeading>
        <Tabs 
          tabs={defaultTabs} 
          variant="default"
          className="mb-8"
        />
      </div>

      <div>
        <PHeading tag="h3" size="medium" className="mb-4">Outline Tabs</PHeading>
        <Tabs 
          tabs={defaultTabs} 
          variant="outline"
          className="mb-8"
        />
      </div>

      <div>
        <PHeading tag="h3" size="medium" className="mb-4">Pills Tabs</PHeading>
        <Tabs 
          tabs={defaultTabs} 
          variant="pills"
          className="mb-8"
        />
      </div>

      <div>
        <PHeading tag="h3" size="medium" className="mb-4">Vertical Tabs</PHeading>
        <Tabs 
          tabs={defaultTabs} 
          variant="outline"
          orientation="vertical"
          className="mb-8"
        />
      </div>

      <div>
        <PHeading tag="h3" size="medium" className="mb-4">Tabs with Icons</PHeading>
        <Tabs 
          tabs={tabsWithIcons} 
          variant="pills"
          className="mb-8"
        />
      </div>
    </div>
  );
};

export default TabsExample; 