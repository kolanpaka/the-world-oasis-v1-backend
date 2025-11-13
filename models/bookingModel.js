const mongoose = require("mongoose");
const { differenceInCalendarDays, isWithinInterval } = require("date-fns");
const Cabin = require("./../models/cabinModel");
const Setting = require("./../models/settingModel");
const User = require("./../models/userModel");
const NodeError = require("../utils/nodeError");
const bookingConflicts = require("./../utils/bookingConflicts");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  cabinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cabin",
    required: true,
  },

  startDate: {
    type: Date,
    required: [true, "StartDate is required"],
  },
  endDate: {
    type: Date,
    required: [true, "EndDate is required"],
  },
  bookedAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: {
      values: ["unconfirmed", "checked out", "checked in"],
      message: "Invalid status configuration",
    },
    default: "unconfirmed",
  },
  sales: {
    type: Number,
  },
  extraSales: {
    type: Number,
  },
  totalSales: Number,
  noOfUsers: {
    type: Number,
    required: [true, "total guest count is required for booking"],
  },
  paid: {
    type: Boolean,
    default: false,
  },
  observation: String,
  breakFast: {
    type: Boolean,
    default: false,
  },
  paymentDate: Date,
});

bookingSchema.pre("save", async function (next) {
  const cabin = await Cabin.findById(this.cabinId);
  const setting = await Setting.findById(process.env.SETTINGSKEY);
  const days = differenceInCalendarDays(this.endDate, this.startDate);
  const user = await User.findById(this.userId);

  if (!cabin || !setting || !days || !user || user.status === "inactive") {
    throw new NodeError(
      true,
      "Booking failed due to providing the invalid parameters like cabin,start date,end date ... !!",
      400
    );
  }

  if (user.role !== "user") {
    throw new NodeError(
      true,
      "access forbidden due trying to book a cabin as an employee please login as user....",
      403
    );
  }

  if (this.noOfUsers > cabin.capacity) {
    throw new NodeError(
      true,
      `Cannot proceed — Cabin ${cabin.cabin} allows a maximum of ${cabin.capacity} guests.`,
      400
    );
  }

  if (days < setting.minNights) {
    throw new NodeError(
      true,
      `Booking duration is too short. Minimum stay required is ${setting.minNights} night(s).`,
      400
    );
  }

  if (days > setting.maxNights) {
    throw new NodeError(
      true,
      `Booking duration exceeds the allowed limit. Maximum stay permitted is ${setting.maxNights} night(s).`,
      400
    );
  }

  await bookingConflicts(this);

  this.sales = (cabin.price - cabin.Discount) * days;

  this.extraSales = this.breakFast ? setting.breakfastPrice * days : 0;

  this.totalSales = this.sales + this.extraSales;
  next();
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
