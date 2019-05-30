import React from 'react';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import { ViewportWidth } from '../../../constants';
import { SidebarPanel } from '../overlay-constants';
import MediaOverlayContext from '../MediaOverlay.context';
import Ad from './Ad/Ad';
import CaptionPanel from './CaptionPanel/CaptionPanel';
import CitePanel from './CitePanel/CitePanel';
import styles from './Sidebar.module.scss';

function getSidebarPanel(panel, assembly, localeLabels, CitePanelAddons, EmailPanel) {
  switch (panel) {
    case SidebarPanel.CITE:
      return <CitePanel assembly={assembly} localeLabels={localeLabels} CitePanelAddons={CitePanelAddons} />;

    case SidebarPanel.EMAIL:
      return <EmailPanel assembly={assembly} />;

    case SidebarPanel.CAPTION:
    default:
      return <CaptionPanel assembly={assembly} />;
  }
}

const Sidebar = () => (
  <MediaOverlayContext.Consumer>
    {({ overlayProps, overlayState }) => {
      const { activeSidebarPanel, isSidebarVisible, localeLabels, assembly, previousMediaId } = overlayState;
      const { hasAds, CitePanelAddons, EmailPanel, SidebarTools } = overlayProps;

      if (!isSidebarVisible) {
        return null;
      }

      // Sidebar render

      return (
        <div className={classNames(styles.Sidebar, { [styles.isCollapsed]: !isSidebarVisible }, 'd-print-none')}>
          <div className={styles.sidebarContent}>
            {/* Show all panels when in sm-lg */}

            <MediaQuery minWidth={ViewportWidth.LG_MIN}>
              {getSidebarPanel(activeSidebarPanel, assembly, localeLabels, CitePanelAddons, EmailPanel)}
            </MediaQuery>

            {/* Always show the Caption panel when on xs */}

            <MediaQuery maxWidth={ViewportWidth.MD_MAX}>
              <CaptionPanel assembly={assembly} />
            </MediaQuery>
          </div>

          {SidebarTools && (
            <div className={styles.SidebarTools}>
              <SidebarTools {...overlayState} />
            </div>
          )}

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
