import React, {
  forwardRef, useEffect, useCallback, useRef
} from 'react';
import PropTypes from 'prop-types';

// https://www.highcharts.com/

import Highcharts from 'highcharts';
import 'highcharts/modules/accessibility';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

// Load helpers.
import roundNr from '../helpers/RoundNr.js';
import formatNr from '../helpers/FormatNr.js';

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    downloadCSV: 'Download CSV data',
    thousandsSep: ' '
  }
});
Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => {
  const path = ['M', x + w * 0.5, y, 'L', x + w * 0.5, y + h * 0.7, 'M', x + w * 0.3, y + h * 0.5, 'L', x + w * 0.5, y + h * 0.7, 'L', x + w * 0.7, y + h * 0.5, 'M', x, y + h * 0.9, 'L', x, y + h, 'L', x + w, y + h, 'L', x + w, y + h * 0.9];
  return path;
};

(function custom_animation(H) {
  H.seriesTypes.pie.prototype.animate = function init_animation(init) {
    const series = this;
    const { chart } = series;
    const { points } = series;
    const {
      animation
    } = series.options;
    const {
      startAngleRad
    } = series;

    function fanAnimate(point, startAngleRadius) {
      const { graphic } = point;
      const args = point.shapeArgs;

      if (graphic && args) {
        graphic.attr({ // Set inital animation values
          start: startAngleRadius,
          end: startAngleRadius,
          opacity: 1
        }).animate({ // Animate to the final position
          start: args.start,
          end: args.end
        }, {
          duration: animation.duration / points.length
        }, () => {
          // On complete, start animating the next point
          if (points[point.index + 1]) {
            fanAnimate(points[point.index + 1], args.end);
          }
          // On the last point, fade in the data labels, then
          // apply the inner size
          if (point.index === series.points.length - 1) {
            series.dataLabelsGroup.animate(
              {
                opacity: 1
              },
              undefined,
              () => {
                points.forEach(p => {
                  p.opacity = 1;
                });
                chart.update({
                  plotOptions: {
                    pie: {
                      innerSize: '40%',
                      borderRadius: 0
                    }
                  }
                });
                try {
                  document.querySelector('.highcharts-label').style.display = 'block';
                } catch {
                  return true;
                }
                return true;
              }
            );
          }
        });
      }
    }
    if (init) {
      // Hide points on init
      points.forEach(point => {
        point.opacity = 0;
      });
    } else {
      fanAnimate(points[0], startAngleRad);
    }
  };
}(Highcharts));

const DonutChart = forwardRef((props, ref) => {
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  const createChart = useCallback(() => {
    try {
      ref.current = Highcharts.chart(`chartIdx${props.idx}`, {
        caption: {
          text: undefined
        },
        chart: {
          backgroundColor: 'transparent',
          custom: {},
          events: {
            render() {
              const chart_el = this;
              const series = chart_el.series[0];
              let customLabel = chart_el.options.chart.custom.label;

              if (!customLabel) {
                const label = '<tspan style="font-size: 18px;">Global frontier</tspan><tspan dy="21" x="3">​</tspan><tspan style="font-size: 18px;">tech market in</tspan><tspan dy="21" x="3">​</tspan><tspan style="font-size: 18px;">20</tspan><tspan style="fill: #ffc800; font-size: 18px;">2</tspan><tspan style="font-size: 18px;">3</tspan><tspan dy="46" x="3">​</tspan><strong>$2.5tn</strong>';
                chart_el.options.chart.custom.label = chart_el.renderer.label(label).css({
                  color: '#fff',
                  display: 'none',
                  fontWeight: 600,
                  textAnchor: 'middle'
                }).add();
                chart_el.options.chart.custom.label.text.element.innerHTML = label;
                customLabel = chart_el.options.chart.custom.label;
              }
              const x = series.center[0] + chart_el.plotLeft;
              const y = series.center[1] + chart_el.plotTop - (customLabel.attr('height') / 2);
              customLabel.attr({
                x,
                y
              });
              customLabel.css({
                fontSize: `${series.center[2] / 15}px` // Set font size based on chart diameter
              });
            }
          },
          height: props.chart_height,
          style: {
            color: '#fff',
            fontFamily: 'Inter',
            fontWeight: 400
          },
          type: 'pie'
        },
        credits: {
          enabled: false
        },
        legend: {
          align: 'left',
          alignColumns: true,
          enabled: true,
          itemStyle: {
            color: '#fff',
            fontSize: '16px'
          },
          events: {
            itemClick() {
              return false;
            }
          },
          verticalAlign: 'top'
        },
        plotOptions: {
          pie: {
            allowPointSelect: false,
            animation: {
              duration: 1000
            },
            borderRadius: 0,
            borderWidth: 2,
            cursor: 'default',
            dataLabels: {
              connectorColor: '#fff',
              connectorWidth: 0,
              enabled: true,
              formatter() {
                const el = this;
                return `${(formatNr(roundNr(el.percentage, 0)))}%`;
              },
              distance: -50,
              style: {
                fontSize: 20,
                fontWeight: 600,
                textOutline: 'none'
              },
              y: 8
            },
            dataSorting: {
              enabled: false
            },
            enableMouseTracking: false,
            showInLegend: true,
            slicedOffset: 30,
            states: {
              hover: {
                enabled: false
              },
              inactive: {
                opacity: 1
              },
              select: {
                enabled: false
              }
            }
          }
        },
        rules: [{
          condition: {
            maxWidth: 500
          },
          // Make the labels less space demanding on mobile
          chartOptions: {
            series: {
              dataLabels: {
                enabled: false
              }
            }
          }
        }],
        series: [{
          data: props.data[0].slice(0, 5)
        }],
        subtitle: {
          text: undefined
        },
        title: {
          text: undefined
        },
        tooltip: {
          enabled: false
        }
      });
      chartRef.current.querySelector(`#chartIdx${props.idx}`).style.opacity = 1;
    } catch (error) {
      return true;
      // console.error(error);
    }
    return () => {
      if (ref.current) {
        ref.current.destroy(); // Cleanup on unmount
        ref.current = null;
      }
    };
  }, [ref, props.idx, props.chart_height, props.data]);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart();
      }, 300);
    }
  }, [createChart, isVisible]);

  return (
    <div className="chart_container">
      <div ref={chartRef}>
        {(isVisible) && (<div className="chart" id={`chartIdx${props.idx}`} />)}
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
});

export default DonutChart;

DonutChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  chart_height: PropTypes.number.isRequired,
  idx: PropTypes.string.isRequired,
};
