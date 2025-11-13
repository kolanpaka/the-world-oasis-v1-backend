const populateSelector = require("../../utils/populateSelector");
const Booking = require("./../../models/bookingModel");

async function getBooking(req, res) {
  const { fields } =
    req.routerContext === "me"
      ? { fields: "-userId,-cabinId.created_at,-cabinId.capacity,-status" }
      : req.query;

  const result = Booking.findOne(
    req.routerContext === "me"
      ? { _id: req.params.bookingId, userId: req.currentUser._id }
      : {
          _id: req.params.id,
        }
  );

  const selector = populateSelector(fields, ["userId", "cabinId"], result);

  if (fields) {
    result.select(selector.default.join(" "));
  }
  const booking = await result;

  res.status(200);
  res.json({
    status: "success",
    data: {
      booking,
    },
  });
}

module.exports = getBooking;
