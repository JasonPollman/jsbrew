/**
 * A utility method to assert that things are functions.
 * @since 9/25/18
 * @file
 */

/**
 * Asserts that `fn` is a function.
 * @param {function} fn The value to assert.
 * @returns {function} This function for chaining.
 * @export
 */
export default function assertFunction(fn) {
  if (typeof fn !== 'function') {
    throw new Error('Expected a function for parameter `fn`');
  }

  return assertFunction;
}
