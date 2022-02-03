import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { Taparoo } from 'taparoo';
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
      {hasError ? localeLabels.ERROR : <Media />}
      {assemblies.length > 1 && !controlsHidden && (
        <>
          {mediaIndex > 0 && (
            <MediaLink
              assemblyId={assemblies[mediaIndex - 1].assemblyId}
              className={classNames(styles.mediaArrow, styles.prev, 'd-print-none')}
            >
              <KeyboardArrowLeft fontSize="large" />
            </MediaLink>
          )}
          {mediaIndex < assemblies.length - 1 && (
            <MediaLink
              assemblyId={assemblies[mediaIndex + 1].assemblyId}
              className={classNames(styles.mediaArrow, styles.next, 'd-print-none')}
            >
              <KeyboardArrowRight fontSize="large" />
            </MediaLink>
          )}
        </>
      )}
    </Taparoo>
  );
};

export default MediaViewer;
