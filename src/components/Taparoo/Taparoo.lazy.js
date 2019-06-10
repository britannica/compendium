import React, { Fragment, lazy, Suspense } from 'react';

const LazyTaparoo = lazy(() => import('./Taparoo'));

const Taparoo = props => (
  <Suspense fallback={<Fragment />}>
    <LazyTaparoo {...props} />
  </Suspense>
);

export default Taparoo;
