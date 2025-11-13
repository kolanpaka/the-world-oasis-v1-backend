const User = require("./../../models/userModel");
const generateToken = require("./../../utils/generateToken");

async function signUp(req, res) {
  const { userName, email, password, country, countryCode } = req.body;
  const user = await User.create({
    userName,
    email,
    password,
    country,
    countryCode,
  });
  const token = await generateToken(user);
  res.status(201);
  res.json({
    status: "success",
    data: {
      user,
      token,
    },
  });
}

module.exports = signUp;
