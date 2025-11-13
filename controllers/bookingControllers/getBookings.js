const Booking = require("./../../models/bookingModel");
const populateSelector = require("./../../utils/populateSelector");
const queryToMongo = require("query-to-mongo");
// status=
// all
// checked-out
// checked-in
// unconfirmed

// page=0

// sortBy
// startDate-desc
// startDate-asc
// totalPrice-desc
// totalPrice-asc

// .populate([
//     { path: "userId", select: selector.userId.join(" ") },
//     { path: "cabinId", select: selector.cabinId.join(" ") },
//   ]);

const getStatus = {
  all: {},
  "checked-out": { status: "checked out" },
  "checked-in": { status: "checked in" },
  unconfirmed: { status: "unconfirmed" },
};

const getSortBy = {
  "startDate-desc": "-startDate",
  "startDate-asc": "startDate",
  "totalPrice-desc": "-totalSales",
  "totalPrice-asc": "totalSales",
};

// req.currentUser.role === "spadmin" ? queryToMongo(paramQuery).criteria : {};

async function getBookings(req, res) {
  let {
    fields,
    phase,
    sortBy,
    page = 1,
    limit = 10,
    ...paramQuery
  } = req.routerContext === "me" ? req.cstmQuery : req.query;

  let query = Booking.find(queryToMongo(paramQuery).criteria);

  const selector = populateSelector(fields, ["userId", "cabinId"], query);
  if (fields) {
    query.select(selector.default.join(" "));
  }
  if (phase) {
    query.find(getStatus[phase]);
  }
  if (sortBy) {
    query.sort(getSortBy[sortBy]);
  }

  if (page) {
    query.skip((page - 1) * limit).limit(limit);
  }

  const bookings = await query;

  res.status(200);
  res.json({
    status: "success",
    totalLength: bookings.length,
    data: {
      bookings,
    },
  });
}

module.exports = getBookings;
