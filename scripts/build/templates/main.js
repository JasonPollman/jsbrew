import map from '../../../src/map';

const metaStringify = (value, key) => `${key}: '${value}'`;

export default ({ meta, methods }) => `
/**!
 * @author Jason Pollman <jasonjpollman@gmail.com>
 * @license ${meta.license}
 */

${map(methods, method => `import ${method} from './${method}';`).join('\n')}

const $package = {
  ${map(meta, metaStringify).join(',\n  ').concat(',')}
};

export default {
  $package,
  ${methods.join(',\n  ').concat(',')}
};

export {
  $package,
  ${methods.join(',\n  ').concat(',')}
};
`;
