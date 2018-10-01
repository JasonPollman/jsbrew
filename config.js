/**
 * Contains build configuration for each library method.
 * @since 9/30/18
 * @file
 */

/**
 * The various "categories" a method
 * can be a part of. This is used to create
 * sub packages on npm.
 * @type {Object<string>}
 */
const categories = {
  core: 'core',
  language: 'language',
  assertions: 'assertions',
  functional: 'functional',
};

export default {
  ary: {
    fconfig: {
      rearg: 'flip',
      arity: 2,
    },
    categories: [
      categories.core,
      categories.functional,
    ],
  },
  assert: {
    fconfig: false,
    categories: [
      categories.assert,
    ],
  },
  binary: {
    fconfig: {
      rearg: 'flip',
      arity: 2,
    },
    categories: [
      categories.functional,
    ],
  },
  curry: {
    fconfig: false,
    categories: [
      categories.core,
      categories.functional,
    ],
  },
  curry1: {
    fconfig: false,
    categories: [
      categories.functional,
    ],
  },
  False: {
    aliases: ['f'],
    categories: [
      categories.core,
      categories.language,
    ],
  },
  flip: {
    fconfig: false,
    categories: [
      categories.core,
      categories.functional,
    ],
  },
  get: {
    fconfig: [
      {
        arity: 2,
      },
      {
        rename: 'getOrDefault',
        rearg: [1, 2, 0],
        arity: 3,
      },
    ],
    categories: [
      categories.core,
      categories.language,
    ],
  },
};
