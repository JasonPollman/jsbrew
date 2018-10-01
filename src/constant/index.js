/**
 * Exports the `Nothing` function.
 * @since 9/25/18
 * @file
 */

import Null from '../Null';
import True from '../True';
import False from '../False';
import nothing from '../nothing';

/**
 * Stores a mapping of common "terminal" functions so constant will
 * return these reather than creating new functions over and over again.
 * @type {Object<function>}
 */
const mapping = {
  null: Null,
  true: True,
  false: False,
  undefined: nothing,
};

/**
 * Creates a function that returns the given value.
 * @param {any} value The constant value to return.
 * @returns {function} A function that returns `value`.
 * @export
 */
export default function constant(value) {
  return mapping[value] || function constantValue() {
    return value;
  };
}
