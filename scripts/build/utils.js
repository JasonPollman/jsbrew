/**
 * Build utility methods.
 * @since 9/30/18
 * @file
 */

/**
 * Since \`...\` looks nasty.
 * @param {string} x The value to surround in backticks.
 * @returns {string} The backticked string.
 * @export
 */
export function backticked(x) {
  return `\`${x}\``;
}

/**
 * Plucks a value from process.env if it exists.
 * If not, `fallback` is returned instead.
 * @param {string} key The key to grab the value of from `process.env`.
 * @param {any=} fallback The fallback (default) value.
 * @returns {any} The value of `process.env[key]` or `fallback`.
 * @export
 */
export function env(key, fallback) {
  return process.env[key] || fallback;
}

/**
 * Creates a "functional equivalent" name for a method, given an existing method name.
 * @param {string} name The name of the method to create an f function for.
 * @returns {string} The method's functional name.
 * @export
 */
export function fname(name) {
  return 'f'.concat(name);
}
