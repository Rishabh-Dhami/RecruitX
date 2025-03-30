const asyncHandler = (fn) => {
  return function (req, res, next) {
    // Wrap the async function in a try-catch block to handle errors
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = { asyncHandler };
