/**
 * Exports the `castFunction` function.
 * @since 9/25/18
 * @file
 */

import constant from '../constant';
import isFunction from '../isFunction';

/**
 * Casts `thing` as a function. That is, if `thing` is a function
 * `thing` will be returned. If not, it will be wrapped in a function.
 * @param {any} thing The thing to cast as a function.
 * @returns {Array} `thing` cast as a function.
 * @export
 */
export default function castFunction(thing) {
  return isFunction(thing) ? thing : constant(thing);
}
