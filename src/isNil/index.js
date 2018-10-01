/**
 * Exports the `isNil` function.
 * @since 9/25/18
 * @file
 */

/**
 * Determines if the given item is either undefined or null.
 * @param {any} x The value to assert nil-ness.
 * @returns {boolean} True if `x` is undefined or null, false otherwise.
 * @export
 */
export default function isNil(x) {
  return x === undefined || x === null;
}
