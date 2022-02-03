import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import MediaOverlayContext from '../MediaOverlay.context';
import styles from './Toolbar.module.scss';

const Toolbar = ({ primaryTools, secondaryTools, customTools, sidebarPanels }) => (
  <MediaOverlayContext.Consumer>
    {({ overlayProps, overlayState }) => {
      const { localeLabels } = overlayState;
      const { baseHref } = overlayProps;

      return (
        <div className={classNames(styles.Toolbar, 'd-print-none')}>
          <div className={styles.overlayTools}>{primaryTools}</div>
          <div className={styles.additionalTools}>{secondaryTools}</div>
          <div className={styles.customTools}>{customTools}</div>
          {sidebarPanels && (
            <div className={styles.sidebarPanels}>
              {sidebarPanels}
              <Link to={baseHref} className={styles.close} title={localeLabels.CLOSE}>
                <Close />
              </Link>
            </div>
          )}
          {!sidebarPanels && (
            <Link to={baseHref} className={styles.close} title={localeLabels.CLOSE}>
              <Close />
            </Link>
          )}
        </div>
      );
    }}
  </MediaOverlayContext.Consumer>
);

Toolbar.propTypes = {
  customTools: PropTypes.node,
  primaryTools: PropTypes.node,
  secondaryTools: PropTypes.node,
  sidebarPanels: PropTypes.node,
};

Toolbar.defaultProps = {
  customTools: null,
  primaryTools: null,
  secondaryTools: null,
  sidebarPanels: null,
};

export default Toolbar;
