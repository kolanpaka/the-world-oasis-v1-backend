const User = require("../models/userModel");
const NodeError = require("./../utils/nodeError");
const jwt = require("jsonwebtoken");
const Session = require("./../models/sessionModel");

async function protectMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    throw new NodeError(true, "Authorization is missing from headers", 401);
  }

  const [bearer, token] = req.headers.authorization.split(" ");
  if (bearer?.toLowerCase() !== "bearer") {
    throw new NodeError(
      true,
      "Invalid authorization format. Expected 'Bearer <token>'.",
      401
    );
  }
  const identity = jwt.verify(token, process.env.PRIVATEKEY);
  //console.log(identity);

  const user = await User.findOne({
    _id: identity.userId,
    role: identity.role,
  });

  if (!user || user?.status == "inactive") {
    throw new NodeError(
      true,
      "Access denied. You no longer have access to this app.",
      403
    );
  }

  // if (!user.sessionKeys.includes(identity.sessionKey)) {
  //   throw new NodeError(true, "Session expired or logged out", 401);
  // }

  if (
    !(await Session.findOne({
      userId: identity.userId,
      key: identity.sessionKey,
    }))
  ) {
    throw new NodeError(true, "Session expired or logged out", 401);
  }
  req.currentUser = user;

  next();
}

module.exports = protectMiddleware;
