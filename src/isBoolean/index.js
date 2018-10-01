/**
 * Exports the `isBoolean` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasBooleanToStringTag = toStringTagMatcher('[object Boolean]');

/**
 * Determines if the given item is a boolean.
 * @param {any} x The value to assert boolean-ness.
 * @returns {boolean} True if `x` is a boolean, false otherwise.
 * @export
 */
export default function isBoolean(x) {
  return typeof x === 'boolean' || (typeof x === 'object' && hasBooleanToStringTag(x));
}
