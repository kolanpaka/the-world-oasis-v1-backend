const merge = require("./../utils/merge");
const { max, min, format } = require("date-fns");
const NodeError = require("./nodeError");

async function bookingConflicts(booking) {
  const conflictBookings = await booking.constructor.find({
    cabinId: booking.cabinId,
    startDate: { $lt: booking.endDate },
    endDate: { $gt: booking.startDate },
  });

  if (
    (await booking.constructor.findById(booking._id)) &&
    conflictBookings.length === 1 &&
    String(conflictBookings[0]._id) === String(booking._id)
  ) {
    return 0;
  }
  if (conflictBookings.length !== 0) {
    const conflictStartDate = (overConflictStartDate) => {
      return format(
        max([overConflictStartDate, booking.startDate]),
        "eee MMM dd yyyy"
      );
    };
    const conflictEndDate = (overConflictEndDate) => {
      return format(
        min([overConflictEndDate, booking.endDate]),
        "eee MMM dd yyyy"
      );
    };

    const mergedArray = merge(
      conflictBookings.map((eachConflict) => [
        format(eachConflict.startDate, "yyyy-MM-dd"),

        format(eachConflict.endDate, "yyyy-MM-dd"),
      ])
    );

    const message = mergedArray
      .map(
        (eachArray) =>
          `${conflictStartDate(eachArray[0])} - ${conflictEndDate(
            eachArray[1]
          )}`
      )
      .join(" ; ");

    throw new NodeError(
      true,
      `Booking already reserved for the following dates : ${message}`,
      409
    );
  }
}

module.exports = bookingConflicts;
