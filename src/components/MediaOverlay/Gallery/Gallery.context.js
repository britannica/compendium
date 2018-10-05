
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChildrenProp from '../../../prop-types/ChildrenProp';

const DEFAULT_STATE = {
  filteredPhotos: [],
  filters: [],
  photos: [],
  selectedFilter: null,
};

const GalleryContext = React.createContext(DEFAULT_STATE);


// --- Provider

export class GalleryProvider extends Component {
  constructor(props) {
    super(props);

    this.setSelectedFilter = this.setSelectedFilter.bind(this);
  }

  state = DEFAULT_STATE;


  // --- Lifecycle methods

  componentDidMount() {
    // Map `mediaStrip` to a `photos` object which used by react-photo-gallery

    const { mediaStrip } = this.props;

    const photos = mediaStrip.map(media => ({
      ...media,
      key: media.mediaId,
      src: media.thumbnailUrl || '',
      width: media.width || 16,
      height: media.height || 9,
    }));


    // Determine the initial set of filters

    const filters = new Set();

    photos.forEach(photo => filters.add(photo.type));


    // Set state

    this.setState({
      photos,
      filteredPhotos: photos,
      filters: [...filters],
    });
  }


  // --- Custom methods

  setSelectedFilter(filter) {
    const { photos } = this.state;

    const filteredPhotos = photos.filter(photo => (
      photo.type === filter || filter === null
    ));

    this.setState({
      filteredPhotos,
      selectedFilter: filter,
    });
  }


  // --- Render

  render() {
    const { children } = this.props;

    return (
      <GalleryContext.Provider
        value={{
          ...this.state,
          setFilters: this.setFilters,
          setSelectedFilter: this.setSelectedFilter,
        }}
      >
        {children}
      </GalleryContext.Provider>
    );
  }
}

GalleryProvider.propTypes = {
  children: ChildrenProp,
  mediaStrip: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

GalleryProvider.defaultProps = {
  children: null,
};


// --- Consumer HOC

export const withGalleryContext = WrappedComponent => props => (
  <GalleryContext.Consumer>
    {context => <WrappedComponent {...props} {...context} />}
  </GalleryContext.Consumer>
);
