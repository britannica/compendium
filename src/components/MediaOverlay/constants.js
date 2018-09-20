
import css from './_variables.scss';

export const MediaQuery = {
  BETWEEN: '(min-width: :min) and (max-width: :max)',
  MAX: '(max-width: :max)',
  MIN: '(min-width: :min)',
};

export const MediaType = {
  IMAGE: 'Image',
  VIDEO: 'Video',
  AUDIO: 'Audio',
  INTERACTIVE: 'Interactive',
};

export const OverlayMode = {
  GALLERY_VIEW: 'galleryView',
  MEDIA_VIEW: 'mediaView',
};

export const OverlayType = {
  GALLERY: 'gallery',
  TOPIC: 'topic',
};

export const SidebarPanel = {
  CAPTION: 'caption',
  CITE: 'cite',
};

export const ViewportWidth = {
  XS_MAX: css.screenXsMax,
  SM_MIN: css.screenSmMin,
  SM_MAX: css.screenSmMax,
  MD_MIN: css.screenMdMin,
  MD_MAX: css.screenMdMax,
  LG_MIN: css.screenLgMin,
};
