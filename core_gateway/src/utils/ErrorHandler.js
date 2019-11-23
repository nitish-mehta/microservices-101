/**
 * @fileoverview: Utility to simplify error handling
 */

/**
 * Awaits the promise and if the promise throws, it merges the provided error with the thrown one
 * and rethrows it.
 *
 * This is a convenient function to wrap the following `try-catch` pattern to decrease the
 * boilerplate around error handling.
 *
 * @param {Promise} promise  The promise object which might throw an error.
 * @param {Object}  error    The error object which is to be merged with the thrown error.
 */
async function throwIf(promise, error) {
  try {
    return await promise;
  } catch (e) {
    const obj = {
      ...error,
      errorDetail: JSON.stringify(e)
    };
    throw obj;
  }
}

/**
 * `Error` object when `JSON.stringify`ied normally returns empty object which is useless.
 *
 * This function augments the `Error` prototype to provide a readable JSON extension. Run this once
 * before starting the app.
 */
async function stringifyError() {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Error.prototype, "toJSON", {
    value() {
      return {
        message: this.message,
        ...(this.errorLabels && { errorLabels: this.errorLabels })
      };
    },
    configurable: true,
    writable: true
  });
}

module.exports = {
  throwIf,
  stringifyError
};
