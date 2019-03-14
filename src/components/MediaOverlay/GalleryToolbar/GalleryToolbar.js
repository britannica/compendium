import { faImages, faImage, faPlayCircle, faRectanglePortrait, faVolume } from '@fortawesome/pro-solid-svg-icons';
import { faBullseyePointer } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import { MediaType, ViewportWidth } from '../../../constants';
import { withGalleryContext } from '../Gallery/Gallery.context';
import MediaOverlayContext from '../MediaOverlay.context';
import Toolbar from '../Toolbar/Toolbar';
import styles from '../Toolbar/Toolbar.module.scss';

const GalleryToolbar = ({ filteredPhotos, filters, selectedFilter, setSelectedFilter }) => (
  <MediaOverlayContext.Consumer>
    {({ enableMediaView, overlayState: { localeLabels } }) => (
      <Toolbar
        primaryTools={
          <Fragment>
            {filteredPhotos.length > 0 && (
              <div className={styles.mediaCount}>
                {filteredPhotos.length}{' '}
                {filteredPhotos.length === 1 ? localeLabels.ITEM_SINGULAR : localeLabels.ITEM_PLURAL}
              </div>
            )}
            <button type="button" onClick={enableMediaView} style={{ display: 'inline-flex' }}>
              <span className="fa-layers fa-fw fa-lg">
                <FontAwesomeIcon icon={faRectanglePortrait} transform="shrink-7 left-7" />
                <FontAwesomeIcon icon={faRectanglePortrait} style={{ border: '1px solid #eee', zIndex: 1 }} />
                <FontAwesomeIcon icon={faRectanglePortrait} transform="shrink-7 right-7" />
              </span>
              <span className="d-none d-sm-inline-block">{localeLabels.VIEW_CAROUSEL}</span>
            </button>
          </Fragment>
        }
        secondaryTools={
          <MediaQuery minWidth={ViewportWidth.MD_MIN}>
            {filters.length > 1 && (
              <Fragment>
                <button
                  type="button"
                  className={classNames({ [styles.active]: selectedFilter === null })}
                  onClick={() => setSelectedFilter(null)}
                >
                  <FontAwesomeIcon icon={faImages} size="lg" />
                  {localeLabels.FILTER_ALL}
                </button>
                {filters.includes(MediaType.IMAGE) && (
                  <button
                    type="button"
                    className={classNames({ [styles.active]: selectedFilter === MediaType.IMAGE })}
                    onClick={() => setSelectedFilter(MediaType.IMAGE)}
                  >
                    <FontAwesomeIcon icon={faImage} size="lg" />
                    {localeLabels.FILTER_IMAGES}
                  </button>
                )}
                {filters.includes(MediaType.VIDEO) && (
                  <button
                    type="button"
                    className={classNames({ [styles.active]: selectedFilter === MediaType.VIDEO })}
                    onClick={() => setSelectedFilter(MediaType.VIDEO)}
                  >
                    <FontAwesomeIcon icon={faPlayCircle} size="lg" />
                    {localeLabels.FILTER_VIDEOS}
                  </button>
                )}
                {filters.includes(MediaType.AUDIO) && (
                  <button
                    type="button"
                    className={classNames({ [styles.active]: selectedFilter === MediaType.AUDIO })}
                    onClick={() => setSelectedFilter(MediaType.AUDIO)}
                  >
                    <FontAwesomeIcon icon={faVolume} size="lg" />
                    {localeLabels.FILTER_AUDIO}
                  </button>
                )}
                {filters.includes(MediaType.INTERACTIVE) && (
                  <button
                    type="button"
                    className={classNames({ [styles.active]: selectedFilter === MediaType.INTERACTIVE })}
                    onClick={() => setSelectedFilter(MediaType.INTERACTIVE)}
                  >
                    <FontAwesomeIcon icon={faBullseyePointer} size="lg" />
                    {localeLabels.FILTER_INTERACTIVES}
                  </button>
                )}
              </Fragment>
            )}
          </MediaQuery>
        }
      />
    )}
  </MediaOverlayContext.Consumer>
);

GalleryToolbar.propTypes = {
  filteredPhotos: PropTypes.arrayOf(PropTypes.shape()),
  filters: PropTypes.arrayOf(PropTypes.oneOf(Object.values(MediaType))),
  selectedFilter: PropTypes.string,
  setSelectedFilter: PropTypes.func,
};

GalleryToolbar.defaultProps = {
  filteredPhotos: [],
  filters: [],
  selectedFilter: null,
  setSelectedFilter: null,
};

export default withGalleryContext(GalleryToolbar);
