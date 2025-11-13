const Booking = require("./../../models/bookingModel");
const NodeError = require("./../../utils/nodeError");

async function deleteBooking(req, res) {
  const booking = await Booking.findOneAndDelete(
    req.routerContext === "me"
      ? { _id: req.params.bookingId, userId: req.currentUser._id }
      : {
          _id: req.params.id,
        }
  );
  if (!booking) {
    throw new NodeError(true, "Booking not found!!", 404);
  }
  res.status(204);
  res.json({
    status: "success",
    data: null,
  });
}

module.exports = deleteBooking;
