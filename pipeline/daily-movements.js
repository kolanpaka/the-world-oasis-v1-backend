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
  ];
}

module.exports = dailyMovemets;
