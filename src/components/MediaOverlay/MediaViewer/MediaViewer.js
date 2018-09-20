
import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import classNames from 'classnames';
import './MediaViewer.scss';
import Taparoo from '../../Taparoo/Taparoo';
import Media from '../Media/Media';
import MediaLink from '../MediaLink/MediaLink';
import MediaOverlayContext from '../MediaOverlay.context';

const MediaViewer = () => (
  <MediaOverlayContext.Consumer>
    {({ overlayState: { hasError, mediaStrip, mediaIndex, controlsHidden }, handleTap, navigateNextMedia, navigatePreviousMedia }) => (
      <Taparoo
        onTap={handleTap}
        onSwipeLeft={navigateNextMedia}
        onSwipeRight={navigatePreviousMedia}
        className={classNames('MediaOverlay--mediaViewer', { controlsHidden })}
      >
        {hasError ? (
          <Fragment>Unable to load media.</Fragment>
        ) : (
          <Media />
        )}
        {mediaStrip.length > 1 && !controlsHidden && (
          <Fragment>
            {mediaIndex > 0 && (
              <MediaLink mediaId={mediaStrip[mediaIndex - 1].mediaId} className="mediaArrow mediaArrow--prev">
                <FontAwesomeIcon icon={faAngleLeft} size="3x" />
              </MediaLink>
            )}
            {mediaIndex < mediaStrip.length - 1 && (
              <MediaLink mediaId={mediaStrip[mediaIndex + 1].mediaId} className="mediaArrow mediaArrow--next">
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
