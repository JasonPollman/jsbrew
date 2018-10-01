/**
 * Exports the `interpolator` function.
 * @since 9/25/18
 * @file
 */

import get from '../get';
import identity from '../identity';
import isString from '../isString';
import isFunction from '../isFunction';

const regexpCache = {};

/**
 * Used internally to create various "interpolation methods".
 * @param {RegExp} regexp The regular expression to used for template interpolation.
 * @returns {function} An interpolation function bound to `regexp`.
 * @export
 */
export default function interpolator(regexp) {
  return function interpolate(string, tokens, options) {
    if (!isString(string)) return '';

    let expression = regexp;
    const { escape = '\\', sanitize } = options || {};

    const escapable = isString(escape);
    const sanitizer = isFunction(sanitize) ? sanitize : identity;

    if (escapable) {
      const { source } = regexp;

      // Creating RegExps can be expensive... create once and cache it.
      regexpCache[source] = regexpCache[source] || new RegExp(`(^|.)${source}`, 'g');
      expression = regexpCache[source];
    }

    return string.replace(expression, ($0, $1, $2) => {
      if (escapable && $0[0] === escape) return $0.slice(1);
      return sanitizer((escapable ? $1 : '').concat(get(tokens, escapable ? $2 : $1, '')));
    });
  };
}
