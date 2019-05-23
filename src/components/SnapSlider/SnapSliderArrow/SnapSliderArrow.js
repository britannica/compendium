import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SnapSliderArrow = ({ className, onClick, disabled, icon }) => (
  <button type="button" className={className} onClick={onClick} disabled={disabled}>
    <FontAwesomeIcon icon={icon} size="2x" />
  </button>
);

SnapSliderArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.shape(),
};

SnapSliderArrow.defaultProps = {
  className: null,
  onClick: null,
  disabled: false,
  icon: null,
};

export default SnapSliderArrow;
