import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './radar.css'; // Import CSS file for styling

const RadarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const width = 500;
    const height = 500;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const radius = Math.min(width, height) / 2 - margin.top;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const radarGroup = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Define scales
    const scale = d3.scaleLinear()
      .domain([0, 100]) // Adjust the domain according to your data range
      .range([0, radius]);

    // Define colors for quadrants
    const colors = ['blue', 'green', 'red', 'orange']; // Add more colors as needed

    // Draw quadrants
    const numQuadrants = 4;

    const quadrantData = Array.from({ length: numQuadrants });

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle((d, i) => i * (Math.PI / 2)) // Set start angle for each quadrant
      .endAngle((d, i) => (i + 1) * (Math.PI / 2)) // Set end angle for each quadrant
      .padAngle(0.01) // Adjust the pad angle for spacing between quadrants

    const quadrants = radarGroup
      .selectAll('.quadrant')
      .data(quadrantData)
      .enter()
      .append('path')
      .attr('class', 'quadrant')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => colors[i % colors.length]); // Apply color cyclically to the quadrants

    // Draw axes
    const axes = radarGroup
      .selectAll('.axis')
      .data(data)
      .enter()
      .append('line')
      .attr('class', 'axis')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => scale(d) * Math.sin((2 * Math.PI * i) / data.length))
      .attr('y2', (d, i) => -scale(d) * Math.cos((2 * Math.PI * i) / data.length));

    // Draw blips
    const blips = radarGroup
      .selectAll('.blip')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'blip')
      .attr('cx', (d, i) => scale(d) * Math.sin((2 * Math.PI * i) / data.length))
      .attr('cy', (d, i) => -scale(d) * Math.cos((2 * Math.PI * i) / data.length))
      .attr('r', 5)
      .attr('fill', 'black');

  }, []);

  return <div className="radar-chart-container" ref={chartRef}></div>;
};

export default RadarChart;
