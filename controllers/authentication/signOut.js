const User = require("./../../models/userModel");
const jwt = require("jsonwebtoken");
const Session = require("./../../models/sessionModel");

async function signOut(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const identity = jwt.verify(token, process.env.PRIVATEKEY);
  // await User.findByIdAndUpdate(req.currentUser._id, {
  //   $pull: { sessionKeys: identity.sessionKey },
  // });
  await Session.findOneAndDelete({
    key: identity.sessionKey,
    userId: identity.userId,
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
}

module.exports = signOut;
