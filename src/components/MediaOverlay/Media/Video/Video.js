import React, { useEffect } from 'react';
import ReactJWPlayer from '@ryanwalters/react-jw-player';
import PropTypes from 'prop-types';
import AssemblyProp from '../../../../prop-types/AssemblyProp';
import styles from './Video.module.scss';

const Video = ({
  assembly: { video },
  generatePrerollUrl,
  onPlay,
  onPause,
  playerId,
}) => {
  // Log any JW Player errors that occur

  useEffect(() => {
    if (window.jwplayer) {
      window.jwplayer().on('adError', error => console.log('JW Player error:', error));
    }
  }, []);

  return (
    <ReactJWPlayer
      className={styles.VideoMedia}
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
  );
};

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
