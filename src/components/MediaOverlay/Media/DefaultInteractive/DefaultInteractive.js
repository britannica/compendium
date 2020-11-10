import React from 'react';
import PropTypes from 'prop-types';
import styles from './DefaultInteractive.module.scss';

const DefaultInteractive = ({ filename, height, width, titleText }) => (
  <div className={styles.InteractiveMedia} style={{ paddingBottom: `${(height / width) * 100}%` }}>
    <iframe src={filename} title={titleText} scrolling="no" style={{ overflow: 'hidden' }} />
  </div>
);

DefaultInteractive.propTypes = {
  filename: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  titleText: PropTypes.string,
};

DefaultInteractive.defaultProps = {
  titleText: 'Interactive Media',
};

export default DefaultInteractive;
