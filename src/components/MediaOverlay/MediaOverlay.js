
import React, { Fragment } from 'react';
import { OverlayMode } from './constants';
import { GalleryProvider } from './Gallery/Gallery.context';
import GalleryContainer from './Gallery/GalleryContainer';
import GalleryToolbar from './GalleryToolbar/GalleryToolbar';
import MediaOverlayContext from './MediaOverlay.context';
import MediaStrip from './MediaStrip/MediaStrip';
import MediaToolbar from './MediaToolbar/MediaToolbar';
import MediaViewer from './MediaViewer/MediaViewer';
import Sidebar from './Sidebar/Sidebar';
import styles from './MediaOverlay.scss';

const MediaOverlay = () => (
  <MediaOverlayContext.Consumer>
    {({ hideOverlay, handleKeyUp, enableMediaView, overlayState: { mediaStrip, mode } }) => (
      <div className={styles.MediaOverlay}>
        <div role="button" tabIndex="0" className={styles.background} onClick={hideOverlay} onKeyUp={handleKeyUp} />
        <div className={styles.main}>
          {mode === OverlayMode.MEDIA_VIEW && (
            <Fragment>
              <MediaToolbar />
              <MediaViewer />
              <MediaStrip />
              <Sidebar />
            </Fragment>
          )}
          {mode === OverlayMode.GALLERY_VIEW && (
            <GalleryProvider>
              <GalleryToolbar />
              <GalleryContainer mediaStrip={mediaStrip} onMediaClick={enableMediaView} />
            </GalleryProvider>
          )}
        </div>
      </div>
    )}
  </MediaOverlayContext.Consumer>
);

export default MediaOverlay;
