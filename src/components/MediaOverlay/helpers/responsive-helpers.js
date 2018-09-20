
// --- Media Queries

import { MediaQuery } from '../constants';

const matchedMedia = [];


/**
 * Fire `callback` when `query` matches
 *
 * @param {string} query
 * @param {function} callback
 */

export const onMediaQueryMatch = (query, callback) => {
  const matchMedia = window.matchMedia(query);

  if (matchMedia.matches) {
    callback(query);
  }

  matchMedia.onchange = () => {
    if (matchMedia.matches) {
      callback(query);
    }
  };

  matchedMedia.push(matchMedia);
};


/**
 * Perform `callback` on a set of media queries
 *
 * @param {array<string>} queries
 * @param {function} callback
 */

export const onMediaQueriesMatch = (queries, callback) => {
  queries.forEach(query => onMediaQueryMatch(query, callback));
};


/**
 * Remove listeners from a all media queries
 */

export const removeMediaQueryListeners = () => {
  matchedMedia.forEach((matchMedia) => {
    matchMedia.onchange = null;
  });

  matchedMedia.length = 0;
};


/**
 * Constructs a (min-width: $size) media query
 *
 * @param viewportSize
 * @returns {string}
 */

export const minWidth = viewportSize => (
  MediaQuery.MIN.replace(':min', viewportSize)
);


/**
 * Constructs a (max-width: $size) media query
 *
 * @param viewportSize
 * @returns {string}
 */

export const maxWidth = viewportSize => (
  MediaQuery.MAX.replace(':max', viewportSize)
);


/**
 * Constructs a (min-width: $minSize) and (max-width: $maxSize) media query
 *
 * @param min
 * @param max
 * @returns {string}
 */

export const betweenWidths = (min, max) => (
  MediaQuery.BETWEEN
    .replace(':min', min)
    .replace(':max', max)
);


/**
 * Shortcut for adding a listener on a minWidth query
 *
 * @param viewportSize
 * @param callback
 */

export const onMinWidth = (viewportSize, callback) => {
  onMediaQueryMatch(minWidth(viewportSize), callback);
};


/**
 * Shortcut for adding a listener on a maxWidth query
 *
 * @param viewportSize
 * @param callback
 */

export const onMaxWidth = (viewportSize, callback) => {
  onMediaQueryMatch(maxWidth(viewportSize), callback);
};


/**
 * Shortcut for adding a listener on a betweenWidths query
 *
 * @param min
 * @param max
 * @param callback
 */

export const onBetweenWidths = (min, max, callback) => {
  onMediaQueryMatch(betweenWidths(min, max), callback);
};
