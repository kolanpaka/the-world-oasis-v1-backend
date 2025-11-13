const { subDays, startOfDay } = require("date-fns");

function totalCheckIns(period) {
  const today = new Date();

  return [
    {
      $match: {
        startDate: {
          $gte: subDays(startOfDay(today), period),
          $lt: startOfDay(today),
        },
        status: "checked in",
      },
    },
    {
      $group: {
        _id: null,
        totalCheckins: {
          $sum: 1,
        },
        totalSales: {
          $sum: "$totalSales",
        },
      },
    },
    {
      $unset: "_id",
    },
  ];
}

module.exports = totalCheckIns;
