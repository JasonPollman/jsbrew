/**
 * Sets the arity, flags the transform type, and creates
 * a reference to the original function for all function
 * transformations (curry, partial, etc.).
 * @since 9/25/18
 * @file
 */

import Symbol from './Symbol';
import immutableAssign from './immutableAssign';

import {
  setFunctionArity,
  getFunctionArity,
} from './arity';

export const SOURCE_FUNCTION = Symbol.for('SOURCE_FUNCTION');

/**
 * Flags a function with the given `type` Symbol.
 * @param {Symbol} type The "type" of property to assign to the function.
 * @param {function} target The function to flag.
 * @returns {function} The passed in function to "flag".
 */
function flag(type, target) {
  immutableAssign(target, type, true);
  return target;
}

/**
 * Applied to all wrapped functions.
 * @returns {function} The original "user written" version of the function.
 */
function getSourceFunction() {
  return this[SOURCE_FUNCTION];
}

/**
 * A `toString` implementation for wrapper functions.
 * This will walk the `toString` chain back up to the original function.
 * @returns {string} The original (source) function's toString value.
 */
function toString() {
  return `/* Wrapped with \`${this.libname}\` */\n${this.getSourceFunction().toString()}`;
}

/**
 * Creates a reference to the original "source" function
 * onto "target" (or the wrapper) function.
 * @param {function} source The original, untransformed "source" function.
 * @param {function} target The wrapper, or "transformed" function.
 * @param {string} libname The library function the user called to wrap this function.
 * @returns {function} The target function.
 */
function reflect(source, target, libname = target.name) {
  immutableAssign(target, 'libname', libname);
  immutableAssign(target, 'toString', toString);
  immutableAssign(target, 'getSourceFunction', getSourceFunction);
  immutableAssign(target, SOURCE_FUNCTION, source);
  return target;
}

/**
 * Sets the arity, flags the transform type, and creates
 * a reference to the original function for all function
 * transformations (curry, partial, etc.).
 * @param {Symbol} type The transformation Symbol type.
 * @param {function} source The original function that was wrapped.
 * @param {function} target The function that was transformed (wraps source).
 * @param {string} libname The library function the user called to wrap this function.
 * @param {number} [arity=getFunctionArity(source)] The arity of `target`.
 * @returns {function} The wrapped function.
 * @export
 */
export default function wrap(type, source, target, libname, arity = getFunctionArity(source)) {
  return reflect(source, flag(type, setFunctionArity(target, arity)), libname);
}
