
import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import PropTypes from 'prop-types';
import styles from './Video.scss';

const Video = ({ media: { closedCaptionUrl, posterUrl, playlistUrl }, onPlay, onPause, onLoad, playerId, adInfo }) => (
  <div className={styles.VideoMedia}>
     <ReactJWPlayer
      className="wrapper"
      onPlay={onPlay}
      onPause={onPause}
      onLoad={onLoad}
      playerId="bmo-video-player"
      playerScript={`https://content.jwplatform.com/libraries/${playerId}.js`}
      customProps={adInfo}
      playlist={[{
        image: posterUrl,
        sources: [{
          default: false,
          file: playlistUrl,
          label: '0',
          preload: 'metadata',
          type: 'hls',
        }],
        tracks: [{
          file: closedCaptionUrl,
          label: 'English',
        }],
      }]}
    />
  </div>
);

Video.propTypes = {
  playerId: PropTypes.string.isRequired,
  media: PropTypes.shape({
    posterUrl: PropTypes.string.isRequired,
    playlistUrl: PropTypes.string.isRequired,
  }),
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onLoad: PropTypes.func,
  adInfo: PropTypes.object,
};

Video.defaultProps = {
  media: null,
  adInfo: null,
  onPlay: () => {},
  onPause: () => {},
  onLoad: () => {},
};

export default Video;
