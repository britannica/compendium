import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import PropTypes from 'prop-types';
import AssemblyProp from '../../../../prop-types/AssemblyProp';
import styles from './Video.module.scss';

const Video = ({
  assembly: {
    video: {
      videoPoster: { filename },
      jwplayerManifestId,
      jwplayerClosedCaptionManifestId,
    },
  },
  cdn,
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
      playlist={[
        {
          image: cdn + filename,
          sources: [
            {
              default: false,
              file: `https://content.jwplatform.com/manifests/${jwplayerManifestId}.m3u8`,
              label: '0',
              preload: 'metadata',
              type: 'hls',
            },
          ],
          tracks: [
            {
              file: jwplayerClosedCaptionManifestId
                ? `https://content.jwplatform.com/tracks/${jwplayerClosedCaptionManifestId}`
                : null,
              label: 'Português',
              kind: 'captions',
              default: false,
            },
          ],
        },
      ]}
    />
  </div>
);

Video.propTypes = {
  assembly: AssemblyProp.isRequired,
  cdn: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

Video.defaultProps = {
  onPlay: () => {},
  onPause: () => {},
};

export default Video;
