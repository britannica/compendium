import { ViewportWidth } from '../../../constants';
import { maxWidth } from './responsive-helpers';

/**
 * Find the index of the given `assemblyId` within the `mediaArray`
 *
 * @param {array} mediaArray
 * @param {string} assemblyId
 * @returns {number}
 */

export const findCurrentMediaIndex = (mediaArray, assemblyId) =>
  mediaArray.findIndex(media => media.assemblyId === parseInt(assemblyId));

/**
 * Carousel "pagination", gets the index of the slide that will show an entire "page"
 *
 * @param index
 * @param slidesToShow
 * @returns {number}
 */

export const getCarouselIndex = (index, slidesToShow) => Math.floor(index / slidesToShow) * slidesToShow;

/**
 * Determines the number of slides to show per carousel "page"
 * todo: can we use media queries here somehow?
 *
 * @returns {number}
 */

export const determineSlidesToShow = () => {
  const { matchMedia } = window;
  const XL_MIN = matchMedia(`(min-width: ${ViewportWidth.XL_MIN})`).matches;
  const LG_MIN = matchMedia(`(min-width: ${ViewportWidth.LG_MIN})`).matches;
  const LG_MAX = matchMedia(`(max-width: ${ViewportWidth.LG_MAX})`).matches;

  if (XL_MIN) {
    return 7;
  }

  if (LG_MIN && LG_MAX) {
    return 6;
  }

  return 5;
};

/**
 * Determine whether the media controls and sidebar can be toggled
 *
 * @returns {boolean}
 */

export const areControlsToggleable = () => window.matchMedia(maxWidth(ViewportWidth.MD_MAX)).matches;
