/**
 * Builds all of the library methods.
 * This will create all functional equivalents for each function
 * per `../config.js` and also build the `./.build/index.js` file.
 * @author Jason Pollman <jasonjpollman@gmail.com>
 * @since 9/29/18
 * @file
 */

/* eslint-disable import/no-extraneous-dependencies */

import fs from 'fs-extra-promise';

import {
  join,
  extname,
  relative,
} from 'path';

import {
  dim,
  bold,
} from 'chalk';

/* eslint-enable import/no-extraneous-dependencies */

import get from '../../src/get';
import pick from '../../src/pick';
import partial from '../../src/partial';
import castArray from '../../src/castArray';
import mapAsync from '../../src/mapAsync';

import buildConfig from '../../config';
import packageJson from '../../package.json';
import * as templates from './templates';

import {
  env,
  fname,
} from './utils';

/**
 * The path to the `/src` directory.
 * @type {string}
 */
const BUILD_SOURCE = env('BUILD_SOURCE', join(__dirname, '..', '..', 'src'));

/**
 * The path to the `/.build` directory.
 * This is where build output will be put.
 * @type {string}
 */
const BUILD_DESTINATION = env('BUILD_DESTINATION', join(__dirname, '..', '..', '.build'));

// eslint-disable-next-line no-console
const printsWithColor = color => message => console.log(color(message));

/**
 * The world's simplest logger.
 * @type {Object<function>}
 */
const log = {
  info: printsWithColor(bold.cyan),
  warn: printsWithColor(bold.yellow),
  verbose: printsWithColor(dim),
  success: printsWithColor(bold.green),
};

/**
 * Creates functional equivalents for the current method per `config.js`.
 * This is an iteratee passed to `mapAsync`.
 * @param {string} method The name of the current method.
 * @param {Object} config The config for the current method.
 * @returns {Promise} Resolves once the functional export has been written.
 */
async function functionalizeConfig(method, config) {
  const name = get(config, 'rename', fname(method));
  const dest = join(BUILD_DESTINATION, name, 'index.js');

  await fs.outputFileAsync(dest, templates.functional({
    ...config,
    name,
    method,
    license: packageJson.license,
  }));

  log.verbose(`Export for functional equivalent "${name}" built!`);
}

/**
 * Creates functional equivalents for the current method per `config.js`.
 * This is an iteratee passed to `mapAsync`.
 * @param {Object} config The config for the current method.
 * @param {string} method The name of the current method.
 * @returns {Promise} Resolves once the functional export has been written.
 */
async function functionalize(config, method) {
  const { fconfig } = config;

  if (!fconfig) {
    log.warn(`Functional equivalent for "${method}" skipped.`);
    return Promise.resolve();
  }

  return mapAsync(castArray(fconfig), partial(functionalizeConfig, method));
}

/**
 * Used by Promise.filter to filter whether or not a file within
 * the `/src` directory is a valid "library method" that should
 * be copied to the BUILD_DESTINATION directory.
 * @param {string} filename The name of the file to assert.
 * @returns {boolean} True to copy the file, false otherwise.
 */
function isValidSource(filename) {
  return filename[0] !== '.' && filename !== 'internal' && extname(filename) === '';
}

/**
 * Generates the index.js file.
 * @returns {Promise} Resolves one the index file has been written to disk.
 */
async function generateIndexFile() {
  const dest = join(BUILD_DESTINATION, 'index.js');
  const meta = pick(packageJson, ['name', 'version', 'license']);

  const methods = await fs.readdirAsync(BUILD_DESTINATION).filter(isValidSource);
  return fs.outputFileAsync(dest, templates.main({ meta, methods, config: buildConfig }));
}

/**
 * Executes the build process.
 * @returns {undefined}
 */
async function main() {
  const start = Date.now();
  const src = relative(process.cwd(), BUILD_SOURCE);
  const dest = relative(process.cwd(), BUILD_DESTINATION);

  log.info(`Copying ${src} directory to ${dest}...`);
  await fs.copyAsync(BUILD_SOURCE, BUILD_DESTINATION);

  log.info('Building functional equivalent exports...');
  await mapAsync(buildConfig, functionalize);

  log.info('Building index file...');
  await generateIndexFile();

  log.success(`Build completed successfully in ${Date.now() - start} ms!`);
}

// Break out of promise "black hole" and throw the error.
// This will avoid "unhandled promise rejection" error.
main().catch(e => process.nextTick(() => { throw e; }));
