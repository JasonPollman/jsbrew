/**
 * Exports the `pickBy` function.
 * @since 9/25/18
 * @file
 */

import isArray from '../isArray';
import { getCollectionValues } from '../internal/iteratesCollection';

/**
 * A function that will `pick` items from a collection per the given list of keys.
 * Complexity: O(n), where n is the number of items in `properties`.
 * @param {Object|Array|String|Map|Set} collection The collection to pick from.
 * @param {Array} properties The keys to pick from the collection.
 * @returns {Array} A new object with the selected values.
 */
export default function pick(collection, properties) {
  const results = {};

  if (!isArray(properties) || !properties.length) return results;
  const values = getCollectionValues(collection);

  for (let i = 0; i < properties.length; i++) {
    const key = properties[i];
    results[key] = values[key];
  }

  return results;
}
