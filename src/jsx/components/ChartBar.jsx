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

const BarChart = forwardRef((props, ref) => {
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  const createChart = useCallback(() => {
    ref.current = Highcharts.chart(`chartIdx${props.idx}`, {
      caption: {
        text: undefined
      },
      chart: {
        backgroundColor: 'transparent',
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
        enabled: false
      },
      plotOptions: {
        bar: {
          allowPointSelect: false,
          animation: {
            duration: 500
          },
          borderRadius: 0,
          borderWidth: 0,
          colorByPoint: true,
          cursor: 'default',
          colors: ['#009edb', '#009edb', '#009edb'],
          dataLabels: {
            color: '#fff',
            enabled: true,
            format: '{y}%',
            inside: false,
            style: {
              fontSize: 30,
              fontWeight: 900
            }
          },
          enableMouseTracking: false,
          groupPadding: 0.1, // The space between the bars.
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
      series: [{
        data: props.data[0]
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
        categories: props.data[0].map(el => el.name),
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
        reserveSpace: true,
        showFirstLabel: true,
        showLastLabel: true,
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
        max: 40,
        title: {
          enabled: false
        }
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

export default BarChart;

BarChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  chart_height: PropTypes.number.isRequired,
  idx: PropTypes.string.isRequired,
};
