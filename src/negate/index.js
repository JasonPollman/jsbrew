/**
 * Exports the `negate` function.
 * @since 9/25/18
 * @file
 */

import wrap from '../internal/wrap';
import assertFunction from '../internal/assertFunction';

const IS_NEGATED_FUNCTION = Symbol.for('IS_NEGATED_FUNCTION');

/**
 * Creates a function which returns the negated (!)
 * return value of invoking`fn`.
 * @param {function} fn The function to negate.
 * @returns {function} The negated version of `fn`.
 * @export
 * @example
 * negate(True)()     // => false
 * negate(() => 1)    // => false
 * negate(() => 0)    // => true
 */
export default function negate(fn) {
  assertFunction(fn);

  function negated(...args) {
    return !fn.apply(this, args);
  }

  return wrap(IS_NEGATED_FUNCTION, fn, negated, 'negate');
}
