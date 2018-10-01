/**
 * Exports the `isString` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasStringToStringTag = toStringTagMatcher('[object String]');

/**
 * Determines if the given item is a string.
 * @param {any} x The value to assert stringy-ness.
 * @returns {boolean} True if `x` is a string, false otherwise.
 * @export
 */
export default function isString(x) {
  return typeof x === 'string' || (typeof x === 'object' && hasStringToStringTag(x));
}
