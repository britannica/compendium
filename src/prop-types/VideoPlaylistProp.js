import PropTypes from 'prop-types';

const VideoPlaylistProp = PropTypes.shape({
  image: PropTypes.string,        // https://cdn.britannica.com/asdfasdfsadfs
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      default: PropTypes.bool,    // false (only needed when there is more than one source)
      file: PropTypes.string,     // `https://content.jwplatform.com/manifests/${jwplayerManifestId}.m3u8`
      label: PropTypes.string,    // '0' (not sure what this is for, maybe we can take it out?) "Label of the media source, displayed in the manual quality selection menu. Set this if you have more than 2 qualities of your video."
      type: PropTypes.string,     // 'hls'
    }),
  ),
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.string,     // `https://content.jwplatform.com/tracks/${jwplayerClosedCaptionManifestId}`
      label: PropTypes.string,    // 'English'
      kind: PropTypes.string,     // default: 'captions'
      default: PropTypes.bool,    // default: false
    }),
  ),
});

export default VideoPlaylistProp;
