import React, { Fragment, lazy, Suspense } from 'react';

const LazyShave = lazy(() => import('./Shave'));

const Shave = props => (
  <Suspense fallback={<Fragment />}>
    <LazyShave {...props} />
  </Suspense>
);

export default Shave;
