import { compile } from 'path-to-regexp';

export default class RouteUtils {
  /**
   * Dynamically generates a set of routes from the values inside of a path map.
   *
   * For example:
   * generateRoutes({ VIEW_QUESTION: '/question/:questionId' })
   *
   * Returns:
   * {
   *   VIEW_QUESTION: {
   *     path: '/question/:questionId',
   *     toLink({ questionId })
   *   }
   * }
   *
   * assert(VIEW_QUESTION.path === '/question/:questionId')
   * assert(VIEW_QUESTION.toLink({ questionId: 123 }) === '/question/123')
   *
   * @param {object<key, path>} pathMap
   * @returns {object<key, object<path, toLink>>}
   */

  static generateRoutes(pathMap) {
    const routes = {};

    Object.entries(pathMap).forEach(([key, path]) => {
      routes[key] = {
        path,
        toLink: compile(path),
      };
    });

    return routes;
  }
}
