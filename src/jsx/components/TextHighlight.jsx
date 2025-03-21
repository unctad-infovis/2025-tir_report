import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

function ChapterHeader(props) {
  const { text } = props;
  const headerRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const rect = headerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const triggerPoint = windowHeight * 0.7;

      const visibility = Math.min(Math.max((windowHeight - rect.top) / (windowHeight - triggerPoint), 0), 1);

      setScrollPercentage(visibility);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={headerRef}>
      <div className="content" style={{ opacity: scrollPercentage, transform: `translateX(${(1 - scrollPercentage) * -40}%)` }}>
        <p className="big">{text}</p>
      </div>
    </div>
  );
}

ChapterHeader.propTypes = {
  text: PropTypes.string.isRequired
};

export default ChapterHeader;
