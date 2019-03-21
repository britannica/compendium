import classNames from 'classnames';
import React, { forwardRef, Fragment } from 'react';
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
import styles from './MediaOverlay.module.scss';

const MediaOverlay = forwardRef((props, overlayRef) => (
  <MediaOverlayContext.Consumer>
    {({
      enableMediaView,
      handleCarouselPagination,
      handleKeyUp,
      hideOverlay,
      onCarouselResize,
      overlayState: { assembly, carouselPageIndex, assemblies, mode, overlayTitle, slidesToShow },
      overlayProps: { hasMediaStrip },
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
                <MediaStrip
                  slideIndex={carouselPageIndex}
                  assemblies={assemblies}
                  slidesToShow={slidesToShow}
                  handleCarouselPagination={handleCarouselPagination}
                  lazyContainer={overlayRef.current}
                  ThumbnailComponent={MediaLink}
                  onCarouselResize={onCarouselResize}
                  selectedAssembly={assembly}
                />
              )}
              <Sidebar />
            </Fragment>
          )}
          {mode === OverlayMode.GALLERY_VIEW && (
            <GalleryProvider assemblies={assemblies}>
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
