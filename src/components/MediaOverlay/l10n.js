import { MediaType } from '../../constants';

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
    EMAIL_PANEL: 'Email',
    ERROR: 'Unable to load media.',
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
    MediaType: {
      [MediaType.AUDIO]: 'audio',
      [MediaType.IMAGE]: 'image',
      [MediaType.INTERACTIVE]: 'interactive',
      [MediaType.VIDEO]: 'video',
    },
  },
  'pt-br': {
    CAPTION_PANEL: 'Legenda',
    CITE_ACCESS_DATE: 'Data do acesso',
    CITE_PANEL: 'Citar',
    CITE_MEDIA_TITLE: 'Título do recurso',
    CITE_MEDIA_TYPE: 'Tipo de recurso',
    CITE_PUBLISHER: 'Editor',
    CITE_URL: 'Url',
    CITE_WEBSITE_NAME: 'Nome do site',
    CLOSE: 'Close',
    EMAIL_PANEL: 'Enviar',
    ERROR: 'Ops! Não foi possível carregar o recurso. Tente outra vez.',
    FAVORITE: 'Favoritos',
    FILTER_ALL: 'Tudo',
    FILTER_AUDIO: 'Áudios',
    FILTER_IMAGES: 'Imagens',
    FILTER_INTERACTIVES: 'Interactives',
    FILTER_VIDEOS: 'Vídeos',
    ITEM_SINGULAR: 'item',
    ITEM_PLURAL: 'itens',
    PRINT: 'Imprimir',
    VIEW_CAROUSEL: 'Ver carrossel',
    VIEW_FULL_SIZE: 'Ver imagem ampliada',
    VIEW_GALLERY: 'Ver tudo',
    MediaType: {
      [MediaType.AUDIO]: 'áudio',
      [MediaType.IMAGE]: 'imagem',
      [MediaType.INTERACTIVE]: 'interactive',
      [MediaType.VIDEO]: 'vídeo',
    },
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
