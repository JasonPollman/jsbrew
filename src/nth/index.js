/**
 * Exports the `nth` function.
 * @since 9/25/18
 * @file
 */

/**
 * Returns the nth item in a list.
 * If the value of `n` is < 0, the nth item from the end of the list is returned.
 * @param {Array|Object|String} list The list to get the nth item of.
 * @param {number} n The index of the item to get.
 * @returns {any} The value at index `n`.
 * @export
 */
export default function nth(list, n) {
  const idx = Number(n);

  // Not an object, string, etc. or n is NaN.
  if (!list || (idx !== 0 && !idx)) return undefined;

  return list[idx < 0 ? (list.length + idx + 1) : idx];
}
