
export const Locale = {
  'en-us': {
    CAPTION_PANEL: 'Caption',
    CITE_ACCESS_DATE: 'Access Date',
    CITE_PANEL: 'Cite',
    CITE_MEDIA_TITLE: 'Media Title',
    CITE_MEDIA_TYPE: 'Media Type',
    CITE_PUBLISHER: 'Publisher',
    CITE_URL: 'Url',
    CITE_WEBSITE_NAME: 'Website Name',
    CLOSE: 'Close',
    EMAIL: 'Email',
    FILTER_ALL: 'All',
    FILTER_AUDIO: 'Audio',
    FILTER_IMAGES: 'Images',
    FILTER_INTERACTIVES: 'Interactives',
    FILTER_VIDEOS: 'Videos',
    ITEM_SINGULAR: 'item',
    ITEM_PLURAL: 'items',
    PRINT: 'Print',
    VIEW_CAROUSEL: 'View Carousel',
    VIEW_FULL_SIZE: 'View Full-Size',
    VIEW_GALLERY: 'View All',
  },
};


/**
 * Return a Locale object from either a string or an object.
 *
 * Defaults to 'en-us' if something goes wrong.
 *
 * @param {string|object} locale  A string representing a locale type (e.g. 'en-us') or an object that conforms to the Locale properties
 * @returns {object}
 */

export function getLocale(locale) {
  try {
    switch (typeof locale) {
      case 'string':
        return Locale[locale];

      case 'object':
        return locale;

      default:
        return Locale['en-us'];
    }
  }

  catch (error) {
    console.error(error);

    return Locale['en-us'];
  }
}
