/**
 * Exports the `isWeakMap` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasWeakMapToStringTag = toStringTagMatcher('[object WeakMap]');

/**
 * Determines if the given item is a WeakMap instance.
 * @param {any} x The value to assert weak-mappy-ness.
 * @returns {boolean} True if `x` is a WeakMap instance, false otherwise.
 * @export
 */
export default function isWeakMap(x) {
  return !!x && typeof x === 'object' && hasWeakMapToStringTag(x);
}
