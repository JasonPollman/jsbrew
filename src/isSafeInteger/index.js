/**
 * Exports the `isSafeInteger` function.
 * This is based off the MDN polyfill:
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
 * @since 9/25/18
 * @file
 */

import isInteger from '../isInteger';

const isSafeIntegerBase = Number.isSafeInteger || (
  x => isInteger(x) && Math.abs(x) <= Number.MAX_SAFE_INTEGER
);

/**
 * Determines if the given item is an integer.
 * @param {any} x The value to assert.
 * @returns {boolean} True if `x` is an integer, false otherwise.
 * @export
 */
export default function isSafeInteger(x) {
  return isSafeIntegerBase(x);
}
