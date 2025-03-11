import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

function ChapterHeader({ title }) {
  const headerRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const rect = headerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Adjust animation to complete when 30% of the element is inside the screen
      const triggerPoint = windowHeight * 0.7; // 30% of screen height

      // Normalize visibility (0 when offscreen, 1 when 30% inside viewport)
      const visibility = Math.min(Math.max((windowHeight - rect.top) / (windowHeight - triggerPoint), 0), 1);

      setScrollPercentage(visibility);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={headerRef} className="chapter_header">
      <div
        className="content"
        style={{
          transform: `translateX(${(1 - scrollPercentage) * -10}%)`,
          opacity: scrollPercentage
        }}
      >
        {title}
      </div>
    </div>
  );
}

ChapterHeader.propTypes = {
  title: PropTypes.string.isRequired, // Ensure it's a function and required
};

export default ChapterHeader;
