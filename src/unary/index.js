/**
 * Exports the `unary` function.
 * @since 9/25/18
 * @file
 */

import ary from '../ary';

/**
 * Given a function this will create a function with an arity of 1 that calls `fn`.
 * @param {function} fn The function to make unary.
 * @returns {function} The unary function.
 * @export
 */
export default function unary(fn) {
  return ary(fn, 1);
}
