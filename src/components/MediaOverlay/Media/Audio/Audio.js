import React from 'react';
import PropTypes from 'prop-types';
import styles from './Audio.module.scss';

const Audio = ({ filename }) => (
  <div className={styles.AudioMedia}>
    <audio controls src={filename} controlsList="nodownload" />
  </div>
);

Audio.propTypes = {
  filename: PropTypes.string.isRequired,
};

export default Audio;
