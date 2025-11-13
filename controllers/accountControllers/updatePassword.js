const Session = require("../../models/sessionModel");
const NodeError = require("../../utils/nodeError");
const generateToken = require("./../../utils/generateToken");

async function updatePassword(req, res) {
  const { oldPassword, newPassword } = req.body;

  if (!(await req.currentUser.comparePassword(oldPassword))) {
    throw new NodeError(
      true,
      "The current password you entered is incorrect.",
      400
    );
  }

  // req.currentUser.sessionKeys = [];

  await Session.deleteMany({ userId: req.currentUser._id });

  req.currentUser.password = newPassword;
  await req.currentUser.save();

  const token = await generateToken(req.currentUser, "1h");

  res.status(200).json({
    status: "success",
    data: {
      user: req.currentUser,
      token,
    },
  });
}

module.exports = updatePassword;
