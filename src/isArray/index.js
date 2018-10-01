/**
 * Exports the `isArray` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const isArrayInstance = Array.isArray || toStringTagMatcher('[object Array]');

/**
 * Determines if the given item is an array.
 * @param {any} x The value to assert array-ness.
 * @returns {boolean} True if `x` is an array, false otherwise.
 * @export
 */
export default function isArray(x) {
  return !!x && isArrayInstance(x);
}
