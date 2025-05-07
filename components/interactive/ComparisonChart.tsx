"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { motion } from 'framer-motion';

interface DataItem {
  id: string;
  label: string;
  metrics: {
    name: string;
    value: number;
    maxValue?: number;
  }[];
  color?: string;
}

interface ComparisonChartProps {
  title?: string;
  description?: string;
  data: DataItem[];
  height?: number;
  colorScheme?: string[];
  metricLabels?: string[];
  showLabels?: boolean;
  showLegend?: boolean;
  showValues?: boolean;
  showTooltip?: boolean;
  orientation?: 'horizontal' | 'vertical';
  animationDuration?: number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  title,
  description,
  data,
  height = 400,
  colorScheme = ['#0069b4', '#6CAAE4', '#B2D4F5', '#159f9a', '#81CCC8', '#C2E5E4'],
  metricLabels,
  showLabels = true,
  showLegend = true,
  showValues = true,
  showTooltip = true,
  orientation = 'horizontal',
  animationDuration = 800,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const margin = { top: 40, right: 60, bottom: 60, left: 100 };
  
  // Calculate inner dimensions
  const innerWidth = containerWidth - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const containerWidth = svgRef.current.parentElement?.clientWidth || 600;
        setContainerWidth(containerWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create chart
  useEffect(() => {
    if (!svgRef.current || data.length === 0 || containerWidth === 0) return;

    // Clear existing chart
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', height);

    const chartGroup = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create tooltip
    const tooltip = showTooltip ? d3.select('body')
      .append('div')
      .attr('class', 'chart-tooltip')
      .style('position', 'absolute')
      .style('background', 'white')
      .style('padding', '8px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('transition', 'opacity 0.2s')
      .style('z-index', 1000) : null;

    // Extract all metric names
    const metricNames = [...new Set(data.flatMap(item => item.metrics.map(m => m.name)))];
    
    // Determine max values for each metric
    const metricMaxValues = metricNames.map(metricName => {
      const specificMaxValue = data
        .flatMap(item => item.metrics.filter(m => m.name === metricName))
        .find(m => m.maxValue !== undefined)?.maxValue;
      
      if (specificMaxValue !== undefined) {
        return specificMaxValue;
      }
      
      return Math.max(
        ...data.flatMap(item => {
          const matchingMetric = item.metrics.find(m => m.name === metricName);
          return matchingMetric ? [matchingMetric.value] : [0];
        })
      ) * 1.1; // Add 10% padding
    });

    if (orientation === 'horizontal') {
      // Horizontal orientation (metrics as rows)
      const itemScale = d3.scaleBand()
        .domain(data.map(d => d.id))
        .range([0, innerWidth])
        .padding(0.2);

      const metricScale = d3.scaleBand()
        .domain(metricNames)
        .range([0, innerHeight])
        .padding(0.1);

      // Create value scales for each metric
      const valueScales = metricNames.map((metricName, index) => {
        return d3.scaleLinear()
          .domain([0, metricMaxValues[index]])
          .range([0, itemScale.bandwidth()]);
      });

      // Draw metric labels
      if (showLabels) {
        chartGroup.selectAll('.metric-label')
          .data(metricNames)
          .join('text')
          .attr('class', 'metric-label')
          .attr('x', -10)
          .attr('y', d => (metricScale(d) || 0) + metricScale.bandwidth() / 2)
          .attr('text-anchor', 'end')
          .attr('dominant-baseline', 'middle')
          .text(d => metricLabels ? metricLabels[metricNames.indexOf(d)] || d : d)
          .style('font-size', '12px');
      }

      // Draw item labels
      if (showLabels) {
        chartGroup.selectAll('.item-label')
          .data(data)
          .join('text')
          .attr('class', 'item-label')
          .attr('x', d => (itemScale(d.id) || 0) + itemScale.bandwidth() / 2)
          .attr('y', innerHeight + 25)
          .attr('text-anchor', 'middle')
          .text(d => d.label)
          .style('font-size', '12px');
      }

      // Draw bars for each item and metric
      data.forEach((item, itemIndex) => {
        metricNames.forEach((metricName, metricIndex) => {
          const metric = item.metrics.find(m => m.name === metricName);
          if (!metric) return; // Skip if this item doesn't have this metric
          
          const valueScale = valueScales[metricIndex];
          const barWidth = valueScale(metric.value);
          
          const bar = chartGroup.append('rect')
            .attr('x', itemScale(item.id) || 0)
            .attr('y', metricScale(metricName) || 0)
            .attr('width', 0) // Start at 0 for animation
            .attr('height', metricScale.bandwidth())
            .attr('fill', item.color || colorScheme[itemIndex % colorScheme.length])
            .attr('opacity', 0.8);

          // Animate the bar width
          bar.transition()
            .duration(animationDuration)
            .attr('width', barWidth);

          // Add value labels
          if (showValues && barWidth > 30) { // Only show if bar is wide enough
            chartGroup.append('text')
              .attr('x', (itemScale(item.id) || 0) + barWidth - 5)
              .attr('y', (metricScale(metricName) || 0) + metricScale.bandwidth() / 2)
              .attr('text-anchor', 'end')
              .attr('dominant-baseline', 'middle')
              .attr('fill', 'white')
              .text(metric.value)
              .style('font-size', '11px')
              .style('opacity', 0)
              .transition()
              .delay(animationDuration / 2)
              .duration(animationDuration / 2)
              .style('opacity', 1);
          }

          // Tooltip events
          if (showTooltip && tooltip) {
            bar.on('mouseover', function(event) {
              tooltip.transition().duration(200).style('opacity', 0.9);
              tooltip.html(`
                <div style="font-weight: bold;">${item.label} - ${metricName}</div>
                <div>Value: ${metric.value}</div>
                ${metric.maxValue !== undefined ? `<div>Max: ${metric.maxValue}</div>` : ''}
              `)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 28}px`);
            })
            .on('mouseout', function() {
              tooltip.transition().duration(500).style('opacity', 0);
            });
          }
        });
      });

      // Add grid lines
      metricNames.forEach((metric, i) => {
        chartGroup.append('line')
          .attr('x1', 0)
          .attr('x2', innerWidth)
          .attr('y1', (metricScale(metric) || 0) + metricScale.bandwidth())
          .attr('y2', (metricScale(metric) || 0) + metricScale.bandwidth())
          .attr('stroke', '#eee')
          .attr('stroke-width', 1);
      });

    } else {
      // Vertical orientation (metrics as columns)
      const itemScale = d3.scaleBand()
        .domain(data.map(d => d.id))
        .range([0, innerHeight])
        .padding(0.2);

      const metricScale = d3.scaleBand()
        .domain(metricNames)
        .range([0, innerWidth])
        .padding(0.1);

      // Create value scales for each metric
      const valueScales = metricNames.map((metricName, index) => {
        return d3.scaleLinear()
          .domain([0, metricMaxValues[index]])
          .range([0, itemScale.bandwidth()]);
      });

      // Draw metric labels
      if (showLabels) {
        chartGroup.selectAll('.metric-label')
          .data(metricNames)
          .join('text')
          .attr('class', 'metric-label')
          .attr('x', d => (metricScale(d) || 0) + metricScale.bandwidth() / 2)
          .attr('y', -10)
          .attr('text-anchor', 'middle')
          .text(d => metricLabels ? metricLabels[metricNames.indexOf(d)] || d : d)
          .style('font-size', '12px');
      }

      // Draw item labels
      if (showLabels) {
        chartGroup.selectAll('.item-label')
          .data(data)
          .join('text')
          .attr('class', 'item-label')
          .attr('x', -10)
          .attr('y', d => (itemScale(d.id) || 0) + itemScale.bandwidth() / 2)
          .attr('text-anchor', 'end')
          .attr('dominant-baseline', 'middle')
          .text(d => d.label)
          .style('font-size', '12px');
      }

      // Draw bars for each item and metric
      data.forEach((item, itemIndex) => {
        metricNames.forEach((metricName, metricIndex) => {
          const metric = item.metrics.find(m => m.name === metricName);
          if (!metric) return; // Skip if this item doesn't have this metric
          
          const valueScale = valueScales[metricIndex];
          const barHeight = valueScale(metric.value);
          
          const bar = chartGroup.append('rect')
            .attr('x', metricScale(metricName) || 0)
            .attr('y', (itemScale(item.id) || 0) + (itemScale.bandwidth() - barHeight))
            .attr('width', metricScale.bandwidth())
            .attr('height', 0) // Start at 0 for animation
            .attr('fill', item.color || colorScheme[itemIndex % colorScheme.length])
            .attr('opacity', 0.8);

          // Animate the bar height
          bar.transition()
            .duration(animationDuration)
            .attr('height', barHeight);

          // Add value labels
          if (showValues && barHeight > 20) { // Only show if bar is tall enough
            chartGroup.append('text')
              .attr('x', (metricScale(metricName) || 0) + metricScale.bandwidth() / 2)
              .attr('y', (itemScale(item.id) || 0) + itemScale.bandwidth() - barHeight + 15)
              .attr('text-anchor', 'middle')
              .attr('fill', 'white')
              .text(metric.value)
              .style('font-size', '11px')
              .style('opacity', 0)
              .transition()
              .delay(animationDuration / 2)
              .duration(animationDuration / 2)
              .style('opacity', 1);
          }

          // Tooltip events
          if (showTooltip && tooltip) {
            bar.on('mouseover', function(event) {
              tooltip.transition().duration(200).style('opacity', 0.9);
              tooltip.html(`
                <div style="font-weight: bold;">${item.label} - ${metricName}</div>
                <div>Value: ${metric.value}</div>
                ${metric.maxValue !== undefined ? `<div>Max: ${metric.maxValue}</div>` : ''}
              `)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 28}px`);
            })
            .on('mouseout', function() {
              tooltip.transition().duration(500).style('opacity', 0);
            });
          }
        });
      });

      // Add grid lines
      metricNames.forEach((metric, i) => {
        chartGroup.append('line')
          .attr('x1', (metricScale(metric) || 0) + metricScale.bandwidth())
          .attr('x2', (metricScale(metric) || 0) + metricScale.bandwidth())
          .attr('y1', 0)
          .attr('y2', innerHeight)
          .attr('stroke', '#eee')
          .attr('stroke-width', 1);
      });
    }

    // Legend
    if (showLegend) {
      const legendGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top - 20})`);

      const legend = legendGroup.selectAll('.legend')
        .data(data)
        .join('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(${i * 120}, 0)`);

      legend.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', (d, i) => d.color || colorScheme[i % colorScheme.length]);

      legend.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .text(d => d.label)
        .style('font-size', '12px');
    }

    // Cleanup
    return () => {
      if (tooltip) tooltip.remove();
    };
  }, [
    containerWidth, data, height, colorScheme, metricLabels, showLabels, 
    showLegend, showValues, showTooltip, orientation, animationDuration
  ]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {(title || description) && (
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          {title && <PHeading tag="h3" size="medium" className="mb-1">{title}</PHeading>}
          {description && <PText size="small">{description}</PText>}
        </div>
      )}
      
      <div className="p-4 flex justify-center">
        <svg ref={svgRef} />
      </div>
    </div>
  );
};

export default ComparisonChart; 