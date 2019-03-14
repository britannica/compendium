import css from './_variables.scss';

export const MediaQuery = {
  BETWEEN: '(min-width: :min) and (max-width: :max)',
  MAX: '(max-width: :max)',
  MIN: '(min-width: :min)',
};

export const MediaType = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  INTERACTIVE: 'interactive',
};

export const ViewportWidth = {
  XS_MAX: css.screenXsMax,
  SM_MIN: css.screenSmMin,
  SM_MAX: css.screenSmMax,
  MD_MIN: css.screenMdMin,
  MD_MAX: css.screenMdMax,
  LG_MIN: css.screenLgMin,
  LG_MAX: css.screenLgMax,
  XL_MIN: css.screenXlMin,
};
