
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Responsive from 'react-responsive';
import { ViewportWidth } from '../../constants';

const Image = ({ imageUrl, expandedImageUrl, alt }) => (
  <Fragment>
    <Responsive maxWidth={ViewportWidth.XS_MAX}>
      <img src={imageUrl} alt={alt} />
    </Responsive>
    <Responsive minWidth={ViewportWidth.SM_MIN}>
      <img src={expandedImageUrl || imageUrl} alt={alt} />
    </Responsive>
  </Fragment>

);

Image.propTypes = {
  expandedImageUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
};

Image.defaultProps = {
  expandedImageUrl: '',
  imageUrl: '',
  alt: '',
};

export default Image;
