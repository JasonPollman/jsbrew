/**
 * Exports the `isWeakSet` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasWeakSetToStringTag = toStringTagMatcher('[object WeakSet]');

/**
 * Determines if the given item is a WeakSet instance.
 * @param {any} x The value to assert weak-set-ness.
 * @returns {boolean} True if `x` is a WeakSet instance, false otherwise.
 * @export
 */
export default function isWeakSet(x) {
  return !!x && typeof x === 'object' && hasWeakSetToStringTag(x);
}
