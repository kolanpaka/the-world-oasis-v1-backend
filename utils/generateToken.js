const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
// const User = require("./../models/userModel");
const Session = require("./../models/sessionModel");

async function generateToken(user) {
  const sessionKey = randomUUID();
  const issuedAt = Math.floor(Date.now() / 1000); // Issued now
  const expiresAt = issuedAt + 30 * 60;

  // await User.findByIdAndUpdate(user._id, {
  //   $push: { sessionKeys: sessionKey },
  // });

  await Session.create({
    userId: user._id,
    key: sessionKey,
    expiresAt: expiresAt * 1000,
  });

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      sessionKey,
      iat: issuedAt,
      exp: expiresAt,
    },
    process.env.PRIVATEKEY
  );

  return token;
}

module.exports = generateToken;
