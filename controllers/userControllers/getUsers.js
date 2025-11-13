const User = require("./../../models/userModel");

async function getUsers(req, res) {
  const users = await User.find(req.query);
  res.status(200);
  res.json({
    status: "success",
    totalLength: users.length,
    data: {
      users,
    },
  });
}

module.exports = getUsers;
