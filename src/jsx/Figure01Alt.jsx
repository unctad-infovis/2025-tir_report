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
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    radius: Math.min(window.innerWidth, window.innerHeight) / 2 - 50,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        radius: Math.min(window.innerWidth, window.innerHeight) / 2 - 50,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getRadius = (value) => Math.sqrt((value * 1000) / Math.PI);

  const chart = useCallback((nodes) => {
    const { width, height } = dimensions;
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Calculate total radius for spacing adjustment
    const totalRadius = nodes.reduce((acc, d) => acc + getRadius(d.percentage), 0);
    const totalHeight = totalRadius * 2; // Total height is the sum of all diameters

    // Calculate vertical offset to center the circles
    const verticalOffset = (height - totalHeight) / 2;

    const padding = 10; // Padding between circles

    let accumulatedHeight = verticalOffset; // Start at the vertical offset to center the circles
    nodes.sort((a, b) => b.percentage - a.percentage); // Sorting by percentage in descending order
    nodes.forEach((d) => {
      const radius = getRadius(d.percentage);
      d.radius = radius;
      d.cy = accumulatedHeight + radius;
      d.cx = width / 2 + 100; // Place each circle in the center horizontally

      // Update the accumulated height with the current circle's radius and the padding
      accumulatedHeight += radius * 2 + padding; // Account for the full diameter and the padding
    });

    // Bind circles and update their cx, cy based on the new positions
    const circles = svg.selectAll('circle').data(nodes, (d) => d.id);
    circles.exit().transition().duration(500).attr('r', 0)
      .remove();

    const enterCircles = circles.enter().append('circle')
      .attr('r', 0)
      .attr('fill', (d) => d.fill);

    // Merge and transition circles
    enterCircles.merge(circles)
      .transition()
      .duration(1000)
      .attrTween('r', (d, i, circle_nodes) => {
        const startRadius = circle_nodes[i].getAttribute('r') || 0;
        const endRadius = getRadius(d.percentage);
        const interpolate = d3.interpolate(startRadius, endRadius);
        return (t) => {
          d.radius = interpolate(t); // Store the interpolated radius dynamically
          return d.radius;
        };
      })
      .attr('cx', (d) => d.cx) // Set cx (center x) position
      .attr('cy', (d) => d.cy); // Set cy (center y) position

    // Value labels (inside the circle)
    const valueLabels = svg.selectAll('.value-label').data(nodes, (d) => d.id);

    valueLabels.exit().remove();

    const enterValueLabels = valueLabels.enter().append('text')
      .attr('class', 'value-label')
      .attr('text-anchor', 'middle')
      .attr('text-aling', 'center')
      .style('font-size', '30px')
      .style('fill', '#000')
      .style('font-weight', '900')
      .text((d) => `${d.percentage}%`)
      .attr('x', (d) => d.cx + 4) // Set x to the center of the circle
      .attr('y', (d) => d.cy + 12); // Set y to the center of the circle

    enterValueLabels.merge(valueLabels)
      .transition()
      .duration(1000)
      .text((d) => `${d.percentage}%`)
      .attr('x', (d) => d.cx + 4)
      .attr('y', (d) => d.cy + 12);

    // Name labels (left of the circle)
    const nameLabels = svg.selectAll('.name-label').data(nodes, (d) => d.id);

    nameLabels.exit().remove();

    const enterNameLabels = nameLabels.enter().append('text')
      .attr('class', 'name-label')
      .attr('text-anchor', 'start') // Align left of the circle
      .style('font-size', (d) => `${Math.max(20, (d.percentage / 100) * 120)}px`)
      .style('fill', (d) => d.fill)
      .style('font-weight', '900');

    enterNameLabels.merge(nameLabels)
      .transition() // Animate the transition
      .duration(1000)
      .attr('x', (d) => d.cx + d.radius + 10) // Animate `x` position
      .attr('y', (d) => d.cy - 5) // Animate `y` position
      .style('font-size', (d) => `${Math.max(20, (d.percentage / 100) * 120)}px`)
      .each((d, i, name_nodes) => {
        const text = d.name;
        const maxLength = 15; // Define the maximum length of one line before breaking

        const lines = [];
        let currentLine = '';

        // Split the text into lines based on the maxLength
        text.split(' ').forEach((word) => {
          if (currentLine.length + word.length + 1 <= maxLength) {
            currentLine += (currentLine.length ? ' ' : '') + word;
          } else {
            lines.push(currentLine);
            currentLine = word;
          }
        });
        if (currentLine) lines.push(currentLine); // Push the remaining line

        // Create tspans for each line of text
        const textElement = d3.select(name_nodes[i]);
        textElement.selectAll('tspan').remove(); // Remove any existing tspans

        lines.forEach((line, index) => {
          textElement.append('tspan')
            .attr('x', () => d3.select(name_nodes[i]).attr('x')) // Inherit from parent <text>
            .transition() // Animate the transition
            .duration(1000)
            .attr('x', () => d.cx + d.radius + 10)
            .attr('dx', 0)
            .attr('dy', index === 0 ? 0 : '1.2em') // Add line spacing
            .text(line);
        });
      });
    const amount = (nodes[0].percentage === 29) ? 16420 : 2542; // Example variable, update dynamically
    const year = (nodes[0].percentage === 29) ? 2033 : 2023; // Example variable, update dynamically

    // Select or create the single text label
    const amountLabel = svg.selectAll('.amount-label').data([amount]); // Single data point

    amountLabel.exit().remove(); // Remove old text if needed

    const enterAmountLabel = amountLabel.enter()
      .append('text')
      .attr('class', 'amount-label')
      .attr('text-anchor', 'right') // Center text horizontally
      .style('font-size', '70px') // Adjust size
      .style('fill', '#fff') // Adjust color
      .style('font-weight', '900');

    enterAmountLabel.merge(amountLabel)
      .transition()
      .duration(1000)
      .attr('x', width / 2 - 300) // Center horizontally in the middle of the page
      .attr('y', height / 2) // Center vertically
      .tween('text', (d, i, amount_nodes) => {
        let interpolate;
        if (d3.select('.amount').empty()) {
          if (d === 16420) {
            interpolate = d3.interpolateNumber(2542, 16420); // Interpolate between start and end amounts
          } else {
            interpolate = d3.interpolateNumber(16420, 2542); // Interpolate between start and end amounts
          }
        } else {
          const text = d3.select('.amount').text();
          if (d === 16420 && text !== '$16 420') {
            interpolate = d3.interpolateNumber(2542, 16420); // Interpolate between start and end amounts
          } else if (d === 2542 && text !== '$2 542') {
            interpolate = d3.interpolateNumber(16420, 2542); // Interpolate between start and end amounts
          } else if (d === 16420 && text === '$16 420') {
            interpolate = d3.interpolateNumber(16420, 16420);
          } else if (d === 2542 && text === '$2 542') {
            interpolate = d3.interpolateNumber(2542, 2542); // Interpolate between start and end amounts
          }
        }

        const element = amount_nodes[i];
        return (t) => {
          const interpolatedAmount = interpolate(t); // Get the interpolated value at time t
          d3.select(element).selectAll('tspan').remove(); // Remove old tspans if any

          const formattedAmount = new Intl.NumberFormat().format(Math.round(interpolatedAmount));

          // Split the year into characters for custom styling
          const yearString = `${year}`;
          const yearParts = yearString.split('');

          // Create the lines for the text
          const lines = ['Total value', `in ${yearParts[0]}${yearParts[1]}`, yearParts[2], yearParts[3], `$${formattedAmount}`];

          d3.select(element).append('tspan')
            .attr('class', 'label-part')
            .attr('x', width / 2 - 300)
            .style('font-size', '46px')
            .attr('dy', 0)
            .text(lines[0]);
          d3.select(element).append('tspan')
            .attr('class', 'year-part')
            .attr('x', width / 2 - 300)
            .style('font-size', '46px')
            .attr('dy', '1.2em')
            .text(lines[1]);

          d3.select(element).append('tspan')
            .attr('class', 'highlighted')
            .style('font-size', '46px')
            .attr('dy', 0)
            .text(lines[2]);

          d3.select(element).append('tspan')
            .attr('class', 'year-part')
            .style('font-size', '46px')
            .attr('dy', 0)
            .text(lines[3]);

          d3.select(element).append('tspan')
            .attr('class', 'amount')
            .attr('x', width / 2 - 300)
            .attr('dy', '1.2em')
            .text(lines[4]);
        };
      });
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
      // No need for simulation cleanup anymore
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
  chart_data: PropTypes.instanceOf(Array).isRequired,
};

export default FigureIntro;
