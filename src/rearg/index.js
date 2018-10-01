/**
 * Exports the `rearg` function.
 * @since 9/25/18
 * @file
 */

import isArray from '../isArray';
import wrap from '../internal/wrap';
import Symbol from '../internal/Symbol';
import assertFunction from '../internal/assertFunction';

const IS_REARGED_FUNCTION = Symbol.for('IS_REARGED_FUNCTION');

/**
 * Creates a wrapper function around `fn` with the arguments rearranged.
 * @param {function} fn The function to re-arg.
 * @param {Array<number>} signature Re-argument signature.
 * @returns {function} The rearged version of `fn`.
 */
export default function rearg(fn, signature) {
  assertFunction(fn);

  if (!isArray(signature) || !signature.length) return fn;

  function rearged(...args) {
    const rearranged = [];

    for (let i = 0; i < signature.length; i++) {
      const index = signature[i];
      args.splice(index, 1);
      rearranged.push(args[index]);
    }

    return fn.apply(this, rearranged.concat(args));
  }

  return wrap(IS_REARGED_FUNCTION, fn, rearged, 'rearg');
}
