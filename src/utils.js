// a lot of these functions have been taken from vue-devtools
// Kudos to them

/**
 * cached() returns a new cache for keys
 * @param {function} fn A function to apply a string
 * @returns {function} to store/retrieve the cache
 */
function cached (fn) {
  const cache = Object.create(null);
  return function cachedFn (str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }
}

/**
 * Converts a string to uppercase. Intended to be used with String.replace
 * @param {string} _ the matched substring
 * @param {string} c The first match e.g. $1
 */
function toUpper (_, c) {
  return c ? c.toUpperCase() : '';
}

/**
 * Returns the basename of a file
 * @param {string} filename The filename to return
 * @param {string} ext The extension to remove
 */
function basename (filename, ext) {
  return path.basename(
    filename.replace(/^[a-zA-Z]:/, '').replace(/\\/g, '/'),
    ext
  );
}

/**
 * Classify makes a "class" style name
 * E.g. 'app' to 'App' or 'my-file' to 'MyFile'
 * @param {string} str The name that you want to classify 
 * @returns {string} the processed name
 */
var classifyRE = /(?:^|[-_/])(\w)/g;
export const classify = cached((str) => {
  return str.replace(classifyRE, toUpper);
});

/**
 * Gets the name of the Vue Instance
 * @param {Object} instance A Vue instance
 * @returns {string} The name of the instance
 */
function getInstanceName(instance) {
  const name = instance.$options.name || instance.$options._componentTag;
  if (name) {
    return classify(name);
  }
  const file = instance.$options.__file; // injected by vue-loader
  if (file) {
    return basename(file, '.vue');
  }
  return instance.$root === instance
			  ? 'Root'
			  : 'Anonymous Component';
}

/**
 * returns a unique profile name to the vue isntance
 * @param {Object} instance A Vue Instance
 * @param {String} msg A performance message
 * @returns {String} The Instance specific message
 */
function getProfileName(instance, msg){
  return `${instance._uid}_${msg}`;
}

/**
 * Starts a profile
 * @param {Object} instance A Vue Instance
 * @param {string} msg A message for the profiler
 */
export function profile(instance, msg){
  performance.mark(getProfileName(instance, msg));
}

/**
 * Ends a profile
 * @param {Object} instance A Vue Instance
 * @param {string} msg A message for the profiler
 */
export function endProfile(instance, msg){
  const startMsg = getProfileName(instance, msg);
  const endMsg = getProfileName(instance, `${msg}End`);
  const name = getInstanceName(instance);
  performance.mark(endMsg);
  performance.measure(`${name} ${msg}`, startMsg, endMsg);
}
