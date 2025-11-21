const { format } = require("date-fns");

function dailyMovemets() {
  const today = new Date();
  return [
    {
      $match: {
        $or: [
          {
            startDate: new Date(format(today, "yyyy-MM-dd")),
          },
          {
            endDate: new Date(format(today, "yyyy-MM-dd")),
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $lookup: {
        from: "cabins",
        localField: "cabinId",
        foreignField: "_id",
        as: "cabinData",
      },
    },
    {
      // convert arrays to single objects
      $addFields: {
        userId: { $arrayElemAt: ["$userData", 0] },
        cabinId: { $arrayElemAt: ["$cabinData", 0] },
      },
    },
    {
      $unset: ["userData", "cabinData"],
    },
  ];
}

module.exports = dailyMovemets;
