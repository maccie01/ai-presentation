"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { useTheme } from '@/lib/themeContext';

interface DataPoint {
  x: string | number;
  y: number;
  color?: string;
  label?: string;
}

interface ChartVisualizationProps {
  title?: string;
  description?: string;
  data: DataPoint[];
  type: 'bar' | 'line' | 'pie';
  width?: number;
  height?: number;
  colorScheme?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const ChartVisualization: React.FC<ChartVisualizationProps> = ({
  title,
  description,
  data,
  type,
  width = 600,
  height = 400,
  colorScheme = ['#0069b4', '#6CAAE4', '#B2D4F5', '#159f9a', '#81CCC8', '#C2E5E4'],
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  xAxisLabel,
  yAxisLabel,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [containerWidth, setContainerWidth] = useState(width);
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };
  const innerWidth = containerWidth - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const { isDarkMode } = useTheme();

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const containerWidth = svgRef.current.parentElement?.clientWidth || width;
        setContainerWidth(containerWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  // Create chart
  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    // Theme-aware colors
    const axisColor = isDarkMode ? 'rgba(229, 231, 235, 0.8)' : 'rgba(55, 65, 81, 0.8)';
    const gridColor = isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)';
    const tooltipBg = isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'white';
    const tooltipTextColor = isDarkMode ? 'rgba(229, 231, 235, 0.9)' : 'rgba(55, 65, 81, 0.9)';
    const tooltipBorderColor = isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)';

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
      .style('background', tooltipBg)
      .style('color', tooltipTextColor)
      .style('padding', '8px')
      .style('border', `1px solid ${tooltipBorderColor}`)
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('transition', 'opacity 0.2s')
      .style('z-index', 1000) : null;

    if (type === 'bar') {
      // Bar chart
      const x = d3.scaleBand()
        .domain(data.map(d => d.x.toString()))
        .range([0, innerWidth])
        .padding(0.2);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y) || 0])
        .nice()
        .range([innerHeight, 0]);

      // X axis
      chartGroup.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'middle')
        .style('fill', axisColor);

      // Y axis
      chartGroup.append('g')
        .call(d3.axisLeft(y))
        .selectAll('text')
        .style('fill', axisColor);

      // Style axis lines
      chartGroup.selectAll('.domain')
        .style('stroke', axisColor);
      chartGroup.selectAll('.tick line')
        .style('stroke', axisColor);

      // Grid lines
      if (showGrid) {
        chartGroup.append('g')
          .attr('class', 'grid')
          .call(d3.axisLeft(y)
            .tickSize(-innerWidth)
            .tickFormat(() => '')
          )
          .selectAll('line')
          .attr('stroke', gridColor);
      }

      // Bars
      chartGroup.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', d => x(d.x.toString()) || 0)
        .attr('y', d => y(d.y))
        .attr('width', x.bandwidth())
        .attr('height', d => innerHeight - y(d.y))
        .attr('fill', (d, i) => d.color || colorScheme[i % colorScheme.length]);

      // Tooltip events
      if (showTooltip && tooltip) {
        chartGroup.selectAll('rect')
          .on('mouseover', function(event, d) {
            const dataPoint = d as DataPoint;
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip.html(`<strong>${dataPoint.x}</strong>: ${dataPoint.y}${dataPoint.label ? ` (${dataPoint.label})` : ''}`)
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 28}px`);
          })
          .on('mouseout', function() {
            tooltip.transition().duration(500).style('opacity', 0);
          });
      }

      // Axis labels
      if (xAxisLabel) {
        chartGroup.append('text')
          .attr('x', innerWidth / 2)
          .attr('y', innerHeight + margin.bottom - 10)
          .style('text-anchor', 'middle')
          .style('fill', axisColor)
          .text(xAxisLabel);
      }

      if (yAxisLabel) {
        chartGroup.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -innerHeight / 2)
          .attr('y', -margin.left + 15)
          .style('text-anchor', 'middle')
          .style('fill', axisColor)
          .text(yAxisLabel);
      }

    } else if (type === 'line') {
      // Line chart
      const x = d3.scalePoint()
        .domain(data.map(d => d.x.toString()))
        .range([0, innerWidth])
        .padding(0.5);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y) || 0])
        .nice()
        .range([innerHeight, 0]);

      // X axis
      chartGroup.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'middle')
        .style('fill', axisColor);

      // Y axis
      chartGroup.append('g')
        .call(d3.axisLeft(y))
        .selectAll('text')
        .style('fill', axisColor);

      // Style axis lines
      chartGroup.selectAll('.domain')
        .style('stroke', axisColor);
      chartGroup.selectAll('.tick line')
        .style('stroke', axisColor);

      // Grid lines
      if (showGrid) {
        chartGroup.append('g')
          .attr('class', 'grid')
          .call(d3.axisLeft(y)
            .tickSize(-innerWidth)
            .tickFormat(() => '')
          )
          .selectAll('line')
          .attr('stroke', gridColor);
      }

      // Line
      const line = d3.line<DataPoint>()
        .x(d => x(d.x.toString()) || 0)
        .y(d => y(d.y))
        .curve(d3.curveMonotoneX);

      chartGroup.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', colorScheme[0])
        .attr('stroke-width', 2)
        .attr('d', line);

      // Points
      const points = chartGroup.selectAll('.point')
        .data(data)
        .join('circle')
        .attr('class', 'point')
        .attr('cx', d => x(d.x.toString()) || 0)
        .attr('cy', d => y(d.y))
        .attr('r', 5)
        .attr('fill', colorScheme[0]);

      // Tooltip events
      if (showTooltip && tooltip) {
        points
          .on('mouseover', function(event, d) {
            const dataPoint = d as DataPoint;
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip.html(`<strong>${dataPoint.x}</strong>: ${dataPoint.y}${dataPoint.label ? ` (${dataPoint.label})` : ''}`)
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 28}px`);
          })
          .on('mouseout', function() {
            tooltip.transition().duration(500).style('opacity', 0);
          });
      }

      // Axis labels
      if (xAxisLabel) {
        chartGroup.append('text')
          .attr('x', innerWidth / 2)
          .attr('y', innerHeight + margin.bottom - 10)
          .style('text-anchor', 'middle')
          .style('fill', axisColor)
          .text(xAxisLabel);
      }

      if (yAxisLabel) {
        chartGroup.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -innerHeight / 2)
          .attr('y', -margin.left + 15)
          .style('text-anchor', 'middle')
          .style('fill', axisColor)
          .text(yAxisLabel);
      }

    } else if (type === 'pie') {
      // Pie chart
      const radius = Math.min(innerWidth, innerHeight) / 2;
      
      const pie = d3.pie<DataPoint>()
        .value(d => d.y)
        .sort(null);

      const arc = d3.arc<d3.PieArcDatum<DataPoint>>()
        .innerRadius(0)
        .outerRadius(radius);

      const arcs = pie(data);

      const pieGroup = chartGroup.append('g')
        .attr('transform', `translate(${innerWidth / 2},${innerHeight / 2})`);

      pieGroup.selectAll('path')
        .data(arcs)
        .join('path')
        .attr('d', arc)
        .attr('fill', (d, i) => d.data.color || colorScheme[i % colorScheme.length]);

      // Labels
      pieGroup.selectAll('text')
        .data(arcs)
        .join('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', isDarkMode ? 'white' : 'black')
        .text(d => d.data.x.toString());

      // Tooltip events
      if (showTooltip && tooltip) {
        pieGroup.selectAll('path')
          .on('mouseover', function(event, d) {
            const dataPoint = (d as d3.PieArcDatum<DataPoint>).data;
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip.html(`<strong>${dataPoint.x}</strong>: ${dataPoint.y}${dataPoint.label ? ` (${dataPoint.label})` : ''}`)
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 28}px`);
          })
          .on('mouseout', function() {
            tooltip.transition().duration(500).style('opacity', 0);
          });
      }
    }

    // Clean up tooltip on unmount
    return () => {
      if (tooltip) tooltip.remove();
    };
  }, [containerWidth, data, height, innerHeight, innerWidth, margin.bottom, margin.left, margin.top, showGrid, showTooltip, type, width, colorScheme, xAxisLabel, yAxisLabel, isDarkMode]);

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

export default ChartVisualization; 