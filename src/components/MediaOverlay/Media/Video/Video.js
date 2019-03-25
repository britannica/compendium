import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import PropTypes from 'prop-types';
import AssemblyProp from '../../../../prop-types/AssemblyProp';
import styles from './Video.module.scss';

const Video = ({
  assembly: { video },
  onPlay,
  onPause,
  playerId,
}) => (
  <div className={styles.VideoMedia}>
    <ReactJWPlayer
      className="wrapper"
      onPlay={onPlay}
      onPause={onPause}
      playerId="bmo-video-player"
      playerScript={`https://content.jwplatform.com/libraries/${playerId}.js`}
      playlist={video}
    />
  </div>
);

Video.propTypes = {
  assembly: AssemblyProp.isRequired,
  playerId: PropTypes.string.isRequired,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

Video.defaultProps = {
  onPlay: () => {},
  onPause: () => {},
};

export default Video;
