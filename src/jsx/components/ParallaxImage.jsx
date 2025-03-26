import React, { useRef } from 'react';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

import PropTypes from 'prop-types';

function ChapterHeader(props) {
  const { src } = props;
  const imageRef = useRef(null);

  const isVisible = useIsVisible(imageRef, { once: true });

  return (
    <div className="parallax-container" style={{ top: (isVisible) ? '0px' : '20px' }}>
      <img ref={imageRef} src={src} alt="Parallax" className="parallax-image" />
    </div>
  );
}

ChapterHeader.propTypes = {
  src: PropTypes.string.isRequired,
};

export default ChapterHeader;
