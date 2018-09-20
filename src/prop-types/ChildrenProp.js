
import PropTypes from 'prop-types';

const ChildrenProp = (
  PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.bool,
      ]),
    ),
    PropTypes.element,
    PropTypes.string,
    PropTypes.bool,
  ])
);

export default ChildrenProp;
