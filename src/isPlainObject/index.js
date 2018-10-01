/**
 * Exports the `isPlainObject` function.
 * @since 9/25/18
 * @file
 */

/**
 * Determines if the given item is a "POJO" (plain old javascript object).
 * @param {any} x The value to assert plain object-ness.
 * @returns {boolean} True if `x` is a plain object, false otherwise.
 * @export
 */
export default function isPlainObject(x) {
  return !!x && x.constructor === Object;
}
