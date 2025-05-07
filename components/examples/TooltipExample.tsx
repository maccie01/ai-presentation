"use client";

import React from 'react';
import Tooltip from '@/components/ui/Tooltip';
import PButton from '@/components/ui/PButton';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid } from '@/components/ui/PGrid';
import InfoCard from '@/components/ui/InfoCard';

const TooltipExample: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <PHeading tag="h3" size="medium" className="mb-4">Basic Tooltips</PHeading>
        <PText>Hover over the buttons below to see tooltips in different positions.</PText>
        
        <div className="flex flex-wrap gap-6 mt-6">
          <Tooltip content="This tooltip appears above the button" position="top">
            <PButton>Top Tooltip</PButton>
          </Tooltip>
          
          <Tooltip content="This tooltip appears to the right of the button" position="right">
            <PButton>Right Tooltip</PButton>
          </Tooltip>
          
          <Tooltip content="This tooltip appears below the button" position="bottom">
            <PButton>Bottom Tooltip</PButton>
          </Tooltip>
          
          <Tooltip content="This tooltip appears to the left of the button" position="left">
            <PButton>Left Tooltip</PButton>
          </Tooltip>
        </div>
      </div>

      <div>
        <PHeading tag="h3" size="medium" className="mb-4">Tooltip Variants</PHeading>
        <PText>Tooltips can have different styles.</PText>
        
        <div className="flex flex-wrap gap-6 mt-6">
          <Tooltip content="Default dark tooltip" variant="dark">
            <PButton variant="secondary">Dark Tooltip</PButton>
          </Tooltip>
          
          <Tooltip content="Light tooltip with border" variant="light">
            <PButton variant="secondary">Light Tooltip</PButton>
          </Tooltip>
        </div>
      </div>

      <div>
        <PHeading tag="h3" size="medium" className="mb-4">Advanced Content</PHeading>
        <PText>Tooltips can contain rich content, not just text.</PText>
        
        <div className="flex flex-wrap gap-6 mt-6">
          <Tooltip 
            content={
              <div className="space-y-2">
                <PHeading tag="h4" size="small">Rich Content Tooltip</PHeading>
                <PText size="small">This tooltip contains formatted text and can include various UI elements.</PText>
                <div className="flex gap-2 pt-2">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                </div>
              </div>
            }
            maxWidth={300}
            position="bottom"
          >
            <PButton variant="tertiary">Rich Content</PButton>
          </Tooltip>
        </div>
      </div>
      
      <div>
        <PHeading tag="h3" size="medium" className="mb-4">Tooltips on Different Elements</PHeading>
        <PText>Tooltips can be attached to any interactive element.</PText>
        
        <PGrid cols={1} colsSm={2} colsMd={3} className="gap-6 mt-6">
          <Tooltip content="Tooltip on an info card">
            <InfoCard 
              title="Hover over this card" 
              variant="info"
              className="cursor-help"
            >
              This entire card has a tooltip attached to it.
            </InfoCard>
          </Tooltip>
          
          <div className="flex items-center space-x-2">
            <PText>Text with tooltip:</PText>
            <Tooltip content="Tooltip on text element">
              <span className="underline cursor-help text-blue-600">hover here</span>
            </Tooltip>
          </div>
          
          <div>
            <Tooltip content="Tooltip on an image">
              <img 
                src="https://via.placeholder.com/150" 
                alt="Placeholder" 
                className="rounded-md cursor-help"
              />
            </Tooltip>
          </div>
        </PGrid>
      </div>
      
      <div>
        <PHeading tag="h3" size="medium" className="mb-4">Customization Options</PHeading>
        <PText>Tooltips can be customized with different delays and animations.</PText>
        
        <div className="flex flex-wrap gap-6 mt-6">
          <Tooltip 
            content="This tooltip appears with no delay" 
            delay={0}
          >
            <PButton variant="secondary">No Delay</PButton>
          </Tooltip>
          
          <Tooltip 
            content="This tooltip has a longer delay before appearing" 
            delay={1000}
          >
            <PButton variant="secondary">Long Delay (1s)</PButton>
          </Tooltip>
          
          <Tooltip 
            content="This tooltip has no arrow pointer" 
            showArrow={false}
          >
            <PButton variant="secondary">No Arrow</PButton>
          </Tooltip>
          
          <Tooltip 
            content="Custom tooltip with styled border" 
            contentClassName="border-2 border-blue-500"
            variant="light"
          >
            <PButton variant="secondary">Custom Styling</PButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TooltipExample; 