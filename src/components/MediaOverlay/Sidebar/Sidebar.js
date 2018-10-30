
import React from 'react';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../../constants';
import { SidebarPanel } from '../overlay-constants';
import MediaOverlayContext from '../MediaOverlay.context';
import Ad from './Ad/Ad';
import CaptionPanel from './CaptionPanel/CaptionPanel';
import CitePanel from './CitePanel/CitePanel';
import styles from './Sidebar.scss';

function getSidebarPanel(panel, { media }) {
  switch (panel) {
    case SidebarPanel.CITE:
      return <CitePanel media={media} />;

    case SidebarPanel.CAPTION:
    default:
      return <CaptionPanel media={media} />;
  }
}

const Sidebar = () => (
  <MediaOverlayContext.Consumer>
    {({ overlayProps, overlayState }) => {
      const { isSidebarVisible, activeSidebarPanel, media, previousMediaId } = overlayState;
      const { hasAds } = overlayProps;

      if (!isSidebarVisible) {
        return null;
      }


      // Sidebar render

      return (
        <div className={classNames(styles.Sidebar, { [styles.isCollapsed]: !isSidebarVisible })}>
          <div className={styles.sidebarContent}>
            {/* Show all panels when in sm-lg */}

            <MediaQuery minWidth={ViewportWidth.LG_MIN}>
              {getSidebarPanel(activeSidebarPanel, { media })}
            </MediaQuery>

            {/* Always show the Caption panel when on xs */}

            <MediaQuery maxWidth={ViewportWidth.MD_MAX}>
              <CaptionPanel media={media} />
            </MediaQuery>
          </div>

          {/* Show ads if they're enabled, and if we're on md-lg */}

          {hasAds && (
            <MediaQuery minWidth={ViewportWidth.LG_MIN}>
              <Ad previousMediaId={previousMediaId} />
            </MediaQuery>
          )}
        </div>
      );
    }}
  </MediaOverlayContext.Consumer>
);

export default Sidebar;
