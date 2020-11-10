import React from 'react';
import PropTypes from 'prop-types';
import styles from './DefaultAudio.module.scss';

const DefaultAudio = ({ filename }) => (
  <div className={styles.AudioMedia}>
    <audio controls src={filename} controlsList="nodownload" />
  </div>
);

DefaultAudio.propTypes = {
  filename: PropTypes.string.isRequired,
};

export default DefaultAudio;
