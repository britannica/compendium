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
  handleCarouselPagination,
  assemblies,
  onCarouselResize,
  opaque,
  lazyContainer,
  selectedAssembly,
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
        {assemblies.map(assembly => (
          <Thumbnail
            assembly={assembly}
            key={assembly.assemblyId}
            hasCaption={captions}
            container={styles.MediaStrip}
            height={DEFAULT_THUMBNAIL_HEIGHT}
            lazyContainer={lazyContainer}
            isOpaque={opaque}
            isSelected={selectedAssembly?.assemblyId === assembly.assemblyId}
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
  assemblies: PropTypes.arrayOf(AssemblyProp).isRequired,
  lazyContainer: PropTypes.instanceOf(Element),
  opaque: PropTypes.bool,
  onCarouselResize: PropTypes.func,
  selectedAssembly: PropTypes.shape(),
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
  selectedAssembly: null,
  slideIndex: 0,
  ThumbnailComponent: () => {},
};

export default MediaStrip;
