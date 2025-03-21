import React, {
  forwardRef, useState, useCallback, useEffect
} from 'react';

import PropTypes from 'prop-types';

import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartTreemap from './components/ChartTreemap.jsx';

const colors = {
  '0/7': '#FBAF17',
  '1/7': '#C2D5E6',
  '2/7': '#A2BED6',
  '3/7': '#81A6C6',
  '4/7': '#618FB6',
  '5/7': '#4077A6',
  '6/7': '#206096',
  '7/7': '#004987'
};

const Figure05 = forwardRef((props, ref) => {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const { setDataFirst, setDataSecond } = props;
  const cleanData = useCallback((data) => {
    const chart_data = [{
      id: '7/7',
      name: '7',
      sortIndex: 0
    }, {
      id: '6/7',
      name: '2',
      sortIndex: -1
    }, {
      id: '5/7',
      name: '5',
      sortIndex: -2
    }, {
      id: '4/7',
      name: '7',
      sortIndex: -3
    }, {
      id: '3/7',
      name: '10',
      sortIndex: -4
    }, {
      id: '2/7',
      name: '23',
      sortIndex: -5
    }, {
      id: '1/7',
      name: '21 countries',
      sortIndex: -6
    }, {
      id: '0/7',
      name: '118 countries countries, primarily in the global South, are not parties to any of the sampled initiatives or instruments',
      sortIndex: -7,
      visible: false
    }];
    const tmp_data = data.map(el => {
      const labels = Object.keys(el).filter(val => val !== 'Name');
      const values = Object.values(el).map(val => parseFloat(val)).filter(val => !Number.isNaN(val));
      const output = {
        data: values.map((e, j) => ({
          color: colors[labels[j]],
          id: `${labels[j]}_child`,
          name: (labels[j] === '0/7' || labels[j] === '1/7') ? `${labels[j]} deals` : labels[j],
          parent: labels[j],
          sortIndex: -j,
          value: e,
          visible: labels[j] !== '0/7'
        }))
      };
      return output.data;
    });
    return [...chart_data, ...tmp_data[0]];
  }, []);

  useEffect(() => {
    if (!dataFigure) return;
    const dataCopy = structuredClone(dataFigure);
    setDataFirst(structuredClone(dataCopy.map((item) => {
      if (item.id === '0/7_child') {
        item.visible = false;
      }
      if (item.id === '0/7') {
        item.visible = false;
      }
      return item;
    }).map(item => ({ ...item }))));
    setDataSecond(structuredClone(dataCopy.map((item) => {
      if (item.id === '0/7_child') {
        item.visible = true;
      }
      if (item.id === '0/7') {
        item.visible = true;
      }
      return item;
    }).map(item => ({ ...item }))));
  }, [dataFigure, setDataFirst, setDataSecond]);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2025-tir_report/' : './'}assets/data/2025-tir_report_figure05_data.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(structuredClone(cleanData(CSVtoJSON(transpose(body))))));
    } catch (error) {
      console.error(error);
    }
  }, [cleanData]);
  return (
    <div className="app">
      {dataFigure && (
      <ChartTreemap
        chart_height={600}
        data={dataFigure}
        idx="05"
        note=""
        prefix=""
        ref={ref}
        source="UN Trade and Development (UNCTAD), IMF Cazzaniga et al. (2024)"
        subtitle="Exposure to automation"
        title="Developed economies are most exposed but are not alone"
      />
      )}
    </div>
  );
});

Figure05.propTypes = {
  setDataFirst: PropTypes.func.isRequired, // Ensure it's a function and required
  setDataSecond: PropTypes.func.isRequired, // Ensure it's a function and required
};

export default Figure05;
