import { isPlainObject, map } from 'lodash-es';

export default class ContentfulUtils {
  /**
   * Map a set of Contentful fields to an object
   *
   * @param {string} id       Contentful's entry id
   * @param {object} fields   Fields for the current Entry
   * @param {object} includes The Links/Assets associated with the current Entry
   * @returns {object}
   */

  static mapFieldsToEntry(id, fields, includes) {
    const entry = {};

    Object.entries(fields).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        entry[key] = value.map(link => ContentfulUtils.mapLinkToProperty(includes, link));
      }

      else if (value.sys) {
        entry[key] = ContentfulUtils.mapLinkToProperty(includes, value);
      }

      else {
        entry[key] = value;
        entry.id = id;
      }
    });

    return entry;
  }


  /**
   * Recursively map a Contentful Link to an object property
   *
   * @param {object} includes
   * @param {string} id
   * @param {string} linkType
   * @returns {object}
   */

  static mapLinkToProperty(includes, { sys: { id, linkType } }) {
    const { fields } = includes[linkType].find(({ sys: { id: linkId } }) => id === linkId);

    return ContentfulUtils.mapFieldsToEntry(id, fields, includes);
  }


  /**
   * Parse the response fields for, and filter out, the unresolved link specified by `id`
   *
   * @param {array|object} fields
   * @param {string} id
   * @returns {array|object}
   */

  static excludeUnresolvableFields(fields, id) {
    if (isPlainObject(fields) || Array.isArray(fields)) {
      return map(fields, (value, key, field) => {
        if (isPlainObject(value)) {
          ContentfulUtils.excludeUnresolvableFields(value, id);
        }

        if (Array.isArray(value)) {
          field[key] = value.filter(({ sys }) => sys.id !== id);
        }

        return field;
      });
    }

    return fields;
  }


  // --- Exports

  /**
   * Clean up the response by handling whatever errors the Contentful response contains
   *
   * @param response
   * @returns {{items: *}|*}
   */

  static handleErrors(response) {
    const { errors, items } = response;

    if (!errors) {
      return response;
    }

    errors.forEach(({ sys: { id: errorName }, details: { id } }) => {
      switch (errorName) {
        case 'notResolvable':
        default: {
          items.map(({ fields }) => ContentfulUtils.excludeUnresolvableFields(fields, id));

          break;
        }
      }
    });

    delete response.errors;

    return {
      ...response,
      items,
    };
  }

  /**
   * Map a Contentful response to a more normalized array of objects
   *
   * @param {object} sys
   * @param {object} responseFields
   * @param {array<object>} items
   * @param {object} includes
   * @returns {array<object>}
   */

  static mapResponseToEntries({ sys, fields: responseFields, items, includes }) {
    if (Array.isArray(items)) {
      if (items.length === 0) {
        throw new Error('ContentfulUtils: No results found.');
      }

      return items.map(({ sys, fields }) => ContentfulUtils.mapFieldsToEntry(sys.id, fields, includes));
    }

    return ContentfulUtils.mapFieldsToEntry(sys.id, responseFields, includes);
  }


  /**
   * Transform a multiple entry Contentful response into a single entry Contentful response
   * by omitting the `items` property from the response
   *
   * @param {string} entryId
   * @param {object} fields
   * @param {array<object>} items
   * @param {object} includes
   * @returns {{fields: object, includes: object}}
   */

  static findEntry(entryId, { items, includes }) {
    if (items.length === 0) {
      throw new Error(`ContentfulUtils: Entry "${entryId}" not found.`);
    }

    const { fields } = items.find(item => item.sys.id === entryId);

    return { fields, includes };
  }
}
