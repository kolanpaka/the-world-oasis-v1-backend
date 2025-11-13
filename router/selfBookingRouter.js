const express = require("express");
const protectMiddleware = require("./../middleware/protectMiddleware");
const authorizationMiddleware = require("./../middleware/authorizationMiddleware");
const bookingControllers = require("./../controllers/bookingControllers");
const setRouterContext = require("./../middleware/setRouterContext");

const router = express.Router();

router.use(protectMiddleware);

router.use(authorizationMiddleware("user"));

router
  .route("/")
  .get(
    setRouterContext("me"),
    function (req, res, next) {
      let { fields, phase, sortBy, page = 1, limit = 10 } = req.query;
      req.cstmQuery = {
        fields,
        page,
        limit,
        userId: String(req.currentUser._id),
      };

      next();
    },
    bookingControllers.getBookings
  )
  .post(setRouterContext("me"), bookingControllers.postBooking);

router
  .route("/:bookingId")
  .get(setRouterContext("me"), bookingControllers.getBooking)
  .delete(setRouterContext("me"), bookingControllers.deleteBooking)
  .patch(setRouterContext("me"), bookingControllers.patchBooking);

module.exports = router;
