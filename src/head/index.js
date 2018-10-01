/**
 * Exports the `head` function.
 * @since 9/25/18
 * @file
 */

/**
 * A function that returns the first item in an array.
 * If a non-array is given and `list` is truty, the property
 * `0` of `list` will be returned. So this will work on
 * array-like object as well.
 * @param {Array} list The list to get the head of.
 * @returns {any} The first item in the array.
 * @export
 * @example
 * head([1, 2, 3])            // => 1
 * head({ 0: 1, 1: 2, 2: 3 }) // => 1
 * head()                     // undefined
 * head([])                   // undefined
 */
export default function head(list) {
  return list ? list[0] : undefined;
}
