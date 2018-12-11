
import PropTypes from 'prop-types';
import React, { createRef } from 'react';
import PhotoGallery from 'react-photo-gallery';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../../constants';
import Thumbnail from '../../Thumbnail/Thumbnail';
import MediaLink from '../MediaLink/MediaLink';
import { withGalleryContext } from './Gallery.context';
import styles from './Gallery.scss';

const galleryRef = createRef();

const Gallery = ({ filteredPhotos, onMediaClick }) => {
  function renderPhotoGallery(columns) {
    return (
      <PhotoGallery
        photos={filteredPhotos}
        columns={columns}
        ImageComponent={props => (
          <Thumbnail {...props.photo} onClick={onMediaClick} size="2x" hoverCaption opaque ThumbnailComponent={MediaLink} lazyContainer={galleryRef.current} />
        )}
      />
    );
  }

  return (
    <div className={styles.Gallery} ref={galleryRef}>
      <MediaQuery minWidth={ViewportWidth.MD_MIN}>
        {renderPhotoGallery(5)}
      </MediaQuery>
      <MediaQuery maxWidth={ViewportWidth.SM_MAX}>
        {renderPhotoGallery(2)}
      </MediaQuery>
    </div>
  );
};

Gallery.propTypes = {
  onMediaClick: PropTypes.func,
  filteredPhotos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  })).isRequired,
};

Gallery.defaultProps = {
  onMediaClick: null,
};

export default withGalleryContext(Gallery);
