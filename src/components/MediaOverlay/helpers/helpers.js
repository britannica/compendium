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
 * Determine whether the media controls and sidebar can be toggled
 *
 * @returns {boolean}
 */

export const areControlsToggleable = () => window.matchMedia(maxWidth(ViewportWidth.MD_MAX)).matches;
