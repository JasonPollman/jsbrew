/**
 * Exports the `isNaN` function.
 * This is based of the polyfill from MDN:
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#Polyfill
 * @since 9/25/18
 * @file
 */

/**
 * Determines if the given item is NaN.
 * @param {any} x The value to assert.
 * @returns {boolean} True if `x` is NaN, false otherwise.
 * @export
 */
export default function isNil(x) {
  // eslint-disable-next-line no-self-compare
  return x !== x;
}
