/**
 * Exports the `ary` function.
 * @since 9/25/18
 * @file
 */

import Map from '../internal/Map';
import wrap from '../internal/wrap';
import Symbol from '../internal/Symbol';
import assertFunction from '../internal/assertFunction';

const IS_MEMOIZED_FUNCTION = Symbol.for('IS_MEMOIZED_FUNCTION');

/**
 * Creates a memoized version of `fn`.
 * That is a function that will only be called once for the same argument signature.
 * An argument "signature" is keyed by the `serializer` function, which by default is
 * a modified version of JSON.stringify
 * @param {function} fn The function to memoize.
 * @param {function} serializer The function that serializes the arguments and creates a cache key.
 * @param {function} Cache The class/factory function to create the cache.
 * @returns {function} The memoized version of `fn`.
 */
export default function memoize(fn, serializer = JSON.stringify, Cache = memoize.Cache) {
  assertFunction(fn)(serializer)(Cache);

  // Prevents memoizing a memoized function.
  if (fn[IS_MEMOIZED_FUNCTION]) return fn;

  function memoized(...args) {
    const key = serializer.call(this, args);
    const { cache } = memoized;

    if (!cache.has(key)) cache.set(key, fn.apply(this, args));
    return cache.get(key);
  }

  memoized.cache = new Cache();
  return wrap(IS_MEMOIZED_FUNCTION, fn, memoized, 'memoize');
}

// Exposing the Cache class so it can be reassgned
// to whatever lib the end user wants to use.
memoize.Cache = Map;
