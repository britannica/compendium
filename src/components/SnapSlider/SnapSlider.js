
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component, createRef } from 'react';
import styles from './SnapSlider.scss';
import ChildrenProp from '../../prop-types/ChildrenProp';

class SnapSlider extends Component {
  slidesRef = createRef();

  constructor(props) {
    super(props);

    this.handleNextSlideClick = this.handleNextSlideClick.bind(this);
    this.handlePreviousSlideClick = this.handlePreviousSlideClick.bind(this);
  }

  handlePreviousSlideClick() {
    this.slidesRef.current.scrollBy({
      left: -this.slidesRef.current.clientWidth,
      behavior: 'smooth',
    });
  }

  handleNextSlideClick() {
    this.slidesRef.current.scrollBy({
      left: this.slidesRef.current.clientWidth,
      behavior: 'smooth',
    });
  }

  render() {
    const { children } = this.props;

    return (
      <div className={styles.SnapSlider}>
        <button type="button" className={classNames(styles.control, styles.prev)} onClick={this.handlePreviousSlideClick}>
          <FontAwesomeIcon icon={faAngleLeft} size="4x" />
        </button>
        <button type="button" className={classNames(styles.control, styles.next)} onClick={this.handleNextSlideClick}>
          <FontAwesomeIcon icon={faAngleRight} size="4x" />
        </button>
        <div className={styles.slides} ref={this.slidesRef}>
          {children}
        </div>
      </div>
    );
  }
}

SnapSlider.propTypes = {
  children: ChildrenProp,
};

SnapSlider.defaultProps = {
  children: null,
};

export default SnapSlider;
