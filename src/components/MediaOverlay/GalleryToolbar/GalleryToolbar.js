import { InsertPhoto, PhotoLibrary, PlayCircleFilled, TrackChanges, ViewArray, VolumeUp } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
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
        primaryTools={(
          <>
            {filteredPhotos.length > 0 && (
              <div className={styles.mediaCount}>
                {filteredPhotos.length}{' '}
                {filteredPhotos.length === 1 ? localeLabels.ITEM_SINGULAR : localeLabels.ITEM_PLURAL}
              </div>
            )}
            <button type="button" onClick={enableMediaView}>
              <ViewArray />
              <span className="d-none d-sm-inline-block">{localeLabels.VIEW_CAROUSEL}</span>
            </button>
          </>
        )}
        secondaryTools={(
          <MediaQuery minWidth={ViewportWidth.MD_MIN}>
            {filters.length > 1 && (
              <>
                <button
                  type="button"
                  className={classNames({ [styles.active]: selectedFilter === null })}
                  onClick={() => setSelectedFilter(null)}
                >
                  <PhotoLibrary fontSize="small" />
                  {localeLabels.FILTER_ALL}
                </button>
                {filters.includes(MediaType.IMAGE) && (
                  <button
                    type="button"
                    className={classNames({ [styles.active]: selectedFilter === MediaType.IMAGE })}
                    onClick={() => setSelectedFilter(MediaType.IMAGE)}
                  >
                    <InsertPhoto fontSize="small" />
                    {localeLabels.FILTER_IMAGES}
                  </button>
                )}
                {filters.includes(MediaType.VIDEO) && (
                  <button
                    type="button"
                    className={classNames({ [styles.active]: selectedFilter === MediaType.VIDEO })}
                    onClick={() => setSelectedFilter(MediaType.VIDEO)}
                  >
                    <PlayCircleFilled />
                    {localeLabels.FILTER_VIDEOS}
                  </button>
                )}
                {filters.includes(MediaType.AUDIO) && (
                  <button
                    type="button"
                    className={classNames({ [styles.active]: selectedFilter === MediaType.AUDIO })}
                    onClick={() => setSelectedFilter(MediaType.AUDIO)}
                  >
                    <VolumeUp />
                    {localeLabels.FILTER_AUDIO}
                  </button>
                )}
                {filters.includes(MediaType.INTERACTIVE) && (
                  <button
                    type="button"
                    className={classNames({ [styles.active]: selectedFilter === MediaType.INTERACTIVE })}
                    onClick={() => setSelectedFilter(MediaType.INTERACTIVE)}
                  >
                    <TrackChanges />
                    {localeLabels.FILTER_INTERACTIVES}
                  </button>
                )}
              </>
            )}
          </MediaQuery>
        )}
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
