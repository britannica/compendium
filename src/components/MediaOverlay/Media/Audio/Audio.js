
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Audio.scss';

const Audio = ({ audioSrc }) => (
  <div className={styles.AudioMedia}>
    <audio controls src={audioSrc} controlsList="nodownload" />
  </div>
);

Audio.propTypes = {
  audioSrc: PropTypes.string.isRequired,
};

export default Audio;
