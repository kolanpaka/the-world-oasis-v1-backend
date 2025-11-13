function getDurationSummary() {
  return [
    {
      $addFields: {
        duration: {
          $divide: [
            {
              $subtract: ["$endDate", "$startDate"],
            },
            1000 * 60 * 60 * 24,
          ],
        },
      },
    },
    {
      $addFields: {
        stayRange: {
          $switch: {
            branches: [
              {
                case: {
                  $eq: ["$duration", 2],
                },
                then: "2 nights",
              },
              {
                case: {
                  $eq: ["$duration", 3],
                },
                then: "3 nights",
              },
              {
                case: {
                  $and: [
                    {
                      $gte: ["$duration", 4],
                    },
                    {
                      $lte: ["$duration", 5],
                    },
                  ],
                },
                then: "4-5 nights",
              },
              {
                case: {
                  $and: [
                    {
                      $gte: ["$duration", 8],
                    },
                    {
                      $lte: ["$duration", 14],
                    },
                  ],
                },
                then: "8-14 nights",
              },
            ],
            default: "other",
          },
        },
      },
    },
    {
      $group: {
        _id: "$stayRange",
        value: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        value: 1,
      },
    },
  ];
}

module.exports = getDurationSummary;
