const Setting = require("./../../models/settingModel");

async function getSetting(req, res) {
  const setting = await Setting.findById(process.env.SETTINGSKEY);

  res.status(200);
  res.json({
    status: "success",
    data: {
      settings: setting,
    },
  });
}

module.exports = getSetting;
