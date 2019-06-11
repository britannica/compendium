import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from '../MediaOverlay/MediaOverlay.module.scss';

const MediaOverlayLoading = ({ className }) => (
  <div className={classnames(styles.MediaOverlay, className)}>
    <div className={styles.background}>
      <div className={classnames(styles.main, styles.loading)}>
        <div className="animated fadeIn delay-1s">
          <FontAwesomeIcon icon={faSpinnerThird} size="2x" spin />
        </div>
      </div>
    </div>
  </div>
);

MediaOverlayLoading.propTypes = {
  className: PropTypes.string,
};

MediaOverlayLoading.defaultProps = {
  className: null,
};

export default MediaOverlayLoading;
