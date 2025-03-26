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
// import Figure01 from './Figure01.jsx';
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
  const aboveSwitchPointFigureIntro = useRef(true);
  const fixedSectionRefFigureIntro = useRef(null);
  const chartFigureIntro = useRef(null);

  const handleScrollFigureIntro = useCallback(() => {
    fixedSectionRefFigureIntro.current.style.height = '650vh';
    const fixedTop = fixedSectionRefFigureIntro.current.offsetTop;
    const fixedBottom = fixedTop + fixedSectionRefFigureIntro.current.offsetHeight - window.innerHeight;
    const { scrollY } = window;
    const relativeScroll = scrollY - fixedTop;
    const switchPoint1 = window.innerHeight * 1.5;
    const switchPoint2 = window.innerHeight * 1.5 * 2;
    const switchPoint3 = window.innerHeight * 1.5 * 3;

    // Determine position state
    setPositionFigureIntro(
      scrollY < fixedTop ? 'absolute_top'
        : scrollY < fixedBottom ? 'fixed'
          : 'absolute_bottom'
    );

    if (!fixedSectionRefFigureIntro.current || !chartFigureIntro.current) return;
    // Define states for switch points
    const isAbove1 = relativeScroll < switchPoint1;
    const isAbove2 = relativeScroll < switchPoint2;
    const isAbove3 = relativeScroll < switchPoint3;

    // Store previous state to avoid unnecessary updates
    const prevState = aboveSwitchPointFigureIntro.current;
    const newState = { isAbove1, isAbove2 };

    if (prevState?.isAbove1 === isAbove1 && prevState?.isAbove2 === isAbove2 && prevState?.isAbove3 === isAbove3) return;

    if (chartFigureIntro.current) {
      aboveSwitchPointFigureIntro.current = newState;
    }
    setFigureIntroHighlight(!isAbove1 && isAbove2);
    if (isAbove2) {
      setFigureIntroData(19);
    } else if (isAbove3) {
      if (figureIntroData !== 50 && figureIntroData !== 100 && figureIntroData !== 150 && figureIntroData !== 200) {
        setFigureIntroData(19);
      }
    } else {
      setFigureIntroData(477);
    }
  }, [figureIntroData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFigureIntro);
    return () => window.removeEventListener('scroll', handleScrollFigureIntro);
  }, [handleScrollFigureIntro]);

  /** *********
  * FIGURE 1 *
  *********** */

  // const [figure01Data2023, setFigure01Data2023] = useState([]);
  // const [figure01Data2033, setFigure01Data2033] = useState([]);
  // const [positionFigure01, setPositionFigure01] = useState('');
  // const aboveSwitchPointFigure01 = useRef(true);
  // const fixedSectionRefFigure01 = useRef(null);
  // const chartFigure01 = useRef(null);

  // const handleScrollFigure01 = useCallback(() => {
  //   fixedSectionRefFigure01.current.style.height = '500vh';
  //   const fixedTop = fixedSectionRefFigure01.current.offsetTop;
  //   const fixedBottom = fixedTop + fixedSectionRefFigure01.current.offsetHeight - window.innerHeight;
  //   const { scrollY } = window;
  //   const relativeScroll = scrollY - fixedTop;
  //   const switchPoint = window.innerHeight * 1.5;

  //   // Determine position state
  //   setPositionFigure01(
  //     scrollY < fixedTop ? 'absolute_top'
  //       : scrollY < fixedBottom ? 'fixed'
  //         : 'absolute_bottom'
  //   );

  //   if (!fixedSectionRefFigure01.current) return;
  //   const isAbove = relativeScroll < switchPoint;
  //   if (aboveSwitchPointFigure01.current === isAbove) return;

  //   if (chartFigure01.current) {
  //     aboveSwitchPointFigure01.current = isAbove;
  //   }
  //   const newData = isAbove ? figure01Data2023 : figure01Data2033;
  // eslint-disable-next-line no-irregular-whitespace
  //   const newLabel = `${isAbove ? 'In 2023' : 'In 2033'}<tspan class="highcharts-br" dy="60" x="3">​</tspan><tspan style="font-weight: bold;">${isAbove ? '$2&nbsp;542' : '$16&nbsp;420'}</tspan>`;

  //   if (!chartFigure01.current) return;
  //   chartFigure01.current.series[0].setData(newData, false);
  //   chartFigure01.current.options.chart.custom.label.text.element.innerHTML = newLabel;
  //   chartFigure01.current.redraw();
  // }, [figure01Data2023, figure01Data2033]);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScrollFigure01);
  //   return () => window.removeEventListener('scroll', handleScrollFigure01);
  // }, [handleScrollFigure01]);

  /** *********
  * FIGURE 1 ALT *
  *********** */

  const figure01_data = useMemo(() => ({
    2023: [{
      fill: '#009edb',
      id: 1,
      name: 'Internet of things',
      percentage: 36,
      value: 925
    }, {
      fill: '#72bf44',
      id: 2,
      name: 'Electric vehicles',
      percentage: 15,
      value: 388
    }, {
      fill: '#ffc800',
      id: 3,
      name: 'Artificial intelligence',
      percentage: 7,
      value: 189
    }, {
      fill: '#e6efd0',
      id: 4,
      name: 'Solar photovoltaic',
      percentage: 6,
      value: 165
    }, {
      fill: '#aea29a',
      id: 5,
      name: 'Other',
      percentage: 34,
      value: 875
    }],
    2033: [{
      fill: '#009edb',
      id: 1,
      name: 'Internet of things',
      percentage: 19,
      value: 3141
    }, {
      fill: '#72bf44',
      id: 2,
      name: 'Electric vehicles',
      percentage: 9,
      value: 1401
    }, {
      fill: '#ffc800',
      id: 3,
      name: 'Artificial intelligence',
      percentage: 29,
      value: 4772
    }, {
      fill: '#c5dfef',
      id: 6,
      name: 'Blockchain',
      percentage: 14,
      value: 2350
    }, {
      fill: '#aea29a',
      id: 5,
      name: 'Other',
      percentage: 29,
      value: 4756
    }]
  }), []);
  const [figure01AltData, setFigure01AltData] = useState(figure01_data['2023']);
  const [positionFigure01Alt, setPositionFigure01Alt] = useState('');
  const aboveSwitchPointFigure01Alt = useRef(true);
  const fixedSectionRefFigure01Alt = useRef(null);
  const chartFigure01Alt = useRef(null);

  const handleScrollFigure01Alt = useCallback(() => {
    fixedSectionRefFigure01Alt.current.style.height = '650vh';
    const fixedTop = fixedSectionRefFigure01Alt.current.offsetTop;
    const fixedBottom = fixedTop + fixedSectionRefFigure01Alt.current.offsetHeight - window.innerHeight;
    const { scrollY } = window;
    const relativeScroll = scrollY - fixedTop;
    const switchPoint1 = window.innerHeight * 1.5;
    const switchPoint2 = window.innerHeight * 1.5 * 2;
    const switchPoint3 = window.innerHeight * 1.5 * 3;

    // Determine position state
    setPositionFigure01Alt(
      scrollY < fixedTop ? 'absolute_top'
        : scrollY < fixedBottom ? 'fixed'
          : 'absolute_bottom'
    );

    if (!fixedSectionRefFigure01Alt.current || !chartFigure01Alt.current) return;
    // Define states for switch points
    const isAbove1 = relativeScroll < switchPoint1;
    const isAbove2 = relativeScroll < switchPoint2;
    const isAbove3 = relativeScroll < switchPoint3;

    // Store previous state to avoid unnecessary updates
    const prevState = aboveSwitchPointFigure01Alt.current;
    const newState = { isAbove1, isAbove2 };

    if (prevState?.isAbove1 === isAbove1 && prevState?.isAbove2 === isAbove2 && prevState?.isAbove3 === isAbove3) return;

    if (chartFigure01Alt.current) {
      aboveSwitchPointFigure01Alt.current = newState;
    }
    if (isAbove2) {
      setFigure01AltData(figure01_data['2023']);
    } else {
      setFigure01AltData(figure01_data['2033']);
    }
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
    const switchPoint1 = window.innerHeight * 1.5;
    const switchPoint2 = window.innerHeight * 1.5 * 2;

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
    const step = window.innerHeight * 1.5;
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

    if (position > 7) {
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
    const switchPoint1 = window.innerHeight * 1.5;
    const switchPoint2 = window.innerHeight * 1.5 * 2;

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

    const newData = isAbove1 ? figure05DataFirst : figure05DataSecond;
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
    const paragraphs = document.querySelectorAll('.text_content p, .text_content ul, .text_content h3');

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
            <p><strong>Artificial Intelligence is the first technology that can make decisions and generate ideas, challenging the notion that technology is neutral.</strong></p>
            <p>
              <strong>AI can fast-track the Sustainable Development Goals (SDGs).</strong>
              {' '}
              It can power smart agriculture and energy grids, optimize production and supply chains improve water and city planning – and more. Case studies show AI’s potential to boost productivity and livelihoods – if backed by the right policies and skills.
            </p>
            <p><strong>But AI is evolving faster than governments can respond. Without the right oversight and fair access, it risks deepening global divides.</strong></p>
            <p>The Technology and Innovation Report 2025 helps policymakers navigate AI’s fast-changing landscape, outlining key priorities for AI’s three leverage points: infrastructure, data and skills. </p>
            <p><strong>Its message is clear: AI must put people first and be shaped through global cooperation, ensuring all countries have a say in its future.</strong></p>
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
      <div ref={fixedSectionRefFigureIntro} className="fixed-section">
        <div className={`fixed-background ${positionFigureIntro}`}>
          <div className="chart_container_full">
            <FigureIntro ref={chartFigureIntro} node_count={figureIntroData} highlight_bool={figureIntroHighlight} />
          </div>
        </div>
        <div className="scroll-elements">
          <div className="scroll-content">
            <div>
              <p>
                This is a representation of AI’s market value in 2023
                {' '}
                <span style={{ color: '#ffc800' }}>$189&nbsp;billion.</span>
              </p>
            </div>
          </div>
          <div className="scroll-content">
            <div>
              <p>
                Each dot  represents
                {' '}
                <span style={{ color: '#ffc800' }}>$10&nbsp;billion</span>
                .
              </p>
            </div>
          </div>
          <div className="scroll-content">
            <div>
              <p>
                How much will it be worth in
                {' '}
                <span style={{ color: '#ffc800' }}>2033</span>
                ?
              </p>
              <p>Take a quess.</p>
              <p>
                <button type="button" onClick={() => setFigureIntroData(50)}>
                  <span className="number">$500</span>
                  <br />
                  billion
                </button>
                <button type="button" onClick={() => setFigureIntroData(100)}>
                  <span className="number">$1</span>
                  <br />
                  trillion
                </button>
                <button type="button" onClick={() => setFigureIntroData(150)}>

                  <span className="number">$1.5</span>
                  <br />
                  trillion
                </button>
                <button type="button" onClick={() => setFigureIntroData(200)}>
                  <span className="number">$2</span>
                  <br />
                  trillion
                </button>
              </p>
            </div>
          </div>
          <div className="scroll-content">
            <div>
              <p>
                It’s even higher.
                {' '}
                <span style={{ color: '#ffc800' }}>AI</span>
                {' '}
                is projected to hit
                {' '}
                <span style={{ color: '#ffc800' }}>$4.5&nbsp;trillion</span>
                {' '}
                by 2033. That’s more than a 20-fold increase.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ScrollingText texts={['Let’s put that in perspective.', 'And see how AI fits…', '…in the overall tech market.']} />
      {/*      <div ref={fixedSectionRefFigure01} className="fixed-section">
        <div className={`fixed-background ${positionFigure01}`}>
          <div className="chart_container_full">
            <Figure01 ref={chartFigure01} setData2023={setFigure01Data2023} setData2033={setFigure01Data2033} />
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
                of the tech industry’s total value.
              </p>
            </div>
          </div>
          <div className="scroll-content">
            <div>
              <p>
                By
                {' '}
                <span style={{ color: '#ffc800' }}>2033</span>
                , its share could more than
                {' '}
                <span style={{ color: '#ffc800' }}>triple to 29%.</span>
              </p>
            </div>
          </div>
          <div className="scroll-content">
            <div>
              <p>Breakthroughs in AI are reshaping all industries – from content creation and product design to automated coding and customer service.</p>
            </div>
          </div>
        </div>
      </div> */}
      <div ref={fixedSectionRefFigure01Alt} className="fixed-section">
        <div className={`fixed-background ${positionFigure01Alt}`}>
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
                of the tech industry’s total value.
              </p>
            </div>
          </div>
          <div className="scroll-content">
            <div>
              <p>
                By 2033, its share could
                {' '}
                <span style={{ color: '#ffc800' }}>more than triple to 29%.</span>
              </p>
            </div>
          </div>
          <div className="scroll-content">
            <div />
          </div>
        </div>
      </div>
      {/* <ChapterHeaderAlt title="Chapter 1" /> */}
      <div className="content_container">
        <div className="text_container">
          <ChapterHeader chapter_number="1" title="AI at the technology frontier" />
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/l/chapter1-min.jpg" /></div></div>
          <div className="text_content">
            <p>
              <strong>Breakthroughs in AI are reshaping all industries</strong>
              {' '}
              – from content creation and product design to automated coding and customer service.
            </p>
            <p><strong>But AI development is highly concentrated.</strong></p>
            <p><strong>Just 100 companies funded 40% of AI research and development (R&D) in 2022.</strong></p>
            <p>Nearly half are in the United States. While 13% are in China, none are based in other developing countries.</p>
            <p><strong>This imbalance is also seen in AI infrastructure.</strong></p>
            <p>AI needs more than electricity and the internet. It requires computing power, servers and high-quality data to train algorithms.</p>
            <p><strong>The US holds one third of the top supercomputers and over half the world’s computating power. Most data centres are in developed countries.</strong></p>
            <p><strong>Skills are also key – from data literacy to expert-level AI knowledge.</strong></p>

          </div>
        </div>
      </div>

      { /* Chapter 2 */ }
      <div ref={fixedSectionRefFigure02} className="fixed-section">
        <div className={`fixed-background ${positionFigure02}`}>
          <div className="chart_container_full">
            <Figure02 ref={chartFigure02} setData={setFigure02Data} />
          </div>
        </div>
        <div className="scroll-elements">
          <div className="scroll-content"><div><p>AI is reshaping jobs worldwide.</p></div></div>
          <div className="scroll-content"><div><p>Advanced economies will feel the impact first.</p></div></div>
          <div className="scroll-content">
            <div>
              <p>But emerging and low-income countries aren’t far behind.</p>
              <p>The time to act is now.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content_container">
        <div className="text_container">
          <h2>Chapter 2: Leveraging AI for productivity and workers’ empowerment</h2>
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <p>Chapter 2 explores how AI is transforming work, boosting productivity, and reshaping labor markets. Unlike past technologies, AI can automate cognitive tasks, affecting 40% of global jobs. In advanced economies, one-third of jobs are at risk, while 27% could see AI enhance human work.</p>
          <p>AI’s full impact will take years to unfold, but early adopters—mainly in developed countries—are already seeing productivity gains. Whether developing economies can harness similar benefits depends on their ability to invest in infrastructure, data, and skills.</p>
          <p>To ensure AI empowers workers rather than replaces them, policymakers must navigate automation risks, accelerate AI adoption, and invest in reskilling and career development. With the right policies, AI can drive inclusive growth rather than deepen inequalities.</p>

          <div className="media_container"><div className="image_container"><img src="assets/img/l/chapter2-min.jpg" alt="" /></div></div>
          <p>Unlike past technological waves that mainly automated routine tasks, AI is transforming cognitive work, impacting a wide range of jobs, from content creation and coding to data analysis and professional services. Generative AI (GenAI) can write, design, and identify patterns, offering new opportunities for businesses and workers.</p>
          <p>Early research shows that firms using AI experience major productivity gains, especially in service industries and knowledge-based jobs. However, most studies focus on developed economies, and whether these benefits extend to developing countries remains unclear.</p>
          <h3>A transforming workforce</h3>
          <p>AI is set to affect 40% of global employment. In advanced economies, one-third of jobs are at risk of automation, while another 27% could see AI augment human work rather than replace it. Workers in high-income countries face greater exposure but also have more resources to adapt and benefit from AI. In lower-income economies, GenAI’s potential for worker augmentation could be even greater—helping increase productivity rather than eliminate jobs.</p>
          <p>History shows that AI’s full impact may take years or decades to materialize. Successful adoption requires investment in infrastructure, data, and skills. Case studies in agriculture, manufacturing, and healthcare demonstrate how AI can enhance productivity and improve livelihoods—provided countries develop complementary resources and policies.</p>
          <h3>Shaping AI for inclusive growth</h3>
          <p>AI can drive productivity gains and higher incomes for some, while displacing others, reshaping labor markets and shifting value towards capital. The right policies can ensure AI enhances, rather than replaces, human capabilities.</p>
          <p>Key policy priorities</p>
          <ul>
            <li>
              <strong>Navigating workforce shifts:</strong>
              {' '}
              Policymakers must balance automation, augmentation, and job creation to ensure AI benefits are widely shared.
            </li>
            <li>
              <strong>Accelerating AI adoption:</strong>
              {' '}
              Developing countries can lower barriers by using local infrastructure, alternative data sources, and simple AI interfaces while building partnerships for resources.
            </li>
            <li>
              <strong>Empowering workers:</strong>
              {' '}
              AI should support digital literacy, reskilling, and upskilling, ensuring workers play a role in shaping AI-driven workplaces.
            </li>
            <li>
              <strong>Strategic investment:</strong>
              {' '}
              Governments can fund R&D, leverage public procurement, and offer tax incentives to promote AI technologies that complement human work. Investing in career development pathways can also reduce the risk of brain drain.
            </li>
          </ul>
          <p>With the right approach, AI can become a tool for worker empowerment and economic inclusion, rather than a driver of inequality.</p>

        </div>
      </div>

      { /* Chapter 3 */ }
      <ChapterHeader chapter_number="3" title="chapter" />
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
          <div className="scroll-content">
            <div>
              <p>Let&apos;s take a look at how prepared countries are</p>
            </div>
          </div>
          <div className="scroll-content">
            <div>
              <p>We can divide the countries into four groups based on their status.</p>
              <ol>
                <li>Leaders</li>
                <li>Creators</li>
                <li>Practitioners</li>
                <li>Laggars</li>
              </ol>
            </div>
          </div>
          <div className="scroll-content">
            <div>
              <p>Developed countries are most categoried as Leaders.</p>
            </div>
          </div>
          <div className="scroll-content"><div><p>Least developed countries are most vulnerable.</p></div></div>
          <div className="scroll-content"><div><p>Developing ecomomies show potential.</p></div></div>
          <div className="scroll-content"><div><p>Let&apos;s look closer at China, Brazil, India and Philippines</p></div></div>
          <div className="scroll-content"><div><p>In this analysis the are categorised as practitioners and laggars.</p></div></div>
        </div>
      </div>
      <div className="content_container">
        <div className="text_container">
          <h2>Chapter 3: Preparing to seize AI opportunities</h2>
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <p>Chapter 3 examines how developing countries can position themselves to benefit from AI and other frontier technologies. UNCTAD’s Frontier Technologies Readiness Index ranks countries based on ICT deployment, skills, R&D, industrial capacity, and access to finance. While developed nations lead, Singapore (5th), China (21st), and India (36th) stand out among developing economies.</p>
          <p>AI readiness depends on three key factors: infrastructure, data, and skills. Some countries, like China, India, and Brazil, are leveraging large AI talent pools and data resources, while others are improving digital infrastructure and internet access.</p>

          <p>To catch up and compete, developing nations need strategic policies, investment in innovation, and stronger collaboration between governments and industry. With the right approach, AI can become a driver of inclusive growth rather than deepening global divides.</p>

          <div className="media_container"><div className="image_container"><img src="assets/img/l/chapter3-min.jpg" alt="" /></div></div>
          <p>As AI and other frontier technologies rapidly reshape the global economy, developing countries must act now to position themselves for success. AI-driven transformation is not just a possibility—it is already underway, influencing industries, economies, and societies worldwide.</p>
          <p>To measure how well countries are prepared to embrace these shifts, UNCTAD has developed the Frontier Technologies Readiness Index. This index assesses ICT deployment, skills, R&D activity, industrial capacity, and access to finance, providing a comprehensive snapshot of a country’s ability to adopt and benefit from frontier technologies.</p>
          <h3>Who is leading the race?</h3>
          <p>As expected, developed countries in Europe and North America top the rankings. However, some developing economies are making significant strides. Singapore ranks 5th, performing exceptionally well across all dimensions. China (21st), Russia (33rd), India (36th), Brazil (38th), and South Africa (52nd)—the BRICS economies—also demonstrate strong potential.</p>
          <p>While higher-income countries generally have a readiness advantage, some outperform expectations relative to their GDP, signaling untapped potential to leverage AI for growth and development. A key factor in these high-performing nations is their investment in R&D and industrial capacity, which enables them to keep pace with technological advancements and even take the lead in certain sectors.</p>
          <h3>Mapping AI readiness: Three leverage points</h3>
          <p>Beyond the broader index, AI adoption and development depend on three critical factors: infrastructure, data, and skills. Based on these dimensions, countries can be grouped into four readiness categories, from those lagging behind to emerging leaders.</p>
          <ul>
            <li>Infrastructure: Robust computing power, internet access, and data centers are essential for AI-driven innovation.</li>
            <li>Data: AI thrives on high-quality, diverse, and accessible datasets. Countries with affordable and abundant data—such as China—gain a strategic edge.</li>
            <li>Skills: AI adoption depends on education and a skilled workforce. The proportion of AI developers on platforms like GitHub provides an indicator of AI development capacity.</li>
          </ul>
          <p>While developed nations consistently rank higher, exceptions exist. Hong Kong (China) and Singapore outperform many developed countries, demonstrating that strategic investments can accelerate AI readiness.</p>
          <h3>Strategic positioning for AI-driven growth</h3>
          <p>Size matters in AI adoption. Large economies, such as the United States, India, and China, have lower proportions of AI developers per capita but a vast talent pool in absolute numbers. This gives them a unique advantage in scaling AI capabilities.</p>
          <p>Different countries will need different catch-up strategies:</p>
          <ul>
            <li>Some African and Southeast Asian nations have improved digital infrastructure to boost internet access and connectivity.</li>

            <li>China has leveraged its vast data resources to gain a competitive edge.</li>
            <li>India, China, and Brazil have cultivated large pools of AI developers, laying the groundwork for future growth.</li>
          </ul>
          <p>For developing nations, seizing AI opportunities requires more than just economic growth—it demands targeted policies, investments, and collaboration.</p>
          <p>Key Policy Priorities</p>
          <ul>
            <li>
              <strong>Strategic AI positioning.</strong>
              {' '}
              Governments must assess national AI capacities, pinpoint infrastructure, data, and skills gaps, and design catch-up strategies to accelerate development.
            </li>
            <li>
              <strong>Strengthening innovation ecosystems.</strong>
              {' '}
              Countries should conduct technology assessments and build resilient innovation systems. UNCTAD’s STI Policy Review Programme supports this process.
            </li>
            <li>
              <strong>Public-private collaboration.</strong>
              {' '}
              AI development requires coordinated action among governments, industry leaders, and research institutions to align AI strategies with national goals.
            </li>
          </ul>
          <p>With the right policies and investments, developing nations can close the AI gap and unlock opportunities for inclusive and sustainable growth.</p>
        </div>
      </div>

      { /* Chapter 4 */ }
      <ChapterHeader chapter_number="4" title="chapter" />
      <div ref={fixedSectionRefFigure04} className="fixed-section">
        <div className={`fixed-background ${positionFigure04}`}>
          <div className="chart_container_full">
            <Figure04 ref={chartFigure04} setData={setFigure04Data} />
          </div>
        </div>
        <div className="scroll-elements">
          <div className="scroll-content"><div><p>Jobs in all economies are affected by artificial intelligence.</p></div></div>
          <div className="scroll-content"><div><p>But jobs in developed economies are the to get hit.</p></div></div>
          <div className="scroll-content">
            <div>
              <p>But developing economies are not far behind.</p>
              <p>And therefore now is the time to take action.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content_container">
        <div className="text_container">
          <h2>Chapter 4: Designing national policies for AI</h2>
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <p>Chapter 4 explores how developing countries can shape AI policies to drive innovation, competitiveness, and inclusive growth. While most AI strategies originate from developed economies, developing nations must design policies that fit their unique needs, rather than simply following global trends.</p>
          <p>AI policies must balance adoption and development. Adoption policies support AI integration in businesses and workforce upskilling, while development policies focus on building infrastructure, data ecosystems, and AI talent.</p>
          <p>To succeed, AI strategies must address three key areas:</p>
          <ul>
            <li>
              <strong>Infrastructure:</strong>
              {' '}
              Expanding digital access, computing power, and AI-ready networks.
            </li>
            <li>
              <strong>Data:</strong>
              {' '}
              Promoting open data, interoperability, and privacy protections.
            </li>
            <li>
              <strong>Skills:</strong>
              {' '}
              Strengthening AI education, workforce training, and industry-academia collaboration.
            </li>
          </ul>
          <p>A whole-of-government approach is needed to align AI with national development goals, integrating industry, education and regulatory policies. With strategic planning and investment, developing countries can harness AI for economic transformation and global competitiveness.</p>

          <div className="media_container"><div className="image_container"><img src="assets/img/l/chapter4-min.jpg" alt="" /></div></div>
          <p>As digital technologies transform economies, developing countries must rethink industrial policies to stay competitive in an AI-driven world. The focus is shifting toward technology, innovation, and knowledge-intensive services, requiring policies that support AI adoption while fostering long-term development.</p>
          <p>Since 2010, industrial policies worldwide have increasingly prioritized science, technology, and innovation (STI). R&D spending has grown, especially in advanced economies, where the private sector leads investments, but governments are also expanding support. AI policies now play a crucial role in guiding technological transformation, addressing market failures, and shaping the direction of innovation.</p>
          <h3>The AI policy divide</h3>
          <p>AI strategies remain heavily concentrated in developed economies. By the end of 2023, two-thirds of developed countries had a national AI strategy, compared to just six least developed countries (LDCs). This gap leaves developing nations vulnerable to policy spillovers from major economies, limiting their ability to shape AI to fit national priorities and development goals.</p>
          <p>To compete, developing countries must craft AI policies that reflect their specific needs rather than simply following global trends. AI adoption policies should encourage businesses to integrate AI solutions and invest in worker upskilling. Meanwhile, AI development policies must focus on infrastructure, data ecosystems, and high-level technical skills to keep pace with global innovation.</p>
          <h3>Balancing AI adoption and development</h3>
          <p>For many developing countries, AI adoption is the most immediate priority, as it requires fewer resources and delivers faster economic gains. However, long-term success depends on investing in AI development, ensuring countries don’t remain consumers of AI but also creators of innovation.</p>
          <p>Strategic AI policies should be built around three key leverage points:</p>
          <ul>
            <li>
              <strong>Infrastructure:</strong>
              {' '}
              Equitable access to electricity, the internet, and computing power is essential for AI adoption. Governments should incentivize private investment in digital infrastructure while ensuring interoperability and harmonization of AI systems.
            </li>
            <li>
              <strong>Data:</strong>
              {' '}
              Open data and data-sharing policies can boost AI adoption, enhance collaboration, and drive innovation. Countries must also ensure privacy, accountability, and intellectual property protections to balance innovation with human rights.
            </li>
            <li>
              <strong>Skills:</strong>
              {' '}
              AI literacy must be integrated into education from early schooling to workforce training. Academia and private sector partnerships can help develop AI talent tailored to industry needs, strengthening national AI capabilities.
            </li>
          </ul>
          <h3>A new approach to AI governance</h3>
          <ul>
            <li>
              <strong>Rethinking industrial policies.</strong>
              {' '}
              As value shifts toward knowledge-based services, policymakers must support AI adoption, development, and knowledge dissemination to drive long-term growth.
            </li>
            <li>
              <strong>A whole-of-government strategy:</strong>
              {' '}
              AI policies must go beyond tax incentives, incorporating regulation, consumer protection, digital platform oversight, and data governance. Effective AI strategies require coordination across STI, industry, education, infrastructure, and trade policies.
            </li>
          </ul>
          <p>With AI reshaping economies at an unprecedented pace, countries that proactively design AI policies tailored to their development goals will be better positioned to harness AI’s benefits, mitigate risks, and drive inclusive growth.</p>
        </div>
      </div>

      { /* Chapter 5 */ }
      <ChapterHeader chapter_number="5" title="chapter" />
      <div ref={fixedSectionRefFigure05} className="fixed-section">
        <div className={`fixed-background ${positionFigure05}`}>
          <div className="chart_container_full">
            <Figure05 ref={chartFigure05} setDataFirst={setFigure05DataFirst} setDataSecond={setFigure05DataSecond} />
          </div>
        </div>
        <div className="scroll-elements">
          <div className="scroll-content"><div><p>75 countrie are part of at least one.</p></div></div>
          <div className="scroll-content full"><div><p>118 countries countries, primarily in the global South, are not parties to any of the sampled initiatives or instruments.</p></div></div>
          <div className="scroll-content">
            <div>
              <p>And this is a huge.</p>
              <p>Problem.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content_container">
        <div className="text_container">
          <h2>Chapter 5: Global collaboration for inclusive and equitable AI</h2>
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <p>Chapter 5 highlights the need for international cooperation to ensure AI remains a public good that benefits all, not just a select few. While national policies can regulate AI, its cross-border nature demands global governance to prevent widening inequalities.</p>
          <p>Currently, AI development is concentrated in a few multinational tech giants, and global governance remains fragmented. By 2024, 118 countries—mostly in the Global South—were excluded from major AI governance initiatives, limiting their ability to shape AI’s future.</p>
          <p>To close this gap, stronger global cooperation is needed, including:</p>
          <ul>
            <li>
              <strong>Industry accountability.</strong>
              {' '}
              Requiring AI companies to disclose risks and impacts, similar to ESG standards.
            </li>
            <li>
              <strong>Public AI infrastructure.</strong>
              {' '}
              Governments and private sectors collaborating to expand access to AI resources.
            </li>
            <li>
              <strong>Open innovation.</strong>
              {' '}
              Encouraging open-source AI and shared data platforms for greater inclusivity.
            </li>
            <li>
              <strong>A global AI hub.</strong>
              {' '}
              A UN-backed center to support AI capacity-building and policy coordination.
            </li>
            <li>
              <strong>South–South cooperation.</strong>
              {' '}
              Developing nations collaborating on AI technology, policies, and trade agreements.
            </li>
          </ul>
          <p>With a more inclusive AI governance framework, AI can drive global progress rather than deepen inequalities.</p>

          <div className="media_container"><div className="image_container"><img src="assets/img/l/chapter5-min.jpg" alt="" /></div></div>
          <p>AI is a borderless technology, with its impacts reaching far beyond national policies. While governments can regulate AI at the national level, global collaboration is essential to ensure that AI remains a public good—accessible, equitable, and beneficial for all. Without coordinated efforts, AI risks becoming a tool of inequality, controlled by a few powerful corporations and countries.</p>
          <h3>The global AI governance gap</h3>
          <p>Currently, AI development is dominated by multinational tech giants, whose priorities are driven by profit rather than public interest. Without external oversight, there is little incentive for businesses to align AI with broader societal goals. Governments and international institutions must step in to guide AI development, ensuring it serves humanity rather than deepening inequalities.</p>
          <p>Despite the growing urgency, global AI governance remains fragmented. By the end of 2024, only G7 countries participated in all major AI governance initiatives, while 118 nations—mostly from the Global South—were left out. This lack of representation is alarming, as developing countries are key users of AI but have little say in shaping its future.</p>
          <p>The United Nations has been at the forefront of efforts to bridge this governance gap. In 2024, the General Assembly passed two key resolutions to promote safe, secure, and trustworthy AI for sustainable development and to strengthen global AI cooperation. The Pact for the Future further emphasizes the need for international collaboration, committing to a Global Dialogue on AI Governance and the creation of an Independent International Scientific Panel on AI.</p>
          <h3>From principles to action: Rethinking AI governance</h3>
          <p>Global discussions on AI governance have shifted from setting ethical principles to managing AI-related risks. Governments are now demanding greater industry accountability, requiring companies to ensure transparency, safety, and fairness across the AI lifecycle. However, for these commitments to have real impact, common standards and enforcement mechanisms must be established.</p>
          <p>Key policy priorities for global AI collaboration</p>
          <ul>
            <li>
              <strong>Industry accountability framework.</strong>
              {' '}
              Companies deploying large-scale AI systems should disclose their impact, risks, and decision-making processes, similar to environmental, social, and governance (ESG) standards. AI certification could evolve from voluntary to mandatory, backed by enforcement measures.
            </li>
            <li>
              <strong>A multi-stakeholder approach.</strong>
              {' '}
              AI governance must balance innovation with public safety and trust. Policymakers must incorporate diverse voices, ensuring that AI policies protect vulnerable populations and promote inclusive development.
            </li>
            <li>
              <strong>Shared digital public infrastructure.</strong>
              {' '}
              Governments can collaborate with the private sector to develop public AI infrastructure, modeled after CERN, to provide equitable access to AI resources.
            </li>
            <li>
              <strong>Open Innovation for Inclusive AI.</strong>
              {' '}
              Open-source AI, shared data platforms, and interoperable knowledge hubs can democratize AI development, making AI more accessible to developing nations.
            </li>
            <li>
              <strong>A global AI hub.</strong>
              {' '}
              A United Nations-backed AI center, similar to the Climate Technology Centre and Network, could serve as a global hub for AI capacity-building, technology transfer, and technical assistance.
            </li>
            <li>
              <strong>South–south AI collaboration.</strong>
              {' '}
              Strengthening cooperation among developing nations can accelerate AI innovation and policy coordination. Regional trade agreements could include AI provisions, while regional institutions help develop coherent AI strategies.
            </li>
          </ul>
          <p>
            AI’s future should not be dictated by a handful of corporations or countries. A truly global approach is needed—one that ensures all nations have a voice in shaping AI’s development and impact. With stronger collaboration, AI can be a force for progress, rather than a driver of inequality.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
