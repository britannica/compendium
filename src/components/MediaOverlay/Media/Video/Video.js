
import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import PropTypes from 'prop-types';
import styles from './Video.scss';

const Video = ({ media: { closedCaptionUrl, posterUrl, playlistUrl }, onPlay, onPause, playerId, adInfoProvider }) => (
    <div className={styles.VideoMedia}>
        {console.log('------------------------------------------------------')}
        {console.log('------------------------------------------------------')}
        {console.log(adInfoProvider())}
        {console.log('------------------------------------------------------')}
        {console.log('------------------------------------------------------')}
     <ReactJWPlayer
      className="wrapper"
      onPlay={onPlay}
      onPause={onPause}
      playerId="bmo-video-player"
      playerScript={`https://content.jwplatform.com/libraries/${playerId}.js`}
      customProps={adInfoProvider()}
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
  adInfoProvider: PropTypes.func,
};

Video.defaultProps = {
  media: null,
  adInfoProvider: () => {},
  onPlay: () => {},
  onPause: () => {},
};

export default Video;
