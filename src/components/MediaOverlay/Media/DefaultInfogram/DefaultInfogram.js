import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './DefaultInfogram.module.scss';

const DefaultInfogram = ({ filename, title }) => {
  const ref = useRef();

  useEffect(() => {
    const infographicContainer = ref.current;

    let script;

    console.log('infogram mount', filename, title, infographicContainer);

    if (infographicContainer) {
      console.log('infogram if condition', filename, title, infographicContainer);
      script = document.createElement('script');

      script.setAttribute('id', filename);
      script.setAttribute('src', 'https://e.infogram.com/js/dist/embed.js?Itp');
      script.setAttribute('title', title);

      infographicContainer.appendChild(script);
    }

    return () => {
      console.log('infogram unmount', filename, title, infographicContainer, script);
      infographicContainer?.removeChild(script);
    };
  }, [filename, ref, title]);

  return (
    <div data-title={title} ref={ref} className={styles.DefaultInfogram} />
  );
};

DefaultInfogram.propTypes = {
  filename: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

DefaultInfogram.defaultProps = {};

export default DefaultInfogram;
