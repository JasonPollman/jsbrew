/**
 * Exports the `isInteger` function.
 * This is based on the polyfill from MDN:
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
 * @since 9/25/18
 * @file
 */

import isFinite from '../isFinite';

// eslint-disable-next-line no-restricted-globals
const isIntegerBase = Number.isInteger || (x => isFinite(x) && Math.floor(x) === x);

/**
 * Determines if the given item is an integer.
 * @param {any} x The value to assert.
 * @returns {boolean} True if `x` is an integer, false otherwise.
 * @export
 */
export default function isInteger(x) {
  return isIntegerBase(x);
}
