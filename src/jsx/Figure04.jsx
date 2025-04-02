import React, {
  forwardRef, useState, useCallback, useEffect
} from 'react';

import PropTypes from 'prop-types';

import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

const colors = {
  'Developed countries': '#009edb',
  'Developing countries excluding LDCs': '#FBAF17',
  'Least developed countries (LDCs)': '#B06E2A'
};

const Figure04 = forwardRef((props, ref) => {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const { setDataFirst } = props;
  const { setDataSecond } = props;
  const cleanData = useCallback((data) => data.map(el => {
    const labels = Object.keys(el).filter(val => val !== 'Name');
    const values = Object.values(el).map(val => parseFloat(val * 100)).filter(val => !Number.isNaN(val));
    const output = {
      data: values.map((e, j) => ({
        name: labels[j],
        y: e
      }))
    };
    return {
      color: colors[el.Name],
      data: output.data,
      name: el.Name
    };
  }), []);

  useEffect(() => {
    if (!dataFigure) return;
    setDataSecond(structuredClone(dataFigure));
    setDataFirst(structuredClone(dataFigure).map(el => {
      el.data = el.data.filter((year, i) => {
        if (i > 1) {
          year.y = null;
        }
        return year;
      });
      return el;
    }));
  }, [dataFigure, setDataFirst, setDataSecond]);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2025-tir_report/' : './'}assets/data/2025-tir_report_figure04_data.csv`;
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
      <ChartLine
        chart_height={Math.min(window.innerHeight, 700)}
        data={dataFigure}
        idx="04"
        note=""
        prefix=""
        ref={ref}
        source="UN Trade and Development (UNCTAD) elaboration on data from The AI Index 2024 Annual Report (Stanford University)."
        subtitle="Cumulative share of countries with a national AI strategy by development group"
        title="Few developing countries have national AI strategies"
      />
      )}
    </div>
  );
});

Figure04.propTypes = {
  setDataFirst: PropTypes.func.isRequired, // Ensure it's a function and required
  setDataSecond: PropTypes.func.isRequired // Ensure it's a function and required
};

export default Figure04;
