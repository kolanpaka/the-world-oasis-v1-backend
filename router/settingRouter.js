const express = require("express");
const settingControllers = require("./../controllers/settingControllers");
const protectMiddleware = require("./../middleware/protectMiddleware");

const router = express.Router();

router.use(protectMiddleware);

router
  .route("/")
  .get(settingControllers.getSetting)
  .patch(settingControllers.patchSetting);

module.exports = router;
