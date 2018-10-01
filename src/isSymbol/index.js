/**
 * Exports the `isSymbol` function.
 * @since 9/25/18
 * @file
 */

import toStringTagMatcher from '../internal/toStringTagMatcher';

const hasSymbolToStringTag = toStringTagMatcher('[object Symbol]');

/**
 * Determines if the given item is a symbol.
 * @param {any} x The value to assert symbol-ness.
 * @returns {boolean} True if `x` is a symbol, false otherwise.
 * @export
 */
export default function isBoolean(x) {
  return typeof x === 'symbol' || (typeof x === 'object' && hasSymbolToStringTag(x));
}
