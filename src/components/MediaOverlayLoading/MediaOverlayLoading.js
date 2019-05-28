import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import styles from '../MediaOverlay/MediaOverlay.module.scss';

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

export default MediaOverlayLoading;
