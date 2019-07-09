import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import { polyfill } from 'smoothscroll-polyfill';
import styles from './SnapSlider.module.scss';
import SnapSliderArrow from './SnapSliderArrow/SnapSliderArrow';

polyfill(); // todo: remove this after safari supports ScrollToOptions https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy#Browser_Compatibility

const SnapSlider = ({ children, className, scrollTo }) => {
  const containerRef = useRef();
  const [scrollAmount, setScrollAmount] = useState(null);
  const [trackWidth, setTrackWidth] = useState(null);
  const [position, setPosition] = useState(0);


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


  // After mounting, set the amount to scroll and the width of the track

  useEffect(() => {
    setScrollAmount(containerRef.current.clientWidth);
    setTrackWidth(containerRef.current.scrollWidth);
  }, [containerRef]);


  // Scroll to designated `scrollTo` location

  useEffect(() => {
    containerRef.current.scrollTo({
      left: scrollTo,
    });
  }, [scrollTo]);


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
};

SnapSlider.defaultProps = {
  children: null,
  className: null,
  scrollTo: 0,
};

export default SnapSlider;
