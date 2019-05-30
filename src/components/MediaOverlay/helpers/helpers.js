import { ViewportWidth } from '../../../constants';
import { maxWidth } from './responsive-helpers';

/**
 * Find the index of the given `assemblyId` within the `mediaArray`
 *
 * @param {array<object>} assemblies
 * @param {string} assemblyId
 * @returns {number}
 */

export const findCurrentMediaIndex = (assemblies, assemblyId) => (
  assemblies.findIndex(assembly => assembly.assemblyId === parseInt(assemblyId))
);

/**
 * Determine whether the media controls and sidebar can be toggled
 *
 * @returns {boolean}
 */

export const areControlsToggleable = () => window.matchMedia(maxWidth(ViewportWidth.MD_MAX)).matches;
