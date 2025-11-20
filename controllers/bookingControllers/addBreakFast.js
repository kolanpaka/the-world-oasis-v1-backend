const Booking = require("./../../models/bookingModel");
const NodeError = require("./../../utils/nodeError");

async function addBreakFast(req, res) {
  const { breakFast = false } = req.body;
  const unchangedBooking = await Booking.findById(req.params.id).populate([
    "userId",
    "cabinId",
  ]);
  if (!unchangedBooking) {
    throw new NodeError(true, "booking not found!!", 404);
  }

  if (unchangedBooking.paid) {
    throw new NodeError(true, "Booking already completed", 403);
  }

  unchangedBooking.breakFast = breakFast;

  const booking = await unchangedBooking.save();

  res.status(201);
  res.json({
    status: "success",
    data: booking,
  });
}

module.exports = addBreakFast;
