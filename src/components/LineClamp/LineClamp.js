import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './LineClamp.module.scss';

const LineClamp = ({ children, className, lines, tag: Tag, ...props }) => (
  <Tag className={classnames(styles.LineClamp, className)} data-testid="LineClamp" style={{ lineClamp: lines, WebkitLineClamp: lines }} {...props}>
    {children}
  </Tag>
);

LineClamp.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  lines: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tag: PropTypes.node,
};

LineClamp.defaultProps = {
  children: null,
  className: null,
  lines: 'none',
  tag: 'div',
};

export default LineClamp;
