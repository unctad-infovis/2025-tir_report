import React, { /* useEffect , useState, useRef */ } from 'react';
import '../styles/styles.less';

function Footer() {
  return (
    <div className="app" id="app_footer">
      <div className="footer_container hidden">
        <h2>What do you want to do next?</h2>
        <div className="footer_elements">
          <div className="footer_element footer_element_1">
            <div className="footer_content anchor_videos" id="anchor_videos">
              <h3>Watch the videos</h3>
              <div className="iframe_container youtube_iframe hidden">
                <iframe src="https://www.youtube.com/embed/y_eM0gxqNgc" title="Economic Development in Africa Report" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <ul className="hidden">
                <li>
                  <a href="https://youtu.be/mXCK_71vr_I" target="_blank" rel="noreferrer">Français</a>
                  {', '}
                  <a href="https://youtu.be/nApgf893uWQ" target="_blank" rel="noreferrer">Español</a>
                  {', '}
                  <a href="https://youtu.be/M2bTL-a4rEA" target="_blank" rel="noreferrer">العربية</a>
                  {', '}
                  <a href="https://youtu.be/NrlwxKkuemE" target="_blank" rel="noreferrer">简体中文</a>
                  {', '}
                  <a href="https://youtu.be/j0DHIromsJU" target="_blank" rel="noreferrer">Русский</a>
                  {', '}
                  <a href="https://youtu.be/JCtJ9c7ipR4" target="_blank" rel="noreferrer">Português</a>
                  {', '}
                  <a href="https://youtu.be/jL2wO77vY4Q" target="_blank" rel="noreferrer">Kiswahili</a>
                  {', '}
                  <a href="https://youtu.be/AqiC3sWq3nM" target="_blank" rel="noreferrer">Urdu اردو</a>
                  {', '}
                  <a href="https://youtu.be/BXZPFTZReyw" target="_blank" rel="noreferrer">Hindi हिंदी</a>
                </li>
              </ul>
              <h4>Download the report video</h4>
              <ul className="hidden">
                <li>
                  <a href="https://trello.com/1/cards/6787838c3f19ce98f5a67697/attachments/67aa64e7acb906748a17eac7/download/edar-EN.mp4" target="_blank" rel="noreferrer">English</a>
                  {', '}
                  <a href="https://trello.com/1/cards/6787838c3f19ce98f5a67697/attachments/67aa650992f40aed797d7c28/download/edar-FR.mp4" target="_blank" rel="noreferrer">Français</a>
                  {', '}
                  <a href="https://trello.com/1/cards/6787838c3f19ce98f5a67697/attachments/67aa64f018ead7786770fd03/download/edar-ES.mp4" target="_blank" rel="noreferrer">Español</a>
                  {', '}
                  <a href="https://trello.com/1/cards/6787838c3f19ce98f5a67697/attachments/67aa64c448408b267f583f05/download/edar-AR.mp4" target="_blank" rel="noreferrer">العربية</a>
                  {', '}
                  <a href="https://trello.com/1/cards/6787838c3f19ce98f5a67697/attachments/67aa64ccc44aa11856f5b8de/download/edar-CH.mp4" target="_blank" rel="noreferrer">简体中文</a>
                  {', '}
                  <a href="https://trello.com/1/cards/6787838c3f19ce98f5a67697/attachments/67aa652324b8dfa109a09e06/download/edar-RU.mp4" target="_blank" rel="noreferrer">Русский</a>
                  {', '}
                  <a href="https://trello.com/1/cards/6787838c3f19ce98f5a67697/attachments/67aa651a313c6236558ef7c3/download/edar-PO.mp4" target="_blank" rel="noreferrer">Português</a>
                  {', '}
                  <a href="https://trello.com/1/cards/6787838c3f19ce98f5a67697/attachments/67aa652da683e368e8464a3c/download/edar-SW.mp4" target="_blank" rel="noreferrer">Kiswahili</a>
                  {', '}
                  <a href="https://trello.com/1/cards/6787838c3f19ce98f5a67697/attachments/67aa6536a89a4aeb05403be8/download/edar-UR.mp4" target="_blank" rel="noreferrer">Urdu اردو</a>
                  {', '}
                  <a href="https://trello.com/1/cards/6787838c3f19ce98f5a67697/attachments/67aa65127710537e9cc3206a/download/edar-HI.mp4" target="_blank" rel="noreferrer">Hindi हिंदी</a>
                </li>
              </ul>
              {/* <h4>Watch the press conference</h4>
              <div className="iframe_container youtube_iframe">
                <iframe src="https://www.youtube.com/embed/" title="Economic Development in Africa Report press conference" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div> */}
              <h4>Media assets</h4>
              <ul className="hidden">
                {/* <li>
                    <a href="#download" target="_blank" rel="noreferrer">Press conference</a>
                  </li> */}
                <li>
                  <a href="https://www.flickr.com/photos/unctad/albums/72177720323742073/" target="_blank" rel="noreferrer">Photos</a>
                </li>
                {/* <li>
                    <a href="#download" target="_blank" rel="noreferrer">Audio and other assets</a>
                  </li> */}
              </ul>
            </div>
            <div className="footer_content anchor_podcasts" id="anchor_podcasts">
              <h3>Podcast</h3>
              <p>Listen to the Weekly Tradecast episode that explore some of the main issues in the report</p>
              <div className="iframe_container hidden">
                <iframe title="131. UN report: Unlocking Africa’s trade potential" height="150" width="100%" style={{ border: 'none', minWidth: 'min(100%, 430px)' }} scrolling="no" data-name="pb-iframe-player" src="https://www.podbean.com/player-v2/?i=e79c8-17eacbf-pb&btn-skin=009EDB&download=1&font-color=000000&fonts=Verdana&from=pb6admin&logo_link=none&rtl=0&share=1&size=240&skin=ffffff" allowFullScreen />
                <span className="text"><a href="/podcast/un-report-unlocking-africas-trade-potential">UN report: Unlocking Africa’s trade potential</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
