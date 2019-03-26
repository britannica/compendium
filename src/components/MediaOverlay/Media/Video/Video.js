import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import PropTypes from 'prop-types';
import AssemblyProp from '../../../../prop-types/AssemblyProp';
import styles from './Video.module.scss';

const Video = ({
  assembly: { video },
  generatePrerollUrl,
  onPlay,
  onPause,
  playerId,
}) => (
  <div className={styles.VideoMedia}>
    <ReactJWPlayer
      className="wrapper"
      onPlay={onPlay}
      onPause={onPause}
      playerId="eb-video-player"
      playerScript={`https://content.jwplatform.com/libraries/${playerId}.js`}
      playlist={[video]}
      generatePrerollUrl={generatePrerollUrl}
      customProps={(generatePrerollUrl && {
        advertising: {
          client: 'googima',
        },
      })}
    />
  </div>
);

Video.propTypes = {
  assembly: AssemblyProp.isRequired,
  playerId: PropTypes.string.isRequired,
  generatePrerollUrl: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

Video.defaultProps = {
  generatePrerollUrl: null,
  onPlay: () => {},
  onPause: () => {},
};

export default Video;
