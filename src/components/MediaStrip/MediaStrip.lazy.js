import React, { Fragment, lazy, Suspense } from 'react';

const LazyMediaStrip = lazy(() => import('./MediaStrip'));

// Lazy loaded media overlay

const MediaStrip = props => (
  <Suspense fallback={<Fragment />}>
    <LazyMediaStrip {...props} />
  </Suspense>
);

export default MediaStrip;
