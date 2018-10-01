/**
 * Exports the `isIterable` function.
 * @since 9/25/18
 * @file
 */

import isString from '../isString';
import isObject from '../isObject';

/**
 * Determines if the given item is "iterable". That is a string or object.
 * @param {any} x The value to assert iterable-ness.
 * @returns {boolean} True if `x` is iterable, false otherwise.
 * @export
 */
export default function isPlainIterable(x) {
  return isObject(x) || isString(x);
}
