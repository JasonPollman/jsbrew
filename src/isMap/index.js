/**
 * Exports the `isMap` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasMapToStringTag = toStringTagMatcher('[object Map]');

/**
 * Determines if the given item is a Map instance.
 * @param {any} x The value to assert mappy-ness.
 * @returns {boolean} True if `x` is a Map instance, false otherwise.
 * @export
 */
export default function isMap(x) {
  return !!x && typeof x === 'object' && hasMapToStringTag(x);
}
