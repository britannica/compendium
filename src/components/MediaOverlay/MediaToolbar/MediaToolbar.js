import { Apps, CheckBox, Info, Mail, Print } from '@material-ui/icons';
import classNames from 'classnames';
import React from 'react';
import MediaQuery from 'react-responsive';
import { MediaType, ViewportWidth } from '../../../constants';
import { SidebarPanel } from '../overlay-constants';
import MediaOverlayContext from '../MediaOverlay.context';
import Toolbar from '../Toolbar/Toolbar';
import styles from '../Toolbar/Toolbar.module.scss';
import FullSizeButton from './FullSizeButton/FullSizeButton';

const MediaToolbar = () => (
  <MediaOverlayContext.Consumer>
    {({ overlayState, overlayProps, enableGalleryView, setSidebarPanel }) => {
      const { activeSidebarPanel, localeLabels, assembly, mediaIndex, assemblies, overlayTitle } = overlayState;
      const { CustomTools, EmailPanel } = overlayProps;

      return (
        <Toolbar
          title={overlayTitle}
          primaryTools={(
            <>
              {assemblies.length > 0 && (
                <div className={styles.mediaCount}>
                  {mediaIndex + 1} / {assemblies.length}
                </div>
              )}
              {assemblies.length > 7 && (
                <button type="button" onClick={enableGalleryView}>
                  <Apps />
                  <span className="d-none d-sm-inline-block">{localeLabels.VIEW_GALLERY}</span>
                </button>
              )}
            </>
          )}
          secondaryTools={(
            <>
              {assembly.type === MediaType.INTERACTIVE && (
                <FullSizeButton url={assembly.interactive.filename} />
              )}
              {assembly.type === MediaType.IMAGE && (
                <>
                  {assembly.image.largeFilename && (
                    <FullSizeButton url={assembly.image.largeFilename} />
                  )}
                  <button
                    className="d-none d-lg-inline-block"
                    data-analytics="MediaOverlay--printButton"
                    type="button"
                    onClick={window.print}
                  >
                    <Print />
                    <span className="d-none d-sm-inline-block">{localeLabels.PRINT}</span>
                  </button>
                </>
              )}
            </>
          )}
          customTools={CustomTools && <CustomTools {...overlayState} />}
          sidebarPanels={(
            <MediaQuery minWidth={ViewportWidth.LG_MIN}>
              <button
                type="button"
                onClick={setSidebarPanel.bind(null, SidebarPanel.CAPTION)}
                className={classNames(styles.panelButton, {
                  [styles.active]: activeSidebarPanel === SidebarPanel.CAPTION,
                })}
              >
                <Info fontSize="small" />
                {localeLabels.CAPTION_PANEL}
              </button>
              <button
                type="button"
                onClick={setSidebarPanel.bind(null, SidebarPanel.CITE)}
                className={classNames(styles.panelButton, {
                  [styles.active]: activeSidebarPanel === SidebarPanel.CITE,
                })}
              >
                <CheckBox fontSize="small" />
                {localeLabels.CITE_PANEL}
              </button>
              {EmailPanel && (
                <button
                  type="button"
                  onClick={setSidebarPanel.bind(null, SidebarPanel.EMAIL)}
                  className={classNames(styles.panelButton, {
                    [styles.active]: activeSidebarPanel === SidebarPanel.EMAIL,
                  })}
                >
                  <Mail />
                  {localeLabels.EMAIL_PANEL}
                </button>
              )}
            </MediaQuery>
          )}
        />
      );
    }}
  </MediaOverlayContext.Consumer>
);

export default MediaToolbar;
