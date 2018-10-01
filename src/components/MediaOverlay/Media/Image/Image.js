
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../../../constants';

const Image = ({ imageUrl, expandedImageUrl, alt }) => (
  <Fragment>
    <MediaQuery maxWidth={ViewportWidth.SM_MAX}>
      <img src={imageUrl} alt={alt} />
    </MediaQuery>
    <MediaQuery minWidth={ViewportWidth.MD_MIN}>
      <img src={expandedImageUrl || imageUrl} alt={alt} />
    </MediaQuery>
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
