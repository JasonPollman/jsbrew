/**
 * Exports the `assert` function.
 * @since 9/25/18
 * @file
 */

/**
 * Creates an "AssertionError" object.
 * @param {string=} message The error message.
 * @returns {Error} The AssertionError instance.
 */
function AssertionError(message) {
  const error = new Error(message);
  error.name = 'Assertion Error';
  error.code = 'ERR_ASSERTION';
  return error;
}

/**
 * Throws an AssertionError with the given message if `condition` is falsy.
 * @param {boolean} condition The assertion condition.
 * @param {string=} message The error message.
 * @returns {undefined}
 * @export
 */
export default function assert(condition, message) {
  if (!condition) throw AssertionError(message);
}
