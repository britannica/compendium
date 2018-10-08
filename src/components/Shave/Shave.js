
import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';
import shave from 'shave';
import ChildrenProp from '../../prop-types/ChildrenProp';

class Shave extends Component {
  ref = createRef();

  componentDidMount() {
    const ref = this.ref.current;
    const { maxHeightPercentage, maxHeight } = this.props;

    let shaveHeight = ref.parentElement.offsetHeight;

    if (maxHeight) {
      shaveHeight = maxHeight;
    }

    else if (maxHeightPercentage) {
      shaveHeight = ref.parentElement.offsetHeight * maxHeightPercentage;
    }

    shave(ref, shaveHeight);
  }

  render() {
    const { children, className, maxHeight, maxHeightPercentage, ...rest } = this.props;

    return (
      <div className={`ReactShave ${className}`} ref={this.ref} {...rest}>
        {children}
      </div>
    );
  }
}

Shave.propTypes = {
  children: ChildrenProp,
  className: PropTypes.string,
  maxHeightPercentage: PropTypes.number,
  maxHeight: PropTypes.number,
};

Shave.defaultProps = {
  children: null,
  className: '',
  maxHeightPercentage: null,
  maxHeight: null,
};

export default Shave;
