import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function ScrollingText({ texts }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress starts from 0 when the element enters the screen
        let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        progress = Math.max(0, Math.min(1, progress)); // Clamp value between 0 and 1

        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scrolling-text-container" ref={containerRef}>
      {texts.map((text, index) => {
        const baseOffset = 100 * (index + 1); // Increase initial offset
        const translateX = baseOffset - scrollProgress * 400; // Increase movement range
        let opacity = 1;
        if (translateX > 30) {
          opacity = (1 - (translateX * 1.2 - 30) / 100);
        } else if (translateX < 0) {
          opacity = (1 + (translateX * 1.2) / 100);
        }
        return (
          <div
            key={text}
            className="scrolling-text"
            style={{
              transform: `translateX(${translateX}%)`,
              opacity,
            }}
          >
            <p>
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

ScrollingText.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ScrollingText;
