/**
 * Exports the `iteratesCollection` function.
 * @since 9/25/18
 * @file
 */

import isMap from '../isMap';
import isSet from '../isSet';
import Symbol from './Symbol';
import identity from '../identity';
import isIterable from '../isIterable';
import isFunction from '../isFunction';

/**
 * Used by various library functions to terminate iteration.
 * @type {Symbol}
 */
export const TERMINATE_COLLECTION_ITERATION = Symbol.for('TERMINATE_COLLECTION_ITERATION');

/**
 * Iterates over Map objects.
 * @param {Map} map The map instance to iterate over.
 * @param {Array|Object} results The results set to pass to `callback`.
 * @param {function} handler The handler to pass to `callback`.
 * @param {function} callback The callback to invoke at each loop iteration.
 * @returns {undefined}
 */
function iterateMap(map, results, handler, callback) {
  const keys = Array.from(map.keys());
  const values = Array.from(map.values());

  for (let i = 0; i < keys.length; i++) {
    const res = callback(results, handler, values[i], keys[i], map);
    if (res === TERMINATE_COLLECTION_ITERATION) break;
  }
}

/**
 * Iterates over Set objects.
 * @param {Set} set The set instance to iterate over.
 * @param {Array|Object} results The results set to pass to `callback`.
 * @param {function} handler The handler to pass to `callback`.
 * @param {function} callback The callback to invoke at each loop iteration.
 * @returns {undefined}
 */
function iterateSet(set, results, handler, callback) {
  const keys = Array.from(set.keys());
  const values = Array.from(set.values());

  for (let i = 0; i < keys.length; i++) {
    const res = callback(results, handler, values[i], i.toString(), set);
    if (res === TERMINATE_COLLECTION_ITERATION) break;
  }
}

/**
 * Iterates over arrays, objects, and strings.
 * @param {Array|Object|String} thing The thing to iterate over.
 * @param {Array|Object} results The results set to pass to `callback`.
 * @param {function} handler The handler to pass to `callback`.
 * @param {function} callback The callback to invoke at each loop iteration.
 * @returns {undefined}
 */
function iterateObject(thing, results, handler, callback) {
  const keys = Object.keys(thing);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const res = callback(results, handler, thing[key], key, thing);
    if (res === TERMINATE_COLLECTION_ITERATION) break;
  }
}

export function getMapOrSetValues(collection) {
  return Array.from(collection.values());
}

export function getCollectionValues(collection) {
  return isMap(collection) || isSet(collection) ? getMapOrSetValues : collection;
}

/**
 * Determines the iterable's type.
 * @param {Map|Set|Object|Array|String} collection The collection to determine the type of.
 * @returns {string} The type, as a string.
 */
export function getCollectionIterator(collection) {
  switch (true) {
    case isMap(collection): return iterateMap;
    case isSet(collection): return iterateSet;
    default: return iterateObject;
  }
}

/**
 * A higher order function used by each, map, etc.
 * @param {function} ResultsCollection The result constructor to create for the result set.
 * The addition to the result set if the responsibility of the lower order function.
 * @param {function} callback The lower order function.
 * @returns {Array|Object} The result set.
 * @export
 */
export default function iteratesCollection(ResultsCollection, callback) {
  return function iterateCollection(collection, iteratee) {
    const results = ResultsCollection && new ResultsCollection();

    // Fallback to empty results set if no valid iteratee was passed
    // or if the collection isn't something that's iterable.
    if (!collection || !isIterable(collection)) return results;

    const handler = isFunction(iteratee) ? iteratee : identity;
    const iterator = getCollectionIterator(collection);

    iterator(collection, results, handler, callback);
    return results;
  };
}
