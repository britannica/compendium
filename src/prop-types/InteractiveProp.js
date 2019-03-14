import PropTypes from 'prop-types';

const InteractiveProp = PropTypes.shape({
  assetId: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  credit: PropTypes.string,
  filename: PropTypes.string,
});

export default InteractiveProp;
