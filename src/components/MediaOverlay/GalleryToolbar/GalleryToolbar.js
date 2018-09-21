
import { faImages, faImage, faPlayCircle, faRectanglePortrait, faVolume } from '@fortawesome/pro-solid-svg-icons';
import { faBullseyePointer } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { MediaType, ViewportWidth } from '../constants';
import { withGalleryContext } from '../Gallery/Gallery.context';
import MediaOverlayContext from '../MediaOverlay.context';
import Toolbar from '../Toolbar/Toolbar';
import styles from '../Toolbar/Toolbar.scss';

const GalleryToolbar = ({ filters, selectedFilter, setSelectedFilter }) => (
  <MediaOverlayContext.Consumer>
    {({ enableMediaView, overlayState: { mediaStrip } }) => (
      <Toolbar
        primaryTools={(
          <Fragment>
            {mediaStrip.length > 0 && (
              <div className={styles.mediaCount}>
                {mediaStrip.length} item{mediaStrip.length === 1 ? '' : 's'}
              </div>
            )}
            <button type="button" onClick={enableMediaView} style={{ display: 'inline-flex' }}>
              <span className="fa-layers fa-fw fa-lg">
                <FontAwesomeIcon icon={faRectanglePortrait} transform="shrink-7 left-7" />
                <FontAwesomeIcon icon={faRectanglePortrait} style={{ border: '1px solid #eee', zIndex: 1 }} />
                <FontAwesomeIcon icon={faRectanglePortrait} transform="shrink-7 right-7" />
              </span>
              View Carousel
            </button>
          </Fragment>
        )}

        secondaryTools={(
          <MediaQuery minWidth={ViewportWidth.SM_MIN}>
            {filters.length > 1 && (
              <Fragment>
                <button type="button" className={classNames({ active: selectedFilter === null })} onClick={() => setSelectedFilter(null)}>
                  <FontAwesomeIcon icon={faImages} size="lg" />
                  All
                </button>
                {filters.includes(MediaType.IMAGE) && (
                  <button type="button" className={classNames({ active: selectedFilter === MediaType.IMAGE })} onClick={() => setSelectedFilter(MediaType.IMAGE)}>
                    <FontAwesomeIcon icon={faImage} size="lg" />
                    Images
                  </button>
                )}
                {filters.includes(MediaType.VIDEO) && (
                  <button type="button" className={classNames({ active: selectedFilter === MediaType.VIDEO })} onClick={() => setSelectedFilter(MediaType.VIDEO)}>
                    <FontAwesomeIcon icon={faPlayCircle} size="lg" />
                    Videos
                  </button>
                )}
                {filters.includes(MediaType.AUDIO) && (
                  <button type="button" className={classNames({ active: selectedFilter === MediaType.AUDIO })} onClick={() => setSelectedFilter(MediaType.AUDIO)}>
                    <FontAwesomeIcon icon={faVolume} size="lg" />
                    Audio
                  </button>
                )}
                {filters.includes(MediaType.INTERACTIVE) && (
                  <button type="button" className={classNames({ active: selectedFilter === MediaType.INTERACTIVE })} onClick={() => setSelectedFilter(MediaType.INTERACTIVE)}>
                    <FontAwesomeIcon icon={faBullseyePointer} size="lg" />
                    Interactives
                  </button>
                )}
              </Fragment>
            )}
          </MediaQuery>
        )}
      />
    )}
  </MediaOverlayContext.Consumer>
);

GalleryToolbar.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.oneOf(Object.values(MediaType))),
  selectedFilter: PropTypes.string,
  setSelectedFilter: PropTypes.func,
};

GalleryToolbar.defaultProps = {
  filters: [],
  selectedFilter: null,
  setSelectedFilter: null,
};

export default withGalleryContext(GalleryToolbar);
