
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import ChildrenProp from '../../../prop-types/ChildrenProp';
import MediaOverlayContext from '../MediaOverlay.context';
import styles from './Toolbar.scss';

const Toolbar = ({ primaryTools, secondaryTools, customTools, sidebarPanels }) => (
  <MediaOverlayContext.Consumer>
    {({ overlayProps, overlayState }) => {
      const { localeLabels } = overlayState;
      const { baseHref } = overlayProps;

      return (
        <div className={styles.Toolbar}>
          <div className={styles.overlayTools}>
            {primaryTools}
          </div>
          <div className={styles.additionalTools}>
            {secondaryTools}
          </div>
          <div className={styles.customTools}>
            {customTools}
          </div>
          {sidebarPanels && (
            <div className={styles.sidebarPanels}>
              {sidebarPanels}
              <Link to={baseHref} className={styles.close} title={localeLabels.CLOSE}>
                <FontAwesomeIcon icon={faTimes} size="2x" />
              </Link>
            </div>
          )}
          {!sidebarPanels && (
            <Link to={baseHref} className={styles.close} title={localeLabels.CLOSE}>
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </Link>
          )}
        </div>
      );
    }}
  </MediaOverlayContext.Consumer>
);

Toolbar.propTypes = {
  customTools: ChildrenProp,
  primaryTools: ChildrenProp,
  secondaryTools: ChildrenProp,
  sidebarPanels: ChildrenProp,
};

Toolbar.defaultProps = {
  customTools: null,
  primaryTools: null,
  secondaryTools: null,
  sidebarPanels: null,
};

export default Toolbar;
