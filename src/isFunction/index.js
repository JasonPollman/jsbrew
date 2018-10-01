/**
 * Exports the `isFunction` function.
 * @since 9/25/18
 * @file
 */

/**
 * Determines if the given item is a function.
 * @param {any} x The value to assert function-ness.
 * @returns {boolean} True if `x` is a function, false otherwise.
 * @export
 */
export default function isFunction(x) {
  return !!x && typeof x === 'function';
}
