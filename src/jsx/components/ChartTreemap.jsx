import React, {
  forwardRef, useEffect, useCallback, useRef
} from 'react';
import PropTypes from 'prop-types';

// https://www.highcharts.com/

import Highcharts from 'highcharts';
import 'highcharts/modules/treemap';
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

const TreemapChart = forwardRef((props, ref) => {
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
        events: {
          load() {
            const chart_this = this;
            chart_this.renderer.image('https://static.dwcdn.net/custom/themes/unctad-2024-rebrand/Blue%20arrow.svg', 20, 20, 44, 43.88).add();
          },
          render() {

          }
        },
        spacingRight: 64,
        style: {
          color: '#fff',
          fontFamily: 'Inter',
          fontWeight: 400
        },
        type: 'treemap'
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
      series: [{
        borderColor: '#fff',
        borderRadius: 0,
        borderWidth: 0,
        data: props.data,
        enableMouseTracking: false,
        layoutAlgorithm: 'sliceAndDice',
        levels: [{
          level: 1,
          layoutAlgorithm: 'sliceAndDice',
          dataLabels: {
            align: 'left',
            enabled: true,
            padding: 5,
            style: {
              color: '#000',
              fontSize: '20px',
              fontWeight: 600,
              textOutline: 'none'
            },
            verticalAlign: 'top'
          }
        }, {
          level: 2,
          layoutAlgorithm: 'sliceAndDice',
          dataLabels: {
            align: 'right',
            allowOverlap: true,
            enabled: true,
            padding: 5,
            style: {
              fontSize: '15px',
              fontWeight: 400,
              textOutline: 'none'
            },
            verticalAlign: 'bottom',
          }
        }],
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
        type: 'treemap'
      }],
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

export default TreemapChart;

TreemapChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  chart_height: PropTypes.number.isRequired,
  idx: PropTypes.string.isRequired
};
