/**
 * Exports the `isSet` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasSetToStringTag = toStringTagMatcher('[object Set]');

/**
 * Determines if the given item is a Set instance.
 * @param {any} x The value to assert set-ness.
 * @returns {boolean} True if `x` is a Set instance, false otherwise.
 * @export
 */
export default function isSet(x) {
  return !!x && typeof x === 'object' && hasSetToStringTag(x);
}
