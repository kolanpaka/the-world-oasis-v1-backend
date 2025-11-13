const Booking = require("./../../models/bookingModel");

async function postBooking(req, res) {
  const {
    userId,
    cabinId,
    startDate,
    endDate,
    noOfUsers,
    observation,
    breakFast,
  } = req.body;
  const booking = await Booking.create({
    userId: req.routerContext === "me" ? req.currentUser._id : userId,
    cabinId,
    startDate,
    endDate,
    noOfUsers,
    observation,
    breakFast,
  });

  const result = await Booking.findById(booking._id).populate([
    {
      path: "userId",
      select: "-createdAt  -role -status",
    },
    {
      path: "cabinId",
      select: "-created_at",
    },
  ]);

  res.status(201);
  res.json({
    status: "success",
    data: result,
  });
}

module.exports = postBooking;
