/**
 * Exports the `ary` function.
 * @since 9/25/18
 * @file
 */

import wrap from '../internal/wrap';
import Symbol from '../internal/Symbol';
import assertFunction from '../internal/assertFunction';
import { getFunctionArity } from '../internal/arity';

const IS_CAPPED_FUNCTION = Symbol.for('IS_CAPPED_FUNCTION');

/**
 * Caps the number of arguments to the provided function `fn`.
 * This will return a new function that will accept up to `length` arguments.
 * Additional arguments supplied to the function will be ignored.
 * @param {function} fn The function to cap the arity of.
 * @param {number} arity The arity to cap the function ti.
 * @returns {function} The provided function with its arity capped.
 * @export
 * @example
 * const capped = ary((x, y, z) => `${x}-${y}-${z}`, 1);
 * capped(1)       // => "1-undefined-undefined"
 * capped(1, 2)    // => "1-undefined-undefined"
 * capped(1, 2, 3) // => "1-undefined-undefined"
 */
export default function ary(fn, arity = getFunctionArity(fn)) {
  assertFunction(fn);

  // Prevent capping a function that's already capped if the
  // arity value is greater than or equal to previsouly capped `fn`.
  if (fn[IS_CAPPED_FUNCTION] && arity >= getFunctionArity(fn)) return fn;

  function capped(...args) {
    return fn.apply(this, args.slice(0, getFunctionArity(capped)));
  }

  return wrap(IS_CAPPED_FUNCTION, fn, capped, 'ary', arity);
}
