const getBookings = require("./getBookings");
const postBooking = require("./postBooking");
const patchBooking = require("./patchBooking");
const deleteBooking = require("./deleteBooking");
const getBooking = require("./getBooking");
const checkIn = require("./checkIn");
const checkOut = require("./checkOut");
const addBreakFast = require("./addBreakFast");

module.exports = {
  postBooking,
  getBookings,
  patchBooking,
  deleteBooking,
  getBooking,
  checkIn,
  checkOut,
  addBreakFast,
};
