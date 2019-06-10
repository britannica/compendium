import React, { lazy, Suspense } from 'react';
import MediaOverlayLoading from '../MediaOverlayLoading/MediaOverlayLoading';

const LazyMediaOverlay = lazy(() => import('./MediaOverlayContainer'));

// Lazy loaded media overlay

const MediaOverlay = props => (
  <Suspense fallback={<MediaOverlayLoading />}>
    <LazyMediaOverlay {...props} />
  </Suspense>
);

export default MediaOverlay;
