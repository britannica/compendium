
import classNames from 'classnames';
import React, { forwardRef, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../constants';
import { OverlayMode } from './overlay-constants';
import Gallery from './Gallery/Gallery';
import { GalleryProvider } from './Gallery/Gallery.context';
import GalleryToolbar from './GalleryToolbar/GalleryToolbar';
import MediaLink from './MediaLink/MediaLink';
import MediaOverlayContext from './MediaOverlay.context';
import MediaStrip from '../MediaStrip/MediaStrip';
import MediaToolbar from './MediaToolbar/MediaToolbar';
import MediaViewer from './MediaViewer/MediaViewer';
import OverlayTitle from './OverlayTitle/OverlayTitle';
import Sidebar from './Sidebar/Sidebar';
import styles from './MediaOverlay.scss';

const MediaOverlay = forwardRef((props, overlayRef) => (
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
        overlayTitle,
        slidesToShow,
      },
      overlayProps: {
        hasMediaStrip,
      },
    }) => (
      <div className={styles.MediaOverlay} ref={overlayRef}>
        <div role="button" tabIndex="0" className={styles.background} onClick={hideOverlay} onKeyUp={handleKeyUp} />
        <div className={classNames(styles.main, styles[mode])}>
          {mode === OverlayMode.MEDIA_VIEW && (
            <Fragment>
              <MediaToolbar />
              <OverlayTitle overlayTitle={overlayTitle} />
              <MediaViewer />
              {hasMediaStrip && (
                <MediaQuery minWidth={ViewportWidth.MD_MIN}>
                  <MediaStrip
                    slideIndex={carouselPageIndex}
                    mediaIndex={mediaIndex}
                    mediaStrip={mediaStrip}
                    lazyContainer={overlayRef.current}
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
              <Gallery onMediaClick={enableMediaView} lazyContainer={overlayRef.current} />
            </GalleryProvider>
          )}
        </div>
      </div>
    )}
  </MediaOverlayContext.Consumer>
));

export default MediaOverlay;
