import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { createRef, useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash-es';
import { polyfill } from 'smoothscroll-polyfill';
import styles from './SnapSlider.module.scss';
import SnapSliderArrow from './SnapSliderArrow/SnapSliderArrow';

polyfill(); // todo: remove this after safari supports ScrollToOptions https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy#Browser_Compatibility

const SnapSlider = ({ children, className, hideArrows, sliderRef, scrollTo, scrollToOnMount }) => {
  const [scrollAmount, setScrollAmount] = useState(null);
  const [trackWidth, setTrackWidth] = useState(null);
  const [position, setPosition] = useState(0);


  // Previous and next click action callbacks

  const previousSlide = useCallback(() => {
    sliderRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  }, [scrollAmount, sliderRef]);

  const nextSlide = useCallback(() => {
    sliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }, [scrollAmount, sliderRef]);


  // On mount

  useEffect(() => {
    // Set the amount to scroll and the width of the track

    setScrollAmount(sliderRef.current.clientWidth);
    setTrackWidth(sliderRef.current.scrollWidth);


    // Do a one-time scroll if the scrollToOnMount prop was passed

    if (scrollToOnMount) {
      sliderRef.current.scrollTo({
        left: scrollToOnMount,
      });
    }


    // --- Event listeners

    // When the window resizes, set the amount to scroll and the width of the container

    window.addEventListener('resize', debounce(() => {
      setScrollAmount(sliderRef.current.clientWidth);
      setTrackWidth(sliderRef.current.scrollWidth);
    }, 200));

    // After scrolling, as well as the end of a drag, set the current left position of the track

    sliderRef.current.addEventListener('scroll', debounce(() => {
      setPosition(sliderRef.current.scrollLeft);
    }, 200));

    window.addEventListener('dragend', () => {
      setPosition(sliderRef.current.scrollLeft);
    });
  }, []);


  // Scroll to designated `scrollTo` location

  useEffect(() => {
    if (scrollTo) {
      sliderRef.current.scrollTo({
        left: scrollTo,
      });
    }
  }, [scrollTo, sliderRef]);

  return (
    <div className={classnames(styles.SnapSlider, className)}>
      {!hideArrows && (
        <SnapSliderArrow
          className={classnames(styles.arrow, styles.previous, 'd-none d-md-block')}
          onClick={previousSlide}
          disabled={position <= 0}
          icon={faAngleLeft}
        />
      )}
      <div className={styles.track} ref={sliderRef}>
        {typeof children === 'function' ? children({ scrollAmount, trackWidth }) : children}
      </div>
      {!hideArrows && (
        <SnapSliderArrow
          className={classnames(styles.arrow, styles.next, 'd-none d-md-block')}
          onClick={nextSlide}
          disabled={position + scrollAmount >= trackWidth}
          icon={faAngleRight}
        />
      )}
    </div>
  );
};

SnapSlider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  hideArrows: PropTypes.bool,
  scrollTo: PropTypes.number,
  scrollToOnMount: PropTypes.number,
  sliderRef: PropTypes.shape(),
};

SnapSlider.defaultProps = {
  children: null,
  className: null,
  hideArrows: false,
  scrollTo: 0,
  scrollToOnMount: null,
  sliderRef: createRef(),
};

export default SnapSlider;
