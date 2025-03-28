import React, {
  forwardRef, useEffect, useCallback, useRef
} from 'react';
import PropTypes from 'prop-types';

// https://www.highcharts.com/

import Highcharts from 'highcharts';
import 'highcharts/modules/accessibility';
import 'highcharts/modules/exporting';
import 'highcharts/modules/export-data';

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

const ScatterPlotChart = forwardRef((props, ref) => {
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
        type: 'scatter'
      },
      credits: {
        enabled: false
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadPDF', 'separator', 'downloadCSV'],
            symbol: 'download',
            symbolFill: '#fff'
          }
        },
        enabled: false
      },
      legend: {
        align: 'left',
        enabled: true,
        events: {
          itemClick() {
            return false;
          }
        },
        itemDistance: 10,
        itemStyle: {
          color: '#fff',
          fontSize: '14px'
        },
        squareSymbol: false,
        symbolHeight: 12,
        symbolRadius: 6,
        symbolWidth: 12,
        verticalAlign: 'top'
      },
      plotOptions: {
        scatter: {
          allowPointSelect: false,
          animation: {
            duration: 2000
          },
          borderRadius: 0,
          borderWidth: 2,
          cursor: 'default',
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              fontSize: 18,
              fontWeight: 600
            }
          },
          enableMouseTracking: false,
          marker: {
            radius: 3,
            symbol: 'circle',
            states: {
              hover: {
                enabled: false
              },
              select: {
                enabled: false
              }
            }
          },
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
          },
          jitter: {
            x: 0.005
          },
          groupPadding: 0.1
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            legend: {
              layout: 'horizontal'
            },
            title: {
              margin: 20,
              style: {
                fontSize: '26px',
                lineHeight: '30px'
              }
            }
          },
          condition: {
            maxWidth: 500
          }
        }]
      },
      series: props.data,
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
        endOnTick: false,
        gridLineColor: '#555',
        gridLineDashStyle: 'shortdot',
        gridLineWidth: 1,
        labels: {
          distance: 10,
          padding: 0,
          rotation: 0,
          style: {
            color: '#666',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        lineColor: '#666',
        lineWidth: 1,
        max: 10,
        min: 0,
        opposite: false,
        plotLines: [],
        showFirstLabel: true,
        showLastLabel: true,
        startOnTick: false,
        tickInterval: 2,
        tickWidth: 0,
        title: {
          enabled: true,
          style: {
            fontFamily: 'Inter',
            fontWeight: 400
          },
          text: 'Share of developers compared to working age population'
        }
      },
      yAxis: {
        endOnTick: false,
        gridLineColor: '#555',
        gridLineDashStyle: 'shortdot',
        gridLineWidth: 1,
        labels: {
          distance: 10,
          padding: 0,
          rotation: 0,
          style: {
            color: '#666',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        lineColor: '#666',
        lineWidth: 1,
        max: 60,
        min: 0,
        opposite: false,
        plotLines: [],
        showFirstLabel: true,
        startOnTick: false,
        tickInterval: 20,
        showLastLabel: true,
        title: {
          enabled: true,
          style: {
            fontFamily: 'Inter',
            fontWeight: 400
          },
          text: 'Share of working age population with advanced degree'
        },
        type: 'linear'
      }
    });
    chartRef.current.querySelector(`#chartIdx${props.idx}`).style.opacity = 1;
    ref.current.reflow();

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

export default ScatterPlotChart;

ScatterPlotChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  chart_height: PropTypes.number.isRequired,
  idx: PropTypes.string.isRequired
};
