/**
 * Async handler middleware for Express
 * @param {Function} fn - The function to wrap
 * @returns {Function} - The wrapped function
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
