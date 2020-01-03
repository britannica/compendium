import classnames from 'classnames';
import React, { forwardRef } from 'react';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../constants';
import Thumbnail from '../Thumbnail/Thumbnail';
import { OverlayMode } from './overlay-constants';
import Gallery from './Gallery/Gallery';
import { GalleryProvider } from './Gallery/Gallery.context';
import GalleryToolbar from './GalleryToolbar/GalleryToolbar';
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
      handleKeyUp,
      hideOverlay,
      className,
      overlayState: { assembly, assemblies, mode, overlayTitle },
      overlayProps: { hasMediaStrip },
    }) => (
      <div className={classnames(styles.MediaOverlay, className)} ref={overlayRef}>
        <div role="button" tabIndex="0" className={styles.background} onClick={hideOverlay} onKeyUp={handleKeyUp} />
        <div className={classnames(styles.main, styles[mode])}>
          {mode === OverlayMode.MEDIA_VIEW && (
            <>
              <MediaToolbar />
              <OverlayTitle overlayTitle={overlayTitle} />
              <MediaViewer />
              {hasMediaStrip && (
                <MediaQuery minWidth={ViewportWidth.SM_MIN}>
                  <MediaStrip
                    assemblies={assemblies}
                    lazyContainer={overlayRef.current}
                    ThumbnailComponent={Thumbnail}
                    selectedAssembly={assembly}
                  />
                </MediaQuery>
              )}
              <Sidebar />
            </>
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
