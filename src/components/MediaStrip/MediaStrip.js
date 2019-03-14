import classNames from 'classnames';
import React from 'react';
import Carousel from 'nuka-carousel';
import PropTypes from 'prop-types';
import AssemblyProp from '../../prop-types/AssemblyProp';
import Thumbnail from '../Thumbnail/Thumbnail';
import { MediaStripNextArrow, MediaStripPreviousArrow } from './media-strip-components/media-strip-components';
import styles from './MediaStrip.module.scss';

const DEFAULT_THUMBNAIL_HEIGHT = 75;

const MediaStrip = ({
  captions,
  cdn,
  handleCarouselPagination,
  assemblies,
  onCarouselResize,
  opaque,
  lazyContainer,
  slideIndex,
  slidesToShow,
  ThumbnailComponent,
}) => {
  const hasArrows = assemblies.length > slidesToShow;

  return (
    <div className={classNames(styles.MediaStrip, { [styles.captions]: captions }, 'd-print-none')}>
      <Carousel
        disableKeyboardControls
        slideIndex={slideIndex}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToShow}
        cellSpacing={5}
        heightMode="max"
        renderBottomCenterControls={null}
        renderCenterLeftControls={hasArrows ? MediaStripPreviousArrow : null}
        renderCenterRightControls={hasArrows ? MediaStripNextArrow : null}
        afterSlide={handleCarouselPagination}
        onResize={onCarouselResize}
      >
        {assemblies.map((assembly, i) => (
          <Thumbnail
            assembly={assembly}
            cdn={cdn}
            key={assembly.assemblyId}
            caption={captions}
            container={styles.MediaStrip}
            height={DEFAULT_THUMBNAIL_HEIGHT}
            lazyContainer={lazyContainer}
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
  cdn: PropTypes.string.isRequired,
  handleCarouselPagination: PropTypes.func,
  assemblies: PropTypes.arrayOf(AssemblyProp).isRequired,
  lazyContainer: PropTypes.instanceOf(Element),
  opaque: PropTypes.bool,
  onCarouselResize: PropTypes.func,
  slideIndex: PropTypes.number,
  slidesToShow: PropTypes.number.isRequired,
  ThumbnailComponent: PropTypes.func,
};

MediaStrip.defaultProps = {
  captions: false,
  handleCarouselPagination: () => {},
  lazyContainer: null,
  onCarouselResize: null,
  opaque: false,
  slideIndex: 0,
  ThumbnailComponent: () => {},
};

export default MediaStrip;
