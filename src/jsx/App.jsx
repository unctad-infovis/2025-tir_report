import React, {
  useRef, useState, useEffect, useCallback
} from 'react';
import '../styles/styles.less';

// https://www.npmjs.com/package/react-is-visible
// import 'intersection-observer';
// import IsVisible from 'react-is-visible';

import scrollIntoView from 'scroll-into-view';
// import DwChartContainer from './components/DwChartContainer.jsx';
import ShareContainer from './components/ShareContainer.jsx';

import Figure01 from './Figure01.jsx';
import Figure02 from './Figure02.jsx';
import Figure03 from './Figure03.jsx';
import ChapterHeader from './components/ChapterHeader.jsx';

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

  const [figure01Data2023, setFigure01Data2023] = useState([]);
  const [figure01Data2033, setFigure01Data2033] = useState([]);
  const [positionFigure01, setPositionFigure01] = useState('');
  const aboveSwitchPointFigure01 = useRef(true);
  const fixedSectionRefFigure01 = useRef(null);
  const chartFigure01 = useRef(null);

  /** ************************************
  * FIGURE 1
  ************************************* */

  const handleScrollFigure01 = useCallback(() => {
    fixedSectionRefFigure01.current.style.height = '400vh';
    const fixedTop = fixedSectionRefFigure01.current.offsetTop;
    const fixedBottom = fixedTop + fixedSectionRefFigure01.current.offsetHeight - window.innerHeight;
    const { scrollY } = window;
    const relativeScroll = scrollY - fixedTop;
    const switchPoint = window.innerHeight;

    // Determine position state
    setPositionFigure01(
      scrollY < fixedTop ? 'absolute_top'
        : scrollY < fixedBottom ? 'fixed'
          : 'absolute_bottom'
    );

    if (!fixedSectionRefFigure01.current) return;
    const isAbove = relativeScroll < switchPoint;
    if (aboveSwitchPointFigure01.current === isAbove) return;

    aboveSwitchPointFigure01.current = isAbove;
    const newData = isAbove ? figure01Data2023 : figure01Data2033;
    // eslint-disable-next-line
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

  /** ************************************
  * FIGURE 2
  ************************************* */

  const [figure02Data, setFigure02Data] = useState([]);
  const [positionFigure02, setPositionFigure02] = useState('absolute_bottom');
  const aboveSwitchPointFigure02 = useRef({ isAbove1: false, isAbove2: false });
  const fixedSectionRefFigure02 = useRef(null);
  const chartFigure02 = useRef(null);

  const handleScrollFigure02 = useCallback(() => {
    fixedSectionRefFigure02.current.style.height = '350vh';
    const fixedTop = fixedSectionRefFigure02.current.offsetTop;
    const fixedBottom = fixedTop + fixedSectionRefFigure02.current.offsetHeight - window.innerHeight;
    const { scrollY } = window;
    const relativeScroll = scrollY - fixedTop;
    const switchPoint1 = window.innerHeight;
    const switchPoint2 = window.innerHeight * 2;

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

    aboveSwitchPointFigure02.current = newState;

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

  /** ************************************
  * FIGURE 3
  ************************************* */

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
    fixedSectionRefFigure03.current.style.height = '850vh';
    const fixedTop = fixedSectionRefFigure03.current.offsetTop;
    const sectionHeight = fixedSectionRefFigure03.current.offsetHeight;
    const fixedBottom = fixedTop + sectionHeight - window.innerHeight;

    const { scrollY } = window;

    // Define 6 evenly spaced switch points based on the section height
    const step = window.innerHeight;
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
    aboveSwitchPointFigure03.current = newData;

    // Update chart data
    if (!chartFigure03.current) return;
    const newDataCopy = structuredClone(newData);
    chartFigure03.current.series.forEach((series, index) => {
      series.setData(newDataCopy[index].data, false);
    });

    chartFigure03.current.xAxis[0].update({
      plotLines: [{
        color: '#999999',
        dashStyle: 'dash',
        value: 2.7,
        width: (position > 1 && position < 8) ? 1 : 0,
      }]
    }, false);
    chartFigure03.current.yAxis[0].update({
      plotLines: [{
        color: '#999999',
        dashStyle: 'dash',
        value: 18.5,
        width: (position > 1 && position < 8) ? 1 : 0,
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
              ['The macro-economics of discontent', 'The illusion of a rebound', 'Globalization at an inflection point', 'Rise, retreat and repositioning: Lessons from the Global South', 'The Global South and new international tax architecture'].map((chapter_title, i) => (
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
          <p>The Technology and Innovation Report 2025 highlights AI’s rapid growth and its impact on economies, industries, and societies. It explores AI-driven advancements in productivity, decision-making, and automation while addressing the risks of inequality, job displacement, and ethical concerns.</p>
          <p>The report examines emerging AI trends, regulatory challenges, and opportunities for sustainable development. It provides insights for policymakers and industry leaders on harnessing AI responsibly to drive innovation while ensuring inclusivity and economic stability.</p>
          <p>It examines five core themes:</p>
          <ul>
            <li>AI and Economic Growth</li>
            <li>Workforce and Automation</li>
            <li>Ethics and Governance</li>
            <li>AI for Sustainable Development</li>
            <li>Global AI Divide</li>
          </ul>
          <blockquote>
            <div className="quote">AI is reshaping economies and societies—our challenge is to harness its power for inclusive and sustainable development.</div>
            <div className="author">
              <span className="name">Rebeca Grynspan</span>
              <span className="title">Secretary-General of UN Trade and Development (UNCTAD)</span>
            </div>
          </blockquote>
        </div>
      </div>

      <ChapterHeader title="Chapter 1" />
      <div ref={fixedSectionRefFigure01} className="fixed-section">
        <div className={`fixed-background ${positionFigure01}`}>
          <div className="chart_container_full">
            <Figure01 ref={chartFigure01} setData2023={setFigure01Data2023} setData2033={setFigure01Data2033} />
          </div>
        </div>
        <div className="scroll-elements">
          <div className="scroll-content">
            <div>
              <p>
                With intruction of chatGPT, year 2023 was the year of
                {' '}
                <span style={{ color: '#0077b8' }}>artificial intelligence</span>
                .
              </p>
            </div>
          </div>
          <div className="scroll-content">
            <div>
              <p>
                But by 2033
                {' '}
                <span style={{ color: '#0077b8' }}>artificial intelligence</span>
                {' '}
                we foresee that the industry will be a $4.5 trillion business.
              </p>
            </div>
          </div>
          <div className="scroll-content">
            <div>
              <h3>What does that mean…</h3>
              <p>to goverments?</p>
              <p>to companies</p>
              <p>to you?</p>
            </div>
          </div>
        </div>
      </div>

      { /* Chapter 1 */ }
      <div className="content_container">
        <div className="text_container">
          <h2>1: The Rise of AI and Global Economic Shifts</h2>
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <p>The first chapter of the Technology and Innovation Report 2025 examines how artificial intelligence (AI) is reshaping global economies. AI-driven automation is boosting productivity, streamlining industries, and transforming sectors such as healthcare, finance, and manufacturing. While these advancements promise economic growth, they also create disparities between nations that can leverage AI and those that lack the infrastructure and skills to do so. The chapter highlights the urgent need for policies that ensure AI benefits are widely shared, preventing a deepening of the global digital divide.</p>
          <div className="media_container"><div className="image_container"><img src="/assets/img/image5.png" alt="" /></div></div>
          <p>Additionally, the chapter explores how AI is shifting labor markets, with both job displacement and the creation of new roles requiring digital expertise. Countries that invest in education, innovation, and AI-friendly regulatory frameworks stand to gain significantly, while others risk economic stagnation. The report emphasizes that global cooperation is essential to managing AI’s disruptive effects and ensuring that technological progress leads to sustainable and inclusive development.</p>
        </div>
      </div>

      <ChapterHeader title="Chapter 2" />
      <div ref={fixedSectionRefFigure02} className="fixed-section">
        <div className={`fixed-background ${positionFigure02}`}>
          <div className="chart_container_full">
            <Figure02 ref={chartFigure02} setData={setFigure02Data} />
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

      { /* Chapter 2 */ }
      <div className="content_container">
        <div className="text_container">
          <h2>2: The Fall of AI and Local Economic Shifts</h2>
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <p>The second chapter of the Technology and Innovation Report 2025 examines how artificial intelligence (AI) is reshaping global economies. AI-driven automation is boosting productivity, streamlining industries, and transforming sectors such as healthcare, finance, and manufacturing. While these advancements promise economic growth, they also create disparities between nations that can leverage AI and those that lack the infrastructure and skills to do so. The chapter highlights the urgent need for policies that ensure AI benefits are widely shared, preventing a deepening of the global digital divide.</p>
          <div className="media_container"><div className="image_container"><img src="/assets/img/image5.png" alt="" /></div></div>
          <p>Additionally, the chapter explores how AI is shifting labor markets, with both job displacement and the creation of new roles requiring digital expertise. Countries that invest in education, innovation, and AI-friendly regulatory frameworks stand to gain significantly, while others risk economic stagnation. The report emphasizes that global cooperation is essential to managing AI’s disruptive effects and ensuring that technological progress leads to sustainable and inclusive development.</p>
        </div>
      </div>

      <ChapterHeader title="Chapter 3" />
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

      { /* Chapter 3 */ }
      <div className="content_container">
        <div className="text_container">
          <h2>3: The Death of AI and Local Economic Shifts</h2>
          <div className="download_buttons_container">
            <a href="/system/files/official-document/tdr2024ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="pdf_download">Download</a>
          </div>
          <p>The second chapter of the Technology and Innovation Report 2025 examines how artificial intelligence (AI) is reshaping global economies. AI-driven automation is boosting productivity, streamlining industries, and transforming sectors such as healthcare, finance, and manufacturing. While these advancements promise economic growth, they also create disparities between nations that can leverage AI and those that lack the infrastructure and skills to do so. The chapter highlights the urgent need for policies that ensure AI benefits are widely shared, preventing a deepening of the global digital divide.</p>
          <div className="media_container"><div className="image_container"><img src="/assets/img/image5.png" alt="" /></div></div>
          <p>Additionally, the chapter explores how AI is shifting labor markets, with both job displacement and the creation of new roles requiring digital expertise. Countries that invest in education, innovation, and AI-friendly regulatory frameworks stand to gain significantly, while others risk economic stagnation. The report emphasizes that global cooperation is essential to managing AI’s disruptive effects and ensuring that technological progress leads to sustainable and inclusive development.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
