import React, {
  forwardRef, useState, useCallback, useEffect
} from 'react';

import PropTypes from 'prop-types';

import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartBar from './components/ChartBar.jsx';

const Figure01 = forwardRef((props, ref) => {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const { setData } = props;
  const cleanData = useCallback((data) => data.map(el => {
    const labels = Object.keys(el).filter(val => val !== 'Name');
    const values = Object.values(el).map(val => parseFloat(val)).filter(val => !Number.isNaN(val));
    const output = {
      data: values.map((e, j) => ({
        name: labels[j],
        y: e
      }))
    };
    return output.data;
  }), []);

  useEffect(() => {
    if (!dataFigure) return;
    setData(dataFigure[0]);
  }, [dataFigure, setData]);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2025-tir_report/' : './'}assets/data/2025-tir_report_figure02_data.csv`;
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
      <ChartBar
        data_label_align="right"
        animation_duration={500}
        chart_height={Math.min(window.innerHeight, 700)}
        data={dataFigure}
        idx="02"
        ref={ref}
        y_max={40}
      />
      )}
    </div>
  );
});

Figure01.propTypes = {
  setData: PropTypes.func.isRequired, // Ensure it's a function and required
};

export default Figure01;
