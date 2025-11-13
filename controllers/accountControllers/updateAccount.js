const NodeError = require("../../utils/nodeError");
const User = require("../../models/userModel");
const mongoose = require("mongoose");
const replaceImage = require("./../../utils/replaceImage");
async function updateAccount(req, res, next) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { userName, email, country, countryCode } = req.body;
    if (req.body.password) {
      throw new NodeError(
        true,
        "You need to update your password. Please use the /updatePassword route to set a new password.",
        400
      );
    }

    let user = await User.findByIdAndUpdate(
      req.currentUser._id,
      {
        userName,
        email,
        country,
        countryCode,
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (req.file) {
      const URL = await replaceImage(req.file, "userImages", user.profile);
      user = await User.findByIdAndUpdate(
        req.currentUser._id,
        {
          profile: URL,
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
    }

    await session.commitTransaction();

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
}

module.exports = updateAccount;
