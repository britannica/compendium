
import { faCheckSquare, faInfoCircle, faPrint, faSearchPlus, faTh } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom';
import { MediaType, ViewportWidth } from '../../../constants';
import { SidebarPanel } from '../overlay-constants';
import MediaOverlayContext from '../MediaOverlay.context';
import Toolbar from '../Toolbar/Toolbar';
import styles from '../Toolbar/Toolbar.scss';

const MediaToolbar = ({ match: { params: { stripId, mediaId } } }) => (
  <MediaOverlayContext.Consumer>
    {({ overlayState, overlayProps, enableGalleryView, setSidebarPanel }) => {
      const {
        activeSidebarPanel,
        localeLabels,
        media,
        mediaIndex,
        mediaStrip,
        overlayTitle,
      } = overlayState;

      const {
        CustomTools,
        type,
      } = overlayProps;

      return (
        <Toolbar
          title={overlayTitle}
          primaryTools={(
            <Fragment>
              {mediaStrip.length > 0 && (
                <div className={styles.mediaCount}>
                  {mediaIndex + 1} / {mediaStrip.length}
                </div>
              )}
              {mediaStrip.length > 7 && (
                <button type="button" onClick={enableGalleryView}>
                  <FontAwesomeIcon icon={faTh} size="lg" />
                  {localeLabels.VIEW_GALLERY}
                </button>
              )}
            </Fragment>
          )}

          secondaryTools={(
            <Fragment>
              {media.type === MediaType.IMAGE && (
                <Fragment>
                  {media.expandable && (
                    <a data-analytics="MediaOverlay--fullButton" href={`/media/full/${type}/${stripId}/${mediaId}`} className="hidden-xs" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faSearchPlus} size="lg" />
                      {localeLabels.VIEW_FULL_SIZE}
                    </a>
                  )}
                  <a data-analytics="MediaOverlay--printButton" href={`/media/print/${type}/${stripId}/${mediaId}`} className="hidden-xs" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faPrint} size="lg" />
                    {localeLabels.PRINT}
                  </a>
                </Fragment>
              )}
            </Fragment>
          )}

          customTools={<CustomTools {...overlayState} />}

          sidebarPanels={(
            <MediaQuery minWidth={ViewportWidth.LG_MIN}>
              <button type="button" onClick={setSidebarPanel.bind(null, SidebarPanel.CAPTION)} className={classNames(styles.panelButton, { [styles.active]: activeSidebarPanel === SidebarPanel.CAPTION })}>
                <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                {localeLabels.CAPTION_PANEL}
              </button>
              <button type="button" onClick={setSidebarPanel.bind(null, SidebarPanel.CITE)} className={classNames(styles.panelButton, { [styles.active]: activeSidebarPanel === SidebarPanel.CITE })}>
                <FontAwesomeIcon icon={faCheckSquare} size="lg" />
                {localeLabels.CITE_PANEL}
              </button>
            </MediaQuery>
          )}
        />
      );
    }}
  </MediaOverlayContext.Consumer>
);

export default withRouter(MediaToolbar);
