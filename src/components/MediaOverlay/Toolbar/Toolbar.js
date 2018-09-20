
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import ChildrenProp from '../../../../../mendel/javascript/shared/react/prop-types/ChildrenProp';
import MediaOverlayContext from '../MediaOverlay.context';
import './Toolbar.scss';

const Toolbar = ({ primaryTools, secondaryTools, sidebarTools }) => (
  <MediaOverlayContext.Consumer>
    {({ overlayProps: { baseHref } }) => (
      <div className="MediaOverlay--toolbar">
        <div className="overlayTools">
          {primaryTools}
        </div>
        <div className="additionalTools">
          {secondaryTools}
        </div>
        {sidebarTools && (
          <div className="sidebarTools">
            {sidebarTools}
            <Link to={baseHref} className="close" title="Close">
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </Link>
          </div>
        )}
        {!sidebarTools && (
          <Link to={baseHref} className="close mr-10" title="Close">
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </Link>
        )}
      </div>
    )}
  </MediaOverlayContext.Consumer>
);

Toolbar.propTypes = {
  primaryTools: ChildrenProp,
  secondaryTools: ChildrenProp,
  sidebarTools: ChildrenProp,
};

Toolbar.defaultProps = {
  primaryTools: null,
  secondaryTools: null,
  sidebarTools: null,
};

export default Toolbar;
