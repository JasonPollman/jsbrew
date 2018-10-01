/**
 * Exports the `isNumber` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasNumberToStringTag = toStringTagMatcher('[object Number]');

/**
 * Determines if the given item is a number.
 * @param {any} x The value to assert number-ness.
 * @returns {boolean} True if `x` is a number, false otherwise.
 * @export
 */
export default function isNumber(x) {
  return typeof x === 'number' || (typeof x === 'object' && hasNumberToStringTag(x));
}
