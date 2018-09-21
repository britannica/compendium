
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Taparoo extends Component {
  static SwipeDirection = {
    UP: 'swipeUp',
    DOWN: 'swipeDown',
    LEFT: 'swipeLeft',
    RIGHT: 'swipeRight',
  };

  constructor(props) {
    super(props);

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.detectSwipes = this.detectSwipes.bind(this);
  }

  state = {
    touchMoved: false,
    startX: 0,
    startY: 0,
  };

  handleTouchStart(event) {
    const { clientX, clientY } = event.touches[0];

    this.setState({
      startX: clientX,
      startY: clientY,
    });
  }

  handleTouchMove() {
    const { touchMoved } = this.state;

    if (!touchMoved) {
      this.setState({
        touchMoved: true,
      });
    }
  }

  handleTouchEnd(event) {
    const { onTap } = this.props;
    const { touchMoved } = this.state;

    if (!touchMoved) {
      onTap(event);
    }

    this.detectSwipes(event);

    this.setState({
      touchMoved: false,
      startX: 0,
      startY: 0,
    });
  }

  detectSwipes(event) {
    const { swipeThreshold, onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } = this.props;
    const { startX, startY } = this.state;
    const { clientX, clientY } = event.changedTouches[0];
    const deltaX = startX - clientX;
    const deltaY = startY - clientY;
    const swipes = [];


    // Horizontal swipe

    if (deltaX > swipeThreshold) {
      swipes.push(Swipe.LEFT);

      onSwipeLeft(event);
    }

    else if (deltaX < -swipeThreshold) {
      swipes.push(Swipe.RIGHT);

      onSwipeRight(event);
    }


    // Vertical swipe

    if (deltaY > swipeThreshold) {
      swipes.push(Swipe.UP);

      onSwipeUp(event);
    }

    else if (deltaY < -swipeThreshold) {
      swipes.push(Swipe.DOWN);

      onSwipeDown(event);
    }


    // General, horizontal or vertical, swipe

    if (swipes.length > 0) {
      onSwipe(swipes, event);
    }
  }

  render() {
    const { children, className } = this.props;

    return (
      <div onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} className={className}>
        {children}
      </div>
    );
  }
}

Taparoo.propTypes = {
  swipeThreshold: PropTypes.number,
  onSwipe: PropTypes.func,
  onSwipeUp: PropTypes.func,
  onSwipeDown: PropTypes.func,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
  onTap: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.bool,
      ]),
    ),
    PropTypes.element,
    PropTypes.string,
    PropTypes.bool,
  ]),
};

const noOp = () => {};

Taparoo.defaultProps = {
  swipeThreshold: 40,
  onSwipe: noOp,
  onSwipeUp: noOp,
  onSwipeDown: noOp,
  onSwipeLeft: noOp,
  onSwipeRight: noOp,
  onTap: noOp,
  children: null,
  className: null,
};

export default Taparoo;
