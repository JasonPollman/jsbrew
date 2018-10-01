/**
 * Exports the current global.
 * This is, `window` in the browser and `global` in node.
 * @since 9/25/18
 * @file
 */

export default typeof window === 'object' ? window : global;
