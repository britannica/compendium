
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './LazyImage.scss';

class LazyImage extends Component {
  ref = React.createRef();
  image = null;
  observer = null;

  constructor(props) {
    super(props);

    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  state = {
    isVisible: false,
    isLoading: false,
    isLoaded: false,
  };


  // --- Lifecycle methods

  componentDidMount() {
    const { container } = this.props;
    const root = document.querySelector(container);

    this.image = this.ref.current;
    this.observer = new IntersectionObserver(entries => entries.forEach(this.handleIntersection), {
      ...(root && { root }),
    });

    this.observer.observe(this.image);
  }

  componentWillUnmount() {
    this.observer.disconnect();
    this.observer = null;

    this.image.removeEventListener('load', this.handleImageLoad);
  }


  // --- Other methods

  handleIntersection(entry) {
    if (entry.isIntersecting) {
      this.setState({
        isVisible: true,
        isLoading: true,
      });

      this.image.addEventListener('load', this.handleImageLoad);

      this.observer.disconnect();
    }
  }

  handleImageLoad() {
    this.setState({
      isLoading: false,
      isLoaded: true,
    });

    this.image.removeEventListener('load', this.handleImageLoad);
  }


  // --- Render method

  render() {
    const { alt, src, height, width } = this.props;
    const { isVisible, isLoaded, isLoading } = this.state;
    const blankImage = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'/%3E';

    return (
      <img
        ref={this.ref}
        src={isVisible ? src : blankImage}
        alt={alt}
        height={height}
        width={width}
        className={classNames([styles.LazyImage, { [styles.isLoaded]: isLoaded }])}
      />
    );
  }
}

LazyImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  container: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

LazyImage.defaultProps = {
  container: null,
  height: null,
  width: null,
};

export default LazyImage;
