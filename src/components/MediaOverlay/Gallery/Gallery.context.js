
import React, { Component } from 'react';
import ChildrenProp from '../../../prop-types/ChildrenProp';

const DEFAULT_STATE = {
  filters: [],
  selectedFilter: null,
};

const GalleryContext = React.createContext(DEFAULT_STATE);


// --- Provider

export class GalleryProvider extends Component {
  constructor(props) {
    super(props);

    this.setFilters = this.setFilters.bind(this);
    this.setSelectedFilter = this.setSelectedFilter.bind(this);
  }

  state = DEFAULT_STATE;

  setFilters(filters) {
    this.setState({
      filters,
    });
  }

  setSelectedFilter(filter) {
    this.setState({
      selectedFilter: filter,
    });
  }

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
