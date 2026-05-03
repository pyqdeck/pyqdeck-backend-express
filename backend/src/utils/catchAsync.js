/**
 * catchAsync - Higher-order function to catch errors in async route handlers
 * and pass them to Express error middleware.
 *
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - The wrapped function
 */
export const catchAsync = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
