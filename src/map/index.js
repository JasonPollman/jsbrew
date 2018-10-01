/**
 * Exports the `map` function.
 * @since 9/25/18
 * @file
 */

import iteratesCollection from '../internal/iteratesCollection';

/**
 * An iteration function that will take an object, array, string, Map, or Set
 * and return an Array of the values mapped according to `iteratee`.
 * Complexity: O(n)
 * @param {Object|Array|String|Map|Set} The collection to iterate.
 * @param {function} iteratee The iteratee function to `map` over.
 * @returns {Array} A new array with the values mapped.
 */
export default iteratesCollection(Array, (results, iteratee, value, key, collection) => {
  results.push(iteratee(value, key, collection));
});
