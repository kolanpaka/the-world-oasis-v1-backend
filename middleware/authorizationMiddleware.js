//authorization

const NodeError = require("../utils/nodeError");

function authorizationMiddleware(...allowedTo) {
  return function (req, res, next) {
    if (!allowedTo.includes(req.currentUser.role)) {
      throw new NodeError(
        true,
        "Access denied. You do not have permission to access this resource.",
        403
      );
    }
    next();
  };
}

module.exports = authorizationMiddleware;
