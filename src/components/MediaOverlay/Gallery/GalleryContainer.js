
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Gallery from './Gallery';
import { withGalleryContext } from './Gallery.context';

class GalleryContainer extends Component {
  constructor(props) {
    super(props);

    this.determineFilters = this.determineFilters.bind(this);
    this.mapMediaStripToPhotos = this.mapMediaStripToPhotos.bind(this);
  }

  state = {
    filteredPhotos: [],
    photos: [],
  };


  // --- Lifecycle methods

  static getDerivedStateFromProps(props, state) {
    const { selectedFilter } = props;
    const { photos } = state;

    const filteredPhotos = photos.filter(photo => (
      photo.type === selectedFilter || selectedFilter === null
    ));

    return {
      filteredPhotos,
    };
  }

  componentDidMount() {
    // Map media strip thumbnails to photo object

    const { mediaStrip } = this.props;

    this.mapMediaStripToPhotos(mediaStrip);
  }


  // --- Custom methods

  determineFilters(photos) {
    const { setFilters } = this.props;
    const filters = new Set();

    photos.forEach(photo => filters.add(photo.type));

    setFilters([...filters]);
  }

  mapMediaStripToPhotos(mediaStrip) {
    const photos = mediaStrip.map(media => ({
      ...media,
      key: media.mediaId,
      src: media.thumbnailUrl || '',
      width: media.width || 16,
      height: media.height || 9,
    }));

    this.setState({
      photos,
      filteredPhotos: photos,
    });

    this.determineFilters(photos);
  }


  // --- Render method

  render() {
    const { onMediaClick } = this.props;
    const { filteredPhotos } = this.state;

    return <Gallery onMediaClick={onMediaClick} photos={filteredPhotos} />;
  }
}

GalleryContainer.propTypes = {
  mediaStrip: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onMediaClick: PropTypes.func,

  // Props passed from Gallery Context

  selectedFilter: PropTypes.string,
  setFilters: PropTypes.func.isRequired,
};

GalleryContainer.defaultProps = {
  onMediaClick: null,
  selectedFilter: null,
};

export default withGalleryContext(GalleryContainer);
