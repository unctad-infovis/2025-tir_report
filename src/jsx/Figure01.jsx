import React, {
  forwardRef, useState, useCallback, useEffect
} from 'react';

import PropTypes from 'prop-types';

import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartDonut from './components/ChartDonut.jsx';

const colors = {
  'Internet of things‚ 2023': '#fbaf17',
  'Electric vehicles‚ 2023': '#004987',
  'Artificial intelligence‚ 2023': '#009edb',
  'Solar photovoltaic‚ 2023': '#a05fb4',
  'Other‚ 2023': '#aea29a',
  'Artificial intelligence‚ 2033': '#009edb',
  'Internet of things‚ 2033': '#fbaf17',
  'Blockchain‚ 2033': '#b06e2a',
  'Electric vehicles‚ 2033': '#004987',
  'Other‚ 2033': '#aea29a',
};
const Figure01 = forwardRef((props, ref) => {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const { setData2023, setData2033 } = props;
  const cleanData = useCallback((data) => data.map(el => {
    const labels = Object.keys(el).filter(val => val !== 'Name');
    const values = Object.values(el).map(val => parseFloat(val)).filter(val => !Number.isNaN(val));
    const output = {
      data: values.map((e, j) => ({
        color: colors[labels[j]],
        dataLabels: {
          // enabled: (labels[j] === 'AI‚ 2023' || labels[j] === 'AI‚ 2033')
          // enabled: (labels[j] === 'AI‚ 2023' || labels[j] === 'AI‚ 2033')
        },
        name: labels[j].replace('‚ 2023', '').replace('‚ 2033', ''),
        selected: (labels[j] === 'Artificial intelligence‚ 2023' || labels[j] === 'Artificial intelligence 2033'),
        sliced: (labels[j] === 'Artificial intelligence‚ 2023' || labels[j] === 'Artificial intelligence‚ 2033'),
        y: e
      }))
    };
    return output.data;
  }), []);

  useEffect(() => {
    if (!dataFigure) return;
    setData2023(dataFigure[0].slice(0, 5).map(item => ({ ...item })));
    setData2033(dataFigure[0].slice(5, 10).map(item => ({ ...item })));
  }, [dataFigure, setData2023, setData2033]);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2025-tir_report/' : './'}assets/data/2025-tir_report_figure01_data.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(transpose(body)))));
    } catch (error) {
      console.error(error);
    }
  }, [cleanData]);
  return (
    <div className="app">
      {dataFigure && (
      <ChartDonut
        chart_height={800}
        data={dataFigure}
        idx="01"
        note=""
        prefix=""
        ref={ref}
        source="UN Trade and Development (UNCTAD)"
        subtitle="Top areas of industry, 2023 and 2033"
        title="The next decade is the era of AI"
      />
      )}
    </div>
  );
});

Figure01.propTypes = {
  setData2023: PropTypes.func.isRequired, // Ensure it's a function and required
  setData2033: PropTypes.func.isRequired, // Ensure it's a function and required
};

export default Figure01;
