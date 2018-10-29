
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../../../constants';
import LazyImage from '../../../LazyImage/LazyImage';

const Image = ({ imageUrl, expandedImageUrl, alt }) => (
  <Fragment>
    <MediaQuery maxWidth={ViewportWidth.SM_MAX}>
      <LazyImage alt={alt} src={imageUrl} />
    </MediaQuery>
    <MediaQuery minWidth={ViewportWidth.MD_MIN}>
      <LazyImage alt={alt} src={expandedImageUrl || imageUrl} />
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
