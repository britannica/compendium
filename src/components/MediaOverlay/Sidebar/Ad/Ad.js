
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import StringUtils from '../../../../../../mendel/javascript/shared/utils/string-utils';
import styles from './Ad.scss';

class Ad extends Component {
  shouldComponentUpdate(nextProps) {
    const { previousMediaId } = this.props;
    const nextMediaId = nextProps.match.params.mediaId;

    return nextMediaId !== previousMediaId;
  }

  render() {
    return (
      <div className={styles.Ad}>
        <iframe src={`/GPTIframe/ajax/async/NEW_MEDIA_OVERLAY?${StringUtils.uuid()}`} title="advertisement" height="100%" width="100%" />
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
