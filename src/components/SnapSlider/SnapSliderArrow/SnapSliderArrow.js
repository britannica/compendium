import PropTypes from 'prop-types';
import React from 'react';

const SnapSliderArrow = ({ className, onClick, disabled, icon: Icon }) => (
  <button type="button" className={className} onClick={onClick} disabled={disabled}>
    <Icon />
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
