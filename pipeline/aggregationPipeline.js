const Booking = require("./../models/bookingModel");
const dailyMovements = require("./daily-movements");
const durationSummary = require("./durationSummary");
const occupancyRate = require("./occupancyRate");
const salesByDate = require("./salesByDate");
const totalBookings = require("./totalBookings");
const totalCheckins = require("./totalCheckIns");

async function aggregationPipeline(period) {
  const insights = await Booking.aggregate([
    {
      $facet: {
        dailyMovements: dailyMovements(),
        occupancyRate: occupancyRate(period),
        durationSummary: durationSummary(period),
        salesByDate: salesByDate(period),
        totalBookings: totalBookings(period),
        totalCheckins: totalCheckins(period),
      },
    },
  ]);

  return insights;
}

module.exports = aggregationPipeline;
