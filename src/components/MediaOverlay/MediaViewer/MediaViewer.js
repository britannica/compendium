import React, { Fragment, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import classNames from 'classnames';
import Taparoo from '../../Taparoo/Taparoo';
import Media from '../Media/Media';
import MediaLink from '../MediaLink/MediaLink';
import MediaOverlayContext from '../MediaOverlay.context';
import styles from './MediaViewer.module.scss';

const MediaViewer = () => {
  const {
    overlayState: { controlsHidden, hasError, localeLabels, mediaIndex, assemblies },
    handleTap,
    navigateNextMedia,
    navigatePreviousMedia,
  } = useContext(MediaOverlayContext);

  return (
    <Taparoo
      onTap={handleTap}
      onSwipeLeft={navigateNextMedia}
      onSwipeRight={navigatePreviousMedia}
      className={classNames(styles.MediaViewer, { controlsHidden })}
    >
      {hasError ? <Fragment>{localeLabels.ERROR}</Fragment> : <Media />}
      {assemblies.length > 1 && !controlsHidden && (
        <Fragment>
          {mediaIndex > 0 && (
            <MediaLink
              assemblyId={assemblies[mediaIndex - 1].assemblyId}
              className={classNames(styles.mediaArrow, styles.prev, 'd-print-none')}
            >
              <FontAwesomeIcon icon={faAngleLeft} size="3x" />
            </MediaLink>
          )}
          {mediaIndex < assemblies.length - 1 && (
            <MediaLink
              assemblyId={assemblies[mediaIndex + 1].assemblyId}
              className={classNames(styles.mediaArrow, styles.next, 'd-print-none')}
            >
              <FontAwesomeIcon icon={faAngleRight} size="3x" />
            </MediaLink>
          )}
        </Fragment>
      )}
    </Taparoo>
  );
};

export default MediaViewer;
