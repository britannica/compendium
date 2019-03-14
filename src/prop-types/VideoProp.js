import PropTypes from 'prop-types';

const VideoProp = PropTypes.shape({
  videoPoster: PropTypes.shape({
    filename: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  assetId: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  credit: PropTypes.string,
  jwplayerClosedCaptionManifestId: PropTypes.string,
  jwplayerManifestId: PropTypes.string,
  duration: PropTypes.number,
});

export default VideoProp;
