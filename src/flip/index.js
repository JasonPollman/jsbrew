/**
 * Exports the `flip` function.
 * @since 9/25/18
 * @file
 */

import Symbol from '../internal/Symbol';
import assertFunction from '../internal/assertFunction';

import { getFunctionArity } from '../internal/arity';
import wrap, { SOURCE_FUNCTION } from '../internal/wrap';

const IS_FLIPPED_FUNCTION = Symbol.for('IS_FLIPPED_FUNCTION');

/**
 * Creates a function that invokes `fn` with the arguments signature reversed.
 * @param {function} fn The function to create a flipped version of.
 * @param {number=} [arity=getFunctionArity(fn)] The arity of the flipped function.
 * @returns {function} The flipped function.
 * @export
 * @example
 * const flipped = flip((x, y, z) => `${x}-${y}-${z}`);
 * flipped(1, 2, 3)     // => "3-2-1"
 * flipped(1, 2, 3, 4)  // => "3-2-1"
 * flipped(1)           // => "undefined-undefined-1"
 * flipped(1, 2)        // => "undefined-2-1"
 *
 * const flipped = flip((x, y, z, ...rest) => `${x}-${y}-${z}-${rest.join('')}`);
 * flipped(1, 2, 3, 4, 5, 6)  // => "3-2-1-4-5-6"
 */
export default function flip(fn, arity = getFunctionArity(fn)) {
  assertFunction(fn);

  // No reason to flip a function of arity 1.
  if (arity === 1) return fn;

  // If flipping a flipped function, return the original (not flipped) function.
  if (fn[IS_FLIPPED_FUNCTION] && typeof fn[SOURCE_FUNCTION] === 'function') {
    return fn[SOURCE_FUNCTION];
  }

  function flipped(...args) {
    // Ensure we've pushed in enough arugments to meet the arity specification.
    // This ensures that flipped(x, y) will properly be called as
    // flipped(undefined, 5) when invoked with flipped(5).
    for (let i = 0; i < arity - args.length; i++) args.push(undefined);
    return fn.apply(this, args.reverse());
  }

  return wrap(IS_FLIPPED_FUNCTION, fn, flipped, 'flip', arity);
}
