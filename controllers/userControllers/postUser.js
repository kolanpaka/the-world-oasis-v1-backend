const NodeError = require("../../utils/nodeError");
const User = require("./../../models/userModel");

async function postUser(req, res, next) {
  if (req.currentUser.role === "admin" && req.body.role === "spadmin") {
    throw new NodeError(
      true,
      "Access denied. You do not have the required privileges to assign the role 'spadmin'.",
      403
    );
  }

  const user = await User.create({
    ...req.body,
    profile:
      "https://res.cloudinary.com/dvwmujx8u/image/upload/v1762516185/default-user_zqkklf.jpg",
  });

  res.status(201);
  res.json({
    status: "success",
    data: {
      user,
    },
  });
}

module.exports = postUser;
