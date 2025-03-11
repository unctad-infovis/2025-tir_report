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

// eslint-disable-next-line
(function (H) {
  // eslint-disable-next-line
  H.seriesTypes.pie.prototype.animate = function (init) {
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
        graphic
          // Set inital animation values
          .attr({
            start: startAngleRadius,
            end: startAngleRadius,
            opacity: 1
          })
          // Animate to the final position
          .animate({
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
                // eslint-disable-next-line
                // void 0,
                () => {
                  points.forEach(p => {
                    p.opacity = 1;
                  });
                  series.update({
                    enableMouseTracking: true
                  }, false);
                  chart.update({
                    plotOptions: {
                      pie: {
                        innerSize: '40%',
                        borderRadius: 0
                      }
                    }
                  });
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
    ref.current = Highcharts.chart(`chartIdx${props.idx}`, {
      caption: {
        align: 'left',
        margin: 20,
        style: {
          color: '#fff',
          fontSize: '14px'
        },
        text: `<em>Source:</em> ${props.source} ${props.note ? (`<br /><em>Note:</em> <span>${props.note}</span>`) : ''}`,
        useHTML: true,
        verticalAlign: 'bottom',
        x: 0
      },
      chart: {
        custom: {},
        backgroundColor: '#000',
        height: props.chart_height,
        events: {
          load() {
            const chart_this = this;
            chart_this.renderer.image('https://static.dwcdn.net/custom/themes/unctad-2024-rebrand/Blue%20arrow.svg', 20, 20, 44, 43.88).add();
          },
          render() {
            const chart_el = this;
            const series = chart_el.series[0];
            let customLabel = chart_el.options.chart.custom.label;

            if (!customLabel) {
              chart_el.options.chart.custom.label = chart_el.renderer.label(
                'In 2023<br/><strong>$2&nbsp;542</strong>'
              )
                .css({
                  color: '#fff',
                  textAnchor: 'middle'
                })
                .add();
              customLabel = chart_el.options.chart.custom.label;
            }

            const x = series.center[0] + chart_el.plotLeft;
            const y = series.center[1] + chart_el.plotTop - (customLabel.attr('height') / 2);

            customLabel.attr({
              x,
              y
            });
            // Set font size based on chart diameter
            customLabel.css({
              fontSize: `${series.center[2] / 12}px`
            });
          }

        },
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
        enabled: true,
        align: 'left',
        verticalAlign: 'top',
        itemStyle: {
          color: '#fff',
          fontSize: '14px'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          animation: {
            duration: 1000
          },
          borderRadius: 0,
          borderWidth: 2,
          cursor: 'pointer',
          dataLabels: {
            connectorColor: '#fff',
            connectorWidth: 0,
            // connectorShape: 'straight',
            enabled: true,
            formatter() {
              const el = this;
              return `${(formatNr(roundNr(el.percentage, 0)))}%`;
            },
            distance: -50,
            style: {
              fontSize: 18,
              fontWeight: 600
            },
            y: 8
          },
          dataSorting: {
            enabled: false
          },
          showInLegend: true,
          slicedOffset: 30
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
        data: props.data[0].slice(0, 5)
      }],
      subtitle: {
        align: 'left',
        enabled: true,
        minScale: 1,
        style: {
          color: '#fff',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '18px'
        },
        text: props.subtitle,
        x: 64
      },
      title: {
        align: 'left',
        minScale: 1,
        style: {
          color: '#fff',
          fontSize: '30px',
          fontWeight: 700,
          lineHeight: '34px'
        },
        text: props.title,
        x: 64
      },
      tooltip: {
        enabled: false
      },
      xAxis: {
        categories: props.data[0].labels,
        crosshair: {
          color: 'transparent',
          width: 1
        },
        reserveSpace: true,
        labels: {
          formatter: (el) => el.Name,
          distance: 10,
          padding: 0,
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 400
          },
          useHTML: true
        },
        lineColor: 'transparent',
        lineWidth: 0,
        opposite: false,
        plotLines: null,
        showFirstLabel: true,
        showLastLabel: true,
        tickWidth: 0,
        title: {
          enabled: false
        },
        type: 'category'
      },
      yAxis: {
        accessibility: {
          description: 'Index'
        },
        allowDecimals: true,
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineWidth: 1,
        gridLineDashStyle: 'shortdot',
        labels: {
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        endOnTick: false,
        lineColor: 'transparent',
        lineWidth: 0,
        opposite: true,
        startOnTick: false,
        showFirstLabel: false,
        showLastLabel: true,
        title: {
          enabled: true,
          reserveSpace: true,
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 400
          },
          text: '',
          verticalAlign: 'top',
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
  }, [ref, props.idx, props.chart_height, props.data, props.source, props.subtitle, props.title, props.note]);

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
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  source: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
