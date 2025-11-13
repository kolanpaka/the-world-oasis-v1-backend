const User = require("./../../models/userModel");
const NodeError = require("./../../utils/nodeError");
// const jwt = require("jsonwebtoken");
const generateToken = require("./../../utils/generateToken");
// const { randomUUID } = require("crypto");
// const util = require("util");

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new NodeError(
      true,
      "Missing fields email or password to Sign In",
      400
    );
  }

  const user = await User.findOne({ email });

  if (
    !user ||
    user.status === "inactive" ||
    !(await user.comparePassword(password))
  ) {
    throw new NodeError(true, "Incorrect email or password", 401);
  }
  //async CODE
  // const sign = util.promisify(jwt.sign);
  //const token = await sign({ userId: user["_id"] }, process.env.PRIVATEKEY);
  //SYNC CODE
  // const token = jwt.sign(
  //   { userId: user._id, role: user.role },
  //   process.env.PRIVATEKEY,
  //   { expiresIn: "1h" }
  // );

  const token = await generateToken(user, "1h");

  res.status(200);
  res.json({
    status: "success",
    data: {
      user,
      token,
    },
  });
}

module.exports = signIn;
