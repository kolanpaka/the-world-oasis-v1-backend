const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  minNights: {
    type: Number,
    default: 1,
  },
  maxNights: {
    type: Number,
    default: 1,
  },
  breakfastPrice: {
    type: Number,
    default: 0,
  },
});

const Setting = mongoose.model("setting", settingSchema);

module.exports = Setting;
