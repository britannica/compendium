import PropTypes from 'prop-types';

const AudioProp = PropTypes.shape({
  assetId: PropTypes.number,
  credit: PropTypes.string,
  duration: PropTypes.number,
  filename: PropTypes.string,
});

export default AudioProp;
