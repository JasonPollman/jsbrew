/**
 * Exports either Map or PseudoMap, depending
 * on what's available, globally. PseudoMap shouldn't
 * be used outside of this library since it's not a full
 * Map polyfill, but serves the needs of internal use.
 * @since 9/25/18
 * @file
 */

import has from './has';
import InternalSymbol from './Symbol';
import global from './global';

const MAP_DELETED = InternalSymbol.for('MAP_DELETED');

export default global.Map || class PseudoMap {
  /**
   * Creates an instance of PseudoMap.
   * @param {Array} [pairs=[]] Takes tuples, just like the Map constructor.
   */
  constructor(pairs = []) {
    Object.defineProperties(this, {
      values: {
        value: {},
        writable: true,
      },
      length: {
        value: 0,
        writable: true,
      },
    });

    pairs.forEach(([key, value]) => this.set(key, value));
  }

  /**
   * Get's the map's size.
   * @returns {number} The number of items currently stored in the map.
   */
  get size() {
    return this.length;
  }

  /**
   * Determines membership of `key`. That is, does the map
   * contain a value for `key`?
   * @param {string} key The key to determine membership of.
   * @returns {boolean} True if key exists in map, false otherwise.
   */
  has(key) {
    return this.values[key] !== MAP_DELETED && has(this.values, key);
  }

  /**
   * Gets the value for `key`.
   * @param {string} key The key to get the value of.
   * @returns {any} The value for key `key`.
   */
  get(key) {
    const value = this.values[key];
    return value === MAP_DELETED ? undefined : value;
  }

  /**
   * Sets a value.
   * @param {string} key The key of value.
   * @param {any} value The value to set for `key`.
   * @returns {PseudoMap} The current PseudoMap instance for chaining.
   */
  set(key, value) {
    if (!this.has(key)) this.length++;
    this.values[key] = value;
    return this;
  }

  /**
   * Deletes a value.
   * @param {string} key The key to delete.
   * @returns {PseudoMap} The current PseudoMap instance for chaining.
   */
  delete(key) {
    if (!this.has(key)) return this;

    if (--this.length === 0) {
      return this.clear();
    }

    this.values[key] = MAP_DELETED;
    return this;
  }

  /**
   * Clears all values from the PseduoMap.
   * @returns {PseudoMap} The current PseudoMap instance for chaining.
   */
  clear() {
    this.length = 0;
    this.values = {};
    return this;
  }
};
