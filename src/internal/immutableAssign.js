/**
 * Exports the `immutableAssign` function.
 * @since 9/25/18
 * @file
 */

/**
 * A convenience wrapper around Object.defineProperty.
 * @param {Object} object The object to immutably assign the property to.
 * @param {string} key The name of the property to set on `object`.
 * @param {any} value The value to set on `object`.
 * @param {boolean} [enumerable=false] True if you want the property to be enumerable.
 * @returns {Object} The originally passed in object.
 * @export
 */
export default function immutableAssign(object, key, value, enumerable = false) {
  return Object.defineProperty(object, key, { value, enumerable });
}
