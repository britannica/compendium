
import PropTypes from 'prop-types';
import React from 'react';
import PhotoGallery from 'react-photo-gallery';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../constants';
import Thumbnail from '../Thumbnail/Thumbnail';
import { withGalleryContext } from './Gallery.context';
import styles from './Gallery.scss';

const Gallery = ({ photos, onMediaClick }) => {
  function renderPhotoGallery(columns) {
    return (
      <PhotoGallery
        photos={photos}
        columns={columns}
        ImageComponent={({ photo }) => (
          <Thumbnail {...photo} onClick={onMediaClick} size="2x" hoverCaption opaque />
        )}
      />
    );
  }

  return (
    <div className={styles.Gallery}>
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
  photos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  })).isRequired,
};

Gallery.defaultProps = {
  onMediaClick: null,
};

export default withGalleryContext(Gallery);
