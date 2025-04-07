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
// import roundNr from '../helpers/RoundNr.js';
// import formatNr from '../helpers/FormatNr.js';

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

const BarChart = forwardRef((props, ref) => {
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });
  const createChart = useCallback(() => {
    const chart_data = structuredClone(props.data[0].slice(0, 5));
    chart_data.sort((a, b) => b.y - a.y);
    try {
      ref.current = Highcharts.chart(`chartIdx${props.idx}`, {
        caption: {
          text: undefined
        },
        chart: {
          backgroundColor: 'transparent',
          animation: {
            duration: props.animation_duration
          },
          custom: {
          },
          events: {
            render() {
              if (props.data_label_align === 'left') {
                const chart_el = this;
                let customLabel = chart_el.options.chart.custom.label;
                if (!customLabel) {
                  chart_el.options.chart.custom.label = chart_el.renderer.label(
                    '<span>Global frontier</span><br /><span>tech market in 20</span><span style="fill: #ffc800;">2</span><span>3</span><br/><span style="font-size: 40px"><strong>$2.5tn</strong></span>'
                  ).css({
                    color: '#fff',
                    fontWeight: 600,
                    textAnchor: 'middle'
                  }).add();
                  customLabel = chart_el.options.chart.custom.label;
                }
                const x = chart_el.chartWidth / 2;
                const y = chart_el.plotTop - 130;
                customLabel.attr({
                  x,
                  y
                });
                customLabel.css({
                  fontSize: '30px' // Set font size based on chart diameter
                });
              }
            }
          },
          marginTop: props.data_label_align === 'left' ? 130 : 0,
          height: props.chart_height,
          style: {
            color: '#fff',
            fontFamily: 'Inter',
            fontWeight: 400
          },
          type: 'bar'
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          bar: {
            allowPointSelect: false,
            borderRadius: 0,
            borderWidth: 0,
            colorByPoint: true,
            colors: ['#009edb', '#009edb', '#009edb'],
            cursor: 'default',
            dataLabels: {
              align: props.data_label_align,
              color: '#fff',
              enabled: true,
              format: '{point.y:,.0f}%',
              style: {
                fontSize: 24,
                fontWeight: 600,
                textOutline: 'none'
              }
            },
            enableMouseTracking: false,
            groupPadding: props.data_label_align === 'left' ? 0.01 : 0.1, // The space between the bars.
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
        series: [{
          data: chart_data
        }],
        subtitle: {
          text: undefined
        },
        title: {
          text: undefined
        },
        tooltip: {
          enabled: false
        },
        xAxis: {
          categories: props.data[0].slice(0, 5).sort((a, b) => b.y - a.y).map(el => el.name),
          labels: {
            distance: 5,
            rotation: 0,
            style: {
              color: '#fff',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: 400
            }
          },
          lineColor: 'transparent',
          lineWidth: 0,
          reserveSpace: true,
          tickWidth: 0,
          title: {
            enabled: false
          }
        },
        yAxis: {
          gridLineWidth: 0,
          labels: {
            enabled: false
          },
          max: props.y_max,
          title: {
            enabled: false
          }
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
  }, [ref, props.data_label_align, props.animation_duration, props.idx, props.chart_height, props.data, props.y_max]);

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

export default BarChart;

BarChart.propTypes = {
  animation_duration: PropTypes.number.isRequired,
  chart_height: PropTypes.number.isRequired,
  data_label_align: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  idx: PropTypes.string.isRequired,
  y_max: PropTypes.number.isRequired,
};
