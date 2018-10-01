/**
 * Exports the `isPlainIterable` function.
 * @since 9/25/18
 * @file
 */

import isMap from '../isMap';
import isSet from '../isSet';
import isString from '../isString';
import isObject from '../isObject';

/**
 * Determines if the given item is "iterable". That is a string or object.
 * @param {any} x The value to assert iterable-ness.
 * @returns {boolean} True if `x` is iterable, false otherwise.
 * @export
 */
export default function isIterable(x) {
  return isObject(x) || isString(x) || isMap(x) || isSet(x);
}
