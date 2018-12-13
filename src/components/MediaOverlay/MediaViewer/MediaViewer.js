
import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import classNames from 'classnames';
import Taparoo from '../../Taparoo/Taparoo';
import Media from '../Media/Media';
import MediaLink from '../MediaLink/MediaLink';
import MediaOverlayContext from '../MediaOverlay.context';
import styles from './MediaViewer.scss';

const MediaViewer = () => (
  <MediaOverlayContext.Consumer>
    {({ overlayState: { hasError, localeLabels, mediaStrip, mediaIndex, controlsHidden }, handleTap, overlayRef, navigateNextMedia, navigatePreviousMedia }) => (
      <Taparoo
        onTap={handleTap}
        onSwipeLeft={navigateNextMedia}
        onSwipeRight={navigatePreviousMedia}
        className={classNames(styles.MediaViewer, { controlsHidden })}
      >
        {hasError ? (
          <Fragment>{localeLabels.ERROR}</Fragment>
        ) : (
          <Media lazyContainer={overlayRef.current} />
        )}
        {mediaStrip.length > 1 && !controlsHidden && (
          <Fragment>
            {mediaIndex > 0 && (
              <MediaLink mediaId={mediaStrip[mediaIndex - 1].mediaId} className={classNames(styles.mediaArrow, styles.prev)}>
                <FontAwesomeIcon icon={faAngleLeft} size="3x" />
              </MediaLink>
            )}
            {mediaIndex < mediaStrip.length - 1 && (
              <MediaLink mediaId={mediaStrip[mediaIndex + 1].mediaId} className={classNames(styles.mediaArrow, styles.next)}>
                <FontAwesomeIcon icon={faAngleRight} size="3x" />
              </MediaLink>
            )}
          </Fragment>
        )}
      </Taparoo>
    )}
  </MediaOverlayContext.Consumer>
);

export default MediaViewer;
