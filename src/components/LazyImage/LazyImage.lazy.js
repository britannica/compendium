import React, { Fragment, lazy, Suspense } from 'react';

const LazyLazyImage = lazy(() => import('./LazyImage'));

// Lazy loaded media overlay

const LazyImage = props => (
  <Suspense fallback={<Fragment />}>
    <LazyLazyImage {...props} />
  </Suspense>
);

export default LazyImage;
