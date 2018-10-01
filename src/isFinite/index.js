/**
 * Exports the `isFinite` function.
 * This is based off the polyfill at MDN:
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#Polyfill
 * @since 9/25/18
 * @file
 */

import isNumber from '../isNumber';
import global from '../internal/global';

// eslint-disable-next-line no-restricted-properties
const isFiniteNumber = Number.isFinite || (x => isNumber(x) && global.isFinite(x));

/**
 * Determines if the given item is a finite number. That is both a number and not Infinity.
 * @param {any} x The value to assert finiteness.
 * @returns {boolean} True if `x` is a finite, false otherwise.
 * @export
 */
export default function isFinite(x) {
  return isFiniteNumber(x);
}
