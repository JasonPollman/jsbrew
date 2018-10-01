import wrap from '../internal/wrap';
import Symbol from '../internal/Symbol';
import assertFunction from '../internal/assertFunction';

import placeholders, {
  _,
  isPlaceholder,
  isNotPlaceholder,
} from '../internal/placeholder';

const IS_PARTIALED_FUNCTION = Symbol.for('IS_PARTIALED_FUNCTION');

/**
 * Creates a function that invokes `fn` with the given partially applied arguments in place.
 * You can use any of `partial.placeholders` to skip (accept) an argument as it was provided.
 * @param {function} fn The function to partialize.
 * @param {...any} partials Partial substitutions.
 * @returns {function} The partialed version of `fn`.
 */
function partial(fn, ...partials) {
  assertFunction(fn);

  if (!partials.length) return fn;

  function partialed(...args) {
    const rearged = partials.map(x => (isPlaceholder(x) ? args.shift() : x));
    return fn.apply(this, rearged.concat(args));
  }

  // Gotta set the arity so that curried partial functions work properly.
  // The new arity is the original arity - the number of non-partial applications.
  const arity = Math.max(0, fn.length - partials.filter(isNotPlaceholder).length);
  return wrap(IS_PARTIALED_FUNCTION, fn, partialed, 'partial', arity);
}

placeholders.add(partial);

// Exposing the placeholder "_" and the placeholders array
// by assigning it to the partial function itself.
Object.assign(partial, { _, placeholders });

export default partial;
export { _, placeholders };
