/**
 * Exports a set representative of all partial application placeholders.
 * @since 9/25/18
 * @file
 */

import Set from './Set';
import Symbol from './Symbol';

/**
 * Can be used as a partial placeholder.
 * @type {Symbol}
 */
export const _ = Symbol.for('PARTIAL_DEFAULT_PLACEHOLDER');

/**
 * The set of all partial application placeholders.
 * @type {Set}
 */
const placeholders = new Set([_]);

/**
 * Determines if a value is a placeholder value.
 * @param {any} x The value to assert whether or not is a placeholder.
 * @returns {boolean} True if `x` is a placeholder.
 */
export const isPlaceholder = x => placeholders.has(x);

/**
 * The negation of `isPlaceholder`.
 * @param {any} x The value to assert whether or not is a placeholder.
 * @returns {boolean} True if `x` is not a placeholder.
 */
export const isNotPlaceholder = x => !placeholders.has(x);

export default placeholders;
