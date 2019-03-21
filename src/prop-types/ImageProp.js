import PropTypes from 'prop-types';

const ImageProp = PropTypes.shape({
  height: PropTypes.number,
  width: PropTypes.number,
  filename: PropTypes.string,
  largeFilename: PropTypes.string,
});

export default ImageProp;
