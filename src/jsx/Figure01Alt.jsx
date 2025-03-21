import React, {
  useEffect, useRef, useState, useCallback, forwardRef
} from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

const FigureIntro = forwardRef(({ chart_data }, ref) => {
  const svgRef = useRef();
  const svgContainerRef = useRef();
  const simulationRef = useRef(null);
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    radius: Math.min(window.innerWidth, window.innerHeight) / 2 - 50,
    width: window.innerWidth
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        radius: Math.min(window.innerWidth, window.innerHeight) / 2 - 50,
        width: window.innerWidth
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getRadius = (value) => Math.sqrt((value * 10) / Math.PI);
  const chart = useCallback((nodes) => {
    const { width, height, radius } = dimensions;
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Bind circles
    const circles = svg.selectAll('circle').data(nodes, d => d.id);

    circles.exit().transition().duration(500).attr('r', 0)
      .remove();

    const enterCircles = circles.enter().append('circle')
      .attr('r', 0)
      .attr('stroke', '#fff')
      .attr('stroke-width', '2px')
      .attr('fill', d => d.fill);

    // Merge and transition circles
    enterCircles.merge(circles)
      .transition()
      .duration(1000)
      // eslint-disable-next-line
      .attrTween('r', function (d) {
        // eslint-disable-next-line
        const startRadius = this.getAttribute('r') || 0;
        const endRadius = getRadius(d.value);
        const i = d3.interpolate(startRadius, endRadius);
        return (t) => {
          d.radius = i(t); // Store the interpolated radius dynamically
          return d.radius;
        };
      });

    const textPadding = 20; // Adjust if needed
    const fontSize = 16; // Base font size

    // Value labels (inside the circle)
    const valueLabels = svg.selectAll('.value-label').data(nodes, d => d.id);

    valueLabels.exit().remove();

    const enterValueLabels = valueLabels.enter().append('text')
      .attr('class', 'value-label')
      .attr('text-anchor', 'middle')
      .style('font-size', `${fontSize}px`)
      .style('fill', '#fff')
      .style('font-weight', 'bold')
      .text(d => `${d.percentage}%`)
      .attr('x', d => d.x)
      .attr('y', d => d.y); // Start at initial position

    enterValueLabels.merge(valueLabels)
      .transition()
      .duration(1000)
      .text(d => `${d.percentage}%`)
      .attr('x', d => d.x)
      .attr('y', d => d.y + (fontSize / 3)); // Center inside the circle

    // Name labels (below the circle)
    const nameLabels = svg.selectAll('.name-label').data(nodes, d => d.id);

    nameLabels.exit().remove();

    const enterNameLabels = nameLabels.enter().append('text')
      .attr('class', 'name-label')
      .attr('text-anchor', 'middle')
      .style('font-size', `${fontSize}px`)
      .style('fill', '#fff')
      .style('font-weight', '600')
      .text(d => d.name)
      .attr('x', d => d.x)
      .attr('y', d => d.y);

    enterNameLabels.merge(nameLabels)
      .transition()
      .duration(1000)
      .attr('x', d => d.x)
      .attr('y', d => d.y + d.radius + textPadding); // Position below the circle

    // D3 force simulation
    simulationRef.current = d3.forceSimulation()
      .nodes(nodes)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(d => getRadius(d.value) * 1.2).iterations(10))
      .force('radial', d3.forceRadial(radius).strength(0.05))
      .force('charge', d3.forceManyBody().strength(-500))
      .on('tick', () => {
        svg.selectAll('circle')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);

        svg.selectAll('.value-label')
          .attr('x', d => d.x)
          .attr('y', d => d.y + (fontSize / 3)); // Dynamically update label position based on radius

        svg.selectAll('.name-label')
          .attr('x', d => d.x)
          .attr('y', d => d.y + d.radius + textPadding); // Dynamically update label position based on radius
      });

    simulationRef.current.alpha(1).restart();
  }, [dimensions]);

  useEffect(() => {
    const { width, height } = dimensions;
    if (isVisible) {
      if (!svgRef.current) {
        const svg = d3.select(svgContainerRef.current)
          .append('svg')
          .attr('height', height)
          .attr('width', width);

        svgRef.current = svg.node();
        setTimeout(() => {
          chart(chart_data);
        }, 1000);
      } else {
        chart(chart_data);
      }
    }
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
      // if (svgRef.current) {
      // d3.select(svgRef.current).selectAll('*').remove();
      // }
    };
  }, [chart, chart_data, isVisible, dimensions]);

  return (
    <div ref={chartRef}>
      <div className="app" ref={ref}>
        {isVisible && (<div className="svg_container" ref={svgContainerRef} />)}
      </div>
    </div>
  );
});

FigureIntro.propTypes = {
  chart_data: PropTypes.instanceOf(Array).isRequired
};

export default FigureIntro;
