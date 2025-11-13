const express = require("express");
const protectMiddleware = require("./../middleware/protectMiddleware");
const authorizationMiddleware = require("./../middleware/authorizationMiddleware");
const bookingControllers = require("./../controllers/bookingControllers");

const router = express.Router();

router.use(protectMiddleware);
router.use(authorizationMiddleware("admin", "spadmin"));

router.route("/").get(bookingControllers.getBookings);

router
  .route("/:id")
  .delete(bookingControllers.deleteBooking)
  .get(bookingControllers.getBooking);

router.route("/check-in/:id").post(bookingControllers.checkIn);
router.route("/check-out/:id").post(bookingControllers.checkOut);

router.use(authorizationMiddleware("spadmin"));

router.route("/").post(bookingControllers.postBooking);

router.route("/:id").patch(bookingControllers.patchBooking);

module.exports = router;
