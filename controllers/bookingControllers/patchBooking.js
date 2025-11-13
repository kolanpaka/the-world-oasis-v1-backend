const Booking = require("./../../models/bookingModel");
const NodeError = require("./../../utils/nodeError");

async function patchBooking(req, res) {
  const allowedKeys = [
    "userId",
    "cabinId",
    "startDate",
    "endDate",
    "noOfUsers",
    "observation",
    "breakFast",
  ];

  const booking = await Booking.findOne(
    req.routerContext === "me"
      ? { _id: req.params.bookingId, userId: req.currentUser._id }
      : {
          _id: req.params.id,
        }
  ).populate(["userId", "cabinId"]);
  if (!booking) {
    throw new NodeError(true, "booking not found!!", 404);
  }

  if (booking.paid) {
    throw new NodeError(true, "Booking already completed", 403);
  }
  allowedKeys.forEach(function (eachKey) {
    if (req.body[eachKey] !== undefined) booking[eachKey] = req.body[eachKey];
  });

  await booking.save();

  res.status(201);
  res.json({
    status: "success",
    data: booking,
  });
}

module.exports = patchBooking;
