
import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../constants';
import { OverlayMode } from './constants';
import Gallery from './Gallery/Gallery';
import { GalleryProvider } from './Gallery/Gallery.context';
import GalleryToolbar from './GalleryToolbar/GalleryToolbar';
import MediaLink from './MediaLink/MediaLink';
import MediaOverlayContext from './MediaOverlay.context';
import MediaStrip from '../MediaStrip/MediaStrip';
import MediaToolbar from './MediaToolbar/MediaToolbar';
import MediaViewer from './MediaViewer/MediaViewer';
import Sidebar from './Sidebar/Sidebar';
import styles from './MediaOverlay.scss';

const MediaOverlay = () => (
  <MediaOverlayContext.Consumer>
    {({
      enableMediaView,
      handleCarouselPagination,
      handleKeyUp,
      hideOverlay,
      overlayState: {
        carouselPageIndex,
        mediaIndex,
        mediaStrip,
        mode,
        slidesToShow,
      },
      overlayProps: {
        hasMediaStrip,
      },
    }) => (
      <div className={styles.MediaOverlay}>
        <div role="button" tabIndex="0" className={styles.background} onClick={hideOverlay} onKeyUp={handleKeyUp} />
        <div className={styles.main}>
          {mode === OverlayMode.MEDIA_VIEW && (
            <Fragment>
              <MediaToolbar />
              <MediaViewer />
              {hasMediaStrip && (
                <MediaQuery minWidth={ViewportWidth.MD_MIN}>
                  <MediaStrip
                    slideIndex={carouselPageIndex}
                    mediaIndex={mediaIndex}
                    mediaStrip={mediaStrip}
                    slidesToShow={slidesToShow}
                    handleCarouselPagination={handleCarouselPagination}
                    ThumbnailComponent={MediaLink}
                  />
                </MediaQuery>
              )}
              <Sidebar />
            </Fragment>
          )}
          {mode === OverlayMode.GALLERY_VIEW && (
            <GalleryProvider mediaStrip={mediaStrip}>
              <GalleryToolbar />
              <Gallery onMediaClick={enableMediaView} />
            </GalleryProvider>
          )}
        </div>
      </div>
    )}
  </MediaOverlayContext.Consumer>
);

export default MediaOverlay;
