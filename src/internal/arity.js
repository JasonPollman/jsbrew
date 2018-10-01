/**
 * Internal arity utility functions.
 * @since 9/25/18
 * @file
 */

import Symbol from './Symbol';
import immutableAssign from './immutableAssign';

const FUNCTION_ARITY_OVERRIDE = Symbol.for('FUNCTION_ARITY_OVERRIDE');

/**
 * Throws is the given arity (`n`) value isn't a coercible number.
 * @param {any} n The value to assert the "arity" validity of.
 * @returns {number} The given arity value as a number.
 */
function checkArity(n) {
  const arity = Number(n);
  if (arity >= 0) return arity;
  throw new Error(`Invalid arity value: "${n}"`);
}

/**
 * This function adds a value to the provided `fn` that
 * sets the FUNCTION_ARITY_OVERRIDE value. Since Function#length
 * cannot be overridden, this library uses `setFunctionArity` and
 * `getFunctionArity` everywhere to ensure that the arity of a
 * transformed function can be tracked. This is important when
 * trying to perform transformations on "top of each other",
 * curry(ary(example, 2), 1) for example.
 *
 * **You should not call this method on a user's function!**
 * This is applied only to transformed functions.
 *
 * @param {function} fn The function to "set the arity of".
 * @param {number} arity The arity to set on `fn`.
 * @returns {function} The originally passed in value for `fn`.
 * @export
 */
export function setFunctionArity(fn, arity) {
  immutableAssign(fn, FUNCTION_ARITY_OVERRIDE, checkArity(arity));
  return fn;
}

/**
 * Returns the FUNCTION_ARITY_OVERRIDE or the `length` of a function.
 * @param {function} fn The function to get the arity of.
 * @returns {number} The function's arity.
 * @export
 */
export function getFunctionArity(fn) {
  return (fn && (fn[FUNCTION_ARITY_OVERRIDE] || fn.length)) || 0;
}
