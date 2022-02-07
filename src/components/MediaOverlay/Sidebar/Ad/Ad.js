import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRouter from '../../../../hocs/withRouter';
import styles from './Ad.module.scss';

function randomString() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '');
}

class Ad extends Component {
  shouldComponentUpdate(nextProps) {
    const { previousMediaId } = this.props;
    const nextMediaId = nextProps.match.params.assemblyId;

    return nextMediaId !== previousMediaId;
  }

  render() {
    const { adUrl } = this.props;

    return (
      <div className={styles.Ad}>
        <iframe
          src={`${adUrl}?${randomString()}`}
          title="advertisement"
          height="100%"
          width="100%"
          scrolling="no"
        />
      </div>
    );
  }
}

Ad.propTypes = {
  adUrl: PropTypes.string.isRequired,
  previousMediaId: PropTypes.string,

  // withRouter props

  match: PropTypes.shape().isRequired,
};

Ad.defaultProps = {
  previousMediaId: null,
};

export default withRouter(Ad);
