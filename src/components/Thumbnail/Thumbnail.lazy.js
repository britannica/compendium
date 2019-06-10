import React, { Fragment, lazy, Suspense } from 'react';

const LazyThumbnail = lazy(() => import('./Thumbnail'));

const Thumbnail = props => (
  <Suspense fallback={<Fragment />}>
    <LazyThumbnail {...props} />
  </Suspense>
);

export default Thumbnail;
