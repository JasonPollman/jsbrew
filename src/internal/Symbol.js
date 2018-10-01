/**
 * Exports a "Symbol-like" library for internal use.
 * This is used since Symbol isn't supported in IE11
 * and it also encapsulates Symbol.for for internal
 * uses against the "global symbol registry".
 * @since 9/25/18
 * @file
 */

import { name } from '../../package.json';

/**
 * Prefixed to all fake symbol string values.
 * @type {string}
 */
export const prefix = `@@${name}`;

/**
 * Stores all internal symbols.
 * @type {Object<string>}
 */
export const SYMBOL_REGISTRY = {};

/**
 * Creates a fake symbol.
 * @param {string} label The symbol's label.
 * @returns {string} The "fake" symbol.
 * @export
 */
export default function Symbol(label) {
  return `${prefix}/${label}`;
}

Symbol.for = function SymbolFor(label) {
  if (!SYMBOL_REGISTRY[label]) SYMBOL_REGISTRY[label] = Symbol(label);
  return SYMBOL_REGISTRY[label];
};
