
import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import PropTypes from 'prop-types';
import './Video.scss';

const Video = ({ media: { posterUrl, playlistUrl }, onPlay, onPause, playerId }) => (
  <div className="VideoMedia">
    <ReactJWPlayer
      className="wrapper"
      onPlay={onPlay}
      onPause={onPause}
      playerId="bmo-video-player"
      playerScript={`https://content.jwplatform.com/libraries/${playerId}.js`}
      playlist={[{
        image: posterUrl,
        sources: [{
          default: false,
          file: playlistUrl,
          label: '0',
          preload: 'metadata',
          type: 'hls',
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
};

Video.defaultProps = {
  media: null,
  onPlay: () => {},
  onPause: () => {},
};

export default Video;
