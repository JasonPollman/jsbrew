/**
 * Exports the `isPromise` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasPromiseToStringTag = toStringTagMatcher('[object Promise]');

// Support for non-native promises, bluebird for example.
const isThenable = x => typeof x.then === 'function' && typeof x.catch === 'function';

/**
 * Determines if the given item is a Promise object.
 * That is, if it is a native Promise, or it's `thenable` (contains .then and .catch functions).
 * @param {any} x The value to determine whether or not it's a Promise.
 * @returns {boolean} True if `x` is a Promise, false otherwise.
 * @export
 */
export default function isPromise(x) {
  return !!x && typeof x === 'object' && (hasPromiseToStringTag(x) || isThenable(x));
}
