
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './LazyImage.scss';

// todo: after Edge uses Chromium, see if we can remove the `root` prop. This prop fixes MENDEL-5282 specifically.

const LazyImage = ({ alt, className, height, root, src, width, ...props }) => {
  const blankImage = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'/%3E';
  const ref = useRef();
  const { entry, observeElement } = useIntersectionObserver({ ...(root && { root }) });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (ref.current) {
      observeElement(ref.current);
    }
  }, [observeElement, ref]);

  useEffect(() => {
    if (entry.isIntersecting) {
      setIsLoading(true);
      setIsVisible(true);

      ref.current.addEventListener('load', handleImageLoad);

      //observer.unobserve(ref.current);
    }
  }, [entry]);


  function handleImageLoad() {
    setIsLoading(false);
    setIsLoaded(true);

    ref.current.removeEventListener('load', handleImageLoad);
  }

  return (
    <img
      ref={ref}
      src={isVisible ? src : blankImage}
      alt={alt}
      height={height}
      width={width}
      className={classNames([styles.LazyImage, { [styles.isLoaded]: isLoaded }, className])}
      {...props}
    />
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  root: PropTypes.instanceOf(Element),
  className: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

LazyImage.defaultProps = {
  alt: 'image',
  className: null,
  root: null,
  height: null,
  width: null,
};

export default LazyImage;
