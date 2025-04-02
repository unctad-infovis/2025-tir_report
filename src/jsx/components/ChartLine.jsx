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

const LineChart = forwardRef((props, ref) => {
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  const createChart = useCallback(() => {
    ref.current = Highcharts.chart(`chartIdx${props.idx}`, {
      caption: {
        text: undefined
      },
      chart: {
        backgroundColor: '#222',
        height: props.chart_height,
        style: {
          color: '#fff',
          fontFamily: 'Inter',
          fontWeight: 400
        },
        type: 'line'
      },
      credits: {
        enabled: false
      },
      legend: {
        align: 'left',
        alignColumns: false,
        enabled: true,
        events: {
          itemClick() {
            return false;
          }
        },
        itemHoverStyle: {
          color: '#fff'
        },
        itemDistance: 10,
        itemStyle: {
          color: '#fff',
          cursor: 'default',
          fontSize: '16px',
          fontWeight: 400
        },
        margin: 30,
        verticalAlign: 'top'
      },
      plotOptions: {
        line: {
          allowPointSelect: false,
          animation: {
            duration: 500
          },
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: false,
          lineWidth: 6,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              },
              select: {
                enabled: false
              }
            }
          }
        }
      },
      series: props.data,
      subtitle: {
        enabled: false
      },
      title: {
        text: undefined
      },
      tooltip: {
        enabled: false
      },
      xAxis: {
        categories: props.data[0].data.map(el => el.name),
        crosshair: {
          color: 'transparent',
          width: 1
        },
        labels: {
          distance: 10,
          padding: 0,
          rotation: 0,
          style: {
            color: '#fff',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        lineColor: 'transparent',
        lineWidth: 0,
        opposite: false,
        plotLines: null,
        reserveSpace: false,
        showFirstLabel: true,
        showLastLabel: true,
        tickWidth: 0,
        title: {
          enabled: false
        }
      },
      yAxis: {
        allowDecimals: true,
        gridLineColor: '#555',
        gridLineWidth: 1,
        gridLineDashStyle: 'shortdot',
        labels: {
          rotation: 0,
          style: {
            color: '#fff',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        endOnTick: false,
        lineColor: 'transparent',
        lineWidth: 0,
        max: 70,
        min: 0,
        showFirstLabel: true,
        showLastLabel: true,
        startOnTick: false,
        tickInterval: 10,
        title: {
          align: 'high',
          enabled: true,
          offset: 0,
          reserveSpace: false,
          rotation: 0,
          style: {
            color: '#fff',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 600
          },
          text: 'Percentage',
          x: 115,
          y: 5
        },
        type: 'linear'
      }
    });
    chartRef.current.querySelector(`#chartIdx${props.idx}`).style.opacity = 1;
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

export default LineChart;

LineChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  chart_height: PropTypes.number.isRequired,
  idx: PropTypes.string.isRequired,
};
