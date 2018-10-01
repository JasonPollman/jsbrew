/**
 * Exports the `isError` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasErrorToStringTag = toStringTagMatcher('[object Error]');
const hasDOMExceptionToStringTag = toStringTagMatcher('[object DOMException]');

/**
 * Determines if the given item is a boolean.
 * @param {any} x The value to assert boolean-ness.
 * @returns {boolean} True if `x` is a boolean, false otherwise.
 * @export
 */
export default function isError(x) {
  return !!x && typeof x === 'object' && (hasErrorToStringTag(x) || hasDOMExceptionToStringTag(x));
}
