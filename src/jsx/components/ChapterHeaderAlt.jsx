import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

function ChapterHeader(props) {
  const { title } = props;
  const headerRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const rect = headerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const triggerPoint = windowHeight * 0.5;

      const visibility = Math.min(Math.max((windowHeight - rect.top) / (windowHeight - triggerPoint), 0), 1);

      setScrollPercentage(visibility);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={headerRef} className="chapter_header_alt">
      <div className="content" style={{ fontSize: `${Math.max(20, scrollPercentage * 100)}px` }}>
        <div className="title">{title}</div>
      </div>
    </div>
  );
}

ChapterHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default ChapterHeader;
