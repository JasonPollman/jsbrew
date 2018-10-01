/**
 * Exports the `curry` function.
 * @since 9/25/18
 * @file
 */

import wrap from '../internal/wrap';
import Symbol from '../internal/Symbol';
import assertFunction from '../internal/assertFunction';
import immutableAssign from '../internal/immutableAssign';
import { getFunctionArity } from '../internal/arity';

import placeholders, {
  _,
  isPlaceholder,
  isNotPlaceholder,
} from '../internal/placeholder';

export const IS_CURRIED_FUNCTION = Symbol.for('IS_CURRIED_FUNCTION');
export const IS_RECURRY_FUNCTION = Symbol.for('IS_RECURRY_FUNCTION');

/**
 * Creates a new curried function from `fn`.
 * @param {function} fn The function to curry.
 * @returns {function} The curried function.
 */
function createCurry(fn) {
  return function curried(...input) {
    if (!input.length) return curried;

    const args = input;
    const arity = getFunctionArity(curried);
    const formal = input.slice(0, arity).filter(isNotPlaceholder);

    if (formal.length >= arity) {
      return fn.apply(this, formal);
    }

    const context = this;

    function recurried(...reargs) {
      if (!reargs.length) return recurried;

      // Replace prior placeholders with formal values.
      // If a replacement of a placeholder is replaced with another placeholder this is
      // basically a noop, and this process will be repeated on the next invocation.
      for (let i = 0; i < args.length && reargs.length; i++) {
        if (isPlaceholder(args[i])) args[i] = reargs.shift();
      }

      return curried.call(context, ...args, ...reargs);
    }

    // This value is used by curryS to know that the
    // return value is a `recurried` function.
    immutableAssign(recurried, IS_RECURRY_FUNCTION, true);
    return recurried;
  };
}

/**
 * Curries a function.
 * @param {function} fn The function to curry.
 * @param {number} [length=fn.length] The maximum arity of `fn`.
 * @returns {function} The curried version of `fn`.
 * @export
 * @example
 * const curried = curry((x, y, z) => x + y + z);
 * curried()        // => curried
 * curried(1)       // => [object Function]
 * curried(1)(2)    // => [object Function]
 * curried(1)(2)(3) // => 6
 * curried(1, 2)(3) // => 6
 * curried(1)(2, 3) // => 6
 * curried(1, 2, 3) // => 6
 *
 * // You can also use partial application (placeholders)...
 * const triples = curry((a, b, c) => [a, b, c]);
 * triples(_, 2, 3)(1)    // => [1, 2, 3]
 * triples(_, _, 3)(1)(2) // => [1, 2, 3]
 * triples(1)(_)(2)(_)(3) // => [1, 2, 3]
 * triples(1)(_, 3)(2)    // => [1, 2, 3]
 * triples(_, 2)(1)(3)    // => [1, 2, 3]
 */
function curry(fn, length = getFunctionArity(fn)) {
  assertFunction(fn);

  if (fn[IS_CURRIED_FUNCTION]) return fn;
  return wrap(IS_CURRIED_FUNCTION, fn, createCurry(fn), 'curry', length);
}

// Exposing the placeholder "_" and the placeholders array
// by assigning it to the curry function itself.
Object.assign(curry, { _, placeholders });

export default curry;
export { _, placeholders };
