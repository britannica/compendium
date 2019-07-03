import React from 'react';
import PropTypes from 'prop-types';
import styles from './Interactive.module.scss';

const Interactive = ({ filename, height, width, titleText }) => (
  <div className={styles.InteractiveMedia} style={{ paddingBottom: `${(height / width) * 100}%` }}>
    <iframe src={filename} title={titleText} scrolling="no" style={{ overflow: 'hidden' }} />
  </div>
);

Interactive.propTypes = {
  filename: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  titleText: PropTypes.string,
};

Interactive.defaultProps = {
  titleText: 'Interactive Media',
};

export default Interactive;
