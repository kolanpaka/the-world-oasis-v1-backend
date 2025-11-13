const Cabin = require("../../models/cabinModel");
const NodeError = require("./../../utils/nodeError");
const replaceImage = require("../../utils/replaceImage");
const mongoose = require("mongoose");
async function patchCabin(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  console.log(req.body);
  try {
    const cabin = await Cabin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      session,
    });

    if (!cabin) {
      throw new NodeError(true, "Cabin not found!!", 404);
    }

    if (req.file) {
      const URL = await replaceImage(
        req.file,
        "cabinImages",
        cabin.cabin_image
      );
      console.log(cabin.cabin_image);
      cabin.cabin_image = URL;
      await cabin.save({ session });
    }
    await session.commitTransaction();
    res.status(200).json({
      status: "success",
      data: {
        cabin,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
}

module.exports = patchCabin;
