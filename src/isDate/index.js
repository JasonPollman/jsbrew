/**
 * Exports the `isDate` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasDateToStringTag = toStringTagMatcher('[object Date]');

/**
 * Determines if the given item is a Date object.
 * @param {any} x The value to assert date-ness of.
 * @returns {boolean} True if `x` is a Date instance, false otherwise.
 * @export
 */
export default function isDate(x) {
  return !!x && typeof x === 'object' && hasDateToStringTag(x);
}
