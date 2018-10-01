/**
 * Exports the `isRegExp` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasRegExpToStringTag = toStringTagMatcher('[object RegExp]');

/**
 * Determines if the given item is a RegExp instance.
 * @param {any} x The value to assert regexp-ness.
 * @returns {boolean} True if `x` is a RegExp instance, false otherwise.
 * @export
 */
export default function isRegExp(x) {
  return !!x && typeof x === 'object' && hasRegExpToStringTag(x);
}
