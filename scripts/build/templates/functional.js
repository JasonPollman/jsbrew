import isString from '../../../src/isString';
import { backticked } from '../utils';

function functionalTransformation({ method, rearg = 'identity', arity }) {
  const arityString = arity ? `, ${arity}` : '';
  const reargArguments = isString(rearg) ? '' : `, ${rearg.join(', ')}`;
  return `curry(prepare(${method}${reargArguments})${arityString})`;
}

function trimWhitespaceLineStart(n, string) {
  return string.replace(new RegExp(`^ {${n}}`, 'mg'), '');
}

function addFactoryFunctionMaybe(options) {
  const {
    name,
    method,
    hasUsingFactoryFunction,
  } = options;

  return !hasUsingFactoryFunction ? '' : trimWhitespaceLineStart(4, `
    ${name}.using = function using(...args) {
      return ${functionalTransformation({ ...options, method: `${method}.using(...args)` })};
    };
  `);
}

const header = ({ method }) => `
/**
 * This is an automatically generated functional
 * equivalent of the ${backticked(method)} method.
 *
 * This file is created using ${backticked('config.js')}, which includes the
 * options for the functional versions of each library method.
 *
 * @since ${new Date().toLocaleDateString()}
 * @file
 */
`;

export default (options) => {
  const {
    name,
    rearg,
    method,
  } = options;

  return trimWhitespaceLineStart(4, `
    ${header(options).trim()}

    import curry from '../curry';
    import prepare from '../${isString(rearg) ? rearg : 'rearg'}';
    import ${method} from '../${method}';

    const ${name} = ${functionalTransformation(options)};

    ${addFactoryFunctionMaybe(options).trim()}

    export default ${name};
  `);
};
