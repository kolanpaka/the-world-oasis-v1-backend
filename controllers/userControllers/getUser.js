const User = require("./../../models/userModel");
const NodeError = require("./../../utils/nodeError");

async function getUser(req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new NodeError(true, "User not found!!", 404);
  }
  res.status(200);
  res.json({
    status: "success",
    data: {
      user,
    },
  });
}

module.exports = getUser;
