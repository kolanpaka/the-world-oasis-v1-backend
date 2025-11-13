const aggregationPipeline = require("../../pipeline/aggregationPipeline");

async function getDashboardInsights(req, res) {
  const period = Number(req.params.period);
  const insights = await aggregationPipeline(period);
  res.status(200);
  res.json({
    status: "success",
    data: {
      dashboardInsights: insights,
    },
  });
}

module.exports = getDashboardInsights;
