"use client";

import React from 'react';
import ComparisonChart from '@/components/interactive/ComparisonChart';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import Tabs from '@/components/ui/Tabs';
import InfoCard from '@/components/ui/InfoCard';

const ComparisonChartExample: React.FC = () => {
  // LLM Performance Metrics Example
  const llmPerformanceData = [
    {
      id: 'gpt4',
      label: 'GPT-4',
      metrics: [
        { name: 'Reasoning', value: 92, maxValue: 100 },
        { name: 'Context Length', value: 128, maxValue: 200 },
        { name: 'Speed', value: 65, maxValue: 100 },
        { name: 'Cost', value: 95, maxValue: 100 },
      ],
      color: '#0069b4',
    },
    {
      id: 'claude',
      label: 'Claude',
      metrics: [
        { name: 'Reasoning', value: 88, maxValue: 100 },
        { name: 'Context Length', value: 180, maxValue: 200 },
        { name: 'Speed', value: 78, maxValue: 100 },
        { name: 'Cost', value: 75, maxValue: 100 },
      ],
      color: '#6CAAE4',
    },
    {
      id: 'llama3',
      label: 'Llama 3',
      metrics: [
        { name: 'Reasoning', value: 81, maxValue: 100 },
        { name: 'Context Length', value: 100, maxValue: 200 },
        { name: 'Speed', value: 88, maxValue: 100 },
        { name: 'Cost', value: 40, maxValue: 100 },
      ],
      color: '#159f9a',
    },
  ];

  // Automotive Features Example
  const automotiveFeaturesData = [
    {
      id: 'modelA',
      label: 'Model A',
      metrics: [
        { name: 'Safety', value: 75, maxValue: 100 },
        { name: 'Performance', value: 90, maxValue: 100 },
        { name: 'Comfort', value: 85, maxValue: 100 },
        { name: 'Efficiency', value: 70, maxValue: 100 },
        { name: 'Technology', value: 95, maxValue: 100 },
      ],
      color: '#0069b4',
    },
    {
      id: 'modelB',
      label: 'Model B',
      metrics: [
        { name: 'Safety', value: 90, maxValue: 100 },
        { name: 'Performance', value: 80, maxValue: 100 },
        { name: 'Comfort', value: 95, maxValue: 100 },
        { name: 'Efficiency', value: 85, maxValue: 100 },
        { name: 'Technology', value: 80, maxValue: 100 },
      ],
      color: '#159f9a',
    },
  ];

  // Software Development Methodology Comparison
  const methodologyData = [
    {
      id: 'agile',
      label: 'Agile',
      metrics: [
        { name: 'Flexibility', value: 95, maxValue: 100 },
        { name: 'Time-to-Market', value: 85, maxValue: 100 },
        { name: 'Customer Satisfaction', value: 90, maxValue: 100 },
        { name: 'Team Happiness', value: 88, maxValue: 100 },
        { name: 'Cost Effectiveness', value: 75, maxValue: 100 },
      ],
      color: '#0069b4',
    },
    {
      id: 'waterfall',
      label: 'Waterfall',
      metrics: [
        { name: 'Flexibility', value: 40, maxValue: 100 },
        { name: 'Time-to-Market', value: 50, maxValue: 100 },
        { name: 'Customer Satisfaction', value: 60, maxValue: 100 },
        { name: 'Team Happiness', value: 65, maxValue: 100 },
        { name: 'Cost Effectiveness', value: 70, maxValue: 100 },
      ],
      color: '#6CAAE4',
    },
    {
      id: 'devops',
      label: 'DevOps',
      metrics: [
        { name: 'Flexibility', value: 85, maxValue: 100 },
        { name: 'Time-to-Market', value: 95, maxValue: 100 },
        { name: 'Customer Satisfaction', value: 85, maxValue: 100 },
        { name: 'Team Happiness', value: 90, maxValue: 100 },
        { name: 'Cost Effectiveness', value: 85, maxValue: 100 },
      ],
      color: '#159f9a',
    },
  ];

  // Define tabs for examples
  const exampleTabs = [
    {
      id: 'llm-comparison',
      label: 'LLM Performance',
      content: (
        <div className="p-4">
          <PText className="mb-4">
            This comparison chart shows performance metrics across different large language models, 
            highlighting their relative strengths in reasoning, context handling, speed, and cost.
          </PText>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <ComparisonChart
              title="LLM Performance Comparison"
              description="Side-by-side comparison of key metrics across leading LLMs."
              data={llmPerformanceData}
              height={400}
              showLabels={true}
              showLegend={true}
              showTooltip={true}
              orientation="horizontal"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'automotive',
      label: 'Automotive Comparison',
      content: (
        <div className="p-4">
          <PText className="mb-4">
            This chart compares key features of different automotive models across multiple dimensions,
            providing a clear visualization of their relative strengths.
          </PText>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <ComparisonChart
              title="Automotive Model Comparison"
              description="Comparing key features across different vehicle models."
              data={automotiveFeaturesData}
              height={400}
              showLabels={true}
              showLegend={true}
              showTooltip={true}
              orientation="vertical"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'methodology',
      label: 'Development Methodologies',
      content: (
        <div className="p-4">
          <PText className="mb-4">
            This comparison visualizes the strengths and weaknesses of different software development methodologies
            across key performance indicators.
          </PText>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <ComparisonChart
              title="Development Methodology Comparison"
              description="Comparing effectiveness of different development approaches."
              data={methodologyData}
              height={450}
              showLabels={true}
              showLegend={true}
              showTooltip={true}
              orientation="horizontal"
              animationDuration={1000}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'custom',
      label: 'Customization Options',
      content: (
        <div className="p-4">
          <InfoCard title="Component Flexibility" variant="info" className="mb-4">
            The ComparisonChart component offers extensive customization options:
            <ul className="list-disc pl-5 mt-2">
              <li>Horizontal or vertical orientation</li>
              <li>Customizable colors for each item</li>
              <li>Show/hide legends, labels, and tooltips</li>
              <li>Animation duration control</li>
              <li>Maximum value specification per metric</li>
              <li>Responsive design that adapts to container width</li>
            </ul>
          </InfoCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <PHeading tag="h4" size="small" className="mb-2">Horizontal Orientation</PHeading>
              <ComparisonChart
                data={llmPerformanceData.slice(0, 2)}
                height={250}
                showLegend={false}
                orientation="horizontal"
                animationDuration={1200}
              />
            </div>
            <div>
              <PHeading tag="h4" size="small" className="mb-2">Vertical Orientation</PHeading>
              <ComparisonChart
                data={llmPerformanceData.slice(0, 2)}
                height={250}
                showLegend={false}
                orientation="vertical"
                animationDuration={1200}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <PHeading tag="h2" size="large" className="mb-4">Comparison Chart Examples</PHeading>
        <PText className="mb-6">
          The ComparisonChart component enables side-by-side analysis of multiple items across various metrics.
          It's useful for feature comparisons, performance benchmarks, and highlighting relative strengths.
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

export default ComparisonChartExample; 