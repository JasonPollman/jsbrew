/**
 * Exports the `binary` function.
 * @since 9/25/18
 * @file
 */

import ary from '../ary';

/**
 * Given a function this will create a function with an arity of 2 that calls `fn`.
 * @param {function} fn The function to make binary.
 * @returns {function} The binary function.
 * @export
 */
export default function binary(fn) {
  return ary(fn, 2);
}
