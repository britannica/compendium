export default class FeatureFlags {
  /**
   * Parse a configuration document down to a set of boolean key/value pairs, or nested boolean key/value pairs
   *
   * @param {object} document
   * @returns {object}
   */

  static configure(document = {}) {
    return Object.entries(document).reduce((acc, [key, node]) => {
      switch (typeof node) {
        case 'boolean':
          acc[key] = node;

          break;

        case 'object':
          // Check to see if it has an $env key and a $default value

          if (Object.keys(node).includes('$env')) {
            let value = node[process.env[node.$env]];

            if (typeof value === 'undefined' && node.$default) {
              value = node.$default;
            }

            acc[key] = value;
          }

          // Otherwise, keep filtering

          else {
            acc[key] = FeatureFlags.configure(node);
          }

          break;

        default:
          break;
      }

      return acc;
    }, {});
  }
}
