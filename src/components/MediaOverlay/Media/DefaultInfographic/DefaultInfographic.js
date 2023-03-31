import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const DefaultInfographic = ({ filename, title }) => {
  const ref = useRef();

  useEffect(() => {
    const infographicContainer = ref.current;

    let script;

    if (infographicContainer) {
      script = document.createElement('script');

      script.setAttribute('id', filename);
      script.setAttribute('src', 'https://e.infogram.com/js/dist/embed.js?Itp');
      script.setAttribute('title', title);

      infographicContainer.appendChild(script);
    }

    return () => {
      infographicContainer?.removeChild(script);
    };
  }, [filename, ref, title]);

  return (
    <div ref={ref} />
  );
};

DefaultInfographic.propTypes = {
  filename: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

DefaultInfographic.defaultProps = {};

export default DefaultInfographic;
