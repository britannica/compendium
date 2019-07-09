import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import { polyfill } from 'smoothscroll-polyfill';
import styles from './SnapSlider.module.scss';
import SnapSliderArrow from './SnapSliderArrow/SnapSliderArrow';

polyfill(); // todo: remove this after safari supports ScrollToOptions https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy#Browser_Compatibility

const SnapSlider = ({ children, className, scrollTo, initialIndex, selectedIndex, thumbnailWidth }) => {
  const containerRef = useRef();
  const [scrollAmount, setScrollAmount] = useState(null);
  const [trackWidth, setTrackWidth] = useState(null);
  const [position, setPosition] = useState(0);
  /*const [index, setIndex] = useState(initialIndex);*/
  const [thumbnailsPerSlide, setThumbnailsPerSlide] = useState(null);


  // Previous and next click action callbacks

  const previousSlide = useCallback(() => {
    containerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });

    setPosition(containerRef.current.scrollLeft);
  }, [scrollAmount]);

  const nextSlide = useCallback(() => {
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });

    setPosition(containerRef.current.scrollLeft);
  }, [scrollAmount]);


  // Scroll to designated `scrollTo` location

  useEffect(() => {
    containerRef.current.scrollTo({
      left: scrollTo,
    });
  }, [scrollTo]);


  // Set the number of thumbnails are visible per slide

  /*useEffect(() => {
    setThumbnailsPerSlide(Math.floor(scrollAmount / thumbnailWidth));
  }, [scrollAmount, thumbnailWidth]);*/


  // Set the index after the position changes

  /*useEffect(() => {
    setIndex(position / thumbnailWidth);
  }, [position, thumbnailWidth]);*/


  // Automatically trigger a previous/next scroll if the currently selected media is outside of the visible area

  /*useEffect(() => {
    if (selectedIndex < index) {
      console.log('prev', selectedIndex, index);

      previousSlide();
    }

    else if (selectedIndex >= index + thumbnailsPerSlide) {
      console.log('next', selectedIndex, index, thumbnailsPerSlide);

      nextSlide();
    }
  }, [index, selectedIndex, thumbnailsPerSlide, thumbnailWidth, nextSlide, previousSlide]);*/


  // Add event listeners on mount

  useEffect(() => {
    // When the window resizes, set the amount to scroll and the width of the container

    window.addEventListener('resize', debounce(() => {
      setScrollAmount(containerRef.current.clientWidth);
      setTrackWidth(containerRef.current.scrollWidth);
    }, 1000));

    // After scrolling, as well as the end of a drag, set the current left position of the track

    containerRef.current.addEventListener('scroll', debounce(() => {
      setPosition(containerRef.current.scrollLeft);
    }, 200));

    window.addEventListener('dragend', () => {
      setPosition(containerRef.current.scrollLeft);
    });
  }, []);


  // Set the amount to scroll and the width of the container

  useEffect(() => {
    setScrollAmount(containerRef.current.clientWidth);
    setTrackWidth(containerRef.current.scrollWidth);
  }, [containerRef]);

  return (
    <div className={classnames(styles.SnapSlider, className)}>
      <SnapSliderArrow
        className={classnames(styles.arrow, styles.previous, 'd-none d-md-block')}
        onClick={previousSlide}
        disabled={position <= 0}
        icon={faAngleLeft}
      />
      <div className={styles.track} ref={containerRef}>
        {typeof children === 'function' ? children({ scrollAmount, trackWidth }) : children}
      </div>
      <SnapSliderArrow
        className={classnames(styles.arrow, styles.next, 'd-none d-md-block')}
        onClick={nextSlide}
        disabled={position + scrollAmount >= trackWidth}
        icon={faAngleRight}
      />
    </div>
  );
};

SnapSlider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  scrollTo: PropTypes.number,
  selectedIndex: PropTypes.number,
  thumbnailWidth: PropTypes.number,
};

SnapSlider.defaultProps = {
  children: null,
  className: null,
  scrollTo: 0,
  selectedIndex: 0,
  thumbnailWidth: null,
};

export default SnapSlider;
