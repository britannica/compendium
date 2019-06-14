import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import { polyfill } from 'smoothscroll-polyfill';
import styles from './SnapSlider.module.scss';
import SnapSliderArrow from './SnapSliderArrow/SnapSliderArrow';

polyfill(); // todo: remove this after safari supports ScrollToOptions https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy#Browser_Compatibility

const SnapSlider = ({ children, className, scrollTo, selectedIndex, thumbnailWidth }) => {
  const containerRef = useRef();
  const [scrollAmount, setScrollAmount] = useState(null);
  const [scrollWidth, setScrollWidth] = useState(null);
  const [position, setPosition] = useState(0);

  // Scroll to designated `scrollTo` location

  useEffect(() => {
    containerRef.current.scrollTo({
      left: scrollTo,
    });
  }, [scrollTo]);

  // Automatically trigger a previous/next scroll if the currently selected media is outside of the visible area

  /*useEffect(() => {
    if (position > selectedIndex * thumbnailWidth) {
      previousSlide();
    }

    if (position + scrollAmount > (selectedIndex * thumbnailWidth) - thumbnailWidth) {
      nextSlide();
    }
  }, [position, selectedIndex, thumbnailWidth, scrollWidth]);*/


  // Add event listeners on mount

  useEffect(() => {
    // When the window resizes, set the amount to scroll and the width of the container

    window.addEventListener('resize', debounce(() => {
      setScrollAmount(containerRef.current.clientWidth);
      setScrollWidth(containerRef.current.scrollWidth);
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
    setScrollWidth(containerRef.current.scrollWidth);
  }, [containerRef, setScrollAmount]);


  // Previous and next click actions

  function previousSlide() {
    containerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  }

  function nextSlide() {
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }

  return (
    <div className={classnames(styles.SnapSlider, className)}>
      <SnapSliderArrow
        className={classnames(styles.arrow, styles.previous, 'd-none d-md-block')}
        onClick={previousSlide}
        disabled={position <= 0}
        icon={faAngleLeft}
      />
      {/* todo: can we replace the track with react-window? animated example https://codesandbox.io/s/k2lpl9m0l3 */}
      <div className={styles.track} ref={containerRef}>
        {children}
      </div>
      <SnapSliderArrow
        className={classnames(styles.arrow, styles.next, 'd-none d-md-block')}
        onClick={nextSlide}
        disabled={position + scrollAmount >= scrollWidth}
        icon={faAngleRight}
      />
    </div>
  );
};

SnapSlider.propTypes = {
  children: PropTypes.node,
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
