const getUsers = require("./getUsers");
const postUser = require("./postUser");
const getUser = require("./getUser");
const deleteUser = require("./deleteUser");
const patchUser = require("./patchUser");

module.exports = {
  postUser,
  getUsers,
  getUser,
  deleteUser,
  patchUser,
};
