
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styles from './OverlayTitle.scss';

const OverlayTitle = ({ overlayTitle }) => (
  <Fragment>
    {overlayTitle && (
      <div className={classNames(styles.OverlayTitle, 'text-truncate')}>
        {overlayTitle}
      </div>
    )}
  </Fragment>
);

OverlayTitle.propTypes = {
  overlayTitle: PropTypes.string.isRequired,
};

export default OverlayTitle;
