/**
 * Exports the `has` function.
 * This is used internally, and that's why it's defined here
 * and a referenece to it lives in `../`.
 * @since 9/25/18
 * @file
 */

const { hasOwnProperty } = Object.prototype;

/**
 * Determines if `object` has it's own property `property`.
 * This is basically a wrapper around `Object.prototype.hasOwnProperty`.
 * @param {Object} object The object to inspect.
 * @param {string} property The property to determine whether or not `object` has.
 * @returns {boolean} True if the object contains it's own property `property`.
 * @export
 */
export default function has(object, property) {
  return hasOwnProperty.call(object, property);
}
