
import { faVolume } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import './Audio.scss';

const Audio = ({ audioSrc }) => (
  <div className="AudioMedia">
    {/*<FontAwesomeIcon icon={faVolume} size="4x" className="mb-20" />*/}
    <audio controls src={audioSrc} controlsList="nodownload" />
  </div>
);

Audio.propTypes = {
  audioSrc: PropTypes.string.isRequired,
};

export default Audio;
