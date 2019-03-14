import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Video from './Video';

class VideoContainer extends Component {
  shouldComponentUpdate(nextProps) {
    const { previousMediaId } = this.props;
    const nextMediaId = nextProps.match.params.assemblyId;

    return nextMediaId !== previousMediaId;
  }

  render() {
    return <Video {...this.props} />;
  }
}

VideoContainer.propTypes = {
  previousMediaId: PropTypes.string,

  // withRouter props

  match: PropTypes.shape(),
};

VideoContainer.defaultProps = {
  match: null,
  previousMediaId: null,
};

export default withRouter(VideoContainer);
