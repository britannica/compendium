import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../../../constants';
import LazyImage from '../../../LazyImage/LazyImage';

const DefaultImage = ({ filename, largeFilename, caption, credit, lazyContainer }) => (
  <>
    <MediaQuery maxWidth={ViewportWidth.SM_MAX}>
      <LazyImage alt={caption || credit} src={filename} root={lazyContainer} />
    </MediaQuery>
    <MediaQuery minWidth={ViewportWidth.MD_MIN}>
      <LazyImage alt={caption || credit} src={(largeFilename || filename)} root={lazyContainer} />
    </MediaQuery>
  </>
);

DefaultImage.propTypes = {
  caption: PropTypes.string,
  credit: PropTypes.string,
  filename: PropTypes.string.isRequired,
  largeFilename: PropTypes.string,
  lazyContainer: PropTypes.instanceOf(Element),
};

DefaultImage.defaultProps = {
  caption: null,
  credit: null,
  largeFilename: null,
  lazyContainer: null,
};

export default DefaultImage;
