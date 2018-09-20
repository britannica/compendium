
import React from 'react';
import classNames from 'classnames';
import Responsive from 'react-responsive';
import { SidebarPanel, ViewportWidth } from '../constants';
import MediaOverlayContext from '../MediaOverlay.context';
import './Sidebar.scss';
import Ad from './Ad/Ad';
import CaptionPanel from './CaptionPanel/CaptionPanel';
import CitePanel from './CitePanel/CitePanel';

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
        <div className={classNames('MediaOverlay--sidebar', { isCollapsed: !isSidebarVisible })}>
          <div className="sidebar-content">
            {/* Show all panels when in sm-lg */}

            <Responsive minWidth={ViewportWidth.MD_MIN}>
              {getSidebarPanel(activeSidebarPanel, { media })}
            </Responsive>

            {/* Always show the Caption panel when on xs */}

            <Responsive maxWidth={ViewportWidth.SM_MAX}>
              <CaptionPanel media={media} />
            </Responsive>
          </div>

          {/* Show ads if they're enabled, and if we're on md-lg */}

          {hasAds && (
            <Responsive minWidth={ViewportWidth.MD_MIN}>
              <Ad previousMediaId={previousMediaId} />
            </Responsive>
          )}
        </div>
      );
    }}
  </MediaOverlayContext.Consumer>
);

export default Sidebar;
