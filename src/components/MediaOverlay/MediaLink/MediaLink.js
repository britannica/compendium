import { compile } from 'path-to-regexp';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withRouter from '../../../hocs/withRouter';

const MediaLink = (props) => {
  const {
    assemblyId,
    basePath,
    params,
    children,
    className,
    onClick,
    style,
  } = props;

  return (
    <Link
      to={compile(basePath)({ ...params, assemblyId })}
      className={className}
      onClick={onClick}
      style={style}
    >
      {children}
    </Link>
  );
};

MediaLink.propTypes = {
  assemblyId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

  // Pass-through props

  basePath: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.shape(),

  // From react-router-dom

  location: PropTypes.shape().isRequired,
  params: PropTypes.shape().isRequired,
};

MediaLink.defaultProps = {
  children: null,
  className: null,
  onClick: null,
  style: null,
};

export default withRouter(MediaLink);
