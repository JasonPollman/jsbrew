/**
 * Exports the `tail` function.
 * @since 9/25/18
 * @file
 */

import isArray from '../isArray';

/**
 * Given a list, this will return a new list with everything except the first member.
 * @param {Array} list The list to get the tail of.
 * @returns {Array} A new array containing the range [1:list.length).
 */
export default function tail(list) {
  return isArray(list) ? list.slice(1) : undefined;
}
