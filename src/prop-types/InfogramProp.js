import PropTypes from 'prop-types';

const InfogramProp = PropTypes.shape({
  filename: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

export default InfogramProp;
