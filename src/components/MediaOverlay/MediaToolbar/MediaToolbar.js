
import { faCheckSquare, faInfoCircle, faPrint, faSearchPlus, faTh } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom';
import { MediaType, SidebarPanel, ViewportWidth } from '../constants';
import MediaOverlayContext from '../MediaOverlay.context';
import Toolbar from '../Toolbar/Toolbar';
import styles from '../Toolbar/Toolbar.scss';

const MediaToolbar = ({ match: { params: { stripId, mediaId } } }) => (
  <MediaOverlayContext.Consumer>
    {({ overlayState, overlayProps, enableGalleryView, setSidebarPanel }) => {
      const {
        activeSidebarPanel,
        media,
        mediaIndex,
        mediaStrip,
      } = overlayState;

      const {
        type,
      } = overlayProps;

      return (
        <Toolbar
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
                  View Gallery
                </button>
              )}
            </Fragment>
          )}

          secondaryTools={(
            <Fragment>
              {media.type === MediaType.IMAGE && (
                <Fragment>
                  {media.expandable && (
                    <a href={`/media/full/${type}/${stripId}/${mediaId}`} className="hidden-xs" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faSearchPlus} size="lg" />
                      View Full-Size
                    </a>
                  )}
                  <a href={`/media/print/${type}/${stripId}/${mediaId}`} className="hidden-xs" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faPrint} size="lg" />
                    Print
                  </a>
                </Fragment>
              )}
            </Fragment>
          )}

          sidebarTools={(
            <MediaQuery minWidth={ViewportWidth.LG_MIN}>
              <button type="button" onClick={setSidebarPanel.bind(null, SidebarPanel.CAPTION)} className={classNames(styles.panelButton, { [styles.active]: activeSidebarPanel === SidebarPanel.CAPTION })}>
                <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                Caption
              </button>
              <button type="button" onClick={setSidebarPanel.bind(null, SidebarPanel.CITE)} className={classNames(styles.panelButton, { [styles.active]: activeSidebarPanel === SidebarPanel.CITE })}>
                <FontAwesomeIcon icon={faCheckSquare} size="lg" />
                Cite
              </button>
            </MediaQuery>
          )}
        />
      );
    }}
  </MediaOverlayContext.Consumer>
);

export default withRouter(MediaToolbar);
