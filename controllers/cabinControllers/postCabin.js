const uploadImage = require("../../utils/uploadImage");
const Cabin = require("./../../models/cabinModel");
const mongoose = require("mongoose");

async function postCabin(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { cabin, capacity, price, Discount, description, cabin_image } =
      req.body;

    const result = await Cabin.create(
      [
        {
          cabin,
          capacity,
          price,
          Discount,
          description,
          cabin_image: "https://placehold.co/600x400?text=Cabin",
        },
      ],
      { session }
    );
    let URL = cabin_image;

    if (!URL) {
      URL = await uploadImage("cabinImages", req.file);
    }

    result[0].cabin_image = URL;
    await result[0].save({ session });

    await session.commitTransaction();

    res.status(201).json({
      status: "success",
      data: {
        cabin: result[0],
      },
    });
  } catch (err) {
    await session.abortTransaction();
    // Pass error to global error handler
    next(err);
  } finally {
    await session.endSession();
  }
}

module.exports = postCabin;
