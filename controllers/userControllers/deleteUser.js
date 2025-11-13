const User = require("./../../models/userModel");
const NodeError = require("./../../utils/nodeError");
const removeImage = require("./../../utils/removeImage");

async function deleteUser(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new NodeError(true, "User not found!!", 404);
  }
  await removeImage(user.profile);

  res.status(204);
  res.json({
    status: "success",
    data: null,
  });
}

module.exports = deleteUser;
