/**
 * Exports the `pickBy` function.
 * @since 9/25/18
 * @file
 */

import omitBy from '../omitBy';
import isArray from '../isArray';

/**
 * A function that will omit items from a collection per the given list of keys.
 * Complexity: O(n)
 * @param {Object|Array|String|Map|Set} collection The collection to omit from.
 * @param {Array} properties The keys to omit from the collection.
 * @returns {Array} A new object with the provided values omitted.
 */
export default function omit(collection, properties) {
  if (!isArray(properties) || !properties.length) return {};
  return omitBy(collection, (value, key) => properties.indexOf(key) > -1);
}
