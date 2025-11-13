const { subDays, startOfDay } = require("date-fns");

function salesByDate(period) {
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
      $project: {
        startDate: 1,
        extraSales: 1,
        sales: 1,
      },
    },
    {
      $unset: "_id",
    },
    {
      $group: {
        _id: "$startDate",
        extraSales: {
          $sum: "$extraSales",
        },
        sales: {
          $sum: "$sales",
        },
      },
    },
  ];
}

module.exports = salesByDate;
