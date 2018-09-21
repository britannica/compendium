
import classNames from 'classnames';
import React from 'react';
import Carousel from 'nuka-carousel';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../constants';
import MediaOverlayContext from '../MediaOverlay.context';
import Thumbnail from '../Thumbnail/Thumbnail';
import { MediaStripNextArrow, MediaStripPreviousArrow } from './media-strip-components/media-strip-components';
import styles from './MediaStrip.scss';

const MediaStrip = () => (
  <MediaOverlayContext.Consumer>
    {({ overlayProps: { hasMediaStrip }, overlayState: { carouselPageIndex, mediaIndex, mediaStrip, slidesToShow }, handleCarouselPagination }) => {
      // Don't render the media strip if it's disabled or if there's only a single image

      if (!hasMediaStrip || mediaStrip.length <= 1) {
        return '';
      }


      // Otherwise, go for it

      const hasArrows = mediaStrip.length > slidesToShow;

      return (
        <div className={styles.MediaStrip}>
          <MediaQuery minWidth={ViewportWidth.SM_MIN}>
            <Carousel
              slideIndex={carouselPageIndex}
              slidesToShow={slidesToShow}
              slidesToScroll={slidesToShow}
              cellSpacing={5}
              renderBottomCenterControls={null}
              renderCenterLeftControls={hasArrows ? MediaStripPreviousArrow : null}
              renderCenterRightControls={hasArrows ? MediaStripNextArrow : null}
              afterSlide={handleCarouselPagination}
            >
              {mediaStrip.map((thumbnail, i) => (
                <Thumbnail
                  key={thumbnail.mediaId}
                  container={styles.MediaStrip}
                  className={classNames({ selected: i === mediaIndex })}
                  {...thumbnail}
                  height={75}
                  width={null}
                />
              ))}
            </Carousel>
          </MediaQuery>
        </div>
      );
    }}
  </MediaOverlayContext.Consumer>
);

export default MediaStrip;
