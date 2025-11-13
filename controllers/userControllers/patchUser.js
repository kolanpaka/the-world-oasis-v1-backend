const User = require("./../../models/userModel");
const NodeError = require("./../../utils/nodeError");
const mongoose = require("mongoose");
const replaceImage = require("./../../utils/replaceImage");

async function patchUser(req, res, next) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      session,
    });

    if (!user) {
      throw new NodeError(true, "user not found!!", 404);
    }

    if (req.file) {
      const URL = await replaceImage(req.file, "userImages", user.profile);
      user = await User.findByIdAndUpdate(
        req.params.id,
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

module.exports = patchUser;
