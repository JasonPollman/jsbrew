/**
 * Exports the `interpolateBraces` function.
 * @since 9/25/18
 * @file
 */

import interpolator from '../internal/interpolator';

/**
 * Given a list, this will return a new list with everything except the first member.
 * @param {Array} list The list to get the tail of.
 * @returns {Array} A new array containing the range [1:list.length).
 */
export default interpolator(/\{\s*(.*?)\s*\}/g);
