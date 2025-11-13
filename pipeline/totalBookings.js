const { subDays, startOfDay } = require("date-fns");

function totalBookings(period) {
  const today = new Date();
  const from = subDays(startOfDay(today), period);
  const to = startOfDay(today);

  return [
    {
      $match: {
        bookedAt: {
          $gte: from,
          $lt: to,
        },
      },
    },
    {
      $count: "totalbookings",
    },
  ];
}

module.exports = totalBookings;
