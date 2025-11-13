const express = require("express");
const protectMiddleware = require("./../middleware/protectMiddleware");
const authorizationMiddleware = require("./../middleware/authorizationMiddleware");
const getDashboardInsights = require("./../controllers/dashboardControllers/getDashboardInsights");

const router = express.Router();

router.use(protectMiddleware);
router.use(authorizationMiddleware("admin", "spadmin"));

router.get("/:period", getDashboardInsights);

module.exports = router;
