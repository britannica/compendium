
import { ViewportWidth } from '../../../constants';
import { maxWidth } from './responsive-helpers';

/**
 * Find the index of the given `mediaId` within the `mediaArray`
 *
 * @param {array} mediaArray
 * @param {string} mediaId
 * @returns {number}
 */

export const findCurrentMediaIndex = (mediaArray, mediaId) => (
  mediaArray.findIndex(media => media.mediaId === parseInt(mediaId))
);


/**
 * Carousel "pagination", gets the index of the slide that will show an entire "page"
 *
 * @param index
 * @param slidesToShow
 * @returns {number}
 */

export const getCarouselIndex = (index, slidesToShow) => (
  Math.floor(index / slidesToShow) * slidesToShow
);


/**
 * Determines the number of slides to show per carousel "page"
 * todo: can we use media queries here somehow?
 *
 * @returns {number}
 */

export const determineSlidesToShow = () => {
  const screenWidth = document.body.clientWidth;

  if (screenWidth >= parseInt(ViewportWidth.XL_MIN)) {
    return 7;
  }

  if (screenWidth >= parseInt(ViewportWidth.LG_MIN) && screenWidth <= parseInt(ViewportWidth.LG_MAX)) {
    return 6;
  }

  return 5;
};


/**
 * Determine whether the media controls and sidebar can be toggled
 *
 * @returns {boolean}
 */

export const areControlsToggleable = () => (
  window.matchMedia(maxWidth(ViewportWidth.MD_MAX)).matches
);
