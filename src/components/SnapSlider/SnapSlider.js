import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import { polyfill } from 'smoothscroll-polyfill';
import ChildrenProp from '../../prop-types/ChildrenProp';
import styles from './SnapSlider.module.scss';
import SnapSliderArrow from './SnapSliderArrow/SnapSliderArrow';

polyfill(); // todo: remove this after safari supports ScrollToOptions https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy#Browser_Compatibility

const SnapSlider = ({ children, scrollTo }) => {
  const containerRef = useRef();
  const [scrollAmount, setScrollAmount] = useState(null);
  const [scrollWidth, setScrollWidth] = useState(null);
  const [position, setPosition] = useState(0);

  // Scroll to designated `scrollTo` location

  useEffect(() => {
    containerRef.current.scrollBy({
      left: scrollTo,
    });
  }, [scrollTo]);


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
    <div className={styles.SnapSlider}>
      <SnapSliderArrow className={classnames(styles.arrow, styles.previous, 'd-none d-md-block')} onClick={previousSlide} disabled={position <= 0} icon={faAngleLeft} />
      <div className={styles.track} ref={containerRef}> {/* todo: can we replace this with react-window? animated example https://codesandbox.io/s/k2lpl9m0l3 */}
        {children}
      </div>
      <SnapSliderArrow className={classnames(styles.arrow, styles.next, 'd-none d-md-block')} onClick={nextSlide} disabled={position + scrollAmount >= scrollWidth} icon={faAngleRight} />
    </div>
  );
};

SnapSlider.propTypes = {
  children: ChildrenProp,
  scrollTo: PropTypes.number,
};

SnapSlider.defaultProps = {
  children: null,
  scrollTo: 0,
};

export default SnapSlider;
