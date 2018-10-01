/**
 * Exports the `castArray` function.
 * @since 9/25/18
 * @file
 */

import isArray from '../isArray';

/**
 * Casts `thing` as an array. That is, if `thing` is an array
 * `thing` will be returned. If not, it will be wrapped in an array.
 * @param {any} thing The thing to cast as an array.
 * @returns {Array} `thing` cast as an array.
 * @export
 */
export default function castArray(thing) {
  return isArray(thing) ? thing : [thing];
}
