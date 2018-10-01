/**
 * Exports a function that creates an equality
 * function that checks that a given value
 * is a "Object.prototype.toString" tag.
 * @since 9/25/18
 * @file
 */

const { toString } = Object.prototype;

/**
 * Creates a function that calls Object.prototype.toString.call
 * on the provided value and determines if it equals `tag`.
 * @param {string} tag The tag to compare.
 * @returns {function} The toString matching function.
 * @export
 */
export default function toStringTagMatcher(tag) {
  return x => toString.call(x) === tag;
}
