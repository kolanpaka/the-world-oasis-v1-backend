const { subDays, startOfDay } = require("date-fns");
function occupancyRate(period) {
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
      $addFields: {
        offSetStartDate: {
          $max: ["$startDate", subDays(startOfDay(today), period)],
        },
        offSetEndDate: {
          $min: ["$endDate", startOfDay(today)],
        },
      },
    },
    {
      $addFields: {
        durationDays: {
          $divide: [
            {
              $subtract: ["$offSetEndDate", "$offSetStartDate"],
            },
            1000 * 60 * 60 * 24,
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalDurationDays: {
          $sum: "$durationDays",
        },
      },
    },
    {
      $lookup: {
        from: "cabins",
        pipeline: [
          {
            $count: "totalCabins",
          },
        ],
        as: "cabinStats",
      },
    },
    {
      $addFields: {
        cabinLength: {
          $arrayElemAt: ["$cabinStats.totalCabins", 0],
        },
      },
    },
    {
      $addFields: {
        occupancyRate: {
          $multiply: [
            {
              $divide: [
                "$totalDurationDays",
                {
                  $multiply: ["$cabinLength", period],
                },
              ],
            },
            100,
          ],
        },
      },
    },
    {
      $unset: ["_id", "cabinLength", "totalDurationDays", "cabinStats"],
    },
    {
      $addFields: {
        occupancyRate: {
          $floor: "$occupancyRate",
        },
      },
    },
  ];
}

module.exports = occupancyRate;
