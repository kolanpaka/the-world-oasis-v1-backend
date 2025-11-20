const Booking = require("./../../models/bookingModel");
const NodeError = require("./../../utils/nodeError");

async function checkIn(req, res) {
  const { confirmation = false, breakFast = false } = req.body;
  const booking = await Booking.findById(req.params.id).populate([
    "userId",
    "cabinId",
  ]);
  if (!booking) {
    throw new NodeError(true, "booking not found!!", 404);
  }
  if (!confirmation) {
    throw new NodeError(
      true,
      "Kindly confirm if you would like to proceed with the check-in.",
      400
    );
  }
  if (booking.status === "unconfirmed") {
    booking.paid = true;
    booking.breakFast = breakFast;
    booking.status = "checked in";
    await booking.save();
  }

  res.status(201);
  res.json({
    status: "success",
    data: booking,
  });
}

module.exports = checkIn;
