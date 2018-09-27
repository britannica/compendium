
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './Ad.scss';

function randomString() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '');
}

class Ad extends Component {
  shouldComponentUpdate(nextProps) {
    const { previousMediaId } = this.props;
    const nextMediaId = nextProps.match.params.mediaId;

    return nextMediaId !== previousMediaId;
  }

  render() {
    return (
      <div className={styles.Ad}>
        <iframe src={`/GPTIframe/ajax/async/NEW_MEDIA_OVERLAY?${randomString()}`} title="advertisement" height="100%" width="100%" />
      </div>
    );
  }
}

Ad.propTypes = {
  previousMediaId: PropTypes.string,

  // withRouter props

  match: PropTypes.shape().isRequired,
};

Ad.defaultProps = {
  previousMediaId: null,
};

export default withRouter(Ad);
