const Setting = require("./../../models/settingModel");

async function patchSetting(req, res, next) {
  const setting = await Setting.findByIdAndUpdate(
    process.env.SETTINGSKEY,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      settings: setting,
    },
  });
}
module.exports = patchSetting;
