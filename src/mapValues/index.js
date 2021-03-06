/**
 * Exports the `mapValues` function.
 * @since 9/25/18
 * @file
 */

import iteratesCollection from '../internal/iteratesCollection';

/**
 * An iteration function that will take an object, array, string, Map, or Set
 * and return an object with the values mapped per the given iteratee function.
 * @param {Object|Array|String|Map|Set} The collection to iterate.
 * @param {function} iteratee The iteratee function to map the values using.
 * @returns {Object} A new object, with the values mapped.
 */
export default iteratesCollection(Object, (results, iteratee, value, key, collection) => {
  // eslint-disable-next-line no-param-reassign
  results[key] = iteratee(value, key, collection);
});
