/**
 * Exports the `pickBy` function.
 * @since 9/25/18
 * @file
 */

import iteratesCollection from '../internal/iteratesCollection';

/**
 * A function that will `pick` items from a collection per the given iteratee function.
 * Complexity: O(n)
 * @param {Object|Array|String|Map|Set} The collection to pick from.
 * @param {function} iteratee The iteratee function used when picking.
 * @returns {Array} A new object with the selected values.
 */
export default iteratesCollection(Object, (results, iteratee, value, key, collection) => {
  if (iteratee(value, key, collection)) {
    // eslint-disable-next-line no-param-reassign
    results[key] = iteratee(value, key, collection);
  }
});
