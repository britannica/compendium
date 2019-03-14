import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { lazy, Suspense } from 'react';
import styles from './MediaOverlay.module.scss';
import 'animate.css';

const LazyMediaOverlay = lazy(() => import('./MediaOverlayContainer'));

// Super pared down version of the overlay, used while loading the real thing

const MediaOverlayLoading = () => (
  <div className={styles.MediaOverlay}>
    <div className={styles.background}>
      <div className={classNames(styles.main, styles.loading)}>
        <div className="animated fadeIn delay-1s">
          <FontAwesomeIcon icon={faSpinnerThird} size="2x" spin />
        </div>
      </div>
    </div>
  </div>
);

// Lazy loaded media overlay

const MediaOverlay = props => (
  <Suspense fallback={<MediaOverlayLoading />}>
    <LazyMediaOverlay {...props} />
  </Suspense>
);

export default MediaOverlay;
