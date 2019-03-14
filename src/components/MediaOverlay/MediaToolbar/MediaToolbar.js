import { faCheckSquare, faEnvelope, faInfoCircle, faPrint, faSearchPlus, faTh } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { MediaType, ViewportWidth } from '../../../constants';
import { SidebarPanel } from '../overlay-constants';
import MediaOverlayContext from '../MediaOverlay.context';
import Toolbar from '../Toolbar/Toolbar';
import styles from '../Toolbar/Toolbar.module.scss';

const MediaToolbar = () => (
  <MediaOverlayContext.Consumer>
    {({ overlayState, overlayProps, enableGalleryView, setSidebarPanel }) => {
      const { activeSidebarPanel, localeLabels, assembly, mediaIndex, assemblies, overlayTitle } = overlayState;
      const { CustomTools, EmailPanel, cdn } = overlayProps;

      return (
        <Toolbar
          title={overlayTitle}
          primaryTools={
            <Fragment>
              {assemblies.length > 0 && (
                <div className={styles.mediaCount}>
                  {mediaIndex + 1} / {assemblies.length}
                </div>
              )}
              {assemblies.length > 7 && (
                <button type="button" onClick={enableGalleryView}>
                  <FontAwesomeIcon icon={faTh} size="lg" />
                  <span className="d-none d-sm-inline-block">{localeLabels.VIEW_GALLERY}</span>
                </button>
              )}
            </Fragment>
          }
          secondaryTools={
            <Fragment>
              {assembly.type === MediaType.IMAGE && (
                <Fragment>
                  {assembly.image.largeFilename && (
                    <a
                      data-analytics="MediaOverlay--fullButton"
                      href={cdn + assembly.image.largeFilename}
                      className="hidden-xs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faSearchPlus} size="lg" />
                      <span className="d-none d-sm-inline-block">{localeLabels.VIEW_FULL_SIZE}</span>
                    </a>
                  )}
                  <button
                    className="d-none d-lg-inline-block"
                    data-analytics="MediaOverlay--printButton"
                    type="button"
                    onClick={window.print}
                  >
                    <FontAwesomeIcon icon={faPrint} size="lg" />
                    <span className="d-none d-sm-inline-block">{localeLabels.PRINT}</span>
                  </button>
                </Fragment>
              )}
            </Fragment>
          }
          customTools={CustomTools && <CustomTools {...overlayState} />}
          sidebarPanels={
            <MediaQuery minWidth={ViewportWidth.LG_MIN}>
              <button
                type="button"
                onClick={setSidebarPanel.bind(null, SidebarPanel.CAPTION)}
                className={classNames(styles.panelButton, {
                  [styles.active]: activeSidebarPanel === SidebarPanel.CAPTION,
                })}
              >
                <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                {localeLabels.CAPTION_PANEL}
              </button>
              <button
                type="button"
                onClick={setSidebarPanel.bind(null, SidebarPanel.CITE)}
                className={classNames(styles.panelButton, {
                  [styles.active]: activeSidebarPanel === SidebarPanel.CITE,
                })}
              >
                <FontAwesomeIcon icon={faCheckSquare} size="lg" />
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
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  {localeLabels.EMAIL_PANEL}
                </button>
              )}
            </MediaQuery>
          }
        />
      );
    }}
  </MediaOverlayContext.Consumer>
);

export default MediaToolbar;
