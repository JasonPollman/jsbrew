/**
 * Exports the `toArray` function.
 * @since 9/25/18
 * @file
 */

import iteratesCollection from '../internal/iteratesCollection';

const ArrayFrom = iteratesCollection(Array, (results, iteratee, value) => {
  results.push(value);
});

/**
 * Converts strings, Maps, Sets, Objects, or Arrays to an array.
 * If the given value is an array, it will be "shallow cloned".
 * Complexity: O(n)
 * @param {string|Map|Set|Object} x The value to convert to an array.
 * @returns {Array} The value converted to an Array.
 * @export
 */
export default function toArray(x) {
  return (!x || typeof x === 'number') ? [] : ArrayFrom(x);
}
