import React, { Children, Fragment, cloneElement, createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// https://github.com/facebook/react/issues/8873

const IntersectionObserver = ({ children }) => {
  //const [children, setChildren] = useState(originalChildren);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const n = [];

    Children.map(children, child => (
      cloneElement(child, {
        ref: node => n.push(node),
      })
    ));

    setNodes(n);
  }, [children]);

  console.log(nodes);

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

IntersectionObserver.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

IntersectionObserver.defaultProps = {
  children: [],
};

export default IntersectionObserver;
