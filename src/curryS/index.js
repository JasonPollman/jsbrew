/**
 * Exports the `curryS` function.
 * @since 9/25/18
 * @file
 */

import wrap from '../internal/wrap';
import Symbol from '../internal/Symbol';
import curry, { IS_RECURRY_FUNCTION } from '../curry';

export const IS_CURRIED_STRICT_FUNCTION = Symbol.for('IS_CURRIED_STRICT_FUNCTION');

/**
 * Curries a function that limits the arity of each call to 1.
 * This is a bit cleaner (stricter) than `curry`, but doesn't
 * allow for partial application.
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
 * curried(1, 2)(3) // => [object Function]
 * curried(1)(2, 3) // => [object Function]
 * curried(1, 2, 3) // => [object Function]
 *
 * You can also use placeholders, but here they're useless,
 * since single arguments are enforced.
 * curried(_)(1)(_)(2)(3) // => 6
 */
export default function curryS(fn, length) {
  const curried = curry(fn, length);

  function curriedS(x) {
    const context = this;
    const intermediate = curried.call(this, x);

    // Not a recurried function, meaning the result is
    // the result of the call to the original function.
    if (!intermediate || !intermediate[IS_RECURRY_FUNCTION]) return intermediate;

    return function recurriedStrict(y) {
      return intermediate.call(context, y);
    };
  }

  return wrap(IS_CURRIED_STRICT_FUNCTION, fn, curriedS, 'curryS');
}
