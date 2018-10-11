
import classNames from 'classnames';
import React from 'react';
import Carousel from 'nuka-carousel';
import PropTypes from 'prop-types';
import Thumbnail from '../Thumbnail/Thumbnail';
import { MediaStripNextArrow, MediaStripPreviousArrow } from './media-strip-components/media-strip-components';
import styles from './MediaStrip.scss';

const DEFAULT_THUMBNAIL_HEIGHT = 75;

const MediaStrip = ({ captions, handleCarouselPagination, mediaIndex, mediaStrip, opaque, slideIndex, slidesToShow, ThumbnailComponent }) => {
  const hasArrows = mediaStrip.length > slidesToShow;

  return (
    <div className={classNames(styles.MediaStrip, { [styles.captions]: captions })}>
      <Carousel
        slideIndex={slideIndex}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToShow}
        cellSpacing={5}
        heightMode="first" // todo: This should be changed to `max` after the following is resolved https://github.com/FormidableLabs/nuka-carousel/issues/417
        initialSlideHeight={75} // todo: This should be removed after the following is resolved https://github.com/FormidableLabs/nuka-carousel/issues/417
        renderBottomCenterControls={null}
        renderCenterLeftControls={hasArrows ? MediaStripPreviousArrow : null}
        renderCenterRightControls={hasArrows ? MediaStripNextArrow : null}
        afterSlide={handleCarouselPagination}
      >
        {mediaStrip.map((thumbnail, i) => (
          <Thumbnail
            {...thumbnail}
            caption={captions}
            className={classNames({ selected: i === mediaIndex })}
            container={styles.MediaStrip}
            height={DEFAULT_THUMBNAIL_HEIGHT}
            key={thumbnail.mediaId}
            opaque={opaque}
            width={null}
            ThumbnailComponent={ThumbnailComponent}
          />
        ))}
      </Carousel>
    </div>
  );
};

MediaStrip.propTypes = {
  captions: PropTypes.bool,
  handleCarouselPagination: PropTypes.func,
  mediaIndex: PropTypes.number,
  mediaStrip: PropTypes.arrayOf(PropTypes.shape(Thumbnail.propTypes)).isRequired,
  opaque: PropTypes.bool,
  slideIndex: PropTypes.number,
  slidesToShow: PropTypes.number.isRequired,
  ThumbnailComponent: Thumbnail.propTypes.ThumbnailComponent,
};

MediaStrip.defaultProps = {
  captions: false,
  handleCarouselPagination: () => {},
  mediaIndex: 0,
  opaque: false,
  slideIndex: 0,
  ThumbnailComponent: Thumbnail.defaultProps.ThumbnailComponent,
};

export default MediaStrip;
