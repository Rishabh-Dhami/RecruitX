const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");

const verifyUser = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!user) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, "Unauthorized: Invalid token"));
    }

    next(error);
  }
});

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden: Access denied");
    }
    next();
  };
};

module.exports = { verifyUser, authorizeRoles };
