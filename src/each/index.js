/**
 * Exports the `each` function.
 * @since 9/25/18
 * @file
 */

import iteratesCollection from '../internal/iteratesCollection';

/**
 * An iteration function that will take an object, array, string, Map, or Set
 * and iterate over it, returning undefined.
 * Complexity: O(n)
 * @param {Object|Array|String|Map|Set} The collection to iterate.
 * @param {function} iteratee The iteratee function to iterate over.
 * @returns {undefined}
 */
export default iteratesCollection(undefined, (results, iteratee, value, key, collection) => {
  iteratee(value, key, collection);
});
