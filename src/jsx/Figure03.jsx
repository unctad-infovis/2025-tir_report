import React, {
  forwardRef, useState, useCallback, useEffect
} from 'react';

import PropTypes from 'prop-types';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartScatterPlot from './components/ChartScatterPlot.jsx';

const Figure03 = forwardRef((props, ref) => {
  const {
    setDataStage1, setDataStage2, setDataStage3, setDataStage4, setDataStage5, setDataStage6, setDataStage7, setDataStage8
  } = props;

  // State for processed data
  const [dataFigure, setDataFigure] = useState(null);

  const cleanData = useCallback((rawData) => {
    const createEmptyFormattedData = () => [
      {
        data: [], name: 'Developed countries', color: '#009edb', dataLabels: { enabled: false }
      },
      {
        data: [], name: 'Developing countries', color: '#ffcb05', dataLabels: { enabled: false }
      },
      {
        data: [], name: 'Least developed countries', color: '#72bf44', dataLabels: { enabled: false }
      },
      {
        color: '#ddd',
        data: [[3, -0.0185], [6, 1.2703]],
        enableMouseTracking: false,
        marker: {
          enabled: false
        },
        lineWidth: 2,
        name: 'Trendline',
        showInLegend: false,
        states: {
          hover: {
            lineWidth: 0
          }
        },
        type: 'line',
        visible: false,
        zIndex: -1
      },
      {
        color: 'transparent', data: [{ y: 55, x: 10, name: 'Leaders' }], dataLabels: { enabled: false }, name: 'Leaders', showInLegend: false
      },
      {
        color: 'transparent', data: [{ y: 55, x: 1.55, name: 'Practitioners' }], dataLabels: { enabled: false }, name: 'Practitioners', showInLegend: false
      },
      {
        color: 'transparent', data: [{ y: 0, x: 1.8, name: 'Laggards' }], dataLabels: { enabled: false }, name: 'Laggards', showInLegend: false
      },
      {
        color: 'transparent', data: [{ y: 0, x: 10, name: 'Creators' }], dataLabels: { enabled: false }, name: 'Creators', showInLegend: false
      }
    ];

    // Create deep copies for six stages
    const formattedDataStage1 = structuredClone(createEmptyFormattedData());
    const formattedDataStage2 = structuredClone(createEmptyFormattedData());
    const formattedDataStage3 = structuredClone(createEmptyFormattedData());
    const formattedDataStage4 = structuredClone(createEmptyFormattedData());
    const formattedDataStage5 = structuredClone(createEmptyFormattedData());
    const formattedDataStage6 = structuredClone(createEmptyFormattedData());
    const formattedDataStage7 = structuredClone(createEmptyFormattedData());
    const formattedDataStage8 = structuredClone(createEmptyFormattedData());

    [formattedDataStage2, formattedDataStage3, formattedDataStage4, formattedDataStage5].forEach(stage => {
      ['Leaders', 'Practitioners', 'Laggards', 'Creators'].forEach(groupName => {
        const group = stage.find(g => g.name === groupName);
        if (group) {
          group.data.forEach(point => {
            point.dataLabels = { enabled: true };
          });
        }
      });
    });

    [formattedDataStage1, formattedDataStage6, formattedDataStage7, formattedDataStage8].forEach(stage => {
      ['Leaders', 'Practitioners', 'Laggards', 'Creators'].forEach(groupName => {
        const group = stage.find(g => g.name === groupName);
        if (group) {
          group.data.forEach(point => {
            point.dataLabels = { enabled: false };
          });
        }
      });
    });

    // Populate data for each stage
    rawData.forEach((item) => {
      const group1 = formattedDataStage1.find(g => g.name === item.Group);
      const group2 = formattedDataStage2.find(g => g.name === item.Group);
      const group3 = formattedDataStage3.find(g => g.name === item.Group);
      const group4 = formattedDataStage4.find(g => g.name === item.Group);
      const group5 = formattedDataStage5.find(g => g.name === item.Group);
      const group6 = formattedDataStage6.find(g => g.name === item.Group);
      const group7 = formattedDataStage7.find(g => g.name === item.Group);
      const group8 = formattedDataStage8.find(g => g.name === item.Group);

      if (group1) {
        group1.data.push({
          color: group1.color,
          dataLabels: { enabled: false },
          marker: { lineWidth: 0, radius: 3 },
          name: item.Name,
          x: item['Share of developers compared to working age population'] === 'null' ? null : parseFloat(item['Share of developers compared to working age population']),
          y: item['Share of working age population with advanced degree'] === 'null' ? null : parseFloat(item['Share of working age population with advanced degree']),
        });
      }
      if (group2) {
        group2.data.push({
          color: group2.color,
          dataLabels: { enabled: false },
          marker: { lineWidth: 0, radius: 3 },
          name: item.Name,
          x: item['Share of developers compared to working age population'] === 'null' ? null : parseFloat(item['Share of developers compared to working age population']),
          y: item['Share of working age population with advanced degree'] === 'null' ? null : parseFloat(item['Share of working age population with advanced degree']),
        });
      }
      if (group3) {
        group3.data.push({
          color: group3.color,
          dataLabels: { enabled: group3.name === 'Developed countries', style: { fontSize: 12 } },
          marker: { lineWidth: 0, enabled: group3.name === 'Developed countries' },
          name: item.Name,
          x: item['Share of developers compared to working age population'] === 'null' ? null : parseFloat(item['Share of developers compared to working age population']),
          y: item['Share of working age population with advanced degree'] === 'null' ? null : parseFloat(item['Share of working age population with advanced degree']),
        });
      }
      if (group4) {
        group4.data.push({
          color: group4.color,
          dataLabels: { enabled: group3.name === 'Least developed countries', style: { fontSize: 12 } },
          marker: { lineWidth: 0, enabled: group4.name === 'Least developed countries' },
          name: item.Name,
          x: item['Share of developers compared to working age population'] === 'null' ? null : parseFloat(item['Share of developers compared to working age population']),
          y: item['Share of working age population with advanced degree'] === 'null' ? null : parseFloat(item['Share of working age population with advanced degree']),
        });
      }
      if (group5) {
        group5.data.push({
          color: group5.color,
          dataLabels: { enabled: group3.name === 'Developing countries', style: { fontSize: 12 } },
          marker: { lineWidth: 0, enabled: group5.name === 'Developing countries' },
          name: item.Name,
          x: item['Share of developers compared to working age population'] === 'null' ? null : parseFloat(item['Share of developers compared to working age population']),
          y: item['Share of working age population with advanced degree'] === 'null' ? null : parseFloat(item['Share of working age population with advanced degree']),
        });
      }
      if (group6) {
        group6.data.push({
          color: group6.color,
          dataLabels: { enabled: false },
          name: item.Name,
          x: item['Gross domestic product per capita‚ PPP'] === 'null' ? null : parseFloat(item['Gross domestic product per capita‚ PPP']),
          y: item.Index === 'null' ? null : parseFloat(item.Index),
        });
      }
      if (group7) {
        group7.data.push({
          color: group7.color,
          dataLabels: { enabled: group3.name === 'Developed countries', style: { fontSize: 12 } },
          marker: { lineWidth: 0, enabled: group5.name === 'Developed countries' },
          name: item.Name,
          x: item['Gross domestic product per capita‚ PPP'] === 'null' ? null : parseFloat(item['Gross domestic product per capita‚ PPP']),
          y: item.Index === 'null' ? null : parseFloat(item.Index),
        });
      }
      if (group8) {
        group8.data.push({
          color: group8.color,
          dataLabels: {
            allowOverlap: true,
            enabled: ['China', 'Brazil', 'India', 'Philippines'].includes(item.Name),
            padding: ['China', 'Brazil', 'India', 'Philippines'].includes(item.Name) ? 10 : 5
          },
          marker: {
            enabled: true,
            lineWidth: ['China', 'Brazil', 'India', 'Philippines'].includes(item.Name) ? 2 : 0,
            radius: ['China', 'Brazil', 'India', 'Philippines'].includes(item.Name) ? 6 : 3
          },
          name: item.Name,
          x: item['Gross domestic product per capita‚ PPP'] === 'null' ? null : parseFloat(item['Gross domestic product per capita‚ PPP']),
          y: item.Index === 'null' ? null : parseFloat(item.Index),
        });
      }
    });

    return {
      formattedDataStage1: structuredClone(formattedDataStage1),
      formattedDataStage2: structuredClone(formattedDataStage2),
      formattedDataStage3: structuredClone(formattedDataStage3),
      formattedDataStage4: structuredClone(formattedDataStage4),
      formattedDataStage5: structuredClone(formattedDataStage5),
      formattedDataStage6: structuredClone(formattedDataStage6),
      formattedDataStage7: structuredClone(formattedDataStage7),
      formattedDataStage8: structuredClone(formattedDataStage8)
    };
  }, []);

  useEffect(() => {
    const dataFile = window.location.href.includes('unctad.org')
      ? 'https://storage.unctad.org/2025-tir_report/assets/data/2025-tir_report_figure03_data.csv'
      : './assets/data/2025-tir_report_figure03_data.csv';

    const fetchData = async () => {
      try {
        const response = await fetch(dataFile);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const text = await response.text();
        const jsonData = CSVtoJSON(text);
        const structuredData = cleanData(jsonData);

        setDataFigure(structuredClone(structuredData.formattedDataStage1));
        setDataStage1(structuredClone(structuredData.formattedDataStage1));
        setDataStage2(structuredClone(structuredData.formattedDataStage2));
        setDataStage3(structuredClone(structuredData.formattedDataStage3));
        setDataStage4(structuredClone(structuredData.formattedDataStage4));
        setDataStage5(structuredClone(structuredData.formattedDataStage5));
        setDataStage6(structuredClone(structuredData.formattedDataStage6));
        setDataStage7(structuredClone(structuredData.formattedDataStage7));
        setDataStage8(structuredClone(structuredData.formattedDataStage8));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [cleanData, setDataStage1, setDataStage2, setDataStage3, setDataStage4, setDataStage5, setDataStage6, setDataStage7, setDataStage8]);

  return (
    <div className="app">
      {dataFigure && (
        <ChartScatterPlot
          chart_height={Math.min(window.innerHeight - 100, 700)}
          data={dataFigure}
          idx="03"
          note=""
          prefix=""
          ref={ref}
          source="UN Trade and Development (UNCTAD)"
          subtitle="This subtitle follows the same long structure of the title. This is only for testing purposes."
          title="This is a very long title and will continue for sometime"
        />
      )}
    </div>
  );
});

Figure03.propTypes = {
  setDataStage1: PropTypes.func.isRequired,
  setDataStage2: PropTypes.func.isRequired,
  setDataStage3: PropTypes.func.isRequired,
  setDataStage4: PropTypes.func.isRequired,
  setDataStage5: PropTypes.func.isRequired,
  setDataStage6: PropTypes.func.isRequired,
  setDataStage7: PropTypes.func.isRequired,
  setDataStage8: PropTypes.func.isRequired
};
export default Figure03;
