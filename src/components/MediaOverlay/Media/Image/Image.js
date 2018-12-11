
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../../../constants';
import LazyImage from '../../../LazyImage/LazyImage';

const Image = ({ imageUrl, expandedImageUrl, alt, lazyContainer }) => (
  <Fragment>
    <MediaQuery maxWidth={ViewportWidth.SM_MAX}>
      <LazyImage alt={alt} src={imageUrl} root={lazyContainer} />
    </MediaQuery>
    <MediaQuery minWidth={ViewportWidth.MD_MIN}>
      <LazyImage alt={alt} src={expandedImageUrl || imageUrl} root={lazyContainer} />
    </MediaQuery>
  </Fragment>
);

Image.propTypes = {
  expandedImageUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  lazyContainer: PropTypes.instanceOf(Element),
};

Image.defaultProps = {
  expandedImageUrl: '',
  imageUrl: '',
  alt: '',
  lazyContainer: null,
};

export default Image;
