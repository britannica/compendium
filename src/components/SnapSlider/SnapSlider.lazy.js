import React, { Fragment, lazy, Suspense } from 'react';

const LazySnapSlider = lazy(() => import('./SnapSlider'));

const SnapSlider = props => (
  <Suspense fallback={<Fragment />}>
    <LazySnapSlider {...props} />
  </Suspense>
);

export default SnapSlider;
