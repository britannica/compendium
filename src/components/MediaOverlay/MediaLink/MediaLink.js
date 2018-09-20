
import pathToRegexp from 'path-to-regexp';
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const MediaLink = ({ mediaId, match: { path, params }, children, className, onClick, style }) => (
  <Link to={pathToRegexp.compile(path)({ ...params, mediaId })} className={className} onClick={onClick} style={style}>
    {children}
  </Link>
);

MediaLink.propTypes = {
  mediaId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

  // Pass-through props

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.shape(),

  // From react-router-dom

  match: PropTypes.shape().isRequired,
};

MediaLink.defaultProps = {
  children: null,
  className: null,
  onClick: null,
  style: null,
};

export default withRouter(MediaLink);
