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
import Figure01 from './Figure01.jsx';
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
    if (!fixedSectionRefFigureIntro.current || !chartFigureIntro.current) return;

    // 4 screens.
    fixedSectionRefFigureIntro.current.style.height = '600vh';
    const { offsetTop, offsetHeight } = fixedSectionRefFigureIntro.current;
    const { scrollY, innerHeight } = window;

    const fixedBottom = offsetTop + offsetHeight - innerHeight;
    const relativeScroll = scrollY - offsetTop;

    // Determine position state
    setPositionFigureIntro(scrollY < offsetTop ? 'absolute_top' : scrollY < fixedBottom ? 'fixed' : 'absolute_bottom');

    // Define switch points
    const switchPoints = [innerHeight * 1, innerHeight * 2.3, innerHeight * 3.6];

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

    setFigureIntroData(newState.isAbove2 ? 19 : newState.isAbove3 && ![80, 210, 477].includes(figureIntroData) ? 19 : 477);
  }, [figureIntroData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigureIntro);
    return () => window.removeEventListener('scroll', handleScrollFigureIntro);
  }, [handleScrollFigureIntro]);

  /** *********
  * FIGURE 1 *
  *********** */
  const [figure01Data2023, setFigure01Data2023] = useState([]);
  const [figure01Data2033, setFigure01Data2033] = useState([]);
  const [positionFigure01, setPositionFigure01] = useState('');
  const aboveSwitchPointFigure01 = useRef(true);
  const fixedSectionRefFigure01 = useRef(null);
  const chartFigure01 = useRef(null);

  const handleScrollFigure01 = useCallback(() => {
    fixedSectionRefFigure01.current.style.height = '500vh';
    const fixedTop = fixedSectionRefFigure01.current.offsetTop;
    const fixedBottom = fixedTop + fixedSectionRefFigure01.current.offsetHeight - window.innerHeight;
    const { scrollY } = window;
    const relativeScroll = scrollY - fixedTop;
    const switchPoint = window.innerHeight * 1.5;

    // Determine position state
    setPositionFigure01(scrollY < fixedTop ? 'absolute_top' : scrollY < fixedBottom ? 'fixed' : 'absolute_bottom');

    if (!fixedSectionRefFigure01.current) return;
    const isAbove = relativeScroll < switchPoint;
    if (aboveSwitchPointFigure01.current === isAbove) return;

    if (chartFigure01.current) {
      aboveSwitchPointFigure01.current = isAbove;
    }
    const newData = isAbove ? figure01Data2023 : figure01Data2033;
    // eslint-disable-next-line no-irregular-whitespace
    const newLabel = `${isAbove ? 'In 2023' : 'In 2033'}<tspan class="highcharts-br" dy="60" x="3">​</tspan><tspan style="font-weight: bold;">${isAbove ? '$2&nbsp;542' : '$16&nbsp;420'}</tspan>`;

    if (!chartFigure01.current) return;
    chartFigure01.current.series[0].setData(newData, false);
    chartFigure01.current.options.chart.custom.label.text.element.innerHTML = newLabel;
    chartFigure01.current.redraw();
  }, [figure01Data2023, figure01Data2033]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure01);
    return () => window.removeEventListener('scroll', handleScrollFigure01);
  }, [handleScrollFigure01]);

  /** *********
  * FIGURE 1 ALT *
  *********** */
  const figure01_data = useMemo(() => ({
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

  const [figure01AltData, setFigure01AltData] = useState(figure01_data[2023]);
  const [positionFigure01Alt, setPositionFigure01Alt] = useState('');
  const aboveSwitchPointFigure01Alt = useRef({});
  const fixedSectionRefFigure01Alt = useRef(null);
  const chartFigure01Alt = useRef(null);

  const handleScrollFigure01Alt = useCallback(() => {
    const fixedElement = fixedSectionRefFigure01Alt.current;
    const chartElement = chartFigure01Alt.current;

    if (!fixedElement || !chartElement) return;

    fixedElement.style.height = '480vh';

    const { scrollY, innerHeight } = window;
    const fixedTop = fixedElement.offsetTop;
    const fixedBottom = fixedTop + fixedElement.offsetHeight - innerHeight;
    const relativeScroll = scrollY - fixedTop;
    const switchPoints = [innerHeight * 1, innerHeight * 2.3];

    // Determine fixed position state
    setPositionFigure01Alt(
      scrollY < fixedTop ? 'absolute_top'
        : scrollY < fixedBottom ? 'fixed' : 'absolute_bottom'
    );

    const isAbove1 = relativeScroll < switchPoints[0];
    const isAbove2 = relativeScroll < switchPoints[1];

    if (isAbove1) {
      fixedSectionRefFigure01Alt.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
      fixedSectionRefFigure01Alt.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    const prevState = aboveSwitchPointFigure01Alt.current;
    if (prevState.isAbove1 === isAbove1 && prevState.isAbove2 === isAbove2) return;

    aboveSwitchPointFigure01Alt.current = { isAbove1, isAbove2 };
    setFigure01AltData(isAbove2 ? figure01_data[2023] : figure01_data[2033]);
  }, [figure01_data]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure01Alt);
    return () => window.removeEventListener('scroll', handleScrollFigure01Alt);
  }, [handleScrollFigure01Alt]);

  /** *********
  * FIGURE 2 *
  *********** */
  const [figure02Data, setFigure02Data] = useState([]);
  const [positionFigure02, setPositionFigure02] = useState('absolute_bottom');
  const aboveSwitchPointFigure02 = useRef({ isAbove1: false, isAbove2: false });
  const fixedSectionRefFigure02 = useRef(null);
  const chartFigure02 = useRef(null);

  const handleScrollFigure02 = useCallback(() => {
    fixedSectionRefFigure02.current.style.height = '500vh';
    const fixedTop = fixedSectionRefFigure02.current.offsetTop;
    const fixedBottom = fixedTop + fixedSectionRefFigure02.current.offsetHeight - window.innerHeight;
    const { scrollY } = window;
    const relativeScroll = scrollY - fixedTop;
    const switchPoint1 = window.innerHeight;
    const switchPoint2 = window.innerHeight * 2.3;

    // Determine position state
    setPositionFigure02(
      scrollY < fixedTop ? 'absolute_top'
        : scrollY < fixedBottom ? 'fixed'
          : 'absolute_bottom'
    );

    if (!fixedSectionRefFigure02.current || !chartFigure02.current) return;
    // Define states for switch points
    const isAbove1 = relativeScroll < switchPoint1;
    const isAbove2 = relativeScroll < switchPoint2;

    // Store previous state to avoid unnecessary updates
    const prevState = aboveSwitchPointFigure02.current;
    const newState = { isAbove1, isAbove2 };

    if (prevState?.isAbove1 === isAbove1 && prevState?.isAbove2 === isAbove2) return;

    if (chartFigure02.current) {
      aboveSwitchPointFigure02.current = newState;
    }

    console.log(isAbove1);
    if (isAbove1) {
      fixedSectionRefFigure02.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
      fixedSectionRefFigure02.current.querySelector('.fixed-background .overlay').style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    if (!figure02Data) return;

    let newColors = ['#009edb', '#009edb', '#009edb'];

    if (!isAbove1) {
      chartFigure02.current.update({
        plotOptions: { bar: { animation: { duration: 0 } } }
      });
      newColors = isAbove2 ? ['#fbaf17', '#009edb', '#009edb'] : ['#009edb', '#fbaf17', '#fbaf17'];
    }
    chartFigure02.current.update({
      plotOptions: { bar: { colors: newColors } }
    });
  }, [figure02Data]);

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
  const aboveSwitchPointFigure03 = useRef(true);
  const fixedSectionRefFigure03 = useRef(null);
  const chartFigure03 = useRef(null);

  const handleScrollFigure03 = useCallback(() => {
    fixedSectionRefFigure03.current.style.height = '1250vh';
    const fixedTop = fixedSectionRefFigure03.current.offsetTop;
    const sectionHeight = fixedSectionRefFigure03.current.offsetHeight;
    const fixedBottom = fixedTop + sectionHeight - window.innerHeight;

    const { scrollY } = window;

    // Define 6 evenly spaced switch points based on the section height
    const step = window.innerHeight * 1.3;
    const switchPoint1 = fixedTop + step;
    const switchPoint2 = fixedTop + step * 2;
    const switchPoint3 = fixedTop + step * 3;
    const switchPoint4 = fixedTop + step * 4;
    const switchPoint5 = fixedTop + step * 5;
    const switchPoint6 = fixedTop + step * 6;
    const switchPoint7 = fixedTop + step * 7;

    // Determine position state
    let newPosition;
    if (scrollY < fixedTop) {
      newPosition = 'absolute_top';
    } else if (scrollY >= fixedBottom) {
      newPosition = 'absolute_bottom';
    } else {
      newPosition = 'fixed';
    }

    setPositionFigure03((prev) => (prev !== newPosition ? newPosition : prev));

    // Determine data stage
    let newData;
    let position = false;
    if (scrollY < switchPoint1) {
      position = 1;
      newData = figure03DataStage1;
    } else if (scrollY < switchPoint2) {
      position = 2;
      newData = figure03DataStage2;
    } else if (scrollY < switchPoint3) {
      position = 3;
      newData = figure03DataStage3;
    } else if (scrollY < switchPoint4) {
      position = 4;
      newData = figure03DataStage4;
    } else if (scrollY < switchPoint5) {
      position = 5;
      newData = figure03DataStage5;
    } else if (scrollY < switchPoint6) {
      position = 6;
      newData = figure03DataStage6;
    } else if (scrollY < switchPoint7) {
      position = 7;
      newData = figure03DataStage7;
    } else {
      position = 8;
      newData = figure03DataStage8;
    }

    if (aboveSwitchPointFigure03.current === newData) return;

    if (chartFigure03.current) {
      aboveSwitchPointFigure03.current = newData;
    }

    // Update chart data
    if (!chartFigure03.current) return;
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
      }]
    }, false);

    if (position > 6) {
      chartFigure03.current.series[3].setVisible(true, false);
      chartFigure03.current.xAxis[0].update({
        max: 5.2,
        min: 2.95,
        tickInterval: 0.5,
        title: {
          enabled: true,
          text: 'Gross domestic product per capita‚ PPP'
        }
      });
      chartFigure03.current.yAxis[0].update({
        max: 1.05,
        min: 0,
        tickInterval: 0.2,
        title: {
          enabled: true,
          text: 'Index'
        }
      });
    } else {
      chartFigure03.current.series[3].setVisible(false, false);
      chartFigure03.current.xAxis[0].update({
        max: 10,
        min: 0,
        tickInterval: 2,
        title: {
          enabled: true,
          text: 'Share of developers compared to working age population'
        }
      });
      chartFigure03.current.yAxis[0].update({
        max: 60,
        min: 0,
        tickInterval: 20,
        title: {
          enabled: true,
          text: 'Share of working age population with advanced degree'
        }
      });
    }

    chartFigure03.current.redraw();
  }, [
    figure03DataStage1,
    figure03DataStage2,
    figure03DataStage3,
    figure03DataStage4,
    figure03DataStage5,
    figure03DataStage6,
    figure03DataStage7,
    figure03DataStage8
  ]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure03);
    return () => window.removeEventListener('scroll', handleScrollFigure03);
  }, [handleScrollFigure03]);

  /** *********
  * FIGURE 4 *
  *********** */

  const [figure04Data, setFigure04Data] = useState([]);
  const [positionFigure04, setPositionFigure04] = useState('absolute_bottom');
  const aboveSwitchPointFigure04 = useRef({ isAbove1: false, isAbove2: false });
  const fixedSectionRefFigure04 = useRef(null);
  const chartFigure04 = useRef(null);

  const handleScrollFigure04 = useCallback(() => {
    fixedSectionRefFigure04.current.style.height = '500vh';
    const fixedTop = fixedSectionRefFigure04.current.offsetTop;
    const fixedBottom = fixedTop + fixedSectionRefFigure04.current.offsetHeight - window.innerHeight;
    const { scrollY } = window;
    const relativeScroll = scrollY - fixedTop;
    const switchPoint1 = window.innerHeight * 1.5;
    const switchPoint2 = window.innerHeight * 1.5 * 2;

    // Determine position state
    setPositionFigure04(
      scrollY < fixedTop ? 'absolute_top'
        : scrollY < fixedBottom ? 'fixed'
          : 'absolute_bottom'
    );

    if (!fixedSectionRefFigure04.current || !chartFigure04.current) return;
    // Define states for switch points
    const isAbove1 = relativeScroll < switchPoint1;
    const isAbove2 = relativeScroll < switchPoint2;

    // Store previous state to avoid unnecessary updates
    const prevState = aboveSwitchPointFigure04.current;
    const newState = { isAbove1, isAbove2 };

    if (prevState?.isAbove1 === isAbove1 && prevState?.isAbove2 === isAbove2) return;

    aboveSwitchPointFigure04.current = newState;

    if (!figure04Data) return;

    if (!isAbove1) {
      chartFigure04.current.update({
      });
    }
    chartFigure04.current.update({
    });
  }, [figure04Data]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure04);
    return () => window.removeEventListener('scroll', handleScrollFigure04);
  }, [handleScrollFigure04]);

  /** *********
  * FIGURE 5 *
  *********** */

  const [figure05DataFirst, setFigure05DataFirst] = useState([]);
  const [figure05DataSecond, setFigure05DataSecond] = useState([]);
  const [positionFigure05, setPositionFigure05] = useState('absolute_bottom');
  const aboveSwitchPointFigure05 = useRef({ isAbove1: false, isAbove2: false });
  const fixedSectionRefFigure05 = useRef(null);
  const chartFigure05 = useRef(null);

  const handleScrollFigure05 = useCallback(() => {
    fixedSectionRefFigure05.current.style.height = '500vh';
    const fixedTop = fixedSectionRefFigure05.current.offsetTop;
    const fixedBottom = fixedTop + fixedSectionRefFigure05.current.offsetHeight - window.innerHeight;
    const { scrollY } = window;
    const relativeScroll = scrollY - fixedTop;
    const switchPoint1 = window.innerHeight * 1.3;
    const switchPoint2 = window.innerHeight * 1.3 * 2;

    // Determine position state
    setPositionFigure05(
      scrollY < fixedTop ? 'absolute_top'
        : scrollY < fixedBottom ? 'fixed'
          : 'absolute_bottom'
    );

    if (!fixedSectionRefFigure05.current || !chartFigure05.current) return;
    // Define states for switch points
    const isAbove1 = relativeScroll < switchPoint1;
    const isAbove2 = relativeScroll < switchPoint2;

    // Store previous state to avoid unnecessary updates
    const prevState = aboveSwitchPointFigure05.current;
    const newState = { isAbove1, isAbove2 };

    if (prevState?.isAbove1 === isAbove1 && prevState?.isAbove2 === isAbove2) return;

    if (chartFigure05.current) {
      aboveSwitchPointFigure05.current = newState;
    }

    const newData = isAbove2 ? figure05DataFirst : figure05DataSecond;
    // eslint-disable-next-line

    if (!chartFigure05.current) return;
    const newDataCopy = structuredClone(newData);
    chartFigure05.current.series[0].setData(newDataCopy, false);

    chartFigure05.current.redraw();
  }, [figure05DataFirst, figure05DataSecond]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigure05);
    return () => window.removeEventListener('scroll', handleScrollFigure05);
  }, [handleScrollFigure05]);

  const scrollTo = useCallback((target, name) => {
    track('Button', name);
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
  }, [track]);

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      if (hash === '#chapter1' || hash === '#chapter2' || hash === '#chapter3' || hash === '#chapter4' || hash === '#chapter5') {
        const chapter_number = hash.slice(-1);
        scrollTo(`.chapter_header_${chapter_number}`, `To chapter ${chapter_number}`);
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
  const handleClick = (button, index) => {
    setFigureIntroData(button.value);
    setSelectedButton(index);
  };

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
            Inclusive Artificial Intelligence for development
            <div className="share_wrapper"><ShareContainer url={window.location.href} /></div>
          </h2>
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tir2024overview_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="overview">Overview</a>
            <a href="/system/files/official-document/tir2024_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Full report</a>
          </div>
          <div className="chapters_navigation_container">
            {
              ['AI at the technology frontier', 'Leveraging AI for productivity and workers’ empowerment', 'Preparing to seize AI opportunities', 'Designing national policies for AI', 'Global collaboration for inclusive and equitable AI'].map((chapter_title, i) => (
                <button onClick={() => scrollTo(`.chapter_header_${i + 1}`, `To chapter ${i + 1}`)} type="button" key={chapter_title}>
                  <div className="chapter_navigation">
                    <div className="chapter_title"><h2>{chapter_title}</h2></div>
                    <div className="chapter_image"><div className={`chapter_image_${i + 1}`} /></div>
                    <div className="chapter_meta">
                      <div className="chapter_number">
                        {i + 1}
                        .
                      </div>
                      <a href={`/system/files/official-document/tir2024ch${i + 1}_en.pdf`} target="_blank" onClick={(event) => downloadDocument(event)} className="chapter_download_button" aria-label="Download" rel="noreferrer" />
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
            <p>The Technology and Innovation Report 2025 calls for AI that puts people first and is shaped through global cooperation in which all countries have a say. It outlines key policy priorities for the three key leverage points: infrastructure, data and skills.</p>
            <blockquote>
              {/* <img src="assets/img/rebeca_grynspan.png" className="sg_photo" alt="Rebeca Grynspan" /> */}
              <div className="quote">“History has shown that while technological progress drives economic growth, it does not on its own ensure equitable income distribution or promote inclusive human development.”</div>
              <div className="author">
                <span className="name">Rebeca Grynspan</span>
                <span className="title">Secretary-General of UN Trade and Development (UNCTAD)</span>
              </div>
            </blockquote>
          </div>
        </div>
      </div>

      { /* Chapter 1 */ }
      <ScrollingText texts={['Just how fast is AI’s market growing?']} chapter_text="" />
      <div ref={fixedSectionRefFigureIntro} className="fixed-section">
        <div className={`fixed-background ${positionFigureIntro}`}>
          <div className="overlay" />
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
                <span style={{ color: '#ffc800' }}>$189&nbsp;billion.</span>
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
              <div>
                {[{ value: 80, label: '$800', unit: 'billion' },
                  { value: 210, label: '$2.1', unit: 'trillion' },
                  { value: 477, label: '$4.8', unit: 'trillion' }].map((button, index) => (
                    <button key={button.label} type="button" className={`${selectedButton === index ? 'selected' : ''} guess_button`} onClick={() => handleClick(button, index)}>
                      <div className="number">{button.label}</div>
                      <div>{button.unit}</div>
                    </button>
                ))}
              </div>
              <div><button type="button" className="skip_button" onClick={() => scrollTo('.scroll-content-skip')}>Skip</button></div>
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
      <ScrollingText texts={['Let’s put that in perspective.', 'How will AI’s share of the tech market change?']} chapter_text="Chapter 1" />
      <div ref={fixedSectionRefFigure01} className="fixed-section" style={{ display: 'none' }}>
        <div className={`fixed-background ${positionFigure01}`}>
          <div className="chart_container_full">
            <Figure01 ref={chartFigure01} setData2023={setFigure01Data2023} setData2033={setFigure01Data2033} />
          </div>
        </div>
        <div className="scroll-elements">
          <div className="scroll-content">
            <div>
              <p>
                Global tech market in 2023
              </p>
              <p>$2.542 trillion</p>
              <p>In 2023, AI made up 7% of the global tech market.</p>
              <p>By 2033, its share could triple to 29% – propelling it to the top.</p>
            </div>
          </div>
          <div className="scroll-content" />
          <div className="scroll-content" />
        </div>
      </div>
      <div ref={fixedSectionRefFigure01Alt} className="fixed-section">
        <div className={`fixed-background ${positionFigure01Alt}`}>
          <div className="overlay" />
          <div className="chart_container_full">
            <Figure01Alt ref={chartFigure01Alt} chart_data={figure01AltData} />
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
                of the global tech market.
              </p>
              <p>
                By 2033, its
                {' '}
                <span style={{ color: '#ffc800' }}>29%</span>
                {' '}
                – propelling it to the top.
              </p>
            </div>
          </div>
          <div className="scroll-content"><div><p /></div></div>
          <div className="scroll-content"><div><p /></div></div>
        </div>
      </div>
      <div className="content_container chapter_header_1">
        <div className="text_container">
          <ChapterHeader chapter_number="1" title="AI at the technology frontier" />
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/_image_05_.jpg" /></div></div>
          <div className="text_content">
            <h3>Breakthroughs in AI are reshaping all industries – from content creation and product design to automated coding and customer service.</h3>
            <p>But AI development is highly concentrated. Just 100 companies funded 40% of AI research and development (R&D) in 2022 – nearly half in the United States and 13% in China. 0% are based in other developing countries.</p>
            <p>This imbalance is also seen in AI infrastructure. AI needs more than electricity and the internet. It requires computing power, servers and high-quality data to train algorithms.</p>
            <p>The US holds one third of the top supercomputers and over half the world’s computing power. Most data centres are in developed countries.</p>
            <p>Skills are also key – from data literacy to expert-level AI knowledge. But these skills are unevenly distributed.</p>
          </div>
        </div>
      </div>

      { /* Chapter 2 */ }
      <ScrollingText texts={['AI is reshaping how we work.', 'How will it affect jobs in different countries?']} chapter_text="Chapter 2" />
      <div ref={fixedSectionRefFigure02} className="fixed-section">
        <div className={`fixed-background ${positionFigure02}`}>
          <div className="overlay" />
          <div className="chart_container_full">
            <Figure02 ref={chartFigure02} setData={setFigure02Data} />
          </div>
        </div>
        <div className="scroll-elements">
          <div className="scroll-content"><div><p>AI can automate cognitive tasks like writing, coding and data analysis.</p></div></div>
          <div className="scroll-content"><div><p>Up to one third of jobs in advanced economies are exposed.</p></div></div>
          <div className="scroll-content"><div><p>But the exposure is not limited to advanced economies.</p></div></div>
        </div>
      </div>
      <div className="content_container">
        <div className="text_container">
          <ChapterHeader chapter_number="2" title="Leveraging AI for productivity and workers’ empowerment" />
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/_image_04_.jpg" /></div></div>
          <div className="text_content">
            <h3>AI could affect 40% of jobs worldwide.</h3>
            <p>But it’s not all about potential job loss.</p>
            <p>In advanced economies, 27% of jobs could be enhanced by AI – boosting human skills rather than replacing workers.</p>
            <p>Generative AI can unlock major productivity gains – especially in services and knowledge work.</p>
            <p>Whether developing economies can harness the benefits depends on their ability to invest in infrastructure, data and skills.</p>
            <p><strong>Key policy priorities</strong></p>
            <ul>
              <li>
                <strong>Understand workforce dynamics.</strong>
                {' '}
                AI’s impact depends on a complex mix of automation, augmentation and new job creation. Policymakers must grasp these dynamics to ensure fair distribution of benefits and smooth transitions.
              </li>
              <li>
                <strong>Accelerate AI adoption by workers.</strong>
                {' '}
                Developing countries can speed up AI use by adapting solutions to local infrastructure, using alternative data sources, simplifying interfaces and building strategic partnerships to access key resources.
              </li>
              <li>
                <strong>Empower workers.</strong>
                {' '}
                Inclusive AI must centre on people. That means promoting digital literacy, supporting reskilling and upskilling, and involving workers in designing AI tools for their jobs.
              </li>
              <li>
                <strong>Leverage financial tools.</strong>
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
          <div className="scroll-content"><div><p>This graph shows how ready countries are.</p></div></div>
          <div className="scroll-content"><div><p>Countries are ranked as a laggard, practitioner, creator or leader, based on the AI-related skills.</p></div></div>
          <div className="scroll-content"><div><p>Most developed countries are leaders.</p></div></div>
          <div className="scroll-content"><div><p>Least developed countries lag furthest behind.</p></div></div>
          <div className="scroll-content"><div><p>Developing countries are most spread across all categories.</p></div></div>
          <div className="scroll-content"><div><p>But let’s zoom in on four countries.</p></div></div>
          <div className="scroll-content"><div><p>This is how they rank in UNCTAD’s Frontier Technologies Readiness Index.</p></div></div>
          <div className="scroll-content"><div><p>High-income countries are generally more prepared.</p></div></div>
          <div className="scroll-content"><div><p>But Brazil, China, India and the Philippines punch above their economic weight. </p></div></div>
        </div>
      </div>
      <div className="content_container">
        <div className="text_container">
          <ChapterHeader chapter_number="3" title="Preparing to seize AI opportunities" />
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/_image_03_.jpg" /></div></div>
          <div className="text_content">
            <h3>Advanced economies have a larger talent pool of workers with advanced degrees and coding skills – giving them a head start and edge in scaling AI.</h3>
            <p>But Brazil, China, India and the Philippines outperforming expectations based on GDP, showing strong potential to harness AI for development.</p>
            <p>What can others learn from these overachievers?</p>
            <p>A key factor that has set them apart is strong investment in R&D and industrial capacity. This has helped them keep up with technological advancements – and even take the lead in certain sectors.</p>

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
                <strong>Collaborate with stakeholders.</strong>
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
          <div className="chart_container_full">
            <Figure04 ref={chartFigure04} setData={setFigure04Data} />
          </div>
        </div>
        <div className="scroll-elements">
          <div className="scroll-content"><div><p>In 2017, only a few countries had a national AI strategy.</p></div></div>
          <div className="scroll-content"><div><p>But by 2023, two thirds of developed economies had one.</p></div></div>
          <div className="scroll-content"><div><p>Compared to just six least developed countries.</p></div></div>
        </div>
      </div>
      <div className="content_container">
        <div className="text_container">
          <ChapterHeader chapter_number="4" title="Designing national policies for AI" />
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/_image_02_.jpg" /></div></div>
          <div className="text_content">
            <h3>To be competitive in an AI-driven world, developing countries must rethink industrial policy. They should shift the focus to technology, innovation and knowledge-intensive services.</h3>
            <p>But most still lag behind in designing national AI strategies, leaving them vulnerable to policy spillovers from major economies.</p>
            <p>Effective strategies require a whole-of-government approach, coordinating across agencies and institutions working on science, technology and innovation, as well as industry, education, infrastructure and trade.</p>
            <p><strong>National policies should prioritize the three AI leverage points.</strong></p>
            <ul>
              <li>
                <strong>Infrastructure:</strong>
                {' '}
                Upgrade infrastructure to ensure equitable access to electricity, internet and computing power. Encourage private investment and ensure interoperability across systems to support AI development.
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
      <ScrollingText texts={['What about governance?', 'Who is deciding AI’s future?']} chapter_text="Chapter 4" />
      <div ref={fixedSectionRefFigure05} className="fixed-section">
        <div className={`fixed-background ${positionFigure05}`}>
          <div className="chart_container_full">
            <Figure05 ref={chartFigure05} setDataFirst={setFigure05DataFirst} setDataSecond={setFigure05DataSecond} />
          </div>
        </div>
        <div className="scroll-elements">
          <div className="scroll-content"><div><p>By 2024, only the G7 countries were active in all seven major AI governance efforts.</p></div></div>
          <div className="scroll-content"><div><p>75 countries were involved in at least one.</p></div></div>
          <div className="scroll-content">
            <div>
              <p>Meanwhile, 118 nations are not involved in any. Most of them are developing countries</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content_container">
        <div className="text_container">
          <ChapterHeader chapter_number="5" title="Global collaboration for inclusive and equitable AI" />
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/_image_01_.jpg" /></div></div>
          <div className="text_content">
            <h3>AI is a borderless technology.</h3>
            <p>While governments can regulate AI at the national level, global collaboration is essential to ensure it serves the public good. </p>
            <p>Today, multinational tech giants dominate AI development – driven more by profit than public interest. Without oversight, there’s little incentive to align AI with global development goals.</p>
            <p>Governments and international institutions must act to ensure AI serves people and the planet.</p>
            <p>But collaboration must be inclusive. People in developing countries are major users of AI, but they have little or no voice in shaping its future.</p>
            <p>The United Nations is leading efforts to close this gap.</p>
            <p>In 2024, the UN General Assembly passed two key resolutions to promote safe, secure and trustworthy AI and to strengthen global AI cooperation. It calls for a Global Dialogue on AI Governance and a new Independent International Scientific Panel on AI.</p>
            <p>But such commitments require common standards and enforcement mechanisms.</p>
            <p><strong>Key priorities for global collaboration</strong></p>
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
                <strong>Shared public digital infrastructure.</strong>
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
            <h3>AI’s future must be shaped by all nations – not just a few.</h3>
            <h3>With stronger global cooperation, AI can drive inclusive progress – not inequality.</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
