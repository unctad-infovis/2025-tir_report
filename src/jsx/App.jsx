import React, {
  useRef, useState, useEffect, useCallback, useMemo
} from 'react';
import '../styles/styles.less';

// https://www.npmjs.com/package/react-is-visible
// import 'intersection-observer';
// import IsVisible from 'react-is-visible';

import scrollIntoView from 'scroll-into-view';
// import DwChartContainer from './components/DwChartContainer.jsx';
import ShareContainer from './components/ShareContainer.jsx';

import FigureIntro from './FigureIntro.jsx';
import Figure01Donut from './Figure01Donut.jsx';
import Figure01Bar from './Figure01Bar.jsx';
import Figure01Alt from './Figure01Alt.jsx';
import Figure02 from './Figure02.jsx';
import Figure03 from './Figure03.jsx';
import Figure04 from './Figure04.jsx';
import Figure05 from './Figure05.jsx';
import ChapterHeader from './components/ChapterHeader.jsx';
// import ChapterHeaderAlt from './components/ChapterHeaderAlt.jsx';
// import TextHighlight from './components/TextHighlight.jsx';
import ScrollingText from './components/ScrollingText.jsx';
import ParallaxImage from './components/ParallaxImage.jsx';

function App() {
  const appRef = useRef();

  const analytics = window.gtag || undefined;
  const project_name = '2025-tir';

  const track = useCallback((event_type = false, event_name = false) => {
    if (typeof analytics !== 'undefined' && event_name !== false) {
      analytics('event', project_name, { event_type, event_name, transport_type: 'beacon' });
    }
  }, [analytics]);

  // const seenChapter = (chapter) => {
  // track('Scroll', chapter);
  // };

  /** *********
  * FIGURE INTRO *
  *********** */
  const [figureIntroData, setFigureIntroData] = useState(19);
  const [figureIntroHighlight, setFigureIntroHighlight] = useState(false);
  const [positionFigureIntro, setPositionFigureIntro] = useState('');
  const aboveSwitchPointFigureIntro = useRef({ isAbove1: true, isAbove2: true, isAbove3: true });
  const fixedSectionRefFigureIntro = useRef(null);
  const chartFigureIntro = useRef(null);

  const handleScrollFigureIntro = useCallback(() => {
    if (!fixedSectionRefFigureIntro.current) return;

    // 4 screens.
    fixedSectionRefFigureIntro.current.style.height = `${4 * 130 + 80}vh`;

    const { scrollY, innerHeight } = window;
    let { top } = fixedSectionRefFigureIntro.current.getBoundingClientRect();
    top += scrollY;
    const { height } = fixedSectionRefFigureIntro.current.getBoundingClientRect();
    const fixedBottom = top + height - innerHeight;
    const relativeScroll = scrollY - top;

    // Determine position state
    setPositionFigureIntro((scrollY < top) ? 'absolute_top' : (scrollY < fixedBottom) ? 'fixed' : 'absolute_bottom');

    if (!chartFigureIntro.current) return;

    // Define switch points
    const switchPoints = [innerHeight * 0.3 + innerHeight * 0.8, innerHeight * 1.6 + innerHeight * 0.8, innerHeight * 2.9 + innerHeight * 0.8];

    const newState = {
      isAbove1: relativeScroll < switchPoints[0],
      isAbove2: relativeScroll < switchPoints[1],
      isAbove3: relativeScroll < switchPoints[2],
    };
    if (newState.isAbove1) {
      fixedSectionRefFigureIntro.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0)';
    } else {
      fixedSectionRefFigureIntro.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    // Only update state if it has changed
    if (JSON.stringify(newState) === JSON.stringify(aboveSwitchPointFigureIntro.current)) return;
    aboveSwitchPointFigureIntro.current = newState;

    setFigureIntroHighlight(!newState.isAbove1 && newState.isAbove2);
    const selected_value = parseInt(document.querySelector('.selected.guess_button')?.value, 10);

    setFigureIntroData(newState.isAbove2 ? 19 : !newState.isAbove3 ? 477 : newState.isAbove3 && [60, 120, 250].includes(selected_value) ? selected_value : 19);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigureIntro);
    return () => window.removeEventListener('scroll', handleScrollFigureIntro);
  }, [handleScrollFigureIntro]);

  /** **************
  * FIGURE 1 *
  ***************** */
  const fixedSectionRefFigure01 = useRef(null);
  const [positionFigure01, setPositionFigure01] = useState('absolute_bottom');

  /** **************
  * FIGURE DONUT 1 *
  ***************** */
  const [figure01DonutData2023, setFigure01DonutData2023] = useState([]);
  const [figure01DonutData2033, setFigure01DonutData2033] = useState([]);
  const aboveSwitchPointFigure01Donut = useRef(({ isAbove1: true, isAbove2: true }));
  const chartFigure01Donut = useRef(null);

  const handleScrollFigure01Donut = useCallback(() => {
    if (!fixedSectionRefFigure01.current) return;

    // 3 screens.
    fixedSectionRefFigure01.current.style.height = `${3 * 130 + 80}vh`;

    const { scrollY, innerHeight } = window;
    let { top } = fixedSectionRefFigure01.current.getBoundingClientRect();
    top += scrollY;
    const { height } = fixedSectionRefFigure01.current.getBoundingClientRect();
    const fixedBottom = top + height - innerHeight;
    const relativeScroll = scrollY - top;

    // Determine fixed position state
    setPositionFigure01((scrollY < top) ? 'absolute_top' : (scrollY < fixedBottom) ? 'fixed' : 'absolute_bottom');

    if (!chartFigure01Donut.current) return;

    // Define switch points
    const switchPoints = [innerHeight * 0.3 + innerHeight * 0.8, innerHeight * 1.6 + innerHeight * 0.8];

    const newState = {
      isAbove1: relativeScroll < switchPoints[0],
      isAbove2: relativeScroll < switchPoints[1]
    };
    if (JSON.stringify(newState) === JSON.stringify(aboveSwitchPointFigure01Donut.current)) return;
    aboveSwitchPointFigure01Donut.current = newState;

    if (newState.isAbove1) {
      fixedSectionRefFigure01.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
      fixedSectionRefFigure01.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    const newData = newState.isAbove2 ? figure01DonutData2023 : figure01DonutData2033;
    // eslint-disable-next-line no-irregular-whitespace
    const newLabel = `<tspan style="font-size: 18px">Global frontier</tspan><tspan dy="21" x="3">​</tspan><tspan style="font-size: 18px">tech market in</tspan>${newState.isAbove2 ? '<tspan dy="21" x="3">​</tspan><tspan style="font-size: 18px">20</tspan><tspan style="fill: #ffc800; font-size: 18px;">2</tspan><tspan style="font-size: 18px">3</tspan>' : '<tspan dy="21" x="3">​</tspan><tspan style="font-size: 18px">20</tspan><tspan style="fill: #ffc800; font-size: 18px;">3</tspan><tspan style="font-size: 18px">3</tspan>'}<tspan dy="46" x="3">​</tspan><tspan style="font-weight: bold;">${newState.isAbove2 ? '$2.5tn' : '$16.4tn'}</tspan>`;

    try {
      chartFigure01Donut.current.series[0].setData(newData, false);
      chartFigure01Donut.current.options.chart.custom.label.text.element.innerHTML = newLabel;
      chartFigure01Donut.current.redraw();
    } catch {
      fixedSectionRefFigure01.current.style.height = `${3 * 130 + 80}vh`;
    }
  }, [figure01DonutData2023, figure01DonutData2033]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure01Donut);
    return () => window.removeEventListener('scroll', handleScrollFigure01Donut);
  }, [handleScrollFigure01Donut]);

  /** **************
  * FIGURE BAR 1 *
  ***************** */
  const [figure01BarData2023, setFigure01BarData2023] = useState([]);
  const [figure01BarData2033, setFigure01BarData2033] = useState([]);
  const aboveSwitchPointFigure01Bar = useRef(({ isAbove1: true, isAbove2: true }));
  const chartFigure01Bar = useRef(null);

  const handleScrollFigure01Bar = useCallback(() => {
    if (!fixedSectionRefFigure01.current) return;

    // 3 screens.
    fixedSectionRefFigure01.current.style.height = `${3 * 130 + 80}vh`;

    const { scrollY, innerHeight } = window;
    let { top } = fixedSectionRefFigure01.current.getBoundingClientRect();
    top += scrollY;
    const { height } = fixedSectionRefFigure01.current.getBoundingClientRect();
    const fixedBottom = top + height - innerHeight;
    const relativeScroll = scrollY - top;

    // Determine fixed position state
    setPositionFigure01((scrollY < top) ? 'absolute_top' : (scrollY < fixedBottom) ? 'fixed' : 'absolute_bottom');

    if (!chartFigure01Bar.current) return;

    // Define switch points
    const switchPoints = [innerHeight * 0.3 + innerHeight * 0.8, innerHeight * 1.6 + innerHeight * 0.8];

    const newState = {
      isAbove1: relativeScroll < switchPoints[0],
      isAbove2: relativeScroll < switchPoints[1]
    };
    if (JSON.stringify(newState) === JSON.stringify(aboveSwitchPointFigure01Bar.current)) return;
    aboveSwitchPointFigure01Bar.current = newState;

    if (newState.isAbove1) {
      fixedSectionRefFigure01.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
      fixedSectionRefFigure01.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    const newData = newState.isAbove2 ? figure01BarData2023 : figure01BarData2033;
    // eslint-disable-next-line no-irregular-whitespace
    const newLabel = `<tspan>Global frontier</tspan><tspan dy="1.2em" x="3">​</tspan>${newState.isAbove2 ? '<tspan>tech market in 20</tspan><tspan style="fill: #ffc800;">2</tspan><tspan>3</tspan>' : '<tspan>tech market in 20</tspan><tspan style="fill: #ffc800;">3</tspan><tspan>3</tspan>'}<tspan dy="1.6em" x="3">​</tspan><tspan style="font-size: 40px; font-weight: bold;">${newState.isAbove2 ? '$2.5tn' : '$16.4tn'}</tspan>`;

    try {
      chartFigure01Bar.current.series[0].setData(newData.sort((a, b) => b.y - a.y), false);
      chartFigure01Bar.current.xAxis[0].update({
        categories: newData.map(el => el.name)
      }, false);
      chartFigure01Bar.current.options.chart.custom.label.text.element.innerHTML = newLabel;
      chartFigure01Bar.current.redraw();
    } catch {
      fixedSectionRefFigure01.current.style.height = `${3 * 130 + 80}vh`;
    }
  }, [figure01BarData2023, figure01BarData2033]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure01Bar);
    return () => window.removeEventListener('scroll', handleScrollFigure01Bar);
  }, [handleScrollFigure01Bar]);

  /** *********
  * FIGURE 1 ALT *
  *********** */
  const figure01Data = useMemo(() => ({
    2023: [{
      fill: 'rgba(0, 158, 219, 0.3)', id: 1, name: 'Internet of things', percentage: 36, value: 925
    },
    {
      fill: 'rgba(114, 191, 68, 0.3)', id: 2, name: 'Electric vehicles', percentage: 15, value: 388
    },
    {
      fill: 'rgba(255, 200, 0, 1.0)', id: 3, name: 'Artificial intelligence', percentage: 7, value: 189
    },
    {
      fill: 'rgba(230, 239, 208, 0.3)', id: 4, name: 'Solar photovoltaic', percentage: 6, value: 165
    },
    {
      fill: 'rgba(174, 162, 154, 0.3)', id: 5, name: 'Other', percentage: 34, value: 875
    }],
    2033: [{
      fill: 'rgba(0, 158, 219, 0.3)', id: 1, name: 'Internet of things', percentage: 19, value: 3141
    },
    {
      fill: 'rgba(114, 191, 68, 0.3)', id: 2, name: 'Electric vehicles', percentage: 9, value: 1401
    },
    {
      fill: 'rgba(255, 200, 0, 1.0)', id: 3, name: 'Artificial intelligence', percentage: 29, value: 4772
    },
    {
      fill: 'rgba(197, 223, 239, 0.3)', id: 6, name: 'Blockchain', percentage: 14, value: 2350
    },
    {
      fill: 'rgba(174, 162, 154, 0.3)', id: 5, name: 'Other', percentage: 29, value: 4756
    }]
  }), []);

  const [figure01AltData, setFigure01AltData] = useState(figure01Data[2023]);
  const aboveSwitchPointFigure01Alt = useRef(({ isAbove1: true, isAbove2: true }));
  const chartFigure01Alt = useRef(null);

  const handleScrollFigure01Alt = useCallback(() => {
    if (!fixedSectionRefFigure01.current) return;

    // 3 screens.
    fixedSectionRefFigure01.current.style.height = `${3 * 130 + 80}vh`;

    const { scrollY, innerHeight } = window;
    let { top } = fixedSectionRefFigure01.current.getBoundingClientRect();
    top += scrollY;
    const { height } = fixedSectionRefFigure01.current.getBoundingClientRect();
    const fixedBottom = top + height - innerHeight;
    const relativeScroll = scrollY - top;

    // Determine fixed position state
    setPositionFigure01((scrollY < top) ? 'absolute_top' : (scrollY < fixedBottom) ? 'fixed' : 'absolute_bottom');

    if (!chartFigure01Alt.current) return;

    // Define switch points
    const switchPoints = [innerHeight * 0.3 + innerHeight * 0.8, innerHeight * 1.6 + innerHeight * 0.8];

    const newState = {
      isAbove1: relativeScroll < switchPoints[0],
      isAbove2: relativeScroll < switchPoints[1]
    };
    if (JSON.stringify(newState) === JSON.stringify(aboveSwitchPointFigure01Alt.current)) return;
    aboveSwitchPointFigure01Alt.current = newState;

    if (newState.isAbove1) {
      fixedSectionRefFigure01.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
      fixedSectionRefFigure01.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    setFigure01AltData(newState.isAbove2 ? figure01Data[2023] : figure01Data[2033]);
  }, [figure01Data]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure01Alt);
    return () => window.removeEventListener('scroll', handleScrollFigure01Alt);
  }, [handleScrollFigure01Alt]);

  /** *********
  * FIGURE 2 *
  *********** */
  const [positionFigure02, setPositionFigure02] = useState('absolute_bottom');
  const aboveSwitchPointFigure02 = useRef({ isAbove1: null, isAbove2: null });
  const fixedSectionRefFigure02 = useRef(null);
  const chartFigure02 = useRef(null);

  const handleScrollFigure02 = useCallback(() => {
    if (!fixedSectionRefFigure02.current) return;

    // 3 screens.
    fixedSectionRefFigure02.current.style.height = `${3 * 130 + 80}vh`;

    const { scrollY, innerHeight } = window;
    let { top } = fixedSectionRefFigure02.current.getBoundingClientRect();
    top += scrollY;
    const { height } = fixedSectionRefFigure02.current.getBoundingClientRect();
    const fixedBottom = top + height - innerHeight;
    const relativeScroll = scrollY - top;

    // Determine position state
    setPositionFigure02((scrollY < top) ? 'absolute_top' : (scrollY < fixedBottom) ? 'fixed' : 'absolute_bottom');

    if (!chartFigure02.current) return;

    // Define switch points
    const switchPoints = [innerHeight * 0.3 + innerHeight * 0.8, innerHeight * 1.6 + innerHeight * 0.8];

    const newState = {
      isAbove1: relativeScroll < switchPoints[0],
      isAbove2: relativeScroll < switchPoints[1]
    };
    if (JSON.stringify(newState) === JSON.stringify(aboveSwitchPointFigure02.current)) return;
    aboveSwitchPointFigure02.current = newState;

    if (newState.isAbove1) {
      fixedSectionRefFigure02.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
      fixedSectionRefFigure02.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    chartFigure02.current.update({
      plotOptions: { bar: { colors: newState.isAbove1 ? ['#009edb', '#009edb', '#009edb'] : newState.isAbove2 ? ['#fbaf17', '#009edb', '#009edb'] : ['#fbaf17', '#009edb', '#009edb'] } }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure02);
    return () => window.removeEventListener('scroll', handleScrollFigure02);
  }, [handleScrollFigure02]);

  /** *********
  * FIGURE 3 *
  *********** */
  const [figure03DataStage1, setFigure03DataStage1] = useState([]);
  const [figure03DataStage2, setFigure03DataStage2] = useState([]);
  const [figure03DataStage3, setFigure03DataStage3] = useState([]);
  const [figure03DataStage4, setFigure03DataStage4] = useState([]);
  const [figure03DataStage5, setFigure03DataStage5] = useState([]);
  const [figure03DataStage6, setFigure03DataStage6] = useState([]);
  const [figure03DataStage7, setFigure03DataStage7] = useState([]);
  const [figure03DataStage8, setFigure03DataStage8] = useState([]);
  const [positionFigure03, setPositionFigure03] = useState('');
  const aboveSwitchPointFigure03 = useRef(null);
  const fixedSectionRefFigure03 = useRef(null);
  const chartFigure03 = useRef(null);

  const handleScrollFigure03 = useCallback(() => {
    if (!fixedSectionRefFigure03.current) return;

    // 8 screens.
    fixedSectionRefFigure03.current.style.height = `${8 * 130 + 80}vh`;

    const { scrollY, innerHeight } = window;
    let { top } = fixedSectionRefFigure03.current.getBoundingClientRect();
    top += scrollY;
    const { height } = fixedSectionRefFigure03.current.getBoundingClientRect();
    const fixedBottom = top + height - innerHeight;
    const relativeScroll = scrollY - top;

    // Determine position state
    setPositionFigure03((scrollY < top) ? 'absolute_top' : (scrollY < fixedBottom) ? 'fixed' : 'absolute_bottom');

    if (!chartFigure03.current) return;

    // Define switch points
    const switchPoints = [innerHeight * 0.3 + innerHeight * 0.8, innerHeight * 1.6 + innerHeight * 0.8, innerHeight * 2.9 + innerHeight * 0.8, innerHeight * 4.2 + innerHeight * 0.8, innerHeight * 5.5 + innerHeight * 0.8, innerHeight * 6.8 + innerHeight * 0.8, innerHeight * 8.1 + innerHeight * 0.8];

    // Determine data stage
    let newData;
    let position = false;
    if (relativeScroll < switchPoints[0]) {
      position = 1;
      newData = figure03DataStage1;
    } else if (relativeScroll < switchPoints[1]) {
      position = 2;
      newData = figure03DataStage2;
    } else if (relativeScroll < switchPoints[2]) {
      position = 3;
      newData = figure03DataStage3;
    } else if (relativeScroll < switchPoints[3]) {
      position = 4;
      newData = figure03DataStage4;
    } else if (relativeScroll < switchPoints[4]) {
      position = 5;
      newData = figure03DataStage5;
    } else if (relativeScroll < switchPoints[5]) {
      position = 6;
      newData = figure03DataStage6;
    } else if (relativeScroll < switchPoints[6]) {
      position = 7;
      newData = figure03DataStage7;
    } else {
      position = 8;
      newData = figure03DataStage8;
    }

    if (aboveSwitchPointFigure03.current === newData) return;

    aboveSwitchPointFigure03.current = newData;

    // Update chart data
    const newDataCopy = structuredClone(newData);
    chartFigure03.current.series.forEach((series, index) => {
      series.setData(newDataCopy[index].data, false);
    });

    chartFigure03.current.xAxis[0].update({
      plotLines: [{
        color: '#eee',
        dashStyle: 'dash',
        value: 2.7,
        width: (position > 1 && position < 8) ? 1.5 : 0,
      }]
    }, false);
    chartFigure03.current.yAxis[0].update({
      plotLines: [{
        color: '#eee',
        dashStyle: 'dash',
        value: 18.5,
        width: (position > 1 && position < 8) ? 1.5 : 0,
      }],
    }, false);

    if (position > 5) {
      chartFigure03.current.series[3].setVisible(true, false);
      chartFigure03.current.xAxis[0].update({
        gridLineWidth: 1,
        max: 5.2,
        min: 2.95,
        tickInterval: 0.5,
        title: {
          text: 'Gross domestic product per capita‚ PPP'
        }
      }, false);
      chartFigure03.current.yAxis[0].update({
        gridLineWidth: 1,
        max: 1.05,
        min: 0,
        tickInterval: 0.2,
        title: {
          text: 'Frontier Technologies Readiness Index'
        }
      }, false);
    } else {
      chartFigure03.current.series[3].setVisible(false, false);
      chartFigure03.current.xAxis[0].update({
        gridLineWidth: 0,
        max: 10,
        min: 0,
        tickInterval: 2,
        title: {
          text: 'Share of developers compared to working age population'
        }
      }, false);
      chartFigure03.current.yAxis[0].update({
        gridLineWidth: 0,
        max: 60,
        min: 0,
        tickInterval: 20,
        title: {
          text: 'Share of working age population with advanced degree'
        }
      }, false);
    }
    chartFigure03.current.redraw();
  }, [figure03DataStage1, figure03DataStage2, figure03DataStage3, figure03DataStage4, figure03DataStage5, figure03DataStage6, figure03DataStage7, figure03DataStage8
  ]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure03);
    return () => window.removeEventListener('scroll', handleScrollFigure03);
  }, [handleScrollFigure03]);

  /** *********
  * FIGURE 4 *
  *********** */
  const [figure04DataFirst, setFigure04DataFirst] = useState([]);
  const [figure04DataSecond, setFigure04DataSecond] = useState([]);
  const [positionFigure04, setPositionFigure04] = useState('');
  const aboveSwitchPointFigure04 = useRef({ isAbove1: null, isAbove2: null });
  const fixedSectionRefFigure04 = useRef(null);
  const chartFigure04 = useRef(null);

  const handleScrollFigure04 = useCallback(() => {
    if (!fixedSectionRefFigure04.current) return;

    // 3 screens.
    fixedSectionRefFigure04.current.style.height = `${3 * 130 + 80}vh`;

    const { scrollY, innerHeight } = window;
    let { top } = fixedSectionRefFigure04.current.getBoundingClientRect();
    top += scrollY;
    const { height } = fixedSectionRefFigure04.current.getBoundingClientRect();
    const fixedBottom = top + height - innerHeight;
    const relativeScroll = scrollY - top;

    // Determine position state
    setPositionFigure04((scrollY < top) ? 'absolute_top' : (scrollY < fixedBottom) ? 'fixed' : 'absolute_bottom');

    if (!chartFigure04.current) return;

    // Define switch points
    const switchPoints = [innerHeight * 0.3 + innerHeight * 0.8, innerHeight * 1.6 + innerHeight * 0.8];

    // Define states for switch points
    const newState = {
      isAbove1: relativeScroll < switchPoints[0],
      isAbove2: relativeScroll < switchPoints[1]
    };
    if (JSON.stringify(newState) === JSON.stringify(aboveSwitchPointFigure04.current)) return;
    aboveSwitchPointFigure04.current = newState;

    if (!newState.isAbove2) {
      chartFigure04.current.series[0].update({ lineWidth: 6 }, false);
      chartFigure04.current.series[2].update({ lineWidth: 10 }, false);
      chartFigure04.current.series[0].update({ opacity: 0.1 }, false);
      chartFigure04.current.series[1].update({ opacity: 0.1 }, false);
      chartFigure04.current.series[2].update({ opacity: 1 }, false);
      chartFigure04.current.series[0].setData(figure04DataSecond[0].data, false);
      chartFigure04.current.series[1].setData(figure04DataSecond[1].data, false);
      chartFigure04.current.series[2].setData(figure04DataSecond[2].data, false);
    } else if (!newState.isAbove1) {
      chartFigure04.current.series[0].update({ lineWidth: 10 }, false);
      chartFigure04.current.series[2].update({ lineWidth: 6 }, false);
      chartFigure04.current.series[0].update({ opacity: 1 }, false);
      chartFigure04.current.series[1].update({ opacity: 0.1 }, false);
      chartFigure04.current.series[2].update({ opacity: 0.1 }, false);
      chartFigure04.current.series[0].setData(figure04DataSecond[0].data, false);
      chartFigure04.current.series[1].setData(figure04DataSecond[1].data, false);
      chartFigure04.current.series[2].setData(figure04DataSecond[2].data, false);
    } else {
      chartFigure04.current.series[0].update({ lineWidth: 6 }, false);
      chartFigure04.current.series[2].update({ lineWidth: 6 }, false);
      chartFigure04.current.series[0].update({ opacity: 1 }, false);
      chartFigure04.current.series[1].update({ opacity: 1 }, false);
      chartFigure04.current.series[2].update({ opacity: 1 }, false);
      chartFigure04.current.series[0].setData(figure04DataFirst[0].data, false);
      chartFigure04.current.series[1].setData(figure04DataFirst[1].data, false);
      chartFigure04.current.series[2].setData(figure04DataFirst[2].data, false);
    }
    chartFigure04.current.redraw();
  }, [figure04DataFirst, figure04DataSecond]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure04);
    return () => window.removeEventListener('scroll', handleScrollFigure04);
  }, [handleScrollFigure04]);

  /** *********
  * FIGURE 5 *
  *********** */

  const [figure05DataFirst, setFigure05DataFirst] = useState([]);
  const [figure05DataSecond, setFigure05DataSecond] = useState([]);
  const [figure05DataThird, setFigure05DataThird] = useState([]);
  const [positionFigure05, setPositionFigure05] = useState('absolute_bottom');
  const aboveSwitchPointFigure05 = useRef({ isAbove1: true, isAbove2: true });
  const fixedSectionRefFigure05 = useRef(null);
  const chartFigure05 = useRef(null);

  const handleScrollFigure05 = useCallback(() => {
    if (!fixedSectionRefFigure05.current) return;

    // 3 screens.
    fixedSectionRefFigure05.current.style.height = `${3 * 130 + 80}vh`;

    const { scrollY, innerHeight } = window;
    let { top } = fixedSectionRefFigure05.current.getBoundingClientRect();
    top += scrollY;
    const { height } = fixedSectionRefFigure05.current.getBoundingClientRect();
    const fixedBottom = top + height - innerHeight;
    const relativeScroll = scrollY - top;

    // Determine position state
    setPositionFigure05((scrollY < top) ? 'absolute_top' : (scrollY < fixedBottom) ? 'fixed' : 'absolute_bottom');

    if (!chartFigure05.current) return;

    // Define switch points
    const switchPoints = [innerHeight * 0.3 + innerHeight * 0.8, innerHeight * 1.6 + innerHeight * 0.8];

    // Define states for switch points
    const newState = {
      isAbove1: relativeScroll < switchPoints[0],
      isAbove2: relativeScroll < switchPoints[1]
    };
    if (JSON.stringify(newState) === JSON.stringify(aboveSwitchPointFigure05.current)) return;
    aboveSwitchPointFigure05.current = newState;

    const newData = newState.isAbove1 ? figure05DataFirst : (newState.isAbove2) ? figure05DataSecond : figure05DataThird;

    const newDataCopy = structuredClone(newData);
    chartFigure05.current.series[0].setData(newDataCopy, false);
    chartFigure05.current.redraw();
  }, [figure05DataFirst, figure05DataSecond, figure05DataThird]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure05);
    return () => window.removeEventListener('scroll', handleScrollFigure05);
  }, [handleScrollFigure05]);

  const scrollTo = useCallback((target, name) => {
    track('Button', name);
    if (target.includes('anchor_')) {
      setTimeout(() => {
        scrollIntoView(document.querySelector(target), {
          align: {
            left: 0,
            leftOffset: 0,
            lockX: false,
            lockY: false,
            top: 0,
            topOffset: 30
          },
          cancellable: false,
          time: 1000
        });
      }, 50);
    } else {
      setTimeout(() => {
        scrollIntoView(appRef.current.querySelector(target), {
          align: {
            left: 0,
            leftOffset: 0,
            lockX: false,
            lockY: false,
            top: 0,
            topOffset: 30
          },
          cancellable: false,
          time: 1000
        });
      }, 50);
    }
  }, [track]);

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      if (hash === '#chapter1' || hash === '#chapter2' || hash === '#chapter3' || hash === '#chapter4' || hash === '#chapter5') {
        const chapter_number = hash.slice(-1);
        scrollTo(`.chapter_header_${chapter_number}`, `Scroll to chapter ${chapter_number}`);
      }
    }
  }, [scrollTo]);

  const downloadDocument = (event) => {
    track('Anchor', `${event.currentTarget.href}`);
    event.stopPropagation();
    return false;
  };

  useEffect(() => {
    const paragraphs = document.querySelectorAll('.text_content p, .text_content ul, .text_content h3, .text_content blockquote');

    // Options for the observer (when the p tag is 50% in the viewport)
    const options = {
      threshold: 0.5, // Trigger when 50% of the paragraph is visible
    };

    // Callback function for when the intersection occurs
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
        // Add the visible class when the element is in view
          entry.target.classList.add('visible');
        }
      });
    };

    // Create an IntersectionObserver instance with the callback and options
    const observer = new IntersectionObserver(observerCallback, options);

    // Observe each paragraph
    paragraphs.forEach(p => observer.observe(p));
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 500); // A short delay ensures the DOM is ready
  }, []);

  const [selectedButton, setSelectedButton] = useState(null);
  const handleClick = (value, index) => {
    setFigureIntroData(value);
    setSelectedButton(index);
  };

  const [offset, setOffset] = useState(false);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [sectionProgress, setSectionProgress] = useState(0);

  const chaptersContainerRef = useRef();

  useEffect(() => {
    const windowHeight = 0;
    setSectionProgress((offset > chaptersContainerRef.current.offsetTop - windowHeight) ? (Math.min(((offset - (chaptersContainerRef.current.offsetTop - windowHeight)) / chaptersContainerRef.current.offsetHeight) * 100, 100)) : 0);
  }, [offset]);

  return (
    <div className="app" ref={appRef}>
      { /* Header */}
      <div className="header_container">
        <div className="content_top">
          <h2>
            <div className="year">
              20
              <span>25</span>
            </div>
            <div className="name">Technology and innovation report</div>
          </h2>
        </div>
        <div className="between" />
        <div className="content_bottom">
          <h2>
            Inclusive artificial intelligence for development
            <div className="share_wrapper"><ShareContainer url={window.location.href} /></div>
          </h2>
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tir2025overview_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" aria-label="Download Overview" className="overview">Overview</a>
            <a href="/system/files/official-document/tir2025_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" aria-label="Download Full Report" className="pdf_download">Full report</a>
            <button type="button" className="video" onClick={() => scrollTo('.anchor_videos', 'Scroll to videos')}>Video</button>
            {/* <button type="button" className="podcast" onClick={() => scrollTo('.anchor_podcasts', 'Scroll to podcasts')}>Podcast</button> */}
            <button type="button" className="press" onClick={() => scrollTo('.anchor_press', 'Scroll to press')}>Press</button>
          </div>
          <div className="chapters_navigation_container">
            {
              ['AI at the technology frontier', 'Leveraging AI for productivity and workers’ empowerment', 'Preparing to seize AI opportunities', 'Designing national policies for AI', 'Global collaboration for inclusive and equitable AI'].map((chapter_title, i) => (
                <button onClick={() => scrollTo(`.chapter_header_${i + 1}`, `Scroll to chapter ${i + 1}`)} type="button" key={chapter_title}>
                  <div className="chapter_navigation">
                    <div className="chapter_title"><h2>{chapter_title}</h2></div>
                    <div className="chapter_image"><div className={`chapter_image_${i + 1}`} /></div>
                    <div className="chapter_meta">
                      <div className="chapter_number">
                        {i + 1}
                        .
                      </div>
                      <a href={`/system/files/official-document/tir2025ch${i + 1}_en.pdf`} target="_blank" onClick={(event) => downloadDocument(event)} className="chapter_download_button" aria-label={`Download Chapter ${i + 1}`} rel="noreferrer" />
                    </div>
                  </div>
                </button>
              ))
            }
          </div>
        </div>
      </div>

      { /* Overview */}
      <div className="content_container">
        <div className="text_container">
          <div className="text_content">
            <h3>Artificial Intelligence (AI) is the first technology that can make decisions and generate ideas, challenging the notion that technology is neutral.</h3>
            <p>AI can fast-track the Sustainable Development Goals (SDGs), powering smart agriculture and energy grids, optimizing production and supply chains, improving water and city planning – and more. Case studies show AI boosts productivity and improves livelihoods – if supported by the right policies and skills.</p>
            <p>But AI is evolving much faster than governments can respond. Without the right oversight and fair access, it risks deepening global divides.</p>
            <p>The Technology and Innovation Report 2025 calls for AI that puts people first and is shaped through global cooperation in which all countries have a say.</p>
            <p>It outlines policy priorities for the three key AI leverage points:</p>
            <ul>
              <li className="oneliner"><strong>Infrastructure</strong></li>
              <li className="oneliner"><strong>Data</strong></li>
              <li className="oneliner"><strong>Skills </strong></li>
            </ul>
            <blockquote>
              <div className="quote">History has shown that while technological progress drives economic growth, it does not on its own ensure equitable income distribution or promote inclusive human development.</div>
              <div className="author">
                <span className="name">Rebeca Grynspan</span>
                <span className="title">Secretary-General of UN Trade and Development (UNCTAD)</span>
              </div>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="chapters_container" ref={chaptersContainerRef}>
        { /* Chapter 1 */ }
        <div className="progress_indicator_container">
          <div className="section">
            <div className="progress_bar" style={{ width: `${sectionProgress}%` }} />
          </div>
        </div>
        <div className="backtotop_container">
          <button type="button" onClick={() => scrollTo('.header_container', 'Scroll to top')}>Back to top</button>
        </div>
        <ScrollingText texts={['Just how fast is AI’s market growing?']} chapter_text="" />
        <div ref={fixedSectionRefFigureIntro} className="fixed-section">
          <div className={`fixed-background ${positionFigureIntro}`}>
            <div className="overlay" />
            <div className="scroll-indicator"><div className="arrow" /></div>
            <div className="chart_container_full">
              <FigureIntro ref={chartFigureIntro} node_count={figureIntroData} highlight_bool={figureIntroHighlight} />
            </div>
          </div>
          <div className="scroll-elements">
            <div className="scroll-content">
              <div>
                <p>
                  These dots represent AI’s estimated market value in 2023.
                  <br />
                  <br />
                  <span style={{ color: '#ffc800' }}>$189&nbsp;billion</span>
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  Each dot =
                  {' '}
                  <span style={{ color: '#ffc800' }}>$10&nbsp;billion.</span>
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  How much will it be worth in
                  {' '}
                  <span style={{ color: '#ffc800' }}>2033?</span>
                </p>
                <p>Take a guess.</p>
                <div className="quess_buttons_container">
                  {[{ value: 60, label: '$600', unit: 'billion' },
                    { value: 120, label: '$1.2', unit: 'trillion' },
                    { value: 250, label: '$2.4', unit: 'trillion' },
                    { value: 477, label: '$4.8', unit: 'trillion' }].map((button, index) => (
                      <button key={button.label} type="button" className={`${(selectedButton === index) ? 'selected' : ''} guess_button`} value={button.value} onClick={() => handleClick(button.value, index)}>
                        <div className="number">{button.label}</div>
                        <div>{button.unit}</div>
                      </button>
                  ))}
                </div>
                <div>
                  <button type="button" className="skip_button" onClick={() => scrollTo('.scroll-content-skip', 'Scroll to skip')}>Skip</button>
                  {' '}
                  <button type="button" className="skip_button" onClick={() => handleClick(19, -1)}>Reset</button>
                </div>
              </div>
            </div>
            <div className="scroll-content scroll-content-skip">
              <div>
                <p>
                  AI is projected to hit
                  {' '}
                  <span style={{ color: '#ffc800' }}>$4.8&nbsp;trillion</span>
                  {' '}
                  by 2033.
                </p>
                <p>
                  That’s a
                  {' '}
                  <span style={{ color: '#ffc800' }}>25x increase</span>
                  {' '}
                  in just 10 years.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ScrollingText texts={['Let’s put that in perspective.', 'What will AI’s share of the frontier technologies market look like?']} chapter_text="Chapter 1" />
        <div ref={fixedSectionRefFigure01} className="fixed-section">
          <div className={`fixed-background ${positionFigure01}`}>
            <div className="overlay" />
            <div className="scroll-indicator"><div className="arrow" /></div>
            <div className="chart_container_full">
              {
                (window.innerWidth > 800 && window.innerHeight > 700) ? <Figure01Alt ref={chartFigure01Alt} chart_data={figure01AltData} /> : (window.innerWidth > 600 && window.innerHeight > 800) ? <Figure01Donut ref={chartFigure01Donut} setData2023={setFigure01DonutData2023} setData2033={setFigure01DonutData2033} /> : <Figure01Bar ref={chartFigure01Bar} setData2023={setFigure01BarData2023} setData2033={setFigure01BarData2033} />
              }
            </div>
          </div>
          <div className="scroll-elements">
            <div className="scroll-content">
              <div>
                <p>
                  In 2023, AI made up
                  {' '}
                  <span style={{ color: '#ffc800' }}>7%</span>
                  {' '}
                  of the global frontier tech market.
                </p>
                <br />
                <p>
                  By 2033, its share could reach
                  {' '}
                  <span style={{ color: '#ffc800' }}>29%</span>
                  {' '}
                  – propelling it to the top.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content_container chapter_header_1">
          <div className="text_container">
            <ChapterHeader chapter_number="1" title="AI at the technology frontier" />
            <div className="download_buttons_container">
              <a href="/system/files/official-document/tir2025ch1_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download" aria-label="Download Chapter 1">Download</a>
            </div>
            <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/_image_01_.jpg" /></div></div>
            <div className="text_content">
              <h3>Breakthroughs in AI are reshaping all industries – from content creation and product design to automated coding and customer service.</h3>
              <p>But AI development is highly concentrated. Just 100 companies funded 40% of research and development (R&D) in 2022. None of them are based in developing countries except China. The United States and China account for about 33% of AI publications and 60% of AI patents.</p>
              <p>This imbalance is also seen in AI infrastructure. AI needs more than electricity and the internet. It requires computing power, servers and data centres.</p>
              <p>The US holds one third of the top supercomputers and over half the world’s computing power. Most supercomputers and data centres are in developed countries.</p>
              <p>Skills are also key – from data literacy to expert-level AI knowledge. But these skills are unevenly distributed.</p>
            </div>
          </div>
        </div>

        { /* Chapter 2 */ }
        <ScrollingText texts={['AI is reshaping how we work.', 'How will it affect jobs in different countries?']} chapter_text="Chapter 2" />
        <div ref={fixedSectionRefFigure02} className="fixed-section">
          <div className={`fixed-background ${positionFigure02}`}>
            <div className="overlay" />
            <div className="scroll-indicator"><div className="arrow" /></div>
            <div className="chart_container_full">
              <Figure02 ref={chartFigure02} />
            </div>
          </div>
          <div className="scroll-elements">
            <div className="scroll-content">
              <div>
                <p>
                  <span style={{ color: '#ffc800' }}>AI</span>
                  {' '}
                  can automate cognitive tasks like writing, coding and data analysis.
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  Up to
                  {' '}
                  <span style={{ color: '#ffc800' }}>one third</span>
                  {' '}
                  of jobs in advanced economies are at risk.
                </p>
              </div>
            </div>
            <div className="scroll-content"><div><p>But they are also better positioned to harness AI’s benefits.</p></div></div>
          </div>
        </div>
        <div className="content_container chapter_header_2">
          <div className="text_container">
            <ChapterHeader chapter_number="2" title="Leveraging AI for productivity and workers’ empowerment" />
            <div className="download_buttons_container">
              <a href="/system/files/official-document/tir2025ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download" aria-label="Download Chapter 2">Download</a>
            </div>
            <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/_image_02_.jpg" /></div></div>
            <div className="text_content">
              <h3>AI could affect 40% of jobs worldwide, with workers in advanced economies more exposed. But it’s not all about potential job loss.</h3>
              <p>In advanced economies, 27% of jobs could be enhanced by AI – boosting human skills rather than replacing workers.</p>
              <p>Generative AI can unlock major productivity gains – especially in services and knowledge work.</p>
              <p>Tech history shows that AI’s full impact will take years – if not decades – to unfold.</p>
              <p>Whether developing economies can harness the benefits depends on their ability to invest in infrastructure, data and skills.</p>
              <p><strong>Key policy priorities</strong></p>
              <ul>
                <li>
                  <strong>Understand workforce dynamics. </strong>
                  {' '}
                  AI’s impact depends on a complex mix of automation, augmentation and new job creation. Policymakers must grasp these dynamics to ensure fair distribution of benefits and smooth transitions.
                </li>
                <li>
                  <strong>Accelerate AI adoption. </strong>
                  {' '}
                  Developing countries can speed up AI use by adapting solutions to local infrastructure, using alternative data sources, simplifying interfaces and building strategic partnerships to access key resources.
                </li>
                <li>
                  <strong>Empower workers. </strong>
                  {' '}
                  Inclusive AI must centre on people. That means promoting digital literacy, supporting reskilling and upskilling, and involving workers in designing AI tools for their jobs.
                </li>
                <li>
                  <strong>Promote human-complementary AI. </strong>
                  {' '}
                  Public R&D funding, smart procurement and tax incentives can promote AI that complements human work. Clear career paths and better job opportunities can reduce the risk of brain drain.
                </li>
              </ul>
            </div>
          </div>
        </div>

        { /* Chapter 3 */ }
        <ScrollingText texts={['AI readiness levels vary.', 'But how uneven is the playing field?']} chapter_text="Chapter 3" />
        <div ref={fixedSectionRefFigure03} className="fixed-section">
          <div className={`fixed-background ${positionFigure03}`}>
            <div className="scroll-indicator"><div className="arrow" /></div>
            <div className="chart_container_full">
              <Figure03
                ref={chartFigure03}
                setDataStage1={setFigure03DataStage1}
                setDataStage2={setFigure03DataStage2}
                setDataStage3={setFigure03DataStage3}
                setDataStage4={setFigure03DataStage4}
                setDataStage5={setFigure03DataStage5}
                setDataStage6={setFigure03DataStage6}
                setDataStage7={setFigure03DataStage7}
                setDataStage8={setFigure03DataStage8}
              />
            </div>
          </div>
          <div className="scroll-elements">
            <div className="scroll-content">
              <div>
                <p>
                  This graph shows how ready countries are for
                  {' '}
                  <span style={{ color: '#ffc800' }}>AI</span>
                  {' '}
                  across the population.
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  Each is ranked as a
                  {' '}
                  <span style={{ color: '#ffc800' }}>laggard</span>
                  ,
                  {' '}
                  <span style={{ color: '#ffc800' }}>practitioner</span>
                  ,
                  {' '}
                  <span style={{ color: '#ffc800' }}>creator</span>
                  {' '}
                  or
                  {' '}
                  <span style={{ color: '#ffc800' }}>leader.</span>
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  Most
                  {' '}
                  <span style={{ color: '#ffc800' }}>developed countries</span>
                  {' '}
                  are leaders.
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  <span style={{ color: '#ffc800' }}>Least developed countries</span>
                  {' '}
                  lag furthest behind.
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  <span style={{ color: '#ffc800' }}>Developing countries</span>
                  {' '}
                  are spread across all categories.
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  Let’s take a look at UNCTAD’s
                  {' '}
                  <span style={{ color: '#ffc800' }}>Frontier Technologies Readiness Index</span>
                  .
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  <span style={{ color: '#ffc800' }}>Developed countries</span>
                  {' '}
                  are generally more prepared.
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  But
                  {' '}
                  <span style={{ color: '#ffc800' }}>Brazil</span>
                  ,
                  {' '}
                  <span style={{ color: '#ffc800' }}>China</span>
                  ,
                  {' '}
                  <span style={{ color: '#ffc800' }}>India</span>
                  {' '}
                  and
                  {' '}
                  <span style={{ color: '#ffc800' }}>the Philippines</span>
                  {' '}
                  punch above their economic development.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content_container chapter_header_3">
          <div className="text_container">
            <ChapterHeader chapter_number="3" title="Preparing to seize AI opportunities" />
            <div className="download_buttons_container">
              <a href="/system/files/official-document/tir2025ch3_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download" aria-label="Download Chapter 3">Download</a>
            </div>
            <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/_image_03_.jpg" /></div></div>
            <div className="text_content">
              <h3>Advanced economies benefit from a larger talent pool of workers with advanced degrees and coding skills – giving them a head start and edge in scaling AI. But some developing countries are showing strong potential.</h3>
              <p>Brazil, China, India and the Philippines have made progress in harnessing AI for development.</p>
              <p>China excels in data affordability and volume and, along with India and Brazil, has built large pools of AI developers. These three countries trail only the US in total GitHub developers. Meanwhile, the Philippines’ pool of AI developers surged 30% between 2022 and 2023.</p>
              <p>All four nations have strengthened infrastructure to support internet access and cross-border connectivity.</p>
              <p><strong>What can others learn from these overachievers?</strong></p>
              <p>A key factor setting them apart is strong investment in R&D and industrial capacity – helping them keep up with technological changes and even take the lead in certain sectors.</p>
              <p><strong>Key policy priorities</strong></p>
              <ul>
                <li>
                  <strong>Position strategically.</strong>
                  {' '}
                  Governments should assess national AI capacity – in infrastructure, data and skills – identify gaps and set priorities for action. Targeted catch-up strategies can guide progress towards long-term development goals.
                </li>
                <li>
                  <strong>Strengthen innovation systems.</strong>
                  {' '}
                  Countries can assess AI opportunities and challenges through technology foresight and evaluation, identifying ways to strengthen innovation systems. UNCTAD can support this through its technology assessments and STI Policy Reviews.
                </li>
                <li>
                  <strong>Align national policies.</strong>
                  {' '}
                  Coordinated action across government agencies and institutions – especially those in industry, education and science, technology and innovation – is key to shaping AI strategies that align with national goals.
                </li>
              </ul>
            </div>
          </div>
        </div>

        { /* Chapter 4 */ }
        <ScrollingText texts={['National strategies are key.', 'Developing countries must speed up.']} chapter_text="Chapter 4" />
        <div ref={fixedSectionRefFigure04} className="fixed-section">
          <div className={`fixed-background ${positionFigure04}`}>
            <div className="scroll-indicator"><div className="arrow" /></div>
            <div className="chart_container_full">
              <Figure04 ref={chartFigure04} setDataFirst={setFigure04DataFirst} setDataSecond={setFigure04DataSecond} />
            </div>
          </div>
          <div className="scroll-elements">
            <div className="scroll-content">
              <div>
                <p>
                  In 2017,
                  {' '}
                  <span style={{ color: '#ffc800' }}>only a few countries</span>
                  {' '}
                  had a national
                  {' '}
                  <span style={{ color: '#ffc800' }}>AI</span>
                  {' '}
                  strategy.
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  By 2023,
                  {' '}
                  <span style={{ color: '#ffc800' }}>two thirds of developed economies</span>
                  {' '}
                  had one.
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  Compared to just
                  {' '}
                  <span style={{ color: '#ffc800' }}>six least developed countries</span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content_container chapter_header_4">
          <div className="text_container">
            <ChapterHeader chapter_number="4" title="Designing national policies for AI" />
            <div className="download_buttons_container">
              <a href="/system/files/official-document/tir2025ch4_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download" aria-label="Download Chapter 4">Download</a>
            </div>
            <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/_image_04_.jpg" /></div></div>
            <div className="text_content">
              <h3>To be competitive in an AI-driven world, developing countries must rethink industrial policy. They should shift the focus to technology, innovation and knowledge-intensive services.</h3>
              <p>Developing countries must act quickly to set their AI strategies, aligning them with their own development goals. Simply following others’ paths may not meet their unique needs and priorities.</p>
              <p>Effective strategies require a whole-of-government approach, coordinating across agencies and institutions working on science, technology and innovation, as well as industry, education, infrastructure and trade.</p>
              <p><strong>National policies should prioritize the three AI leverage points.</strong></p>
              <ul>
                <li>
                  <strong>Infrastructure:</strong>
                  {' '}
                  Upgrade infrastructure to ensure equitable access to electricity, the internet and computing power. Encourage private investment and ensure interoperability across systems to support AI development.
                </li>
                <li>
                  <strong>Data:</strong>
                  {' '}
                  Promote open data and sharing to improve storage, access and collaboration. Ensure privacy, accountability and IP protections to balance innovation with human rights.
                </li>
                <li>
                  <strong>Skills:</strong>
                  {' '}
                  Build population-wide AI literacy by integrating STEM and AI into education from early schooling to lifelong learning. Foster academia–industry partnerships to develop talent aligned with industry needs.
                </li>
              </ul>
            </div>
          </div>
        </div>

        { /* Chapter 5 */ }
        <ScrollingText texts={['What about governance?', 'Who is deciding AI’s future?']} chapter_text="Chapter 5" />
        <div ref={fixedSectionRefFigure05} className="fixed-section">
          <div className={`fixed-background ${positionFigure05}`}>
            <div className="scroll-indicator"><div className="arrow" /></div>
            <div className="chart_container_full">
              <Figure05 ref={chartFigure05} setDataFirst={setFigure05DataFirst} setDataSecond={setFigure05DataSecond} setDataThird={setFigure05DataThird} />
            </div>
          </div>
          <div className="scroll-elements">
            <div className="scroll-content">
              <div>
                <p>
                  By 2024,
                  {' '}
                  <span style={{ color: '#ffc800' }}>only the G7 countries</span>
                  {' '}
                  were active in all seven major governance initiatives.
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  {' '}
                  <span style={{ color: '#ffc800' }}>75 countries</span>
                  {' '}
                  were involved in at least one.
                </p>
              </div>
            </div>
            <div className="scroll-content">
              <div>
                <p>
                  Meanwhile,
                  {' '}
                  <span style={{ color: '#ffc800' }}>118 nations</span>
                  {' '}
                  are not involved in any. Most are developing countries.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content_container chapter_header_5">
          <div className="text_container">
            <ChapterHeader chapter_number="5" title="Global collaboration for inclusive and equitable AI" />
            <div className="download_buttons_container">
              <a href="/system/files/official-document/tir2025ch5_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download" aria-label="Download Chapter 5">Download</a>
            </div>
            <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/_image_05_.jpg" /></div></div>
            <div className="text_content">
              <h3>AI is a borderless technology. While governments can regulate AI at the national level, global collaboration is essential to ensure it serves the public good.</h3>
              <p>Today, multinational tech giants dominate AI development – driven more by profit than public interest. Without oversight, there’s little incentive to align AI with global development goals.</p>
              <p>Governments and international institutions must act to ensure AI serves people and the planet.</p>
              <p>Collaboration must be inclusive. Yet global AI governance remains fragmented and led by a handful of wealthy nations. People in developing countries will be affected by AI but have little or no say in shaping its future. The lack of representation is alarming.</p>
              <p><strong>The United Nations is leading efforts to close this gap.</strong></p>
              <p>In 2025, UN Member States adopted the Pact for the Future and the Global Digital Compact, setting a series of commitments to enhance international AI governance for the benefit of humanity.</p>
              <p>UNCTAD advocates for multi-stakeholder cooperation to steer AI towards shared goals and values.</p>
              <h3>Key priorities for global collaboration</h3>
              <ul>
                <li>
                  <strong>Industry accountability framework.</strong>
                  {' '}
                  Companies using large-scale AI systems should disclose their impact, risks and decision-making processes – like environmental, social and governance (ESG) standards. AI certification could evolve from voluntary to mandatory, with enforcement mechanisms.
                </li>
                <li>
                  <strong>An inclusive approach.</strong>
                  {' '}
                  AI governance must balance innovation with public safety and trust. Policymakers must incorporate diverse voices, ensuring that AI policies protect vulnerable populations.
                </li>
                <li>
                  <strong>Shared digital infrastructure.</strong>
                  {' '}
                  Governments can collaborate with the private sector to develop public AI infrastructure. A global facility – modelled on how CERN was built as an international scientific research centre – could provide equitable access to AI infrastructure.
                </li>
                <li>
                  <strong>Open innovation.</strong>
                  {' '}
                  Open data and open-source models can unlock knowledge and resources, fuelling inclusive AI innovation. Interoperable, standards-based repositories can expand access and strengthen the global knowledge base through trusted, secure hubs.
                </li>
                <li>
                  <strong>A global AI hub.</strong>
                  {' '}
                  An AI-focused centre and network – modelled after the UN Climate Technology Centre and Network – could serve as a global hub for AI capacity-building, technology transfer, and technical assistance for developing countries.
                </li>
                <li>
                  <strong>South–South collaboration.</strong>
                  {' '}
                  Enhanced science and technology cooperation can help developing countries tackle common AI challenges. Trade agreements could include AI provisions, while regional institutions can promote best practices and help shape coherent strategies.
                </li>
              </ul>
              <br />
              <h3>AI’s future must be shaped by all – not just a few.</h3>
              <h3>Stronger global cooperation in AI can drive inclusive progress – rather than deepen inequalities.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
