import PropTypes from 'prop-types';
import React from 'react';
import PhotoGallery from 'react-photo-gallery';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../../constants';
import LazyImage from '../../LazyImage/LazyImage';
import Thumbnail from '../../Thumbnail/Thumbnail';
import MediaLink from '../MediaLink/MediaLink';
import { withGalleryContext } from './Gallery.context';
import styles from './Gallery.module.scss';

const Gallery = ({ filteredPhotos, lazyContainer, onMediaClick }) => {
  function renderPhotoGallery(columns) {
    return (
      <PhotoGallery
        photos={filteredPhotos}
        columns={columns}
        ImageComponent={({ photo }) => (
          <MediaLink assemblyId={photo.assemblyId} key={photo.assemblyId}>
            {console.log(photo)}
            <LazyImage src={photo.thumbnailUrl} alt={photo.altText} height={photo.height} width={photo.width} />
          </MediaLink>
        )}
      />
    );
  }

  return (
    <div className={styles.Gallery}>
      <MediaQuery minWidth={ViewportWidth.MD_MIN}>{renderPhotoGallery(5)}</MediaQuery>
      <MediaQuery maxWidth={ViewportWidth.SM_MAX}>{renderPhotoGallery(2)}</MediaQuery>
    </div>
  );
};

Gallery.propTypes = {
  lazyContainer: PropTypes.instanceOf(Element),
  onMediaClick: PropTypes.func,
  filteredPhotos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
    }),
  ).isRequired,
};

Gallery.defaultProps = {
  lazyContainer: null,
  onMediaClick: null,
};

export default withGalleryContext(Gallery);
